"use client";

import { useBubbleShopItems } from "../../../hooks/useShops";
import { ErrorComponent } from "@/components/global/Error";
import { LoadingComponent } from "@/components/global/Loading";
import { CategoryItems } from "../order-flow/CategoryItems";
// import { useOrderFlow } from "@/hooks/useOrderFlow";
import { Text } from "@/components/global/Text";
import { MaxScreenWrapper } from "@/components/global/MaxScreen";
import { RevealAnimation } from "@/components/global/Reveal";
import { Button } from "@/components/ui/button";
import { useRouter } from "nextjs-toploader/app";
import { bubblesStoreRoute } from "@/lib/constants/BubbleStore";
// import { useAuth } from "@/contexts/auth-context";
import { useParams } from "next/navigation";
import { useCategory } from "@/hooks/useCategory";

export const StoreProducts = () => {
  const { serviceId } = useParams();
  const { vendorId } = useCategory(serviceId as string);
  // const { cart, addToCart, removeFromCart, updateQuantity } =
  //   useOrderFlow(vendorId);
  const { items, loading, error } = useBubbleShopItems("");
  // const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Generic function to handle authentication-required actions
  // const withAuthCheck = <T extends any[]>(
  //   callback: (...args: T) => void,
  //   redirectOnFail: boolean = true
  // ) => {
  //   return (...args: T) => {
  //     if (!isAuthenticated) {
  //       if (redirectOnFail) {
  //         router.push(bubblesStoreRoute);
  //       }
  //       return;
  //     }
  //     callback(...args);
  //   };
  // };

  const handleButtonClick = () => router.push(bubblesStoreRoute);

  // Create authenticated versions of the handlers
  // const handleAddToCart = withAuthCheck((item: any) => addToCart(item));
  // const handleRemoveFromCart = withAuthCheck(
  //   (itemId: string) => removeFromCart(itemId),
  //   false
  // );
  // const handleUpdateQuantity = withAuthCheck(
  //   (itemId: string, quantity: number) => updateQuantity(itemId, quantity),
  //   false
  // );

  if (loading) {
    return <LoadingComponent fallbackText={"Loading amazing products..."} />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  // Show only first 8 items
  const displayItems = items.slice(0, 8);

  return (
    <div className="lg:px-[2.5rem] xl:px-[5.5rem] px-4 py-16 bg-gray-50">
      <MaxScreenWrapper>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <RevealAnimation style="w-fit mb-4">
                <Text style="lg:text-start text-center border-l-2 border-blue-600 w-fit px-[16px] py-[8px] bg-blue-50 rounded-r-[8px] text-blue-700 text-[14px] font-[500]">
                  Featured Products
                </Text>
              </RevealAnimation>
              <RevealAnimation>
                <Text
                  as="h2"
                  style="lg:text-start text-center text-[32px] font-[700] leading-[120%] text-gray-900 mb-2"
                >
                  Shop Our Latest Products
                </Text>
              </RevealAnimation>
              <RevealAnimation>
                <Text style="lg:text-start text-center text-gray-600 text-[15px] font-[400] leading-[140%]">
                  Discover our curated selection of high-quality products
                </Text>
              </RevealAnimation>
            </div>
            <RevealAnimation>
              <Button
                onClick={handleButtonClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              >
                View All Products
              </Button>
            </RevealAnimation>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayItems.map((item, itemIndex) => (
              <CategoryItems
                key={itemIndex}
                items={[item]}
                // cart={cart}
                // onAddToCart={handleAddToCart}
                // onRemoveFromCart={handleRemoveFromCart}
                // onUpdateQuantity={handleUpdateQuantity}
                loading={loading}
              />
            ))}
          </div>
        </div>
      </MaxScreenWrapper>
    </div>
  );
};
