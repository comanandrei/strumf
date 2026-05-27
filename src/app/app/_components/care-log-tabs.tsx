"use client";

import { useState } from "react";

import { Chip } from "~/app/_components/ui/chip";
import { useI18n } from "~/app/lib/i18n-provider";

import { MedicalLogForm } from "./medical-log-form";
import { QuickLogForm } from "./quick-log-form";
import { SleepLogForm } from "./sleep-log-form";

type ActiveTab = "feeding" | "sleep" | "consultation" | "appointment";

const TABS: Array<{ id: ActiveTab; labels: { ro: string; en: string } }> = [
  { id: "feeding", labels: { ro: "Hranire", en: "Feeding" } },
  { id: "sleep", labels: { ro: "Somn", en: "Sleep" } },
  { id: "consultation", labels: { ro: "Consultatie", en: "Consultation" } },
  { id: "appointment", labels: { ro: "Programare", en: "Appointment" } },
];

export function CareLogTabs() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("feeding");
  const { locale } = useI18n();

  return (
    <div className="flex flex-col gap-5 pb-6">
      <div className="rounded-strumf-card border border-strumf-border bg-strumf-surface p-2 shadow-card backdrop-blur">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {TABS.map((tab) => (
            <Chip
              key={tab.id}
              selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="justify-center"
            >
              {tab.labels[locale]}
            </Chip>
          ))}
        </div>
      </div>

      {activeTab === "feeding" ? <QuickLogForm /> : null}
      {activeTab === "sleep" ? <SleepLogForm /> : null}
      {activeTab === "consultation" || activeTab === "appointment" ? (
        <MedicalLogForm mode={activeTab} />
      ) : null}
    </div>
  );
}
