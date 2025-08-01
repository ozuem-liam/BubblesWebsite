"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { useOrderFlow } from "@/hooks/useOrderFlow";
import { formatNaira } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Item } from "@/lib/order-flow";
import type { Swiper as SwiperType } from "swiper";
import { StaticImageData } from "next/image";
import { ShoppingCart, Star, Truck, Clock, Shield } from "lucide-react";
import { BreadCrumb } from "@/components/global/BreadCrumb";
import { useRouter } from "nextjs-toploader/app";
import { CustomImage } from "@/components/global/Image";
import { useParams } from "next/navigation";
import { useCategory } from "@/hooks/useCategory";

interface ProductDetailsProps {
  product: Item;
  onBack?: () => void;
}

const ProductDetailsPage: React.FC<ProductDetailsProps> = ({
  product,
  onBack,
}) => {
  const { serviceId } = useParams();
  const { vendorId } = useCategory(serviceId as string);
  const { cart, addToCart, removeFromCart, updateQuantity, loading, error } =
    useOrderFlow(vendorId);

  const router = useRouter();

  const breadcrumbItems = [
    {
      isHome: true,
      label: "Home",
      onClick: () => router.push("/dashboard"),
    },
    {
      label: `Details - ${product.name}`,
    },
  ];
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Check if product is in cart using the correct structure
  const cartItem = cart?.items?.find((item) => item.item._id === product._id);
  const quantity = cartItem?.quantity || 0;
  const price = cartItem ? cartItem.price : product.fixed_amount;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(product._id);
    } else {
      updateQuantity(product._id, newQuantity);
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product._id);
  };

  // Handle both string URLs and StaticImageData for images
  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <BreadCrumb breadcrumbItems={breadcrumbItems} />

      {/* Error Alert */}
      {error && (
        <div className="container mx-auto px-3 sm:px-4 pt-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-3 rounded-lg mb-4">
            <p className="text-xs sm:text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Product Images Section */}
          <div className="space-y-3 sm:space-y-4">
            {/* Main Image Swiper */}
            <div className="bg-white border border-gray-200 sm:border-2 rounded-lg sm:rounded-xl overflow-hidden">
              <Swiper
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Thumbs]}
                onSlideChange={(swiper) =>
                  setSelectedImageIndex(swiper.activeIndex)
                }
                className="aspect-square"
              >
                {productImages.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="w-full h-full flex items-center justify-center bg-white p-3 sm:p-6">
                      <CustomImage
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        style="max-w-full max-h-full"
                        imgStyle="object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Thumbnail Swiper */}
            {productImages.length > 1 && (
              <div className="px-1 sm:px-2">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={8}
                  slidesPerView={3}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  breakpoints={{
                    400: { slidesPerView: 4, spaceBetween: 10 },
                    640: { slidesPerView: 5, spaceBetween: 12 },
                    768: { slidesPerView: 4, spaceBetween: 12 },
                  }}
                >
                  {productImages.map((img, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className={`
                        aspect-square rounded-md sm:rounded-lg overflow-hidden cursor-pointer border-2 transition-all
                        ${
                          selectedImageIndex === index
                            ? "border-blue-500 shadow-md"
                            : "border-gray-200 hover:border-gray-300"
                        }
                      `}
                      >
                        <CustomImage
                          src={img}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          style="w-full h-full bg-white p-1 sm:p-2"
                          imgStyle="object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="space-y-4 sm:space-y-6">
            {/* Product Title & Availability */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 sm:border-2">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>
                <div
                  className={`
                  flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-medium self-start
                  ${
                    product.is_available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      product.is_available ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  {product.is_available ? "In Stock" : "Out of Stock"}
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {formatNaira(price)}
                </span>
                {product.express_amount &&
                  product.express_amount !== product.fixed_amount && (
                    <div className="text-xs sm:text-sm text-gray-500">
                      <span className="font-medium">Express:</span>{" "}
                      {formatNaira(product.express_amount)}
                    </div>
                  )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {product.description}
                </div>
              )}
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 sm:border-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                Product Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                  <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
                  <span>Fast Delivery Available</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span>Quality Guaranteed</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 flex-shrink-0" />
                  <span>Premium Product</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 flex-shrink-0" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Add to Cart Section */}
            {product.is_available && (
              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 sm:border-2">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Add to Cart
                  </h3>
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>

                {quantity > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 bg-gray-50 rounded-lg p-3 sm:p-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="h-8 w-8 sm:h-10 sm:w-10 p-0 border-red-300 text-red-600 hover:bg-red-50 rounded-full text-sm sm:text-base"
                      >
                        -
                      </Button>
                      <div className="px-4 sm:px-6 py-2 bg-white rounded-lg border min-w-[60px] text-center">
                        <span className="text-lg sm:text-xl font-semibold text-gray-900">
                          {quantity}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="h-8 w-8 sm:h-10 sm:w-10 p-0 border-green-300 text-green-600 hover:bg-green-50 rounded-full text-sm sm:text-base"
                      >
                        +
                      </Button>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="outline"
                      onClick={handleRemoveFromCart}
                      className="w-full text-red-600 border-red-300 hover:bg-red-50 h-10 sm:h-auto text-sm sm:text-base"
                    >
                      Remove from Cart
                    </Button>

                    {/* Total */}
                    <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700 text-sm sm:text-base">
                          Subtotal:
                        </span>
                        <span className="text-lg sm:text-xl font-bold text-blue-600">
                          {formatNaira(price * quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={handleAddToCart}
                    className="w-full h-11 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm sm:text-base"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                      Add to Cart
                    </div>
                  </Button>
                )}
              </div>
            )}

            {/* Product Meta Information */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 sm:border-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                Product Information
              </h3>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-100 gap-1">
                  <span className="font-medium text-gray-700">Product ID:</span>
                  <span className="text-gray-600 font-mono text-xs break-all">
                    {product._id}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-100 gap-1">
                  <span className="font-medium text-gray-700">Category:</span>
                  <span className="text-gray-600">{product.category}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 gap-1">
                  <span className="font-medium text-gray-700">Service:</span>
                  <span className="text-gray-600">{product.service}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: #3b82f6;
          background: rgba(255, 255, 255, 0.9);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        @media (min-width: 640px) {
          .swiper-button-prev,
          .swiper-button-next {
            width: 44px;
            height: 44px;
          }
        }

        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.05);
        }

        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 0.9rem;
          font-weight: bold;
        }

        @media (min-width: 640px) {
          .swiper-button-prev::after,
          .swiper-button-next::after {
            font-size: 1.1rem;
          }
        }

        .swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        /* Hide navigation buttons on very small screens if needed */
        @media (max-width: 480px) {
          .swiper-button-prev,
          .swiper-button-next {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailsPage;
