import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/data";

export function CategoriesSection() {
  return (
    <section className="px-4 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-2">
            Explorar
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-wide">
            CATEGORIAS
          </h2>
        </div>
        <Link
          href="/catalogo"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block"
        >
          Ver todas
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/catalogo?cat=${cat.slug}`}
            className="group relative aspect-[3/4] rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Image
              src={cat.image || "/placeholder.svg"}
              alt={cat.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent group-hover:from-background/95 transition-all" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="font-display text-xl md:text-2xl text-foreground tracking-wide transition-transform group-hover:translate-y-[-2px]">
                    {cat.name.toUpperCase()}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {cat.count} productos
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  <ArrowUpRight className="w-4 h-4 text-primary" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
