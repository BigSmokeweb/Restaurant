import { HeroCarousel } from "@/components/hero-carousel"
import {
  QuickActions,
  DineOutSection,
  CateringSection,
  DealsSection,
  LocationsSection,
} from "@/components/home-sections"

export default function HomePage() {
  return (
    <main>
      <HeroCarousel />
      <QuickActions />
      <DineOutSection />
      <CateringSection />
      <DealsSection />
      <LocationsSection />
    </main>
  )
}
