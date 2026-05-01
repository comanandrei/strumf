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
      // Full-page redirect avoids Auth.js parsing relative callback URLs client-side.
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-soft px-4 py-10 text-strumf-foreground">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="animate-float mx-auto mb-5 flex h-44 w-44 items-center justify-center rounded-full bg-gradient-primary text-7xl shadow-glow">
            👶
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight">Strumf</h1>
          <p className="mt-2 text-sm text-strumf-muted">
            A cozy diary for your little one, shared with the whole family.
          </p>
        </div>

        <div className="rounded-3xl border border-strumf-border bg-strumf-surface p-6 shadow-soft backdrop-blur">
          {verified === "1" ? (
            <p className="mb-4 rounded-2xl bg-strumf-success/15 px-3 py-2 text-sm text-strumf-success">
              Your email is confirmed. Sign in with your password below.
            </p>
          ) : null}
          {urlError === "missing_token" ? (
            <p className="mb-4 rounded-2xl bg-strumf-warm/70 px-3 py-2 text-sm text-strumf-foreground">
              That confirmation link is missing a token. Request a new registration or contact
              support.
            </p>
          ) : null}
          {urlError === "invalid_token" ? (
            <p className="mb-4 rounded-2xl bg-strumf-warm/70 px-3 py-2 text-sm text-strumf-foreground">
              That confirmation link is invalid or expired. Register again with the same email to
              receive a new link.
            </p>
          ) : null}
          {errorCode === "service_unavailable" ? (
            <p className="mb-4 rounded-2xl bg-strumf-danger/10 px-3 py-2 text-sm text-strumf-danger">
              The app cannot reach PostgreSQL. Set <code className="rounded bg-white/70 px-1">DATABASE_URL</code>{" "}
              and <code className="rounded bg-white/70 px-1">DIRECT_URL</code> in{" "}
              <code className="rounded bg-white/70 px-1">.env</code>, run{" "}
              <code className="rounded bg-white/70 px-1">docker compose up -d</code> if you use the
              repo&apos;s database service, then{" "}
              <code className="rounded bg-white/70 px-1">npx prisma migrate dev</code>.
            </p>
          ) : null}
          {urlError === "Configuration" ? (
            <p className="mb-4 rounded-2xl bg-strumf-danger/10 px-3 py-2 text-sm text-strumf-danger">
              Sign-in failed for an internal reason. Check the dev server terminal for{" "}
              <code className="rounded bg-white/70 px-1">[auth]</code> logs, clear auth cookies for
              this site if you switched hosts, then try again.
            </p>
          ) : null}
          {urlError === "CredentialsSignin" && errorCode !== "service_unavailable" ? (
            <p className="mb-4 rounded-2xl bg-strumf-warm/70 px-3 py-2 text-sm text-strumf-foreground">
              Invalid email or password.
            </p>
          ) : null}

          <form className="flex flex-col gap-3" onSubmit={onSignIn}>
            <h2 className="font-display mb-1 text-xl font-bold">Welcome back</h2>
            <label className="text-sm font-bold text-strumf-foreground/85" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="rounded-xl border border-strumf-border bg-white/70 px-3 py-3 text-strumf-foreground placeholder:text-strumf-muted/60"
              required
            />
            <label className="text-sm font-bold text-strumf-foreground/85" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="rounded-xl border border-strumf-border bg-white/70 px-3 py-3 text-strumf-foreground placeholder:text-strumf-muted/60"
              minLength={8}
              required
            />
            <button
              type="submit"
              className="transition-smooth mt-2 rounded-xl bg-gradient-primary px-4 py-3 font-bold text-white shadow-soft hover:shadow-glow"
              disabled={loadingSignIn}
            >
              {loadingSignIn ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-strumf-border bg-strumf-surface p-6 shadow-card backdrop-blur">
          <h2 className="font-display mb-1 text-xl font-bold">Create an account</h2>
          <p className="mb-4 text-sm text-strumf-muted">
            We send a confirmation link first. Use{" "}
            <code className="rounded bg-white/70 px-1">SKIP_EMAIL_VERIFICATION=true</code> in dev
            to skip email.
          </p>

          <form className="flex flex-col gap-3" onSubmit={onRegister}>
            <label className="text-sm font-bold text-strumf-foreground/85" htmlFor="register-name">
              Name <span className="font-normal text-strumf-muted">(optional)</span>
            </label>
            <input
              id="register-name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              className="rounded-xl border border-strumf-border bg-white/70 px-3 py-3 text-strumf-foreground placeholder:text-strumf-muted/60"
            />
            <label className="text-sm font-bold text-strumf-foreground/85" htmlFor="register-email">
              Email
            </label>
            <input
              id="register-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              className="rounded-xl border border-strumf-border bg-white/70 px-3 py-3 text-strumf-foreground placeholder:text-strumf-muted/60"
              required
            />
            <label className="text-sm font-bold text-strumf-foreground/85" htmlFor="register-password">
              Password <span className="text-strumf-muted">(min 8 characters)</span>
            </label>
            <input
              id="register-password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              className="rounded-xl border border-strumf-border bg-white/70 px-3 py-3 text-strumf-foreground placeholder:text-strumf-muted/60"
              minLength={8}
              required
            />
            <button
              type="submit"
              className="transition-smooth mt-2 rounded-xl bg-gradient-mint px-4 py-3 font-bold text-strumf-foreground shadow-card hover:shadow-soft"
              disabled={loadingRegister}
            >
              {loadingRegister ? "Registering..." : "Register"}
            </button>
          </form>
        </div>

        {message ? <p className="text-center text-sm text-strumf-success">{message}</p> : null}
        {error ? <p className="text-center text-sm text-strumf-danger">{error}</p> : null}
      </div>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-gradient-soft text-strumf-foreground">
          <p className="text-sm text-strumf-muted">Loading...</p>
        </main>
      }
    >
      <AuthPageInner />
    </Suspense>
  );
}
