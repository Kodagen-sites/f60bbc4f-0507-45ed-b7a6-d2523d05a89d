import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/content/site-config";
import { img } from "@/lib/assets";
import { SocialLinks } from "@/components/social-icons";
import PageHero from "@/components/PageHero";
import ReservationForm from "@/components/booking/ReservationForm";
import FadeUp from "@/components/motion/FadeUp";

export const metadata: Metadata = {
  title: "Reserve & Contact",
  description:
    "Reserve a table at The Rustic Roast in Pitt Meadows, BC, or get in touch. Open daily from 7am.",
};

export default function ContactPage() {
  const c = siteConfig.company;
  const mapQuery = encodeURIComponent(c.location);

  return (
    <>
      <PageHero
        eyebrow="Reserve a table"
        title="Come sit a while."
        image={img("service-bar", "warm cafe bar evening")}
        intro="Book a table for brunch or an evening at the bar. We'll confirm by email — usually within the hour during opening times."
      />

      <section className="bg-bg px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_380px]">
          {/* Reservation form */}
          <div>
            <h2 className="font-display text-2xl text-stone md:text-3xl">
              Request a table
            </h2>
            <p className="mt-2 mb-8 text-stone/65">
              Tell us when you&apos;re coming and we&apos;ll keep a warm corner ready.
            </p>
            <FadeUp>
              <ReservationForm />
            </FadeUp>
          </div>

          {/* Details */}
          <aside className="space-y-8">
            <div className="rounded-2xl border border-primary/10 bg-surface p-7">
              <h3 className="font-display text-lg text-stone">Find us</h3>
              <ul className="mt-5 space-y-4 text-sm text-stone/75">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                  <span>{c.location}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                  <a href={`tel:${c.phone}`} className="hover:text-stone">{c.phone}</a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                  <a href={`mailto:${c.email}`} className="hover:text-stone">{c.email}</a>
                </li>
              </ul>
              <div className="mt-6 border-t border-primary/10 pt-5">
                <SocialLinks
                  socials={siteConfig.socials}
                  className="gap-4 text-stone/70"
                  iconClassName="h-5 w-5"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-surface p-7">
              <h3 className="flex items-center gap-2 font-display text-lg text-stone">
                <Clock size={16} className="text-accent" /> Hours
              </h3>
              <ul className="mt-5 space-y-2.5 text-sm">
                {c.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span className="text-stone/60">{h.day}</span>
                    <span className="text-stone">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="mx-auto mt-16 max-w-6xl overflow-hidden rounded-2xl border border-primary/10">
          <iframe
            title="Map to The Rustic Roast"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-[360px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
