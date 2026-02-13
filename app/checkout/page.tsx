import type { Metadata } from "next";
import { CheckoutClient } from "./checkout-client";

export const metadata: Metadata = {
  title: "Pago - MotoGear",
  description: "Completa tu compra de forma segura con MotoGear.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
