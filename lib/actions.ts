"use server"

import { revalidatePath } from "next/cache"
import {
  addReservation,
  addOrder,
  addEnquiry,
  updateOrderStatus,
  type OrderItem,
  type Order,
} from "./store"

export type ActionResult = {
  success: boolean
  message: string
  id?: number
}

export async function createReservation(formData: {
  name: string
  phone: string
  email: string
  date: string
  mealType: "lunch" | "dinner"
  timeSlot: string
  guestsVeg: number
  guestsNonVeg: number
  specialRequest: string
}): Promise<ActionResult> {
  const { name, phone, date, timeSlot, guestsVeg, guestsNonVeg } = formData

  if (!name.trim() || !phone.trim() || !date || !timeSlot) {
    return { success: false, message: "Name, phone, date and time slot are required." }
  }
  if (guestsVeg + guestsNonVeg < 1) {
    return { success: false, message: "Please add at least 1 guest." }
  }

  const reservation = addReservation({
    name: name.trim(),
    phone: phone.trim(),
    email: formData.email.trim(),
    date,
    mealType: formData.mealType,
    timeSlot,
    guestsVeg,
    guestsNonVeg,
    specialRequest: formData.specialRequest.trim(),
  })

  revalidatePath("/admin")
  return {
    success: true,
    message: "Table reserved successfully! We look forward to hosting you.",
    id: reservation.id,
  }
}

export async function createOrder(formData: {
  customerName: string
  phone: string
  address: string
  instructions: string
  items: OrderItem[]
  total: number
}): Promise<ActionResult> {
  const { customerName, phone, address, items } = formData

  if (!customerName.trim() || !phone.trim() || !address.trim()) {
    return { success: false, message: "Name, phone and address are required." }
  }
  if (!items || items.length === 0) {
    return { success: false, message: "Your cart is empty." }
  }

  const order = addOrder({
    customerName: customerName.trim(),
    phone: phone.trim(),
    address: address.trim(),
    instructions: formData.instructions.trim(),
    items,
    total: formData.total,
  })

  revalidatePath("/admin")
  return {
    success: true,
    message: "Order placed successfully! Preparing your food now.",
    id: order.id,
  }
}

export async function createEnquiry(formData: {
  name: string
  phone: string
  email: string
  eventType: string
  message: string
}): Promise<ActionResult> {
  const { name, phone } = formData

  if (!name.trim() || !phone.trim()) {
    return { success: false, message: "Name and phone are required." }
  }

  const enquiry = addEnquiry({
    name: name.trim(),
    phone: phone.trim(),
    email: formData.email.trim(),
    eventType: formData.eventType,
    message: formData.message.trim(),
  })

  revalidatePath("/admin")
  return {
    success: true,
    message: "Thank you! Our events team will contact you within 24 hours.",
    id: enquiry.id,
  }
}

export async function setOrderStatus(id: number, status: Order["status"]): Promise<ActionResult> {
  const order = updateOrderStatus(id, status)
  if (!order) return { success: false, message: "Order not found." }
  revalidatePath("/admin")
  return { success: true, message: `Order #${id} marked as ${status}.` }
}
