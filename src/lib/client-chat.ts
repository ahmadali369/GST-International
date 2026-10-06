import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { SYSTEM_PROMPT } from "@/lib/chat-prompt";

/**
 * Serverless chat for the static site: the visitor's browser calls an OpenAI-compatible
 * provider (default: Google Gemini free tier) directly. The key is therefore public —
 * restrict it to the site's address (HTTP referrer) in the provider's console and use a
 * free-tier key with no billing attached.
 */
const KEY = (import.meta.env.VITE_CHAT_API_KEY as string | undefined) ?? "";
const BASE_URL =
  (import.meta.env.VITE_CHAT_BASE_URL as string | undefined) ||
  "https://generativelanguage.googleapis.com/v1beta/openai";
const MODEL = (import.meta.env.VITE_CHAT_MODEL as string | undefined) || "gemini-2.5-flash";

export const CLIENT_CHAT_ENABLED = KEY !== "";

/** A `fetch` replacement for the chat transport that answers locally instead of hitting /api/chat. */
export const clientChatFetch: typeof fetch = async (_input, init) => {
  const { messages } = JSON.parse(String(init?.body ?? "{}")) as { messages?: UIMessage[] };
  if (!Array.isArray(messages) || messages.length > 30) {
    return new Response("Conversation too long", { status: 413 });
  }
  const provider = createOpenAICompatible({ name: "chat", baseURL: BASE_URL, apiKey: KEY });
  const result = streamText({
    model: provider(MODEL),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    abortSignal: init?.signal ?? undefined,
  });
  return result.toUIMessageStreamResponse({ originalMessages: messages });
};
