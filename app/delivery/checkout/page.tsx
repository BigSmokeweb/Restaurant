import type { Metadata } from "next"
import { CheckoutClient } from "@/components/checkout-client"

export const metadata: Metadata = {
  title: "Checkout | Mumbra Restaurant",
  description: "Review your cart and place your delivery order from Mumbra Restaurant.",
}

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-serif text-3xl font-bold mb-8">Checkout</h1>
      <CheckoutClient />
    </main>
  )
}
