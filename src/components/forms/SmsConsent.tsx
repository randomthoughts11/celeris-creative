import Link from "next/link";
import { SMS_CONSENT_BODY } from "@/lib/legal";

export function SmsConsent({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <fieldset className="mt-6 rounded-2xl border border-line p-5">
      <legend className="font-mono-label px-2 text-xs text-fog">
        Text message updates (optional)
      </legend>
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-fog">
        <input
          type="checkbox"
          name="smsConsent"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-iris"
        />
        <span>
          {SMS_CONSENT_BODY} View our{" "}
          <Link href="/privacy" className="text-snow underline underline-offset-2">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms-and-conditions" className="text-snow underline underline-offset-2">
            SMS Terms &amp; Conditions
          </Link>
          .
        </span>
      </label>
    </fieldset>
  );
}
