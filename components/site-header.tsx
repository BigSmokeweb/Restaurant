"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { ShoppingBag, MapPin, Menu, X, Bike } from "lucide-react"
import { useCart } from "./cart-context"

const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/deals", label: "Deals" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/catering", label: "Catering", badge: "New" },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems } = useCart()
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border">
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-16 gap-4">
        <Link href="/" className="flex items-center shrink-0" aria-label="Mumbra Restaurant home">
          <Image src="/assets/logo.png" alt="Mumbra Restaurant" width={120} height={40} className="h-10 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5 ${
                pathname === link.href ? "text-primary" : "text-foreground"
              }`}
            >
              {link.label}
              {link.badge && (
                <span className="text-[10px] font-bold uppercase bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4 text-primary" aria-hidden="true" />
            <span>Mumbra, Thane</span>
          </div>
          <Link
            href="/delivery"
            className="hidden sm:inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            <Bike className="size-4" aria-hidden="true" />
            Order Online
          </Link>
          <Link
            href="/delivery"
            className="relative p-2 rounded-full hover:bg-muted transition-colors"
            aria-label={`Cart with ${totalItems} items`}
          >
            <ShoppingBag className="size-5" aria-hidden="true" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold size-4.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="lg:hidden p-2 rounded-full hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-t border-border bg-card px-4 py-3 flex flex-col gap-1" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-colors hover:bg-muted flex items-center gap-2 ${
                pathname === link.href ? "text-primary bg-muted" : "text-foreground"
              }`}
            >
              {link.label}
              {link.badge && (
                <span className="text-[10px] font-bold uppercase bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
          <Link
            href="/delivery"
            onClick={() => setMobileOpen(false)}
            className="py-2.5 px-3 rounded-lg text-sm font-medium text-primary hover:bg-muted flex items-center gap-2"
          >
            <Bike className="size-4" aria-hidden="true" />
            Order Online
          </Link>
        </nav>
      )}
    </header>
  )
}
