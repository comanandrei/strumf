import { timingSafeEqual } from "node:crypto";

import { env } from "~/env";

export function mcpAuthConfigured(): boolean {
  return Boolean(env.MCP_API_SECRET && env.MCP_API_SECRET.length >= 16);
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export function verifyMcpBearerAuth(request: Request): Response | null {
  if (!mcpAuthConfigured()) {
    return jsonError(
      503,
      "MCP is not configured. Set MCP_API_SECRET (min 16 characters) in the server environment.",
    );
  }

  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) {
    return jsonError(401, "Missing or invalid Authorization header. Use Bearer token.");
  }

  const token = header.slice("Bearer ".length).trim();
  if (!token || !safeEqual(token, env.MCP_API_SECRET!)) {
    return jsonError(401, "Invalid bearer token.");
  }

  return null;
}

function jsonError(status: number, message: string): Response {
  return new Response(
    JSON.stringify({
      jsonrpc: "2.0",
      error: { code: -32001, message },
      id: null,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    },
  );
}
