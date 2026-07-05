"use client"

import { useState, useTransition } from "react"
import { Leaf, Drumstick, Phone, Mail, MapPin } from "lucide-react"
import type { Reservation, Order, Enquiry } from "@/lib/store"
import { setOrderStatus } from "@/lib/actions"

type Tab = "reservations" | "orders" | "enquiries"

const statusOptions: { value: Order["status"]; label: string }[] = [
  { value: "received", label: "Received" },
  { value: "preparing", label: "Preparing" },
  { value: "out-for-delivery", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" },
]

const statusStyles: Record<Order["status"], string> = {
  received: "bg-muted text-muted-foreground",
  preparing: "bg-primary/10 text-primary",
  "out-for-delivery": "bg-secondary text-secondary-foreground",
  delivered: "bg-accent/10 text-accent",
}

export function AdminTabs({
  reservations,
  orders,
  enquiries,
}: {
  reservations: Reservation[]
  orders: Order[]
  enquiries: Enquiry[]
}) {
  const [tab, setTab] = useState<Tab>("reservations")

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "reservations", label: "Reservations", count: reservations.length },
    { key: "orders", label: "Orders", count: orders.length },
    { key: "enquiries", label: "Enquiries", count: enquiries.length },
  ]

  return (
    <div>
      <div className="flex gap-2 mb-6 flex-wrap" role="tablist" aria-label="Admin sections">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-colors ${
              tab === t.key
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-input hover:bg-muted"
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {tab === "reservations" && <ReservationsList reservations={reservations} />}
      {tab === "orders" && <OrdersList orders={orders} />}
      {tab === "enquiries" && <EnquiriesList enquiries={enquiries} />}
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="bg-card border border-dashed border-border rounded-xl p-12 text-center text-sm text-muted-foreground">
      {message}
    </div>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function ReservationsList({ reservations }: { reservations: Reservation[] }) {
  if (reservations.length === 0)
    return <EmptyState message="No reservations yet. They will appear here as guests book tables." />

  return (
    <div className="flex flex-col gap-3">
      {reservations.map((r) => (
        <article key={r.id} className="bg-card border border-border rounded-xl p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold">
                {r.name}{" "}
                <span className="text-xs font-normal text-muted-foreground">#{r.id}</span>
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Phone className="size-3.5" aria-hidden="true" /> {r.phone}
                </span>
                {r.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="size-3.5" aria-hidden="true" /> {r.email}
                  </span>
                )}
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{formatDate(r.createdAt)}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs font-medium bg-muted px-2.5 py-1 rounded-full">
              {r.date} — {r.mealType} at {r.timeSlot}
            </span>
            {r.guestsVeg > 0 && (
              <span className="flex items-center gap-1 text-xs font-medium bg-accent/10 text-accent px-2.5 py-1 rounded-full">
                <Leaf className="size-3" aria-hidden="true" /> {r.guestsVeg} Veg
              </span>
            )}
            {r.guestsNonVeg > 0 && (
              <span className="flex items-center gap-1 text-xs font-medium bg-destructive/10 text-destructive px-2.5 py-1 rounded-full">
                <Drumstick className="size-3" aria-hidden="true" /> {r.guestsNonVeg} Non-Veg
              </span>
            )}
          </div>
          {r.specialRequest && (
            <p className="text-sm text-muted-foreground mt-3 border-t border-border pt-3">
              {r.specialRequest}
            </p>
          )}
        </article>
      ))}
    </div>
  )
}

function OrdersList({ orders }: { orders: Order[] }) {
  const [isPending, startTransition] = useTransition()

  if (orders.length === 0)
    return <EmptyState message="No orders yet. Online orders will appear here." />

  return (
    <div className="flex flex-col gap-3">
      {orders.map((order) => (
        <article key={order.id} className="bg-card border border-border rounded-xl p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold">
                Order #{order.id} — {order.customerName}
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Phone className="size-3.5" aria-hidden="true" /> {order.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5" aria-hidden="true" /> {order.address}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyles[order.status]}`}
              >
                {order.status.replace(/-/g, " ")}
              </span>
              <span className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</span>
            </div>
          </div>

          <ul className="mt-4 flex flex-col gap-1.5 text-sm border-t border-border pt-3">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.quantity} × {item.name}
                </span>
                <span className="font-medium">₹{item.price * item.quantity}</span>
              </li>
            ))}
            <li className="flex justify-between font-bold border-t border-border pt-2 mt-1">
              <span>Total</span>
              <span>₹{order.total}</span>
            </li>
          </ul>

          {order.instructions && (
            <p className="text-sm text-muted-foreground mt-3">Note: {order.instructions}</p>
          )}

          <div className="flex items-center gap-2 mt-4 border-t border-border pt-4">
            <label htmlFor={`status-${order.id}`} className="text-xs font-medium text-muted-foreground">
              Update status:
            </label>
            <select
              id={`status-${order.id}`}
              value={order.status}
              disabled={isPending}
              onChange={(e) =>
                startTransition(() => {
                  setOrderStatus(order.id, e.target.value as Order["status"])
                })
              }
              className="border border-input rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </article>
      ))}
    </div>
  )
}

function EnquiriesList({ enquiries }: { enquiries: Enquiry[] }) {
  if (enquiries.length === 0)
    return <EmptyState message="No catering enquiries yet. They will appear here." />

  return (
    <div className="flex flex-col gap-3">
      {enquiries.map((e) => (
        <article key={e.id} className="bg-card border border-border rounded-xl p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold">
                {e.name}{" "}
                <span className="text-xs font-normal text-muted-foreground">#{e.id}</span>
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Phone className="size-3.5" aria-hidden="true" /> {e.phone}
                </span>
                {e.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="size-3.5" aria-hidden="true" /> {e.email}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {e.eventType && (
                <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                  {e.eventType}
                </span>
              )}
              <span className="text-xs text-muted-foreground">{formatDate(e.createdAt)}</span>
            </div>
          </div>
          {e.message && (
            <p className="text-sm text-muted-foreground mt-3 border-t border-border pt-3 leading-relaxed">
              {e.message}
            </p>
          )}
        </article>
      ))}
    </div>
  )
}
