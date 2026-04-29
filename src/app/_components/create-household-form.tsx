"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreateHouseholdForm() {
  const router = useRouter();
  const utils = api.useUtils();
  const [name, setName] = useState("");
  const create = api.household.create.useMutation({
    onSuccess: async () => {
      setName("");
      await utils.household.myHouseholds.invalidate();
      router.refresh();
    },
  });

  return (
    <form
      className="flex max-w-md flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        const trimmed = name.trim();
        create.mutate(trimmed ? { name: trimmed } : {});
      }}
    >
      <label className="text-sm font-bold text-strumf-foreground/85" htmlFor="hh-name">
        New household name (optional)
      </label>
      <input
        id="hh-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Home"
        className="rounded-xl border border-strumf-border bg-white/70 px-3 py-3 text-strumf-foreground placeholder:text-strumf-muted/60"
      />
      <button
        type="submit"
        disabled={create.isPending}
        className="transition-smooth rounded-xl bg-gradient-mint px-4 py-3 font-bold text-strumf-foreground shadow-card hover:shadow-soft disabled:opacity-50"
      >
        {create.isPending ? "Creating…" : "Create household"}
      </button>
      {create.error ? (
        <p className="text-sm text-strumf-danger">{create.error.message}</p>
      ) : null}
    </form>
  );
}
