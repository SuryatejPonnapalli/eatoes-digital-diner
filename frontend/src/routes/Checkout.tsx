import { useContext, useEffect, useState } from "react";
import CartContext from "../context/CartContext";
import { useNavigate } from "react-router";
import useCart from "../hooks/cartHooks";
import { CartType } from "../types/types";
import { Trash, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import axios from "axios";

export default function Checkout() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderAcceptResponse, setOrderAcceptResponse] = useState(false);

  const context = useContext(CartContext);
  const navigate = useNavigate();
  if (!context) throw new Error("No context");
  const { cart } = context;

  const { increaseQuantity, decreaseQuantity, clearCart, removeItem } =
    useCart();

  const findTotalCost = () => {
    setTotalPrice(
      cart.reduce(
        (acc: number, item: CartType) => acc + item.cost * item.quantity,
        0
      )
    );
  };

  const handleAcceptOrder = async () => {
    const trimmedItems = cart.map(({ itemName, cost, quantity }) => ({
      itemName,
      cost,
      quantity,
    }));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/order/create-order`,
        { cart: trimmedItems, totalPrice: totalPrice },
        { withCredentials: true }
      );
      if (response.data.statusCode === 200) {
        setOrderAcceptResponse(true);
        setTimeout(() => {
          clearCart();
          navigate("/history");
        }, 3000);
      }
    } catch (error: any) {
      if (error?.status === 401) {
        alert("Login to checkout(Click ok to redirect to login....)");
        navigate("/login", { state: "/checkout" });
      }
    }
  };

  useEffect(() => {
    findTotalCost();
  }, [cart]);

  return orderAcceptResponse ? (
    <div className="max-w-xl mx-auto mt-20 bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Order Confirmed(You will be redirected)
      </h2>

      <div className="divide-y">
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between py-3">
            <div>
              <p className="font-medium">{item.itemName}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p>₹{(item.quantity * item.cost).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-gray-700">
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="container pt-20 pb-20 mx-auto py-12 px-4 md:px-6 lg:px-8 max-w-7xl">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 after:content-[''] after:block after:w-20 after:h-1 after:bg-[#A8E6CF] after:mt-2">
        Checkout
      </h2>
      {cart.length > 0 ? (
        <div className="flex flex-col w-full gap-6 shadow-2xl drop-shadow-2xl px-4 py-4 rounded-2xl">
          {cart.map((item: CartType, index: number) => (
            <div key={index} className="flex flex-row  w-full justify-between">
              <div className="text-2xl mt-1">{item.itemName}</div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-row bg-[#A8E6CF] hover:bg-[#97d1bc] text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-200 w-full justify-between items-center">
                    <div onClick={() => decreaseQuantity(item)}>-</div>
                    <div>{item.quantity}</div>
                    <div onClick={() => increaseQuantity(item)}>+</div>
                  </div>
                  <Trash
                    className="text-red-500"
                    onClick={() => {
                      removeItem(item);
                    }}
                  />
                </div>
                <div>₹{item.cost * item.quantity}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-gray-500 mb-2">
            You haven't placed any orders yet
          </div>
          <Link
            to="/menu"
            className="bg-[#A8E6CF] hover:bg-[#97d1bc] text-sm font-medium px-6 py-2 rounded-xl transition-colors duration-200"
          >
            Browse Menu
          </Link>
        </div>
      )}
      {totalPrice > 0 && (
        <div className="fixed bottom-25 right-5">
          <div
            className="flex flex-row items-center gap-8 w-full bg-[#A8E6CF] hover:bg-[#97d1bc] px-4 py-4 rounded-2xl"
            onClick={() => {
              handleAcceptOrder();
            }}
          >
            <div className="flex flex-col">
              <p className="text-lg">₹{totalPrice}</p>
              <p className="text-xs font-extralight">Total</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <p>Checkout</p>
              <ChevronRight />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
