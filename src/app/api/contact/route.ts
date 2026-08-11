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
      ? status.from.includes("onboarding@resend.dev")
        ? "Still using Resend's test From address. Verify celeriscreative.com in Resend and set EMAIL_FROM to an address on that domain (e.g. forms@celeriscreative.com)."
        : "From uses your domain. Confirm celeriscreative.com is Verified in Resend (SPF/DKIM), then check Google Workspace Spam/Promotions for new form emails."
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
