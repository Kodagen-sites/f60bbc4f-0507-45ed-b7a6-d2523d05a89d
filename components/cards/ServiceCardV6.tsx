"use client";

import Link from "next/link";

/**
 * CV6 — Brutalist
 *
 * Hard edges, thick borders, hard-offset shadow (no blur), system-ish
 * monospace typography. The shadow snaps closer on hover — the card
 * "pushes" toward the cursor with no easing softness.
 *
 * Use when:
 *   - Architecture firms, indie studios, experimental brands, niche SaaS
 *     that wants personality
 *   - Styles: S5 (industrial) works perfectly, S2 (luxury brutalism)
 *     works for premium
 *   - Personality: industrial / serious with a twist, editorial with guts
 *
 * Recommended grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
 * (brutalism wants AIR around each card, not tight gaps)
 *
 * Do NOT use on light pastel styles (S3, S10) — brutalism needs weight.
 */

type Service = {
  slug: string;
  name: string;
  description: string;
};

type Props = {
  service: Service;
  index: number;
  imageSrc?: string;
};

export default function ServiceCardV6({ service, index, imageSrc }: Props) {
  const num = String((index ?? 0) + 1).padStart(2, "0");

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative block h-full bg-white transition-transform duration-150 ease-out hover:-translate-x-1 hover:-translate-y-1"
      style={{
        color: "#111",
        border: "3px solid #111",
        boxShadow: "8px 8px 0 0 #111",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "4px 4px 0 0 #111")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "8px 8px 0 0 #111")}
    >
      {imageSrc && (
        <div
          className="relative aspect-[4/3] overflow-hidden"
          style={{ borderBottom: "3px solid #111" }}
        >
          <img
            src={imageSrc}
            alt={service.name}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "contrast(1.05) saturate(0.95)" }}
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
          />
        </div>
      )}

      <div className="p-6 md:p-7">
        <div className="flex items-baseline justify-between mb-5">
          <div className="font-mono text-xs tracking-[0.2em] uppercase">Service / {num}</div>
          <div className="font-mono text-xs">→</div>
        </div>

        <h3 className="font-mono text-xl md:text-2xl font-bold uppercase tracking-tight leading-[1.05] mb-4">
          {service.name}
        </h3>

        <p className="font-mono text-sm leading-relaxed">{service.description}</p>

        <div
          className="mt-6 pt-4 font-mono text-xs tracking-[0.2em] uppercase font-bold"
          style={{ borderTop: "2px solid #111" }}
        >
          Read brief
        </div>
      </div>
    </Link>
  );
}
