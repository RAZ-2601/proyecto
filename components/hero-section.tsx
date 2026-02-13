import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative h-[85vh] md:h-[90vh] flex items-end overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-moto.jpg"
        alt="Motocicleta en garage industrial"
        fill
        className="object-cover"
        priority
        quality={90}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full px-4 pb-16 md:pb-24 max-w-7xl mx-auto">
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
          Nueva temporada 2026
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground leading-none tracking-wide text-balance max-w-3xl">
          EQUIPA TU RIDE AL SIGUIENTE NIVEL
        </h1>
        <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-md leading-relaxed">
          Descubre nuestra coleccion de accesorios y equipamiento premium para
          motociclistas exigentes.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/catalogo"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Ver catalogo
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/ofertas"
            className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-3.5 rounded-lg text-sm font-semibold hover:bg-secondary/80 transition-colors"
          >
            Ofertas especiales
          </Link>
        </div>
      </div>
    </section>
  );
}
