"use client"

import { ArrowRight } from "lucide-react"
import { useReservation } from "./reservation-context"

export function DealsCta() {
  const { openReservation } = useReservation()

  return (
    <div className="mt-12 bg-secondary text-secondary-foreground rounded-2xl p-8 md:p-12 text-center flex flex-col items-center gap-4">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-balance">
        Ready to claim a deal?
      </h2>
      <p className="text-sm opacity-80 max-w-md text-pretty">
        Reserve your table now and mention the deal when our team confirms your booking.
      </p>
      <button
        type="button"
        onClick={openReservation}
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
      >
        Reserve Table <ArrowRight className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}
