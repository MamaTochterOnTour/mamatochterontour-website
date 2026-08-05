import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "momentry-shop-cart";

function readStoredCart() {
  try {
    const storedCart =
      window.localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return [];
    }

    const parsedCart = JSON.parse(storedCart);

    return Array.isArray(parsedCart)
      ? parsedCart
      : [];
  } catch (error) {
    console.error(
      "Warenkorb konnte nicht geladen werden:",
      error
    );

    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] =
    useState(readStoredCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error(
        "Warenkorb konnte nicht gespeichert werden:",
        error
      );
    }
  }, [cartItems]);

  const addToCart = useCallback((product) => {
    if (!product?.id) {
      console.error(
        "Produkt kann nicht zum Warenkorb hinzugefügt werden:",
        product
      );

      return;
    }

    setCartItems((currentItems) => {
      const productAlreadyExists =
        currentItems.some(
          (item) =>
            String(item.id) ===
            String(product.id)
        );

      /*
       * Bei digitalen Reiseguides ergibt eine
       * Mehrfachmenge normalerweise keinen Sinn.
       * Deshalb wird jedes Produkt nur einmal gespeichert.
       */
      if (productAlreadyExists) {
        return currentItems;
      }

      return [
  ...currentItems,
  {
    id: product.id,
    slug: product.slug,
    title: product.title,
    shortDescription:
      product.shortDescription || "",
    imageUrl: product.imageUrl,
    price: Number(product.price) || 0,

    /*
     * Rabattgruppe:
     * quantity = Mengenrabatt
     * aida = AIDA-Bundle
     * cruise = Kreuzfahrt-Bundle
     */
    discountGroup:
      product.discountGroup || "quantity",

    addedAt: new Date().toISOString(),
  },
];
    });
  }, []);

  const removeFromCart = useCallback(
    (productId) => {
      setCartItems((currentItems) =>
        currentItems.filter(
          (item) =>
            String(item.id) !==
            String(productId)
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const isInCart = useCallback(
    (productId) =>
      cartItems.some(
        (item) =>
          String(item.id) ===
          String(productId)
      ),
    [cartItems]
  );

  const cartCount = cartItems.length;

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + Number(item.price || 0),
        0
      ),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      cartSubtotal,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,
    }),
    [
      cartItems,
      cartCount,
      cartSubtotal,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;