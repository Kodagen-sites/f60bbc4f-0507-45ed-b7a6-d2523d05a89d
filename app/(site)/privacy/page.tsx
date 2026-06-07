import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How The Rustic Roast handles your information.",
};

export default function PrivacyPage() {
  const c = siteConfig.company;
  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-40 md:pt-48">
      <h1 className="font-display text-4xl text-stone md:text-5xl">Privacy Policy</h1>
      <p className="mt-4 text-sm text-stone/50">Last updated June 2026</p>

      <div className="mt-10 space-y-8 leading-relaxed text-stone/75">
        <section>
          <h2 className="font-display text-xl text-stone">What we collect</h2>
          <p className="mt-3">
            When you reserve a table, place an order, or send us a message, we
            collect the details you provide — your name, email, phone number and
            any notes. That&apos;s it. We don&apos;t buy or sell personal data.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-stone">How we use it</h2>
          <p className="mt-3">
            We use your information only to confirm reservations, fulfil orders,
            and reply to enquiries. We may keep a record of past visits so we can
            look after you better next time.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-stone">Your choices</h2>
          <p className="mt-3">
            You can ask us to correct or delete your information at any time. Just
            email{" "}
            <a href={`mailto:${c.email}`} className="text-primary underline underline-offset-4">
              {c.email}
            </a>{" "}
            and we&apos;ll take care of it.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-stone">Contact</h2>
          <p className="mt-3">
            {c.legalName}, {c.location}. {c.phone}.
          </p>
        </section>
      </div>
    </article>
  );
}
