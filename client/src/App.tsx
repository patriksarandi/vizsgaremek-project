import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import MarketplacePage from "./pages/MarketPlacePage";
import ProductPage from "./pages/ProductPage";
import SignUpPage from "./pages/SignUpPage";
import WishlistPage from "./pages/WishlistPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import { useEffect, useState } from "react";
import AdminFelhasznalokPage from "./pages/AdminPage/AdminFelhasznalokPage";
import AdminKategoriakPage from "./pages/AdminPage/AdminKategoriakPage";
import AdminTermekekPage from "./pages/AdminPage/AdminTermekekPage";
import AdminPage from "./pages/AdminPage/AdminPage";

const App = () => {
  const [productsData, setProductsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([])
  const [productsBrands, setProductsBrands] = useState([])
  const [customersData, setCustomersData] = useState([])

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:7777/termek");
      if (!response.ok) throw new Error("Hiba a termékek betöltésénél.")
      const data = await response.json();
      setProductsData(data);
    } catch (error: any) {
      console.error("Termék fetch hiba:", error.message);
      setProductsData([])
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:7777/kategoria");
      if (!response.ok) throw new Error("Hiba a kategórák betöltésénél.")
      const data = await response.json();
      setCategoriesData(data);
    } catch (error: any) {
      console.error("Kategória fetch hiba:", error.message)
    }
  }

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:7777/vevo");
      if (!response.ok) throw new Error("Hiba a vevők betöltésénél.")
      const data = await response.json();
      setCustomersData(data);
    } catch (error: any) {
      console.error("Vevő fetch hiba:", error.message)
    }
  }

  const fetchBrands = async () => {
    try {
      const response = await fetch("http://localhost:7777/termek/brands");
      if (!response.ok) {
        throw new Error("Nem sikerült lekérni a márkákat!");
      }
      const data = await response.json();
      setProductsBrands(data)
    } catch (error: any) {
      console.error("Márka lekérdezési hiba:", error.message)
      setProductsBrands([])
    }
  }

  useEffect(() => {
    const loadAllData = async () => {
      await Promise.all([
        fetchProducts(),
        fetchCategories(),
        fetchBrands(),
        fetchCustomers()
      ])
    };

    loadAllData();
  }, []);

  const productUrl = "product";

  return (
    <Routes>
      <Route path="/" element={<MarketplacePage productsData={productsData} categoriesData={categoriesData} productsBrands={productsBrands}/>} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path={productUrl} element={<ProductPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/admin/dashboard" element={<AdminPage/>}>
        <Route path="felhasznalok" element={<AdminFelhasznalokPage customersData={customersData}/>}/>
        <Route path="kategoriak" element={<AdminKategoriakPage categoriesData={categoriesData}/>}/>
        <Route path="termekek" element={<AdminTermekekPage termekAdatok={productsData}/>}/>
      </Route>
    </Routes>
  );
};

export default App;
