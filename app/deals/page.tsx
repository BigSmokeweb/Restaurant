import type { Metadata } from "next"
import { BadgePercent } from "lucide-react"
import { deals } from "@/lib/data"
import { DealsCta } from "@/components/deals-cta"

export const metadata: Metadata = {
  title: "Deals & Offers | Mumbra Restaurant",
  description:
    "Exclusive deals and offers at Mumbra Restaurant, Thane — couple specials, family packages, birthday celebrations and corporate lunches.",
}

export default function DealsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="text-center mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
          Sizzling Deals
        </p>
        <h1 className="font-serif text-4xl font-bold text-balance">Deals &amp; Offers</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto text-pretty">
          Exclusive offers to make every celebration more delicious — and more affordable.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {deals.map((deal) => (
          <article
            key={deal.id}
            className="bg-card border border-border rounded-xl p-6 flex flex-col gap-3 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
                {deal.tag}
              </span>
              <BadgePercent className="size-5 text-primary" aria-hidden="true" />
            </div>
            <h2 className="font-semibold text-lg">{deal.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {deal.description}
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-accent font-bold">{deal.discount}</span>
              <span className="font-semibold text-sm">{deal.price}</span>
            </div>
          </article>
        ))}
      </div>

      <DealsCta />
    </main>
  )
}
