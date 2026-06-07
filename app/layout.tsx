import type { Metadata } from "next";
import { Lora, Nunito } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/content/site-config";
import { CartProvider } from "@/components/cart/CartContext";
import { CartFlow } from "@/components/cart/CartFlow";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = "https://therusticroast.ca";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.company.legalName} — ${siteConfig.company.tagline}`,
    template: `%s · ${siteConfig.company.name}`,
  },
  description: siteConfig.company.description,
  keywords: [
    "Pitt Meadows cafe",
    "Pitt Meadows bar",
    "specialty coffee",
    "brunch Pitt Meadows",
    "cocktail bar BC",
    "The Rustic Roast",
  ],
  openGraph: {
    title: `${siteConfig.company.legalName}`,
    description: siteConfig.company.description,
    type: "website",
    locale: "en_CA",
    url: siteUrl,
    siteName: siteConfig.company.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.company.legalName,
    description: siteConfig.company.description,
  },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lora.variable} ${nunito.variable}`}>
      <body className="bg-bg text-stone antialiased">
        <CartProvider
          brandSlug={siteConfig.slug}
          currency={siteConfig.currency}
        >
          <CartFlow />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
