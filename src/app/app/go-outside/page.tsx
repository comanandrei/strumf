"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Button } from "~/app/_components/ui/button";
import { Card } from "~/app/_components/ui/card";

type LoadState = "idle" | "locating" | "loading" | "ready" | "error";

type WeatherHour = {
  time: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
};

type WeatherData = {
  current: WeatherHour;
  hours: WeatherHour[];
  locationName: string;
  timezone?: string;
  timezoneAbbreviation?: string;
  units: {
    temperature: string;
    humidity: string;
    windSpeed: string;
  };
};

type OpenMeteoResponse = {
  timezone?: string;
  timezone_abbreviation?: string;
  current?: {
    time?: string;
    temperature_2m?: number;
    relative_humidity_2m?: number;
    wind_speed_10m?: number;
  };
  current_units?: Partial<Record<"temperature_2m" | "relative_humidity_2m" | "wind_speed_10m", string>>;
  hourly?: {
    time?: string[];
    temperature_2m?: number[];
    relative_humidity_2m?: number[];
    wind_speed_10m?: number[];
  };
  hourly_units?: Partial<Record<"temperature_2m" | "relative_humidity_2m" | "wind_speed_10m", string>>;
};

type ReverseGeocodeResponse = {
  city?: string;
  locality?: string;
  principalSubdivision?: string;
  countryName?: string;
};

type StoredCoordinates = {
  latitude: number;
  longitude: number;
};

const WEATHER_ENDPOINT = "https://api.open-meteo.com/v1/forecast";
const REVERSE_GEOCODE_ENDPOINT = "https://api.bigdatacloud.net/data/reverse-geocode-client";
const COORDINATES_STORAGE_KEY = "strumf.goOutside.coordinates";
const WEATHER_STORAGE_KEY = "strumf.goOutside.weather";

