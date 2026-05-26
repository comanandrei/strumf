"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "~/app/_components/ui/button";
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

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!birthDateTime) {
          setError("Add the baby's birth date and time.");
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
        Baby name
      </label>
      <input
        id="baby-name"
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="e.g. Emma"
        className="rounded-lg border border-strumf-border bg-white/10 px-3 py-2 text-white placeholder:text-white/40"
        required
      />

      <label className="text-sm font-medium text-white/85" htmlFor="baby-birth">
        Birth date and time
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
          Birth weight, grams
          <input
            type="number"
            min={1}
            inputMode="numeric"
            value={birthWeightGrams}
            onChange={(e) => setBirthWeightGrams(e.target.value)}
            placeholder="Optional"
            className="rounded-lg border border-strumf-border bg-white/10 px-3 py-2 text-white placeholder:text-white/40"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-white/85">
          Birth length, cm
          <input
            type="number"
            min={1}
            inputMode="numeric"
            value={birthLengthCm}
            onChange={(e) => setBirthLengthCm(e.target.value)}
            placeholder="Optional"
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
        {create.isPending ? "Adding baby..." : "Add baby"}
      </Button>
    </form>
  );
}
