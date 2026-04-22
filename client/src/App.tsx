import { Navigate, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import MarketplacePage from "./pages/MarketPlacePage";
import ProductPage from "./pages/ProductPage";
import SignUpPage from "./pages/SignUpPage";

import { useEffect, useState } from "react";
import AdminFelhasznalokPage from "./pages/AdminPage/AdminFelhasznalokPage";
import AdminKategoriakPage from "./pages/AdminPage/AdminKategoriakPage";
import AdminTermekekPage from "./pages/AdminPage/AdminTermekekPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProfileFelhasznaloi from "./pages/ProfilePage/ProfileFelhasznaloi";
import ProfileMegrendelesek from "./pages/ProfilePage/ProfileMegrendelesek";
import CartPage from "./pages/CartPage";
import { Autentikacio } from "./components/AuthContext";

const App = () => {
  const { user, loading, getAuthHeader } = Autentikacio();
  const [productsData, setProductsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsBrands, setProductsBrands] = useState([]);
  const [customersData, setCustomersData] = useState([]);
  const [productUrl, setProductUrl] = useState("");
  const [userRatings, setUserRatings] = useState({});

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:7777/termek", {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Hiba a termékek betöltésénél.");
      const data = await response.json();
      setProductsData(data);
    } catch (error: any) {
      console.error("Termék fetch hiba:", error.message);
      setProductsData([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:7777/kategoria");
      if (!response.ok) throw new Error("Hiba a kategórák betöltésénél.");
      const data = await response.json();
      setCategoriesData(data);
    } catch (error: any) {
      console.error("Kategória fetch hiba:", error.message);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:7777/vevo", {
        method: "GET",
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Hiba a vevők betöltésénél.");
      const data = await response.json();
      setCustomersData(data);
    } catch (error: any) {
      console.error("Vevő fetch hiba:", error.message);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch("http://localhost:7777/termek/brands");
      if (!response.ok) {
        throw new Error("Nem sikerült lekérni a márkákat!");
      }
      const data = await response.json();
      setProductsBrands(data);
    } catch (error: any) {
      console.error("Márka lekérdezési hiba:", error.message);
      setProductsBrands([]);
    }
  };

  const fetchUserRatings = async () => {
    if (!user) return;

    try {
      const vevoId = user.id || user.VevoID;
      const response = await fetch(
        `http://localhost:7777/ertekeles/${vevoId}/osszes`,
        {
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
        },
      );

      if (response.ok) {
        const data = await response.json();
        const ratings = {};
        data.forEach((r) => {
          ratings[r.TermekID] = r.ErtekelesSzam;
        });
        setUserRatings(ratings);
      }
    } catch (error) {
      console.error("Értékelés lekérdezési hiba:", error);
    }
  };

  useEffect(() => {
    if (loading) return;

    const loadAllData = async () => {
      await Promise.all([
        fetchProducts(),
        fetchCategories(),
        fetchBrands(),
        fetchCustomers(),
        fetchUserRatings(),
      ]);
    };

    loadAllData();
  }, [user, loading]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/marketplace" />} />

      <Route
        path="/signin"
        element={!user ? <SignInPage /> : <Navigate to="/marketplace" />}
      />
      <Route
        path="/signup"
        element={!user ? <SignUpPage /> : <Navigate to="/marketplace" />}
      />

      <Route
        path="/marketplace"
        element={user ? <MarketplacePage /> : <Navigate to="/signin" />}
      />
      <Route
        path="/termek/:id"
        element={user ? <ProductPage /> : <Navigate to="/signin" />}
      />
      <Route
        path="/kosar"
        element={user ? <CartPage /> : <Navigate to="/signin" />}
      />

      <Route
        path="/profile"
        element={user ? <ProfilePage /> : <Navigate to="/signin" />}
      >
        <Route index element={<Navigate to="profile" replace />} />
        <Route path="profile" element={<ProfileFelhasznaloi />} />
        <Route path="megrendelesek" element={<ProfileMegrendelesek />} />
      </Route>

      <Route
        path="/admin/dashboard"
        element={user?.Role === "ADMIN" ? <AdminPage /> : <Navigate to="/" />}
      >
        <Route path="felhasznalok" element={<AdminFelhasznalokPage />} />
        <Route path="kategoriak" element={<AdminKategoriakPage />} />
        <Route path="termekek" element={<AdminTermekekPage />} />
      </Route>

      <Route path="/profile" element={<ProfilePage />}>
        <Route path="profile" element={<ProfileFelhasznaloi />} />
        <Route path="megrendelesek" element={<ProfileMegrendelesek />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
  );
};

export default App;
