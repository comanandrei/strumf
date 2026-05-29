import { env } from "~/env";

export async function sendAppointmentReminderEmail(params: {
  to: string[];
  babyName: string;
  title: string;
  startsAt: Date;
  endsAt?: Date | null;
  location?: string | null;
  notes?: string | null;
  appointmentUrl?: string;
}): Promise<{ mode: "resend" | "console" }> {
  const recipients = Array.from(new Set(params.to.map((email) => email.trim()).filter(Boolean)));
  if (!recipients.length) {
    return { mode: "console" };
  }

  const subject = `Reminder: ${params.title} for ${params.babyName}`;
  const startsAtLabel = formatDateTime(params.startsAt);
  const timeWindow = params.endsAt
    ? `${startsAtLabel} - ${formatTime(params.endsAt)}`
    : startsAtLabel;
  const appointmentUrl = params.appointmentUrl ?? "/app/calendar";
  const locationBlock = params.location
    ? `<p><strong>Location:</strong> ${escapeHtml(params.location)}</p>`
    : "";
  const notesBlock = params.notes
    ? `<p><strong>Notes:</strong><br />${escapeHtml(params.notes).replaceAll("\n", "<br />")}</p>`
    : "";

  const html = `
    <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.5; color: #34352f;">
      <p style="font-size: 14px; color: #777266; margin: 0 0 8px;">Strumf appointment reminder</p>
      <h1 style="font-size: 24px; margin: 0 0 12px;">${escapeHtml(params.title)}</h1>
      <p><strong>For:</strong> ${escapeHtml(params.babyName)}</p>
      <p><strong>When:</strong> ${escapeHtml(timeWindow)}</p>
      ${locationBlock}
      ${notesBlock}
      <p style="margin-top: 20px;">
        <a href="${escapeHtml(appointmentUrl)}" style="display: inline-block; border-radius: 999px; background: #8aa79a; color: white; padding: 12px 18px; text-decoration: none; font-weight: 700;">
          Open appointment
        </a>
      </p>
      <p style="font-size: 12px; color: #777266; margin-top: 24px;">You are receiving this because your household scheduled a reminder in Strumf.</p>
    </div>
  `;

  if (env.RESEND_API_KEY && env.EMAIL_FROM) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM,
        to: recipients,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Resend error: ${text}`);
    }
    return { mode: "resend" };
  }

  console.info(
    "[strumf] Appointment reminder (configure RESEND_API_KEY + EMAIL_FROM to email):",
    {
      to: recipients,
      subject,
      when: timeWindow,
      appointmentUrl,
    },
  );
  return { mode: "console" };
}

function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function formatTime(value: Date) {
  return new Intl.DateTimeFormat(undefined, {
    timeStyle: "short",
  }).format(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
