'use client'

import { useAddress } from '../../../hooks/useAddress'
import { useAuth } from '../../../contexts/auth-context'
import { useEffect, useState } from 'react'
import { Settings, Edit, Save, X } from 'lucide-react'
import { UserAvatar } from '@/components/global/UserAvatar'
import { LoadingComponent } from '@/components/global/Loading'
import { authService } from '../../../lib/auth'
import { toast } from 'sonner'

// Nigeria states list
const NIGERIA_STATES = [
  // 'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  // 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  // 'Federal Capital Territory', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano',
  // 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 
  'Lagos', 
  // 'Nasarawa', 'Niger',
  // 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  // 'Yobe', 'Zamfara'
]

const lagosCities = [
  // Lagos Island
  "Lagos Island",
  "Victoria Island",
  "Ikoyi",
  "Lekki",
  "Ajah",
  "Banana Island",
  // "Apapa",
  // "Tin Can Island",
  // Lagos Mainland
  "Ikeja",
  "Yaba",
  "Surulere",
  "Mushin",
  "Oshodi",
  "Isolo",
  "Ejigbo",
  "Okota",
  "Amuwo-Odofin",
  "Festac Town",
  "Satellite Town",
  "Orile",
  "Ebute-Metta",
  "Oyingbo",
  "Iddo",
  "Jibowu",
  "Palmgrove",
  "Onipanu",
  "Fadeyi",
  "Ilupeju",
  "Somolu",
  "Bariga",
  "Shomolu",
  "Gbagada",
  "Oworonshoki",
  "Kosofe",
  "Ketu",
  "Ojota",
  "Magodo",
  "Omole",
  "Ogba",
  "Agege",
  "Dopemu",
  "Mangoro",
  // "Pen Cinema",
  // "Alimosho",
  // "Igando",
  // "Ikotun",
  // "Idimu",
  // "Egbeda",
  "Iyana-Ipaja",
  // "Abule-Egba",
  // "Meiran",
  // "Alagbado",
  // "Iju",
  // "Ifako-Ijaiye",
  // "Wempco",
  // "Ojokoro",
  // "Ijaiye",
  // "Fagba",
  // "Oke-Odo",
  // "Iyana-Ipaja",
];

