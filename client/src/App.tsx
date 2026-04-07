import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import MarketplacePage from "./pages/MarketPlacePage";
import ProductPage from "./pages/ProductPage";
import SignUpPage from "./pages/SignUpPage";
import WishlistPage from "./pages/WishlistPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import { useEffect, useState } from "react";

const App = () => {
  const [productsData, setProductsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([])
  const [customersData, setCustomersData] = useState([])

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:7777/termek");
      const data = await response.json();
      setProductsData(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:7777/kategoria");
      const data = await response.json();
      setCategoriesData(data);
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:7777/vevo");
      const data = await response.json();
      setCustomersData(data);
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchCustomers();
  });

  const productUrl = "product";

  return (
    <Routes>
      <Route path="/" element={<MarketplacePage productsData={productsData} categoriesData={categoriesData}/>} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path={productUrl} element={<ProductPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/admin/dashboard" element={<AdminPage productsData={productsData} setProductsData={setProductsData} categoriesData={categoriesData} customersData={customersData} setCustomersData={setCustomersData} />} />
    </Routes>
  );
};

export default App;
