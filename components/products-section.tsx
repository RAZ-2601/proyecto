"use client";

import { useState } from "react";
import { products } from "@/lib/data";
import { ProductCard } from "./product-card";

const filters = [
  { label: "Todos", value: "all" },
  { label: "Cascos", value: "cascos" },
  { label: "Equipamiento", value: "equipamiento" },
  { label: "Partes", value: "partes" },
  { label: "Accesorios", value: "accesorios" },
];

export function ProductsSection() {
  const [active, setActive] = useState("all");

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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
