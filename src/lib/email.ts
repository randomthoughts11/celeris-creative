import nodemailer from "nodemailer";
import { Resend } from "resend";
import { SITE } from "@/lib/data";

export type ContactMail = {
  name: string;
  email: string;
  message: string;
  interests: string[];
  phone: string;
  /** Human-readable SMS consent record, e.g. "Yes — 2026-09-28T… from 1.2.3.4". */
  smsConsent: string;
};

function recipient() {
  return (
    process.env.CONTACT_TO_EMAIL?.trim() ||
    process.env.FORM_TO_EMAIL?.trim() ||
    SITE.formEmail
  );
}

function buildBodies({ name, email, message, interests, phone, smsConsent }: ContactMail) {
  const subject = `Strategy call request — ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `SMS consent: ${smsConsent}`,
    `Interested in: ${interests.join(", ") || "—"}`,
    "",
    message || "(No message provided)",
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 16px">New strategy call request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="color:#555;font-size:13px;margin-top:-8px">
        Hit Reply in your inbox to answer them (Reply-To is already set).
      </p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>
      <p><strong>SMS consent:</strong> ${escapeHtml(smsConsent)}</p>
      <p><strong>Interested in:</strong> ${escapeHtml(interests.join(", ") || "—")}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(message || "(No message provided)")}</p>
      <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
      <p style="color:#888;font-size:12px;margin:0">
        Sent from ${escapeHtml(SITE.url.replace(/^https?:\/\//, ""))} contact form
      </p>
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
  const apiKey =
    process.env.RESEND_API_KEY?.trim() ||
    process.env.ResendAPIkey?.trim() ||
    process.env.RESEND_APIKEY?.trim();
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
  const apiKey =
    process.env.RESEND_API_KEY?.trim() ||
    process.env.ResendAPIkey?.trim() ||
    process.env.RESEND_APIKEY?.trim();

  return {
    resendConfigured: Boolean(apiKey),
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
    detectedKeyName: process.env.RESEND_API_KEY?.trim()
      ? "RESEND_API_KEY"
      : process.env.ResendAPIkey?.trim()
        ? "ResendAPIkey"
        : process.env.RESEND_APIKEY?.trim()
          ? "RESEND_APIKEY"
          : null,
  };
}

/**
 * Prefers Resend, then SMTP. Delivers to CONTACT_TO_EMAIL or ganesh@.
 */
export async function sendContactEmail(mail: ContactMail) {
  const hasResendKey = Boolean(
    process.env.RESEND_API_KEY?.trim() ||
      process.env.ResendAPIkey?.trim() ||
      process.env.RESEND_APIKEY?.trim()
  );

  try {
    const viaResend = await sendWithResend(mail);
    if (viaResend) return viaResend;
  } catch (err) {
    if (hasResendKey) {
      throw err;
    }
  }

  const viaSmtp = await sendWithSmtp(mail);
  if (viaSmtp) return viaSmtp;

  throw new Error(
    "Email is not configured. In Vercel, the key must be named exactly RESEND_API_KEY (yours is currently named ResendAPIkey). Rename it, then redeploy."
  );
}
