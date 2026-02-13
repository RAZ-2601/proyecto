-- Script 005: Insertar productos iniciales
-- Este script inserta los productos de ejemplo en la base de datos

-- Insertar productos (temporalmente desactivamos RLS para el seed)
INSERT INTO public.products (name, description, price, original_price, category, image_url, rating, reviews_count, stock, is_active, is_featured, discount_percentage)
VALUES
  -- Cascos
  ('Casco Integral X-Pro', 'Casco integral de alta seguridad con certificación DOT y ECE. Sistema de ventilación avanzado y visera antivaho.', 89.99, 129.99, 'cascos', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 4.8, 156, 45, true, true, 31),
  ('Casco Modular GT', 'Casco modular versátil con doble homologación. Perfecto para touring y uso diario.', 159.99, 199.99, 'cascos', 'https://images.unsplash.com/photo-1562820189-a384b04d5e99?w=800&q=80', 4.6, 89, 28, true, true, 20),
  ('Casco Jet Classic', 'Casco abierto estilo retro con excelente visibilidad. Ideal para ciudad y paseos relajados.', 69.99, NULL, 'cascos', 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80', 4.5, 234, 67, true, false, 0),
  
  -- Guantes
  ('Guantes Sport Pro', 'Guantes deportivos con protecciones de carbono y piel de alta calidad. Máximo agarre y protección.', 79.99, 99.99, 'guantes', 'https://images.unsplash.com/photo-1602524206684-bdbb2f917377?w=800&q=80', 4.7, 123, 89, true, true, 20),
  ('Guantes Touring Confort', 'Guantes impermeables ideales para largas distancias. Protección y comodidad garantizada.', 59.99, NULL, 'guantes', 'https://images.unsplash.com/photo-1585487000143-f8e8c23b1b81?w=800&q=80', 4.4, 67, 112, true, false, 0),
  
  -- Chaquetas
  ('Chaqueta Sport Racing', 'Chaqueta deportiva con protecciones certificadas CE. Material resistente a la abrasión.', 189.99, 249.99, 'chaquetas', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80', 4.9, 178, 34, true, true, 24),
  ('Chaqueta Touring Adventure', 'Chaqueta 4 estaciones impermeable con forro térmico extraíble. Perfecta para todo tipo de clima.', 229.99, 299.99, 'chaquetas', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80', 4.7, 145, 23, true, true, 23),
  ('Chaqueta Urban Style', 'Chaqueta urbana con look casual y protecciones ocultas. Perfecta para el día a día.', 129.99, NULL, 'chaquetas', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80', 4.5, 92, 56, true, false, 0),
  
  -- Botas
  ('Botas Sport Track', 'Botas deportivas con protecciones en tobillo y cambio. Suela antideslizante de alto agarre.', 149.99, 199.99, 'botas', 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80', 4.6, 134, 45, true, true, 25),
  ('Botas Adventure Pro', 'Botas de aventura impermeables con membrana Gore-Tex. Perfectas para off-road y touring.', 199.99, NULL, 'botas', 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&q=80', 4.8, 167, 38, true, false, 0),
  
  -- Accesorios
  ('Sistema Bluetooth Com-X', 'Sistema de comunicación Bluetooth para casco. Audio HD y conexión multi-rider.', 119.99, 149.99, 'accesorios', 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=800&q=80', 4.5, 289, 156, true, true, 20),
  ('Soporte Móvil Universal', 'Soporte giratorio 360° para smartphone con carga USB. Compatible con todos los modelos.', 39.99, 49.99, 'accesorios', 'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=800&q=80', 4.3, 412, 234, true, false, 20),
  ('Candado Seguridad Ultra', 'Candado de disco con alarma 120dB. Máxima seguridad anti-robo certificada SRA.', 59.99, NULL, 'accesorios', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 4.7, 178, 89, true, false, 0),
  ('Kit Mantenimiento Premium', 'Kit completo de limpieza y mantenimiento para moto. 8 productos profesionales incluidos.', 49.99, 69.99, 'accesorios', 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80', 4.4, 234, 145, true, false, 29),
  
  -- Más productos
  ('Pantalones Touring Comfort', 'Pantalones impermeables con protecciones CE en rodillas y caderas. Forro térmico extraíble.', 139.99, 179.99, 'pantalones', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', 4.6, 98, 67, true, true, 22),
  ('Maletas Laterales 40L', 'Set de maletas rígidas impermeables con sistema de apertura rápida. Capacidad 40L cada una.', 299.99, NULL, 'accesorios', 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&q=80', 4.8, 145, 34, true, false, 0);

-- Nota: Los productos sin created_by se asignarán al primer gerente que se cree
