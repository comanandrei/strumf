"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { Card } from "~/app/_components/ui/card";
import { localeToIntl, type Locale } from "~/app/lib/i18n";
import { useI18n } from "~/app/lib/i18n-provider";

import { SectionBanner } from "./section-banner";
import type { Coords } from "./use-location";

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
  fetchedAt: number;
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
  current_units?: Partial<
    Record<"temperature_2m" | "relative_humidity_2m" | "wind_speed_10m", string>
  >;
  hourly?: {
    time?: string[];
    temperature_2m?: number[];
    relative_humidity_2m?: number[];
    wind_speed_10m?: number[];
  };
  hourly_units?: Partial<
    Record<"temperature_2m" | "relative_humidity_2m" | "wind_speed_10m", string>
  >;
};

type ReverseGeocodeResponse = {
  city?: string;
  locality?: string;
  principalSubdivision?: string;
  countryName?: string;
};

const WEATHER_ENDPOINT = "https://api.open-meteo.com/v1/forecast";
const REVERSE_GEOCODE_ENDPOINT =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";
const WEATHER_STORAGE_KEY = "strumf.nearby.weather";

export function WeatherSection({ coords }: { coords: Coords | null }) {
  const { locale } = useI18n();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = readCachedWeather();
    if (cached) setWeather(cached);
  }, []);

  const load = useCallback(async (target: Coords) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(target, locale);
      setWeather(data);
      writeCachedWeather(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : locale === "ro" ? "Nu am putut incarca vremea." : "Could not load weather.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    if (!coords) return;
    void load(coords);
  }, [coords?.latitude, coords?.longitude, load]);

  const updatedLabel = useMemo(() => {
    if (!weather?.fetchedAt) return null;
    return formatRelativeTime(weather.fetchedAt, locale);
  }, [locale, weather?.fetchedAt]);
  const copy = locale === "ro"
    ? {
        weather: "Vreme",
        outside: "Afara",
        refreshError: "Nu am putut actualiza vremea",
        temperature: "Temperatura",
        humidity: "Umiditate",
        wind: "Vant",
        allowTitle: "Permite locatia ca sa vezi vremea de azi",
        allowDescription: "Open-Meteo este gratuit si are nevoie doar de coordonate.",
        by: "Vreme de la",
      }
    : {
        weather: "Weather",
        outside: "Outside",
        refreshError: "Could not refresh the weather",
        temperature: "Temperature",
        humidity: "Humidity",
        wind: "Wind",
        allowTitle: "Allow location to see today's weather",
        allowDescription: "Open-Meteo is free and needs only your coordinates.",
        by: "Weather by",
      };

  return (
    <Card className="overflow-hidden">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
            {copy.weather}
          </p>
          {weather ? (
            <h2 className="font-display text-lg font-semibold leading-tight">
              {weather.locationName}
            </h2>
          ) : (
            <h2 className="font-display text-lg font-semibold">{copy.outside}</h2>
          )}
        </div>
        {updatedLabel ? (
          <span className="shrink-0 rounded-full bg-white/60 px-3 py-1 text-[11px] font-bold text-strumf-muted">
            {updatedLabel}
          </span>
        ) : null}
      </div>

      {error ? (
        <SectionBanner
          tone="warn"
          title={copy.refreshError}
          description={error}
        />
      ) : null}

      {weather ? (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-3xl bg-gradient-primary p-4 text-white shadow-card">
              <p className="text-[11px] font-bold uppercase tracking-wide opacity-80">
                {copy.temperature}
              </p>
              <p className="font-display text-5xl font-bold leading-none">
                {Math.round(weather.current.temperature)}
                <span className="text-2xl">{weather.units.temperature}</span>
              </p>
            </div>
            <div className="grid gap-2">
              <Metric
                label={copy.humidity}
                value={`${Math.round(weather.current.humidity)}${weather.units.humidity}`}
              />
              <Metric
                label={copy.wind}
                value={`${Math.round(weather.current.windSpeed)} ${weather.units.windSpeed}`}
              />
            </div>
          </div>

          <ul className="mt-4 grid grid-cols-6 gap-2">
            {weather.hours.slice(0, 6).map((hour) => (
              <li
                key={hour.time}
                className="rounded-2xl bg-white/55 px-2 py-2 text-center text-[11px]"
              >
                <p className="font-display text-[11px] font-semibold text-strumf-muted">
                  {formatHour(hour.time, locale)}
                </p>
                <p className="font-display text-base font-bold leading-tight">
                  {Math.round(hour.temperature)}
                  {weather.units.temperature}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-3 text-center text-[10px] text-strumf-muted">
            {copy.by}{" "}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Open-Meteo
            </a>
          </p>
        </>
      ) : isLoading ? (
        <div className="space-y-2">
          <div className="h-24 w-full animate-pulse rounded-3xl bg-white/55" />
          <div className="h-12 w-full animate-pulse rounded-3xl bg-white/55" />
        </div>
      ) : !error ? (
        <SectionBanner
          tone="info"
          title={copy.allowTitle}
          description={copy.allowDescription}
        />
      ) : null}
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/55 p-3 text-center">
      <p className="text-[11px] font-bold uppercase tracking-wide text-strumf-muted">
        {label}
      </p>
      <p className="font-display text-2xl font-bold leading-tight">{value}</p>
    </div>
  );
}

async function fetchWeather(coords: Coords, locale: Locale): Promise<WeatherData> {
  const [forecast, locationName] = await Promise.all([
    fetchForecast(coords, locale),
    fetchLocationName(coords, locale),
  ]);
  return {
    ...forecast,
    locationName:
      locationName ??
      forecast.timezoneAbbreviation ??
      forecast.timezone ??
      locale === "ro" ? "Locatia ta" : "Your location",
    fetchedAt: Date.now(),
  };
}

async function fetchForecast(
  coords: Coords,
  locale: Locale,
): Promise<Omit<WeatherData, "locationName" | "fetchedAt">> {
  const params = new URLSearchParams({
    latitude: coords.latitude.toString(),
    longitude: coords.longitude.toString(),
    current: "temperature_2m,relative_humidity_2m,wind_speed_10m",
    hourly: "temperature_2m,relative_humidity_2m,wind_speed_10m",
    forecast_days: "1",
    timezone: "auto",
  });
  const response = await fetch(`${WEATHER_ENDPOINT}?${params}`);
  if (!response.ok) {
    throw new Error(
      locale === "ro"
        ? "Serviciul meteo nu a raspuns."
        : "The weather service did not respond.",
    );
  }
  const data = (await response.json()) as OpenMeteoResponse;
  const hours = mapHourlyWeather(data).filter((hour) => {
    const t = new Date(hour.time).getTime();
    return Number.isFinite(t) && t >= Date.now() - 30 * 60 * 1000;
  });
  if (!hours.length) {
    throw new Error(
      locale === "ro"
        ? "Nu mai exista prognoze orare pentru azi."
        : "No remaining hourly forecast for today.",
    );
  }
  const nearest = findNearestHour(hours);
  return {
    current: {
      time: data.current?.time ?? nearest.time,
      temperature: data.current?.temperature_2m ?? nearest.temperature,
      humidity: data.current?.relative_humidity_2m ?? nearest.humidity,
      windSpeed: data.current?.wind_speed_10m ?? nearest.windSpeed,
    },
    hours,
    timezone: data.timezone,
    timezoneAbbreviation: data.timezone_abbreviation,
    units: {
      temperature:
        data.current_units?.temperature_2m ??
        data.hourly_units?.temperature_2m ??
        "C",
      humidity:
        data.current_units?.relative_humidity_2m ??
        data.hourly_units?.relative_humidity_2m ??
        "%",
      windSpeed:
        data.current_units?.wind_speed_10m ??
        data.hourly_units?.wind_speed_10m ??
        "km/h",
    },
  };
}

async function fetchLocationName(coords: Coords, locale: Locale): Promise<string | null> {
  try {
    const params = new URLSearchParams({
      latitude: coords.latitude.toString(),
      longitude: coords.longitude.toString(),
      localityLanguage: locale,
    });
    const response = await fetch(`${REVERSE_GEOCODE_ENDPOINT}?${params}`);
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
  const temps = hourly?.temperature_2m;
  const humidity = hourly?.relative_humidity_2m;
  const wind = hourly?.wind_speed_10m;
  if (!times || !temps || !humidity || !wind) return [];
  return times.flatMap((time, i) => {
    const t = temps[i];
    const h = humidity[i];
    const w = wind[i];
    if (typeof t !== "number" || typeof h !== "number" || typeof w !== "number") {
      return [];
    }
    return [{ time, temperature: t, humidity: h, windSpeed: w }];
  });
}

function findNearestHour(hours: WeatherHour[]) {
  const now = Date.now();
  return hours.reduce((nearest, hour) => {
    const dN = Math.abs(new Date(nearest.time).getTime() - now);
    const dH = Math.abs(new Date(hour.time).getTime() - now);
    return dH < dN ? hour : nearest;
  }, hours[0]!);
}

function formatHour(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(localeToIntl(locale), { hour: "numeric" }).format(
    new Date(value),
  );
}

function formatRelativeTime(timestamp: number, locale: Locale): string {
  const diffSec = Math.max(0, Math.round((Date.now() - timestamp) / 1000));
  if (diffSec < 60) return locale === "ro" ? "chiar acum" : "just now";
  const min = Math.round(diffSec / 60);
  if (min < 60) return locale === "ro" ? `acum ${min} min` : `${min} min ago`;
  const hr = Math.round(min / 60);
  return locale === "ro" ? `acum ${hr} h` : `${hr} h ago`;
}

function readCachedWeather(): WeatherData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(WEATHER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as WeatherData;
    if (!parsed.current || !Array.isArray(parsed.hours) || !parsed.units) return null;
    const futureHours = parsed.hours.filter((hour) => {
      const t = new Date(hour.time).getTime();
      return Number.isFinite(t) && t >= Date.now() - 30 * 60 * 1000;
    });
    if (!futureHours.length) return null;
    return { ...parsed, hours: futureHours };
  } catch {
    return null;
  }
}

function writeCachedWeather(weather: WeatherData) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(WEATHER_STORAGE_KEY, JSON.stringify(weather));
  } catch {
    // ignore
  }
}
