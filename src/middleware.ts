import { NextResponse, type NextRequest } from "next/server";

/**
 * Mirrors @auth/core `isValidHttpUrl` (used in assertConfig). Invalid values make Auth.js abort
 * with a redirect to `?error=Configuration` before sign-in runs.
 */
function isValidAuthCallbackUrl(value: string, origin: string): boolean {
  try {
    return /^https?:/.test(
      new URL(value, value.startsWith("/") ? origin : undefined).protocol,
    );
  } catch {
    return false;
  }
}

function absoluteCallbackWrongOrigin(
  value: string,
  requestOrigin: string,
): boolean {
  if (value.startsWith("/")) return false;
  try {
    return new URL(value).origin !== requestOrigin;
  } catch {
    return true;
  }
}

/** Auth.js v5 + legacy NextAuth v4 cookie names (browsers may still send v4 after upgrades). */
const CALLBACK_COOKIE_NAMES = [
  "authjs.callback-url",
  "__Secure-authjs.callback-url",
  "next-auth.callback-url",
  "__Secure-next-auth.callback-url",
] as const;

function removeNamedCookies(
  cookieHeader: string,
  names: ReadonlySet<string>,
): string | null {
  const parts = cookieHeader
    .split(";")
    .map((p) => p.trim())
    .filter(Boolean);
  const kept = parts.filter((part) => {
    const eq = part.indexOf("=");
    if (eq === -1) return true;
    const n = part.slice(0, eq).trim();
    return !names.has(n);
  });
  if (kept.length === 0) return null;
  return kept.join("; ");
}

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // assertConfig only checks the URL query (not POST body). A bad `callbackUrl` in the query
  // makes Auth.js redirect with `error=Configuration` before the route handler runs.
  if (request.method === "GET") {
    const u = request.nextUrl.clone();
    const cb = u.searchParams.get("callbackUrl");
    if (cb && !isValidAuthCallbackUrl(cb, u.origin)) {
      u.searchParams.delete("callbackUrl");
      return NextResponse.redirect(u);
    }
  }

  const origin = request.nextUrl.origin;
  const isProd = process.env.NODE_ENV === "production";

  const namesToStrip = new Set<string>();
  for (const name of CALLBACK_COOKIE_NAMES) {
    const raw = request.cookies.get(name)?.value;
    if (!raw) continue;
    if (!isValidAuthCallbackUrl(raw, origin)) {
      namesToStrip.add(name);
      continue;
    }
    if (!isProd && absoluteCallbackWrongOrigin(raw, origin)) {
      namesToStrip.add(name);
    }
  }

  if (namesToStrip.size === 0) {
    return NextResponse.next();
  }

  const cookieHeader = request.headers.get("cookie") ?? "";
  const nextCookie = removeNamedCookies(cookieHeader, namesToStrip);

  const requestHeaders = new Headers(request.headers);
  if (nextCookie === null) requestHeaders.delete("cookie");
  else requestHeaders.set("cookie", nextCookie);

  const res = NextResponse.next({ request: { headers: requestHeaders } });
  const secure = request.nextUrl.protocol === "https:";
  for (const name of namesToStrip) {
    res.cookies.set(name, "", {
      path: "/",
      maxAge: 0,
      httpOnly: true,
      sameSite: "lax",
      secure,
    });
  }
  return res;
}

export const config = {
  matcher: ["/api/auth/:path*"],
};
