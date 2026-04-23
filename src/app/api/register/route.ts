import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { env } from "~/env";
import { db } from "~/server/db";
import { normalizeEmail } from "~/server/lib/household-access";
import { getRequestOrigin } from "~/server/lib/request-origin";
import { sendVerificationEmail } from "~/server/lib/send-verification-email";
import {
  SUDO_ADMIN_EMAIL,
  SUDO_ADMIN_PASSWORD,
} from "~/server/lib/sudo-admin";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).max(100).optional(),
});

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

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

export async function POST(request: Request) {
  const body = (await request.json()) as unknown;
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const email = normalizeEmail(parsed.data.email);
  const skipVerify = env.SKIP_EMAIL_VERIFICATION === "true";
  const isBootstrapAdmin =
    email === SUDO_ADMIN_EMAIL && parsed.data.password === SUDO_ADMIN_PASSWORD;

  if (email === SUDO_ADMIN_EMAIL && !isBootstrapAdmin) {
    return NextResponse.json(
      {
        error:
          "This email is reserved for the bootstrap admin. Register with the project bootstrap password, or use a different email.",
      },
      { status: 400 },
    );
  }

  const existing = await db.user.findUnique({
    where: { email },
  });

  if (existing?.emailVerified && !isBootstrapAdmin) {
    return NextResponse.json(
      { error: "User already exists for this email" },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(
    isBootstrapAdmin ? SUDO_ADMIN_PASSWORD : parsed.data.password,
    12,
  );

  if (existing && !existing.emailVerified) {
    await db.user.update({
      where: { email },
      data: {
        passwordHash,
        name: parsed.data.name ?? existing.name,
        isActive: true,
        emailVerified: skipVerify || isBootstrapAdmin ? new Date() : null,
      },
    });

    if (skipVerify || isBootstrapAdmin) {
      return NextResponse.json(
        {
          message: isBootstrapAdmin
            ? "Bootstrap admin is ready. You can sign in now."
            : "Account updated. Email verification is skipped in this environment; you can sign in now.",
        },
        { status: 201 },
      );
    }

    const { message } = await issueVerificationEmail(email, request);
    return NextResponse.json({ message }, { status: 201 });
  }

  if (existing?.emailVerified && isBootstrapAdmin) {
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
      name: parsed.data.name ?? "Sudo Admin",
      passwordHash,
      isActive: true,
      emailVerified: skipVerify || isBootstrapAdmin ? new Date() : null,
    },
  });

  if (skipVerify || isBootstrapAdmin) {
    return NextResponse.json(
      {
        message: isBootstrapAdmin
          ? "Bootstrap admin is ready. You can sign in now."
          : "Registration complete. Email verification is skipped in this environment; you can sign in now.",
      },
      { status: 201 },
    );
  }

  const { message } = await issueVerificationEmail(email, request);
  return NextResponse.json({ message }, { status: 201 });
}
