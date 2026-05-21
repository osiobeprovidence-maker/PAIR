import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  role: "customer" | "vendor" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (userData?: { email: string; name: string; role: "customer" | "vendor" | "admin" }) => void;
  logout: () => void;
  updateRole: (role: "customer" | "vendor" | "admin") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData?: { email: string, name: string, role: "customer" | "vendor" | "admin" }) => {
    if (userData) {
      setUser(userData);
    } else {
      setUser({ name: "Jane Doe", email: "jane@example.com", role: "customer" });
    }
  };
  const logout = () => setUser(null);
  
  const updateRole = (role: "customer" | "vendor" | "admin") => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateRole }}>
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
