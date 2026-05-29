"use client";

import { useState } from "react";

import { Card } from "~/app/_components/ui/card";
import { Chip } from "~/app/_components/ui/chip";
import { useI18n } from "~/app/lib/i18n-provider";
import { api } from "~/trpc/react";

import { SectionBanner } from "./section-banner";
import type { Coords } from "./use-location";

type TravelMode = "walk" | "drive";

type NearbyPlace = {
  id: string;
  name: string;
  kind: "park" | "mall";
  distanceMeters: number;
  durationSeconds: number;
  providerUrl: string | null;
};

const KIND_LABEL = {
  ro: { park: "Parcuri aproape", mall: "Malluri aproape" },
  en: { park: "Parks nearby", mall: "Malls nearby" },
} as const;
const KIND_ICON = { park: "🌳", mall: "🛍️" } as const;

export function NearbyPlacesSection({ coords }: { coords: Coords | null }) {
  const { locale } = useI18n();
  const [travelMode, setTravelMode] = useState<TravelMode>("walk");
  const copy = locale === "ro"
    ? {
        around: "In jurul tau",
        title: "Parcuri si malluri",
        walk: "Mers",
        drive: "Masina",
        allow: "Permite locatia ca sa vezi parcuri si malluri aproape",
        loadError: "Nu am putut incarca locurile din apropiere",
        retry: "Reincearca",
        placesBy: "Locuri de la",
      }
    : {
        around: "Around you",
        title: "Parks & malls",
        walk: "Walk",
        drive: "Drive",
        allow: "Allow location to see parks and malls nearby",
        loadError: "Could not load nearby places",
        retry: "Retry",
        placesBy: "Places by",
      };

  const configQuery = api.nearby.config.useQuery(undefined, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  const placesProvider = configQuery.data?.placesProvider ?? "openstreetmap";

  const placesQuery = api.nearby.list.useQuery(
    coords
      ? { lat: coords.latitude, lon: coords.longitude, mode: travelMode }
      : { lat: 0, lon: 0, mode: travelMode },
    {
      enabled: !!coords,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        const code = error?.data?.code;
        if (code === "BAD_REQUEST" || code === "UNAUTHORIZED") {
          return false;
        }
        return failureCount < 1;
      },
    },
  );

  const places: NearbyPlace[] = placesQuery.data ?? [];
  const parks = places.filter((p) => p.kind === "park");
  const malls = places.filter((p) => p.kind === "mall");

  return (
    <Card className="overflow-hidden">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
            {copy.around}
          </p>
          <h2 className="font-display text-lg font-semibold leading-tight">
            {copy.title}
          </h2>
        </div>
        <div className="flex shrink-0 gap-1.5">
          <Chip
            selected={travelMode === "walk"}
            onClick={() => setTravelMode("walk")}
          >
            {copy.walk}
          </Chip>
          <Chip
            selected={travelMode === "drive"}
            onClick={() => setTravelMode("drive")}
          >
            {copy.drive}
          </Chip>
        </div>
      </div>

      {!coords ? (
        <SectionBanner
          tone="info"
          title={copy.allow}
        />
      ) : placesQuery.isError ? (
        <SectionBanner
          tone="error"
          title={copy.loadError}
          description={placesQuery.error.message}
          action={
            <button
              type="button"
              onClick={() => placesQuery.refetch()}
              className="text-xs font-bold underline"
            >
              {copy.retry}
            </button>
          }
        />
      ) : placesQuery.isPending ? (
        <div className="space-y-3">
          <PlaceListSkeleton />
          <PlaceListSkeleton />
        </div>
      ) : (
        <div className="space-y-4">
          <PlaceList kind="park" places={parks} travelMode={travelMode} />
          <PlaceList kind="mall" places={malls} travelMode={travelMode} />
        </div>
      )}

      <p className="mt-3 text-center text-[10px] text-strumf-muted">
        {copy.placesBy} <PlacesProviderLabel provider={placesProvider} /> ·{" "}
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          © OpenStreetMap contributors
        </a>
      </p>
    </Card>
  );
}

function PlacesProviderLabel({ provider }: { provider: "geoapify" | "openstreetmap" }) {
  if (provider === "geoapify") {
    return (
      <a
        href="https://www.geoapify.com/"
        target="_blank"
        rel="noreferrer"
        className="underline"
      >
        Geoapify
      </a>
    );
  }

  return (
    <a
      href="https://www.openstreetmap.org/"
      target="_blank"
      rel="noreferrer"
      className="underline"
    >
      OpenStreetMap
    </a>
  );
}

function PlaceList({
  kind,
  places,
  travelMode,
}: {
  kind: "park" | "mall";
  places: NearbyPlace[];
  travelMode: TravelMode;
}) {
  const { locale } = useI18n();
  const copy = locale === "ro"
    ? {
        travelTime: travelMode === "walk" ? "Timp de mers" : "Timp cu masina",
        empty: "Nimic in apropiere.",
      }
    : {
        travelTime: travelMode === "walk" ? "Walking time" : "Driving time",
        empty: "Nothing nearby.",
      };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
          <span className="mr-1.5" aria-hidden>
            {KIND_ICON[kind]}
          </span>
          {KIND_LABEL[locale][kind]}
        </p>
        <span className="text-[10px] text-strumf-muted">
          {copy.travelTime}
        </span>
      </div>
      {places.length === 0 ? (
        <p className="rounded-2xl bg-white/45 px-4 py-3 text-center text-sm text-strumf-muted">
          {copy.empty}
        </p>
      ) : (
        <ul className="space-y-2">
          {places.map((place) => (
            <li
              key={place.id}
              className="flex items-center justify-between gap-3 rounded-2xl bg-white/55 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate font-display text-base font-semibold">
                  {place.providerUrl ? (
                    <a
                      href={place.providerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      {place.name}
                    </a>
                  ) : (
                    place.name
                  )}
                </p>
                <p className="text-xs text-strumf-muted">
                  {formatDistance(place.distanceMeters)}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-strumf-accent-muted/60 px-3 py-1 text-xs font-bold text-strumf-foreground">
                {formatDuration(place.durationSeconds)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PlaceListSkeleton() {
  return (
    <div>
      <div className="mb-2 h-4 w-32 animate-pulse rounded-full bg-white/55" />
      <div className="space-y-2">
        <div className="h-12 w-full animate-pulse rounded-2xl bg-white/55" />
        <div className="h-12 w-full animate-pulse rounded-2xl bg-white/55" />
        <div className="h-12 w-full animate-pulse rounded-2xl bg-white/55" />
      </div>
    </div>
  );
}

function formatDistance(meters: number): string {
  if (!Number.isFinite(meters) || meters <= 0) return "—";
  if (meters < 1000) return `${meters} m`;
  return `${(meters / 1000).toFixed(meters < 10_000 ? 1 : 0)} km`;
}

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "—";
  const minutes = Math.max(1, Math.round(seconds / 60));
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rem = minutes % 60;
  return rem ? `${hours} h ${rem} min` : `${hours} h`;
}
