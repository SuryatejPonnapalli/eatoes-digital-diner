"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Clock, Package, Check, X } from "lucide-react";

// Sample order data
const orderHistory = [
  {
    id: "ORD-7829",
    date: "April 25, 2025",
    time: "12:30 PM",
    status: "Completed",
    total: "$42.97",
    items: [
      { name: "Grilled Salmon", quantity: 1, price: "$22.99" },
      { name: "Bruschetta", quantity: 1, price: "$8.99" },
      { name: "Tiramisu", quantity: 1, price: "$8.99" },
      { name: "Sparkling Water", quantity: 1, price: "$3.99" },
    ],
  },
  {
    id: "ORD-7645",
    date: "April 18, 2025",
    time: "7:15 PM",
    status: "Completed",
    total: "$51.96",
    items: [
      { name: "Beef Tenderloin", quantity: 1, price: "$28.99" },
      { name: "Mozzarella Sticks", quantity: 1, price: "$7.99" },
      { name: "Chocolate Lava Cake", quantity: 1, price: "$9.99" },
      { name: "Red Wine", quantity: 1, price: "$8.99" },
    ],
  },
  {
    id: "ORD-7512",
    date: "April 10, 2025",
    time: "1:45 PM",
    status: "Cancelled",
    total: "$24.97",
    items: [
      { name: "Vegetable Pasta", quantity: 1, price: "$16.99" },
      { name: "Bruschetta", quantity: 1, price: "$8.99" },
    ],
  },
  {
    id: "ORD-7423",
    date: "April 3, 2025",
    time: "6:30 PM",
    status: "Completed",
    total: "$37.97",
    items: [
      { name: "Vegetable Pasta", quantity: 1, price: "$16.99" },
      { name: "Mozzarella Sticks", quantity: 1, price: "$7.99" },
      { name: "Chocolate Lava Cake", quantity: 1, price: "$9.99" },
      { name: "Craft Beer", quantity: 1, price: "$6.99" },
    ],
  },
];

export default function OrderHistory() {
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <Check className="h-5 w-5 text-green-500" />;
      case "Processing":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "Shipping":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "Cancelled":
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

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
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleOrderExpand(order.id)}
              >
                <div className="flex flex-col mb-3 sm:mb-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-lg">{order.id}</span>
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
                    {order.date} at {order.time}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-semibold">{order.total}</span>
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
                          <span>{item.name}</span>
                        </div>
                        <span>{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t flex flex-col sm:flex-row sm:justify-between gap-3">
                    <button
                      className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Receipt
                    </button>
                    {order.status !== "Cancelled" && (
                      <button
                        className="bg-[#A8E6CF] hover:bg-[#97d1bc] text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Reorder
                      </button>
                    )}
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
          <button className="bg-[#A8E6CF] hover:bg-[#97d1bc] text-sm font-medium px-6 py-2 rounded-xl transition-colors duration-200">
            Browse Menu
          </button>
        </div>
      )}
    </div>
  );
}
