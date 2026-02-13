import type { Metadata } from "next";
import { CuentaClient } from "./cuenta-client";

export const metadata: Metadata = {
  title: "Mi Cuenta - MotoGear",
  description: "Inicia sesion o crea tu cuenta en MotoGear.",
};

export default function CuentaPage() {
  return <CuentaClient />;
}
