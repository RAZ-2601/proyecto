"use client";

import React from "react"

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X, User, LogOut } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { products, formatPrice } from "@/lib/data";

export function Header() {
  const { totalItems, setIsOpen } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      setSearchQuery("");
      router.push(`/catalogo?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Catalogo", href: "/catalogo" },
    { label: "Ofertas", href: "/ofertas" },
    { label: "Nosotros", href: "/nosotros" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto">
        {/* Menu hamburger - mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {menuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-wider text-foreground">
            MOTO
          </span>
          <span className="font-display text-2xl tracking-wider text-primary">
            GEAR
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Navegacion principal"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setSearchOpen(!searchOpen);
              setSearchQuery("");
            }}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Buscar"
          >
            {searchOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>

          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-1">
              <Link
                href="/cuenta"
                className="flex items-center gap-1.5 p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Mi cuenta"
              >
                <User className="w-5 h-5" />
                <span className="text-xs font-medium max-w-[80px] truncate">
                  {user?.name}
                </span>
              </Link>
              <button
                type="button"
                onClick={logout}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Cerrar sesion"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/cuenta"
              className="hidden md:flex p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Iniciar sesion"
            >
              <User className="w-5 h-5" />
            </Link>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`Carrito con ${totalItems} articulos`}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="border-t border-border px-4 py-3 bg-background">
          <div className="max-w-7xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar cascos, guantes, escapes..."
                className="w-full bg-secondary text-foreground placeholder:text-muted-foreground rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </form>

            {/* Search results dropdown */}
            {searchResults.length > 0 && (
              <div className="mt-2 bg-card rounded-xl border border-border overflow-hidden">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/producto/${product.id}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary flex-shrink-0 relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.category}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-primary">
                      {formatPrice(product.price)}
                    </span>
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    router.push(
                      `/catalogo?q=${encodeURIComponent(searchQuery)}`
                    );
                    setSearchQuery("");
                  }}
                  className="w-full px-4 py-3 text-xs text-primary font-semibold text-center hover:bg-secondary/50 transition-colors border-t border-border"
                >
                  Ver todos los resultados
                </button>
              </div>
            )}

            {searchQuery.trim() && searchResults.length === 0 && (
              <div className="mt-2 bg-card rounded-xl border border-border p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  No se encontraron resultados para &quot;{searchQuery}&quot;
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          className="lg:hidden border-t border-border bg-background px-4 py-4"
          aria-label="Menu movil"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                  pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border my-2" />
            {isLoggedIn ? (
              <>
                <Link
                  href="/cuenta"
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  Mi Cuenta ({user?.name})
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="text-left px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  Cerrar sesion
                </button>
              </>
            ) : (
              <Link
                href="/cuenta"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-3 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                Iniciar sesion / Registrarse
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
