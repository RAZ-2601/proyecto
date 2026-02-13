import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { MobileNav } from "@/components/mobile-nav";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "MotoGear - Accesorios Premium para Motocicletas",
  description:
    "Encuentra los mejores accesorios y equipamiento para tu motocicleta. Cascos, guantes, escapes, iluminacion y mas.",
  generator: "v0.app",
};

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${bebasNeue.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="pt-16 pb-20 lg:pb-0 min-h-screen">{children}</main>
            <Footer />
            <CartDrawer />
            <MobileNav />
          </CartProvider>
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
