"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "~/app/_components/ui/button";
import { useI18n } from "~/app/lib/i18n-provider";
import { api } from "~/trpc/react";

import { useBabySelection } from "./baby-selection-context";

function optionalPositiveInt(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const parsed = Number(trimmed);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}

export function CreateBabyForm({ householdId }: { householdId: string }) {
  const router = useRouter();
  const utils = api.useUtils();
  const { setSelectedBabyId } = useBabySelection();
  const { locale } = useI18n();
  const [displayName, setDisplayName] = useState("");
  const [birthDateTime, setBirthDateTime] = useState("");
  const [birthWeightGrams, setBirthWeightGrams] = useState("");
  const [birthLengthCm, setBirthLengthCm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const create = api.baby.create.useMutation({
    onSuccess: async (baby) => {
      setError(null);
      setSelectedBabyId(baby.id);
      await utils.household.myHouseholds.invalidate();
      router.push("/app");
      router.refresh();
    },
    onError: (e) => setError(e.message),
  });
  const copy = locale === "ro"
    ? {
        birthRequired: "Adauga data si ora nasterii bebelusului.",
        name: "Nume bebe",
        namePlaceholder: "ex. Emma",
        birth: "Data si ora nasterii",
        weight: "Greutate la nastere, grame",
        length: "Lungime la nastere, cm",
        optional: "Optional",
        adding: "Se adauga...",
        submit: "Adauga bebe",
      }
    : {
        birthRequired: "Add the baby's birth date and time.",
        name: "Baby name",
        namePlaceholder: "e.g. Emma",
        birth: "Birth date and time",
        weight: "Birth weight, grams",
        length: "Birth length, cm",
        optional: "Optional",
        adding: "Adding baby...",
        submit: "Add baby",
      };

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!birthDateTime) {
          setError(copy.birthRequired);
          return;
        }

        create.mutate({
          householdId,
          displayName: displayName.trim(),
          birthDateTime: new Date(birthDateTime),
          birthWeightGrams: optionalPositiveInt(birthWeightGrams),
          birthLengthCm: optionalPositiveInt(birthLengthCm),
        });
      }}
    >
      <label className="text-sm font-medium text-white/85" htmlFor="baby-name">
        {copy.name}
      </label>
      <input
        id="baby-name"
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder={copy.namePlaceholder}
        className="rounded-lg border border-strumf-border bg-white/10 px-3 py-2 text-white placeholder:text-white/40"
        required
      />

      <label className="text-sm font-medium text-white/85" htmlFor="baby-birth">
        {copy.birth}
      </label>
      <input
        id="baby-birth"
        type="datetime-local"
        value={birthDateTime}
        onChange={(e) => setBirthDateTime(e.target.value)}
        className="rounded-lg border border-strumf-border bg-white/10 px-3 py-2 text-white"
        required
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-white/85">
          {copy.weight}
          <input
            type="number"
            min={1}
            inputMode="numeric"
            value={birthWeightGrams}
            onChange={(e) => setBirthWeightGrams(e.target.value)}
            placeholder={copy.optional}
            className="rounded-lg border border-strumf-border bg-white/10 px-3 py-2 text-white placeholder:text-white/40"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-white/85">
          {copy.length}
          <input
            type="number"
            min={1}
            inputMode="numeric"
            value={birthLengthCm}
            onChange={(e) => setBirthLengthCm(e.target.value)}
            placeholder={copy.optional}
            className="rounded-lg border border-strumf-border bg-white/10 px-3 py-2 text-white placeholder:text-white/40"
          />
        </label>
      </div>

      {error ? <p className="text-sm text-strumf-danger">{error}</p> : null}

      <Button
        type="submit"
        variant="accent"
        fullWidth
        disabled={create.isPending || !displayName.trim() || !birthDateTime}
      >
        {create.isPending ? copy.adding : copy.submit}
      </Button>
    </form>
  );
}
