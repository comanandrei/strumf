import { NextResponse } from "next/server";

import { env } from "~/env";
import { db } from "~/server/db";
import { sendAppointmentReminderEmail } from "~/server/lib/send-appointment-reminder-email";
import { secureCompare } from "~/server/lib/secure-compare";

export const dynamic = "force-dynamic";

const BATCH_SIZE = 50;

export async function GET(request: Request) {
  return processReminderRequest(request);
}

export async function POST(request: Request) {
  return processReminderRequest(request);
}

async function processReminderRequest(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const dueAppointments = await db.appointment.findMany({
    where: {
      reminderAt: { lte: now },
      reminderSentAt: null,
      startsAt: { gte: now },
    },
    orderBy: { reminderAt: "asc" },
    take: BATCH_SIZE,
    include: {
      baby: {
        select: {
          displayName: true,
          household: {
            select: {
              memberships: {
                select: {
                  user: {
                    select: {
                      email: true,
                      isActive: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  let sent = 0;
  let failed = 0;
  let skipped = 0;
  let withoutRecipients = 0;
  let mode: "resend" | "console" | null = null;
  const appointmentUrl = new URL("/app/calendar", request.url).toString();

  for (const appointment of dueAppointments) {
    const claim = await db.appointment.updateMany({
      where: {
        id: appointment.id,
        reminderSentAt: null,
      },
      data: {
        reminderSentAt: now,
      },
    });

    if (claim.count === 0) {
      skipped += 1;
      continue;
    }

    const recipients = appointment.baby.household.memberships
      .map((membership) => membership.user)
      .filter((user) => user.isActive && user.email)
      .map((user) => user.email as string);

    if (!recipients.length) {
      withoutRecipients += 1;
      continue;
    }

    try {
      const result = await sendAppointmentReminderEmail({
        to: recipients,
        babyName: appointment.baby.displayName,
        title: appointment.title,
        startsAt: appointment.startsAt,
        endsAt: appointment.endsAt,
        location: appointment.location,
        notes: appointment.notes,
        appointmentUrl,
      });
      mode = result.mode;
      sent += 1;
    } catch (error) {
      failed += 1;
      await db.appointment.update({
        where: { id: appointment.id },
        data: { reminderSentAt: null },
      });
      console.error("[strumf] Appointment reminder failed", {
        appointmentId: appointment.id,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return NextResponse.json({
    ok: failed === 0,
    checked: dueAppointments.length,
    sent,
    failed,
    skipped,
    withoutRecipients,
    mode,
  });
}

function isAuthorized(request: Request) {
  const secret = env.APPOINTMENT_REMINDER_CRON_SECRET;
  if (!secret) {
    return env.NODE_ENV !== "production";
  }

  const authHeader = request.headers.get("authorization");
  const bearer = authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : null;
  const headerSecret = request.headers.get("x-cron-secret");
  return (
    (bearer !== null && secureCompare(bearer, secret)) ||
    (headerSecret !== null && secureCompare(headerSecret, secret))
  );
}
