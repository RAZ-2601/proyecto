"use client";

import React from "react"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, UserPlus, LogIn, User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function CuentaClient() {
  const { user, isLoggedIn, login, register, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!loginEmail || !loginPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      const ok = await login(loginEmail, loginPassword);
      if (ok) router.push("/");
    } catch {
      setError("Error al iniciar sesion. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!regName || !regEmail || !regPassword || !regConfirm) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (regPassword !== regConfirm) {
      setError("Las contrasenas no coinciden");
      return;
    }
    if (regPassword.length < 6) {
      setError("La contrasena debe tener al menos 6 caracteres");
      return;
    }
    setLoading(true);
    try {
      const ok = await register(regName, regEmail, regPassword);
      if (ok) router.push("/");
    } catch {
      setError("Error al registrar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // If logged in, show profile
  if (isLoggedIn && user) {
    return (
      <div className="px-4 py-12 max-w-lg mx-auto">
        <div className="bg-secondary/50 border border-border rounded-2xl p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-display text-3xl text-foreground tracking-wide mb-1">
            {user.name.toUpperCase()}
          </h1>
          <p className="text-sm text-muted-foreground mb-8">{user.email}</p>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => router.push("/catalogo")}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Ir al catalogo
            </button>
            <button
              type="button"
              onClick={logout}
              className="w-full bg-secondary text-foreground py-3 rounded-xl text-sm font-semibold hover:bg-secondary/80 transition-colors"
            >
              Cerrar sesion
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-12 max-w-md mx-auto">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="font-display text-4xl text-foreground tracking-wide mb-2">
          MI CUENTA
        </h1>
        <p className="text-sm text-muted-foreground">
          {activeTab === "login"
            ? "Inicia sesion para acceder a tu cuenta"
            : "Crea tu cuenta para comenzar a comprar"}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-secondary rounded-xl p-1 mb-6">
        <button
          type="button"
          onClick={() => {
            setActiveTab("login");
            setError("");
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "login"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <LogIn className="w-4 h-4" />
          Iniciar sesion
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("register");
            setError("");
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "register"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <UserPlus className="w-4 h-4" />
          Registrarse
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium p-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      {/* Login form */}
      {activeTab === "login" && (
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="login-email"
              className="block text-xs font-medium text-muted-foreground mb-1.5"
            >
              Correo electronico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="login-email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full bg-secondary text-foreground placeholder:text-muted-foreground rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="block text-xs font-medium text-muted-foreground mb-1.5"
            >
              Contrasena
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Tu contrasena"
                className="w-full bg-secondary text-foreground placeholder:text-muted-foreground rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={
                  showPassword ? "Ocultar contrasena" : "Mostrar contrasena"
                }
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Iniciando sesion..." : "Iniciar sesion"}
          </button>

          <p className="text-center text-xs text-muted-foreground">
            No tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => setActiveTab("register")}
              className="text-primary font-semibold hover:underline"
            >
              Registrate aqui
            </button>
          </p>
        </form>
      )}

      {/* Register form */}
      {activeTab === "register" && (
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="reg-name"
              className="block text-xs font-medium text-muted-foreground mb-1.5"
            >
              Nombre completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="reg-name"
                type="text"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Tu nombre"
                className="w-full bg-secondary text-foreground placeholder:text-muted-foreground rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="reg-email"
              className="block text-xs font-medium text-muted-foreground mb-1.5"
            >
              Correo electronico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="reg-email"
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full bg-secondary text-foreground placeholder:text-muted-foreground rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="reg-password"
              className="block text-xs font-medium text-muted-foreground mb-1.5"
            >
              Contrasena
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="reg-password"
                type={showPassword ? "text" : "password"}
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Minimo 6 caracteres"
                className="w-full bg-secondary text-foreground placeholder:text-muted-foreground rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={
                  showPassword ? "Ocultar contrasena" : "Mostrar contrasena"
                }
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="reg-confirm"
              className="block text-xs font-medium text-muted-foreground mb-1.5"
            >
              Confirmar contrasena
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="reg-confirm"
                type={showPassword ? "text" : "password"}
                value={regConfirm}
                onChange={(e) => setRegConfirm(e.target.value)}
                placeholder="Repite tu contrasena"
                className="w-full bg-secondary text-foreground placeholder:text-muted-foreground rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>

          <p className="text-center text-xs text-muted-foreground">
            Ya tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className="text-primary font-semibold hover:underline"
            >
              Inicia sesion
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
