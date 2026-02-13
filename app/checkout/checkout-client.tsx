"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Lock, CreditCard } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/data";
import Checkout from "@/components/checkout";

export function CheckoutClient() {
  const { items, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="px-4 py-20 max-w-lg mx-auto text-center">
        <CreditCard className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
        <h1 className="font-display text-3xl text-foreground tracking-wide mb-2">
          CARRITO VACIO
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Agrega productos a tu carrito antes de proceder al pago
        </p>
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Ir al catalogo
        </Link>
      </div>
    );
  }

  const cartLineItems = items.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity,
  }));

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a la tienda
      </Link>

      <h1 className="font-display text-3xl md:text-4xl text-foreground tracking-wide mb-8">
        FINALIZAR COMPRA
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Order summary */}
        <div className="lg:w-96 flex-shrink-0 order-2 lg:order-1">
          <div className="bg-secondary/50 border border-border rounded-2xl p-6 sticky top-20">
            <h2 className="text-sm font-bold text-foreground mb-4">
              Resumen del pedido ({totalItems} articulo
              {totalItems !== 1 ? "s" : ""})
            </h2>
            <div className="flex flex-col gap-3 mb-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3"
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Cant: {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-foreground">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Subtotal</span>
                <span className="text-sm font-medium text-foreground">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Envio</span>
                <span className="text-sm font-medium text-primary">
                  {totalPrice >= 2000 ? "Gratis" : formatPrice(199)}
                </span>
              </div>
              <div className="border-t border-border mt-3 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">
                    Total
                  </span>
                  <span className="text-base font-bold text-foreground">
                    {formatPrice(
                      totalPrice + (totalPrice >= 2000 ? 0 : 199)
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="w-3.5 h-3.5 text-primary" />
                Pago 100% seguro con encriptacion SSL
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                Garantia de devolucion en 30 dias
              </div>
            </div>
          </div>
        </div>

        {/* Stripe checkout */}
        <div className="flex-1 order-1 lg:order-2">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="w-5 h-5 text-primary" />
              <h2 className="text-sm font-bold text-foreground">
                Informacion de pago
              </h2>
            </div>
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              }
            >
              <Checkout cartItems={cartLineItems} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
