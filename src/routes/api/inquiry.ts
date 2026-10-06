import { createFileRoute } from "@tanstack/react-router";
import { preflight, withCors } from "@/lib/cors.server";

type Body = { subject?: unknown; body?: unknown; replyTo?: unknown };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Route = createFileRoute("/api/inquiry")({
  server: {
    handlers: {
      OPTIONS: ({ request }) => preflight(request),
      POST: async ({ request }) => withCors(request, await handle(request)),
    },
  },
});

async function handle(request: Request): Promise<Response> {
        let data: Body;
        try {
          data = (await request.json()) as Body;
        } catch {
          return new Response("Invalid JSON body", { status: 400 });
        }

        const subject = typeof data.subject === "string" ? data.subject.trim() : "";
        const body = typeof data.body === "string" ? data.body.trim() : "";
        const replyTo = typeof data.replyTo === "string" ? data.replyTo.trim() : "";
        if (!subject || !body || subject.length > 200 || body.length > 8000) {
          return new Response("Invalid inquiry", { status: 400 });
        }
        if (replyTo && !EMAIL_RE.test(replyTo)) {
          return new Response("Invalid email", { status: 400 });
        }

        const key = process.env["RESEND_API_KEY"];
        if (!key) {
          // Not configured: the client falls back to the visitor's email app.
          return new Response("Inquiry delivery is not configured", { status: 503 });
        }

        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
          body: JSON.stringify({
            from: process.env["INQUIRY_FROM"] ?? "GST Website <onboarding@resend.dev>",
            to: [process.env["INQUIRY_TO"] ?? "sales@gstsaudi.com"],
            subject,
            text: body,
            ...(replyTo ? { reply_to: replyTo } : {}),
          }),
        });
        if (!res.ok) return new Response("Delivery failed", { status: 502 });
        return Response.json({ ok: true });
}
