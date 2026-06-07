import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";
import { img } from "@/lib/assets";
import PageHero from "@/components/PageHero";
import FadeUp from "@/components/motion/FadeUp";
import TextReveal from "@/components/motion/TextReveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Rustic Roast is a reclaimed-oak cafe and bar in Pitt Meadows, BC — stone-ground coffee by day, warm cocktails by dusk.",
};

const VALUES = [
  {
    title: "Slow by design",
    body: "We steep cold brew for eighteen hours and laminate croissants by hand. Good things keep their own time.",
  },
  {
    title: "Honest sourcing",
    body: "Small-batch beans, BC wine, local cheese. We'd rather pour one good thing than ten forgettable ones.",
  },
  {
    title: "A warm room",
    body: "Reclaimed oak, bronze fixtures and low light. Somewhere a coffee run quietly becomes an evening.",
  },
];

export default function AboutPage() {
  const c = siteConfig.company;
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="A warm room on Airport Way."
        image={img("section-about", "rustic cafe bar interior warm")}
        intro="The Rustic Roast started with one idea: a single room that earns its keep from the first pour-over to the last negroni."
      />

      <section className="bg-bg px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:items-center">
          <FadeUp>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={img("section-founder", "cafe owner barista portrait")}
                alt="The Rustic Roast"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </FadeUp>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
              Why we opened
            </span>
            <TextReveal as="h2" className="mt-4 font-display text-3xl text-stone md:text-4xl">
              Coffee at dawn, the bar at dusk, one table for both.
            </TextReveal>
            <FadeUp delay={0.1}>
              <p className="mt-6 leading-relaxed text-stone/75">
                We grew tired of choosing between a good cafe and a good bar, so
                we built a place that refuses to pick. Mornings open with
                stone-ground espresso and warm bread; as the valley light drops,
                the backlit bar takes over with stirred classics and local wine.
              </p>
              <p className="mt-4 leading-relaxed text-stone/75">
                Everything is made on reclaimed oak in a room built to be lingered
                in — right here at {c.location}.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <TextReveal as="h2" className="mb-12 max-w-2xl font-display text-3xl text-stone md:text-4xl">
            What we hold to.
          </TextReveal>
          <div className="grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-primary/10 bg-bg p-8">
                  <span className="font-display text-4xl text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-stone">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone/70">{v.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
