import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/content/site-config";
import { img } from "@/lib/assets";
import PageHero from "@/components/PageHero";
import MenuGrid from "@/components/menu/MenuGrid";
import FadeUp from "@/components/motion/FadeUp";

const SLUG_TO_CATEGORIES: Record<string, string[]> = {
  "coffee-espresso": ["Coffee & Espresso"],
  "brunch-all-day": ["Brunch & All-Day"],
  "bakery-pastry": ["Bakery & Pastry"],
  "cocktails-bar": ["Cocktails & Bar"],
  "wine-beer": ["Wine & Beer"],
  "cheese-boards": ["Sharing Boards"],
};

export function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = siteConfig.services.find((s) => s.slug === slug);
  if (!svc) return { title: "Menu" };
  return { title: svc.name, description: svc.description };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const svc = siteConfig.services.find((s) => s.slug === slug);
  if (!svc) notFound();

  const cats = SLUG_TO_CATEGORIES[slug] ?? [];
  const items = siteConfig.menu.filter((m) => cats.includes(m.category));
  const others = siteConfig.services.filter((s) => s.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow="On the menu"
        title={svc.name}
        image={img(svc.imageSlot, svc.imageKeyword)}
        intro={svc.description}
      />

      <div className="bg-bg px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/services"
            className="mb-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-stone/60 transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} /> All of the menu
          </Link>

          {items.length > 0 ? (
            <FadeUp>
              <MenuGrid items={items} />
            </FadeUp>
          ) : (
            <p className="text-stone/60">
              Ask at the bar — this list changes with the season.
            </p>
          )}

          <div className="mt-24 border-t border-primary/10 pt-12">
            <h2 className="mb-8 font-display text-2xl text-stone">
              Also worth a look
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/services/${o.slug}`}
                  className="group block overflow-hidden rounded-xl border border-primary/10 bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={img(o.imageSlot, o.imageKeyword)}
                      alt={o.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="block p-3 text-center font-display text-sm text-stone">
                    {o.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
