/**
 * Public origin for links in emails, derived from the incoming request.
 */
export function getRequestOrigin(request: Request): string {
  const url = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host") ?? url.host;
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const protocol =
    forwardedProto?.split(",")[0]?.trim() ??
    (url.protocol === "https:" || url.protocol === "http:"
      ? url.protocol.replace(":", "")
      : "http");
  return `${protocol}://${host}`;
}
