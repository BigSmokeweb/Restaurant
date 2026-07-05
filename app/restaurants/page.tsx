import type { Metadata } from "next"
import Image from "next/image"
import { MapPin, Phone, Clock } from "lucide-react"
import { locations, restaurantInfo } from "@/lib/data"

export const metadata: Metadata = {
  title: "Our Restaurants | Mumbra Restaurant",
  description:
    "Find Mumbra Restaurant locations in Mumbra, Thane and the surrounding region. New outlets coming soon.",
}

export default function RestaurantsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="text-center mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Locations</p>
        <h1 className="font-serif text-4xl font-bold text-balance">Our Restaurants</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto text-pretty">
          Find us in Mumbra &amp; the Thane region — with more outlets on the way.
        </p>
      </div>

      {/* Flagship location */}
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden bg-card border border-border mb-10">
        <div className="relative min-h-[260px]">
          <Image
            src="/assets/dine_interior.png"
            alt="Interior of Mumbra Restaurant flagship outlet"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 640px"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 p-8">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent px-2.5 py-1 rounded-full w-fit">
            Now Open
          </span>
          <h2 className="font-serif text-2xl font-bold">Mumbra — Flagship</h2>
          <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-primary shrink-0" aria-hidden="true" />
              {restaurantInfo.address}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="size-4 text-primary shrink-0" aria-hidden="true" />
              {restaurantInfo.phone}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="size-4 text-primary shrink-0" aria-hidden="true" />
              {restaurantInfo.hours}
            </span>
          </div>
        </div>
      </div>

      {/* Upcoming locations */}
      <h2 className="font-serif text-2xl font-bold mb-5">Coming Soon</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {locations
          .filter((loc) => !loc.open)
          .map((loc) => (
            <div
              key={loc.city}
              className="rounded-xl overflow-hidden bg-card border border-border"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={loc.image || "/placeholder.svg"}
                  alt={`${loc.city} upcoming outlet`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-xs font-bold uppercase tracking-wider bg-black/50 px-3 py-1.5 rounded-full">
                    Coming Soon
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{loc.city}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{loc.status}</p>
              </div>
            </div>
          ))}
      </div>
    </main>
  )
}
