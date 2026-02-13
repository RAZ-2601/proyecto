import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Registro Exitoso - MotoGear",
  description: "Tu cuenta ha sido creada exitosamente",
};

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-background rounded-2xl border border-border p-8 shadow-lg">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          <h1 className="text-2xl font-display tracking-wide text-foreground mb-3">
            ¡Cuenta Creada!
          </h1>

          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Tu cuenta ha sido creada exitosamente. Revisa tu correo electrónico
            para verificar tu cuenta y poder iniciar sesión.
          </p>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/auth/login">Ir a Iniciar Sesión</Link>
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
