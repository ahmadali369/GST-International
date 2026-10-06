import { getChatModel } from "@/lib/chat-provider.server";
import { createFileRoute } from "@tanstack/react-router";
import { corsHeaders, preflight, withCors } from "@/lib/cors.server";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

const SYSTEM_PROMPT = `You are the GST Group FAQ assistant — a helpful, concise assistant for GST Group, an engineering and contracting group of companies.

Key facts about GST Group:
- Engineering & contracting group operating in Saudi Arabia, Dubai (UAE), Pakistan, and the UK.
- Headquarters: Riyadh, Saudi Arabia. Newly opened office: Dubai, UAE. Engineering Hub: Lahore, Pakistan. Master City Office: Gujranwala, Pakistan. Commercial Office: London, UK.
- Founded in 2000 by Mr. Zahoor Ahmed. Co-Founder/Chairman: Engr. Asif Mehmood. Country CFO: Mr. Asad Mehmood.
- Group of companies (subsidiaries) includes GST International (KSA, high-voltage engineering) and other subsidiaries spanning metal, glass, civil, MEP, and interior fitout contracting.
- Core services: metal & steel works, architectural glass & facades, civil & structural construction, MEP (mechanical, electrical, plumbing), interior fitout, and high-voltage/power engineering.
- Contact: WhatsApp +966 11 450 9354 (wa.me/966114509354), email sales@gstsaudi.com, website gstsaudi.com.
- Visitors can request a quote via the "Get a Quote" button on the site.

Rules:
- Answer only questions related to GST Group, its services, offices, leadership, projects, and how to contact or get a quote.
- Keep answers short (2-4 sentences), friendly, and professional.
- For pricing or project-specific questions, direct the user to the Get a Quote form or WhatsApp.
- If asked something unrelated to GST Group, politely steer back to how you can help with GST Group.
- Never invent phone numbers, emails, or addresses not listed above.`;

type ChatRequestBody = { messages?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      OPTIONS: ({ request }) => preflight(request),
      POST: async ({ request }) => {
        let body: ChatRequestBody;
        try {
          body = (await request.json()) as ChatRequestBody;
        } catch {
          return withCors(request, new Response("Invalid JSON body", { status: 400 }));
        }
        const { messages } = body ?? {};
        if (!Array.isArray(messages)) {
          return withCors(request, new Response("Messages are required", { status: 400 }));
        }
        // Keep a public endpoint cheap to abuse: cap conversation size.
        if (messages.length > 30 || JSON.stringify(messages).length > 20000) {
          return withCors(request, new Response("Conversation too long", { status: 413 }));
        }

        const model = getChatModel();
        if (!model) {
          return withCors(request, new Response("Chat is not configured (missing CHAT_API_KEY)", { status: 503 }));
        }

        const result = streamText({
          model,
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
          headers: corsHeaders(request),
        });
      },
    },
  },
});
