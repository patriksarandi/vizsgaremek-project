import { API_BASE_URL } from "../lib/api";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Autentikacio } from "./AuthContext";

const CartContext = createContext();

export const useKosar = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [kosarTetelek, setKosarTetelek] = useState(() => {
    const mentettKosar = localStorage.getItem("onfret_kosar");
    return mentettKosar ? JSON.parse(mentettKosar) : [];
  });

  useEffect(() => {
    if (kosarTetelek.length > 0) {
      localStorage.setItem("onfret_kosar", JSON.stringify(kosarTetelek));
    }
  }, [kosarTetelek]);

  const { user, getAuthHeader } = Autentikacio();

  const fetchKosarTetelek = async () => {
    const id = user?.VevoID || user?.id;
    if (!id) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/rendeles/kosartetel/${id}`,
        {
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
        },
      );
      const data = await response.json();

      let finalData = [];
      if (Array.isArray(data)) {
        finalData = data;
      } else if (data && Array.isArray(data.Tetelek)) {
        finalData = data.Tetelek;
      }

      setKosarTetelek(finalData);
    } catch (error) {
      console.error("Hiba a kosár lekérdezésekor:", error);
      setKosarTetelek([]);
    }
  };

  const hozzaadasAKosarhoz = async (termekId, mennyiseg = 1) => {
    const vevoId = user?.VevoID || user?.id;
    if (!vevoId) return alert("Kérlek jelentkezz be a vásárláshoz!");

    try {
      const response = await fetch(
        `${API_BASE_URL}/rendeles/kosartetel`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
          body: JSON.stringify({
            VevoID: Number(vevoId),
            KosarID: Number(vevoId),
            TermekID: Number(termekId),
            TetelMennyiseg: Number(mennyiseg),
          }),
        },
      );

      if (response.ok) {
        await fetchKosarTetelek();
        alert("Sikeresen a kosárhoz adva!");
        return true;
      } else {
        const errorData = await response.json();
        console.error("Szerver hiba (400):", errorData);
        alert(`Hiba: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Kosár hiba:", error);
    }
    return false;
  };

  const updateTermekMennyiseg = async (termekId, valtozas) => {
    const vevoId = user?.VevoID || user?.id;

    try {
      const response = await fetch(
        `${API_BASE_URL}/rendeles/kosartetel/update`,
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
        fetchKosarTetelek();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) fetchKosarTetelek();
    else setKosarTetelek([]);
    localStorage.removeItem("onfret_kosar");
  }, [user]);

  const osszeg = useMemo(() => {
    if (!Array.isArray(kosarTetelek)) return 0;

    return kosarTetelek.reduce((acc, tetel) => {
      const ar = Number(tetel?.Termek?.TermekAr) || 0;
      const mennyiseg = Number(tetel?.TetelMennyiseg) || 0;

      return acc + ar * mennyiseg;
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
        emptyKosar: () => {
          setKosarTetelek([]);
          localStorage.removeItem("onfret_kosar");
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
