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
        <h1 className="text-2xl font-bold tracking-tight">You</h1>
        <p className="mt-1 text-sm text-white/65">Account and household</p>
      </header>

      <Card>
        <p className="text-xs font-medium uppercase tracking-wide text-white/50">Signed in</p>
        {status === "loading" ? (
          <p className="mt-2 text-white/60">Loading…</p>
        ) : (
          <p className="mt-2 break-all text-lg text-white">{session?.user?.email ?? "—"}</p>
        )}
        {session?.user && "isSudoAdmin" in session.user && session.user.isSudoAdmin ? (
          <p className="mt-2 text-xs text-strumf-accent">Sudo admin</p>
        ) : null}
      </Card>

      <Card>
        <h2 className="mb-3 text-lg font-semibold">New household</h2>
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
          className="min-h-12 rounded-strumf-pill border border-strumf-border py-3 text-center text-sm font-medium text-white/85 no-underline hover:bg-white/5"
        >
          Marketing home
        </Link>
      </div>
    </div>
  );
}
