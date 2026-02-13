import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { GerenteClient } from "./gerente-client";

export const metadata = {
  title: "Panel de Gerente - MotoGear",
  description: "Panel de administración para gerentes",
};

export default async function GerentePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Verificar que el usuario sea gerente
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, first_name, last_name")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "gerente") {
    redirect("/");
  }

  return <GerenteClient userName={profile.first_name || "Gerente"} />;
}
