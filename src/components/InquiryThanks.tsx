import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { InquiryResult } from "@/lib/inquiry";

export function InquiryThanks({
  result,
  onClose,
  dark = false,
}: {
  result: InquiryResult;
  onClose?: () => void;
  dark?: boolean;
}) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-3 py-8 text-center">
      <CheckCircle2 className="h-12 w-12 text-emerald-500" />
      <h3 className={`font-display text-xl ${dark ? "text-white" : "text-neutral-950"}`}>
        {result === "sent" ? "Thank you — we've got it" : "One last step"}
      </h3>
      <p className={`max-w-sm text-sm ${dark ? "text-foreground/70" : "text-neutral-600"}`}>
        {result === "sent"
          ? "Your request is with our team. We'll reply within one business day."
          : "Your email app should now be open with the message ready — press send to deliver it. No email app? Write to sales@gstsaudi.com."}
      </p>
      {onClose && (
        <Button type="button" onClick={onClose} className="mt-2 bg-neutral-950 text-white hover:bg-neutral-800">
          Close
        </Button>
      )}
    </div>
  );
}
