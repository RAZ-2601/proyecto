"use client";

import { ProductDetail } from "@/components/product-detail";
import { ProductsSection } from "@/components/products-section";
import type { Product } from "@/lib/data";

interface ProductPageClientProps {
  product: Product;
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  return (
    <>
      <ProductDetail product={product} />
      <div className="border-t border-border mt-12">
        <ProductsSection />
      </div>
    </>
  );
}
