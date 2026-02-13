"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/data";

export function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();
  const router = useRouter();

  if (!isOpen) return null;

  const handleCheckout = () => {
    setIsOpen(false);
    router.push("/checkout");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
        onClick={() => setIsOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape" || e.key === "Enter") setIsOpen(false);
        }}
        role="button"
        tabIndex={0}
        aria-label="Cerrar carrito"
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background border-l border-border z-50 flex flex-col"
        role="dialog"
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="text-sm font-bold text-foreground">
              Carrito ({totalItems})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <p className="text-sm font-medium text-foreground">
                Tu carrito esta vacio
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Agrega productos para comenzar tu compra
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/catalogo");
                }}
                className="mt-4 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Explorar catalogo
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-xl bg-secondary/50"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatPrice(item.product.price)}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Reducir cantidad"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label={`Eliminar ${item.product.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-base font-bold text-foreground">
                {formatPrice(totalPrice)}
              </span>
            </div>
            {totalPrice >= 2000 && (
              <p className="text-[10px] text-primary font-medium mb-3">
                Envio gratis incluido en tu pedido
              </p>
            )}
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Proceder al pago
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                router.push("/catalogo");
              }}
              className="w-full bg-transparent text-muted-foreground py-2.5 text-xs font-medium hover:text-foreground transition-colors mt-1"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
