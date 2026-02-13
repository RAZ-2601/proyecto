import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export const metadata = {
  title: "Iniciar Sesión - MotoGear",
  description: "Inicia sesión en tu cuenta de MotoGear",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-1 mb-6">
            <span className="font-display text-2xl tracking-wider text-foreground">
              MOTO
            </span>
            <span className="font-display text-2xl tracking-wider text-primary">
              GEAR
            </span>
          </Link>
          <h1 className="text-3xl font-display tracking-wide text-foreground mb-2">
            Iniciar Sesión
          </h1>
          <p className="text-sm text-muted-foreground">
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        <div className="bg-background rounded-2xl border border-border p-8 shadow-lg">
          <LoginForm />

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link
                href="/auth/sign-up"
                className="text-primary hover:underline font-semibold"
              >
                Registrate
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
}
