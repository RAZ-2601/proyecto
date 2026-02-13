import type { Metadata } from "next";
import { CatalogoClient } from "./catalogo-client";

export const metadata: Metadata = {
  title: "Catalogo - MotoGear",
  description:
    "Explora nuestro catalogo completo de accesorios y equipamiento para motocicletas.",
};

export default function CatalogoPage() {
  return <CatalogoClient />;
}
