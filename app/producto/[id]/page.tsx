import { notFound } from "next/navigation";
import { getProductById, products } from "@/lib/data";
import { ProductPageClient } from "./product-page-client";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: `${product.name} | MotoGear`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return <ProductPageClient product={product} />;
}
