import { useState } from "react";
import CartContext from "./CartContext";
import { CartType } from "../types/types";

const CartContextProvider = ({ children }: { children: any }) => {
  const [cart, setCart] = useState<CartType[]>([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
