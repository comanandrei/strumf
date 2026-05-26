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
const OVERPASS_URLS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
] as const;
const OVERPASS_TIMEOUT_SECONDS = 12;
const OVERPASS_REQUEST_TIMEOUT_MS = 15_000;

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

interface OverpassElement {
  type?: "node" | "way" | "relation";
  id?: number;
  lat?: number;
  lon?: number;
  center?: { lat?: number; lon?: number };
  tags?: Record<string, string | undefined>;
}

interface OverpassResponse {
  elements?: OverpassElement[];
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
    return findOpenStreetMapNearbyPlaces({
      lat,
      lon,
      mode,
      radiusMeters,
      perKind,
      minPerKind,
      expandedRadiusMeters,
    });
  }

  return findGeoapifyNearbyPlaces({
    apiKey,
    lat,
    lon,
    mode,
    radiusMeters,
    perKind,
    minPerKind,
    expandedRadiusMeters,
  });
}

async function findGeoapifyNearbyPlaces(params: {
  apiKey: string;
  lat: number;
  lon: number;
  mode: TravelMode;
  radiusMeters: number;
  perKind: number;
  minPerKind: number;
  expandedRadiusMeters: number;
}): Promise<NearbyPlace[]> {
  const {
    apiKey,
    lat,
    lon,
    mode,
    radiusMeters,
    perKind,
    minPerKind,
    expandedRadiusMeters,
  } = params;

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

async function findOpenStreetMapNearbyPlaces(params: {
  lat: number;
  lon: number;
  mode: TravelMode;
  radiusMeters: number;
  perKind: number;
  minPerKind: number;
  expandedRadiusMeters: number;
}): Promise<NearbyPlace[]> {
  const {
    lat,
    lon,
    mode,
    radiusMeters,
    perKind,
    minPerKind,
    expandedRadiusMeters,
  } = params;

  const candidatesByKind = await Promise.all(
    (Object.keys(CATEGORY_FOR_KIND) as NearbyKind[]).map(async (kind) => {
      const local = await fetchOpenStreetMapPlacesByKind({
        lat,
        lon,
        kind,
        radiusMeters,
        limit: perKind,
      });
      if (local.length >= minPerKind) return local;
      return fetchOpenStreetMapPlacesByKind({
        lat,
        lon,
        kind,
        radiusMeters: expandedRadiusMeters,
        limit: Math.max(perKind, minPerKind),
      });
    }),
  );

  return candidatesByKind
    .flat()
    .map((place) => ({
      ...place,
      durationSeconds: estimateDurationSeconds(place.distanceMeters, mode),
    }))
    .sort((a, b) => a.durationSeconds - b.durationSeconds);
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

async function fetchOpenStreetMapPlacesByKind(args: {
  lat: number;
  lon: number;
  kind: NearbyKind;
  radiusMeters: number;
  limit: number;
}): Promise<Omit<NearbyPlace, "durationSeconds">[]> {
  const { lat, lon, kind, radiusMeters, limit } = args;
  const query = buildOverpassQuery({ lat, lon, kind, radiusMeters, limit });

  const data = await fetchOverpass(query, kind);
  const elements = Array.isArray(data?.elements) ? data.elements : [];

  return dedupePlaces(
    elements
      .map((element) => mapOverpassElementToPlace(element, kind, { lat, lon }))
      .filter((place): place is Omit<NearbyPlace, "durationSeconds"> => place !== null)
      .filter((place) => place.distanceMeters <= radiusMeters),
  )
    .sort((a, b) => a.distanceMeters - b.distanceMeters)
    .slice(0, limit);
}

async function fetchOverpass(
  query: string,
  kind: NearbyKind,
): Promise<OverpassResponse> {
  let lastError: Error | null = null;

  for (const endpoint of OVERPASS_URLS) {
    try {
      const url = new URL(endpoint);
      url.searchParams.set("data", query);
      const res = await fetch(url, {
        headers: {
          Accept: "application/json",
          "User-Agent": "strumf-nearby/0.1 (https://strumf.vercel.app)",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(OVERPASS_REQUEST_TIMEOUT_MS),
      });
      if (!res.ok) {
        lastError = new Error(
          `${res.status} ${res.statusText} from ${new URL(endpoint).hostname}`,
        );
        continue;
      }
      return (await res.json()) as OverpassResponse;
    } catch (err) {
      lastError =
        err instanceof Error
          ? err
          : new Error("OpenStreetMap places request failed.");
    }
  }

  throw new Error(
    `OpenStreetMap places (${kind}) failed${
      lastError ? `: ${lastError.message}` : "."
    }`,
  );
}

function buildOverpassQuery(args: {
  lat: number;
  lon: number;
  kind: NearbyKind;
  radiusMeters: number;
  limit: number;
}) {
  const { lat, lon, kind, radiusMeters, limit } = args;
  const bbox = boundingBox({ lat, lon }, radiusMeters);
  const tags =
    kind === "park"
      ? [
          { key: "leisure", value: "park" },
          { key: "landuse", value: "recreation_ground" },
        ]
      : [
          { key: "shop", value: "mall" },
          { key: "building", value: "retail" },
          { key: "landuse", value: "retail" },
        ];
  const selectors = tags.flatMap(({ key, value }) =>
    (["node", "way", "relation"] as const).map(
      (elementType) =>
        `${elementType}(${bbox.south},${bbox.west},${bbox.north},${bbox.east})["${key}"="${value}"]["name"];`,
    ),
  );

  return [
    `[out:json][timeout:${OVERPASS_TIMEOUT_SECONDS}];`,
    "(",
    ...selectors,
    ");",
    `out center ${Math.max(limit * 5, 25)};`,
  ].join("\n");
}

function mapOverpassElementToPlace(
  element: OverpassElement,
  kind: NearbyKind,
  origin: { lat: number; lon: number },
): Omit<NearbyPlace, "durationSeconds"> | null {
  const type = element.type;
  const id = element.id;
  const name = (element.tags?.name ?? "").trim();
  const lat = element.lat ?? element.center?.lat;
  const lon = element.lon ?? element.center?.lon;
  if (
    !type ||
    typeof id !== "number" ||
    !name ||
    typeof lat !== "number" ||
    typeof lon !== "number"
  ) {
    return null;
  }

  return {
    id: `osm:${type}:${id}`,
    name,
    kind,
    lat,
    lon,
    distanceMeters: Math.round(distanceMeters(origin, { lat, lon })),
    providerUrl: `https://www.openstreetmap.org/${type}/${id}`,
  };
}

function dedupePlaces(
  places: Omit<NearbyPlace, "durationSeconds">[],
): Omit<NearbyPlace, "durationSeconds">[] {
  const seen = new Set<string>();
  return places.filter((place) => {
    const key = `${place.kind}:${place.name.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
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

function distanceMeters(
  a: { lat: number; lon: number },
  b: { lat: number; lon: number },
): number {
  const earthRadiusMeters = 6_371_000;
  const dLat = toRadians(b.lat - a.lat);
  const dLon = toRadians(b.lon - a.lon);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * earthRadiusMeters * Math.asin(Math.min(1, Math.sqrt(h)));
}

function toRadians(value: number): number {
  return (value * Math.PI) / 180;
}

function boundingBox(
  center: { lat: number; lon: number },
  radiusMeters: number,
): { south: number; west: number; north: number; east: number } {
  const latDelta = radiusMeters / 111_320;
  const cosLat = Math.cos(toRadians(center.lat));
  const lonDelta = radiusMeters / Math.max(111_320 * Math.abs(cosLat), 1);
  return {
    south: clamp(center.lat - latDelta, -90, 90),
    west: clamp(center.lon - lonDelta, -180, 180),
    north: clamp(center.lat + latDelta, -90, 90),
    east: clamp(center.lon + lonDelta, -180, 180),
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
