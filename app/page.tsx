import { HeroSection } from "@/components/hero-section";
import { CategoriesSection } from "@/components/categories-section";
import { ProductsSection } from "@/components/products-section";
import { PromoBanner } from "@/components/promo-banner";

export default function Page() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <ProductsSection />
      <PromoBanner />
    </>
  );
}
