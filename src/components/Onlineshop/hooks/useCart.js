import { useContext } from "react";

import CartContext from "../context/CartContext";

function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart muss innerhalb des CartProviders verwendet werden."
    );
  }

  return context;
}

export default useCart;