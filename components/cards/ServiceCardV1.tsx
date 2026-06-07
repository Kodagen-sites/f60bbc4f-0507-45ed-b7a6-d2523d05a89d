import Link from "next/link";

/**
 * CV1 — Image-Top Classic
 *
 * Default service card. Dark bg, 4:3 image area on top, body text below.
 * Image reveals in color on hover if grayscale by default.
 *
 * Use when:
 *   - Default for most business sites
 *   - Industries: tech, SaaS, healthcare, consulting, B2B
 *   - Personality: premium, clinical, technical, warm
 *
 * Recommended grid: `grid grid-cols-1 md:grid-cols-3 gap-5`
 */

type Service = {
  slug: string;
  name: string;
  description: string;
};

type Props = {
  service: Service;
  index?: number;
  imageSrc?: string;
};

export default function ServiceCardV1({ service, imageSrc }: Props) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02] hover:border-primary/40 transition-all h-full"
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-primary/30 via-white/5 to-accent/30">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={service.name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
          />
        )}
        <div className="absolute bottom-4 left-4">
          <div className="w-9 h-9 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg text-white mb-2">{service.name}</h3>
        <p className="text-white/60 text-sm leading-snug line-clamp-2">
          {service.description}
        </p>
        <div className="mt-3 font-mono text-xs text-primary/80 group-hover:text-primary transition-colors">
          Learn more →
        </div>
      </div>
    </Link>
  );
}
