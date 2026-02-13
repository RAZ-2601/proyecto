-- Script 004: Crear tablas de pedidos
-- Estas tablas almacenan los pedidos y sus items

-- Crear tipo ENUM para estados de pedido
CREATE TYPE order_status AS ENUM ('pendiente', 'procesando', 'enviado', 'entregado', 'cancelado');

-- Crear tabla de pedidos
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status order_status NOT NULL DEFAULT 'pendiente',
  total DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping DECIMAL(10, 2) NOT NULL DEFAULT 0,
  tax DECIMAL(10, 2) NOT NULL DEFAULT 0,
  
  -- Información de envío
  shipping_name TEXT NOT NULL,
  shipping_email TEXT NOT NULL,
  shipping_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_state TEXT NOT NULL,
  shipping_postal_code TEXT NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Auditoría
  processed_by UUID REFERENCES public.profiles(id)
);

-- Crear tabla de items de pedido
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  
  -- Información del producto al momento del pedido (snapshot)
  product_name TEXT NOT NULL,
  product_image_url TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para pedidos
-- Los usuarios pueden ver sus propios pedidos
CREATE POLICY "orders_select_own" ON public.orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- Gerentes y empleados pueden ver todos los pedidos
CREATE POLICY "orders_select_staff" ON public.orders
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('gerente', 'empleado')
    )
  );

-- Los usuarios pueden crear sus propios pedidos
CREATE POLICY "orders_insert_own" ON public.orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Solo gerentes y empleados pueden actualizar pedidos
CREATE POLICY "orders_update_staff" ON public.orders
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('gerente', 'empleado')
    )
  );

-- Políticas RLS para order_items
-- Los usuarios pueden ver items de sus propios pedidos
CREATE POLICY "order_items_select_own" ON public.order_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE id = order_id AND user_id = auth.uid()
    )
  );

-- Gerentes y empleados pueden ver todos los items
CREATE POLICY "order_items_select_staff" ON public.order_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('gerente', 'empleado')
    )
  );

-- Los usuarios pueden insertar items en sus propios pedidos
CREATE POLICY "order_items_insert_own" ON public.order_items
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE id = order_id AND user_id = auth.uid()
    )
  );

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);

-- Triggers para actualizar updated_at
DROP TRIGGER IF EXISTS set_updated_at_orders ON public.orders;

CREATE TRIGGER set_updated_at_orders
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
