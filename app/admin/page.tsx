import type { Metadata } from "next"
import { CalendarCheck, ShoppingBag, MessageSquare, IndianRupee } from "lucide-react"
import { getReservations, getOrders, getEnquiries } from "@/lib/store"
import { AdminTabs } from "@/components/admin-tabs"

export const metadata: Metadata = {
  title: "Admin Dashboard | Mumbra Restaurant",
  description: "Manage reservations, orders and catering enquiries.",
}

export const dynamic = "force-dynamic"

export default function AdminPage() {
  const reservations = getReservations()
  const orders = getOrders()
  const enquiries = getEnquiries()

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

  const stats = [
    { icon: CalendarCheck, label: "Reservations", value: String(reservations.length) },
    { icon: ShoppingBag, label: "Orders", value: String(orders.length) },
    { icon: MessageSquare, label: "Catering Enquiries", value: String(enquiries.length) },
    { icon: IndianRupee, label: "Order Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}` },
  ]

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Reservations, online orders, and catering enquiries.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2"
          >
            <stat.icon className="size-5 text-primary" aria-hidden="true" />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <AdminTabs reservations={reservations} orders={orders} enquiries={enquiries} />

      <p className="text-xs text-muted-foreground mt-8 bg-muted rounded-lg p-4">
        Note: Data is currently stored in memory and resets when the server restarts. Connect a
        database integration (e.g. Neon) to persist reservations, orders and enquiries
        permanently.
      </p>
    </main>
  )
}
