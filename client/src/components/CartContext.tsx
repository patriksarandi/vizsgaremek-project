import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Autentikacio } from "./AuthContext";

const CartContext = createContext();

export const useKosar = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [kosarTetelek, setKosarTetelek] = useState([]);
  const { user, getAuthHeader } = Autentikacio();

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
      //console.log("Kosár elemei:", data.Tetelek || data);
    } catch (error: any) {
      console.error("Hiba a kosár lekérdezésekor:", error);
    }
  };

  const hozzaadasAKosarhoz = async (termekId, mennyiseg = 1) => {
    const vevoId = user?.VevoID || user?.id;
    if (!vevoId) return alert("Kérlek jelentkezz be a vásárláshoz!");

    try {
      const response = await fetch("http://localhost:7777/rendeles/kosartetel",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
          body: JSON.stringify({
            KosarID: Number(vevoId),
            TermekID: Number(termekId),
            TetelMennyiseg: Number(mennyiseg),
          }),
        },
      );

      if (response.ok) {
        fetchKosarTetelek();
        alert("Sikeresen a kosárhoz adva!");
        return true;
      } else {
        const errorData = await response.json();
        console.error("Szerver hiba:", errorData);
      }
    } catch (error) {
      console.error("Kosár hiba:", error);
    }
    return false;
  };

  const updateTermekMennyiseg = async (termekId, valtozas) => {
    const vevoId = user?.VevoID || user?.id;

    try {
      const response = await fetch("http://localhost:7777/rendeles/kosartetel/update",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
          },
          body: JSON.stringify({
            vevoId: Number(vevoId),
            termekId: Number(termekId),
            valtozas: Number(valtozas),
          }),
        },
      );

      if (response.ok) {
        fetchKosarTetelek()
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) fetchKosarTetelek();
    else setKosarTetelek([]);
  }, [user]);

  const osszeg = useMemo(() => {
    return kosarTetelek.reduce((acc, tetel) => {
      const ar = Number(tetel.Termek?.TermekAr || 0);
      const mennyiseg = Number(tetel.TetelMennyiseg || 0);
      return acc + (ar * mennyiseg);
    }, 0);
  }, [kosarTetelek]);


  return (
    <CartContext.Provider
      value={{
        kosarTetelek,
        osszeg,
        hozzaadasAKosarhoz,
        updateTermekMennyiseg,
        refreshKosar: fetchKosarTetelek,
        emptyKosar: () => setKosarTetelek([])
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
