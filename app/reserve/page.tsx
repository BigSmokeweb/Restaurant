import type { Metadata } from "next"
import { ReservationForm } from "@/components/reservation-modal"

export const metadata: Metadata = {
  title: "Reserve a Table | Mumbra Restaurant",
  description:
    "Book your table at Mumbra Restaurant, Thane. Lunch and dinner slots available daily.",
}

export default function ReservePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="text-center mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
          Book your celebration
        </p>
        <h1 className="font-serif text-4xl font-bold text-balance">Reserve a Table</h1>
        <p className="text-sm text-muted-foreground mt-2 text-pretty">
          Lunch and dinner slots available every day. We&apos;ll confirm by phone.
        </p>
      </div>
      <div className="bg-card border border-border rounded-2xl">
        <ReservationForm />
      </div>
    </main>
  )
}
