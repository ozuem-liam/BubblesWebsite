'use client'

import Link from 'next/link'
import { Text } from '@/components/global/Text'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { capitalize } from '@/lib/utils'
import bubblesDesktopStorebanner from '../../../public/bubbles_store_desktop_img.jpeg'
import { CustomImage } from '@/components/global/Image'
import { Button } from '@/components/ui/button'
import { useBubbleShopItems, useShops } from '@/hooks/useShops'
import { ShopList } from '../shop/ShopList'
import { LoadingComponent } from '@/components/global/Loading'
import { bubblesStoreRoute } from '@/lib/constants/BubbleStore'
import { CategoryItems } from '../order-flow/CategoryItems'
import { useOrderFlow } from '@/hooks/useOrderFlow'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import { useAddress } from '@/hooks/useAddress'
import { useEffect, useState, useRef } from 'react'
import Script from 'next/script';

export const Dashboard = () => {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [showAddressModal, setShowAddressModal] = useState(false)
  const { addAddress, addresses, setAddressActive, loading: addressLoading, error: addressError, getAddresses } = useAddress(user?._id)

  useEffect(() => {
    if (user?._id) {
      getAddresses();
    }
  }, [user?._id, getAddresses]);

  const autocompleteInputRef = useRef<HTMLInputElement>(null);
  const [autoError, setAutoError] = useState('');
  const [googleReady, setGoogleReady] = useState(false);

  // This function is called when a place is selected from Google Autocomplete
  const handlePlaceSelected = async (place: any) => {
      // Ensure the selected place has the necessary details
      if (!place.geometry || !place.address_components) {
        setAutoError('Could not find details for this location. Please select a valid address from the list.');
        return;
      }

      let street_number = ''
      let street_address = ''
      let city = '';
      let state = '';
      let lga = '';

      // Extract address components
      place.address_components.forEach((component: any) => {
        const types = component.types;
        if (types.includes('street_number')) {
            if(!street_number) street_number = component.long_name;
        }
        if (types.includes('route')) {
            if(!street_address) street_address = component.long_name;
        }
        if (types.includes('locality') || types.includes('neighborhood')) {
            if(!city) city = component.long_name;
        }
        if (types.includes('administrative_area_level_3')) {
            if(!lga) lga = component.long_name;
        }
        if (types.includes('administrative_area_level_1')) {
            state = component.long_name.replace(' State', '');
        }
      });
      
      // If the place name is the same as the city, the user likely selected a city, which is too broad.
      if (street_address === city) {
        setAutoError('Please select a more specific location, like a street or business.');
        return;
      }

      setAutoError('');

      if (street_address && city && state) {
        await addAddress({
          street_address: street_number + " " + street_address,
          city: city,
          state: state,
          country: 'Nigeria',
          lga: lga
        });
        setShowAddressModal(false);
        if (autocompleteInputRef.current) autocompleteInputRef.current.value = '';
      } else {
        setAutoError('Incomplete address details. Please select a more specific location.');
      }
  }

  // Initialize Google Places Autocomplete
  useEffect(() => {
    // Ensure the effect runs only when the modal is open and Google API is ready
    if (!googleReady || !showAddressModal || !autocompleteInputRef.current) return;

    const google = (window as any).google;
    if (!google || !google.maps || !google.maps.places) return;

    // Create a new Autocomplete instance and attach it to the input element
    const autocomplete = new google.maps.places.Autocomplete(autocompleteInputRef.current, {
      // UPDATED: Allow establishments (businesses) and geocodes (addresses, cities)
      types: ['establishment', 'geocode'], 
      componentRestrictions: { country: 'ng' },
      fields: ['address_components', 'geometry', 'icon', 'name', 'formatted_address']
    });

    // Add a listener for when the user selects an address from the dropdown
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      handlePlaceSelected(place);
    });

    // Cleanup function to run when the effect dependencies change or component unmounts
    return () => {
      if (google && google.maps) {
        // This is crucial to prevent the "backspace" issue.
        // It removes all listeners from the autocomplete instance.
        google.maps.event.clearInstanceListeners(autocomplete);
        
        // Remove the suggestions dropdown (.pac-container) from the DOM
        // to prevent it from lingering after the modal closes.
        const pacContainers = document.querySelectorAll('.pac-container');
        pacContainers.forEach(container => container.remove());
      }
    };
  }, [googleReady, showAddressModal]); // Re-run effect when modal visibility changes

  if (loading) {
    return <LoadingComponent fallbackText={'Loading your dashboard...'} />
  }

  const activeAddress = addresses?.find(a => a.is_active);

  return (
    <>
      {/* Custom styles for Google Places Autocomplete dropdown */}
      <style jsx global>{`
        .pac-container {
          background-color: #FFF;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border: none;
          margin-top: 8px;
          z-index: 10000 !important; /* Ensure it's on top */
        }
        .pac-item {
          padding: 12px 16px;
          font-size: 1rem;
          cursor: pointer;
          border-top: 1px solid #f1f1f1;
          display: flex;
          align-items: center;
        }
        .pac-item:first-child {
          border-top: none;
        }
        .pac-item:hover {
          background-color: #f7f7f7;
        }
        .pac-item-query {
          font-weight: 600;
          color: #000;
        }
        .pac-icon {
          width: 20px;
          height: 20px;
          margin-right: 14px;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="%234A5568" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>');
          background-size: contain;
        }
        .pac-icon-marker {
           /* We use .pac-icon to provide a custom icon */
           background-image: none; 
        }
        .hdpi.pac-logo:after {
            background-image: none; /* This is as far as we can go without violating ToS */
        }
      `}</style>
      <div className="bg-gray-50 min-h-screen">
        {/* Address Modal Trigger */}
          <div
            className='w-[90%] flex items-center justify-between px-4 py-2 rounded-full bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-200 transition-colors'
            onClick={() => setShowAddressModal(true)}
          >
            <div className="flex items-center min-w-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className='truncate font-medium text-sm'>
                {activeAddress
                  ? `${activeAddress.street_address}, ${activeAddress.city}`
                  : 'Delivery Address'}
              </span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

        {/* Address Modal - Styled like a bottom sheet */}
        {showAddressModal && (
          <div className='fixed inset-0 z-50 flex flex-col justify-end transition-transform duration-300'>
            {/* Overlay */}
            <div className='absolute inset-0 bg-black/60' onClick={() => setShowAddressModal(false)} />

            {/* Modal Content */}
            <div className='relative w-full max-h-[85vh] bg-white shadow-2xl z-50 rounded-t-2xl flex flex-col'>
              {/* Handle */}
              <div className="w-full py-3 flex justify-center items-center cursor-grab">
                  <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
              </div>

              <div className="p-4 pt-0 overflow-y-auto">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">Delivery Address</h2>

                  {/* Google Places Autocomplete Input */}
                  <div className='relative w-full flex flex-col items-start mb-6 px-2'>
                    <div className="relative w-full">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                      <input
                        id='google-address-input'
                        ref={autocompleteInputRef}
                        type='text'
                        placeholder='Enter a new address'
                        className='w-full pl-10 pr-4 py-3 border border-gray-200 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                        autoFocus
                      />
                    </div>
                    {autoError && <span className='text-red-500 text-xs mt-1 px-1'>{autoError}</span>}
                  </div>

                  {/* Saved Addresses */}
                  <div className='w-full'>
                    {addressLoading ? (
                      <div className='text-gray-500 text-center py-4'>Loading addresses...</div>
                    ) : addressError ? (
                      <div className='text-red-500 text-center py-4'>{addressError}</div>
                    ) : addresses && addresses.length > 0 ? (
                      <div className='space-y-1'>
                        {addresses.map((addr) => (
                          <div
                            key={addr._id}
                            className={`p-3 rounded-lg flex items-center cursor-pointer hover:bg-gray-100 transition-colors ${addr.is_active ? 'bg-gray-100' : ''}`}
                            onClick={() => {
                                setAddressActive(addr._id);
                                setShowAddressModal(false);
                            }}
                          >
                            <div className="flex-grow">
                              <p className="font-semibold text-gray-800">{addr.street_address}</p>
                              <p className="text-sm text-gray-500">{addr.city}, {addr.state}</p>
                            </div>
                            {addr.is_active && <div className='ml-2 w-2 h-2 bg-black rounded-full' />}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className='text-gray-500 text-center py-8 px-4'>
                          <h3 className="font-semibold text-lg">No saved addresses</h3>
                          <p className="text-sm">Search for an address above to get started.</p>
                      </div>
                    )}
                  </div>
              </div>
            </div>
          </div>
        )}

        {/* Load Google Maps Script */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCBwgl4rAVLN4mKtZmUPFFq8UzmqZebVS8&libraries=places&loading=async`}
          strategy='lazyOnload'
          onLoad={() => setGoogleReady(true)}
        />

        {/* Rest of the Dashboard Content */}
        <div className='mx-auto py-6 px-4 space-y-8'>
          <WelcomeSection user={user} />
          <ShopsSection />
          <PromoBannerSection router={router} />
        </div>
      </div>
    </>
  )
}


// --- WelcomeSection, PromoBannerSection, ShopsSection, and other child components remain unchanged ---
// --- They are included here for completeness of the file ---

const WelcomeSection = ({ user }: { user: any }) => (
  <section>
    <Text
      as='h1'
      style='text-gray-900 text-2xl font-bold mb-2'
      children={`Welcome back, ${capitalize(user?.first_name) || 'Guest'}! 👋`}
    />
    <Text
      as='p'
      style='text-gray-600 text-md'
      children='Discover amazing shops and exclusive deals today'
    />
  </section>
)

const PromoBannerSection = ({ router }: { router: any }) => {
  const { items, loading, error } = useBubbleShopItems('')
  const { cart, addToCart, removeFromCart, updateQuantity } = useOrderFlow()

  const handleAddToCart = (item: any) => addToCart(item)
  const handleRemoveFromCart = (itemId: string) => removeFromCart(itemId)
  const handleUpdateQuantity = (itemId: string, quantity: number) => updateQuantity(itemId, quantity)

  return (
    <section className='relative'>
      <div
        className='md:block hidden relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer mb-6'
        onClick={() => router.push(bubblesStoreRoute)}
      >
        <CustomImage
          src={bubblesDesktopStorebanner}
          style='w-full h-[22rem]'
          imgStyle='object-cover'
          priority={true}
        />
        <div className='absolute inset-0 bg-black/70 opacity-30 flex items-center justify-center'></div>
      </div>

      <header className='mb-4 mt-2 flex flex-col items-start'>
        <Text as='h2' style='text-gray-900 text-xl font-bold mb-1'>Shop Our Latest Products</Text>
        <Text as='p' style='text-gray-600'>Browse and shop the newest arrivals from Bubbles Store</Text>
      </header>

      {loading ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className='h-40 bg-gray-100 rounded-lg animate-pulse' />
          ))}
        </div>
      ) : error ? (
        <div className='text-red-500 text-center py-8'>{error}</div>
      ) : (
        <div className='relative'>
          <div className='flex justify-end mb-2'>
            <Button
              onClick={() => router.push(bubblesStoreRoute)}
              className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2'
            >
              View More Products
            </Button>
          </div>
          <Swiper
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 2 },
            }}
            loop={items.length > 4}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: `.dashboard-swiper-button-next`,
              prevEl: `.dashboard-swiper-button-prev`,
            }}
            className='w-full pb-6'
          >
            {items.slice(0, 10).map((item, idx) => (
              <SwiperSlide key={item._id} style={{ width: '100%' }}>
                <CategoryItems
                  items={[item]}
                  cart={cart}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveFromCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  loading={loading}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {items.length > 4 && (
            <>
              <button
                className='dashboard-swiper-button-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors'
                aria-label='Previous slide'
              >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5 text-gray-600'><path fillRule='evenodd' d='M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z' clipRule='evenodd' /></svg>
              </button>
              <button
                className='dashboard-swiper-button-next absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors'
                aria-label='Next slide'
              >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5 text-gray-600'><path fillRule='evenodd' d='M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z' clipRule='evenodd' /></svg>
              </button>
            </>
          )}
        </div>
      )}
    </section>
  )
}

const ShopsSection = () => {
  const { shops, loading, error } = useShops()
  return (
    <section>
      <header className='flex flex-wrap justify-between items-center mb-8 gap-4'>
        <div>
          <Text
            as='h2'
            style='text-gray-900 text-2xl font-bold mb-2'
            children='Featured Services'
          />
          <Text
            as='p'
            style='text-gray-600'
            children='Discover top-rated services in your area'
          />
        </div>
      </header>

      <ShopList services={shops} loading={loading} error={error} />
    </section>
  )
}