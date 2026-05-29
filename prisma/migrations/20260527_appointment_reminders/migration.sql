-- Add appointment reminder scheduling.
ALTER TABLE "Appointment"
ADD COLUMN "reminderAt" TIMESTAMP(3),
ADD COLUMN "reminderSentAt" TIMESTAMP(3);

CREATE INDEX "Appointment_reminderAt_reminderSentAt_idx" ON "Appointment"("reminderAt", "reminderSentAt");