export default function GoOutsidePage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [error, setError] = useState<string | null>(null);
  const hasWeatherRef = useRef(false);

  const isBusy = loadState === "locating" || loadState === "loading";

  const statusText = useMemo(() => {
    if (loadState === "locating") return "Waiting for browser location permission...";
    if (loadState === "loading") return "Loading your local forecast...";
    if (loadState === "ready" && weather) {
      return `Updated for ${weather.locationName}`;
    }
    if (loadState === "error" && error) return error;
    return "Use your current location for today's local weather.";
  }, [error, loadState, weather]);

  const loadWeatherForCoordinates = useCallback(async (coordinates: StoredCoordinates) => {
    setLoadState("loading");
    try {
      const forecast = await fetchWeather(coordinates.latitude, coordinates.longitude);
      setWeather(forecast);
      storeWeather(forecast);
      hasWeatherRef.current = true;
      setLoadState("ready");
      setError(null);
    } catch (err) {
      setLoadState("error");
      setError(err instanceof Error ? err.message : "Could not load the weather.");
    }
  }, []);

  const requestWeather = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setLoadState("error");
      setError("This browser does not support location access.");
      return;
    }

    setLoadState("locating");
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        storeCoordinates(coordinates);
        await loadWeatherForCoordinates(coordinates);
      },
      (geoError) => {
        if (hasWeatherRef.current) {
          setLoadState("ready");
          return;
        }
        setLoadState("error");
        setError(locationErrorMessage(geoError));
      },
      {
        enableHighAccuracy: false,
        maximumAge: 10 * 60 * 1000,
        timeout: 12_000,
      },
    );
  }, [loadWeatherForCoordinates]);

  useEffect(() => {
    const storedWeather = readStoredWeather();
    if (storedWeather) {
      setWeather(storedWeather);
      hasWeatherRef.current = true;
      setLoadState("ready");
      setError(null);
    }

    const storedCoordinates = readStoredCoordinates();
    if (storedCoordinates) {
      void loadWeatherForCoordinates(storedCoordinates);
    }
    requestWeather();
  }, [loadWeatherForCoordinates, requestWeather]);

  return (
    <div className="flex flex-col gap-6 pb-8">
      <header>
        <p className="text-sm text-strumf-muted">Go outside</p>
        <h1 className="font-display text-4xl font-bold tracking-tight">Today outside</h1>
        <p className="mt-2 text-sm text-strumf-muted">{statusText}</p>
      </header>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
              Current weather
            </p>
            {weather ? (
              <div className="mt-2">
                <h2 className="font-display text-2xl font-bold leading-tight">
                  {weather.locationName}
                </h2>
                {weather.timezoneAbbreviation ? (
                  <p className="text-sm text-strumf-muted">{weather.timezoneAbbreviation}</p>
                ) : null}
              </div>
            ) : (
              <p className="mt-3 text-sm text-strumf-muted">
                Give location permission to see temperature, humidity, and wind near you.
              </p>
            )}
          </div>

          {weather ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[2rem] bg-gradient-primary p-5 text-white shadow-card">
                <p className="text-xs font-bold uppercase tracking-wide opacity-80">Temperature</p>
                <p className="font-display text-6xl font-bold leading-none">
                  {Math.round(weather.current.temperature)}
                  <span className="text-3xl">{weather.units.temperature}</span>
                </p>
              </div>
              <div className="grid gap-3">
                <WeatherMetric
                  label="Humidity"
                  value={`${Math.round(weather.current.humidity)}${weather.units.humidity}`}
                />
                <WeatherMetric
                  label="Wind"
                  value={`${Math.round(weather.current.windSpeed)} ${weather.units.windSpeed}`}
                />
              </div>
            </div>
          ) : null}

          {error ? (
            <p className="rounded-2xl bg-white/60 px-4 py-3 text-sm font-medium text-strumf-foreground">
              {error}
            </p>
          ) : null}

          <Button
            type="button"
            variant="accent"
            fullWidth
            disabled={isBusy}
            onClick={requestWeather}
          >
            {isBusy ? "Checking weather..." : weather ? "Refresh location weather" : "Use my location"}
          </Button>
        </div>
      </Card>

      {weather ? (
        <Card>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
                Hourly forecast
              </p>
              <h2 className="font-display text-lg font-semibold">From now</h2>
            </div>
            <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-bold text-strumf-muted">
              {weather.hours.length} hours
            </span>
          </div>

          <ul className="space-y-2">
            {weather.hours.map((hour) => (
              <li
                key={hour.time}
                className="grid grid-cols-[3.75rem_1fr_1fr_1fr] items-center gap-2 rounded-2xl bg-white/45 px-3 py-2 text-sm"
              >
                <span className="font-display text-sm font-semibold">{formatHour(hour.time)}</span>
                <span className="font-bold">
                  {Math.round(hour.temperature)}
                  {weather.units.temperature}
                </span>
                <span className="text-strumf-muted">
                  {Math.round(hour.humidity)}
                  {weather.units.humidity}
                </span>
                <span className="text-strumf-muted">
                  {Math.round(hour.windSpeed)} {weather.units.windSpeed}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-center text-xs text-strumf-muted">
            Weather data by Open-Meteo.com
          </p>
        </Card>
      ) : null}
    </div>
  );
}

async function fetchWeather(latitude: number, longitude: number): Promise<WeatherData> {
  const [weatherData, locationName] = await Promise.all([
    fetchWeatherForecast(latitude, longitude),
    fetchLocationName(latitude, longitude),
  ]);

  return {
    ...weatherData,
    locationName: locationName ?? weatherData.timezoneAbbreviation ?? weatherData.timezone ?? "Your location",
  };
}

async function fetchWeatherForecast(
  latitude: number,
  longitude: number,
): Promise<Omit<WeatherData, "locationName">> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: "temperature_2m,relative_humidity_2m,wind_speed_10m",
    hourly: "temperature_2m,relative_humidity_2m,wind_speed_10m",
    forecast_days: "1",
    timezone: "auto",
  });

  const response = await fetch(`${WEATHER_ENDPOINT}?${params.toString()}`);
  if (!response.ok) {
    throw new Error("The weather service did not respond. Try again in a moment.");
  }

  const data = (await response.json()) as OpenMeteoResponse;
  const hours = mapHourlyWeather(data).filter((hour) => {
    const hourTime = new Date(hour.time).getTime();
    return hourTime >= Date.now() - 30 * 60 * 1000;
  });
  if (!hours.length) {
    throw new Error("There are no more hourly forecasts for today.");
  }

  const nearestHour = findNearestHour(hours);
  const current: WeatherHour = {
    time: data.current?.time ?? nearestHour.time,
    temperature: data.current?.temperature_2m ?? nearestHour.temperature,
    humidity: data.current?.relative_humidity_2m ?? nearestHour.humidity,
    windSpeed: data.current?.wind_speed_10m ?? nearestHour.windSpeed,
  };

  return {
    current,
    hours,
    timezone: data.timezone,
    timezoneAbbreviation: data.timezone_abbreviation,
    units: {
      temperature: data.current_units?.temperature_2m ?? data.hourly_units?.temperature_2m ?? "C",
      humidity: data.current_units?.relative_humidity_2m ?? data.hourly_units?.relative_humidity_2m ?? "%",
      windSpeed: data.current_units?.wind_speed_10m ?? data.hourly_units?.wind_speed_10m ?? "km/h",
    },
  };
}

