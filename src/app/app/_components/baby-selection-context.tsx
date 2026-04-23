"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { api } from "~/trpc/react";

const STORAGE_KEY = "strumf.selectedBabyId";

export type BabyOption = {
  id: string;
  displayName: string;
  householdLabel: string;
};

type BabySelectionContextValue = {
  babies: BabyOption[];
  selectedBabyId: string | null;
  setSelectedBabyId: (id: string) => void;
  isLoading: boolean;
};

const BabySelectionContext = createContext<BabySelectionContextValue | null>(null);

export function BabySelectionProvider({ children }: { children: ReactNode }) {
  const { data: households, isLoading } = api.household.myHouseholds.useQuery();
  const [selectedBabyId, setSelectedBabyIdState] = useState<string | null>(null);

  const babies = useMemo<BabyOption[]>(() => {
    if (!households?.length) return [];
    const out: BabyOption[] = [];
    for (const h of households) {
      const label = h.name?.trim() || "Home";
      for (const b of h.babies) {
        out.push({
          id: b.id,
          displayName: b.displayName,
          householdLabel: label,
        });
      }
    }
    return out;
  }, [households]);

  useEffect(() => {
    if (babies.length === 0) {
      setSelectedBabyIdState(null);
      return;
    }

    const stored =
      typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_KEY)
        : null;
    if (stored && babies.some((b) => b.id === stored)) {
      setSelectedBabyIdState(stored);
      return;
    }

    setSelectedBabyIdState((prev) => {
      if (prev && babies.some((b) => b.id === prev)) return prev;
      return babies[0]!.id;
    });
  }, [babies]);

  const setSelectedBabyId = useCallback((id: string) => {
    window.localStorage.setItem(STORAGE_KEY, id);
    setSelectedBabyIdState(id);
  }, []);

  const value = useMemo(
    () => ({
      babies,
      selectedBabyId,
      setSelectedBabyId,
      isLoading,
    }),
    [babies, selectedBabyId, setSelectedBabyId, isLoading],
  );

  return (
    <BabySelectionContext.Provider value={value}>{children}</BabySelectionContext.Provider>
  );
}

export function useBabySelection() {
  const ctx = useContext(BabySelectionContext);
  if (!ctx) {
    throw new Error("useBabySelection must be used within BabySelectionProvider");
  }
  return ctx;
}
