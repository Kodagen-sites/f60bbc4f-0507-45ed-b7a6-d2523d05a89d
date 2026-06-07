import assetManifest from "@/content/asset-manifest.json";
import { resolveImage } from "@/lib/image-fallback";

type Manifest = {
  images?: Record<string, string>;
  videos?: Record<string, string>;
};

const manifest = assetManifest as Manifest;

/** URL for a generated image slot, or "" if the slot isn't populated yet. */
export function assetUrl(slot: string): string {
  return manifest.images?.[slot] ?? "";
}

export function videoUrl(slot: string): string {
  return manifest.videos?.[slot] ?? "";
}

/**
 * Resolve an image slot to a usable src, falling back to a brand-tinted
 * gradient placeholder when the slot is empty (so nothing renders broken).
 */
export function img(slot: string, keyword: string): string {
  return resolveImage({
    src: assetUrl(slot),
    industry: "cafe",
    keyword,
    brandColor: "#A8927A",
  });
}
