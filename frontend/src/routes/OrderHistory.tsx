"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Clock, Check, X } from "lucide-react";
import axios from "axios";
import { OrderHistoryType } from "../types/types";
import { Link } from "react-router";
import { format } from "date-fns";
import ErrorComponent from "../components/ErrorComponent";

// Sample order data

export default function OrderHistory() {
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const [orderHistory, setOrderHistory] = useState<OrderHistoryType[]>([]);
  const [loadingState, setLoadingState] = useState(true);
  const [errorState, setErrorState] = useState(false);

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const getOrderHistory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/order/get-orders`,
        { withCredentials: true }
      );
      setOrderHistory(response.data.data.orders);
    } catch (error) {
      setErrorState(true);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    getOrderHistory();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "finished":
        return <Check className="h-5 w-5 text-green-500" />;
      case "processing":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "cancelled":
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  if (errorState) {
    return (
      <ErrorComponent redirectUrl="/login" message="Login to check history." />
    );
  }

  if (loadingState) {
    return (
      <div className="mt-20 px-4">
        Fetching details, please wait...(Might take a while due to render
        backend)
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8 max-w-4xl pt-20 pb-20">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8 after:content-[''] after:block after:w-20 after:h-1 after:bg-[#A8E6CF] after:mt-2">
        Order History
      </h1>

      {orderHistory.length > 0 ? (
        <div className="space-y-4">
          {orderHistory.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              {/* Order Summary Row */}
              <div
                className="flex flex-row sm:items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleOrderExpand(order.id)}
              >
                <div className="flex flex-col mb-3 sm:mb-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-lg">
                      Order ID: #{order.id}
                    </span>
                    <span
                      className={`text-sm px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {format(new Date(order.createdAt), "MMMM dd, yyyy")} at{" "}
                    {format(new Date(order.createdAt), "hh:mm a")}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-semibold">₹{order.totalPrice}</span>
                  {expandedOrders.includes(order.id) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>

              {/* Order Details (Expanded) */}
              {expandedOrders.includes(order.id) && (
                <div className="border-t px-4 py-3 bg-gray-50">
                  <h3 className="font-medium text-sm text-gray-700 mb-2">
                    Order Items
                  </h3>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <div>
                          <span>{item.quantity}x </span>
                          <span>{item.itemName}</span>
                        </div>
                        <span>₹{item.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
    </div>
  );
}
