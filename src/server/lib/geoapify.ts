import "server-only";

import { env } from "~/env";

export type NearbyKind = "park" | "mall";
export type TravelMode = "walk" | "drive";

export interface NearbyPlace {
  id: string;
  name: string;
  kind: NearbyKind;
  lat: number;
  lon: number;
  distanceMeters: number;
  durationSeconds: number;
  providerUrl: string | null;
}

const PLACES_URL = "https://api.geoapify.com/v2/places";
const ROUTING_URL = "https://api.geoapify.com/v1/routing";

const CATEGORY_FOR_KIND: Record<NearbyKind, string> = {
  park: "leisure.park",
  mall: "commercial.shopping_mall",
};

interface PlacesFeature {
  properties?: {
    place_id?: string;
    name?: string;
    address_line1?: string;
    distance?: number;
    lat?: number;
    lon?: number;
    datasource?: { raw?: { osm_id?: number; osm_type?: string } };
  };
  geometry?: { coordinates?: [number, number] };
}

interface PlacesResponse {
  features?: PlacesFeature[];
}

interface RouteResponse {
  features?: { properties?: { distance?: number; time?: number } }[];
}

export async function findNearbyPlaces(params: {
  lat: number;
  lon: number;
  mode: TravelMode;
  radiusMeters?: number;
  perKind?: number;
  minPerKind?: number;
  expandedRadiusMeters?: number;
}): Promise<NearbyPlace[]> {
  const {
    lat,
    lon,
    mode,
    radiusMeters = 5000,
    perKind = 3,
    minPerKind = 2,
    expandedRadiusMeters = 50_000,
  } = params;
  const apiKey = env.GEOAPIFY_API_KEY;
  if (!apiKey) {
    throw new Error("GEOAPIFY_API_KEY is not configured.");
  }

  const candidatesByKind = await Promise.all(
    (Object.keys(CATEGORY_FOR_KIND) as NearbyKind[]).map(async (kind) => {
      const local = await fetchPlacesByKind({
        apiKey,
        lat,
        lon,
        kind,
        radiusMeters,
        limit: perKind,
      });
      if (local.length >= minPerKind) return local;
      // Not enough named results close by — widen the net once.
      return fetchPlacesByKind({
        apiKey,
        lat,
        lon,
        kind,
        radiusMeters: expandedRadiusMeters,
        limit: Math.max(perKind, minPerKind),
      });
    }),
  );
  const candidates = candidatesByKind.flat();

  const enriched = await Promise.all(
    candidates.map(async (place) => {
      const route = await fetchRoute({
        apiKey,
        from: { lat, lon },
        to: { lat: place.lat, lon: place.lon },
        mode,
      });
      return {
        ...place,
        distanceMeters: route?.distanceMeters ?? place.distanceMeters,
        durationSeconds: route?.durationSeconds ?? estimateDurationSeconds(place.distanceMeters, mode),
      } satisfies NearbyPlace;
    }),
  );

  return enriched.sort((a, b) => a.durationSeconds - b.durationSeconds);
}

async function fetchPlacesByKind(args: {
  apiKey: string;
  lat: number;
  lon: number;
  kind: NearbyKind;
  radiusMeters: number;
  limit: number;
}): Promise<Omit<NearbyPlace, "durationSeconds">[]> {
  const { apiKey, lat, lon, kind, radiusMeters, limit } = args;
  const url = new URL(PLACES_URL);
  url.searchParams.set("categories", CATEGORY_FOR_KIND[kind]);
  url.searchParams.set("conditions", "named");
  url.searchParams.set("filter", `circle:${lon},${lat},${radiusMeters}`);
  url.searchParams.set("bias", `proximity:${lon},${lat}`);
  url.searchParams.set("limit", String(Math.max(limit * 5, 25)));
  url.searchParams.set("lang", "en");
  url.searchParams.set("apiKey", apiKey);

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(
      `Geoapify Places (${kind}) failed: ${res.status} ${res.statusText}`,
    );
  }
  const data = (await res.json()) as PlacesResponse;
  const features = Array.isArray(data?.features) ? data.features : [];

  return features
    .map((f) => mapFeatureToPlace(f, kind))
    .filter((p): p is Omit<NearbyPlace, "durationSeconds"> => p !== null)
    .sort((a, b) => a.distanceMeters - b.distanceMeters)
    .slice(0, limit);
}

function mapFeatureToPlace(
  feature: PlacesFeature,
  kind: NearbyKind,
): Omit<NearbyPlace, "durationSeconds"> | null {
  const props = feature.properties ?? {};
  const id = props.place_id;
  const name = (props.name ?? "").trim();
  const featureLat = props.lat ?? feature.geometry?.coordinates?.[1];
  const featureLon = props.lon ?? feature.geometry?.coordinates?.[0];
  const rawDistance = props.distance;
  if (
    !id ||
    !name ||
    typeof featureLat !== "number" ||
    typeof featureLon !== "number" ||
    typeof rawDistance !== "number" ||
    !Number.isFinite(rawDistance)
  ) {
    return null;
  }
  const osm = props.datasource?.raw;
  const providerUrl =
    osm?.osm_type && osm?.osm_id
      ? `https://www.openstreetmap.org/${osm.osm_type}/${osm.osm_id}`
      : null;
  return {
    id,
    name,
    kind,
    lat: featureLat,
    lon: featureLon,
    distanceMeters: Math.round(rawDistance),
    providerUrl,
  };
}

async function fetchRoute(args: {
  apiKey: string;
  from: { lat: number; lon: number };
  to: { lat: number; lon: number };
  mode: TravelMode;
}): Promise<{ distanceMeters: number; durationSeconds: number } | null> {
  const { apiKey, from, to, mode } = args;
  const url = new URL(ROUTING_URL);
  url.searchParams.set("waypoints", `${from.lat},${from.lon}|${to.lat},${to.lon}`);
  url.searchParams.set("mode", mode);
  url.searchParams.set("apiKey", apiKey);

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = (await res.json()) as RouteResponse;
  const props = data?.features?.[0]?.properties;
  const distance = props?.distance;
  const time = props?.time;
  if (typeof distance !== "number" || typeof time !== "number") return null;
  return {
    distanceMeters: Math.round(distance),
    durationSeconds: Math.round(time),
  };
}

function estimateDurationSeconds(distanceMeters: number, mode: TravelMode): number {
  // Conservative fallback used only when the routing call fails. Walking ~5 km/h, driving ~30 km/h in city.
  const metersPerSecond = mode === "walk" ? 1.4 : 8.3;
  return Math.round(distanceMeters / metersPerSecond);
}
