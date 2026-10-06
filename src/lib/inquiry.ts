export type InquiryResult = "sent" | "mailto";

import { API_BASE, apiUrl } from "@/lib/api";

const SALES_EMAIL = "sales@gstsaudi.com";

/**
 * Delivers an inquiry through /api/inquiry (server-side email). When the server is not
 * configured or unreachable, falls back to opening the visitor's email app with the
 * message pre-filled, so an inquiry is never silently lost.
 */
const WEB3FORMS_KEY = (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) ?? "";

async function sendViaWeb3Forms(input: { subject: string; body: string; replyTo?: string }) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: input.subject,
      from_name: "GST Group website",
      ...(input.replyTo ? { email: input.replyTo } : {}),
      message: input.body,
    }),
  });
  const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
  return res.ok && data?.success === true;
}

export async function submitInquiry(input: {
  subject: string;
  body: string;
  replyTo?: string;
}): Promise<InquiryResult> {
  try {
    // Static site without a server: deliver through Web3Forms (the access key is public by design).
    if (API_BASE === "" && WEB3FORMS_KEY && import.meta.env.VITE_STATIC_SITE) {
      if (await sendViaWeb3Forms(input)) return "sent";
    } else {
      const res = await fetch(apiUrl("/api/inquiry"), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input),
      });
      if (res.ok) return "sent";
    }
  } catch {
    /* network error — fall through to mailto */
  }
  window.location.href = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(
    input.subject,
  )}&body=${encodeURIComponent(input.body)}`;
  return "mailto";
}
