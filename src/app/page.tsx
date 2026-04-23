import Link from "next/link";

import { auth } from "~/server/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-strumf-bg-top to-strumf-bg-bottom text-white">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-strumf-accent">Strumf</span>
        </h1>
        <p className="max-w-md text-center text-lg text-white/80">
          Baby feeding and care — households, caregivers, bottle logs, and more.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href={session ? "/app" : "/auth"}
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            {session ? "Open app" : "Log in"}
          </Link>
          {session ? (
            <Link
              href="/api/auth/signout"
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              Sign out
            </Link>
          ) : null}
        </div>
      </div>
    </main>
  );
}
