import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";

export function QuoteRequestForm({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { items, clearCart } = useCart();
  const [sending, setSending] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);

    const data = new FormData(event.currentTarget);
    const selectedServices = items
      .map((item) => `✓ ${item.name}${item.quantity > 1 ? ` (×${item.quantity})` : ""}`)
      .join("\n");

    const body = [
      `── IT Services Quote Request ──`,
      ``,
      `Name: ${data.get("fullName")}`,
      `Company: ${data.get("companyName") || "N/A"}`,
      `Email: ${data.get("email")}`,
      `Phone/WhatsApp: ${data.get("phone") || "N/A"}`,
      ``,
      `── Selected Services ──`,
      selectedServices,
      ``,
      `── Project Details ──`,
      data.get("details") || "Not provided",
      ``,
      `Budget: ${data.get("budget") || "Not specified"}`,
      `Timeline: ${data.get("timeline") || "Not specified"}`,
    ].join("\n");

    window.location.href = `mailto:sales@gstsaudi.com?subject=${encodeURIComponent(
      "IT Services Quote Request — GST International"
    )}&body=${encodeURIComponent(body)}`;

    toast.success("Opening your email app — please press send to deliver your quote request.");
    clearCart();
    setSending(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto border border-neutral-200/80 bg-white text-neutral-900 shadow-2xl shadow-black/20">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-neutral-950">
            Request a Quote
          </DialogTitle>
          <DialogDescription className="text-neutral-500">
            Tell us about your project — our team will review your requirements and respond with a
            custom quotation.
          </DialogDescription>
        </DialogHeader>

        {/* Selected services */}
        {items.length > 0 && (
          <div className="rounded-xl border border-amber-200/60 bg-amber-50/40 p-4 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-800">
              Selected Services ({items.length})
            </div>
            <div className="space-y-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 text-[13px] text-neutral-700"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{item.name}</span>
                  {item.quantity > 1 && (
                    <span className="text-[11px] text-amber-700 bg-amber-100 rounded px-1.5 py-0.5 font-medium">
                      ×{item.quantity}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="qr-fullName" className="text-neutral-700">
                Full Name *
              </Label>
              <Input
                id="qr-fullName"
                name="fullName"
                required
                placeholder="Your full name"
                className="bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-neutral-900"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="qr-companyName" className="text-neutral-700">
                Company Name
              </Label>
              <Input
                id="qr-companyName"
                name="companyName"
                placeholder="Company name"
                className="bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="qr-email" className="text-neutral-700">
                Email Address *
              </Label>
              <Input
                id="qr-email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className="bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-neutral-900"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="qr-phone" className="text-neutral-700">
                Phone / WhatsApp
              </Label>
              <Input
                id="qr-phone"
                name="phone"
                placeholder="+966 …"
                className="bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="qr-details" className="text-neutral-700">
              Project Details / Requirements
            </Label>
            <Textarea
              id="qr-details"
              name="details"
              rows={3}
              placeholder="Describe your project scope, goals, and any specific requirements…"
              className="bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-neutral-900 resize-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="qr-budget" className="text-neutral-700">
                Budget (optional)
              </Label>
              <Input
                id="qr-budget"
                name="budget"
                placeholder="e.g. $5,000 – $15,000"
                className="bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-neutral-900"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="qr-timeline" className="text-neutral-700">
                Timeline (optional)
              </Label>
              <Input
                id="qr-timeline"
                name="timeline"
                placeholder="e.g. 2–3 months"
                className="bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-neutral-900"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={sending}
            className="w-full bg-neutral-950 text-white hover:bg-amber-600 transition-colors duration-300 flex items-center gap-2"
          >
            {sending ? (
              "Sending…"
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Request
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
