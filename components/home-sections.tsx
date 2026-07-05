"use client"

import Link from "next/link"
import Image from "next/image"
import { CalendarCheck, Gift, UtensilsCrossed, Bike, ArrowRight } from "lucide-react"
import { useReservation } from "./reservation-context"
import { deals, locations } from "@/lib/data"

export function QuickActions() {
  const { openReservation } = useReservation()

  const cards = [
    {
      icon: CalendarCheck,
      title: "Reserve Table",
      text: "Book your celebration",
      action: openReservation,
    },
    { icon: Gift, title: "Deals & Offers", text: "Save on every visit", href: "/deals" },
    { icon: UtensilsCrossed, title: "Catering", text: "Premium event services", href: "/catering" },
    { icon: Bike, title: "Delivery/Takeaway", text: "Express home delivery", href: "/delivery" },
  ]

  return (
    <section aria-label="Quick actions" className="mx-auto max-w-7xl px-4 mt-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) =>
          card.href ? (
            <Link
              key={card.title}
              href={card.href}
              className="group bg-card border border-border rounded-xl p-5 flex flex-col gap-3 hover:border-primary hover:shadow-md transition-all"
            >
              <card.icon className="size-7 text-primary" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-sm">{card.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{card.text}</p>
              </div>
            </Link>
          ) : (
            <button
              key={card.title}
              type="button"
              onClick={card.action}
              className="group bg-card border border-border rounded-xl p-5 flex flex-col gap-3 text-left hover:border-primary hover:shadow-md transition-all"
            >
              <card.icon className="size-7 text-primary" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-sm">{card.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{card.text}</p>
              </div>
            </button>
          ),
        )}
      </div>
    </section>
  )
}

export function DineOutSection() {
  const { openReservation } = useReservation()

  return (
    <section aria-label="Dine out" className="mx-auto max-w-7xl px-4 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden bg-secondary">
        <div className="relative min-h-[280px] md:min-h-[360px]">
          <Image
            src="/assets/dine_interior.png"
            alt="Interior of Mumbra Restaurant dining hall"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 640px"
          />
        </div>
        <div className="flex flex-col justify-center gap-5 p-8 md:p-12 text-secondary-foreground">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-balance">
            Dine Out With Mumbra Restaurant
          </h2>
          <p className="text-sm md:text-base opacity-80 leading-relaxed max-w-md text-pretty">
            Unlimited buffet with 60+ dishes, live grills at your table, and a warm family
            atmosphere. The perfect destination for every celebration.
          </p>
          <button
            type="button"
            onClick={openReservation}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full w-fit hover:opacity-90 transition-opacity"
          >
            Reserve Table <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}

export function CateringSection() {
  return (
    <section aria-label="Catering" className="mx-auto max-w-7xl px-4 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden bg-card border border-border">
        <div className="flex flex-col justify-center gap-5 p-8 md:p-12 order-2 md:order-1">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Mumbra Catering</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-balance">
            Catering By Mumbra Restaurant
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md text-pretty">
            We bring the celebration to you — weddings, corporate events, and family gatherings
            with our signature live grill counters.
          </p>
          <Link
            href="/catering"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full w-fit hover:opacity-90 transition-opacity"
          >
            Send Enquiry <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="relative min-h-[280px] md:min-h-[360px] order-1 md:order-2">
          <Image
            src="/assets/catering_event.png"
            alt="Catering setup at an event"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 640px"
          />
        </div>
      </div>
    </section>
  )
}

export function DealsSection() {
  return (
    <section aria-label="Sizzling deals" className="mx-auto max-w-7xl px-4 mt-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="font-serif text-3xl font-bold">Sizzling Deals</h2>
          <p className="text-sm text-muted-foreground mt-1">Exclusive offers just for you</p>
        </div>
        <Link
          href="/deals"
          className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
        >
          View All <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {deals.map((deal) => (
          <article
            key={deal.id}
            className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-2.5 py-1 rounded-full w-fit">
              {deal.tag}
            </span>
            <h3 className="font-semibold text-lg">{deal.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{deal.description}</p>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-accent font-bold text-sm">{deal.discount}</span>
              <span className="text-sm font-semibold">{deal.price}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function LocationsSection() {
  return (
    <section aria-label="Our restaurants" className="mx-auto max-w-7xl px-4 mt-16">
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl font-bold">Our Restaurants</h2>
        <p className="text-sm text-muted-foreground mt-1">Find us in Mumbra &amp; Thane region</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {locations.map((loc) => (
          <Link
            key={loc.city}
            href="/restaurants"
            className="group rounded-xl overflow-hidden bg-card border border-border hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={loc.image || "/placeholder.svg"}
                alt={`${loc.city} restaurant`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 50vw, 320px"
              />
              {!loc.open && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-xs font-bold uppercase tracking-wider bg-black/50 px-3 py-1.5 rounded-full">
                    Coming Soon
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{loc.city}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{loc.status}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
