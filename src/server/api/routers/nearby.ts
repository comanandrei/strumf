import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { env } from "~/env";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { findNearbyPlaces } from "~/server/lib/geoapify";

const listInput = z.object({
  lat: z.number().gte(-90).lte(90),
  lon: z.number().gte(-180).lte(180),
  mode: z.enum(["walk", "drive"]).default("walk"),
});

export const nearbyRouter = createTRPCRouter({
  config: protectedProcedure.query(() => {
    return {
      placesEnabled: !!env.GEOAPIFY_API_KEY,
    };
  }),

  list: protectedProcedure.input(listInput).query(async ({ input }) => {
    if (!env.GEOAPIFY_API_KEY) {
      throw new TRPCError({
        code: "PRECONDITION_FAILED",
        message:
          "Nearby places provider is not configured. Set GEOAPIFY_API_KEY in your .env to enable this feature.",
      });
    }
    try {
      return await findNearbyPlaces({
        lat: input.lat,
        lon: input.lon,
        mode: input.mode,
        radiusMeters: 5000,
        perKind: 3,
        minPerKind: 2,
        expandedRadiusMeters: 50_000,
      });
    } catch (err) {
      throw new TRPCError({
        code: "BAD_GATEWAY",
        message:
          err instanceof Error
            ? `Could not load nearby places: ${err.message}`
            : "Could not load nearby places.",
        cause: err,
      });
    }
  }),
});
