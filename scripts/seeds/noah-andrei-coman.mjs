import bcrypt from "bcryptjs";

export const name = "noah-andrei-coman";
export const description =
  "Create or update Andrei Coman's household and Noah Andrei Coman's baby profile.";

const seed = {
  parentEmail: process.env.BABY_SEED_PARENT_EMAIL ?? "andrei.coman.88@gmail.com",
  parentName: process.env.BABY_SEED_PARENT_NAME ?? "Andrei Coman",
  parentPassword: process.env.BABY_SEED_PARENT_PASSWORD ?? "Password123!",
  householdName: process.env.BABY_SEED_HOUSEHOLD_NAME ?? "Coman",
  babyDisplayName: process.env.BABY_SEED_BABY_NAME ?? "Noah Andrei Coman",
  birthDateTime: new Date(
    process.env.BABY_SEED_BIRTH_DATE_TIME ?? "2026-03-30T00:00:00.000Z",
  ),
  sex: process.env.BABY_SEED_SEX ?? "MALE",
  timezone: process.env.BABY_SEED_TIMEZONE ?? "UTC",
  createParent: process.env.BABY_SEED_CREATE_PARENT === "true",
};

export async function run(tx) {
  if (Number.isNaN(seed.birthDateTime.getTime())) {
    throw new Error("BABY_SEED_BIRTH_DATE_TIME must be a valid date/time.");
  }

  if (!["MALE", "FEMALE", "OTHER", "UNKNOWN"].includes(seed.sex)) {
    throw new Error("BABY_SEED_SEX must be one of: MALE, FEMALE, OTHER, UNKNOWN.");
  }

  let createdParent = false;
  let user = await tx.user.findUnique({
    where: { email: seed.parentEmail },
    select: { id: true, email: true },
  });

  if (!user) {
    if (!seed.createParent) {
      throw new Error(
        `No user found for parent email ${seed.parentEmail}. Set BABY_SEED_CREATE_PARENT=true only when intentionally bootstrapping this account.`,
      );
    }

    const passwordHash = await bcrypt.hash(seed.parentPassword, 12);

    user = await tx.user.create({
      data: {
        email: seed.parentEmail,
        name: seed.parentName,
        passwordHash,
        isActive: true,
        emailVerified: new Date(),
      },
      select: { id: true, email: true },
    });
    createdParent = true;
  }

  let membership = await tx.householdMembership.findFirst({
    where: {
      userId: user.id,
      household: { name: seed.householdName },
    },
    include: { household: true },
  });

  if (!membership) {
    const household = await tx.household.create({
      data: {
        name: seed.householdName,
        memberships: {
          create: {
            userId: user.id,
            role: "OWNER",
            displayLabel: seed.householdName,
          },
        },
      },
    });

    membership = await tx.householdMembership.findUniqueOrThrow({
      where: {
        userId_householdId: {
          userId: user.id,
          householdId: household.id,
        },
      },
      include: { household: true },
    });
  }

  const existingBaby = await tx.baby.findFirst({
    where: {
      householdId: membership.householdId,
      displayName: seed.babyDisplayName,
    },
    orderBy: { createdAt: "asc" },
  });

  const babyData = {
    householdId: membership.householdId,
    displayName: seed.babyDisplayName,
    birthDateTime: seed.birthDateTime,
    sex: seed.sex,
    timezone: seed.timezone,
  };

  const baby = existingBaby
    ? await tx.baby.update({
        where: { id: existingBaby.id },
        data: babyData,
      })
    : await tx.baby.create({
        data: babyData,
      });

  return {
    message: `${createdParent ? "Created parent and " : ""}${existingBaby ? "updated" : "created"} baby ${baby.displayName} (${baby.id}) in household ${membership.household.name ?? membership.household.id} for ${user.email}.`,
  };
}
