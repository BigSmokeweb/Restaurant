import type { Metadata } from "next"
import Image from "next/image"
import { PartyPopper, Briefcase, Heart, Users } from "lucide-react"
import { CateringForm } from "@/components/catering-form"

export const metadata: Metadata = {
  title: "Catering | Mumbra Restaurant",
  description:
    "Premium catering services by Mumbra Restaurant for weddings, corporate events and family gatherings across Thane.",
}

const services = [
  { icon: Heart, title: "Weddings", text: "Grand feasts with live grill counters for your big day" },
  { icon: Briefcase, title: "Corporate Events", text: "Professional catering for meetings and office parties" },
  { icon: PartyPopper, title: "Celebrations", text: "Birthdays, anniversaries and festive gatherings" },
  { icon: Users, title: "Community Events", text: "Large-scale catering for community functions" },
]

export default function CateringPage() {
  return (
    <main>
      <section className="relative min-h-[320px] flex items-center justify-center">
        <Image
          src="/assets/catering_event.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-4 py-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-3 opacity-90">
            Mumbra Catering
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-balance">
            We Bring the Celebration to You
          </h1>
          <p className="text-sm md:text-base opacity-85 mt-3 max-w-lg mx-auto text-pretty">
            Weddings, corporate events, and family gatherings — catered with our signature live
            grills and unlimited flavours.
          </p>
        </div>
      </section>

      <section aria-label="Catering services" className="mx-auto max-w-7xl px-4 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-card border border-border rounded-xl p-6 flex flex-col gap-3"
            >
              <service.icon className="size-7 text-primary" aria-hidden="true" />
              <h2 className="font-semibold">{service.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-label="Catering enquiry" className="mx-auto max-w-2xl px-4 mt-14">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl font-bold">Send an Enquiry</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Our events team will contact you within 24 hours.
          </p>
        </div>
        <CateringForm />
      </section>
    </main>
  )
}
