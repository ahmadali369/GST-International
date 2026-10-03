import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function QuoteDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [sending, setSending] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    const data = new FormData(event.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      `Project: ${data.get("message")}`,
    ].join("\n");

    window.location.href = `mailto:sales@gstsaudi.com?subject=${encodeURIComponent("Quote request — GST Group")}&body=${encodeURIComponent(body)}`;
    toast.success("Opening your email app — please press send to deliver your quote request.");
    setSending(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border border-neutral-200/80 bg-white text-neutral-900 shadow-2xl shadow-black/20">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-neutral-950">Request a Quote</DialogTitle>
          <DialogDescription className="text-neutral-500">
            Tell us about your project — our engineers reply within one business day.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="q-name" className="text-neutral-700">Full name</Label>
            <Input
              id="q-name"
              name="name"
              required
              placeholder="Your name"
              className="bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-neutral-900"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="q-email" className="text-neutral-700">Email</Label>
              <Input
                id="q-email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className="bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-neutral-900"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-phone" className="text-neutral-700">Phone</Label>
              <Input
                id="q-phone"
                name="phone"
                placeholder="+966 …"
                className="bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-neutral-900"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="q-message" className="text-neutral-700">Project details</Label>
            <Textarea
              id="q-message"
              name="message"
              rows={3}
              placeholder="Scope, location, timeline…"
              className="bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-neutral-900 resize-none"
            />
          </div>
          <Button
            type="submit"
            disabled={sending}
            className="w-full bg-neutral-950 text-white hover:bg-neutral-800"
          >
            {sending ? "Sending…" : "Send request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
