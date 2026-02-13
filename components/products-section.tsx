"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { ProductCard } from "./product-card";
import { Loader2 } from "lucide-react";

const filters = [
  { label: "Todos", value: "all" },
  { label: "Cascos", value: "cascos" },
  { label: "Equipamiento", value: "equipamiento" },
  { label: "Partes", value: "partes" },
  { label: "Accesorios", value: "accesorios" },
];

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  category: string;
  image_url: string;
  rating: number;
  reviews_count: number;
  stock: number;
  is_active: boolean;
  is_featured: boolean;
  discount_percentage: number;
}

export function ProductsSection() {
  const [active, setActive] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .eq("is_featured", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("[v0] Error loading products:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    loadProducts();
  }, [supabase]);

  const filtered =
    active === "all"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <section className="px-4 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-2">
            Coleccion
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-wide">
            PRODUCTOS DESTACADOS
          </h2>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setActive(f.value)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                active === f.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product) => (
            <ProductCard 
              key={product.id} 
              product={{
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image_url,
                originalPrice: product.original_price || undefined,
                category: product.category,
                rating: product.rating,
                reviews: product.reviews_count,
                inStock: product.stock > 0,
                badge: product.discount_percentage > 0 ? `${product.discount_percentage}% OFF` : undefined,
              }} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-sm text-muted-foreground">
            No se encontraron productos en esta categoria
          </p>
        </div>
      )}
    </section>
  );
}
