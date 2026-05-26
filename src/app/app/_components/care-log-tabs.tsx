"use client";

import { useState } from "react";

import { Chip } from "~/app/_components/ui/chip";

import { MedicalLogForm } from "./medical-log-form";
import { QuickLogForm } from "./quick-log-form";

type ActiveTab = "feeding" | "consultation" | "appointment";

const TABS: Array<{ id: ActiveTab; label: string }> = [
  { id: "feeding", label: "Feeding" },
  { id: "consultation", label: "Consultation" },
  { id: "appointment", label: "Appointment" },
];

export function CareLogTabs() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("feeding");

  return (
    <div className="flex flex-col gap-5 pb-6">
      <div className="rounded-strumf-card border border-strumf-border bg-strumf-surface p-2 shadow-card backdrop-blur">
        <div className="grid grid-cols-3 gap-2">
          {TABS.map((tab) => (
            <Chip
              key={tab.id}
              selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="justify-center"
            >
              {tab.label}
            </Chip>
          ))}
        </div>
      </div>

      {activeTab === "feeding" ? <QuickLogForm /> : <MedicalLogForm mode={activeTab} />}
    </div>
  );
}
