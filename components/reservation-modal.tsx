"use client"

import { useState, useEffect } from "react"
import { X, Minus, Plus, Sun, Moon, CheckCircle2, AlertCircle } from "lucide-react"
import { useReservation } from "./reservation-context"
import { timeSlots } from "@/lib/data"
import { createReservation } from "@/lib/actions"

export function ReservationModal() {
  const { isOpen, closeReservation } = useReservation()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={closeReservation}
      role="dialog"
      aria-modal="true"
      aria-label="Reserve a table"
    >
      <div
        className="bg-card w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-serif text-xl font-bold">Reserve a Table</h2>
          <button
            type="button"
            onClick={closeReservation}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Close reservation form"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <ReservationForm onDone={closeReservation} />
      </div>
    </div>
  )
}

export function ReservationForm({ onDone }: { onDone?: () => void }) {
  const [mealType, setMealType] = useState<"lunch" | "dinner">("lunch")
  const [timeSlot, setTimeSlot] = useState("")
  const [guestsVeg, setGuestsVeg] = useState(0)
  const [guestsNonVeg, setGuestsNonVeg] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setResult(null)
    const form = e.currentTarget
    const fd = new FormData(form)

    setSubmitting(true)
    const res = await createReservation({
      name: (fd.get("name") as string) || "",
      phone: (fd.get("phone") as string) || "",
      email: (fd.get("email") as string) || "",
      date: (fd.get("date") as string) || "",
      mealType,
      timeSlot,
      guestsVeg,
      guestsNonVeg,
      specialRequest: (fd.get("specialRequest") as string) || "",
    })
    setSubmitting(false)
    setResult(res)

    if (res.success) {
      form.reset()
      setTimeSlot("")
      setGuestsVeg(0)
      setGuestsNonVeg(0)
    }
  }

  const today = new Date().toISOString().split("T")[0]

  return (
    <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
      {result && (
        <div
          role="status"
          className={`flex items-start gap-2.5 text-sm rounded-lg p-3.5 ${
            result.success
              ? "bg-accent/10 text-accent border border-accent/30"
              : "bg-destructive/10 text-destructive border border-destructive/30"
          }`}
        >
          {result.success ? (
            <CheckCircle2 className="size-4.5 shrink-0 mt-0.5 size-5" aria-hidden="true" />
          ) : (
            <AlertCircle className="size-5 shrink-0 mt-0.5" aria-hidden="true" />
          )}
          {result.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="res-name" className="text-sm font-medium">
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            id="res-name"
            name="name"
            required
            placeholder="Your name"
            className="border border-input rounded-lg px-3.5 py-2.5 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="res-phone" className="text-sm font-medium">
            Mobile Number <span className="text-destructive">*</span>
          </label>
          <input
            id="res-phone"
            name="phone"
            required
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            className="border border-input rounded-lg px-3.5 py-2.5 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="res-email" className="text-sm font-medium">
            Email <span className="text-muted-foreground">(optional)</span>
          </label>
          <input
            id="res-email"
            name="email"
            type="email"
            placeholder="you@email.com"
            className="border border-input rounded-lg px-3.5 py-2.5 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="res-date" className="text-sm font-medium">
            Date <span className="text-destructive">*</span>
          </label>
          <input
            id="res-date"
            name="date"
            type="date"
            required
            min={today}
            className="border border-input rounded-lg px-3.5 py-2.5 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-medium mb-2">Meal Preference</legend>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setMealType("lunch")
              setTimeSlot("")
            }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
              mealType === "lunch"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-input hover:bg-muted"
            }`}
            aria-pressed={mealType === "lunch"}
          >
            <Sun className="size-4" aria-hidden="true" /> Lunch
          </button>
          <button
            type="button"
            onClick={() => {
              setMealType("dinner")
              setTimeSlot("")
            }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
              mealType === "dinner"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-input hover:bg-muted"
            }`}
            aria-pressed={mealType === "dinner"}
          >
            <Moon className="size-4" aria-hidden="true" /> Dinner
          </button>
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium mb-2">
          Select Time Slot <span className="text-destructive">*</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {timeSlots[mealType].map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setTimeSlot(slot)}
              className={`px-3.5 py-2 rounded-lg text-sm border transition-colors ${
                timeSlot === slot
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-input hover:bg-muted"
              }`}
              aria-pressed={timeSlot === slot}
            >
              {slot}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-sm font-medium mb-2">Number of Guests</legend>
        <GuestCounter label="Veg" sublabel="Vegetarian guests" value={guestsVeg} onChange={setGuestsVeg} />
        <GuestCounter label="Non-Veg" sublabel="Non-vegetarian guests" value={guestsNonVeg} onChange={setGuestsNonVeg} />
      </fieldset>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="res-request" className="text-sm font-medium">
          Special Request
        </label>
        <textarea
          id="res-request"
          name="specialRequest"
          rows={3}
          placeholder="Any dietary requirements or special occasions?"
          className="border border-input rounded-lg px-3.5 py-2.5 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {submitting ? "Reserving..." : "Confirm Reservation"}
      </button>
    </form>
  )
}

function GuestCounter({
  label,
  sublabel,
  value,
  onChange,
}: {
  label: string
  sublabel: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center justify-between border border-input rounded-lg px-4 py-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{sublabel}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="size-8 rounded-full border border-input flex items-center justify-center hover:bg-muted transition-colors"
          aria-label={`Decrease ${label} guests`}
        >
          <Minus className="size-3.5" aria-hidden="true" />
        </button>
        <span className="w-6 text-center text-sm font-semibold" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(20, value + 1))}
          className="size-8 rounded-full border border-input flex items-center justify-center hover:bg-muted transition-colors"
          aria-label={`Increase ${label} guests`}
        >
          <Plus className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
