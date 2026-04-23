import { NextResponse, type NextRequest } from "next/server";

import { db } from "~/server/db";
import { normalizeEmail } from "~/server/lib/household-access";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/auth?error=missing_token", request.url));
  }

  const record = await db.verificationToken.findUnique({
    where: { token },
  });

  if (!record || record.expires < new Date()) {
    return NextResponse.redirect(new URL("/auth?error=invalid_token", request.url));
  }

  const email = normalizeEmail(record.identifier);

  await db.$transaction([
    db.user.update({
      where: { email },
      data: { emailVerified: new Date(), isActive: true },
    }),
    db.verificationToken.delete({ where: { token } }),
  ]);

  return NextResponse.redirect(new URL("/auth?verified=1", request.url));
}
