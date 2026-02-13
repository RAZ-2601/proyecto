"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "cliente" | "empleado" | "gerente";
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  const fetchUserProfile = useCallback(async (authUser: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role, first_name, last_name")
        .eq("id", authUser.id)
        .single();

      if (error) {
        console.error("[v0] Error fetching profile:", error);
        return null;
      }

      return {
        id: authUser.id,
        name: profile?.first_name || authUser.email?.split("@")[0] || "Usuario",
        email: authUser.email || "",
        role: profile?.role || "cliente",
      } as User;
    } catch (err) {
      console.error("[v0] Error in fetchUserProfile:", err);
      return null;
    }
  }, [supabase]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user).then(setUser);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const profile = await fetchUserProfile(session.user);
        setUser(profile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, fetchUserProfile]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("[v0] Login error:", error);
        return false;
      }

      if (data.user) {
        const profile = await fetchUserProfile(data.user);
        setUser(profile);
        return true;
      }

      return false;
    } catch (err) {
      console.error("[v0] Login exception:", err);
      return false;
    }
  }, [supabase, fetchUserProfile]);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo:
              process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
              `${window.location.origin}/auth/callback`,
            data: {
              first_name: name,
              role: "cliente",
            },
          },
        });

        if (error) {
          console.error("[v0] Register error:", error);
          return false;
        }

        if (data.user) {
          const profile = await fetchUserProfile(data.user);
          setUser(profile);
          return true;
        }

        return false;
      } catch (err) {
        console.error("[v0] Register exception:", err);
        return false;
      }
    },
    [supabase, fetchUserProfile]
  );

  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("[v0] Logout error:", err);
    }
  }, [supabase, router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
