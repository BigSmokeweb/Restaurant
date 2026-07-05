import Link from "next/link"
import Image from "next/image"
import { Phone, Clock, MapPin } from "lucide-react"
import { restaurantInfo } from "@/lib/data"

const footerLinks = [
  {
    heading: "Explore",
    links: [
      { label: "Menu", href: "/menu" },
      { label: "Deals & Offers", href: "/deals" },
      { label: "Our Restaurants", href: "/restaurants" },
      { label: "Catering", href: "/catering" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Order Online", href: "/delivery" },
      { label: "Reserve a Table", href: "/reserve" },
      { label: "Corporate Enquiry", href: "/catering" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2 flex flex-col gap-4">
          <Image
            src="/assets/logo.png"
            alt="Mumbra Restaurant"
            width={140}
            height={48}
            className="h-12 w-auto brightness-0 invert"
          />
          <p className="text-sm leading-relaxed opacity-80 max-w-md text-pretty">
            Mumbra Restaurant — Your Unlimited Celebration Destination. Serving authentic Indian
            &amp; Indo-Chinese flavours at Railway Station Road, Mumbra, Thane.
          </p>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <span className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              {restaurantInfo.address}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" aria-hidden="true" />
              {restaurantInfo.phone}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="size-4 shrink-0" aria-hidden="true" />
              {restaurantInfo.hours}
            </span>
          </div>
        </div>

        {footerLinks.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">{col.heading}</h3>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs opacity-60">
          <p>© 2026 All Rights Reserved by Mumbra Restaurant</p>
          <p>{restaurantInfo.address}</p>
        </div>
      </div>
    </footer>
  )
}
