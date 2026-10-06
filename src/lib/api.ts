/**
 * Base URL of the server that hosts /api/chat and /api/inquiry.
 * Empty on the full (Cloudflare Workers) build, where the API lives on the same origin.
 * On the static GitHub Pages build, set VITE_API_BASE to the deployed Worker URL.
 */
export const API_BASE: string = ((import.meta.env.VITE_API_BASE as string | undefined) ?? "").replace(/\/+$/, "");

export const apiUrl = (path: string) => `${API_BASE}${path}`;

/** The chat needs a server; show it unless this is a static build with no API configured. */
export const CHAT_AVAILABLE =
  !import.meta.env.VITE_STATIC_SITE || API_BASE !== "" || Boolean(import.meta.env.VITE_CHAT_API_KEY);
