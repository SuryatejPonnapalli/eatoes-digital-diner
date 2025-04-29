import React from "react";
import { CartType } from "../types/types";

type CartContextType = {
  cart: CartType[];
  setCart: React.Dispatch<React.SetStateAction<CartType[]>>;
};

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export default CartContext;
