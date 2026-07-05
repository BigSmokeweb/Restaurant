// In-memory data store.
// NOTE: This is intentionally structured behind functions so it can be
// swapped for a real database (e.g. Neon Postgres) later without touching UI code.

export type Reservation = {
  id: number
  name: string
  phone: string
  email: string
  date: string
  mealType: "lunch" | "dinner"
  timeSlot: string
  guestsVeg: number
  guestsNonVeg: number
  specialRequest: string
  createdAt: string
}

export type OrderItem = {
  id: string
  name: string
  price: number
  quantity: number
}

export type Order = {
  id: number
  customerName: string
  phone: string
  address: string
  instructions: string
  items: OrderItem[]
  total: number
  status: "received" | "preparing" | "out-for-delivery" | "delivered"
  createdAt: string
}

export type Enquiry = {
  id: number
  name: string
  phone: string
  email: string
  eventType: string
  message: string
  createdAt: string
}

type Store = {
  reservations: Reservation[]
  orders: Order[]
  enquiries: Enquiry[]
  nextId: { reservation: number; order: number; enquiry: number }
}

// Persist across HMR reloads in dev via globalThis
const globalStore = globalThis as unknown as { __mumbraStore?: Store }

function getStore(): Store {
  if (!globalStore.__mumbraStore) {
    globalStore.__mumbraStore = {
      reservations: [],
      orders: [],
      enquiries: [],
      nextId: { reservation: 1, order: 1, enquiry: 1 },
    }
  }
  return globalStore.__mumbraStore
}

export function addReservation(data: Omit<Reservation, "id" | "createdAt">): Reservation {
  const store = getStore()
  const reservation: Reservation = {
    ...data,
    id: store.nextId.reservation++,
    createdAt: new Date().toISOString(),
  }
  store.reservations.push(reservation)
  return reservation
}

export function getReservations(): Reservation[] {
  return getStore().reservations.slice().reverse()
}

export function addOrder(data: Omit<Order, "id" | "createdAt" | "status">): Order {
  const store = getStore()
  const order: Order = {
    ...data,
    id: store.nextId.order++,
    status: "received",
    createdAt: new Date().toISOString(),
  }
  store.orders.push(order)
  return order
}

export function getOrders(): Order[] {
  return getStore().orders.slice().reverse()
}

export function updateOrderStatus(id: number, status: Order["status"]): Order | undefined {
  const order = getStore().orders.find((o) => o.id === id)
  if (order) order.status = status
  return order
}

export function addEnquiry(data: Omit<Enquiry, "id" | "createdAt">): Enquiry {
  const store = getStore()
  const enquiry: Enquiry = {
    ...data,
    id: store.nextId.enquiry++,
    createdAt: new Date().toISOString(),
  }
  store.enquiries.push(enquiry)
  return enquiry
}

export function getEnquiries(): Enquiry[] {
  return getStore().enquiries.slice().reverse()
}
