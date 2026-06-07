import type { Metadata } from "next";
import Checkout from "@/components/cart/Checkout";

export const metadata: Metadata = {
  title: "Your order",
  description: "Review and place your pickup order from The Rustic Roast.",
};

export default function CheckoutPage() {
  return <Checkout />;
}