async function fetchLocationName(latitude: number, longitude: number) {
  try {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      localityLanguage: "en",
    });
    const response = await fetch(`${REVERSE_GEOCODE_ENDPOINT}?${params.toString()}`);
    if (!response.ok) return null;

    const data = (await response.json()) as ReverseGeocodeResponse;
    const locality = data.city ?? data.locality;
    const region = data.principalSubdivision;
    const country = data.countryName;
    return [locality, region, country].filter(Boolean).slice(0, 2).join(", ") || null;
  } catch {
    return null;
  }
}

function mapHourlyWeather(data: OpenMeteoResponse): WeatherHour[] {
  const hourly = data.hourly;
  const times = hourly?.time;
  const temperatures = hourly?.temperature_2m;
  const humidity = hourly?.relative_humidity_2m;
  const wind = hourly?.wind_speed_10m;

  if (!times || !temperatures || !humidity || !wind) return [];

  return times.flatMap((time, index) => {
    const temperature = temperatures[index];
    const humidityValue = humidity[index];
    const windSpeed = wind[index];

    if (
      typeof temperature !== "number" ||
      typeof humidityValue !== "number" ||
      typeof windSpeed !== "number"
    ) {
      return [];
    }

    return [{ time, temperature, humidity: humidityValue, windSpeed }];
  });
}

function findNearestHour(hours: WeatherHour[]) {
  const now = Date.now();
  return hours.reduce((nearest, hour) => {
    const nearestDelta = Math.abs(new Date(nearest.time).getTime() - now);
    const hourDelta = Math.abs(new Date(hour.time).getTime() - now);
    return hourDelta < nearestDelta ? hour : nearest;
  }, hours[0]!);
}

function formatHour(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
  }).format(new Date(value));
}

function locationErrorMessage(error: GeolocationPositionError) {
  if (error.code === error.PERMISSION_DENIED) {
    return "Location permission was denied. Allow location access to load nearby weather.";
  }
  if (error.code === error.POSITION_UNAVAILABLE) {
    return "Your current location is unavailable. Try again when the device has a location fix.";
  }
  if (error.code === error.TIMEOUT) {
    return "Location lookup timed out. Try again in a moment.";
  }
  return "Could not read your location.";
}

function readStoredCoordinates(): StoredCoordinates | null {
  try {
    const raw = window.localStorage.getItem(COORDINATES_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<StoredCoordinates>;
    if (typeof parsed.latitude !== "number" || typeof parsed.longitude !== "number") {
      return null;
    }

    return {
      latitude: parsed.latitude,
      longitude: parsed.longitude,
    };
  } catch {
    return null;
  }
}

function storeCoordinates(coordinates: StoredCoordinates) {
  window.localStorage.setItem(COORDINATES_STORAGE_KEY, JSON.stringify(coordinates));
}

function readStoredWeather(): WeatherData | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(WEATHER_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as WeatherData;
    if (!parsed.current || !Array.isArray(parsed.hours) || !parsed.units) {
      return null;
    }

    const futureHours = parsed.hours.filter((hour) => {
      const hourTime = new Date(hour.time).getTime();
      return Number.isFinite(hourTime) && hourTime >= Date.now() - 30 * 60 * 1000;
    });

    if (!futureHours.length) return null;

    return {
      ...parsed,
      hours: futureHours,
    };
  } catch {
    return null;
  }
}

function storeWeather(weather: WeatherData) {
  window.localStorage.setItem(WEATHER_STORAGE_KEY, JSON.stringify(weather));
}

function WeatherMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl bg-white/55 p-3 text-center">
      <p className="text-[11px] font-bold uppercase tracking-wide text-strumf-muted">{label}</p>
      <p className="font-display text-3xl font-bold leading-tight">{value}</p>
    </div>
  );
}
