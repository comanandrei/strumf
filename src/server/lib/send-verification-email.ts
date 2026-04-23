import { env } from "~/env";

export async function sendVerificationEmail(params: {
  to: string;
  verifyUrl: string;
}): Promise<{ mode: "resend" | "console" }> {
  const { to, verifyUrl } = params;
  const subject = "Confirm your Strumf email";
  const html = `<p>Thanks for signing up.</p><p><a href="${verifyUrl}">Confirm your email address</a></p><p>If you did not create an account, you can ignore this message.</p>`;

  if (env.RESEND_API_KEY && env.EMAIL_FROM) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM,
        to: [to],
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

  console.info("[strumf] Verification link (configure RESEND_API_KEY + EMAIL_FROM to email):", verifyUrl);
  return { mode: "console" };
}
