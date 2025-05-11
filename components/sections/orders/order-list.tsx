"use client";

import Link from "next/link";
import { useOrders } from "../../../hooks/useOrders";
import { formatNaira } from "../../../lib/utils";
import { format } from "date-fns";

export const OrdersList = () => {
  const { orders, loading, error } = useOrders();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-white">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-[#CCD0D4] mb-4">No orders found</p>
        <Link href="/products">
          <button className="bg-[#bfdbfe] text-[#001D48] px-4 py-2 rounded-md hover:bg-[#a3c4fd]">
            Browse Products
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Link
          key={order._id}
          href={`/dashboard/orders/${order._id}`}
          className="block bg-[#00112b] rounded-lg p-4 border border-[#1a3b6d] hover:border-[#bfdbfe] transition-colors"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-medium">
                Order #{order.order_number}
              </h3>
              <p className="text-[#CCD0D4] text-sm">
                {format(new Date(order.createdAt), "MMM dd, yyyy - hh:mm a")}
              </p>
            </div>

            <div className="flex flex-col sm:items-end">
              <p className="text-white font-bold">
                {formatNaira(order.amount)}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    String(order.status) === "completed" ||
                    String(order.status) === "delivered"
                      ? "bg-green-500"
                      : order.status === "cancelled"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                ></span>
                <span className="text-[#CCD0D4] text-sm capitalize">
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
