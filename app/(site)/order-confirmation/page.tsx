import { Suspense } from "react";
import type { Metadata } from "next";
import OrderConfirmation from "@/components/cart/OrderConfirmation";

export const metadata: Metadata = {
  title: "Order confirmed",
};

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-bg">
          <p className="text-stone/50">Loading your order…</p>
        </main>
      }
    >
      <OrderConfirmation />
    </Suspense>
  );
}
