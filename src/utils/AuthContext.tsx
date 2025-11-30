import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import * as jwtDecode from "jwt-decode";

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
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // --- load token sa localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
    setLoading(false);
  }, []);

  // --- login / logout funkcije
  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login", { replace: true });
  };

  // --- auto logout po isteku tokena i inactivity
  useEffect(() => {
    if (!token) return;

    let timeout: ReturnType<typeof setTimeout>;

    // 1️⃣ Logout po JWT isteku
    try {
      const { exp } = (jwtDecode as any)(token) as { exp: number };
      const expireTime = exp * 1000 - Date.now(); // ms do isteka

      if (expireTime <= 0) {
        logout();
        return;
      }

      timeout = setTimeout(logout, expireTime);
    } catch (err) {
      console.error("Invalid token, logging out");
      logout();
    }

    // 2️⃣ Logout posle neaktivnosti (30 min)
    const inactivityTime = 30 * 60 * 1000; // 30 min
    let inactivityTimeout = setTimeout(logout, inactivityTime);

    const resetInactivity = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(logout, inactivityTime);
    };

    window.addEventListener("mousemove", resetInactivity);
    window.addEventListener("keydown", resetInactivity);

    return () => {
      clearTimeout(timeout);
      clearTimeout(inactivityTimeout);
      window.removeEventListener("mousemove", resetInactivity);
      window.removeEventListener("keydown", resetInactivity);
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
