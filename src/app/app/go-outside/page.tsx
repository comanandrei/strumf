"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Button } from "~/app/_components/ui/button";
import { Card } from "~/app/_components/ui/card";
import { localeToIntl, type Locale } from "~/app/lib/i18n";
import { useI18n } from "~/app/lib/i18n-provider";

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
  const { locale } = useI18n();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const isBusy = loadState === "locating" || loadState === "loading";

  const statusText = useMemo(() => {
    if (loadState === "locating") return locale === "ro" ? "Asteptam permisiunea pentru locatie..." : "Waiting for browser location permission...";
    if (loadState === "loading") return locale === "ro" ? "Incarcam prognoza locala..." : "Loading your local forecast...";
    if (loadState === "ready" && weather) {
      return locale === "ro" ? `Actualizat pentru ${weather.locationName}` : `Updated for ${weather.locationName}`;
    }
    if (loadState === "error" && error) return error;
    return locale === "ro" ? "Foloseste locatia curenta pentru vremea locala de azi." : "Use your current location for today's local weather.";
  }, [error, loadState, locale, weather]);
  const copy = locale === "ro"
    ? {
        section: "Iesi afara",
        title: "Azi afara",
        current: "Vreme curenta",
        permission: "Permite locatia ca sa vezi temperatura, umiditatea si vantul din apropiere.",
        temperature: "Temperatura",
        humidity: "Umiditate",
        wind: "Vant",
        checking: "Verificam vremea...",
        refresh: "Actualizeaza vremea locatiei",
        useLocation: "Foloseste locatia mea",
        hourly: "Prognoza orara",
        fromNow: "De acum",
        hours: (count: number) => `${count} ore`,
        weatherBy: "Date meteo de la Open-Meteo.com",
        weatherError: "Nu am putut incarca vremea.",
        noLocation: "Acest browser nu suporta accesul la locatie.",
        https: "Accesul la locatie necesita o conexiune HTTPS securizata.",
      }
    : {
        section: "Go outside",
        title: "Today outside",
        current: "Current weather",
        permission: "Give location permission to see temperature, humidity, and wind near you.",
        temperature: "Temperature",
        humidity: "Humidity",
        wind: "Wind",
        checking: "Checking weather...",
        refresh: "Refresh location weather",
        useLocation: "Use my location",
        hourly: "Hourly forecast",
        fromNow: "From now",
        hours: (count: number) => `${count} hours`,
        weatherBy: "Weather data by Open-Meteo.com",
        weatherError: "Could not load the weather.",
        noLocation: "This browser does not support location access.",
        https: "Location access requires a secure HTTPS connection.",
      };

  const loadWeatherForCoordinates = useCallback(
    async (coordinates: StoredCoordinates, requestId?: number) => {
      const activeRequestId = requestId ?? ++requestIdRef.current;
      setLoadState("loading");
      setError(null);
      try {
        const forecast = await fetchWeather(coordinates.latitude, coordinates.longitude, locale);
        if (activeRequestId !== requestIdRef.current) return;
        setWeather(forecast);
        storeWeather(forecast);
        setLoadState("ready");
        setError(null);
      } catch (err) {
        if (activeRequestId !== requestIdRef.current) return;
        setLoadState("error");
        setError(err instanceof Error ? err.message : copy.weatherError);
      }
    },
    [copy.weatherError, locale],
  );

  const requestWeather = useCallback(() => {
    if (typeof window === "undefined") return;

    const requestId = ++requestIdRef.current;

    if (!("geolocation" in navigator)) {
      setLoadState("error");
      setError(copy.noLocation);
      return;
    }

    if (!window.isSecureContext) {
      setLoadState("error");
      setError(copy.https);
      return;
    }

    setLoadState("locating");
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        if (requestId !== requestIdRef.current) return;
        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        storeCoordinates(coordinates);
        await loadWeatherForCoordinates(coordinates, requestId);
      },
      (geoError) => {
        if (requestId !== requestIdRef.current) return;
        setLoadState("error");
        setError(locationErrorMessage(geoError, locale));
      },
      {
        enableHighAccuracy: false,
        maximumAge: 10 * 60 * 1000,
        timeout: 12_000,
      },
    );
  }, [copy.https, copy.noLocation, loadWeatherForCoordinates, locale]);

  useEffect(() => {
    const storedWeather = readStoredWeather();
    if (storedWeather) {
      setWeather(storedWeather);
      setLoadState("ready");
      setError(null);
    }

    const storedCoordinates = readStoredCoordinates();
    if (storedCoordinates) {
      void loadWeatherForCoordinates(storedCoordinates);
    }
  }, [loadWeatherForCoordinates]);

  return (
    <div className="flex flex-col gap-6 pb-8">
      <header>
        <p className="text-sm text-strumf-muted">{copy.section}</p>
        <h1 className="font-display text-4xl font-bold tracking-tight">{copy.title}</h1>
        <p className="mt-2 text-sm text-strumf-muted" aria-live="polite">
          {statusText}
        </p>
      </header>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
              {copy.current}
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
                {copy.permission}
              </p>
            )}
          </div>

          {weather ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[2rem] bg-gradient-primary p-5 text-white shadow-card">
                <p className="text-xs font-bold uppercase tracking-wide opacity-80">{copy.temperature}</p>
                <p className="font-display text-6xl font-bold leading-none">
                  {Math.round(weather.current.temperature)}
                  <span className="text-3xl">{weather.units.temperature}</span>
                </p>
              </div>
              <div className="grid gap-3">
                <WeatherMetric
                  label={copy.humidity}
                  value={`${Math.round(weather.current.humidity)}${weather.units.humidity}`}
                />
                <WeatherMetric
                  label={copy.wind}
                  value={`${Math.round(weather.current.windSpeed)} ${weather.units.windSpeed}`}
                />
              </div>
            </div>
          ) : null}

          {error ? (
            <p
              className="rounded-2xl bg-white/60 px-4 py-3 text-sm font-medium text-strumf-foreground"
              role="status"
            >
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
            {isBusy ? copy.checking : weather ? copy.refresh : copy.useLocation}
          </Button>
        </div>
      </Card>

      {weather ? (
        <Card>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
                {copy.hourly}
              </p>
              <h2 className="font-display text-lg font-semibold">{copy.fromNow}</h2>
            </div>
            <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-bold text-strumf-muted">
              {copy.hours(weather.hours.length)}
            </span>
          </div>

          <ul className="space-y-2">
            {weather.hours.map((hour) => (
              <li
                key={hour.time}
                className="grid grid-cols-[3.75rem_1fr_1fr_1fr] items-center gap-2 rounded-2xl bg-white/45 px-3 py-2 text-sm"
              >
                <span className="font-display text-sm font-semibold">{formatHour(hour.time, locale)}</span>
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
            {copy.weatherBy}
          </p>
        </Card>
      ) : null}
    </div>
  );
}

async function fetchWeather(latitude: number, longitude: number, locale: Locale): Promise<WeatherData> {
  const [weatherData, locationName] = await Promise.all([
    fetchWeatherForecast(latitude, longitude, locale),
    fetchLocationName(latitude, longitude, locale),
  ]);

  return {
    ...weatherData,
    locationName:
      locationName ??
      weatherData.timezoneAbbreviation ??
      weatherData.timezone ??
      (locale === "ro" ? "Locatia ta" : "Your location"),
  };
}

async function fetchWeatherForecast(
  latitude: number,
  longitude: number,
  locale: Locale,
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
    throw new Error(
      locale === "ro"
        ? "Serviciul meteo nu a raspuns. Incearca din nou intr-un moment."
        : "The weather service did not respond. Try again in a moment.",
    );
  }

  const data = (await response.json()) as OpenMeteoResponse;
  const hours = mapHourlyWeather(data).filter((hour) => {
    const hourTime = new Date(hour.time).getTime();
    return hourTime >= Date.now() - 30 * 60 * 1000;
  });
  if (!hours.length) {
    throw new Error(
      locale === "ro"
        ? "Nu mai exista prognoze orare pentru azi."
        : "There are no more hourly forecasts for today.",
    );
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

async function fetchLocationName(latitude: number, longitude: number, locale: Locale) {
  try {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      localityLanguage: locale,
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

function formatHour(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(localeToIntl(locale), {
    hour: "numeric",
  }).format(new Date(value));
}

function locationErrorMessage(error: GeolocationPositionError, locale: Locale) {
  if (error.code === error.PERMISSION_DENIED) {
    return locale === "ro"
      ? "Permisiunea pentru locatie a fost refuzata. Permite locatia ca sa incarci vremea din apropiere."
      : "Location permission was denied. Allow location access to load nearby weather.";
  }
  if (error.code === error.POSITION_UNAVAILABLE) {
    return locale === "ro"
      ? "Locatia curenta nu este disponibila. Incearca din nou cand dispozitivul are o locatie."
      : "Your current location is unavailable. Try again when the device has a location fix.";
  }
  if (error.code === error.TIMEOUT) {
    return locale === "ro"
      ? "Cautarea locatiei a expirat. Incearca din nou intr-un moment."
      : "Location lookup timed out. Try again in a moment.";
  }
  return locale === "ro" ? "Nu am putut citi locatia." : "Could not read your location.";
}

function readStoredCoordinates(): StoredCoordinates | null {
  if (typeof window === "undefined") return null;

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
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(COORDINATES_STORAGE_KEY, JSON.stringify(coordinates));
  } catch {
    // Location still works when storage is unavailable.
  }
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
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(WEATHER_STORAGE_KEY, JSON.stringify(weather));
  } catch {
    // Weather has already rendered; caching is best effort.
  }
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
