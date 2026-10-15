"use client";

/**
 * Remote photography is served by Unsplash's imgix CDN, which already resizes
 * and negotiates AVIF/WebP, so the browser requests the right width directly.
 * Local files are served as-is.
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", url.searchParams.get("fit") ?? "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 72));
    return url.toString();
  }
  return src;
}
