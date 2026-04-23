import { createContext, useContext, useMemo, useState } from "react"
import { Autentikacio } from "./AuthContext";
import { useFetchData } from "./useFetchData";

const ProductContext = createContext(undefined);

export const ProductProvider = ({ children }) => {
    const { getAuthHeader, user } = Autentikacio();
    const vevoId = user?.VevoID || user?.id;

    const { data: products, loading: loadingProducts, refresh: refreshProducts } = useFetchData(user ? "/termek" : null, getAuthHeader());
    const { data: categories, loading: loadingCategories, refresh: refreshCategories} = useFetchData("/kategoria", getAuthHeader());
    const { data: brands, loading: loadingBrands, refresh: refreshBrands} = useFetchData("/termek/brands", getAuthHeader());
    const { data: ratings, refresh: refreshRatings } = useFetchData(vevoId ? `/ertekeles/${vevoId}/osszes` : null, getAuthHeader());
    const loading = loadingProducts || loadingCategories || loadingBrands;

    const refreshAll = () => {
        refreshProducts();
        refreshCategories();
        refreshBrands();
        refreshRatings();
    };

    const value = useMemo(() => ({
    products: products || [],
    categories: categories || [],
    brands: brands || [],
    ratings: ratings || [],
    loading: loadingProducts || loadingCategories || loadingBrands,
    refresh: refreshAll
  }), [products, categories, brands, ratings, loadingProducts]);

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