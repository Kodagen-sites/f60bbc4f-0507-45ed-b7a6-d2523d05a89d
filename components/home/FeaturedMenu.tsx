"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/content/site-config";
import { img } from "@/lib/assets";
import { AddToCart } from "@/components/cart/AddToCart";

function price(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function FeaturedMenu() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {siteConfig.menu.map((item, i) => {
        const imageUrl = img(item.imageSlot, item.imageKeyword);
        return (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-surface shadow-sm transition-shadow duration-300 hover:shadow-xl"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={imageUrl}
                alt={item.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <span className="absolute left-3 top-3 rounded-full bg-ink/75 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cream">
                {item.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg leading-tight text-stone">
                  {item.name}
                </h3>
                <span className="whitespace-nowrap font-display text-lg text-primary">
                  {price(item.priceCents)}
                </span>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-stone/70">
                {item.description}
              </p>
              <AddToCart
                product={{
                  id: item.id,
                  name: item.name,
                  priceCents: item.priceCents,
                  imageUrl,
                  href: "/services",
                }}
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-stone px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-bark"
              >
                Add to order
              </AddToCart>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
