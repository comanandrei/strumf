import { runSeedByName } from "./run-seed.mjs";

runSeedByName("noah-andrei-coman")
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
