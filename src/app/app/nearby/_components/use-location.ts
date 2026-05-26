"use client";

import { useCallback, useEffect, useState } from "react";

export type Coords = { latitude: number; longitude: number };

export type LocationStatus =
  | { state: "idle" }
  | { state: "requesting" }
  | { state: "ready"; coords: Coords; updatedAt: number }
  | { state: "error"; coords: Coords | null; message: string };

const STORAGE_KEY = "strumf.nearby.coords";

export function useSharedLocation() {
  const [status, setStatus] = useState<LocationStatus>({ state: "idle" });

  const request = useCallback(() => {
    if (typeof window === "undefined") return;

    const failWithCachedCoords = (message: string) => {
      setStatus({
        state: "error",
        coords: readStoredCoords(),
        message,
      });
    };

    if (!("geolocation" in navigator)) {
      failWithCachedCoords("This device does not support location access.");
      return;
    }
    if (!window.isSecureContext) {
      failWithCachedCoords("Location access requires a secure HTTPS connection.");
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
          message: locationErrorMessage(error),
        });
      },
      { enableHighAccuracy: false, maximumAge: 5 * 60 * 1000, timeout: 12_000 },
    );
  }, []);

  useEffect(() => {
    const cached = readStoredCoords();
    if (cached) {
      setStatus({ state: "ready", coords: cached, updatedAt: 0 });
    }
  }, []);

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

function locationErrorMessage(error: GeolocationPositionError): string {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "Location permission denied. Allow access to see weather and nearby places.";
    case error.POSITION_UNAVAILABLE:
      return "Could not determine your location right now.";
    case error.TIMEOUT:
      return "Location request timed out. Please try again.";
    default:
      return "Something went wrong while getting your location.";
  }
}
