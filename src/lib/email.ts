import nodemailer from "nodemailer";
import { Resend } from "resend";
import { SITE } from "@/lib/data";

export type ContactMail = {
  name: string;
  email: string;
  message: string;
  interests: string[];
};

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
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  const from =
    process.env.EMAIL_FROM ||
    process.env.RESEND_FROM ||
    "Celeris Creative <onboarding@resend.dev>";

  const { subject, text, html } = buildBodies(mail);
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [SITE.formEmail],
    replyTo: mail.email,
    subject,
    text,
    html,
  });

  if (error) {
    throw new Error(error.message || "Resend rejected the message.");
  }

  return "resend" as const;
}

async function sendWithSmtp(mail: ContactMail) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT || 587);
  const from =
    process.env.EMAIL_FROM ||
    process.env.SMTP_FROM ||
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
    to: SITE.formEmail,
    replyTo: mail.email,
    subject,
    text,
    html,
  });

  return "smtp" as const;
}

/**
 * Prefers Resend, then SMTP. Both deliver to SITE.formEmail (ganesh@).
 * Yes — putting SMTP host/user/pass in env is enough to send without Resend.
 */
export async function sendContactEmail(mail: ContactMail) {
  const viaResend = await sendWithResend(mail);
  if (viaResend) return viaResend;

  const viaSmtp = await sendWithSmtp(mail);
  if (viaSmtp) return viaSmtp;

  throw new Error(
    "Email is not configured. Add RESEND_API_KEY or SMTP_HOST/SMTP_USER/SMTP_PASS to the environment."
  );
}
