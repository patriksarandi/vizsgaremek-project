import { Route, Routes } from "react-router-dom"
import SignInPage from "./pages/SignInPage"
import MarketplacePage from "./pages/MarketPlacePage"
import ProductPage from "./pages/ProductPage";
import SignUpPage from "./pages/SignUpPage";
import WishlistPage from "./pages/WishlistPage";
import ContactPage from "./pages/ContactPage";
import { useEffect, useState } from "react";

const App = () => {
  const productUrl = "product";

  const fetchUsersData = async () => {
    try {
      const response = await fetch("http://localhost:7777/vevo")
      const data = await response.json();
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  useEffect(() => {
    fetchUsersData()
  })

  

  return (
    <Routes>
      <Route path="/" element={<MarketplacePage/>} />
      <Route path="/signin" element={<SignInPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path={productUrl} element={<ProductPage/>} />
      <Route path="/wishlist" element={<WishlistPage/>} />
      <Route path="/contact" element={<ContactPage/>} />
    </Routes>
  )
}

export default App