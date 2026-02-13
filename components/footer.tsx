import Link from "next/link";

const links = {
  Tienda: [
    { label: "Catalogo", href: "/catalogo" },
    { label: "Ofertas", href: "/ofertas" },
    { label: "Nuevos", href: "/catalogo?sort=new" },
    { label: "Mas vendidos", href: "/catalogo?sort=popular" },
  ],
  Soporte: [
    { label: "Contacto", href: "/contacto" },
    { label: "Envios", href: "/envios" },
    { label: "Devoluciones", href: "/devoluciones" },
    { label: "FAQ", href: "/faq" },
  ],
  Legal: [
    { label: "Privacidad", href: "/privacidad" },
    { label: "Terminos", href: "/terminos" },
    { label: "Garantias", href: "/garantias" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pb-24 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-1 mb-4">
              <span className="font-display text-xl tracking-wider text-foreground">
                MOTO
              </span>
              <span className="font-display text-xl tracking-wider text-primary">
                GEAR
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Tu tienda de confianza para accesorios y equipamiento de
              motocicletas. Calidad premium, precios accesibles.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            2026 MotoGear. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              Visa / Mastercard / PayPal / OXXO
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
