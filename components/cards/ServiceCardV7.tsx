import Link from "next/link";

/**
 * CV7 — Bento
 *
 * Card that adapts to a size prop (feature / wide / tall / small).
 * Used INSIDE a bento grid where the first card is "feature" (2x2),
 * a second card is "wide" (2x1), a third is "tall" (1x2), and the rest
 * are "small" (1x1). The container handles the grid-span classes; the
 * card adapts its internal layout and type scale to its size.
 *
 * Use when:
 *   - Modern tech/SaaS sites, AI products
 *   - Any style; works best with S1, S8, S11
 *   - Brand can carry asymmetry (premium tech, editorial-adjacent)
 *
 * Recommended container:
 *   <div className="grid grid-cols-4 grid-rows-4 gap-4 auto-rows-fr">
 *     {services.map((svc, i) => {
 *       const size = BENTO_LAYOUT[i] ?? "small";
 *       return <ServiceCardV7 key={svc.slug} service={svc} index={i} size={size} />;
 *     })}
 *   </div>
 *
 * Where BENTO_LAYOUT is something like:
 *   ["feature", "wide", "tall", "small", "small", "wide"]
 *
 * The card's `size` prop applies BOTH the grid-span classes AND its
 * internal layout. The caller doesn't need to add span classes.
 */

type Service = {
  slug: string;
  name: string;
  description: string;
};

type Size = "feature" | "wide" | "tall" | "small";

type Props = {
  service: Service;
  index?: number;
  size?: Size;
  imageSrc?: string;
};

const SIZE_CLASSES: Record<Size, string> = {
  feature: "col-span-2 row-span-2",
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  small: "col-span-1 row-span-1",
};

export default function ServiceCardV7({
  service,
  size = "small",
  imageSrc,
}: Props) {
  const isFeature = size === "feature";
  const isWide = size === "wide";
  const isTall = size === "tall";

  return (
    <Link
      href={`/services/${service.slug}`}
      className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-primary/40 hover:bg-white/[0.05] transition-all ${SIZE_CLASSES[size]}`}
    >
      {/* Background image area — sized per variant */}
      {imageSrc && (
        <div
          className={`absolute inset-0 bg-gradient-to-br from-primary/20 via-white/5 to-accent/20 ${
            isFeature || isWide || isTall ? "opacity-90" : "opacity-60"
          }`}
        >
          <img
            src={imageSrc}
            alt={service.name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-70 transition-opacity duration-500"
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
          />
        </div>
      )}

      {/* Dark bottom fade for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bg via-bg/60 to-transparent pointer-events-none" />

      {/* Content — layout varies by size */}
      <div
        className={`relative h-full flex flex-col justify-end ${
          isFeature ? "p-8" : "p-5"
        }`}
      >
        <div className="font-mono text-[10px] tracking-[0.3em] text-primary/80 uppercase mb-2">
          Service
        </div>
        <h3
          className={`font-display text-white font-light leading-tight ${
            isFeature
              ? "text-3xl md:text-4xl mb-4"
              : isWide
              ? "text-2xl mb-3"
              : "text-lg mb-2"
          }`}
        >
          {service.name}
        </h3>
        {(isFeature || isWide) && (
          <p className="text-white/70 text-sm leading-relaxed line-clamp-3 max-w-md">
            {service.description}
          </p>
        )}
        <div
          className={`font-mono text-xs text-primary/70 group-hover:text-primary transition-colors ${
            isFeature || isWide ? "mt-4" : "mt-3"
          }`}
        >
          Learn →
        </div>
      </div>
    </Link>
  );
}

/**
 * Recommended bento layout for 6 services. Caller can override.
 * First card is the "hero" feature, subsequent sizes create visual rhythm.
 */
export const BENTO_LAYOUT: Size[] = [
  "feature",
  "wide",
  "tall",
  "small",
  "small",
  "wide",
];
