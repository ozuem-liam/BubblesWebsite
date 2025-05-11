// components/orders/OrderDetails.tsx
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
      <div className="flex justify-center items-center h-64">
        <Text as="p" style="text-white">
          Loading order details...
        </Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <Text as="p" style="text-red-500">
          {error}
        </Text>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-64">
        <Text as="p" style="text-white">
          Order not found
        </Text>
      </div>
    );
  }

  return (
    <div className="bg-[#00112b] rounded-lg p-6 border border-[#1a3b6d]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <Text as="h1" style="text-white text-2xl font-bold">
            Order #{order.order_number}
          </Text>
          <Text as="p" style="text-[#CCD0D4]">
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
          <Text as="p" style="text-white capitalize">
            {order.status}
          </Text>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Items */}
        <div>
          <Text as="h2" style="text-white text-xl font-semibold mb-4">
            Order Items
          </Text>

          <div className="space-y-4">
            {order.itemrequests.map((item: any) => (
              <div
                key={item._id}
                className="flex gap-4 p-3 bg-[#001D48] rounded"
              >
                {item.itemrequest.image && (
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded overflow-hidden">
                    <img
                      src={item.itemrequest.image}
                      alt={item.itemrequest.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <Text as="h3" style="text-white font-medium">
                    {item.itemrequest.name}
                  </Text>
                  <div className="flex justify-between mt-2">
                    <Text as="p" style="text-[#CCD0D4]">
                      Qty: {item.quantity}
                    </Text>
                    <Text as="p" style="text-white">
                      {formatNaira(item.total_price)}
                    </Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <Text as="h2" style="text-white text-xl font-semibold mb-4">
            Order Summary
          </Text>

          <div className="bg-[#001D48] rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <Text as="p" style="text-[#CCD0D4]">
                  Subtotal:
                </Text>
                <Text as="p" style="text-white">
                  {formatNaira(order.sub_total)}
                </Text>
              </div>
              <div className="flex justify-between">
                <Text as="p" style="text-[#CCD0D4]">
                  Delivery Fee:
                </Text>
                <Text as="p" style="text-white">
                  {formatNaira(order.delivery_fee)}
                </Text>
              </div>
              <div className="border-t border-[#1a3b6d] my-2"></div>
              <div className="flex justify-between">
                <Text as="p" style="text-[#CCD0D4] font-bold">
                  Total:
                </Text>
                <Text as="p" style="text-white font-bold text-lg">
                  {formatNaira(order.amount)}
                </Text>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="mt-6">
            <Text as="h2" style="text-white text-xl font-semibold mb-4">
              Delivery Address
            </Text>

            <div className="bg-[#001D48] rounded-lg p-4">
              <Text as="p" style="text-white">
                {order.address}
              </Text>
              {/* <Text as="p" style="text-white">
                {order.delivery_address.city}, {order.delivery_address.state}
              </Text>
              <Text as="p" style="text-white">
                {order.delivery_address.country}
              </Text>
              <Text as="p" style="text-white">
                {order.delivery_address.postal_code}
              </Text> */}
            </div>
          </div>

          {/* Payment Status */}
          <div className="mt-6">
            <Text as="h2" style="text-white text-xl font-semibold mb-4">
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
              <Text as="p" style="text-white capitalize">
                {order.payment_status}
              </Text>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <Link href="/dashboard/orders">
          <Button
            variant="outline"
            className="border-[#bfdbfe] text-[#bfdbfe] hover:bg-[#001D48]"
          >
            Back to Orders
          </Button>
        </Link>
        {/* {order.status !== 'cancelled' && (
          <Button className="bg-red-600 hover:bg-red-700">
            Cancel Order
          </Button>
        )} */}
      </div>
    </div>
  );
};
