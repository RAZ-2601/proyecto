"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Package, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Order {
  id: string;
  user_id: string;
  status: string;
  total: number;
  created_at: string;
  shipping_name: string;
  shipping_email: string;
  profiles: {
    email: string;
    first_name: string;
    last_name: string;
  };
}

export function PedidosTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const supabase = createClient();

  const loadOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        profiles(email, first_name, last_name)
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[v0] Error loading orders:", error);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      console.error("[v0] Error updating order:", error);
    } else {
      await loadOrders();
    }
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.shipping_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.shipping_email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const styles = {
      pendiente: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      procesando: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      enviado: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      entregado: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      cancelado: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };
    return styles[status as keyof typeof styles] || styles.pendiente;
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("es-MX")} MXN`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display tracking-wide text-foreground mb-2">
          Gestión de Pedidos
        </h2>
        <p className="text-sm text-muted-foreground">
          Administra los pedidos de la tienda
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar pedidos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-background rounded-xl border border-border p-12 text-center">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">
            {searchQuery ? "No se encontraron pedidos" : "No hay pedidos todavía"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-background rounded-xl border border-border p-4"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Order Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {order.shipping_name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {order.shipping_email}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded capitalize ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total: </span>
                      <span className="font-semibold text-foreground">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                    <div className="text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString("es-MX", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                {/* Status Selector */}
                <div>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="procesando">Procesando</option>
                    <option value="enviado">Enviado</option>
                    <option value="entregado">Entregado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-background rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground mb-1">Total</p>
          <p className="text-xl font-bold text-foreground">{orders.length}</p>
        </div>
        <div className="bg-background rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground mb-1">Pendientes</p>
          <p className="text-xl font-bold text-yellow-600">
            {orders.filter((o) => o.status === "pendiente").length}
          </p>
        </div>
        <div className="bg-background rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground mb-1">Enviados</p>
          <p className="text-xl font-bold text-purple-600">
            {orders.filter((o) => o.status === "enviado").length}
          </p>
        </div>
        <div className="bg-background rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground mb-1">Entregados</p>
          <p className="text-xl font-bold text-green-600">
            {orders.filter((o) => o.status === "entregado").length}
          </p>
        </div>
      </div>
    </div>
  );
}
