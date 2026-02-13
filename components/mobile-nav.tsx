"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Tag, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const navItems = [
  { icon: Home, label: "Inicio", href: "/" },
  { icon: Search, label: "Catalogo", href: "/catalogo" },
  { icon: Tag, label: "Ofertas", href: "/ofertas" },
  { icon: ShoppingBag, label: "Carrito", href: "#cart" },
  { icon: User, label: "Cuenta", href: "/cuenta" },
];

export function MobileNav() {
  const pathname = usePathname();
  const { totalItems, setIsOpen } = useCart();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background/90 backdrop-blur-xl border-t border-border"
      aria-label="Navegacion inferior"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isCart = item.href === "#cart";
          const isActive = !isCart && pathname === item.href;

          if (isCart) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setIsOpen(true)}
                className="relative flex flex-col items-center gap-0.5 py-1.5 px-3"
                aria-label={`Carrito con ${totalItems} articulos`}
              >
                <item.icon className="w-5 h-5 text-muted-foreground" />
                {totalItems > 0 && (
                  <span className="absolute top-0.5 right-1.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
                <span className="text-[10px] text-muted-foreground">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-1.5 px-3 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
