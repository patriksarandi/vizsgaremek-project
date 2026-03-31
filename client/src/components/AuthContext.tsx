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

  const getRole = () => {
    const userDataString = localStorage.getItem("user")
    if (!userDataString) return null;
    const userData = JSON.parse(userDataString);
    return userData.Role
  }

  const login = (userData) => {
    if (userData) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/")
    }
  };

  const logout = () => {
    if (user) {
      console.log(`${user.VevoNev} kijelentkezett.`);
    }

    localStorage.removeItem("user");
    setUser(null);

    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
