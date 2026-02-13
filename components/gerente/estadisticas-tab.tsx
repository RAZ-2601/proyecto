"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, TrendingUp, Package, ShoppingCart, DollarSign } from "lucide-react";

export function EstadisticasTab() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Contar productos
        const { count: productsCount } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true });

        const { count: activeProductsCount } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true })
          .eq("is_active", true);

        // Contar pedidos
        const { count: ordersCount } = await supabase
          .from("orders")
          .select("*", { count: "exact", head: true });

        // Calcular ingresos totales
        const { data: orders } = await supabase
          .from("orders")
          .select("total")
          .not("status", "eq", "cancelado");

        const revenue = orders?.reduce((sum, order) => sum + order.total, 0) || 0;

        // Contar usuarios
        const { count: usersCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        setStats({
          totalProducts: productsCount || 0,
          activeProducts: activeProductsCount || 0,
          totalOrders: ordersCount || 0,
          totalRevenue: revenue,
          totalUsers: usersCount || 0,
        });
      } catch (error) {
        console.error("[v0] Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [supabase]);

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("es-MX")} MXN`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display tracking-wide text-foreground mb-2">
          Estadísticas
        </h2>
        <p className="text-sm text-muted-foreground">
          Métricas generales de la tienda
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-background rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Productos</p>
          <p className="text-3xl font-bold text-foreground">
            {stats.totalProducts}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {stats.activeProducts} activos
          </p>
        </div>

        <div className="bg-background rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Pedidos</p>
          <p className="text-3xl font-bold text-foreground">{stats.totalOrders}</p>
          <p className="text-xs text-muted-foreground mt-2">Todos los tiempos</p>
        </div>

        <div className="bg-background rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Ingresos Totales</p>
          <p className="text-3xl font-bold text-foreground">
            {formatPrice(stats.totalRevenue)}
          </p>
          <p className="text-xs text-muted-foreground mt-2">Sin pedidos cancelados</p>
        </div>

        <div className="bg-background rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Usuarios Totales</p>
          <p className="text-3xl font-bold text-foreground">{stats.totalUsers}</p>
          <p className="text-xs text-muted-foreground mt-2">Clientes y staff</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-background rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Productos
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Activos</span>
              <span className="font-semibold text-foreground">
                {stats.activeProducts}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Inactivos</span>
              <span className="font-semibold text-foreground">
                {stats.totalProducts - stats.activeProducts}
              </span>
            </div>
            <div className="h-px bg-border my-2" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-bold text-primary">{stats.totalProducts}</span>
            </div>
          </div>
        </div>

        <div className="bg-background rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            Pedidos
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pedidos</span>
              <span className="font-semibold text-foreground">
                {stats.totalOrders}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Ingresos</span>
              <span className="font-semibold text-foreground">
                {formatPrice(stats.totalRevenue)}
              </span>
            </div>
            <div className="h-px bg-border my-2" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Promedio</span>
              <span className="font-bold text-primary">
                {stats.totalOrders > 0
                  ? formatPrice(stats.totalRevenue / stats.totalOrders)
                  : "$0 MXN"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
