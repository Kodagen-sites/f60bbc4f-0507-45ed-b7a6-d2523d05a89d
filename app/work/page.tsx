import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";
import { img } from "@/lib/assets";
import PageHero from "@/components/PageHero";
import FadeUp from "@/components/motion/FadeUp";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Inside The Rustic Roast — coffee, brunch, the bar at dusk, and the warm reclaimed-oak room in Pitt Meadows.",
};

const TILES = [
  { slot: "section-showcase-1", kw: "specialty coffee pour", span: "md:col-span-2 md:row-span-2", ratio: "aspect-square" },
  { slot: "service-coffee", kw: "espresso cappuccino", span: "", ratio: "aspect-[4/3]" },
  { slot: "service-pastry", kw: "fresh croissants basket", span: "", ratio: "aspect-[4/3]" },
  { slot: "service-brunch", kw: "rustic brunch spread", span: "md:col-span-2", ratio: "aspect-[16/9]" },
  { slot: "section-showcase-2", kw: "warm cafe interior", span: "", ratio: "aspect-[4/3]" },
  { slot: "service-bar", kw: "backlit cocktail bar dusk", span: "", ratio: "aspect-[4/3]" },
  { slot: "section-showcase-3", kw: "bronze bar detail", span: "", ratio: "aspect-[4/3]" },
  { slot: "menu-cheeseboard", kw: "artisan cheese board", span: "md:col-span-2", ratio: "aspect-[16/9]" },
  { slot: "section-showcase-4", kw: "reclaimed oak table candle", span: "", ratio: "aspect-[4/3]" },
];

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="The Gallery"
        title="A look inside the room."
        image={img("section-hero", "rustic cafe bar warm interior")}
        intro="Coffee at the counter, bread in the window, and the bar glowing gold as the light drops over Pitt Meadows."
      />

      <section className="bg-bg px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid auto-rows-[minmax(0,1fr)] grid-cols-2 gap-4 md:grid-cols-4">
            {TILES.map((t, i) => (
              <FadeUp key={t.slot + i} delay={(i % 4) * 0.06} className={t.span}>
                <div className="h-full overflow-hidden rounded-xl">
                  <img
                    src={img(t.slot, t.kw)}
                    alt="The Rustic Roast"
                    loading="lazy"
                    className={`${t.ratio} w-full object-cover transition-transform duration-700 hover:scale-[1.04]`}
                  />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
