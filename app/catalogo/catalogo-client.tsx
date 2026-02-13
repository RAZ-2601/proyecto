"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, categories, type Product } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "new";

export function CatalogoClient() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("cat") || "todos";
  const initialQuery = searchParams.get("q") || "";

  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result: Product[] = [...products];

    // Filter by category
    if (selectedCategory !== "todos") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "new":
        result.sort((a, b) => (a.badge === "Nuevo" ? -1 : 1));
        break;
    }

    return result;
  }, [search, selectedCategory, sortBy]);

  const allCategories = [
    { slug: "todos", name: "Todos" },
    ...categories.map((c) => ({ slug: c.slug, name: c.name })),
  ];

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {/* Page title */}
      <div className="mb-8">
        <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-2">
          Tienda
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-foreground tracking-wide">
          CATALOGO
        </h1>
      </div>

      {/* Search + filter bar */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full bg-secondary text-foreground placeholder:text-muted-foreground rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Limpiar busqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-secondary text-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
            aria-label="Ordenar por"
          >
            <option value="default">Ordenar por</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="rating">Mejor valorados</option>
            <option value="new">Mas recientes</option>
          </select>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors md:hidden ${
              showFilters
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground"
            }`}
            aria-label="Mostrar filtros"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar categories - desktop always visible, mobile toggleable */}
        <aside
          className={`${
            showFilters ? "block" : "hidden"
          } md:block w-full md:w-56 flex-shrink-0`}
        >
          <div className="bg-secondary/50 rounded-xl p-4 border border-border sticky top-20">
            <h3 className="text-sm font-bold text-foreground mb-3">
              Categorias
            </h3>
            <div className="flex flex-col gap-1">
              {allCategories.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setShowFilters(false);
                  }}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    selectedCategory === cat.slug
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} producto
              {filteredProducts.length !== 1 ? "s" : ""} encontrado
              {filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-sm font-medium text-foreground">
                No se encontraron productos
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Intenta cambiar los filtros o el termino de busqueda
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
