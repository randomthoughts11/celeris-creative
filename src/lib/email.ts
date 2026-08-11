import nodemailer from "nodemailer";
import { Resend } from "resend";
import { SITE } from "@/lib/data";

export type ContactMail = {
  name: string;
  email: string;
  message: string;
  interests: string[];
};

function recipient() {
  return (
    process.env.CONTACT_TO_EMAIL?.trim() ||
    process.env.FORM_TO_EMAIL?.trim() ||
    SITE.formEmail
  );
}

function buildBodies({ name, email, message, interests }: ContactMail) {
  const subject = `Strategy call request — ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Interested in: ${interests.join(", ") || "—"}`,
    "",
    message || "(No message provided)",
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 16px">New strategy call request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <p><strong>Interested in:</strong> ${escapeHtml(interests.join(", ") || "—")}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(message || "(No message provided)")}</p>
    </div>
  `;

  return { subject, text, html };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function sendWithResend(mail: ContactMail) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;

  const from =
    process.env.EMAIL_FROM?.trim() ||
    process.env.RESEND_FROM?.trim() ||
    "Celeris Creative <onboarding@resend.dev>";

  const to = recipient();
  const { subject, text, html } = buildBodies(mail);
  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: mail.email,
    subject,
    text,
    html,
  });

  if (error) {
    // Most common: unverified domain / can only send to account email with onboarding@
    throw new Error(
      error.message ||
        "Resend rejected the message. Verify your domain or check EMAIL_FROM."
    );
  }

  if (!data?.id) {
    throw new Error("Resend returned no message id.");
  }

  return "resend" as const;
}

async function sendWithSmtp(mail: ContactMail) {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT || 587);
  const from =
    process.env.EMAIL_FROM?.trim() ||
    process.env.SMTP_FROM?.trim() ||
    `"Celeris Creative" <${user}>`;

  const { subject, text, html } = buildBodies(mail);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to: recipient(),
    replyTo: mail.email,
    subject,
    text,
    html,
  });

  return "smtp" as const;
}

export function emailConfigStatus() {
  return {
    resendConfigured: Boolean(process.env.RESEND_API_KEY?.trim()),
    smtpConfigured: Boolean(
      process.env.SMTP_HOST?.trim() &&
        process.env.SMTP_USER?.trim() &&
        process.env.SMTP_PASS?.trim()
    ),
    to: recipient(),
    from:
      process.env.EMAIL_FROM?.trim() ||
      process.env.RESEND_FROM?.trim() ||
      "Celeris Creative <onboarding@resend.dev>",
  };
}

/**
 * Prefers Resend, then SMTP. Delivers to CONTACT_TO_EMAIL or ganesh@.
 */
export async function sendContactEmail(mail: ContactMail) {
  try {
    const viaResend = await sendWithResend(mail);
    if (viaResend) return viaResend;
  } catch (err) {
    // If Resend is configured but fails, don't silently fall through —
    // surface that error (SMTP is opt-in fallback only when Resend is absent).
    if (process.env.RESEND_API_KEY?.trim()) {
      throw err;
    }
  }

  const viaSmtp = await sendWithSmtp(mail);
  if (viaSmtp) return viaSmtp;

  throw new Error(
    "Email is not configured. Add RESEND_API_KEY (and EMAIL_FROM) in Vercel env, then redeploy."
  );
}
