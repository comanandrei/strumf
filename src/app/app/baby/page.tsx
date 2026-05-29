"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

import { Button } from "~/app/_components/ui/button";
import { Card } from "~/app/_components/ui/card";
import { Chip } from "~/app/_components/ui/chip";
import { useBabySelection } from "~/app/app/_components/baby-selection-context";
import { api, type RouterInputs } from "~/trpc/react";

type BabySex = NonNullable<RouterInputs["baby"]["update"]["sex"]>;

const SEX_OPTIONS: { value: BabySex; label: string }[] = [
  { value: "UNKNOWN", label: "Not set" },
  { value: "FEMALE", label: "Female" },
  { value: "MALE", label: "Male" },
  { value: "OTHER", label: "Other" },
];

export default function BabyProfilePage() {
  const { babies, selectedBabyId, setSelectedBabyId, isLoading } = useBabySelection();
  const utils = api.useUtils();

  const [displayName, setDisplayName] = useState("");
  const [birthDateTime, setBirthDateTime] = useState("");
  const [birthWeightGrams, setBirthWeightGrams] = useState("");
  const [birthLengthCm, setBirthLengthCm] = useState("");
  const [headCircumferenceCm, setHeadCircumferenceCm] = useState("");
  const [sex, setSex] = useState<BabySex>("UNKNOWN");
  const [timezone, setTimezone] = useState("UTC");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const applyFormValues = (values: ReturnType<typeof hydrateForm>) => {
    setDisplayName(values.displayName);
    setBirthDateTime(values.birthDateTime);
    setBirthWeightGrams(values.birthWeightGrams);
    setBirthLengthCm(values.birthLengthCm);
    setHeadCircumferenceCm(values.headCircumferenceCm);
    setSex(values.sex);
    setTimezone(values.timezone);
    setNotes(values.notes);
  };

  const { data: baby, isLoading: isLoadingBaby } = api.baby.get.useQuery(
    { babyId: selectedBabyId ?? "" },
    { enabled: !!selectedBabyId },
  );

  const updateBaby = api.baby.update.useMutation({
    onSuccess: async (updated) => {
      setSaved(true);
      applyFormValues(hydrateForm(updated));
      await Promise.all([
        utils.baby.get.invalidate({ babyId: updated.id }),
        utils.household.myHouseholds.invalidate(),
      ]);
    },
  });

  useEffect(() => {
    if (!baby) return;
    applyFormValues(hydrateForm(baby));
    setSaved(false);
  }, [baby]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedBabyId || !displayName.trim()) return;

    setSaved(false);
    updateBaby.mutate({
      babyId: selectedBabyId,
      displayName: displayName.trim(),
      birthDateTime: birthDateTime ? new Date(birthDateTime) : undefined,
      birthWeightGrams: parseOptionalPositiveInt(birthWeightGrams),
      birthLengthCm: parseOptionalPositiveInt(birthLengthCm),
      headCircumferenceCm: parseOptionalPositiveInt(headCircumferenceCm),
      sex,
      timezone: timezone.trim() || undefined,
      notes: notes.trim() || null,
    });
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 w-44 rounded-lg bg-white/10" />
        <div className="h-64 w-full rounded-strumf-card bg-white/10" />
      </div>
    );
  }

  if (babies.length === 0) {
    return (
      <Card className="text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-strumf-accent text-3xl text-strumf-bg-bottom">
          +
        </div>
        <h1 className="text-2xl font-bold">No baby profile yet</h1>
        <p className="mt-2 text-sm text-white/70">
          Create your first baby from the dashboard before editing profile details.
        </p>
        <Link
          href="/app"
          className="mt-5 inline-flex min-h-12 items-center rounded-strumf-pill bg-strumf-accent px-5 py-3 font-bold text-strumf-bg-bottom no-underline transition hover:brightness-110"
        >
          Go to dashboard
        </Link>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-6">
      <header>
        <p className="text-sm text-white/65">Currently editing</p>
        <h1 className="text-3xl font-bold tracking-tight">
          {baby?.displayName ?? "Baby profile"}
        </h1>
      </header>

      {babies.length > 1 ? (
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-white/50">
            Baby
          </p>
          <div className="flex flex-wrap gap-2">
            {babies.map((option) => (
              <Chip
                key={option.id}
                selected={option.id === selectedBabyId}
                onClick={() => setSelectedBabyId(option.id)}
              >
                {option.displayName}
              </Chip>
            ))}
          </div>
        </div>
      ) : null}

      <Card>
        {isLoadingBaby ? (
          <div className="h-72 w-full animate-pulse rounded-lg bg-white/10" />
        ) : (
          <form className="space-y-4" onSubmit={submit}>
            <label className="block space-y-1.5 text-sm font-bold">
              <span>Name</span>
              <input
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                maxLength={120}
                className="w-full rounded-lg border border-strumf-border bg-white/10 px-3 py-3 text-white"
                required
              />
            </label>

            <label className="block space-y-1.5 text-sm font-bold">
              <span>Birth date and time</span>
              <input
                type="datetime-local"
                value={birthDateTime}
                onChange={(event) => setBirthDateTime(event.target.value)}
                className="w-full rounded-lg border border-strumf-border bg-white/10 px-3 py-3 text-white"
              />
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <NumberField
                label="Birth weight (g)"
                value={birthWeightGrams}
                onChange={setBirthWeightGrams}
              />
              <NumberField
                label="Length (cm)"
                value={birthLengthCm}
                onChange={setBirthLengthCm}
              />
              <NumberField
                label="Head (cm)"
                value={headCircumferenceCm}
                onChange={setHeadCircumferenceCm}
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-bold">Sex</p>
              <div className="grid grid-cols-2 gap-2">
                {SEX_OPTIONS.map((option) => (
                  <Chip
                    key={option.value}
                    selected={sex === option.value}
                    onClick={() => setSex(option.value)}
                    className="!min-h-12"
                  >
                    {option.label}
                  </Chip>
                ))}
              </div>
            </div>

            <label className="block space-y-1.5 text-sm font-bold">
              <span>Timezone</span>
              <input
                value={timezone}
                onChange={(event) => setTimezone(event.target.value)}
                maxLength={64}
                placeholder="UTC"
                className="w-full rounded-lg border border-strumf-border bg-white/10 px-3 py-3 text-white placeholder:text-white/40"
              />
            </label>

            <label className="block space-y-1.5 text-sm font-bold">
              <span>Notes</span>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                maxLength={5000}
                rows={4}
                className="w-full resize-none rounded-lg border border-strumf-border bg-white/10 px-3 py-3 text-white placeholder:text-white/40"
                placeholder="Anything caregivers should remember?"
              />
            </label>

            {updateBaby.error ? (
              <p className="text-sm text-strumf-danger">{updateBaby.error.message}</p>
            ) : null}
            {saved ? <p className="text-sm font-bold text-strumf-success">Profile saved.</p> : null}

            <Button
              type="submit"
              variant="accent"
              fullWidth
              disabled={updateBaby.isPending || !displayName.trim()}
            >
              {updateBaby.isPending ? "Saving..." : "Save profile"}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block space-y-1.5 text-sm font-bold">
      <span>{label}</span>
      <input
        type="number"
        min={1}
        step={1}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-strumf-border bg-white/10 px-3 py-3 text-white"
      />
    </label>
  );
}

function hydrateForm(baby: {
  displayName: string;
  birthDateTime: Date;
  birthWeightGrams: number | null;
  birthLengthCm: number | null;
  headCircumferenceCm: number | null;
  sex: BabySex;
  timezone: string;
  notes: string | null;
}) {
  return {
    displayName: baby.displayName,
    birthDateTime: toLocalDateTimeInput(baby.birthDateTime),
    birthWeightGrams: baby.birthWeightGrams?.toString() ?? "",
    birthLengthCm: baby.birthLengthCm?.toString() ?? "",
    headCircumferenceCm: baby.headCircumferenceCm?.toString() ?? "",
    sex: baby.sex,
    timezone: baby.timezone,
    notes: baby.notes ?? "",
  };
}

function parseOptionalPositiveInt(value: string) {
  if (!value.trim()) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return null;
  return Math.trunc(parsed);
}

function toLocalDateTimeInput(value: Date) {
  const local = new Date(value.getTime() - value.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}
