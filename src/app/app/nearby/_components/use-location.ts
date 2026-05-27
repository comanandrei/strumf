"use client";

import { useCallback, useEffect, useState } from "react";

import type { Locale } from "~/app/lib/i18n";

export type Coords = { latitude: number; longitude: number };

export type LocationStatus =
  | { state: "idle" }
  | { state: "requesting" }
  | { state: "ready"; coords: Coords; updatedAt: number }
  | {
      state: "error";
      coords: Coords | null;
      message: string;
      permissionDenied?: boolean;
    };

const STORAGE_KEY = "strumf.nearby.coords";

export function useSharedLocation(locale: Locale = "ro") {
  const [status, setStatus] = useState<LocationStatus>({ state: "idle" });

  const request = useCallback(async () => {
    if (typeof window === "undefined") return;

    const failWithCachedCoords = (message: string, permissionDenied = false) => {
      setStatus({
        state: "error",
        coords: readStoredCoords(),
        message,
        permissionDenied,
      });
    };

    if (!("geolocation" in navigator)) {
      failWithCachedCoords(
        locale === "ro"
          ? "Acest dispozitiv nu suporta accesul la locatie."
          : "This device does not support location access.",
      );
      return;
    }
    if (!window.isSecureContext) {
      failWithCachedCoords(
        locale === "ro"
          ? "Accesul la locatie necesita o conexiune HTTPS securizata."
          : "Location access requires a secure HTTPS connection.",
      );
      return;
    }
    if ((await readPermissionState()) === "denied") {
      failWithCachedCoords(blockedLocationMessage(locale), true);
      return;
    }

    setStatus({ state: "requesting" });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        storeCoords(coords);
        setStatus({ state: "ready", coords, updatedAt: Date.now() });
      },
      (error) => {
        const cached = readStoredCoords();
        setStatus({
          state: "error",
          coords: cached,
          message: locationErrorMessage(error, locale),
          permissionDenied: error.code === error.PERMISSION_DENIED,
        });
      },
      { enableHighAccuracy: false, maximumAge: 5 * 60 * 1000, timeout: 12_000 },
    );
  }, [locale]);

  useEffect(() => {
    const cached = readStoredCoords();
    if (cached) {
      setStatus({ state: "ready", coords: cached, updatedAt: 0 });
    }
    void readPermissionState().then((permission) => {
      if (permission !== "denied") return;
      setStatus({
        state: "error",
        coords: cached,
        message: blockedLocationMessage(locale),
        permissionDenied: true,
      });
    });
  }, [locale]);

  return { status, request };
}

export function effectiveCoords(status: LocationStatus): Coords | null {
  if (status.state === "ready") return status.coords;
  if (status.state === "error") return status.coords;
  return null;
}

function readStoredCoords(): Coords | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Coords>;
    if (typeof parsed.latitude !== "number" || typeof parsed.longitude !== "number") {
      return null;
    }
    return { latitude: parsed.latitude, longitude: parsed.longitude };
  } catch {
    return null;
  }
}

function storeCoords(coords: Coords) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(coords));
  } catch {
    // ignore storage failures (private mode, quota)
  }
}

async function readPermissionState(): Promise<PermissionState | null> {
  if (typeof navigator === "undefined" || !navigator.permissions?.query) {
    return null;
  }
  try {
    const permission = await navigator.permissions.query({
      name: "geolocation" as PermissionName,
    });
    return permission.state;
  } catch {
    return null;
  }
}

function blockedLocationMessage(locale: Locale): string {
  return locale === "ro"
    ? "Locatia este blocata pentru acest site. Deschide controalele site-ului din bara de adresa, permite Locatia, apoi incearca din nou."
    : "Location is blocked for this site. Tap the site controls in the address bar, allow Location, then try again.";
}

function locationErrorMessage(error: GeolocationPositionError, locale: Locale): string {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return blockedLocationMessage(locale);
    case error.POSITION_UNAVAILABLE:
      return locale === "ro"
        ? "Nu am putut determina locatia acum."
        : "Could not determine your location right now.";
    case error.TIMEOUT:
      return locale === "ro"
        ? "Cererea de locatie a expirat. Incearca din nou."
        : "Location request timed out. Please try again.";
    default:
      return locale === "ro"
        ? "Ceva nu a mers bine la obtinerea locatiei."
        : "Something went wrong while getting your location.";
  }
}
