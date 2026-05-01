"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const TEMP_DEV_LOGIN_PREFILL =
  process.env.NODE_ENV === "development"
    ? {
        email: "andrei.coman.88@gmail.com",
        password: "Password123!",
      }
    : null;

function AuthPageInner() {
  const searchParams = useSearchParams();
  const [loginEmail, setLoginEmail] = useState(TEMP_DEV_LOGIN_PREFILL?.email ?? "");
  const [loginPassword, setLoginPassword] = useState(TEMP_DEV_LOGIN_PREFILL?.password ?? "");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingSignIn, setLoadingSignIn] = useState(false);

  const urlError = searchParams.get("error");
  const errorCode = searchParams.get("code");
  const verified = searchParams.get("verified");

  const onRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingRegister(true);
    setMessage(null);
    setError(null);

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: registerEmail,
        password: registerPassword,
        name: registerName,
      }),
    });

    const data = (await response.json()) as { error?: string; message?: string };
    if (!response.ok) {
      setError(data.error ?? "Registration failed");
      setLoadingRegister(false);
      return;
    }

    setMessage(data.message ?? "Registration complete");
    setLoadingRegister(false);
  };

  const onSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingSignIn(true);
    setMessage(null);
    setError(null);

    try {
      // `redirect: false` makes next-auth parse `data.url` with `new URL(data.url)`, which
      // throws for relative URLs like `/` and breaks the return path — no redirect happens.
      // Full-page redirect lets Auth.js use `data.url ?? callbackUrl` without that bug.
      await signIn("credentials", {
        email: loginEmail,
        password: loginPassword,
        callbackUrl:
          typeof window !== "undefined" ? `${window.location.origin}/app` : "/app",
        redirect: true,
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Sign-in request failed";
      setError(msg);
      setLoadingSignIn(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(180deg,#fbf8ef_0%,#eef7f1_100%)] px-4 py-10 text-[#22332d]">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Log in</h1>
          <p className="mt-1 text-sm text-[#5f7068]">
            Use your email and password. New users can register below.
          </p>
        </div>

        <div className="rounded-3xl border border-[#d7e5dd] bg-white/85 p-6 shadow-[0_18px_50px_rgba(127,161,148,0.18)] backdrop-blur">
          {verified === "1" ? (
            <p className="mb-4 rounded-md bg-green-100 px-3 py-2 text-sm text-green-800">
              Your email is confirmed. Sign in with your password below.
            </p>
          ) : null}
          {urlError === "missing_token" ? (
            <p className="mb-4 rounded-md bg-amber-100 px-3 py-2 text-sm text-amber-900">
              That confirmation link is missing a token. Request a new registration or contact
              support.
            </p>
          ) : null}
          {urlError === "invalid_token" ? (
            <p className="mb-4 rounded-md bg-amber-100 px-3 py-2 text-sm text-amber-900">
              That confirmation link is invalid or expired. Register again with the same email to
              receive a new link.
            </p>
          ) : null}
          {errorCode === "service_unavailable" ? (
            <p className="mb-4 rounded-md bg-red-100 px-3 py-2 text-sm text-red-800">
              The app cannot reach PostgreSQL. Set <code className="rounded bg-black/10 px-1">DATABASE_URL</code>{" "}
              and <code className="rounded bg-black/10 px-1">DIRECT_URL</code> in{" "}
              <code className="rounded bg-black/10 px-1">.env</code>, run{" "}
              <code className="rounded bg-black/10 px-1">docker compose up -d</code> if you use the
              repo&apos;s database service, then{" "}
              <code className="rounded bg-black/10 px-1">npx prisma migrate dev</code>.
            </p>
          ) : null}
          {urlError === "Configuration" ? (
            <p className="mb-4 rounded-md bg-red-100 px-3 py-2 text-sm text-red-800">
              Sign-in failed for an internal reason. Check the dev server terminal for{" "}
              <code className="rounded bg-black/10 px-1">[auth]</code> logs, clear auth cookies for
              this site if you switched hosts, then try again.
            </p>
          ) : null}
          {urlError === "CredentialsSignin" && errorCode !== "service_unavailable" ? (
            <p className="mb-4 rounded-md bg-amber-100 px-3 py-2 text-sm text-amber-900">
              Invalid email or password.
            </p>
          ) : null}

          <form className="flex flex-col gap-3" onSubmit={onSignIn}>
            <label className="text-sm font-medium text-[#42564e]" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="rounded-xl border border-[#cbdcd3] bg-white px-3 py-2 text-[#22332d] shadow-sm outline-none placeholder:text-[#8da39a] focus:border-[#7fa194] focus:ring-2 focus:ring-[#7fa194]/20"
              required
            />
            <label className="text-sm font-medium text-[#42564e]" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="rounded-xl border border-[#cbdcd3] bg-white px-3 py-2 text-[#22332d] shadow-sm outline-none placeholder:text-[#8da39a] focus:border-[#7fa194] focus:ring-2 focus:ring-[#7fa194]/20"
              minLength={8}
              required
            />
            <button
              type="submit"
              className="mt-2 rounded-full bg-[#7fa194] px-4 py-2 font-semibold text-white shadow-[0_10px_30px_rgba(127,161,148,0.28)] hover:bg-[#6d9184] disabled:opacity-60"
              disabled={loadingSignIn}
            >
              {loadingSignIn ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-[#d7e5dd] bg-white/85 p-6 shadow-[0_18px_50px_rgba(127,161,148,0.18)] backdrop-blur">
          <h2 className="mb-1 text-lg font-semibold">Create an account</h2>
          <p className="mb-4 text-sm text-[#5f7068]">
            We send a confirmation link first. Use{" "}
            <code className="rounded bg-black/10 px-1 text-[#22332d]">SKIP_EMAIL_VERIFICATION=true</code> in dev
            to skip email.
          </p>

          <form className="flex flex-col gap-3" onSubmit={onRegister}>
            <label className="text-sm font-medium text-[#42564e]" htmlFor="register-name">
              Name <span className="font-normal text-[#7b8e86]">(optional)</span>
            </label>
            <input
              id="register-name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              className="rounded-xl border border-[#cbdcd3] bg-white px-3 py-2 text-[#22332d] shadow-sm outline-none placeholder:text-[#8da39a] focus:border-[#7fa194] focus:ring-2 focus:ring-[#7fa194]/20"
            />
            <label className="text-sm font-medium text-[#42564e]" htmlFor="register-email">
              Email
            </label>
            <input
              id="register-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              className="rounded-xl border border-[#cbdcd3] bg-white px-3 py-2 text-[#22332d] shadow-sm outline-none placeholder:text-[#8da39a] focus:border-[#7fa194] focus:ring-2 focus:ring-[#7fa194]/20"
              required
            />
            <label className="text-sm font-medium text-[#42564e]" htmlFor="register-password">
              Password <span className="text-[#7b8e86]">(min 8 characters)</span>
            </label>
            <input
              id="register-password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              className="rounded-xl border border-[#cbdcd3] bg-white px-3 py-2 text-[#22332d] shadow-sm outline-none placeholder:text-[#8da39a] focus:border-[#7fa194] focus:ring-2 focus:ring-[#7fa194]/20"
              minLength={8}
              required
            />
            <button
              type="submit"
              className="mt-2 rounded-full bg-[#7fa194] px-4 py-2 font-semibold text-white shadow-[0_10px_30px_rgba(127,161,148,0.28)] hover:bg-[#6d9184] disabled:opacity-60"
              disabled={loadingRegister}
            >
              {loadingRegister ? "Registering…" : "Register"}
            </button>
          </form>
        </div>

        {message ? <p className="text-center text-sm font-medium text-green-800">{message}</p> : null}
        {error ? <p className="text-center text-sm font-medium text-red-800">{error}</p> : null}
      </div>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#fbf8ef_0%,#eef7f1_100%)] text-[#22332d]">
          <p className="text-sm text-[#5f7068]">Loading…</p>
        </main>
      }
    >
      <AuthPageInner />
    </Suspense>
  );
}
