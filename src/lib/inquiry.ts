export type InquiryResult = "sent" | "mailto";

import { apiUrl } from "@/lib/api";

const SALES_EMAIL = "sales@gstsaudi.com";

/**
 * Delivers an inquiry through /api/inquiry (server-side email). When the server is not
 * configured or unreachable, falls back to opening the visitor's email app with the
 * message pre-filled, so an inquiry is never silently lost.
 */
export async function submitInquiry(input: {
  subject: string;
  body: string;
  replyTo?: string;
}): Promise<InquiryResult> {
  try {
    const res = await fetch(apiUrl("/api/inquiry"), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    });
    if (res.ok) return "sent";
  } catch {
    /* network error — fall through to mailto */
  }
  window.location.href = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(
    input.subject,
  )}&body=${encodeURIComponent(input.body)}`;
  return "mailto";
}
