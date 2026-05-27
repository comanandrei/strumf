-- Add completed sleep windows for Sleep Rhythm.
CREATE TABLE "SleepEvent" (
    "id" TEXT NOT NULL,
    "babyId" TEXT NOT NULL,
    "loggedByUserId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SleepEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "SleepEvent_babyId_startedAt_idx" ON "SleepEvent"("babyId", "startedAt");
CREATE INDEX "SleepEvent_babyId_endedAt_idx" ON "SleepEvent"("babyId", "endedAt");
CREATE INDEX "SleepEvent_loggedByUserId_idx" ON "SleepEvent"("loggedByUserId");

ALTER TABLE "SleepEvent" ADD CONSTRAINT "SleepEvent_babyId_fkey"
    FOREIGN KEY ("babyId") REFERENCES "Baby"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "SleepEvent" ADD CONSTRAINT "SleepEvent_loggedByUserId_fkey"
    FOREIGN KEY ("loggedByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
