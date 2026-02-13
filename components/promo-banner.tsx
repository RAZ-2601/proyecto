import Link from "next/link";
import { Zap, Truck, ShieldCheck, RotateCcw } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Envio gratis",
    desc: "En compras mayores a $2,000",
  },
  {
    icon: ShieldCheck,
    title: "Garantia total",
    desc: "12 meses en todos los productos",
  },
  {
    icon: RotateCcw,
    title: "Devoluciones",
    desc: "30 dias para cambios o devolucion",
  },
  {
    icon: Zap,
    title: "Entrega rapida",
    desc: "24-48 hrs en tu ciudad",
  },
];

export function PromoBanner() {
  return (
    <section className="px-4 py-12 max-w-7xl mx-auto">
      {/* Big promo */}
      <div className="relative rounded-2xl overflow-hidden bg-secondary p-8 md:p-12 mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-lg">
          <span className="inline-block bg-primary/20 text-primary text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-md mb-4">
            Promocion limitada
          </span>
          <h3 className="font-display text-3xl md:text-5xl text-foreground tracking-wide leading-none">
            HASTA 30% DE DESCUENTO
          </h3>
          <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
            En toda la linea de cascos y equipamiento de proteccion. Oferta
            valida hasta agotar existencias.
          </p>
          <Link
            href="/ofertas"
            className="inline-flex items-center gap-2 mt-6 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all"
          >
            Comprar ahora
          </Link>
        </div>
      </div>

      {/* Trust features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {features.map((feat) => (
          <div
            key={feat.title}
            className="flex flex-col items-center text-center p-5 rounded-xl bg-secondary/50 border border-border"
          >
            <feat.icon className="w-6 h-6 text-primary mb-3" />
            <h4 className="text-sm font-semibold text-foreground">
              {feat.title}
            </h4>
            <p className="text-xs text-muted-foreground mt-1">{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
