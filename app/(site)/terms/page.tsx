import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using The Rustic Roast website and services.",
};

export default function TermsPage() {
  const c = siteConfig.company;
  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-40 md:pt-48">
      <h1 className="font-display text-4xl text-stone md:text-5xl">Terms of Service</h1>
      <p className="mt-4 text-sm text-stone/50">Last updated June 2026</p>

      <div className="mt-10 space-y-8 leading-relaxed text-stone/75">
        <section>
          <h2 className="font-display text-xl text-stone">Reservations & orders</h2>
          <p className="mt-3">
            Reservations are requests until we confirm them by email or phone.
            Online orders are prepared for pickup at the bar. Prices and menu
            items may change with the season and availability.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-stone">Cancellations</h2>
          <p className="mt-3">
            Plans change — let us know as early as you can if you need to cancel a
            table so we can offer it to someone else.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-stone">Responsible service</h2>
          <p className="mt-3">
            We serve alcohol responsibly and in line with BC law. Valid ID is
            required, and we reserve the right to refuse service.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-stone">Contact</h2>
          <p className="mt-3">
            Questions about these terms? Email{" "}
            <a href={`mailto:${c.email}`} className="text-primary underline underline-offset-4">
              {c.email}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
