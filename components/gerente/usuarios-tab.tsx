"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Search, Shield, User as UserIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserProfile {
  id: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  phone: string;
  created_at: string;
}

export function UsuariosTab() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const supabase = createClient();

  const loadUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[v0] Error loading users:", error);
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const changeRole = async (userId: string, newRole: string) => {
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId);

    if (error) {
      console.error("[v0] Error updating role:", error);
      alert("Error al cambiar el rol del usuario");
    } else {
      await loadUsers();
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.first_name &&
        u.first_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.last_name &&
        u.last_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getRoleBadge = (role: string) => {
    const styles = {
      gerente: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      empleado: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      cliente: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
    };
    return styles[role as keyof typeof styles] || styles.cliente;
  };

  const getRoleLabel = (role: string) => {
    const labels = {
      gerente: "Gerente",
      empleado: "Empleado",
      cliente: "Cliente",
    };
    return labels[role as keyof typeof labels] || role;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display tracking-wide text-foreground mb-2">
          Gestión de Usuarios
        </h2>
        <p className="text-sm text-muted-foreground">
          Administra roles y permisos de usuarios
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar usuarios..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-background rounded-xl border border-border p-12 text-center">
          <UserIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">
            {searchQuery ? "No se encontraron usuarios" : "No hay usuarios todavía"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-background rounded-xl border border-border p-4"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {user.role === "gerente" ? (
                        <Shield className="w-5 h-5 text-primary" />
                      ) : (
                        <UserIcon className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {user.first_name && user.last_name
                          ? `${user.first_name} ${user.last_name}`
                          : user.email}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${getRoleBadge(
                        user.role
                      )}`}
                    >
                      {getRoleLabel(user.role)}
                    </span>
                    {user.phone && (
                      <span className="text-muted-foreground">{user.phone}</span>
                    )}
                    <span className="text-muted-foreground">
                      Registro: {new Date(user.created_at).toLocaleDateString("es-MX")}
                    </span>
                  </div>
                </div>

                {/* Role Actions */}
                <div className="flex gap-2">
                  <select
                    value={user.role}
                    onChange={(e) => changeRole(user.id, e.target.value)}
                    className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="cliente">Cliente</option>
                    <option value="empleado">Empleado</option>
                    <option value="gerente">Gerente</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-background rounded-xl border border-border p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Usuarios</p>
          <p className="text-2xl font-bold text-foreground">{users.length}</p>
        </div>
        <div className="bg-background rounded-xl border border-border p-4">
          <p className="text-sm text-muted-foreground mb-1">Clientes</p>
          <p className="text-2xl font-bold text-foreground">
            {users.filter((u) => u.role === "cliente").length}
          </p>
        </div>
        <div className="bg-background rounded-xl border border-border p-4">
          <p className="text-sm text-muted-foreground mb-1">Staff</p>
          <p className="text-2xl font-bold text-foreground">
            {users.filter((u) => u.role !== "cliente").length}
          </p>
        </div>
      </div>
    </div>
  );
}
