import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { getStrumfAppStats } from "~/server/mcp/get-app-stats";

export function createStrumfMcpServer(): McpServer {
  const server = new McpServer(
    {
      name: "strumf",
      version: "1.0.0",
    },
    {
      instructions:
        "Read-only access to Strumf (baby feeding & care) aggregate database statistics. " +
        "Use get_strumf_app_stats for household/baby/feeding counts. No personal data is exposed.",
    },
  );

  server.registerTool(
    "get_strumf_app_stats",
    {
      title: "Strumf app statistics",
      description:
        "Returns aggregate counts from the Strumf database (households, babies, feeding events, " +
        "active and pending user accounts). Does not return names, emails, or individual records.",
      inputSchema: {},
      outputSchema: {
        asOf: z.string().describe("ISO timestamp when counts were read"),
        counts: z.object({
          households: z.number().int().nonnegative(),
          babies: z.number().int().nonnegative(),
          feedingEvents: z.number().int().nonnegative(),
          activeUsers: z.number().int().nonnegative(),
          pendingUsers: z.number().int().nonnegative(),
        }),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: false,
      },
    },
    async () => {
      const stats = await getStrumfAppStats();
      return {
        structuredContent: stats,
        content: [
          {
            type: "text",
            text: JSON.stringify(stats, null, 2),
          },
        ],
      };
    },
  );

  return server;
}
