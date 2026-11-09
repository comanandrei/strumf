/**
 * Household authorization seam — every baby/household tRPC route should call one of
 * `requireHouseholdMember`, `requireHouseholdOwner`, or `requireBabyAccess` before Prisma.
 * See docs/adr/0003-household-authorization-layer.md.
 */
import { TRPCError } from "@trpc/server";

import type { HouseholdRole } from "../../../generated/prisma";
import type { PrismaClient } from "../../../generated/prisma";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function getMembership(
  db: PrismaClient,
  userId: string,
  householdId: string,
) {
  return db.householdMembership.findUnique({
    where: {
      userId_householdId: { userId, householdId },
    },
  });
}

export async function requireHouseholdMember(
  db: PrismaClient,
  userId: string,
  householdId: string,
): Promise<{ role: HouseholdRole }> {
  const m = await getMembership(db, userId, householdId);
  if (!m) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Not a member of this household." });
  }
  return { role: m.role };
}

export async function requireHouseholdOwner(
  db: PrismaClient,
  userId: string,
  householdId: string): Promise<void> {
  const m = await getMembership(db, userId, householdId);
  if (!m || m.role !== "OWNER") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Household owner role required.",
    });
  }
}

export async function requireBabyAccess(
  db: PrismaClient,
  userId: string,
  babyId: string,
) {
  const baby = await db.baby.findUnique({
    where: { id: babyId },
  });
  if (!baby) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Baby not found." });
  }
  const member = await db.householdMembership.findUnique({
    where: {
      userId_householdId: { userId, householdId: baby.householdId },
    },
  });
  if (!member) {
    throw new TRPCError({ code: "FORBIDDEN", message: "No access to this baby." });
  }
  return { baby, role: member.role };
}
