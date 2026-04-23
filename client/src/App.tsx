import { Navigate, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import MarketplacePage from "./pages/MarketplacePage";
import ProductPage from "./pages/ProductPage";
import SignUpPage from "./pages/SignUpPage";
import AdminFelhasznalokPage from "./pages/AdminPage/AdminFelhasznalokPage";
import AdminKategoriakPage from "./pages/AdminPage/AdminKategoriakPage";
import AdminTermekekPage from "./pages/AdminPage/AdminTermekekPage";

import AdminPage from "./pages/AdminPage/AdminPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProfileFelhasznaloi from "./pages/ProfilePage/ProfileFelhasznaloi";
import ProfileMegrendelesek from "./pages/ProfilePage/ProfileMegrendelesek";
import CartPage from "./pages/CartPage";
import { Autentikacio } from "./context/AuthContext";
import AdminRendelesekPage from "./pages/AdminPage/AdminMegrendelesek";

const App = () => {
  const { user, loading } = Autentikacio();

  if (loading) return null;

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
        element={
          user?.Role || user?.role === "ADMIN" ? (
            <AdminPage />
          ) : (
            <Navigate to="/" />
          )
        }
      >
        <Route path="felhasznalok" element={<AdminFelhasznalokPage />} />
        <Route path="kategoriak" element={<AdminKategoriakPage />} />
        <Route path="termekek" element={<AdminTermekekPage />} />
        <Route path="rendelesek" element={<AdminRendelesekPage />} />
      </Route>

      <Route path="/profile" element={<ProfilePage />}>
        <Route path="profile" element={<ProfileFelhasznaloi />} />
        <Route path="megrendelesek" element={<ProfileMegrendelesek />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
