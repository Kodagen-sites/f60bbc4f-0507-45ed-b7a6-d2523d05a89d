"use client";

import Link from "next/link";

/**
 * CV5 — Retro / CRT
 *
 * Scan lines, chromatic aberration on hover, monospaced type, tinted
 * phosphor palette. The card reads like a terminal window or CRT monitor.
 * Unapologetically niche — pick only when the brand can carry it.
 *
 * Use when:
 *   - Dev tools, cyber/hacker brands, retro gaming, arcade, vaporwave
 *   - Styles: S1 (cyan/magenta), S8 (purple) — both work; S2 if warm amber phosphor
 *   - Personality: technical + playful, or creative-with-teeth
 *
 * Recommended grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`
 *
 * Accent color is passed through via CSS var `--color-primary`.
 */

type Service = {
  slug: string;
  name: string;
  description: string;
};

type Props = {
  service: Service;
  index?: number;
  imageSrc?: string;          // optional — shows as tinted image if present
};

export default function ServiceCardV5({ service, index, imageSrc }: Props) {
  const num = String((index ?? 0) + 1).padStart(3, "0");

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative block h-full overflow-hidden transition-all"
      style={{
        background: "#0a0a0f",
        border: "1px solid rgba(34,211,238,0.35)",
        boxShadow: "0 0 0 1px rgba(34,211,238,0.08), inset 0 0 40px rgba(34,211,238,0.06)",
      }}
    >
      {/* Scan lines overlay — always on */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          background:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 3px)",
        }}
      />

      {/* Chromatic aberration text — appears on hover */}
      <div className="relative p-5">
        {imageSrc && (
          <div
            className="relative aspect-[4/3] mb-4 overflow-hidden border border-primary/30"
            style={{ filter: "saturate(0.8) contrast(1.1)" }}
          >
            <img
              src={imageSrc}
              alt={service.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "hue-rotate(-10deg) brightness(0.85)" }}
              onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg/40" />
          </div>
        )}

        <div className="font-mono text-[10px] tracking-[0.25em] text-primary mb-2">
          [NODE_{num}]
        </div>

        {/* Name — gets chromatic aberration on hover via dual-layer text-shadow */}
        <h3
          className="font-mono text-base md:text-lg font-bold text-white mb-3 uppercase tracking-wide leading-tight transition-[text-shadow] duration-200"
          style={{
            textShadow:
              "0 0 0 transparent, 0 0 0 transparent",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.textShadow =
              "-1.5px 0 0 rgba(34,211,238,0.9), 1.5px 0 0 rgba(236,72,153,0.9)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.textShadow = "0 0 0 transparent")}
        >
          {service.name}
        </h3>

        <p className="font-mono text-xs text-white/60 leading-relaxed line-clamp-3 mb-4">
          &gt; {service.description}
        </p>

        <div className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase group-hover:text-white transition-colors">
          execute_
          <span className="inline-block w-[0.5em] h-[1em] bg-primary ml-1 align-[-0.1em] animate-pulse" />
        </div>
      </div>

      {/* Corner bracket detail — signals "window chrome" */}
      <div
        aria-hidden
        className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/70 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/70 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/70 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/70 pointer-events-none"
      />
    </Link>
  );
}
