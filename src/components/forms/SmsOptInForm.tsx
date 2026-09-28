"use client";

import { useState } from "react";
import { SmsConsent } from "@/components/forms/SmsConsent";
import { SITE } from "@/lib/data";

const input =
  "w-full border-b border-line bg-transparent pb-3 text-lg text-snow placeholder:text-mist focus:border-iris focus:outline-none";
const label = "font-mono-label mb-3 block text-xs text-fog";

export function SmsOptInForm() {
  const [smsConsent, setSmsConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setStatus("sending");
    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          phone: String(data.get("phone") ?? "").trim(),
          message: "Submitted from the SMS opt-in form on /sms-disclosure.",
          interests: [],
          smsConsent,
        }),
      });
      const payload = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(payload.error || `Couldn't send. Email ${SITE.formEmail}.`);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : `Couldn't send. Email ${SITE.formEmail}.`);
      setStatus("idle");
    }
  };

  if (status === "done") {
    return (
      <p className="mt-12 rounded-card border border-line bg-ink-2 p-8 text-fog">
        Thanks — your details were received.
        {smsConsent && " You're opted in to text messages. Reply STOP at any time to opt out, or HELP for help."}
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label="SMS opt-in"
      className="mt-12 rounded-card border border-line bg-ink-2 p-8"
    >
      <h2 className="font-display text-2xl font-semibold tracking-tight text-snow">
        Sign up for text messages
      </h2>
      <p className="mt-2 text-sm text-fog">
        Enter your details and check the box to receive texts from {SITE.legalName}.
      </p>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="sms-name" className={label}>Your name</label>
          <input id="sms-name" name="name" required autoComplete="name" className={input} />
        </div>
        <div>
          <label htmlFor="sms-email" className={label}>Email</label>
          <input id="sms-email" name="email" type="email" required autoComplete="email" className={input} />
        </div>
      </div>
      <div className="mt-8">
        <label htmlFor="sms-phone" className={label}>Mobile number</label>
        <input
          id="sms-phone"
          name="phone"
          type="tel"
          required={smsConsent}
          autoComplete="tel"
          placeholder="+1 (555) 123-4567"
          className={input}
        />
      </div>
      <SmsConsent checked={smsConsent} onChange={setSmsConsent} />
      {error && (
        <p className="mt-4 text-sm text-red-300" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-8 rounded-full bg-snow px-8 py-4 text-base font-medium text-ink disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
