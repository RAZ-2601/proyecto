"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { ProductosTab } from "@/components/gerente/productos-tab";
import { UsuariosTab } from "@/components/gerente/usuarios-tab";
import { PedidosTab } from "@/components/gerente/pedidos-tab";
import { EstadisticasTab } from "@/components/gerente/estadisticas-tab";

interface GerenteClientProps {
  userName: string;
}

export function GerenteClient({ userName }: GerenteClientProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { logout } = useAuth();

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "productos", label: "Productos", icon: Package },
    { id: "pedidos", label: "Pedidos", icon: ShoppingCart },
    { id: "usuarios", label: "Usuarios", icon: Users },
    { id: "estadisticas", label: "Estadísticas", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Volver a la tienda</span>
            </Link>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="font-display text-xl tracking-wider text-foreground">
                MOTO
              </span>
              <span className="font-display text-xl tracking-wider text-primary">
                GEAR
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:block">
              Hola, <span className="text-foreground font-semibold">{userName}</span>
            </span>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-background border-b border-border sticky top-[73px] z-30 overflow-x-auto">
        <div className="px-4">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? "text-primary border-primary"
                      : "text-muted-foreground border-transparent hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "productos" && <ProductosTab />}
        {activeTab === "pedidos" && <PedidosTab />}
        {activeTab === "usuarios" && <UsuariosTab />}
        {activeTab === "estadisticas" && <EstadisticasTab />}
      </div>
    </div>
  );
}

function DashboardTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display tracking-wide text-foreground mb-2">
          Panel de Control
        </h2>
        <p className="text-sm text-muted-foreground">
          Resumen general de la tienda
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-background rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Productos</span>
          </div>
          <p className="text-2xl font-bold text-foreground">7</p>
          <p className="text-xs text-muted-foreground mt-1">Activos en tienda</p>
        </div>

        <div className="bg-background rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-muted-foreground">Pedidos</span>
          </div>
          <p className="text-2xl font-bold text-foreground">0</p>
          <p className="text-xs text-muted-foreground mt-1">Pendientes de procesar</p>
        </div>

        <div className="bg-background rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-muted-foreground">Usuarios</span>
          </div>
          <p className="text-2xl font-bold text-foreground">0</p>
          <p className="text-xs text-muted-foreground mt-1">Clientes registrados</p>
        </div>

        <div className="bg-background rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm text-muted-foreground">Ventas</span>
          </div>
          <p className="text-2xl font-bold text-foreground">$0</p>
          <p className="text-xs text-muted-foreground mt-1">Total del mes</p>
        </div>
      </div>

      <div className="bg-background rounded-xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4">
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {}}
            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors text-left"
          >
            <Package className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">Agregar Producto</p>
              <p className="text-xs text-muted-foreground">Crear nuevo producto en el inventario</p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => {}}
            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors text-left"
          >
            <Users className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">Gestionar Usuarios</p>
              <p className="text-xs text-muted-foreground">Ver y administrar usuarios</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
