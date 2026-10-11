/**
 * End-to-end MCP client test against a running dev server.
 *
 * Usage:
 *   MCP_API_SECRET=... MCP_BASE_URL=http://localhost:3000 node scripts/test-mcp.mjs
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const baseUrl = process.env.MCP_BASE_URL ?? "http://localhost:3000";
const secret = process.env.MCP_API_SECRET;

if (!secret) {
  console.error("Set MCP_API_SECRET to match the server.");
  process.exit(1);
}

const url = new URL("/api/mcp", baseUrl);

const client = new Client({ name: "strumf-mcp-test", version: "1.0.0" });

const transport = new StreamableHTTPClientTransport(url, {
  requestInit: {
    headers: {
      Authorization: `Bearer ${secret}`,
    },
  },
});

console.log("Connecting to", url.toString());

await client.connect(transport);

const tools = await client.listTools();
console.log(
  "Tools:",
  tools.tools.map((t) => t.name),
);

const result = await client.callTool({
  name: "get_strumf_app_stats",
  arguments: {},
});

console.log("Tool result:", JSON.stringify(result, null, 2));

await client.close();
console.log("OK");
