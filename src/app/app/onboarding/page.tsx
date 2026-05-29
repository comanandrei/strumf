"use client";

import Link from "next/link";

import { Card } from "~/app/_components/ui/card";
import { CreateHouseholdForm } from "~/app/_components/create-household-form";
import { CreateBabyForm } from "~/app/app/_components/create-baby-form";
import { useI18n } from "~/app/lib/i18n-provider";
import { api } from "~/trpc/react";

export default function OnboardingPage() {
  const { data: households, isLoading } = api.household.myHouseholds.useQuery();
  const { locale } = useI18n();
  const primaryHousehold = households?.[0];
  const hasBaby = households?.some((household) => household.babies.length > 0) ?? false;
  const copy = locale === "ro"
    ? {
        welcome: "Bun venit in Strumf",
        title: "Configureaza spatiul familiei",
        description: "Creeaza o familie, adauga bebelusul, apoi panoul tau va fi gata.",
        readyTitle: "Totul este gata",
        readyDescription: "Profilul bebelusului exista. Foloseste tabul Acasa ca sa incepi monitorizarea.",
        dashboard: "Mergi la Acasa",
        step1: "Pasul 1",
        createHousehold: "Creeaza familie",
        step2: "Pasul 2",
        addBaby: "Adauga profil bebe",
        household: "Familie",
        home: "Acasa",
      }
    : {
        welcome: "Welcome to Strumf",
        title: "Set up your family space",
        description: "Create a household, add your baby, then your dashboard will be ready.",
        readyTitle: "You are ready",
        readyDescription: "Your baby profile exists. Use the Dashboard tab to start tracking care.",
        dashboard: "Go to dashboard",
        step1: "Step 1",
        createHousehold: "Create household",
        step2: "Step 2",
        addBaby: "Add baby profile",
        household: "Household",
        home: "Home",
      };

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
        <p className="text-sm font-medium text-strumf-accent">{copy.welcome}</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">{copy.title}</h1>
        <p className="mt-2 text-sm text-white/65">{copy.description}</p>
      </header>

      {hasBaby ? (
        <Card>
          <h2 className="text-lg font-semibold">{copy.readyTitle}</h2>
          <p className="mt-2 text-sm text-white/70">{copy.readyDescription}</p>
          <Link href="/app" className="mt-4 inline-block text-strumf-accent underline">
            {copy.dashboard}
          </Link>
        </Card>
      ) : null}

      {!hasBaby && !primaryHousehold ? (
        <Card>
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/50">
            {copy.step1}
          </p>
          <h2 className="mb-3 text-lg font-semibold">{copy.createHousehold}</h2>
          <CreateHouseholdForm />
        </Card>
      ) : null}

      {!hasBaby && primaryHousehold ? (
        <Card>
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/50">
            {copy.step2}
          </p>
          <h2 className="mb-1 text-lg font-semibold">{copy.addBaby}</h2>
          <p className="mb-4 text-sm text-white/65">
            {copy.household}: {primaryHousehold.name?.trim() || copy.home}
          </p>
          <CreateBabyForm householdId={primaryHousehold.id} />
        </Card>
      ) : null}
    </div>
  );
}
