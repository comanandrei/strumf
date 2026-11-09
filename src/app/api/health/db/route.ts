import { NextResponse } from "next/server";

import { env } from "~/env";
import { db } from "~/server/db";

export async function GET() {
  try {
    await db.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, database: "reachable" });
  } catch (error) {
    if (env.NODE_ENV !== "production") {
      console.error("[health/db]", error);
    }
    return NextResponse.json(
      {
        ok: false,
        database: "unreachable",
        ...(env.NODE_ENV === "development"
          ? {
              error:
                error instanceof Error ? error.message : "Unknown error",
            }
          : {}),
      },
      { status: 503 },
    );
  }
}
