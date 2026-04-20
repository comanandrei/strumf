"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingSignIn, setLoadingSignIn] = useState(false);

  const onRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingRegister(true);
    setMessage(null);
    setError(null);

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
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

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
      redirect: false,
    });

    if (!result || result.error) {
      setError(
        "Sign-in failed. Confirm credentials and ensure the account is activated in DB.",
      );
      setLoadingSignIn(false);
      return;
    }

    window.location.href = result.url ?? "/";
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] px-4 text-white">
      <div className="w-full max-w-md rounded-xl bg-white/10 p-6">
        <h1 className="mb-4 text-2xl font-bold">Authentication</h1>
        <p className="mb-6 text-sm text-white/80">
          Register, then activate the user by setting <code>isActive=true</code>{" "}
          in the database.
        </p>

        <form className="mb-6 flex flex-col gap-3" onSubmit={onRegister}>
          <h2 className="text-lg font-semibold">Register</h2>
          <input
            type="text"
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md bg-white/10 px-3 py-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md bg-white/10 px-3 py-2"
            required
          />
          <input
            type="password"
            placeholder="Password (min 8 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md bg-white/10 px-3 py-2"
            minLength={8}
            required
          />
          <button
            type="submit"
            className="rounded-full bg-white/20 px-4 py-2 font-semibold hover:bg-white/30"
            disabled={loadingRegister}
          >
            {loadingRegister ? "Registering..." : "Register"}
          </button>
        </form>

        <form className="flex flex-col gap-3" onSubmit={onSignIn}>
          <h2 className="text-lg font-semibold">Sign In</h2>
          <button
            type="submit"
            className="rounded-full bg-white/20 px-4 py-2 font-semibold hover:bg-white/30"
            disabled={loadingSignIn}
          >
            {loadingSignIn ? "Signing in..." : "Sign in with credentials"}
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-green-300">{message}</p> : null}
        {error ? <p className="mt-2 text-sm text-red-300">{error}</p> : null}
      </div>
    </main>
  );
}
