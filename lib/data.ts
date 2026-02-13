export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  features?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  count: number;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Cascos",
    slug: "cascos",
    image: "/images/categories/cat-helmets.jpg",
    count: 48,
  },
  {
    id: "2",
    name: "Equipamiento",
    slug: "equipamiento",
    image: "/images/categories/cat-gear.jpg",
    count: 124,
  },
  {
    id: "3",
    name: "Partes",
    slug: "partes",
    image: "/images/categories/cat-parts.jpg",
    count: 89,
  },
  {
    id: "4",
    name: "Accesorios",
    slug: "accesorios",
    image: "/images/categories/cat-accessories.jpg",
    count: 156,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Casco Pro Carbon",
    description:
      "Casco integral de fibra de carbono con sistema de ventilacion avanzado. Certificacion DOT y ECE. Interior desmontable y lavable con almohadillas de espuma viscoelastica.",
    price: 4299,
    originalPrice: 5199,
    image: "/images/products/helmet-pro.jpg",
    category: "cascos",
    badge: "Oferta",
    rating: 4.8,
    reviews: 234,
    inStock: true,
    features: [
      "Fibra de carbono ultraligera",
      "Ventilacion multi-canal",
      "Visor anti-empanante",
      "Interior desmontable",
      "Certificacion DOT/ECE",
    ],
  },
  {
    id: "2",
    name: "Guantes Racing Pro",
    description:
      "Guantes de piel con proteccion de carbono en nudillos. Palma reforzada con tecnologia anti-deslizante y cierre de velcro ajustable.",
    price: 1299,
    image: "/images/products/gloves-racing.jpg",
    category: "equipamiento",
    rating: 4.6,
    reviews: 189,
    inStock: true,
    features: [
      "Piel genuina premium",
      "Proteccion de carbono",
      "Palma anti-deslizante",
      "Cierre ajustable",
      "Touch screen compatible",
    ],
  },
  {
    id: "3",
    name: "Escape Titanium RS",
    description:
      "Sistema de escape completo en titanio con punta de fibra de carbono. Aumenta la potencia hasta 8HP y reduce el peso en 4kg respecto al original.",
    price: 8499,
    originalPrice: 9999,
    image: "/images/products/exhaust-titanium.jpg",
    category: "partes",
    badge: "Popular",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    features: [
      "Titanio grado aeronautico",
      "Punta de fibra de carbono",
      "+8HP de potencia",
      "-4kg vs. original",
      "Sonido deportivo profundo",
    ],
  },
  {
    id: "4",
    name: "Kit LED Auxiliar",
    description:
      "Kit de luces LED auxiliares de alto rendimiento. 6000 lumenes por unidad con proteccion IP67 contra agua y polvo.",
    price: 2199,
    image: "/images/products/led-lights.jpg",
    category: "accesorios",
    rating: 4.5,
    reviews: 312,
    inStock: true,
    features: [
      "6000 lumenes",
      "Proteccion IP67",
      "Instalacion universal",
      "Aluminio CNC",
      "Garantia 2 anos",
    ],
  },
  {
    id: "5",
    name: "Chaqueta Armor Shield",
    description:
      "Chaqueta de proteccion con armadura CE nivel 2 en hombros, codos y espalda. Textil resistente a la abrasion con forro termico desmontable.",
    price: 3599,
    originalPrice: 4299,
    image: "/images/products/jacket-armor.jpg",
    category: "equipamiento",
    badge: "Nuevo",
    rating: 4.7,
    reviews: 98,
    inStock: true,
    features: [
      "Armadura CE nivel 2",
      "Textil anti-abrasion",
      "Forro termico desmontable",
      "Ventilacion regulable",
      "Reflectivos de seguridad",
    ],
  },
  {
    id: "6",
    name: "Soporte Movil Pro",
    description:
      "Soporte universal para smartphone en aluminio CNC. Compatible con dispositivos de 4.7 a 6.8 pulgadas con sistema de carga inalambrica.",
    price: 899,
    image: "/images/products/phone-mount.jpg",
    category: "accesorios",
    rating: 4.4,
    reviews: 567,
    inStock: true,
    features: [
      "Aluminio CNC",
      "Carga inalambrica Qi",
      "Anti-vibracion",
      "Rotacion 360 grados",
      "Instalacion rapida",
    ],
  },
  {
    id: "7",
    name: "Botas Touring Elite",
    description:
      "Botas de touring con proteccion de tobillo reforzada. Suela antideslizante Vibram y membrana impermeable para cualquier condicion climatica.",
    price: 2799,
    image: "/images/products/boots-touring.jpg",
    category: "equipamiento",
    badge: "Best Seller",
    rating: 4.8,
    reviews: 203,
    inStock: true,
    features: [
      "Proteccion de tobillo CE",
      "Suela Vibram",
      "Membrana impermeable",
      "Cuero premium",
      "Sistema de cierre rapido",
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.badge);
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-MX")} MXN`;
}
