import framesManifest from "@/content/frames-manifest.json";

export type HeroFrames = {
  ready: boolean;
  frameCount: number;
  pattern: string;
};

/**
 * Reads the platform-written frames manifest. When the scrub frames have been
 * extracted + uploaded (frameCount above the threshold), the home hero renders
 * the live ScrollCanvas scrub; otherwise it falls back to a static hero image.
 */
export function getHeroFrames(): HeroFrames {
  const frameCount = (framesManifest as { frameCount?: number }).frameCount ?? 0;
  const pattern = (framesManifest as { frameUrlTemplate?: string }).frameUrlTemplate ?? "";
  return {
    ready: frameCount >= 24 && pattern.length > 0,
    frameCount,
    pattern,
  };
}
