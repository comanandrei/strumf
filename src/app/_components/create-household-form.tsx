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
      className="flex max-w-md flex-col gap-2 rounded-xl bg-white/10 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        const trimmed = name.trim();
        create.mutate(trimmed ? { name: trimmed } : {});
      }}
    >
      <label className="text-sm text-white/80" htmlFor="hh-name">
        New household name (optional)
      </label>
      <input
        id="hh-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Home"
        className="rounded-md bg-white/10 px-3 py-2 text-white placeholder:text-white/40"
      />
      <button
        type="submit"
        disabled={create.isPending}
        className="rounded-full bg-white/20 px-4 py-2 font-semibold text-white hover:bg-white/30 disabled:opacity-50"
      >
        {create.isPending ? "Creating…" : "Create household"}
      </button>
      {create.error ? (
        <p className="text-sm text-red-300">{create.error.message}</p>
      ) : null}
    </form>
  );
}
