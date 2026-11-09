"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { CreateHouseholdForm } from "~/app/_components/create-household-form";
import { Button } from "~/app/_components/ui/button";
import { Card } from "~/app/_components/ui/card";
import { useI18n } from "~/app/lib/i18n-provider";

export default function YouPage() {
  const { data: session, status } = useSession();
  const { locale } = useI18n();
  const copy = locale === "ro"
    ? {
        title: "Tu",
        subtitle: "Cont si familie",
        signedIn: "Autentificat",
        loading: "Se incarca...",
        sudo: "Bootstrap admin",
        newHousehold: "Familie noua",
        signOut: "Deconectare",
        home: "Pagina de prezentare",
      }
    : {
        title: "You",
        subtitle: "Account and household",
        signedIn: "Signed in",
        loading: "Loading...",
        sudo: "Bootstrap admin",
        newHousehold: "New household",
        signOut: "Sign out",
        home: "Marketing home",
      };

  return (
    <div className="flex flex-col gap-6 pb-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight">{copy.title}</h1>
        <p className="mt-1 text-sm text-strumf-muted">{copy.subtitle}</p>
      </header>

      <Card className="bg-gradient-blue">
        <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">{copy.signedIn}</p>
        {status === "loading" ? (
          <p className="mt-2 text-strumf-muted">{copy.loading}</p>
        ) : (
          <p className="mt-2 break-all font-display text-lg font-bold text-strumf-foreground">
            {session?.user?.email ?? "—"}
          </p>
        )}
        {session?.user && "isBootstrapAdmin" in session.user && session.user.isBootstrapAdmin ? (
          <p className="mt-2 text-xs text-strumf-accent">{copy.sudo}</p>
        ) : null}
      </Card>

      <Card>
        <h2 className="font-display mb-3 text-lg font-semibold">{copy.newHousehold}</h2>
        <CreateHouseholdForm />
      </Card>

      <div className="flex flex-col gap-3">
        <Button
          type="button"
          variant="ghost"
          className="border border-strumf-border"
          onClick={() => void signOut({ callbackUrl: "/" })}
        >
          {copy.signOut}
        </Button>
        <Link
          href="/"
          className="transition-smooth min-h-12 rounded-strumf-pill border border-strumf-border bg-white/45 py-3 text-center text-sm font-bold text-strumf-foreground/85 no-underline hover:bg-white/75"
        >
          {copy.home}
        </Link>
      </div>
    </div>
  );
}
