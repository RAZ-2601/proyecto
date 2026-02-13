-- Script 001: Crear tabla de usuarios con roles y perfiles
-- Este script crea la estructura base de usuarios con roles (cliente, empleado, gerente)

-- Crear tipo ENUM para roles si no existe
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('cliente', 'empleado', 'gerente');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Crear tabla de perfiles de usuarios
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'cliente' CHECK (role IN ('cliente', 'empleado', 'gerente')),
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para perfiles
-- Los usuarios pueden ver su propio perfil
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Los gerentes pueden ver todos los perfiles
CREATE POLICY "profiles_select_manager" ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'gerente'
    )
  );

-- Los usuarios pueden actualizar su propio perfil (excepto el rol)
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND
    -- Prevenir que usuarios cambien su propio rol
    role = (SELECT role FROM public.profiles WHERE id = auth.uid())
  );

-- Solo los gerentes pueden cambiar roles
CREATE POLICY "profiles_update_role_manager" ON public.profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'gerente'
    )
  );

-- Los usuarios pueden insertar su propio perfil (auto-registro)
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id AND role = 'cliente');

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
