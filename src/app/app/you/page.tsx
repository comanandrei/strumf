"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { CreateHouseholdForm } from "~/app/_components/create-household-form";
import { Button } from "~/app/_components/ui/button";
import { Card } from "~/app/_components/ui/card";

export default function YouPage() {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col gap-6 pb-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight">You</h1>
        <p className="mt-1 text-sm text-strumf-muted">Account and household</p>
      </header>

      <Card className="bg-gradient-blue">
        <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">Signed in</p>
        {status === "loading" ? (
          <p className="mt-2 text-strumf-muted">Loading…</p>
        ) : (
          <p className="mt-2 break-all font-display text-lg font-bold text-strumf-foreground">
            {session?.user?.email ?? "—"}
          </p>
        )}
        {session?.user && "isSudoAdmin" in session.user && session.user.isSudoAdmin ? (
          <p className="mt-2 text-xs text-strumf-accent">Sudo admin</p>
        ) : null}
      </Card>

      <Card>
        <h2 className="font-display mb-3 text-lg font-semibold">New household</h2>
        <CreateHouseholdForm />
      </Card>

      <div className="flex flex-col gap-3">
        <Button
          type="button"
          variant="ghost"
          className="border border-strumf-border"
          onClick={() => void signOut({ callbackUrl: "/" })}
        >
          Sign out
        </Button>
        <Link
          href="/"
          className="transition-smooth min-h-12 rounded-strumf-pill border border-strumf-border bg-white/45 py-3 text-center text-sm font-bold text-strumf-foreground/85 no-underline hover:bg-white/75"
        >
          Marketing home
        </Link>
      </div>
    </div>
  );
}
