"use client"

import { useState } from "react"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { createEnquiry } from "@/lib/actions"

const eventTypes = ["Wedding", "Corporate Event", "Birthday", "Anniversary", "Community Event", "Other"]

export function CateringForm() {
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setResult(null)
    const form = e.currentTarget
    const fd = new FormData(form)

    setSubmitting(true)
    const res = await createEnquiry({
      name: (fd.get("name") as string) || "",
      phone: (fd.get("phone") as string) || "",
      email: (fd.get("email") as string) || "",
      eventType: (fd.get("eventType") as string) || "",
      message: (fd.get("message") as string) || "",
    })
    setSubmitting(false)
    setResult(res)
    if (res.success) form.reset()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-4"
    >
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
            <CheckCircle2 className="size-5 shrink-0 mt-0.5" aria-hidden="true" />
          ) : (
            <AlertCircle className="size-5 shrink-0 mt-0.5" aria-hidden="true" />
          )}
          {result.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cat-name" className="text-sm font-medium">
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            id="cat-name"
            name="name"
            required
            placeholder="Your name"
            className="border border-input rounded-lg px-3.5 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cat-phone" className="text-sm font-medium">
            Mobile Number <span className="text-destructive">*</span>
          </label>
          <input
            id="cat-phone"
            name="phone"
            required
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            className="border border-input rounded-lg px-3.5 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cat-email" className="text-sm font-medium">
            Email <span className="text-muted-foreground">(optional)</span>
          </label>
          <input
            id="cat-email"
            name="email"
            type="email"
            placeholder="you@email.com"
            className="border border-input rounded-lg px-3.5 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cat-event" className="text-sm font-medium">
            Event Type
          </label>
          <select
            id="cat-event"
            name="eventType"
            className="border border-input rounded-lg px-3.5 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cat-message" className="text-sm font-medium">
          Tell us about your event
        </label>
        <textarea
          id="cat-message"
          name="message"
          rows={4}
          placeholder="Date, number of guests, venue, cuisine preferences..."
          className="border border-input rounded-lg px-3.5 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {submitting ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  )
}
