"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

export default function SetupTestUsers() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ email: string; success: boolean; message: string }[]>([]);
  const supabase = createClient();

  const testUsers = [
    { email: "rafita@outlook.com", password: "123456", role: "gerente", name: "Rafael" },
    { email: "fany@outlook.com", password: "123456", role: "cliente", name: "Fany" },
  ];

  const createTestUsers = async () => {
    setLoading(true);
    setResults([]);
    const newResults = [];

    for (const user of testUsers) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: user.email,
          password: user.password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              first_name: user.name,
              role: user.role,
            },
          },
        });

        if (error) {
          newResults.push({
            email: user.email,
            success: false,
            message: error.message,
          });
        } else if (data.user) {
          // Actualizar el rol manualmente ya que el trigger solo asigna 'cliente' por defecto
          if (user.role !== "cliente") {
            const { error: updateError } = await supabase
              .from("profiles")
              .update({ role: user.role })
              .eq("id", data.user.id);

            if (updateError) {
              newResults.push({
                email: user.email,
                success: false,
                message: `Usuario creado pero error al asignar rol: ${updateError.message}`,
              });
            } else {
              newResults.push({
                email: user.email,
                success: true,
                message: `Usuario creado exitosamente como ${user.role}`,
              });
            }
          } else {
            newResults.push({
              email: user.email,
              success: true,
              message: "Usuario creado exitosamente",
            });
          }
        }
      } catch (err) {
        newResults.push({
          email: user.email,
          success: false,
          message: `Error: ${err}`,
        });
      }
    }

    setResults(newResults);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8">
        <h1 className="text-2xl font-bold mb-6">Configurar Usuarios de Prueba</h1>
        
        <div className="space-y-4 mb-6">
          <p className="text-sm text-muted-foreground">
            Esta página creará los siguientes usuarios de prueba:
          </p>
          
          {testUsers.map((user) => (
            <div key={user.email} className="p-4 bg-secondary/50 rounded-lg">
              <p className="font-semibold">{user.email}</p>
              <p className="text-sm text-muted-foreground">
                Contraseña: {user.password} | Rol: {user.role}
              </p>
            </div>
          ))}
        </div>

        <Button
          onClick={createTestUsers}
          disabled={loading}
          className="w-full mb-6"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creando usuarios...
            </>
          ) : (
            "Crear Usuarios de Prueba"
          )}
        </Button>

        {results.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Resultados:</h3>
            {results.map((result, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 p-4 rounded-lg ${
                  result.success ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"
                }`}
              >
                {result.success ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-medium">{result.email}</p>
                  <p className="text-sm text-muted-foreground">{result.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
