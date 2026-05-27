"use client";

import Image from "next/image";
import Link from "next/link";

import { LanguageSwitcher, localized } from "~/app/_components/language-switcher";
import { useI18n } from "~/app/lib/i18n-provider";

export function HomeContent({ isSignedIn }: { isSignedIn: boolean }) {
  const { locale } = useI18n();

  const copy = localized(
    locale,
    {
      imageAlt: "Ilustratie cu bebelus dormind",
      eyebrow: "Momente mici",
      description:
        "Un jurnal cald pentru hraniri si ingrijire, impartit cu toata familia.",
      primaryCta: isSignedIn ? "Deschide aplicatia" : "Autentificare",
      secondaryCta: isSignedIn ? "Deconectare" : "Creeaza cont",
      cards: [
        { title: "Notare rapida", text: "Hraniri salvate cu un singur deget." },
        { title: "Ingrijire impreuna", text: "Familii si ingrijitori conectati." },
        { title: "Istoric cald", text: "Ultimele hraniri dintr-o privire." },
      ],
    },
    {
      imageAlt: "Sleeping baby illustration",
      eyebrow: "Little moments",
      description:
        "A cozy diary for feeding and care, shared with the whole family.",
      primaryCta: isSignedIn ? "Open app" : "Log in",
      secondaryCta: isSignedIn ? "Sign out" : "Create account",
      cards: [
        { title: "Fast logging", text: "One-thumb milk entries." },
        { title: "Shared care", text: "Households and caregivers." },
        { title: "Warm history", text: "Recent feeds at a glance." },
      ],
    },
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-soft text-strumf-foreground">
      <div className="fixed right-4 top-4 z-10">
        <LanguageSwitcher />
      </div>
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 text-center">
        <Image
          src="/baby-hero.jpg"
          alt={copy.imageAlt}
          width={176}
          height={176}
          priority
          className="animate-float h-44 w-44 rounded-full object-cover shadow-glow"
        />
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-strumf-muted">
            {copy.eyebrow}
          </p>
          <h1 className="font-display mt-2 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Strumf
          </h1>
        </div>
        <p className="max-w-md text-lg leading-8 text-strumf-muted">{copy.description}</p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href={isSignedIn ? "/app" : "/auth"}
            className="rounded-full bg-gradient-primary px-10 py-3 font-bold text-white no-underline shadow-soft transition-smooth hover:shadow-glow"
          >
            {copy.primaryCta}
          </Link>
          <Link
            href={isSignedIn ? "/api/auth/signout" : "/auth"}
            className="rounded-full bg-white/60 px-10 py-3 font-bold text-strumf-foreground no-underline shadow-card transition-smooth hover:bg-white"
          >
            {copy.secondaryCta}
          </Link>
        </div>
        <div className="grid w-full max-w-2xl gap-3 pt-2 sm:grid-cols-3">
          {copy.cards.map((card) => (
            <MiniCard key={card.title} title={card.title} text={card.text} />
          ))}
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
