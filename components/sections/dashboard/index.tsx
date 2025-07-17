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
import { useForm } from 'react-hook-form'
import { useAddress } from '@/hooks/useAddress'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Script from 'next/script';
import { useRef } from 'react';

export const Dashboard = () => {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [showAddressModal, setShowAddressModal] = useState(false)
  const { addAddress, addresses, setAddressActive, loading: addressLoading, error: addressError, getAddresses } = useAddress(user?._id)
  const form = useForm({
    defaultValues: {
      street_address: '',
      city: '',
      state: '',
      lga: '',
      country: 'Nigeria',
    },
  })
  const lagosCities = [
    "Lagos Island", "Victoria Island", "Ikoyi", "Lekki", "Ajah", "Banana Island",
    "Ikeja", "Yaba", "Surulere", "Mushin", "Oshodi", "Isolo", "Ejigbo", "Okota",
    "Amuwo-Odofin", "Festac Town", "Satellite Town", "Orile", "Ebute-Metta", "Oyingbo",
    "Iddo", "Jibowu", "Palmgrove", "Onipanu", "Fadeyi", "Ilupeju", "Somolu", "Bariga",
    "Shomolu", "Gbagada", "Oworonshoki", "Kosofe", "Ketu", "Ojota", "Magodo", "Omole",
    "Ogba", "Agege", "Dopemu", "Mangoro", "Iyana-Ipaja"
  ];
  const NIGERIA_STATES = ['Lagos'];
  const handleAddressSubmit = async (values: any) => {
    await addAddress({ ...values })
    setShowAddressModal(false)
    form.reset()
  }

  useEffect(() => {
    if (user?._id) {
      getAddresses();
    }
  }, [user?._id, getAddresses]);

  const autocompleteInputRef = useRef<HTMLInputElement>(null);
  // const [autoStreet, setAutoStreet] = useState('');
  // const [autoCity, setAutoCity] = useState('');
  // const [autoState, setAutoState] = useState('');
  const [autoError, setAutoError] = useState('');
  const [googleReady, setGoogleReady] = useState(false);

  // Handler for Google Places Autocomplete
  useEffect(() => {
    if (!googleReady || !showAddressModal || typeof window === 'undefined' || !autocompleteInputRef.current) return;
    const google = (window as any).google;
    if (!google || !google.maps) return;
    console.log('Initializing autocomplete');
    // Use the correct Autocomplete constructor
    const autocomplete = new google.maps.places.Autocomplete(autocompleteInputRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'ng' },
    });
    const listener = autocomplete.addListener('place_changed', async () => {
      const place = autocomplete.getPlace();
      if (!place.address_components) {
        setAutoError('Could not extract address details.');
        return;
      }
      let street = '';
      let city = '';
      let state = '';
      let lga = '';
      let street_number = '';
      place.address_components.forEach((component: any) => {
        if (component.types.includes('route')) {
          street = component.long_name;
        }
        if (component.types.includes('street_number')) {
          street_number = component.long_name;
        }
        if (component.types.includes('neighborhood')) {
          city = component.long_name;
        }
        if (component.types.includes('administrative_area_level_3')) {
          lga = component.long_name;
        }
        if (component.types.includes('administrative_area_level_1')) {
          state = component.long_name;
        }
      });
      // setAutoStreet(street);
      // setAutoCity(city);
      // setAutoState(state);
      setAutoError('');
      // Automatically submit extracted address
      if (street_number && street && city && state) {
        await handleAddressSubmit({
          street_address: street_number + " " + street,
          city: city,
          state: state,
          country: 'Nigeria',
          lga: lga
        });
        setShowAddressModal(false);
        // setAutoStreet('');
        // setAutoCity('');
        // setAutoState('');
        if (autocompleteInputRef.current) autocompleteInputRef.current.value = '';
      }
    });
    // Cleanup
    return () => {
      if (listener && listener.remove) listener.remove();
    };
  }, [googleReady, showAddressModal, autocompleteInputRef]);

  if (loading) {
    return <LoadingComponent fallbackText={'Loading your dashboard...'} />
  }

  return (
    <div>
      {/* Address Modal Trigger - Long Thin Div with Active Address */}
      <div className='w-full flex justify-start mb-4'>
        <div
          className='w-[80%] px-4 py-1 rounded-full border border-blue-300 bg-blue-50 text-blue-900 flex items-center justify-between cursor-pointer hover:bg-blue-100 transition-colors text-sm font-medium shadow-sm'
          onClick={() => setShowAddressModal(true)}
        >
          <span className='truncate'>
            {addresses && addresses.length > 0 && addresses.find(a => a.is_active)
              ? `${addresses.find(a => a.is_active)?.street_address}, ${addresses.find(a => a.is_active)?.city}, ${addresses.find(a => a.is_active)?.state}`
              : 'Add Address'}
          </span>
          <ChevronDown className='ml-2 w-5 h-5 text-blue-600' />
        </div>
      </div>
      {/* Address Modal Overlay */}
      {showAddressModal && (
        <div className='fixed inset-0 z-50 flex flex-col justify-end'>
          <div className='absolute inset-0 bg-black/40' onClick={() => setShowAddressModal(false)} />
          <div className='relative w-full h-[70vh] bg-white shadow-lg z-50 p-8 mx-auto rounded-t-2xl flex flex-col items-center justify-start overflow-y-auto'>
            {/* Google Places Autocomplete Address Input (now inside modal) */}
            <div className='w-full flex flex-col items-start mb-6'>
              <label htmlFor='google-address-input' className='mb-1 text-sm font-medium text-gray-700'>Search Address</label>
              <input
                id='google-address-input'
                ref={autocompleteInputRef}
                type='text'
                placeholder='Enter a new address'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 mb-2'
              />
              {autoError && <span className='text-red-500 text-xs mb-1'>{autoError}</span>}
              {/* <div className='w-full flex flex-col gap-1 text-sm text-gray-700'>
                {autoStreet && <span><b>Street:</b> {autoStreet}</span>}
                {autoCity && <span><b>City:</b> {autoCity}</span>}
                {autoState && <span><b>State:</b> {autoState}</span>}
              </div> */}
            </div>
            {/* Previous Addresses */}
            <div className='w-full max-w-md mb-6'>
              <h3 className='text-lg font-semibold mb-2 text-gray-900'>Previous Addresses</h3>
              {addressLoading ? (
                <div className='text-gray-500'>Loading...</div>
              ) : addressError ? (
                <div className='text-red-500'>{addressError}</div>
              ) : addresses && addresses.length > 0 ? (
                <div className='space-y-2'>
                  {addresses.map(addr => (
                    <div
                      key={addr._id}
                      className={`p-3 rounded border flex items-center justify-between cursor-pointer ${addr.is_active ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50 hover:bg-blue-100'}`}
                      onClick={() => setAddressActive(addr._id)}
                    >
                      <span className='text-gray-800 text-sm'>{addr.street_address}, {addr.city}, {addr.state}</span>
                      {addr.is_active && <span className='ml-2 text-xs text-blue-600 font-bold'>Active</span>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-gray-500'>No addresses found.</div>
              )}
            </div>
            {/* <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddressSubmit)} className='w-full max-w-md flex flex-col gap-4'>
                <InputField
                  control={form.control}
                  name='street_address'
                  placeholder='Street Address'
                  inputCategory='input'
                  inputType='text'
                />
                <InputField
                  control={form.control}
                  name='city'
                  placeholder='Select City'
                  inputCategory='select'
                  selectList={lagosCities.map(city => ({ value: city, title: city }))}
                />
                <InputField
                  control={form.control}
                  name='state'
                  placeholder='Select State'
                  inputCategory='select'
                  selectList={NIGERIA_STATES.map(state => ({ value: state, title: state }))}
                />
                <InputField
                  control={form.control}
                  name='country'
                  placeholder='Select Country'
                  inputCategory='select'
                  selectList={[{ value: 'Nigeria', title: 'Nigeria' }]}
                />
                <Button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 mt-2'>
                  Add Address
                </Button>
              </form>
            </Form> */}
          </div>
        </div>
      )}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCBwgl4rAVLN4mKtZmUPFFq8UzmqZebVS8&libraries=places&loading=async`}
        strategy='afterInteractive'
        onLoad={() => setGoogleReady(true)}
      />
      <div className='mx-auto py-6 space-y-8'>
        <WelcomeSection user={user} />
        <ShopsSection />
        <PromoBannerSection router={router} />
      </div>
    </div>
  )
}

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

  // Handlers for cart actions
  const handleAddToCart = (item: any) => addToCart(item)
  const handleRemoveFromCart = (itemId: string) => removeFromCart(itemId)
  const handleUpdateQuantity = (itemId: string, quantity: number) => updateQuantity(itemId, quantity)

  return (
    <section className='relative'>
      {/* Desktop Banner */}
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
            className='product-swiper pb-6'
          >
            {items.slice(0, 10).map((item, idx) => (
              <SwiperSlide key={item._id} style={{ width: 240, maxWidth: '90vw' }}>
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
                className='dashboard-swiper-button-next absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors'
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

const ViewAllLink = ({ href }: { href: string }) => (
  <Link href={href} className='ms-auto'>
    <Button
      variant='outline'
      className='border border-gray-400 text-[#002F6C] hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200'
    >
      View All Shops
      <ChevronRightIcon className='w-4 h-4 ml-2' />
    </Button>
  </Link>
)

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M9 5l7 7-7 7'
    />
  </svg>
)
