import { createContext, useContext, useEffect, useState } from "react";
import { Autentikacio } from "./AuthContext";

const CartContext = createContext();

export const useKosar = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [kosarTetelek, setKosarTetelek] = useState([]);
  const { user, getAuthHeader } = Autentikacio();

  const emptyKosar = () => setKosarTetelek([]);

  const fetchKosarTetelek = async () => {
    const vevoId = user?.VevoID || user?.id;

    if (!vevoId) return;

    try {
      const response = await fetch(
        `http://localhost:7777/rendeles/kosartetel/${vevoId}`,
        {
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
        },
      );
      const data = await response.json();
      setKosarTetelek(data.Tetelek || data || []);
      console.log("Kosár elemei:", data.Tetelek || data);
    } catch (error: any) {
      console.error("Hiba a kosár lekérdezésekor:", error);
    }
  };

  const updateTermekMennyiseg = async (termekId: number, valtozas: number) => {
    const vevoId = user?.VevoID || user?.id;

    if (!vevoId || !termekId) {
        console.error("Hiba: Hiányzó felhasználói vagy termék adatok!", {vevoId, termekId});
        return;
    }
    
    try {
      const response = await fetch(
        "http://localhost:7777/rendeles/kosartetel/update",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
          body: JSON.stringify({
            vevoId: Number(vevoId),
            termekId: Number(termekId),
            valtozas: Number(valtozas),
          }),
        },
      );

      if (response.ok) {
        refreshKosar();
      }
    } catch (error: any) {
      console.error("Hiba a módosítás során:", error);
    }
  };

  const handleKosarTetel = async (
    kosarId: number,
    termekId: number,
    tetelMennyiseg: number,
  ) => {
    const vevoId = user?.VevoID || user?.id;

    if (!vevoId) return;

    try {
      const response = await fetch(
        "http://localhost:7777/rendeles/kosartetel",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            kosarId: kosarId,
            termekId: termekId,
            tetelMennyiseg: tetelMennyiseg,
          }),
        },
      );
      
      if (response.ok) {
        refreshKosar();
      }

    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchKosarTetelek();
    } else {
      setKosarTetelek([]);
    }
  }, [user]);

  const refreshKosar = () => fetchKosarTetelek();

  return (
    <CartContext.Provider
      value={{ kosarTetelek, emptyKosar, fetchKosarTetelek, updateTermekMennyiseg, refreshKosar, handleKosarTetel }}
    >
      {children}
    </CartContext.Provider>
  );
};
