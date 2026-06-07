import Link from "next/link";
import { Star, ArrowUpRight, Coffee, Clock, MapPin } from "lucide-react";
import { siteConfig } from "@/content/site-config";
import { getHeroFrames } from "@/lib/hero-frames";
import { img } from "@/lib/assets";
import HomeHero from "@/components/home/HomeHero";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import FadeUp, { StaggerChildren } from "@/components/motion/FadeUp";
import TextReveal from "@/components/motion/TextReveal";
import NumberCounter from "@/components/motion/NumberCounter";
import MagneticButton from "@/components/motion/MagneticButton";

export default function HomePage() {
  const frames = getHeroFrames();
  const poster = img("scene-1-start", "rustic cafe golden hour interior");
  const c = siteConfig.company;

  return (
    <>
      <HomeHero frames={frames} posterUrl={poster} />

      {/* ── Value prop (VV5) ─────────────────────────────────────── */}
      <section className="bg-bg px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <FadeUp>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
              Est. on Airport Way · Pitt Meadows
            </span>
          </FadeUp>
          <TextReveal
            as="h2"
            className="mt-6 font-display text-3xl leading-[1.15] text-stone md:text-5xl"
          >
            A reclaimed-oak room where the coffee is stone-ground, the bread is
            warm, and nobody is in a hurry.
          </TextReveal>
          <FadeUp delay={0.15}>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-stone/70">
              {c.description}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Menu categories (SV4) ────────────────────────────────── */}
      <section className="bg-surface px-6 py-24 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                The menu
              </span>
              <TextReveal as="h2" className="mt-4 font-display text-4xl text-stone md:text-5xl">
                From dawn coffee to dusk cocktails.
              </TextReveal>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border-b border-stone/30 pb-1 font-display text-sm uppercase tracking-[0.18em] text-stone transition-colors hover:border-accent hover:text-accent"
            >
              See full menu <ArrowUpRight size={16} />
            </Link>
          </div>

          <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {siteConfig.services.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-primary/10 bg-bg shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={img(svc.imageSlot, svc.imageKeyword)}
                    alt={svc.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-stone">{svc.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone/65 line-clamp-3">
                    {svc.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-primary transition-colors group-hover:text-accent">
                    Explore <ArrowUpRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Showcase strip (PV1) ─────────────────────────────────── */}
      <section className="bg-ink px-6 py-24 md:py-28">
        <div className="mx-auto max-w-7xl">
          <FadeUp className="mb-12 max-w-2xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
              Inside the room
            </span>
            <h2 className="mt-4 font-display text-4xl text-cream md:text-5xl">
              Stone, bronze and warm light.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((n, i) => (
              <FadeUp
                key={n}
                delay={i * 0.08}
                className={i % 2 === 0 ? "md:mt-10" : ""}
              >
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={img(`section-showcase-${n}`, "rustic cafe bar warm interior detail")}
                    alt={`The Rustic Roast detail ${n}`}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-[1.05]"
                  />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured menu w/ cart (FP3) ──────────────────────────── */}
      <section className="bg-bg px-6 py-24 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
              Order ahead
            </span>
            <TextReveal as="h2" className="mt-4 font-display text-4xl text-stone md:text-5xl">
              Favourites from the counter.
            </TextReveal>
            <FadeUp delay={0.1}>
              <p className="mx-auto mt-4 max-w-xl text-stone/65">
                Add to your order and pick up at the bronze rail, or settle in
                and we&apos;ll bring it over.
              </p>
            </FadeUp>
          </div>
          <FeaturedMenu />
        </div>
      </section>

      {/* ── Manifesto oversized type (MV7) ───────────────────────── */}
      <section className="bg-primary px-6 py-28 md:py-36">
        <div className="mx-auto max-w-5xl text-center">
          <TextReveal
            as="p"
            className="font-display text-3xl leading-[1.3] text-cream md:text-5xl md:leading-[1.25]"
          >
            We roast slow, pour honest, and keep the lights warm — so a coffee
            run becomes a reason to linger.
          </TextReveal>
          <FadeUp delay={0.15}>
            <span className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.3em] text-cream/60">
              — The Rustic Roast
            </span>
          </FadeUp>
        </div>
      </section>

      {/* ── Stats (ST3) ──────────────────────────────────────────── */}
      <section className="bg-surface px-6 py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4">
          {siteConfig.stats.map((s) => (
            <FadeUp key={s.label} className="text-center">
              <div className="font-display text-4xl text-primary md:text-6xl">
                <NumberCounter
                  to={s.value}
                  decimals={s.value % 1 === 0 ? 0 : 1}
                  suffix={s.suffix}
                />
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-stone/60">
                {s.label}
              </p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Testimonials (TS4) — Google reviews ──────────────────── */}
      <section className="bg-bg px-6 py-24 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="mt-3 font-display text-2xl text-stone">
              {c.rating.toFixed(1)} on Google · {c.reviewCount}+ reviews
            </p>
          </div>
          <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {siteConfig.testimonials.map((t) => (
              <figure
                key={t.author}
                className="flex flex-col rounded-2xl border border-primary/10 bg-surface p-7 shadow-sm"
              >
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 font-display text-lg leading-relaxed text-stone">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-medium text-stone">{t.author}</span>
                  <span className="text-stone/50"> · {t.detail}</span>
                </figcaption>
              </figure>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── CTA (CTA6) ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink px-6 py-28 md:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <FadeUp>
            <Coffee className="mx-auto mb-6 text-accent" size={32} />
          </FadeUp>
          <TextReveal as="h2" className="font-display text-4xl text-cream md:text-6xl">
            Pull up a stool.
          </TextReveal>
          <FadeUp delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-cream/70">
              Reserve a table for brunch or book the bar for the evening. We&apos;ll
              keep a warm corner waiting.
            </p>
          </FadeUp>
          <FadeUp delay={0.2} className="mt-10 flex flex-wrap justify-center gap-4">
            <MagneticButton
              as="a"
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
            >
              Reserve a table
            </MagneticButton>
            <MagneticButton
              as="a"
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:border-cream"
            >
              Browse the menu
            </MagneticButton>
          </FadeUp>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-cream/60">
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} className="text-accent" /> {c.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock size={15} className="text-accent" /> Open daily from 7am
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
