import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Trash2, X } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { API_BASE, apiUrl } from "@/lib/api";
import { CLIENT_CHAT_ENABLED, clientChatFetch } from "@/lib/client-chat";
import logo from "@/assets/gst-mark.png";

const STORAGE_KEY = "gst-faq-chat";

const SUGGESTIONS = [
  "What services does GST Group offer?",
  "Where are your offices located?",
  "How do I get a quote?",
  "Tell me about GST International",
];

function loadMessages(): UIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as UIMessage[]) : [];
  } catch {
    return [];
  }
}

export function FaqChat({ onClose }: { onClose: () => void }) {
  const { messages, sendMessage, status, setMessages, error } = useChat({
    id: "gst-faq",
    messages: loadMessages(),
    transport: new DefaultChatTransport({
      api: apiUrl("/api/chat"),
      // No server configured: answer in the browser (static GitHub Pages site).
      ...(API_BASE === "" && CLIENT_CHAT_ENABLED && import.meta.env.VITE_STATIC_SITE
        ? { fetch: clientChatFetch }
        : {}),
    }),
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (status === "ready") {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch {
        /* storage unavailable or full — chat still works, just isn't saved */
      }
    }
  }, [messages, status]);

  // Focus the input once on open, and only where a physical keyboard is likely
  // (avoids popping the on-screen keyboard and scrolling the page on phones).
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      containerRef.current?.querySelector("textarea")?.focus();
    }
  }, []);

  const handleSubmit = (message: { text?: string }) => {
    const text = message.text?.trim();
    if (!text || isLoading) return;
    sendMessage({ text });
  };

  const clearChat = () => {
    setMessages([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return (
    <div ref={containerRef} className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-background/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="GST Group" className="h-8 w-8 rounded-full object-contain" />
          <div className="leading-tight">
            <div className="font-display text-sm font-bold text-foreground">GST Assistant</div>
            <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Quick answers, 24/7</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={clearChat} aria-label="Clear chat" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground">
            <Trash2 className="h-4 w-4" />
          </button>
          <button type="button" onClick={onClose} aria-label="Close chat" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Conversation className="flex-1">
        <ConversationContent className="gap-4 p-4">
          {messages.length === 0 ? (
            <ConversationEmptyState>
              <div className="flex flex-col items-center gap-3 text-center">
                <img src={logo} alt="" className="h-14 w-14 rounded-full object-contain opacity-90" />
                <p className="text-sm text-muted-foreground">
                  Assalam-o-alaikum! Ask me anything about GST Group — services, offices, or how to get a quote.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => sendMessage({ text: s })}
                      className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:border-primary/50 hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </ConversationEmptyState>
          ) : (
            <>
              {messages.map((message) => {
                const text = message.parts.map((part) => (part.type === "text" ? part.text : "")).join("");
                if (!text) return null;
                return (
                  <Message key={message.id} from={message.role}>
                    <MessageContent>
                      {message.role === "assistant" ? (
                        <MessageResponse>{text}</MessageResponse>
                      ) : (
                        text
                      )}
                    </MessageContent>
                  </Message>
                );
              })}
              {status === "submitted" && <Shimmer className="text-sm">Thinking...</Shimmer>}
              {error && (
                <p className="text-xs text-destructive">
                  Something went wrong. Please try again or reach us on WhatsApp.
                </p>
              )}
            </>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-white/10 p-3">
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputTextarea placeholder="Ask about GST Group..." />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} disabled={isLoading} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
