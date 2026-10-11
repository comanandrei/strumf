import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";

import {
  createMcpSession,
  getMcpSession,
  McpSessionLimitError,
  touchMcpSession,
} from "~/server/mcp/sessions";

function mcpJsonError(status: number, code: number, message: string): Response {
  return new Response(
    JSON.stringify({
      jsonrpc: "2.0",
      error: { code, message },
      id: null,
    }),
    { status, headers: { "Content-Type": "application/json" } },
  );
}

async function readJsonBody(request: Request): Promise<unknown> {
  const text = await request.text();
  if (!text.trim()) {
    return undefined;
  }
  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new McpBadBodyError();
  }
}

export class McpBadBodyError extends Error {
  constructor() {
    super("Invalid JSON body");
    this.name = "McpBadBodyError";
  }
}

export async function handleMcpPost(request: Request): Promise<Response> {
  const sessionId = request.headers.get("mcp-session-id") ?? undefined;
  let parsedBody: unknown;

  try {
    parsedBody = await readJsonBody(request);
  } catch {
    return mcpJsonError(400, -32700, "Parse error: invalid JSON body");
  }

  try {
    if (sessionId) {
      const transport = getMcpSession(sessionId);
      if (!transport) {
        return mcpJsonError(404, -32001, "Session not found");
      }
      touchMcpSession(sessionId);
      return transport.handleRequest(request, { parsedBody });
    }

    if (!isInitializeRequest(parsedBody)) {
      return mcpJsonError(
        400,
        -32000,
        "Bad Request: No valid session ID provided",
      );
    }

    const transport = await createMcpSession();
    return transport.handleRequest(request, { parsedBody });
  } catch (error) {
    if (error instanceof McpSessionLimitError) {
      return mcpJsonError(503, -32000, error.message);
    }
    console.error("[mcp] POST error:", error);
    return mcpJsonError(500, -32603, "Internal server error");
  }
}

export async function handleMcpGet(request: Request): Promise<Response> {
  const sessionId = request.headers.get("mcp-session-id");
  if (!sessionId) {
    return new Response("Missing session ID", { status: 400 });
  }

  const transport = getMcpSession(sessionId);
  if (!transport) {
    return mcpJsonError(404, -32001, "Session not found");
  }

  touchMcpSession(sessionId);
  return transport.handleRequest(request);
}

export async function handleMcpDelete(request: Request): Promise<Response> {
  const sessionId = request.headers.get("mcp-session-id");
  if (!sessionId) {
    return new Response("Missing session ID", { status: 400 });
  }

  const transport = getMcpSession(sessionId);
  if (!transport) {
    return mcpJsonError(404, -32001, "Session not found");
  }

  touchMcpSession(sessionId);
  return transport.handleRequest(request);
}
