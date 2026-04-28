import { pathToFileURL } from "node:url";
import generatedPrisma from "../generated/prisma/index.js";
import * as noahAndreiComan from "./seeds/noah-andrei-coman.mjs";

const { PrismaClient } = generatedPrisma;

const seeds = new Map([[noahAndreiComan.name, noahAndreiComan]]);
const seedName = process.argv.slice(2).find((arg) => !arg.startsWith("--"));
const confirmation = process.argv.includes("--confirm-prod");

export async function runSeedByName(nameToRun) {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required.");
  }

  const seed = seeds.get(nameToRun);
  if (!seed) {
    throw new Error(
      `Unknown seed "${nameToRun}". Available seeds: ${Array.from(seeds.keys()).join(", ")}`,
    );
  }

  if (!confirmation) {
    throw new Error(
      `Refusing to run seed without --confirm-prod. Run: npm run db:seed -- ${nameToRun} --confirm-prod`,
    );
  }

  const db = new PrismaClient({ log: ["error", "warn"] });

  try {
    const result = await db.$transaction((tx) => seed.run(tx));
    console.log(result.message);
  } finally {
    await db.$disconnect();
  }
}

function printAvailableSeeds() {
  console.log("Available seeds:");
  for (const seed of seeds.values()) {
    console.log(`- ${seed.name}: ${seed.description}`);
  }
}

async function main() {
  if (!seedName || seedName === "list") {
    printAvailableSeeds();
    return;
  }

  await runSeedByName(seedName);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
