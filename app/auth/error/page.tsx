import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Error de Autenticación - MotoGear",
  description: "Ocurrió un error durante la autenticación",
};

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-background rounded-2xl border border-border p-8 shadow-lg">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>

          <h1 className="text-2xl font-display tracking-wide text-foreground mb-3">
            Error de Autenticación
          </h1>

          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Ocurrió un error durante el proceso de autenticación. Por favor,
            intenta nuevamente.
          </p>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/auth/login">Volver a Iniciar Sesión</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Volver a la Tienda</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
