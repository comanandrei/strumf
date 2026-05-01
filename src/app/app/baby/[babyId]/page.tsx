"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import { Card } from "~/app/_components/ui/card";
import { api } from "~/trpc/react";

import { useBabySelection } from "../../_components/baby-selection-context";

function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatAge(birthDateTime: Date) {
  const born = new Date(birthDateTime).getTime();
  const now = Date.now();
  const days = Math.max(0, Math.floor((now - born) / 86_400_000));
  if (days < 14) return `${days} day${days === 1 ? "" : "s"} old`;
  const weeks = Math.floor(days / 7);
  if (weeks < 12) return `${weeks} week${weeks === 1 ? "" : "s"} old`;
  const months = Math.floor(days / 30.44);
  if (months < 24) return `${months} month${months === 1 ? "" : "s"} old`;
  const years = Math.floor(days / 365.25);
  return `${years} year${years === 1 ? "" : "s"} old`;
}

function profileValue(value: string | number | null | undefined, suffix = "") {
  if (value === null || value === undefined || value === "") return "Not added";
  return `${value}${suffix}`;
}

export default function BabyProfilePage() {
  const params = useParams<{ babyId: string }>();
  const babyId = Array.isArray(params.babyId) ? params.babyId[0] : params.babyId;
  const { babies, selectedBabyId, setSelectedBabyId, isLoading: loadingBabies } =
    useBabySelection();

  const { data: baby, isLoading, error } = api.baby.get.useQuery(
    { babyId: babyId ?? "" },
    { enabled: !!babyId },
  );

  useEffect(() => {
    if (!babyId || selectedBabyId === babyId) return;
    if (babies.some((b) => b.id === babyId)) {
      setSelectedBabyId(babyId);
    }
  }, [babies, babyId, selectedBabyId, setSelectedBabyId]);

  if (loadingBabies || isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 w-44 rounded-lg bg-white/10" />
        <div className="h-56 w-full rounded-strumf-card bg-white/10" />
      </div>
    );
  }

  if (!babyId || error || !baby) {
    return (
      <Card>
        <h1 className="text-lg font-semibold">Baby profile not found</h1>
        <p className="mt-2 text-sm text-white/70">
          Choose another baby or add a baby profile during onboarding.
        </p>
        <Link href="/app/onboarding" className="mt-4 inline-block text-strumf-accent underline">
          Go to onboarding
        </Link>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-6">
      <header>
        <p className="text-sm text-white/65">Baby profile</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">{baby.displayName}</h1>
        <p className="mt-1 text-sm text-strumf-accent">{formatAge(baby.birthDateTime)}</p>
      </header>

      <Card>
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-white/50">
          Birth details
        </p>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ProfileField label="Born" value={formatDateTime(baby.birthDateTime)} />
          <ProfileField label="Sex" value={baby.sex.toLowerCase()} />
          <ProfileField
            label="Birth weight"
            value={profileValue(baby.birthWeightGrams, " g")}
          />
          <ProfileField label="Birth length" value={profileValue(baby.birthLengthCm, " cm")} />
          <ProfileField
            label="Head circumference"
            value={profileValue(baby.headCircumferenceCm, " cm")}
          />
          <ProfileField label="Timezone" value={baby.timezone} />
        </dl>
      </Card>

      <Card>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/50">
          Notes
        </p>
        <p className="whitespace-pre-wrap text-sm text-white/75">
          {baby.notes?.trim() || "No notes added yet."}
        </p>
      </Card>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-white/45">{label}</dt>
      <dd className="mt-1 text-base font-medium capitalize text-white">{value}</dd>
    </div>
  );
}
