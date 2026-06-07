/**
 * ─────────────────────────────────────────────────────────────────────────────
 * VARIATION MANIFEST — The Rustic Roast Cafe and Bar  (locked + rolled)
 * ─────────────────────────────────────────────────────────────────────────────
 * archetype=G                     g_render_mode=scrub-cinematic
 * style=S16-adapted(warm-rustic)  color_variant=stone-bronze
 * typography=Lora+Nunito          asset_mode=live-generate
 * hero_treatment=scrubbed-frames  industry=food_retail
 * cartVariant=C2                  bookingVariant=B3
 * voice_family=V5                 header_variant=transparent-ghost
 * footer_variant=FT4              scene_variant=SC2  loading_variant=L3
 * card_variant=CV6                cta_variant=CTA6   hero_overlay=HO3
 * hero_text=H4                    hero_entrance=E5   motion_variant=M5
 * services_variant=SV4            showcase_variant=PV1  manifesto_variant=MV7
 * value_prop_variant=VV5          stats_variant=ST3  testimonials_variant=TS4
 * about_variant=AB4               contact_variant=CT5  work_variant=WK3
 * hero_composition=HC7            pdp_variant=PDP3   featured_products=FP3
 * narrative_shape=place-portrait  camera_vocabulary=forward-dolly
 * composition_pattern=lower-third lighting=golden-hour/warm-dusk
 * industry_video_tone=hospitality-warm-slow
 * auth_strategy=none              customer_management_enabled=false
 * subscribers_enabled=true        booking_pattern=drawer/modal
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  category: string;
  imageSlot: string;
  imageKeyword: string;
};

export type Service = {
  slug: string;
  name: string;
  description: string;
  imageSlot: string;
  imageKeyword: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  detail: string;
  rating: number;
};

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  slug: "the-rustic-roast",
  currency: "CAD",

  company: {
    name: "The Rustic Roast",
    legalName: "The Rustic Roast Cafe and Bar",
    tagline: "Cafe & bar on the edge of Pitt Meadows",
    description:
      "A reclaimed-oak cafe and bar where slow mornings, stone-ground coffee and warm evenings meet. Brunch by day, cocktails by dusk — all under one warm roof in Pitt Meadows, BC.",
    email: "hello@therusticroast.ca",
    phone: "(604) 555-0172",
    location: "18799 Airport Way #1007, Pitt Meadows, BC V2W 6P3",
    address: {
      street: "18799 Airport Way #1007",
      city: "Pitt Meadows",
      region: "BC",
      postalCode: "V2W 6P3",
      country: "Canada",
    },
    rating: 5.0,
    reviewCount: 218,
    hours: [
      { day: "Mon – Thu", time: "7:00 am – 9:00 pm" },
      { day: "Fri", time: "7:00 am – 11:00 pm" },
      { day: "Sat", time: "8:00 am – 11:00 pm" },
      { day: "Sun", time: "8:00 am – 8:00 pm" },
    ],
  },

  socials: {
    instagram: "https://instagram.com/therusticroast",
    facebook: "https://facebook.com/therusticroast",
  },

  // ── Menu categories (rendered as "services" by shared components) ──────────
  services: [
    {
      slug: "coffee-espresso",
      name: "Coffee & Espresso",
      description:
        "Stone-ground, small-batch beans pulled on a polished brass machine — cappuccinos, flat whites, pour-overs and slow cold brew.",
      imageSlot: "service-coffee",
      imageKeyword: "specialty coffee espresso",
    },
    {
      slug: "brunch-all-day",
      name: "Brunch & All-Day",
      description:
        "Rustic plates from open to close — sourdough toasts, farm eggs, seasonal bowls and fresh fruit on reclaimed oak.",
      imageSlot: "service-brunch",
      imageKeyword: "rustic brunch spread",
    },
    {
      slug: "bakery-pastry",
      name: "Fresh Bakery & Pastry",
      description:
        "Croissants and pastries baked through the morning, dusted with flour and stacked in the window basket.",
      imageSlot: "service-pastry",
      imageKeyword: "fresh baked croissants",
    },
    {
      slug: "cocktails-bar",
      name: "Cocktails & Bar",
      description:
        "As the light drops, the backlit bar glows — stirred classics, amber spirits and warm-dusk cocktails.",
      imageSlot: "service-bar",
      imageKeyword: "warm cocktail bar",
    },
    {
      slug: "wine-beer",
      name: "Wine & Beer",
      description:
        "A short, considered list of BC wine and local craft beer poured by the glass at the bronze-rail bar.",
      imageSlot: "menu-wine",
      imageKeyword: "wine glass bar",
    },
    {
      slug: "cheese-boards",
      name: "Cheese & Sharing Boards",
      description:
        "Slow boards built for the table — local cheese, cured meats, honey and fruit to linger over.",
      imageSlot: "menu-cheeseboard",
      imageKeyword: "artisan cheese board",
    },
  ] as Service[],

  // ── Orderable menu items (cart products) ──────────────────────────────────
  menu: [
    {
      id: "cappuccino",
      name: "Cappuccino",
      description: "Double shot, stone-ground beans, velvet micro-foam.",
      priceCents: 525,
      category: "Coffee & Espresso",
      imageSlot: "menu-espresso",
      imageKeyword: "cappuccino espresso",
    },
    {
      id: "flat-white",
      name: "Flat White",
      description: "Ristretto pulled silky-smooth with steamed whole milk.",
      priceCents: 550,
      category: "Coffee & Espresso",
      imageSlot: "menu-flatwhite",
      imageKeyword: "flat white coffee",
    },
    {
      id: "cold-brew",
      name: "Slow Cold Brew",
      description: "Steeped 18 hours, poured over a single clear cube.",
      priceCents: 575,
      category: "Coffee & Espresso",
      imageSlot: "menu-coldbrew",
      imageKeyword: "cold brew coffee",
    },
    {
      id: "avocado-toast",
      name: "Avocado Sourdough",
      description: "Smashed avocado, chili, lemon, soft farm egg on toasted sourdough.",
      priceCents: 1650,
      category: "Brunch & All-Day",
      imageSlot: "menu-avocado",
      imageKeyword: "avocado sourdough toast",
    },
    {
      id: "butter-croissant",
      name: "Butter Croissant",
      description: "Laminated by hand, baked golden each morning.",
      priceCents: 475,
      category: "Bakery & Pastry",
      imageSlot: "menu-croissant",
      imageKeyword: "butter croissant pastry",
    },
    {
      id: "negroni",
      name: "House Negroni",
      description: "Equal parts gin, bitter amaro and sweet vermouth, stirred down, orange peel.",
      priceCents: 1400,
      category: "Cocktails & Bar",
      imageSlot: "menu-negroni",
      imageKeyword: "negroni cocktail",
    },
    {
      id: "house-red",
      name: "House Red, by the glass",
      description: "A rotating BC red — ask the bar what's open tonight.",
      priceCents: 1200,
      category: "Wine & Beer",
      imageSlot: "menu-wine",
      imageKeyword: "glass of red wine",
    },
    {
      id: "cheese-board",
      name: "Rustic Cheese Board",
      description: "Three local cheeses, cured meat, honeycomb, fruit and warm bread.",
      priceCents: 2400,
      category: "Sharing Boards",
      imageSlot: "menu-cheeseboard",
      imageKeyword: "artisan cheese board",
    },
  ] as MenuItem[],

  testimonials: [
    {
      quote:
        "The best flat white in the valley, full stop. We come for the coffee and end up staying for the cheese board and a negroni at dusk.",
      author: "Marisa L.",
      detail: "Google review",
      rating: 5,
    },
    {
      quote:
        "Walked in for brunch and felt like we'd left the city behind. Warm oak, slow service in the best way, and the croissants are unreal.",
      author: "Devin R.",
      detail: "Google review",
      rating: 5,
    },
    {
      quote:
        "Our go-to for a quiet evening. The bar lights up gold around sunset and the cocktails are properly made. A real Pitt Meadows gem.",
      author: "Priya S.",
      detail: "Google review",
      rating: 5,
    },
  ] as Testimonial[],

  stats: [
    { value: 5.0, suffix: "", label: "Average Google rating" },
    { value: 218, suffix: "+", label: "Five-star reviews" },
    { value: 18, suffix: "hr", label: "Cold brew steep" },
    { value: 7, suffix: "am", label: "Doors open daily" },
  ],

  // ── Rolled variant ids (read by shared pickers) ───────────────────────────
  headerVariant: "transparent-ghost",
  footerVariant: "FT4",
  cartVariant: "C2",
  bookingVariant: "B3",

  scrollHero: {
    archetype: "G",
    styleId: "S16-warm-rustic",
    assetMode: "live-generate",
    imageUrl: "scene-1-start",
    frameCount: 0,
    scrollDistance: 6,
  },
};
