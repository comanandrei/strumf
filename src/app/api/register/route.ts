import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { env } from "~/env";
import { db } from "~/server/db";
import {
  getBootstrapAdminEmail,
  isBootstrapAdminConfigured,
  isBootstrapAdminLogin,
} from "~/server/lib/bootstrap-admin";
import { normalizeEmail } from "~/server/lib/household-access";
import { checkRateLimit, pruneRateLimitBuckets } from "~/server/lib/rate-limit";
import { getRequestOrigin } from "~/server/lib/request-origin";
import { sendVerificationEmail } from "~/server/lib/send-verification-email";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  name: z.string().min(1).max(100).optional(),
});

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;
const REGISTER_RATE_LIMIT = { limit: 10, windowMs: 15 * 60 * 1000 };

async function issueVerificationEmail(email: string, request: Request) {
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + TOKEN_TTL_MS);

  await db.verificationToken.deleteMany({
    where: { identifier: email },
  });

  await db.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  const origin = getRequestOrigin(request);
  const verifyUrl = `${origin}/api/auth/verify-email?token=${encodeURIComponent(token)}`;

  const { mode } = await sendVerificationEmail({ to: email, verifyUrl });

  return {
    message:
      mode === "resend"
        ? "Check your email to confirm your address, then sign in."
        : "Check your email to confirm your address, then sign in. (Email is not configured: the verification link was printed in the server log.)",
  };
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  pruneRateLimitBuckets();
  const rate = checkRateLimit({
    key: `register:${clientIp(request)}`,
    ...REGISTER_RATE_LIMIT,
  });
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many registration attempts. Try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSeconds) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const email = normalizeEmail(parsed.data.email);
  const skipVerify = env.SKIP_EMAIL_VERIFICATION === "true";
  const isBootstrapRegistration =
    isBootstrapAdminConfigured() &&
    isBootstrapAdminLogin(email, parsed.data.password);
  const bootstrapEmail = getBootstrapAdminEmail();

  if (
    bootstrapEmail &&
    email === bootstrapEmail &&
    !isBootstrapRegistration
  ) {
    return NextResponse.json(
      {
        error:
          "This email is reserved for the bootstrap admin. Register with the configured bootstrap password, or use a different email.",
      },
      { status: 400 },
    );
  }

  const existing = await db.user.findUnique({
    where: { email },
  });

  if (existing?.emailVerified && !isBootstrapRegistration) {
    return NextResponse.json(
      { error: "User already exists for this email" },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  const verifiedNow = skipVerify || isBootstrapRegistration;
  const activeNow = verifiedNow;

  if (existing && !existing.emailVerified) {
    await db.user.update({
      where: { email },
      data: {
        passwordHash,
        name: parsed.data.name ?? existing.name,
        isActive: activeNow,
        emailVerified: verifiedNow ? new Date() : null,
      },
    });

    if (verifiedNow) {
      return NextResponse.json(
        {
          message: isBootstrapRegistration
            ? "Bootstrap admin is ready. You can sign in now."
            : "Account updated. Email verification is skipped in this environment; you can sign in now.",
        },
        { status: 201 },
      );
    }

    const { message } = await issueVerificationEmail(email, request);
    return NextResponse.json({ message }, { status: 201 });
  }

  if (existing?.emailVerified && isBootstrapRegistration) {
    await db.user.update({
      where: { email },
      data: {
        passwordHash,
        name: parsed.data.name ?? existing.name,
        isActive: true,
        emailVerified: new Date(),
      },
    });
    return NextResponse.json(
      { message: "Bootstrap admin password refreshed. You can sign in now." },
      { status: 201 },
    );
  }

  await db.user.create({
    data: {
      email,
      name: parsed.data.name,
      passwordHash,
      isActive: activeNow,
      emailVerified: verifiedNow ? new Date() : null,
    },
  });

  if (verifiedNow) {
    return NextResponse.json(
      {
        message: isBootstrapRegistration
          ? "Bootstrap admin is ready. You can sign in now."
          : "Registration complete. Email verification is skipped in this environment; you can sign in now.",
      },
      { status: 201 },
    );
  }

  const { message } = await issueVerificationEmail(email, request);
  return NextResponse.json({ message }, { status: 201 });
}
