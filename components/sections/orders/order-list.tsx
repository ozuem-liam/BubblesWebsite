"use client";

import Link from "next/link";
import { useOrders } from "../../../hooks/useOrders";
import { formatNaira } from "../../../lib/utils";
import { format } from "date-fns";
import { Skeleton } from "../../../components/ui/skeleton";

export const OrdersList = () => {
  const { orders, loading, error } = useOrders();

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-gray-200" />
                <Skeleton className="h-3 w-48 bg-gray-200" />
              </div>
              <div className="space-y-2 text-right">
                <Skeleton className="h-4 w-24 bg-gray-200 ml-auto" />
                <div className="flex items-center justify-end gap-2">
                  <Skeleton className="h-3 w-3 rounded-full bg-gray-200" />
                  <Skeleton className="h-3 w-16 bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-red-200 bg-red-50 rounded-lg">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="text-sm bg-white border border-red-200 text-red-600 px-4 py-2 rounded hover:bg-red-50 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <svg 
          className="w-16 h-16 text-gray-400 mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-700 mb-2">No orders yet</h3>
        <p className="text-gray-500 mb-6">Your order history will appear here</p>
        <Link 
          href="/products"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <Link
          key={order._id}
          href={`/dashboard/orders/${order._id}`}
          className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-gray-800 text-sm font-medium">
                Order #{order.order_number}
              </h3>
              <p className="text-gray-500 text-xs">
                {format(new Date(order.createdAt), "MMM dd, yyyy - hh:mm a")}
              </p>
            </div>

            <div className="flex flex-col sm:items-end">
              <p className="text-gray-800 font-medium">
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
                <span className="text-gray-500 text-xs capitalize">
                  {order.status.replace(/-/g, ' ')}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};