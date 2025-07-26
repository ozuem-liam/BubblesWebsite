"use client"

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ErrorComponent } from "@/components/global/Error";
import { LoadingComponent } from "@/components/global/Loading";
import { Text } from "@/components/global/Text";
import { useCategory } from "@/hooks/useCategory";
import { orderFlowService, Item } from "@/lib/order-flow";
import { Category } from "@/lib/category";
import { CategoryItems } from "@/components/sections/order-flow/CategoryItems";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { useOrderFlow } from "@/hooks/useOrderFlow";

export default function CategoriesPage() {
  const { serviceId } = useParams();
  const { categories, service, vendorId, loading, error } = useCategory(serviceId as string);
  const [categoryItems, setCategoryItems] = useState<Record<string, Item[]>>({});
  const [itemsLoading, setItemsLoading] = useState(false);
  const [itemsError, setItemsError] = useState<string | null>(null);
  const swiperRefs = useRef<{ [key: string]: any }>({});

  // Cart store logic
  const { cart, addToCart, removeFromCart, updateQuantity } = useOrderFlow()

  useEffect(() => {
    const fetchAllItems = async () => {
      if (!categories || !service) return;
      setItemsLoading(true);
      setItemsError(null);
      const itemsMap: Record<string, Item[]> = {};
      try {
        for (const cat of categories) {
          const response = await orderFlowService.getItemsByCategory(
            vendorId,
            service._id,
            cat._id
          );
          let products: Item[] = [];
          if (Array.isArray(response?.data?.results)) {
            products = response.data.results;
          } else if (Array.isArray((response?.data as any)?.items)) {
            products = (response.data as any).items;
          }
          itemsMap[cat._id] = products;
        }
        setCategoryItems(itemsMap);
      } catch (err: any) {
        setItemsError(err.message || 'Failed to load items');
      } finally {
        setItemsLoading(false);
      }
    };
    if (categories && service) fetchAllItems();
  }, [categories, service, vendorId]);

  if (loading || itemsLoading) return <LoadingComponent fallbackText="Loading categories and items..." />;
  if (error) return <ErrorComponent error={error} />;
  if (itemsError) return <ErrorComponent error={itemsError} />;

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      {service && (
        <div className="mb-6 flex items-center gap-4">
          <div>
            <Text as="h2" style="text-2xl font-bold text-gray-900">{service.name}</Text>
          </div>
        </div>
      )}
      {categories && categories.length > 0 ? (
        categories.map((cat: Category) => (
          <div key={cat._id} className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <Text as="h3" style="text-xl font-semibold text-gray-900">{cat.name}</Text>
            </div>
            <div className="relative">
              {(categoryItems[cat._id] || []).length > 0 ? (
                <>
                  <Swiper
                    spaceBetween={16}
                    slidesPerView={2}
                    breakpoints={{
                      640: { slidesPerView: 2 },
                    }}
                    loop={categoryItems[cat._id].length > 3}
                    // autoplay={{
                    //   delay: 2500,
                    //   disableOnInteraction: false,
                    //   pauseOnMouseEnter: true,
                    // }}
                    modules={[Navigation, Autoplay]}
                    navigation={{
                      nextEl: `.swiper-button-next-${cat._id}`,
                      prevEl: `.swiper-button-prev-${cat._id}`,
                    }}
                    ref={el => { if (el) swiperRefs.current[cat._id] = el; }}
                    className="items-swiper"
                  >
                    {categoryItems[cat._id].map((item: Item) => (
                      <SwiperSlide key={item._id} style={{ width: 'auto' }}>
                        <CategoryItems
                          items={[item]}
                          cart={cart}
                          onAddToCart={addToCart}
                          onRemoveFromCart={removeFromCart}
                          onUpdateQuantity={updateQuantity}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {categoryItems[cat._id].length > 2 && (
                    <>
                      <button
                        className={`swiper-button-prev-${cat._id} absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors`}
                        aria-label='Previous slide'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='w-5 h-5 text-gray-600'
                        >
                          <path
                            fillRule='evenodd'
                            d='M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </button>
                      <button
                        className={`swiper-button-next-${cat._id} absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors`}
                        aria-label='Next slide'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='w-5 h-5 text-gray-600'
                        >
                          <path
                            fillRule='evenodd'
                            d='M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </button>
                    </>
                  )}
                </>
              ) : (
                <Text as="p" style="text-gray-400 text-sm col-span-full">No items in this category.</Text>
              )}
            </div>
          </div>
        ))
      ) : (
        <Text as="p" style="text-gray-400 text-center">No categories found.</Text>
      )}
    </div>
  );
} 