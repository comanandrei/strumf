-- Drop demo Post table (replaced by domain models)
DROP TABLE IF EXISTS "Post";

-- CreateEnum
CREATE TYPE "HouseholdRole" AS ENUM ('OWNER', 'MEMBER');

-- CreateEnum
CREATE TYPE "MilkType" AS ENUM ('BREAST_MILK', 'FORMULA', 'MIXED', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "BabySex" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'UNKNOWN');

-- CreateTable
CREATE TABLE "Household" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Household_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HouseholdMembership" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "householdId" TEXT NOT NULL,
    "role" "HouseholdRole" NOT NULL,
    "displayLabel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HouseholdMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaregiverInvite" (
    "id" TEXT NOT NULL,
    "householdId" TEXT NOT NULL,
    "emailNormalized" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "invitedByUserId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "acceptedAt" TIMESTAMP(3),
    "acceptedByUserId" TEXT,

    CONSTRAINT "CaregiverInvite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Baby" (
    "id" TEXT NOT NULL,
    "householdId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "birthDateTime" TIMESTAMP(3) NOT NULL,
    "birthWeightGrams" INTEGER,
    "birthLengthCm" INTEGER,
    "headCircumferenceCm" INTEGER,
    "sex" "BabySex" NOT NULL DEFAULT 'UNKNOWN',
    "notes" TEXT,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Baby_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedingEvent" (
    "id" TEXT NOT NULL,
    "babyId" TEXT NOT NULL,
    "loggedByUserId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3),
    "amountMl" INTEGER NOT NULL,
    "milkType" "MilkType" NOT NULL DEFAULT 'UNKNOWN',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedingEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultation" (
    "id" TEXT NOT NULL,
    "babyId" TEXT NOT NULL,
    "recordedById" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "outcomeNotes" TEXT,
    "providerName" TEXT,
    "followUpAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "babyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3),
    "location" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PredictionCache" (
    "id" TEXT NOT NULL,
    "babyId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "inputFingerprint" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "modelVersion" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PredictionCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HouseholdMembership_userId_householdId_key" ON "HouseholdMembership"("userId", "householdId");

-- CreateIndex
CREATE INDEX "HouseholdMembership_householdId_idx" ON "HouseholdMembership"("householdId");

-- CreateIndex
CREATE UNIQUE INDEX "CaregiverInvite_token_key" ON "CaregiverInvite"("token");

-- CreateIndex
CREATE INDEX "CaregiverInvite_householdId_emailNormalized_idx" ON "CaregiverInvite"("householdId", "emailNormalized");

-- CreateIndex
CREATE INDEX "Baby_householdId_idx" ON "Baby"("householdId");

-- CreateIndex
CREATE INDEX "FeedingEvent_babyId_startedAt_idx" ON "FeedingEvent"("babyId", "startedAt");

-- CreateIndex
CREATE INDEX "FeedingEvent_loggedByUserId_idx" ON "FeedingEvent"("loggedByUserId");

-- CreateIndex
CREATE INDEX "Consultation_babyId_occurredAt_idx" ON "Consultation"("babyId", "occurredAt");

-- CreateIndex
CREATE INDEX "Appointment_babyId_startsAt_idx" ON "Appointment"("babyId", "startsAt");

-- CreateIndex
CREATE INDEX "PredictionCache_babyId_kind_idx" ON "PredictionCache"("babyId", "kind");

-- CreateIndex
CREATE INDEX "PredictionCache_expiresAt_idx" ON "PredictionCache"("expiresAt");

-- AddForeignKey
ALTER TABLE "HouseholdMembership" ADD CONSTRAINT "HouseholdMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseholdMembership" ADD CONSTRAINT "HouseholdMembership_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaregiverInvite" ADD CONSTRAINT "CaregiverInvite_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaregiverInvite" ADD CONSTRAINT "CaregiverInvite_invitedByUserId_fkey" FOREIGN KEY ("invitedByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaregiverInvite" ADD CONSTRAINT "CaregiverInvite_acceptedByUserId_fkey" FOREIGN KEY ("acceptedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Baby" ADD CONSTRAINT "Baby_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedingEvent" ADD CONSTRAINT "FeedingEvent_babyId_fkey" FOREIGN KEY ("babyId") REFERENCES "Baby"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedingEvent" ADD CONSTRAINT "FeedingEvent_loggedByUserId_fkey" FOREIGN KEY ("loggedByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_babyId_fkey" FOREIGN KEY ("babyId") REFERENCES "Baby"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_babyId_fkey" FOREIGN KEY ("babyId") REFERENCES "Baby"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PredictionCache" ADD CONSTRAINT "PredictionCache_babyId_fkey" FOREIGN KEY ("babyId") REFERENCES "Baby"("id") ON DELETE CASCADE ON UPDATE CASCADE;
