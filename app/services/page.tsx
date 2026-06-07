import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { img } from "@/lib/assets";
import PageHero from "@/components/PageHero";
import MenuGrid from "@/components/menu/MenuGrid";
import FadeUp from "@/components/motion/FadeUp";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Stone-ground coffee, all-day brunch, fresh bakery, cocktails, wine and sharing boards at The Rustic Roast in Pitt Meadows.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="The Menu"
        title="From dawn coffee to dusk cocktails."
        image={img("section-hero", "rustic cafe bar menu spread")}
        intro="Six things we care about, served from open to close on reclaimed oak. Add anything to your order and pick it up at the bronze rail."
      />

      <div className="bg-bg px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl space-y-24">
          {siteConfig.services.map((svc, idx) => (
            <section key={svc.slug} id={svc.slug} className="scroll-mt-28">
              <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                <div className="max-w-2xl">
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 font-display text-3xl text-stone md:text-4xl">
                    {svc.name}
                  </h2>
                  <p className="mt-3 text-stone/70">{svc.description}</p>
                </div>
                <Link
                  href={`/services/${svc.slug}`}
                  className="border-b border-stone/30 pb-1 font-mono text-xs uppercase tracking-[0.18em] text-stone transition-colors hover:border-accent hover:text-accent"
                >
                  Details →
                </Link>
              </div>
              <FadeUp>
                <MenuGrid items={menuFor(svc.slug)} />
              </FadeUp>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

const SLUG_TO_CATEGORIES: Record<string, string[]> = {
  "coffee-espresso": ["Coffee & Espresso"],
  "brunch-all-day": ["Brunch & All-Day"],
  "bakery-pastry": ["Bakery & Pastry"],
  "cocktails-bar": ["Cocktails & Bar"],
  "wine-beer": ["Wine & Beer"],
  "cheese-boards": ["Sharing Boards"],
};

function menuFor(slug: string) {
  const cats = SLUG_TO_CATEGORIES[slug] ?? [];
  const items = siteConfig.menu.filter((m) => cats.includes(m.category));
  return items.length ? items : siteConfig.menu.slice(0, 3);
}
