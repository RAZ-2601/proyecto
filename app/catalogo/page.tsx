import type { Metadata } from "next";
import { Suspense } from "react"; // <--- Paso 1: Importar Suspense
import { CatalogoClient } from "./catalogo-client";

export const metadata: Metadata = {
  title: "Catalogo - MotoGear",
  description: "Explora nuestro catalogo completo de accesorios y equipamiento para motocicletas.",
};

export default function CatalogoPage() {
  return (
    // <--- Paso 2: Envolver el componente cliente
    <Suspense fallback={<div className="p-10 text-center text-muted-foreground">Cargando catálogo...</div>}>
      <CatalogoClient />
    </Suspense>
  );
}