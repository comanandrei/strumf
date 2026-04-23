"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

function AuthPageInner() {
  const searchParams = useSearchParams();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
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
          typeof window !== "undefined" ? `${window.location.origin}/` : "/",
        redirect: true,
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Sign-in request failed";
      setError(msg);
      setLoadingSignIn(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-strumf-bg-top to-strumf-bg-bottom px-4 py-10 text-white">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Log in</h1>
          <p className="mt-1 text-sm text-white/80">
            Use your email and password. New users can register below.
          </p>
        </div>

        <div className="rounded-xl bg-white/10 p-6">
          {verified === "1" ? (
            <p className="mb-4 rounded-md bg-green-500/20 px-3 py-2 text-sm text-green-200">
              Your email is confirmed. Sign in with your password below.
            </p>
          ) : null}
          {urlError === "missing_token" ? (
            <p className="mb-4 rounded-md bg-amber-500/20 px-3 py-2 text-sm text-amber-100">
              That confirmation link is missing a token. Request a new registration or contact
              support.
            </p>
          ) : null}
          {urlError === "invalid_token" ? (
            <p className="mb-4 rounded-md bg-amber-500/20 px-3 py-2 text-sm text-amber-100">
              That confirmation link is invalid or expired. Register again with the same email to
              receive a new link.
            </p>
          ) : null}
          {errorCode === "service_unavailable" ? (
            <p className="mb-4 rounded-md bg-red-500/20 px-3 py-2 text-sm text-red-200">
              The app cannot reach PostgreSQL. Set <code className="rounded bg-black/30 px-1">DATABASE_URL</code>{" "}
              and <code className="rounded bg-black/30 px-1">DIRECT_URL</code> in{" "}
              <code className="rounded bg-black/30 px-1">.env</code>, run{" "}
              <code className="rounded bg-black/30 px-1">docker compose up -d</code> if you use the
              repo&apos;s database service, then{" "}
              <code className="rounded bg-black/30 px-1">npx prisma migrate dev</code>.
            </p>
          ) : null}
          {urlError === "Configuration" ? (
            <p className="mb-4 rounded-md bg-red-500/20 px-3 py-2 text-sm text-red-200">
              Sign-in failed for an internal reason. Check the dev server terminal for{" "}
              <code className="rounded bg-black/30 px-1">[auth]</code> logs, clear auth cookies for
              this site if you switched hosts, then try again.
            </p>
          ) : null}
          {urlError === "CredentialsSignin" && errorCode !== "service_unavailable" ? (
            <p className="mb-4 rounded-md bg-amber-500/20 px-3 py-2 text-sm text-amber-100">
              Invalid email or password.
            </p>
          ) : null}

          <form className="flex flex-col gap-3" onSubmit={onSignIn}>
            <label className="text-sm font-medium text-white/90" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="rounded-md bg-white/10 px-3 py-2 text-white placeholder:text-white/40"
              required
            />
            <label className="text-sm font-medium text-white/90" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="rounded-md bg-white/10 px-3 py-2 text-white placeholder:text-white/40"
              minLength={8}
              required
            />
            <button
              type="submit"
              className="mt-2 rounded-full bg-white/20 px-4 py-2 font-semibold hover:bg-white/30"
              disabled={loadingSignIn}
            >
              {loadingSignIn ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <div className="rounded-xl bg-white/10 p-6">
          <h2 className="mb-1 text-lg font-semibold">Create an account</h2>
          <p className="mb-4 text-sm text-white/80">
            We send a confirmation link first. Use{" "}
            <code className="rounded bg-black/30 px-1">SKIP_EMAIL_VERIFICATION=true</code> in dev
            to skip email.
          </p>

          <form className="flex flex-col gap-3" onSubmit={onRegister}>
            <label className="text-sm font-medium text-white/90" htmlFor="register-name">
              Name <span className="font-normal text-white/50">(optional)</span>
            </label>
            <input
              id="register-name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              className="rounded-md bg-white/10 px-3 py-2 text-white placeholder:text-white/40"
            />
            <label className="text-sm font-medium text-white/90" htmlFor="register-email">
              Email
            </label>
            <input
              id="register-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              className="rounded-md bg-white/10 px-3 py-2 text-white placeholder:text-white/40"
              required
            />
            <label className="text-sm font-medium text-white/90" htmlFor="register-password">
              Password <span className="text-white/50">(min 8 characters)</span>
            </label>
            <input
              id="register-password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              className="rounded-md bg-white/10 px-3 py-2 text-white placeholder:text-white/40"
              minLength={8}
              required
            />
            <button
              type="submit"
              className="mt-2 rounded-full bg-white/20 px-4 py-2 font-semibold hover:bg-white/30"
              disabled={loadingRegister}
            >
              {loadingRegister ? "Registering…" : "Register"}
            </button>
          </form>
        </div>

        {message ? <p className="text-center text-sm text-green-300">{message}</p> : null}
        {error ? <p className="text-center text-sm text-red-300">{error}</p> : null}
      </div>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-strumf-bg-top to-strumf-bg-bottom text-white">
          <p className="text-sm text-white/80">Loading…</p>
        </main>
      }
    >
      <AuthPageInner />
    </Suspense>
  );
}
