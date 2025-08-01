"use client";

import { useBubbleShopItems } from "../../../hooks/useShops";
import { ErrorComponent } from "@/components/global/Error";
import { LoadingComponent } from "@/components/global/Loading";
import { useParams, useSearchParams } from "next/navigation";
import { CategoryItems } from "../order-flow/CategoryItems";
import { useOrderFlow } from "@/hooks/useOrderFlow";
import { useRouter } from "nextjs-toploader/app";
import { BreadCrumb } from "@/components/global/BreadCrumb";
import { Link, Package, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Pagination } from "@/components/global/Pagination";
import { Button } from "@/components/ui/button";
import { bubblesStoreRoute } from "@/lib/constants/BubbleStore";
import { useCategory } from "@/hooks/useCategory";

export const BrowsedItem = () => {
  const { serviceId } = useParams();
  const { vendorId } = useCategory(serviceId as string);
  const { cart, addToCart, removeFromCart, updateQuantity } =
    useOrderFlow(vendorId);
  const query = useSearchParams();
  const searchQuery = query.get("search") || "";
  const {
    items,
    loading,
    error,
    paginationTotal,
    setPaginationPage,
    paginationPage,
  } = useBubbleShopItems(searchQuery);
  const router = useRouter();
  const breadcrumbItems = [
    {
      isHome: true,
      label: "Home",
      onClick: () => router.push("/dashboard"),
    },
    {
      label: `Search - ${searchQuery}`,
    },
  ];

  if (loading) {
    return <LoadingComponent fallbackText={"Loading amazing shops..."} />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center p-8 md:p-16 text-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-blue-200"
      >
        <div className="p-4 md:p-6 bg-blue-100 rounded-full mb-4 md:mb-6">
          <Package className="w-8 h-8 md:w-12 md:h-12 text-blue-600" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">
          No Item Found
        </h3>
        <p className="text-gray-600 mb-6 md:mb-8 max-w-md md:max-w-lg leading-relaxed text-sm md:text-base">
          Start exploring our amazing products and services to place your first
          order today.
        </p>
        <div className="flex flex-col md:flex-row gap-2 md:gap-3">
          <Button
            onClick={() => router.push(bubblesStoreRoute)}
            className="w-[10rem] h-[2.5rem] flex items-center gap-1 md:gap-2 bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-md hover:bg-blue-700 transition-colors font-medium hover:shadow-xl text-sm md:text-base"
          >
            <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
            Browse Store
          </Button>
          <Button
            onClick={() => router.push("/dashboard/shops")}
            className="w-[10rem] h-[2.5rem] flex items-center gap-1 md:gap-2 bg-white text-blue-600 px-6 py-3 md:px-8 md:py-4 rounded-md hover:bg-blue-50 transition-colors font-medium border border-blue-200 text-sm md:text-base"
          >
            <Star className="w-4 h-4 md:w-5 md:h-5" />
            View shops
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <BreadCrumb breadcrumbItems={breadcrumbItems} />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item, itemIndex) => (
          <CategoryItems
            key={itemIndex}
            items={[item]}
            cart={cart}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
            onUpdateQuantity={updateQuantity}
            loading={loading}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {paginationTotal !== null && paginationTotal > 1 && (
        <Pagination
          totalPageNumber={paginationTotal || 1}
          activePage={paginationPage?.toString()}
          setPageNumber={setPaginationPage}
        />
      )}
    </div>
  );
};

export default BrowsedItem;
