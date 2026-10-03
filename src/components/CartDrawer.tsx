import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useState } from "react";
import { QuoteRequestForm } from "@/components/QuoteRequestForm";

export function CartDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { items, removeItem, updateQuantity, clearCart, getItemCount } = useCart();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const count = getItemCount();

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md border-l border-neutral-200 bg-white text-neutral-900 p-0 flex flex-col"
        >
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-neutral-100">
            <div className="flex items-center justify-between">
              <SheetTitle className="font-display text-xl text-neutral-950 flex items-center gap-2.5">
                <ShoppingCart className="w-5 h-5 text-amber-600" />
                Selected Services
                {count > 0 && (
                  <span className="text-xs font-bold bg-amber-100 text-amber-800 rounded-full px-2.5 py-0.5">
                    {count}
                  </span>
                )}
              </SheetTitle>
            </div>
            <SheetDescription className="text-neutral-500 text-sm">
              Review your selected IT services and request a custom quote.
            </SheetDescription>
          </SheetHeader>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4">
                  <ShoppingCart className="w-7 h-7 text-neutral-300" />
                </div>
                <p className="font-display text-lg text-neutral-400">Your cart is empty</p>
                <p className="text-sm text-neutral-400 mt-1">
                  Browse our IT services and add the ones you need.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group rounded-xl border border-neutral-200/80 bg-neutral-50/50 p-4 transition-all hover:border-amber-200/60 hover:bg-amber-50/20"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-[14px] font-semibold text-neutral-900 leading-snug">
                          {item.name}
                        </h4>
                        <p className="text-[12px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="shrink-0 w-8 h-8 rounded-lg border border-neutral-200 bg-white flex items-center justify-center text-neutral-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all"
                        aria-label={`Remove ${item.name}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                        Qty
                      </span>
                      <div className="inline-flex items-center rounded-lg border border-neutral-200 bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-neutral-900 disabled:opacity-30 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-[13px] font-semibold text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer actions */}
          {items.length > 0 && (
            <div className="px-6 py-5 border-t border-neutral-100 bg-neutral-50/50 space-y-3">
              <button
                onClick={() => {
                  onOpenChange(false);
                  setTimeout(() => setQuoteOpen(true), 300);
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 text-white px-5 py-3 text-sm font-semibold hover:bg-amber-600 transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/20"
              >
                Request Quote
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={clearCart}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-neutral-200 text-neutral-500 px-5 py-2.5 text-sm font-medium hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear Cart
              </button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <QuoteRequestForm open={quoteOpen} onOpenChange={setQuoteOpen} />
    </>
  );
}
