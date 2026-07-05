"use client"

import { useState } from "react"
import Link from "next/link"
import { Minus, Plus, Trash2, CheckCircle2, AlertCircle, ShoppingBag, ArrowRight } from "lucide-react"
import { useCart } from "./cart-context"
import { createOrder } from "@/lib/actions"
import { menuItems } from "@/lib/data"

const DELIVERY_FEE = 40
const FREE_DELIVERY_THRESHOLD = 499

export function CheckoutClient() {
  const { items, addItem, decrementItem, removeItem, clearCart, totalPrice } = useCart()
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; id?: number } | null>(null)

  const deliveryFee = totalPrice >= FREE_DELIVERY_THRESHOLD || totalPrice === 0 ? 0 : DELIVERY_FEE
  const grandTotal = totalPrice + deliveryFee

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setResult(null)
    const fd = new FormData(e.currentTarget)

    setSubmitting(true)
    const res = await createOrder({
      customerName: (fd.get("name") as string) || "",
      phone: (fd.get("phone") as string) || "",
      address: (fd.get("address") as string) || "",
      instructions: (fd.get("instructions") as string) || "",
      items,
      total: grandTotal,
    })
    setSubmitting(false)
    setResult(res)
    if (res.success) clearCart()
  }

  if (result?.success) {
    return (
      <div className="max-w-md mx-auto text-center bg-card border border-border rounded-2xl p-10 flex flex-col items-center gap-4">
        <CheckCircle2 className="size-14 text-accent" aria-hidden="true" />
        <h2 className="font-serif text-2xl font-bold">Order Placed!</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {result.message} Your order number is{" "}
          <span className="font-bold text-foreground">#{result.id}</span>. We&apos;ll call you to
          confirm shortly.
        </p>
        <Link
          href="/delivery"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity mt-2"
        >
          Order More <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center bg-card border border-border rounded-2xl p-10 flex flex-col items-center gap-4">
        <ShoppingBag className="size-12 text-muted-foreground" aria-hidden="true" />
        <h2 className="font-serif text-2xl font-bold">Your cart is empty</h2>
        <p className="text-sm text-muted-foreground">
          Browse our menu and add some delicious dishes.
        </p>
        <Link
          href="/delivery"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity mt-2"
        >
          Browse Menu <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Cart items */}
      <section aria-label="Cart items" className="lg:col-span-3 flex flex-col gap-3">
        {items.map((item) => {
          const menuItem = menuItems.find((m) => m.id === item.id)
          return (
            <div
              key={item.id}
              className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">₹{item.price} each</p>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => decrementItem(item.id)}
                  className="size-8 rounded-full border border-input flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  <Minus className="size-3.5" aria-hidden="true" />
                </button>
                <span className="w-5 text-center text-sm font-semibold">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => menuItem && addItem(menuItem)}
                  className="size-8 rounded-full border border-input flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  <Plus className="size-3.5" aria-hidden="true" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-sm w-16 text-right">
                  ₹{item.price * item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="p-2 rounded-full text-destructive hover:bg-destructive/10 transition-colors"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )
        })}
      </section>

      {/* Order form + summary */}
      <div className="lg:col-span-2">
        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4 sticky top-20"
        >
          <h2 className="font-semibold text-lg">Delivery Details</h2>

          {result && !result.success && (
            <div
              role="alert"
              className="flex items-start gap-2.5 text-sm rounded-lg p-3.5 bg-destructive/10 text-destructive border border-destructive/30"
            >
              <AlertCircle className="size-5 shrink-0 mt-0.5" aria-hidden="true" />
              {result.message}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="co-name" className="text-sm font-medium">
              Full Name <span className="text-destructive">*</span>
            </label>
            <input
              id="co-name"
              name="name"
              required
              placeholder="Your name"
              className="border border-input rounded-lg px-3.5 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="co-phone" className="text-sm font-medium">
              Mobile Number <span className="text-destructive">*</span>
            </label>
            <input
              id="co-phone"
              name="phone"
              required
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              className="border border-input rounded-lg px-3.5 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="co-address" className="text-sm font-medium">
              Delivery Address <span className="text-destructive">*</span>
            </label>
            <textarea
              id="co-address"
              name="address"
              required
              rows={2}
              placeholder="Flat, building, street, landmark"
              className="border border-input rounded-lg px-3.5 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="co-instructions" className="text-sm font-medium">
              Instructions <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              id="co-instructions"
              name="instructions"
              placeholder="e.g. Ring the bell twice"
              className="border border-input rounded-lg px-3.5 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <dl className="flex flex-col gap-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium">₹{totalPrice}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery Fee</dt>
              <dd className={`font-medium ${deliveryFee === 0 ? "text-accent" : ""}`}>
                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
              </dd>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-bold">₹{grandTotal}</dd>
            </div>
          </dl>

          <button
            type="submit"
            disabled={submitting}
            className="bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? "Placing Order..." : `Place Order — ₹${grandTotal}`}
          </button>
          <p className="text-xs text-muted-foreground text-center">Cash on delivery available</p>
        </form>
      </div>
    </div>
  )
}
