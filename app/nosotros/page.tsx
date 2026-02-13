import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  Users,
  Award,
  Heart,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Nosotros - MotoGear",
  description:
    "Conoce MotoGear, tu tienda de confianza para accesorios y equipamiento premium de motocicletas.",
};

const stats = [
  { label: "Productos", value: "+400" },
  { label: "Clientes satisfechos", value: "12K+" },
  { label: "Anos de experiencia", value: "8" },
  { label: "Marcas premium", value: "50+" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Calidad garantizada",
    desc: "Solo trabajamos con marcas y proveedores que cumplen los mas altos estandares de calidad y certificaciones internacionales.",
  },
  {
    icon: Heart,
    title: "Pasion por las motos",
    desc: "Somos motociclistas de corazon. Entendemos lo que necesitas porque vivimos la misma pasion que tu.",
  },
  {
    icon: Wrench,
    title: "Asesoria experta",
    desc: "Nuestro equipo de especialistas te ayuda a encontrar el producto perfecto para tu moto y tu estilo de manejo.",
  },
  {
    icon: Truck,
    title: "Envio seguro",
    desc: "Empaquetamos cada producto con el mayor cuidado y te lo enviamos con seguimiento en tiempo real.",
  },
  {
    icon: Users,
    title: "Comunidad activa",
    desc: "Forma parte de nuestra comunidad de miles de motociclistas que comparten experiencias y recomendaciones.",
  },
  {
    icon: Award,
    title: "Precios competitivos",
    desc: "Ofrecemos los mejores precios del mercado sin sacrificar la calidad. Garantia de precio mas bajo.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {/* Hero section */}
      <div className="relative rounded-2xl overflow-hidden mb-16 h-[50vh] md:h-[60vh]">
        <Image
          src="/images/hero-moto.jpg"
          alt="Equipo MotoGear"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-2">
            Nuestra historia
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-foreground tracking-wide leading-none max-w-2xl">
            MAS QUE UNA TIENDA, UNA COMUNIDAD
          </h1>
        </div>
      </div>

      {/* About text */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-muted-foreground leading-relaxed text-base">
          En MotoGear nacimos de la pasion por las dos ruedas. Desde 2018,
          nos hemos dedicado a ofrecer los mejores accesorios y equipamiento
          para motociclistas en toda la republica. Creemos que cada rider
          merece equipamiento de calidad que lo proteja y le permita disfrutar
          al maximo cada recorrido.
        </p>
        <p className="text-muted-foreground leading-relaxed text-base mt-4">
          Nuestro compromiso es simple: ofrecerte productos premium, a
          precios accesibles, con la mejor atencion al cliente. Porque no
          solo vendemos accesorios, construimos confianza.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center text-center p-6 rounded-xl bg-secondary/50 border border-border"
          >
            <span className="font-display text-4xl md:text-5xl text-primary tracking-wide">
              {stat.value}
            </span>
            <span className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-2">
            Que nos define
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-wide">
            NUESTROS VALORES
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((val) => (
            <div
              key={val.title}
              className="p-6 rounded-xl bg-secondary/50 border border-border"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <val.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2">
                {val.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-secondary p-8 md:p-12 text-center">
        <h3 className="font-display text-3xl md:text-4xl text-foreground tracking-wide mb-3">
          LISTO PARA EQUIPARTE?
        </h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
          Explora nuestro catalogo y encuentra todo lo que necesitas para tu
          proxima aventura sobre dos ruedas.
        </p>
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Ver catalogo
        </Link>
      </div>
    </div>
  );
}
