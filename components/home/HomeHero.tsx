"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollCanvas from "@/components/ScrollCanvas";
import { HeroScrollText, type HeroChapter } from "@/components/motion";

// 4 chapters spread across the scrub (last `at` < max progress so it shows).
const chapters: HeroChapter[] = [
  {
    at: 0,
    eyebrow: "Pitt Meadows · Cafe & Bar",
    headlineLines: ["Slow mornings,", "warm evenings."],
    subline:
      "Stone-ground coffee at dawn, cocktails at dusk — all under one reclaimed-oak roof.",
  },
  {
    at: 0.34,
    eyebrow: "By day",
    headlineLines: ["Brunch on", "reclaimed oak."],
    subline:
      "Sourdough, farm eggs and hand-laminated croissants, poured-over and served from seven.",
  },
  {
    at: 0.62,
    eyebrow: "By dusk",
    headlineLines: ["The bar", "glows gold."],
    subline:
      "Stirred classics and BC wine as the light drops over the valley.",
  },
  {
    at: 0.82,
    headlineLines: ["The Rustic", "Roast."],
    cta: { label: "Reserve a table", href: "/contact" },
  },
];

type Frames = { ready: boolean; frameCount: number; pattern: string };

export default function HomeHero({
  frames,
  posterUrl,
}: {
  frames: Frames;
  posterUrl: string;
}) {
  const [progress, setProgress] = useState(0);

  // Primary path — live scroll-scrubbed cinematic frames.
  if (frames.ready) {
    return (
      <ScrollCanvas
        frameCount={frames.frameCount}
        pattern={frames.pattern}
        scrollDistance={6}
        loadingVariant="L3"
        loadingLabel="The Rustic Roast"
        onProgress={setProgress}
      >
        <HeroScrollText
          progress={progress}
          chapters={chapters}
          position="bottom-left"
          textColor="#F5F0E8"
          accentColor="#D8B98C"
          accentTextColor="#241C14"
        />
      </ScrollCanvas>
    );
  }

  // Fallback — frames not extracted yet. Static cinematic poster + overlay.
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-ink">
      <img
        src={posterUrl}
        alt="The Rustic Roast cafe and bar at golden hour"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(6,8,14,0.72) 0%, rgba(6,8,14,0.28) 40%, transparent 72%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 px-6 pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-7xl">
          <span
            className="block text-[11px] uppercase tracking-[0.25em]"
            style={{ color: "#D8B98C" }}
          >
            {chapters[0].eyebrow}
          </span>
          <h1
            className="mt-6 font-display text-cream"
            style={{ textShadow: "0 2px 28px rgba(0,0,0,0.55)" }}
          >
            {chapters[0].headlineLines.map((line, i) => (
              <span
                key={i}
                className="block leading-[0.95] tracking-[-0.025em]"
                style={{
                  fontSize: "clamp(2.75rem, 8vw, 6.5rem)",
                  fontWeight: i === 0 ? 400 : 300,
                  fontStyle: i === 1 ? "italic" : "normal",
                }}
              >
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-cream/80 md:text-xl">
            {chapters[0].subline}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
            >
              Reserve a table
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-7 py-3 text-sm font-medium text-cream transition-colors hover:border-cream"
            >
              See the menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
