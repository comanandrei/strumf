"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useI18n } from "~/app/lib/i18n-provider";
import { api } from "~/trpc/react";

export function CreateHouseholdForm() {
  const router = useRouter();
  const utils = api.useUtils();
  const { locale } = useI18n();
  const [name, setName] = useState("");
  const copy = locale === "ro"
    ? {
        label: "Nume familie noua (optional)",
        placeholder: "ex. Acasa",
        creating: "Se creeaza...",
        submit: "Creeaza familie",
      }
    : {
        label: "New household name (optional)",
        placeholder: "e.g. Home",
        creating: "Creating...",
        submit: "Create household",
      };
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
        {copy.label}
      </label>
      <input
        id="hh-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={copy.placeholder}
        className="rounded-xl border border-strumf-border bg-white/70 px-3 py-3 text-strumf-foreground placeholder:text-strumf-muted/60"
      />
      <button
        type="submit"
        disabled={create.isPending}
        className="transition-smooth rounded-xl bg-gradient-mint px-4 py-3 font-bold text-strumf-foreground shadow-card hover:shadow-soft disabled:opacity-50"
      >
        {create.isPending ? copy.creating : copy.submit}
      </button>
      {create.error ? (
        <p className="text-sm text-strumf-danger">{create.error.message}</p>
      ) : null}
    </form>
  );
}
