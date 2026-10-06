import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Facebook, Instagram, Linkedin, MessageCircleQuestionMark, Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuoteDialog } from "@/components/QuoteDialog";
import { OPEN_QUOTE_EVENT } from "@/lib/quote";
import { CHAT_AVAILABLE } from "@/lib/api";

const FaqChat = lazy(() => import("@/components/FaqChat").then((m) => ({ default: m.FaqChat })));

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/gstsaudi", Icon: Linkedin },
  { label: "Facebook", href: "https://www.facebook.com/gstsaudi", Icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/gstsaudi", Icon: Instagram },
] as const;

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!drawerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  useEffect(() => {
    const open = () => setQuoteOpen(true);
    window.addEventListener(OPEN_QUOTE_EVENT, open);
    return () => window.removeEventListener(OPEN_QUOTE_EVENT, open);
  }, []);

  return (
    <>
      <div ref={drawerRef} className="fixed right-0 top-28 z-[60] flex items-center">
        <div className={`social-panel ${open ? "social-panel-open" : ""}`}>
          <div className="social-panel-inner">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Follow GST Group</div>
            <div className="flex gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="social-icon" tabIndex={open ? 0 : -1}>
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <Button
          type="button"
          size="icon"
          aria-label={open ? "Close social links" : "Open social links"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="social-trigger rounded-l-xl rounded-r-none"
        >
          {open ? <X className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
        </Button>
      </div>

      <div className="fixed bottom-5 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
        <Button asChild size="icon" className="whatsapp-button h-12 w-12 overflow-hidden rounded-2xl p-0 hover-3d sm:h-14 sm:w-14" aria-label="Chat with GST Group on WhatsApp">
          <a href="https://wa.me/966114509354" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </Button>
      </div>

      {/* The chat needs the server API, which a static (GitHub Pages) build does not have. */}
      {CHAT_AVAILABLE && (
      <div className="fixed bottom-5 left-4 z-[60] flex flex-col items-start gap-3 sm:bottom-7 sm:left-7">
        {faqOpen && (
          <div className="h-[480px] w-[calc(100vw-2rem)] max-w-sm animate-rise">
            <Suspense fallback={<div className="h-full rounded-2xl border border-white/15 bg-background/95" />}>
              <FaqChat onClose={() => setFaqOpen(false)} />
            </Suspense>
          </div>
        )}
        <Button
          type="button"
          size="icon"
          onClick={() => setFaqOpen((v) => !v)}
          aria-label={faqOpen ? "Close FAQ chat" : "Open FAQ chat"}
          aria-expanded={faqOpen}
          className="h-12 w-12 rounded-full border border-black/10 bg-white text-black shadow-lg shadow-black/20 transition-transform hover:scale-105 hover:bg-white"
        >
          {faqOpen ? <X className="h-5 w-5" /> : <MessageCircleQuestionMark className="h-5 w-5" />}
        </Button>
      </div>
      )}

      <QuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    </>
  );
}
