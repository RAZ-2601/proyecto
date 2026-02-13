import type { Metadata } from "next";
import { OfertasClient } from "./ofertas-client";

export const metadata: Metadata = {
  title: "Ofertas - MotoGear",
  description:
    "Aprovecha las mejores ofertas en accesorios y equipamiento para motocicletas.",
};

export default function OfertasPage() {
  return <OfertasClient />;
}
