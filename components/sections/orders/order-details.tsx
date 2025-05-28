"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "../../../contexts/auth-context";
import { Text } from "../../../components/global/Text";
import { Button } from "../../../components/ui/button";
import { formatNaira } from "../../../lib/utils";
import { format } from "date-fns";
import Link from "next/link";
import { OrderDetailsData, orderService } from "../../../lib/order";
import { Skeleton } from "../../../components/ui/skeleton";

export const OrderDetails = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [order, setOrder] = useState<OrderDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!token || !id) return;

      try {
        setLoading(true);
        const response = await orderService.getOrderById(id as string, token);
        setOrder(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [token, id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48 bg-gray-200" />
            <Skeleton className="h-4 w-64 bg-gray-200" />
          </div>
          <Skeleton className="h-6 w-24 bg-gray-200" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32 bg-gray-200" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                <Skeleton className="w-16 h-16 bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4 bg-gray-200" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16 bg-gray-200" />
                    <Skeleton className="h-4 w-20 bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-6">
            <div>
              <Skeleton className="h-6 w-32 bg-gray-200 mb-4" />
              <div className="space-y-3 p-4 border border-gray-200 rounded-lg">
                <Skeleton className="h-4 w-full bg-gray-200" />
                <Skeleton className="h-4 w-full bg-gray-200" />
                <Skeleton className="h-px w-full bg-gray-200 my-2" />
                <Skeleton className="h-6 w-full bg-gray-200" />
              </div>
            </div>
            
            <div>
              <Skeleton className="h-6 w-32 bg-gray-200 mb-4" />
              <Skeleton className="h-20 w-full bg-gray-200 rounded-lg" />
            </div>
            
            <div>
              <Skeleton className="h-6 w-32 bg-gray-200 mb-4" />
              <Skeleton className="h-4 w-24 bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-red-200 bg-red-50 rounded-lg">
        <Text as="p" style="text-red-600 mb-4">
          {error}
        </Text>
        <button 
          onClick={() => window.location.reload()}
          className="text-sm bg-white border border-red-200 text-red-600 px-4 py-2 rounded hover:bg-red-50 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!order) {
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
        <Text as="h3" style="text-lg font-medium text-gray-700 mb-2">
          Order not found
        </Text>
        <Link 
          href="/dashboard/orders"
          className="bg_linear-gradient text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
        <div>
          <Text as="h1" style="text-gray-800 text-xl font-bold">
            Order #{order.order_number}
          </Text>
          <Text as="p" style="text-gray-500 text-sm">
            Placed on {format(new Date(order.createdAt), "MMMM dd, yyyy")}
          </Text>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-block w-3 h-3 rounded-full ${
              order.status === "completed" || order.status === "delivered"
                ? "bg-green-500"
                : order.status === "cancelled"
                ? "bg-red-500"
                : "bg-yellow-500"
            }`}
          ></span>
          <Text as="p" style="text-gray-700 capitalize">
            {order.status.replace(/-/g, ' ')}
          </Text>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Items */}
        <div>
          <Text as="h2" style="text-gray-800 text-lg font-semibold mb-4">
            Order Items
          </Text>

          <div className="space-y-4">
            {order.itemrequests.map((item: any) => (
              <div
                key={item._id}
                className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
              >
                {item.itemrequest.image && (
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                    <img
                      src={item.itemrequest.image}
                      alt={item.itemrequest.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <Text as="h3" style="text-gray-800 text-sm font-medium">
                    {item.itemrequest.name}
                  </Text>
                  <div className="flex justify-between mt-2">
                    <Text as="p" style="text-gray-500 text-xs">
                      Qty: {item.quantity}
                    </Text>
                    <Text as="p" style="text-gray-800 font-medium">
                      {formatNaira(item.total_price)}
                    </Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div>
            <Text as="h2" style="text-gray-800 text-lg font-semibold mb-4">
              Order Summary
            </Text>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Text as="p" style="text-gray-600">
                    Subtotal:
                  </Text>
                  <Text as="p" style="text-gray-800">
                    {formatNaira(order.sub_total)}
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text as="p" style="text-gray-600">
                    Delivery Fee:
                  </Text>
                  <Text as="p" style="text-gray-800">
                    {formatNaira(order.delivery_fee)}
                  </Text>
                </div>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="flex justify-between">
                  <Text as="p" style="text-gray-600 font-bold">
                    Total:
                  </Text>
                  <Text as="p" style="text-gray-800 font-bold text-lg">
                    {formatNaira(order.amount)}
                  </Text>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <Text as="h2" style="text-gray-800 text-lg font-semibold mb-4">
              Delivery Address
            </Text>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <Text as="p" style="text-gray-800">
                {order.address}
              </Text>
            </div>
          </div>

          {/* Payment Status */}
          <div>
            <Text as="h2" style="text-gray-800 text-lg font-semibold mb-4">
              Payment Status
            </Text>

            <div className="flex items-center gap-2">
              <span
                className={`inline-block w-3 h-3 rounded-full ${
                  order.payment_status === "paid"
                    ? "bg-green-500"
                    : order.payment_status === "failed"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              ></span>
              <Text as="p" style="text-gray-700 capitalize">
                {order.payment_status.replace(/-/g, ' ')}
              </Text>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Link href="/dashboard/orders">
          <Button
            variant="outline"
            className="bg_linear-gradient border-gray-300 text-white hover:bg-gray-50"
          >
            Back to Orders
          </Button>
        </Link>
      </div>
    </div>
  );
};