"use client";

import { Button } from "~/app/_components/ui/button";
import { useI18n } from "~/app/lib/i18n-provider";

import { NearbyPlacesSection } from "./_components/nearby-places-section";
import { SectionBanner } from "./_components/section-banner";
import { effectiveCoords, useSharedLocation } from "./_components/use-location";
import { WeatherSection } from "./_components/weather-section";

export default function NearbyPage() {
  const { locale } = useI18n();
  const { status, request } = useSharedLocation(locale);
  const coords = effectiveCoords(status);
  const copy = locale === "ro"
    ? {
        outside: "Afara",
        nearby: "Aproape",
        description: "Vremea de azi si cele mai apropiate parcuri si malluri.",
        refresh: "Actualizeaza locatia",
        locating: "Se localizeaza...",
        useMyLocation: "Foloseste locatia mea",
        lastKnown: "Folosim ultima locatie cunoscuta",
        blocked: "Locatia este blocata",
        unavailable: "Locatia nu este disponibila",
        tryAgain: "Incearca din nou",
        asking: "Cerem locatia dispozitivului...",
        useLocation: "Foloseste locatia dispozitivului",
        allow: "Permite",
      }
    : {
        outside: "Outside",
        nearby: "Nearby",
        description: "Today's weather and the closest parks and malls.",
        refresh: "Refresh location",
        locating: "Locating...",
        useMyLocation: "Use my location",
        lastKnown: "Using last known location",
        blocked: "Location blocked",
        unavailable: "Location unavailable",
        tryAgain: "Try again",
        asking: "Asking your device for location...",
        useLocation: "Use your device location",
        allow: "Use location",
      };

  return (
    <div className="flex flex-col gap-5 pb-8">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-strumf-muted">{copy.outside}</p>
          <h1 className="font-display text-4xl font-bold tracking-tight">{copy.nearby}</h1>
          <p className="mt-1 text-sm text-strumf-muted">{copy.description}</p>
        </div>
        <Button
          variant={status.state === "idle" ? "accent" : "ghost"}
          onClick={request}
          disabled={status.state === "requesting"}
          className="shrink-0 text-xs"
        >
          {status.state === "requesting"
            ? copy.locating
            : status.state === "idle"
              ? copy.useMyLocation
              : copy.refresh}
        </Button>
      </header>

      {status.state === "error" ? (
        <SectionBanner
          tone={coords ? "warn" : "error"}
          title={
            coords
              ? copy.lastKnown
              : status.permissionDenied
                ? copy.blocked
                : copy.unavailable
          }
          description={status.message}
          action={
            <button
              type="button"
              onClick={request}
              className="text-xs font-bold underline"
            >
              {copy.tryAgain}
            </button>
          }
        />
      ) : null}

      {status.state === "idle" || status.state === "requesting" ? (
        <SectionBanner
          tone="info"
          title={
            status.state === "requesting"
              ? copy.asking
              : copy.useLocation
          }
          action={
            status.state === "idle" ? (
              <button
                type="button"
                onClick={request}
                className="text-xs font-bold underline"
              >
                {copy.allow}
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
