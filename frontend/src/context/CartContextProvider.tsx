import { useEffect, useState } from "react";
import CartContext from "./CartContext";
import { CartType } from "../types/types";

const CART_KEY = "cart";

const CartContextProvider = ({ children }: { children: any }) => {
  const [cart, setCart] = useState<CartType[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
