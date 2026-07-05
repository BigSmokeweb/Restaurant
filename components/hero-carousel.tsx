"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useReservation } from "./reservation-context"

const slides = [
  {
    image: "/assets/grill_hero.png",
    eyebrow: "Experience",
    titleTop: "THE JOY OF",
    titleEm: "Live Grilling",
    text: "Succulent kebabs grilled right at your table with our signature Mumbra spice blends.",
    cta: "Book Now",
    action: "reserve" as const,
  },
  {
    image: "/assets/biryani_hero.png",
    eyebrow: "Grills toh ek bahana hai,",
    titleTop: "MILNE KI",
    titleEm: "Bhookh hai!",
    text: "Unlimited biryani, starters, and desserts — the ultimate celebration buffet.",
    cta: "Explore Menu",
    href: "/menu",
  },
  {
    image: "/assets/breakfast_hero.png",
    eyebrow: "Every morning deserves",
    titleTop: "AUTHENTIC",
    titleEm: "Flavours",
    text: "Traditional breakfast from 6 AM — Masala Chai, Parathas, Misal Pav, and more.",
    cta: "Order Online",
    href: "/delivery",
  },
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const { openReservation } = useReservation()

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section aria-label="Featured highlights" className="mx-auto max-w-7xl px-4 pt-6">
      <div className="relative rounded-2xl overflow-hidden bg-secondary">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="w-full shrink-0 relative min-h-[420px] md:min-h-[480px]">
              <Image
                src={slide.image || "/placeholder.svg"}
                alt=""
                fill
                priority={i === 0}
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
              <div className="relative z-10 flex flex-col justify-center h-full min-h-[420px] md:min-h-[480px] px-8 md:px-14 max-w-xl gap-4 text-white">
                <p className="font-serif italic text-lg md:text-xl opacity-90">{slide.eyebrow}</p>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance">
                  {slide.titleTop}
                  <br />
                  <em className="font-serif text-primary-foreground/95 font-medium">{slide.titleEm}</em>
                </h1>
                <p className="text-sm md:text-base opacity-85 leading-relaxed max-w-md text-pretty">{slide.text}</p>
                {slide.action === "reserve" ? (
                  <button
                    type="button"
                    onClick={openReservation}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full w-fit hover:opacity-90 transition-opacity"
                  >
                    {slide.cta} <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                ) : (
                  <Link
                    href={slide.href!}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full w-fit hover:opacity-90 transition-opacity"
                  >
                    {slide.cta} <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
