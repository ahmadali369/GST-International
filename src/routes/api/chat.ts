import { SYSTEM_PROMPT } from "@/lib/chat-prompt";
import { getChatModel } from "@/lib/chat-provider.server";
import { createFileRoute } from "@tanstack/react-router";
import { corsHeaders, preflight, withCors } from "@/lib/cors.server";
import { convertToModelMessages, streamText, type UIMessage } from "ai";


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
