import type { Metadata } from "next"
import { MenuBrowser } from "@/components/menu-browser"

export const metadata: Metadata = {
  title: "Menu | Mumbra Restaurant",
  description:
    "Explore our menu of live-grilled starters, biryanis, curries, desserts and drinks at Mumbra Restaurant, Thane.",
}

export default function MenuPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="text-center mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
          {"What's on the menu"}
        </p>
        <h1 className="font-serif text-4xl font-bold text-balance">Our Menu</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto text-pretty">
          Authentic Indian &amp; Indo-Chinese flavours, from live-grilled kebabs to slow-cooked
          dum biryani.
        </p>
      </div>
      <MenuBrowser />
    </main>
  )
}
