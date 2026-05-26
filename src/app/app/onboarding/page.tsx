"use client";

import Link from "next/link";

import { Card } from "~/app/_components/ui/card";
import { CreateHouseholdForm } from "~/app/_components/create-household-form";
import { CreateBabyForm } from "~/app/app/_components/create-baby-form";
import { api } from "~/trpc/react";

export default function OnboardingPage() {
  const { data: households, isLoading } = api.household.myHouseholds.useQuery();
  const primaryHousehold = households?.[0];
  const hasBaby = households?.some((household) => household.babies.length > 0) ?? false;

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 w-56 rounded-lg bg-white/10" />
        <div className="h-64 w-full rounded-strumf-card bg-white/10" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-6">
      <header>
        <p className="text-sm font-medium text-strumf-accent">Welcome to Strumf</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Set up your family space</h1>
        <p className="mt-2 text-sm text-white/65">
          Create a household, add your baby, then your dashboard will be ready.
        </p>
      </header>

      {hasBaby ? (
        <Card>
          <h2 className="text-lg font-semibold">You are ready</h2>
          <p className="mt-2 text-sm text-white/70">
            Your baby profile exists. Use the Dashboard tab to start tracking care.
          </p>
          <Link href="/app" className="mt-4 inline-block text-strumf-accent underline">
            Go to dashboard
          </Link>
        </Card>
      ) : null}

      {!hasBaby && !primaryHousehold ? (
        <Card>
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/50">
            Step 1
          </p>
          <h2 className="mb-3 text-lg font-semibold">Create household</h2>
          <CreateHouseholdForm />
        </Card>
      ) : null}

      {!hasBaby && primaryHousehold ? (
        <Card>
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/50">
            Step 2
          </p>
          <h2 className="mb-1 text-lg font-semibold">Add baby profile</h2>
          <p className="mb-4 text-sm text-white/65">
            Household: {primaryHousehold.name?.trim() || "Home"}
          </p>
          <CreateBabyForm householdId={primaryHousehold.id} />
        </Card>
      ) : null}
    </div>
  );
}
