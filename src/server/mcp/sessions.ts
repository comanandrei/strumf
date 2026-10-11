import { randomUUID } from "node:crypto";

import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";

import { createStrumfMcpServer } from "~/server/mcp/create-mcp-server";

type McpSession = {
  transport: WebStandardStreamableHTTPServerTransport;
  lastActive: number;
};

const IDLE_MS = 30 * 60 * 1000;
const MAX_SESSIONS = 500;

const globalForMcp = globalThis as unknown as {
  strumfMcpSessions?: Map<string, McpSession>;
  strumfMcpJanitor?: ReturnType<typeof setInterval>;
};

function sessions(): Map<string, McpSession> {
  if (!globalForMcp.strumfMcpSessions) {
    globalForMcp.strumfMcpSessions = new Map();
  }
  return globalForMcp.strumfMcpSessions;
}

function ensureJanitor(): void {
  if (globalForMcp.strumfMcpJanitor) {
    return;
  }
  globalForMcp.strumfMcpJanitor = setInterval(() => {
    const cutoff = Date.now() - IDLE_MS;
    for (const [sessionId, session] of sessions()) {
      if (session.lastActive < cutoff) {
        void session.transport.close().finally(() => {
          sessions().delete(sessionId);
        });
      }
    }
  }, 60_000);
  globalForMcp.strumfMcpJanitor.unref?.();
}

export function touchMcpSession(sessionId: string): McpSession | undefined {
  const session = sessions().get(sessionId);
  if (session) {
    session.lastActive = Date.now();
  }
  return session;
}

export async function createMcpSession(): Promise<WebStandardStreamableHTTPServerTransport> {
  ensureJanitor();

  if (sessions().size >= MAX_SESSIONS) {
    throw new McpSessionLimitError();
  }

  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
    onsessioninitialized: (sessionId) => {
      sessions().set(sessionId, {
        transport,
        lastActive: Date.now(),
      });
    },
  });

  transport.onclose = () => {
    const sessionId = transport.sessionId;
    if (sessionId) {
      sessions().delete(sessionId);
    }
  };

  const server = createStrumfMcpServer();
  await server.connect(transport);

  return transport;
}

export function getMcpSession(
  sessionId: string,
): WebStandardStreamableHTTPServerTransport | undefined {
  return sessions().get(sessionId)?.transport;
}

export class McpSessionLimitError extends Error {
  constructor() {
    super("Too many open MCP sessions");
    this.name = "McpSessionLimitError";
  }
}
