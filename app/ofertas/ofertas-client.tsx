"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Percent, Clock, Tag, Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { createClient } from "@/lib/supabase/client";

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
  discount_percentage: number;
}

export function OfertasClient() {
  const [offerProducts, setOfferProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const loadOffers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .gt("discount_percentage", 0)
        .order("discount_percentage", { ascending: false });

      if (error) {
        console.error("[v0] Error loading offers:", error);
      } else {
        setOfferProducts(data || []);
      }
      setLoading(false);
    };

    loadOffers();
  }, [supabase]);

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {/* Banner promo */}
      <div className="relative rounded-2xl overflow-hidden bg-secondary p-8 md:p-12 mb-10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-primary/20 text-primary text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-md">
              <Tag className="w-3 h-3" />
              Ofertas activas
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl text-foreground tracking-wide leading-none">
            OFERTAS ESPECIALES
          </h1>
          <p className="text-muted-foreground text-sm mt-4 leading-relaxed max-w-md">
            Descuentos exclusivos en equipamiento y accesorios premium. Precios
            reducidos por tiempo limitado.
          </p>
        </div>
      </div>

      {/* Countdown/info strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Percent className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Hasta 30% de descuento
            </p>
            <p className="text-xs text-muted-foreground">
              En productos seleccionados
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Ofertas por tiempo limitado
            </p>
            <p className="text-xs text-muted-foreground">
              Hasta agotar existencias
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Tag className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Envio gratis incluido
            </p>
            <p className="text-xs text-muted-foreground">
              En todas las ofertas
            </p>
          </div>
        </div>
      </div>

      {/* Products on sale */}
      <div className="mb-6">
        <h2 className="font-display text-2xl md:text-3xl text-foreground tracking-wide mb-1">
          PRODUCTOS EN OFERTA
        </h2>
        <p className="text-sm text-muted-foreground">
          {offerProducts.length} producto
          {offerProducts.length !== 1 ? "s" : ""} con descuento
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : offerProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {offerProducts.map((product) => (
            <div key={product.id} className="relative">
              {product.discount_percentage > 0 && (
                <div className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-md">
                  -{product.discount_percentage}%
                </div>
              )}
              <ProductCard 
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
                  badge: `${product.discount_percentage}% OFF`,
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Tag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-sm font-medium text-foreground">
            No hay ofertas disponibles en este momento
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Vuelve pronto para nuevas promociones
          </p>
        </div>
      )}

      {/* All products banner */}
      <div className="mt-12 rounded-2xl bg-secondary/50 border border-border p-8 text-center">
        <h3 className="font-display text-2xl text-foreground tracking-wide mb-2">
          NO ENCONTRASTE LO QUE BUSCAS?
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Explora todo nuestro catalogo con mas de 400 productos disponibles
        </p>
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Ver catalogo completo
        </Link>
      </div>
    </div>
  );
}
