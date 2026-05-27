"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { LanguageSwitcher, localized } from "~/app/_components/language-switcher";
import { useI18n } from "~/app/lib/i18n-provider";

// Demo credentials for the seeded household — prefilled in both dev and prod
// so the deployed app is immediately usable without an account. Remove this
// (and reset the password) when the app moves past the demo phase.
const DEMO_LOGIN_PREFILL = {
  email: "andrei.coman.88@gmail.com",
  password: "Password123!",
};

function AuthPageInner() {
  const searchParams = useSearchParams();
  const { locale } = useI18n();
  const [loginEmail, setLoginEmail] = useState(DEMO_LOGIN_PREFILL.email);
  const [loginPassword, setLoginPassword] = useState(DEMO_LOGIN_PREFILL.password);
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
  const copy = localized(
    locale,
    {
      subtitle: "Un jurnal cald pentru cel mic, impartit cu toata familia.",
      registrationFailed: "Inregistrarea a esuat",
      registrationComplete: "Inregistrarea este completa",
      signInFailed: "Cererea de autentificare a esuat",
      verified: "Emailul este confirmat. Autentifica-te cu parola mai jos.",
      missingToken: "Linkul de confirmare nu contine token. Cere o inregistrare noua sau contacteaza suportul.",
      invalidToken: "Linkul de confirmare este invalid sau expirat. Inregistreaza-te din nou cu acelasi email pentru un link nou.",
      dbUnavailable: "Aplicatia nu poate contacta PostgreSQL. Seteaza",
      dbUnavailableTail: "apoi ruleaza",
      configError: "Autentificarea a esuat dintr-un motiv intern. Verifica terminalul dev server pentru logurile",
      configErrorTail: "sterge cookie-urile de autentificare pentru acest site daca ai schimbat hostul, apoi incearca din nou.",
      invalidCredentials: "Email sau parola invalide.",
      welcomeBack: "Bine ai revenit",
      email: "Email",
      password: "Parola",
      signIn: "Autentificare",
      signingIn: "Se autentifica...",
      createAccount: "Creeaza cont",
      registrationHint: "Trimitem mai intai un link de confirmare. Foloseste",
      registrationHintTail: "in dev ca sa sari peste email.",
      name: "Nume",
      optional: "optional",
      yourName: "Numele tau",
      minPassword: "minim 8 caractere",
      registering: "Se inregistreaza...",
      register: "Inregistreaza",
      loading: "Se incarca...",
    },
    {
      subtitle: "A cozy diary for your little one, shared with the whole family.",
      registrationFailed: "Registration failed",
      registrationComplete: "Registration complete",
      signInFailed: "Sign-in request failed",
      verified: "Your email is confirmed. Sign in with your password below.",
      missingToken: "That confirmation link is missing a token. Request a new registration or contact support.",
      invalidToken: "That confirmation link is invalid or expired. Register again with the same email to receive a new link.",
      dbUnavailable: "The app cannot reach PostgreSQL. Set",
      dbUnavailableTail: "then run",
      configError: "Sign-in failed for an internal reason. Check the dev server terminal for",
      configErrorTail: "logs, clear auth cookies for this site if you switched hosts, then try again.",
      invalidCredentials: "Invalid email or password.",
      welcomeBack: "Welcome back",
      email: "Email",
      password: "Password",
      signIn: "Sign in",
      signingIn: "Signing in...",
      createAccount: "Create an account",
      registrationHint: "We send a confirmation link first. Use",
      registrationHintTail: "in dev to skip email.",
      name: "Name",
      optional: "optional",
      yourName: "Your name",
      minPassword: "min 8 characters",
      registering: "Registering...",
      register: "Register",
      loading: "Loading...",
    },
  );

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
      setError(data.error ?? copy.registrationFailed);
      setLoadingRegister(false);
      return;
    }

    setMessage(data.message ?? copy.registrationComplete);
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
      const msg = e instanceof Error ? e.message : copy.signInFailed;
      setError(msg);
      setLoadingSignIn(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-soft px-4 py-10 text-strumf-foreground">
      <div className="fixed right-4 top-4 z-10">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="animate-float mx-auto mb-5 flex h-44 w-44 items-center justify-center rounded-full bg-gradient-primary text-7xl shadow-glow">
            👶
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight">Strumf</h1>
          <p className="mt-2 text-sm text-strumf-muted">{copy.subtitle}</p>
        </div>

        <div className="rounded-3xl border border-strumf-border bg-strumf-surface p-6 shadow-soft backdrop-blur">
          {verified === "1" ? (
            <p className="mb-4 rounded-2xl bg-strumf-success/15 px-3 py-2 text-sm text-strumf-success">
              {copy.verified}
            </p>
          ) : null}
          {urlError === "missing_token" ? (
            <p className="mb-4 rounded-2xl bg-strumf-warm/70 px-3 py-2 text-sm text-strumf-foreground">
              {copy.missingToken}
            </p>
          ) : null}
          {urlError === "invalid_token" ? (
            <p className="mb-4 rounded-2xl bg-strumf-warm/70 px-3 py-2 text-sm text-strumf-foreground">
              {copy.invalidToken}
            </p>
          ) : null}
          {errorCode === "service_unavailable" ? (
            <p className="mb-4 rounded-2xl bg-strumf-danger/10 px-3 py-2 text-sm text-strumf-danger">
              {copy.dbUnavailable} <code className="rounded bg-white/70 px-1">DATABASE_URL</code>{" "}
              and <code className="rounded bg-white/70 px-1">DIRECT_URL</code> in{" "}
              <code className="rounded bg-white/70 px-1">.env</code>,{" "}
              <code className="rounded bg-white/70 px-1">docker compose up -d</code> if you use the
              repo&apos;s database service, {copy.dbUnavailableTail}{" "}
              <code className="rounded bg-white/70 px-1">npx prisma migrate dev</code>.
            </p>
          ) : null}
          {urlError === "Configuration" ? (
            <p className="mb-4 rounded-2xl bg-strumf-danger/10 px-3 py-2 text-sm text-strumf-danger">
              {copy.configError} <code className="rounded bg-white/70 px-1">[auth]</code>{" "}
              {copy.configErrorTail}
            </p>
          ) : null}
          {urlError === "CredentialsSignin" && errorCode !== "service_unavailable" ? (
            <p className="mb-4 rounded-2xl bg-strumf-warm/70 px-3 py-2 text-sm text-strumf-foreground">
              {copy.invalidCredentials}
            </p>
          ) : null}

          <form className="flex flex-col gap-3" onSubmit={onSignIn}>
            <h2 className="font-display mb-1 text-xl font-bold">{copy.welcomeBack}</h2>
            <label className="text-sm font-bold text-strumf-foreground/85" htmlFor="login-email">
              {copy.email}
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
              {copy.password}
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
              {loadingSignIn ? copy.signingIn : copy.signIn}
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-strumf-border bg-strumf-surface p-6 shadow-card backdrop-blur">
          <h2 className="font-display mb-1 text-xl font-bold">{copy.createAccount}</h2>
          <p className="mb-4 text-sm text-strumf-muted">
            {copy.registrationHint}{" "}
            <code className="rounded bg-white/70 px-1">SKIP_EMAIL_VERIFICATION=true</code> in dev
            {copy.registrationHintTail}
          </p>

          <form className="flex flex-col gap-3" onSubmit={onRegister}>
            <label className="text-sm font-bold text-strumf-foreground/85" htmlFor="register-name">
              {copy.name} <span className="font-normal text-strumf-muted">({copy.optional})</span>
            </label>
            <input
              id="register-name"
              type="text"
              autoComplete="name"
              placeholder={copy.yourName}
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              className="rounded-xl border border-strumf-border bg-white/70 px-3 py-3 text-strumf-foreground placeholder:text-strumf-muted/60"
            />
            <label className="text-sm font-bold text-strumf-foreground/85" htmlFor="register-email">
              {copy.email}
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
              {copy.password} <span className="text-strumf-muted">({copy.minPassword})</span>
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
              {loadingRegister ? copy.registering : copy.register}
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
          <p className="text-sm text-strumf-muted">Se incarca...</p>
        </main>
      }
    >
      <AuthPageInner />
    </Suspense>
  );
}
