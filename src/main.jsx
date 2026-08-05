import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { FavoritesProvider } from "./components/Onlineshop/context/FavoritesContext";

import { ShopAuthProvider } from "./components/Onlineshop/context/ShopAuthContext";

import { CartProvider } from "./components/Onlineshop/context/CartContext";

import "./styles/globals.css";
import "./styles/variables.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ShopAuthProvider>
        <FavoritesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FavoritesProvider>
      </ShopAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);