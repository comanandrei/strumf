import { db } from "~/server/db";

export type StrumfAppStats = {
  asOf: string;
  counts: {
    households: number;
    babies: number;
    feedingEvents: number;
    activeUsers: number;
    pendingUsers: number;
  };
};

/**
 * Aggregate, non-PII counts for MCP read-only introspection.
 */
export async function getStrumfAppStats(): Promise<StrumfAppStats> {
  const [
    households,
    babies,
    feedingEvents,
    activeUsers,
    pendingUsers,
  ] = await Promise.all([
    db.household.count(),
    db.baby.count(),
    db.feedingEvent.count(),
    db.user.count({ where: { isActive: true } }),
    db.user.count({ where: { isActive: false } }),
  ]);

  return {
    asOf: new Date().toISOString(),
    counts: {
      households,
      babies,
      feedingEvents,
      activeUsers,
      pendingUsers,
    },
  };
}
