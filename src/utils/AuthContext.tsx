// src/utils/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
  token: string | null;
}

interface JwtPayload {
  exp: number; // epoch time u sekundama
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  loading: true,
  token: null,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --- Load token iz localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
    setLoading(false);
  }, []);

  // --- Login / Logout funkcije
  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login", { replace: true }); // React-way redirect
  };

  // --- Auto logout po JWT isteku i inactivity
  useEffect(() => {
    if (!token) return;

    let expireTimeout: ReturnType<typeof setTimeout>;
    let inactivityTimeout: ReturnType<typeof setTimeout>;

    // Logout po JWT isteku
    try {
      const { exp } = jwtDecode(token) as { exp: number };
      const expireTime = exp * 1000 - Date.now();

      if (expireTime <= 0) {
        logout();
        return;
      }

      expireTimeout = setTimeout(logout, expireTime);
    } catch {
      logout();
      return;
    }

    // Logout posle 30 min neaktivnosti
    const inactivityTime = 30 * 60 * 1000; // 30 min
    const resetInactivity = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(logout, inactivityTime);
    };

    inactivityTimeout = setTimeout(logout, inactivityTime);

    window.addEventListener("mousemove", resetInactivity);
    window.addEventListener("keydown", resetInactivity);
    window.addEventListener("click", resetInactivity); // dodato za klik

    return () => {
      clearTimeout(expireTimeout);
      clearTimeout(inactivityTimeout);
      window.removeEventListener("mousemove", resetInactivity);
      window.removeEventListener("keydown", resetInactivity);
      window.removeEventListener("click", resetInactivity);
    };
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        login,
        logout,
        loading,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
