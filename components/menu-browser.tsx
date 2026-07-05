"use client"

import { useState } from "react"
import Link from "next/link"
import { Leaf, Drumstick, Plus, ShoppingBag } from "lucide-react"
import { menuItems, categories, type MenuItem } from "@/lib/data"
import { useCart } from "./cart-context"

type Filter = "all" | "veg" | "non-veg"

export function MenuBrowser({ orderable = false }: { orderable?: boolean }) {
  const [activeCategory, setActiveCategory] = useState<string>("starters")
  const [filter, setFilter] = useState<Filter>("all")
  const { addItem, totalItems } = useCart()

  const filtered = menuItems.filter((item) => {
    if (item.category !== activeCategory) return false
    if (filter === "veg") return item.veg
    if (filter === "non-veg") return !item.veg
    return true
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-2 flex-wrap justify-center" role="tablist" aria-label="Menu categories">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-input hover:bg-muted"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2" role="group" aria-label="Dietary filter">
          {(
            [
              { key: "all", label: "All" },
              { key: "veg", label: "Veg" },
              { key: "non-veg", label: "Non-Veg" },
            ] as const
          ).map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                filter === f.key
                  ? "bg-secondary text-secondary-foreground border-secondary"
                  : "bg-card border-input hover:bg-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <MenuCard key={item.id} item={item} orderable={orderable} onAdd={() => addItem(item)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground text-sm py-10">
          No items match this filter.
        </p>
      )}

      {orderable && totalItems > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30">
          <Link
            href="/delivery/checkout"
            className="flex items-center gap-2.5 bg-secondary text-secondary-foreground font-semibold px-6 py-3.5 rounded-full shadow-lg hover:opacity-90 transition-opacity"
          >
            <ShoppingBag className="size-4.5 size-5" aria-hidden="true" />
            View Cart ({totalItems}) — Checkout
          </Link>
        </div>
      )}
    </div>
  )
}

function MenuCard({
  item,
  orderable,
  onAdd,
}: {
  item: MenuItem
  orderable: boolean
  onAdd: () => void
}) {
  return (
    <article className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2.5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold">{item.name}</h3>
        {item.veg ? (
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-accent bg-accent/10 px-2 py-1 rounded-full shrink-0">
            <Leaf className="size-3" aria-hidden="true" /> Veg
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-destructive bg-destructive/10 px-2 py-1 rounded-full shrink-0">
            <Drumstick className="size-3" aria-hidden="true" /> Non-Veg
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.description}</p>
      <div className="flex items-center justify-between pt-2">
        <span className="font-bold text-lg">₹{item.price}</span>
        {orderable && (
          <button
            type="button"
            onClick={onAdd}
            className="flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            aria-label={`Add ${item.name} to cart`}
          >
            <Plus className="size-4" aria-hidden="true" /> Add
          </button>
        )}
      </div>
    </article>
  )
}
