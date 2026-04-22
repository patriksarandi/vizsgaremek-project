import { createContext, useContext, useMemo, useState } from "react"
import { Autentikacio } from "./AuthContext";
import { useFetchData } from "./useFetchData";

const ProductContext = createContext(undefined);

export const ProductProvider = ({ children }) => {
    const { getAuthHeader, user } = Autentikacio();
    const { data: products, loading: loadingProducts, refresh: refreshProducts } = useFetchData(user ? "/termek" : null, getAuthHeader());
    const { data: categories, loading: loadingCategories, refresh: refreshCategories} = useFetchData("/kategoria", getAuthHeader());
    const { data: brands, loading: loadingBrands, refresh: refreshBrands} = useFetchData("/termek/brands", getAuthHeader());
    
    const loading = loadingProducts || loadingCategories || loadingBrands;

    const refreshAll = () => {
        refreshProducts();
        refreshCategories();
        refreshBrands();
    };

    const value = useMemo(() => ({
    products: products || [],
    categories: categories || [],
    brands: brands || [],
    loading,
    refresh: refreshAll
  }), [products, categories, brands, loading]);

  return (
    <ProductContext.Provider value={value}>
        {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error("Hiba a Product Provider-rel.");
    return context;
}