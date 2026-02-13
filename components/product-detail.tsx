"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, ShoppingBag, Check, Truck } from "lucide-react";
import { type Product, formatPrice } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a la tienda
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg">
              {product.badge}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={`star-${product.id}-${i}`}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} resenas)
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl text-foreground tracking-wide">
            {product.name.toUpperCase()}
          </h1>

          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-2xl font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-base text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-sm font-bold text-primary">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mt-6">
            {product.description}
          </p>

          {/* Features */}
          {product.features && (
            <div className="mt-6">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
                Caracteristicas
              </h3>
              <ul className="flex flex-col gap-2">
                {product.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add to cart */}
          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleAdd}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold transition-all ${
                added
                  ? "bg-green-600 text-green-50"
                  : "bg-primary text-primary-foreground hover:opacity-90"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  Agregado al carrito
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  Agregar al carrito
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Truck className="w-4 h-4" />
              Envio gratis en compras mayores a $2,000 MXN
            </div>
          </div>

          {/* Stock */}
          <div className="mt-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">En stock - Envio en 24-48 hrs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
