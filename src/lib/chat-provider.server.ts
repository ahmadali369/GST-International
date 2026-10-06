import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

// Any OpenAI-compatible provider works. Defaults to Google Gemini's free tier.
//   CHAT_API_KEY   (required)  key from the provider, e.g. https://aistudio.google.com/apikey
//   CHAT_BASE_URL  (optional)  default https://generativelanguage.googleapis.com/v1beta/openai
//   CHAT_MODEL     (optional)  default gemini-2.5-flash
// Examples: Groq  -> CHAT_BASE_URL=https://api.groq.com/openai/v1  CHAT_MODEL=llama-3.3-70b-versatile
//           OpenAI -> CHAT_BASE_URL=https://api.openai.com/v1       CHAT_MODEL=gpt-4o-mini
export function getChatModel() {
  const apiKey = process.env["CHAT_API_KEY"];
  if (!apiKey) return null;
  const provider = createOpenAICompatible({
    name: "chat",
    baseURL: process.env["CHAT_BASE_URL"] ?? "https://generativelanguage.googleapis.com/v1beta/openai",
    apiKey,
  });
  return provider(process.env["CHAT_MODEL"] ?? "gemini-2.5-flash");
}
