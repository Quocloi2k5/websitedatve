export function getApiOrigin() {
  const base = import.meta.env.VITE_API_URL || "/api";

  if (/^https?:\/\//i.test(base)) {
    return new URL(base).origin;
  }

  if (typeof window !== "undefined") {
    return window.location.origin.replace(/:\d+$/, ":4000");
  }

  return "";
}

export function toAbsoluteAssetUrl(value) {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;

  // Uploaded images and videos can live in durable object storage (for example,
  // Cloudflare R2) instead of the Render service's ephemeral filesystem.
  const mediaBase = (import.meta.env.VITE_MEDIA_URL || "").replace(/\/+$/, "");
  const origin = mediaBase || getApiOrigin();
  if (!origin) return value;

  if (value.startsWith("/")) {
    return `${origin}${value}`;
  }

  return `${origin}/${value}`;
}
