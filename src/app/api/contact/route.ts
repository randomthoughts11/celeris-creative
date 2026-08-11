import { NextResponse } from "next/server";
import { SITE } from "@/lib/data";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  interests?: string[];
};

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

  const subject = `Strategy call request — ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Interested in: ${interests.join(", ") || "—"}`,
    "",
    message || "(No message provided)",
  ].join("\n");

  try {
    // FormSubmit AJAX — delivers to SITE.formEmail with no API key.
    // First live submission emails ganesh@ a one-time confirmation link.
    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(SITE.formEmail)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message: text,
          _subject: subject,
          _replyto: email,
          _template: "table",
        }),
      }
    );

    const data = (await res.json().catch(() => ({}))) as {
      success?: boolean | string;
      message?: string;
    };

    if (!res.ok) {
      return NextResponse.json(
        {
          error:
            data.message ||
            "Couldn't send your request. Email us directly instead.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Couldn't send your request. Email us directly instead." },
      { status: 502 }
    );
  }
}
