"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  level: "fundamental" | "medio" | "professor";
  idade?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  signup: (
    email: string,
    password: string,
    name: string,
    level: "fundamental" | "medio" | "professor",
    idade: number
  ) => Promise<User | null>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signup = async (
    email: string,
    password: string,
    name: string,
    level: "fundamental" | "medio" | "professor",
    idade: number
  ): Promise<User | null> => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: password, name, idade, level }),
      });

      if (!response.ok) throw new Error("Erro ao criar usuário");

      const data = await response.json();

      const newUser: User = {
        id: data._id,
        email: data.email,
        name: data.name,
        idade: data.idade,
        avatar: "/placeholder.svg?height=40&width=40",
        level: data.level,
      };

      // Salva usuário localmente, mas **não força login automático**
      setIsLoading(false);

      // Aqui você pode redirecionar o usuário para a tela de confirmação
      // Ex.: router.push("/confirm-email") no componente que chamou signup

      return newUser;
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      return null;
    }
  };

  const login = async (email: string, password: string): Promise<User | null> => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/users"); // GET all users
      const users = await response.json();

      const found = users.find((u: any) => u.email === email && u.senha === password);

      if (!found) {
        setIsLoading(false);
        return null;
      }

      const loggedUser: User = {
        id: found._id,
        email: found.email,
        name: found.name,
        idade: found.idade,
        avatar: "/placeholder.svg?height=40&width=40",
        level: found.level,
      };

      // ✅ Login direto: ignora confirmação de e-mail
      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      setIsLoading(false);
      return loggedUser;
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
