import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const Autentikacio = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Hiba történt! (useAuth)");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser || savedUser === "null") return null;

    try {
      return JSON.parse(savedUser);
    } catch (error) {
        console.error("Hibás adat:", error)
      return null;
    }
  });

  const login = (userData, token) => {
    if (userData && token) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      navigate("/")
    }
  };

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signin");
  };

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}`} : {};
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
};
