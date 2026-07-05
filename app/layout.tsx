import type { Metadata } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import { CartProvider } from "@/components/cart-context"
import { ReservationProvider } from "@/components/reservation-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ReservationModal } from "@/components/reservation-modal"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Mumbra Restaurant | #1 Celebration Destination in Thane",
  description:
    "Experience unlimited buffet, live grills, Indo-Chinese specials, and authentic Indian breakfast at Mumbra Restaurant, Thane. Reserve a table or order online.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`bg-background ${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans min-h-screen flex flex-col">
        <CartProvider>
          <ReservationProvider>
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
            <ReservationModal />
          </ReservationProvider>
        </CartProvider>
      </body>
    </html>
  )
}
