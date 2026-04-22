import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");


    if (savedUser && token && savedUser !== null) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Hibás mentett adatok, törlés...")
        localStorage.clear();
      }
    }

    setLoading(false);
  }, [])


  const login = (userData, token) => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      navigate("/");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signin");
  };

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, getAuthHeader, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const Autentikacio = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Hiba történt! (useAuth)");
  }
  return context;
};