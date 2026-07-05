import type { Metadata } from "next"
import { Bike, Clock, BadgePercent } from "lucide-react"
import { MenuBrowser } from "@/components/menu-browser"

export const metadata: Metadata = {
  title: "Order Online | Mumbra Restaurant",
  description:
    "Order delivery or takeaway from Mumbra Restaurant, Thane. Express delivery of biryanis, kebabs, curries and more.",
}

const perks = [
  { icon: Bike, label: "Express Delivery", text: "45 min or less in Mumbra" },
  { icon: Clock, label: "Open Daily", text: "6:00 AM to 11:30 PM" },
  { icon: BadgePercent, label: "Free Delivery", text: "On orders above ₹499" },
]

export default function DeliveryPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="text-center mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
          Delivery &amp; Takeaway
        </p>
        <h1 className="font-serif text-4xl font-bold text-balance">Order Online</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto text-pretty">
          Freshly prepared and delivered hot to your doorstep in Mumbra &amp; Thane.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
        {perks.map((perk) => (
          <div
            key={perk.label}
            className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3.5"
          >
            <perk.icon className="size-6 text-primary shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold">{perk.label}</p>
              <p className="text-xs text-muted-foreground">{perk.text}</p>
            </div>
          </div>
        ))}
      </div>

      <MenuBrowser orderable />
    </main>
  )
}
