import { useContext } from "react";
import CartContext from "../context/CartContext";
import { MenuData } from "../types/types";

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("No cart context found.");
  }

  const { cart, setCart } = context;

  const addItem = (item: MenuData) => {
    setCart((prev) => {
      const existingItem = prev.find((p) => p.itemName == item.itemName);
      if (existingItem) {
        return prev.map((p) =>
          p.itemName === item.itemName ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const increaseQuantity = (item: MenuData) => {
    setCart((prev) =>
      prev.map((p) =>
        p.itemName === item.itemName ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const decreaseQuantity = (item: MenuData) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.itemName === item.itemName ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const removeItem = (item: MenuData) => {
    setCart((prev) => prev.filter((p) => p.itemName !== item.itemName));
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  };
};

export default useCart;
