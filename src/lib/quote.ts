export const OPEN_QUOTE_EVENT = "gst:open-quote";

/** Opens the global quote dialog (hosted by FloatingActions) from anywhere. */
export function openQuote() {
  window.dispatchEvent(new Event(OPEN_QUOTE_EVENT));
}
