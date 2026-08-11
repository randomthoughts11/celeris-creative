import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";
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
        detail:
          process.env.NODE_ENV === "development" ? detail : undefined,
      },
      { status: 502 }
    );
  }
}
