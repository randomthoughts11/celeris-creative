import { NextResponse } from "next/server";
import { emailConfigStatus, sendContactEmail } from "@/lib/email";
import { SITE } from "@/lib/data";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  interests?: string[];
};

/** Quick check: open /api/contact in the browser after deploy. */
export async function GET() {
  const status = emailConfigStatus();
  return NextResponse.json({
    ok: status.resendConfigured || status.smtpConfigured,
    ...status,
    note: status.resendConfigured
      ? "With onboarding@resend.dev, Resend only delivers to the email on your Resend account until you verify celeriscreative.com."
      : "RESEND_API_KEY is missing on this deployment.",
  });
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const interests = Array.isArray(body.interests)
    ? body.interests.map(String).filter(Boolean)
    : [];

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  try {
    const provider = await sendContactEmail({ name, email, message, interests });
    return NextResponse.json({ ok: true, provider });
  } catch (err) {
    const detail =
      err instanceof Error ? err.message : "Unknown email error.";
    console.error("[contact]", detail);

    return NextResponse.json(
      {
        error: `Couldn't send your request right now. Email ${SITE.formEmail} directly.`,
        detail,
      },
      { status: 502 }
    );
  }
}
