"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star, Check } from "lucide-react";
import { type Product, formatPrice } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group flex flex-col">
      <Link
        href={`/producto/${product.id}`}
        className="relative aspect-square rounded-xl overflow-hidden bg-secondary mb-3"
      >
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
            {product.badge}
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-1">
          <Star className="w-3 h-3 fill-primary text-primary" />
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <Link href={`/producto/${product.id}`}>
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
          {product.description}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              added
                ? "bg-green-600 text-white"
                : "bg-secondary hover:bg-primary text-muted-foreground hover:text-primary-foreground"
            }`}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            {added ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