export const ProfileComponent = () => {
  const { user, loading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [userInitials, setUserInitials] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'profile' | 'address'>('profile')

  // Profile form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    street_address: '',
    state: '',
    phone: '',
  })
  const [tempFormData, setTempFormData] = useState({ ...formData })

  // Address hook
  const { addresses, loading: addressLoading, error: addressError, getAddresses, addAddress, updateAddress, deleteAddress, setAddressActive, activeAddress } = useAddress(user?._id)
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [newAddress, setNewAddress] = useState({
    street_address: '',
    city: '',
    state: '',
    country: 'Nigeria',
  })
  const [adding, setAdding] = useState(false)
  const handleNewAddressChange = (field: string, value: string) => {
    setNewAddress((prev) => ({ ...prev, [field]: value }))
  }
  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdding(true)
    try {
      // Duplicate city to lga in the payload
      await addAddress({
        ...newAddress,
        lga: newAddress.city,
      })
      setShowAddAddress(false)
      setNewAddress({ street_address: '', city: '', state: '', country: 'Nigeria' })
    } catch (err) {
      // error handled in hook
    } finally {
      setAdding(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
    setTempFormData({ ...formData })
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Update the address information
      await authService.updateAddress(
        {
          street_address: tempFormData.street_address,
          city: tempFormData.city,
          state: tempFormData.state,
        },
        user?._id || ''
      )
      setFormData({ ...tempFormData })
      setIsEditing(false)
      toast.success('Profile updated successfully')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setTempFormData({ ...formData })
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setTempFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  useEffect(() => {
    if (user) {
      const userData = {
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
        street_address: user.address?.street_address || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        phone: user?.phone || '',
      }
      setFormData(userData)
      setTempFormData(userData)
      setUserInitials(
        `${user?.first_name?.charAt(0) || ''}${user?.last_name?.charAt(0) || ''}`
      )
    }
    if (user?._id) {
      getAddresses()
    }
  }, [user, getAddresses])

  if (loading) {
    return <LoadingComponent fallbackText={'Fetching profile details...'} />
  }

  return (
    <div className='mx-auto max-w-3xl py-8'>
      {/* Tabs */}
      <div className='flex border-b border-gray-200 mb-6'>
        <button
          className={`px-4 py-2 font-semibold text-md focus:outline-none transition-colors ${activeTab === 'profile' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`px-4 py-2 font-semibold text-md focus:outline-none transition-colors ${activeTab === 'address' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('address')}
        >
          Address
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className='bg-white rounded-lg border border-gray-200'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <div className='flex items-center justify-between'>
              <div>
                <h2 className='text-xl font-semibold text-gray-900'>Personal Information</h2>
              </div>
              <div className='flex gap-2'>
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className='flex items-center px-3 py-2 text-sm bg-blue-50 text-blue-600 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors'
                  >
                    <Edit className='mr-2 h-4 w-4' />
                    Edit Profile Address
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCancel}
                      disabled={isSaving}
                      className='flex items-center px-3 py-2 text-sm bg-gray-50 text-gray-600 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50'
                    >
                      <X className='mr-2 h-4 w-4' />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className='flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50'
                    >
                      <Save className='mr-2 h-4 w-4' />
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className='p-6 space-y-6'>
            {/* Avatar Section */}
            <div className='flex items-center space-x-6 p-4 bg-gray-50 rounded-lg'>
              <UserAvatar
                fallbackText={userInitials}
                className='h-24 w-24 text-xl'
                src={user?.profile_image || undefined}
              />
              <div>
                <h3 className='text-lg font-medium text-gray-900'>
                  {formData.firstName} {formData.lastName}
                </h3>
                <p className='text-gray-500'>{formData.email}</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              {/* First Name */}
              <div className='space-y-2'>
                <label htmlFor='firstName' className='block text-sm font-medium text-gray-700'>First name</label>
                <input
                  id='firstName'
                  type='text'
                  value={isEditing ? tempFormData.firstName : formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled
                  className={`w-full px-3 py-2 border rounded-md transition-colors ${!isEditing ? 'bg-gray-50 border-gray-200 text-gray-500' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'}`}
                />
              </div>
              {/* Last Name */}
              <div className='space-y-2'>
                <label htmlFor='lastName' className='block text-sm font-medium text-gray-700'>Last name</label>
                <input
                  id='lastName'
                  type='text'
                  value={isEditing ? tempFormData.lastName : formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled
                  className={`w-full px-3 py-2 border rounded-md transition-colors ${!isEditing ? 'bg-gray-50 border-gray-200 text-gray-500' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'}`}
                />
              </div>
              {/* Email */}
              <div className='space-y-2'>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                <input
                  id='email'
                  type='email'
                  value={isEditing ? tempFormData.email : formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled
                  className={`w-full px-3 py-2 border rounded-md transition-colors ${!isEditing ? 'bg-gray-50 border-gray-200 text-gray-500' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'}`}
                />
              </div>
              {/* Phone */}
              <div className='space-y-2'>
                <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>Phone Number</label>
                <input
                  id='phone'
                  type='tel'
                  value={isEditing ? tempFormData.phone : formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled
                  placeholder='+234 XXX XXX XXXX'
                  className={`w-full px-3 py-2 border rounded-md transition-colors ${!isEditing ? 'bg-gray-50 border-gray-200 text-gray-500' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'}`}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Address Tab */}
      {activeTab === 'address' && (
        <div className='bg-white rounded-lg border border-gray-200 p-6'>
          <h3 className='text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4'>Address Information</h3>
         <div className='flex justify-end mb-4'>
           <button
             className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium'
             onClick={() => setShowAddAddress((v) => !v)}
           >
             {showAddAddress ? 'Cancel' : 'Add Address'}
           </button>
         </div>
         {showAddAddress && (
           <form onSubmit={handleAddAddress} className='mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-blue-50 p-4 rounded'>
             <input
               className='px-3 py-2 border rounded w-full'
               placeholder='Street Address'
               value={newAddress.street_address}
               onChange={e => handleNewAddressChange('street_address', e.target.value)}
               required
             />
             <select
               className='px-3 py-2 border rounded w-full'
               value={newAddress.city}
               onChange={e => handleNewAddressChange('city', e.target.value)}
               required
             >
               <option value=''>Select City</option>
               {lagosCities.map(city => (
                 <option key={city} value={city}>{city}</option>
               ))}
             </select>
             <select
               className='px-3 py-2 border rounded w-full'
               value={newAddress.state}
               onChange={e => handleNewAddressChange('state', e.target.value)}
               required
             >
               <option value=''>Select State</option>
               {NIGERIA_STATES.map(state => (
                 <option key={state} value={state}>{state}</option>
               ))}
             </select>
             <select
               className='px-3 py-2 border rounded w-full'
               value={newAddress.country}
               onChange={e => handleNewAddressChange('country', e.target.value)}
               required
             >
               <option value='Nigeria'>Nigeria</option>
             </select>
             <button
               type='submit'
               className='col-span-1 sm:col-span-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium mt-2'
               disabled={adding}
             >
               {adding ? 'Adding...' : 'Add Address'}
             </button>
           </form>
         )}
          {addressLoading ? (
            <LoadingComponent fallbackText='Loading addresses...' />
          ) : addressError ? (
            <div className='text-red-500'>{addressError}</div>
          ) : (
            <div className='space-y-4'>
              {addresses.length === 0 && <div className='text-gray-500'>No addresses found.</div>}
              {addresses.map((address) => (
                <div key={address._id} className={`p-4 border rounded-md ${address.is_active ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                  <div className='flex justify-between items-center mb-2'>
                  <div className='text-gray-700 text-sm mb-1'>{address.street_address}, {address.city}, {address.state}</div>
                    {address.is_active && <span className='text-xs text-blue-600 font-bold'>Active</span>}
                  </div>
                  <div className='flex gap-2 mt-2'>
                    {!address.is_active && (
                      <button
                        onClick={() => setAddressActive(address._id)}
                        className='px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors'
                      >
                        Set as Active
                      </button>
                    )}
                    {/* <button
                      onClick={() => deleteAddress(address._id)}
                      className='px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors'
                    >
                      Delete
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}