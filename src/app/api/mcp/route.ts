import {
  handleMcpDelete,
  handleMcpGet,
  handleMcpPost,
} from "~/server/mcp/handle-mcp-request";
import { verifyMcpBearerAuth } from "~/server/mcp/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, mcp-session-id, Last-Event-ID, mcp-protocol-version",
  "Access-Control-Expose-Headers": "mcp-session-id, mcp-protocol-version",
};

function withCors(response: Response): Response {
  for (const [key, value] of Object.entries(corsHeaders)) {
    response.headers.set(key, value);
  }
  return response;
}

async function authorized(
  request: Request,
  handler: (request: Request) => Promise<Response>,
): Promise<Response> {
  const authError = verifyMcpBearerAuth(request);
  if (authError) {
    return withCors(authError);
  }
  return withCors(await handler(request));
}

export function OPTIONS(): Response {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export function GET(request: Request): Promise<Response> {
  return authorized(request, handleMcpGet);
}

export function POST(request: Request): Promise<Response> {
  return authorized(request, handleMcpPost);
}

export function DELETE(request: Request): Promise<Response> {
  return authorized(request, handleMcpDelete);
}
