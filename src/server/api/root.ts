import { appointmentRouter } from "~/server/api/routers/appointment";
import { babyRouter } from "~/server/api/routers/baby";
import { consultationRouter } from "~/server/api/routers/consultation";
import { feedingRouter } from "~/server/api/routers/feeding";
import { householdRouter } from "~/server/api/routers/household";
import { inviteRouter } from "~/server/api/routers/invite";
import { nearbyRouter } from "~/server/api/routers/nearby";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  household: householdRouter,
  baby: babyRouter,
  invite: inviteRouter,
  feeding: feedingRouter,
  consultation: consultationRouter,
  appointment: appointmentRouter,
  nearby: nearbyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.household.myHouseholds();
 */
export const createCaller = createCallerFactory(appRouter);
