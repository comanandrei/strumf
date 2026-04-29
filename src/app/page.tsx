import Link from "next/link";

import { auth } from "~/server/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-soft text-strumf-foreground">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 text-center">
        <div className="animate-float flex h-44 w-44 items-center justify-center rounded-full bg-gradient-primary text-7xl shadow-glow">
          👶
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-strumf-muted">
            Little moments
          </p>
          <h1 className="font-display mt-2 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Strumf
          </h1>
        </div>
        <p className="max-w-md text-lg leading-8 text-strumf-muted">
          A cozy diary for feeding and care, shared with the whole family.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href={session ? "/app" : "/auth"}
            className="rounded-full bg-gradient-primary px-10 py-3 font-bold text-white no-underline shadow-soft transition-smooth hover:shadow-glow"
          >
            {session ? "Open app" : "Log in"}
          </Link>
          {session ? (
            <Link
              href="/api/auth/signout"
              className="rounded-full bg-white/60 px-10 py-3 font-bold text-strumf-foreground no-underline shadow-card transition-smooth hover:bg-white"
            >
              Sign out
            </Link>
          ) : (
            <Link
              href="/auth"
              className="rounded-full bg-white/60 px-10 py-3 font-bold text-strumf-foreground no-underline shadow-card transition-smooth hover:bg-white"
            >
              Create account
            </Link>
          )}
        </div>
        <div className="grid w-full max-w-2xl gap-3 pt-2 sm:grid-cols-3">
          <MiniCard title="Fast logging" text="One-thumb milk entries." />
          <MiniCard title="Shared care" text="Households and caregivers." />
          <MiniCard title="Warm history" text="Recent feeds at a glance." />
        </div>
      </div>
    </main>
  );
}

function MiniCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-strumf-border bg-strumf-surface p-4 text-left shadow-card backdrop-blur">
      <h2 className="font-display text-lg font-bold">{title}</h2>
      <p className="mt-1 text-sm text-strumf-muted">{text}</p>
    </div>
  );
}
