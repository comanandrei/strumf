"use client";

import { Button } from "~/app/_components/ui/button";

import { NearbyPlacesSection } from "./_components/nearby-places-section";
import { SectionBanner } from "./_components/section-banner";
import { effectiveCoords, useSharedLocation } from "./_components/use-location";
import { WeatherSection } from "./_components/weather-section";

export default function NearbyPage() {
  const { status, request } = useSharedLocation();
  const coords = effectiveCoords(status);

  return (
    <div className="flex flex-col gap-5 pb-8">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-strumf-muted">Nearby</p>
          <h1 className="font-display text-4xl font-bold tracking-tight">Nearby</h1>
          <p className="mt-1 text-sm text-strumf-muted">
            Today&apos;s weather and the closest parks and malls.
          </p>
        </div>
        <Button
          variant={status.state === "idle" ? "accent" : "ghost"}
          onClick={request}
          disabled={status.state === "requesting"}
          className="shrink-0 text-xs"
        >
          {status.state === "requesting"
            ? "Locating..."
            : status.state === "idle"
              ? "Use my location"
              : "Refresh location"}
        </Button>
      </header>

      {status.state === "error" ? (
        <SectionBanner
          tone={coords ? "warn" : "error"}
          title={
            coords
              ? "Using last known location"
              : status.permissionDenied
                ? "Location blocked"
                : "Location unavailable"
          }
          description={status.message}
          action={
            <button
              type="button"
              onClick={request}
              className="text-xs font-bold underline"
            >
              Try again
            </button>
          }
        />
      ) : null}

      {status.state === "idle" || status.state === "requesting" ? (
        <SectionBanner
          tone="info"
          title={
            status.state === "requesting"
              ? "Asking your device for location…"
              : "Use your device location"
          }
          action={
            status.state === "idle" ? (
              <button
                type="button"
                onClick={request}
                className="text-xs font-bold underline"
              >
                Use location
              </button>
            ) : null
          }
        />
      ) : null}

      <WeatherSection coords={coords} />
      <NearbyPlacesSection coords={coords} />
    </div>
  );
}
