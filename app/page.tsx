import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProductCategories } from "@/components/product-categories"
import { BenefitsSection } from "@/components/benefits-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { DeliveryZoneChecker } from "@/components/delivery-zone-checker"

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <AboutSection />
      <ProductCategories />
      <BenefitsSection />
      <TestimonialsSection />
      <DeliveryZoneChecker />
    </div>
  )
}
