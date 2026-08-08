import { Routes, Route } from "react-router-dom";

import Home from "../components/Website/home/Home";
import Momentry from "../components/Website/Momentry/Momentry";
import Contact from "../components/Website/contact/Contact";
import Kooperationen from "../components/Website/Kooperationen/Kooperationen";

import NewsletterAbmelden from "../components/Website/NewsletterAbmelden/NewsletterAbmelden";

import Datenschutz from
  "../components/Website/legal/Datenschutz";

import Impressum from
  "../components/Website/legal/Impressum";

import OnlineShop from "../components/Onlineshop/pages/OnlineShop";
import ShopLogin from "../components/Onlineshop/pages/ShopLogin";
import ShopRegister from "../components/Onlineshop/pages/ShopRegister";
import ForgotPassword from "../components/Onlineshop/pages/ForgotPassword";
import ShopAccount from "../components/Onlineshop/pages/ShopAccount";
import Reiseguides from "../components/Onlineshop/pages/Reiseguides";
import ReiseguideDetail from "../components/Onlineshop/pages/ReiseguideDetail";
import Favoriten from "../components/Onlineshop/pages/Favoriten";
import NewsletterConfirmed from "../components/Onlineshop/pages/NewsletterConfirmed";
import Warenkorb from "../components/Onlineshop/pages/Warenkorb";
import CheckoutSuccess from "../components/Onlineshop/pages/CheckoutSuccess";

import ShopProtectedRoute from
  "../components/Onlineshop/auth/ShopProtectedRoute";

function AppRouter() {
  return (
    <Routes>
      {/* Website */}
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/momentry"
        element={<Momentry />}
      />

      <Route
        path="/kooperationen"
        element={<Kooperationen />}
      />

      <Route
        path="/kontakt"
        element={<Contact />}
      />

      {/* Rechtliches */}
      <Route
        path="/datenschutz"
        element={<Datenschutz />}
      />

      <Route
        path="/impressum"
        element={<Impressum />}
      />

      {/* Online-Shop */}
      <Route
        path="/shop"
        element={<OnlineShop />}
      />

      <Route
        path="/shop/reiseguides"
        element={<Reiseguides />}
      />

      <Route
        path="/shop/reiseguides/:slug"
        element={<ReiseguideDetail />}
      />

      <Route
        path="/shop/favoriten"
        element={<Favoriten />}
      />

      <Route
        path="/shop/warenkorb"
        element={<Warenkorb />}
      />

      <Route
        path="/shop/checkout-erfolgreich"
        element={<CheckoutSuccess />}
      />

      <Route
        path="/newsletter-bestaetigt"
        element={<NewsletterConfirmed />}
      />

      {/* Kundenkonto */}
      <Route
        path="/shop/login"
        element={<ShopLogin />}
      />

      <Route
        path="/newsletter-abmelden"
        element={<NewsletterAbmelden />}
      />

      <Route
        path="/shop/registrieren"
        element={<ShopRegister />}
      />

      <Route
        path="/shop/passwort-vergessen"
        element={<ForgotPassword />}
      />

      <Route
        path="/shop/konto"
        element={
          <ShopProtectedRoute>
            <ShopAccount />
          </ShopProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRouter;