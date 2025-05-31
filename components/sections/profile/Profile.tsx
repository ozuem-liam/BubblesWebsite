'use client'

import { useAuth } from '../../../contexts/auth-context'
import { useEffect, useState } from 'react'
import { Settings, Edit, Save, X } from 'lucide-react'
import { UserAvatar } from '@/components/global/UserAvatar'
import { LoadingComponent } from '@/components/global/Loading'
import { authService } from '../../../lib/auth'
import { toast } from 'sonner'

// Nigeria states list
const NIGERIA_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'Federal Capital Territory', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano',
  'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger',
  'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara'
]

export const ProfileComponent = () => {
  const { user, loading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [userInitials, setUserInitials] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  
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

      // Update local state
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
  }, [user])

  if (loading) {
    return <LoadingComponent fallbackText={'Fetching profile details...'} />
  }

  return (
    <div className='min-h-screen bg-gray-50 py-4'>
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
              Profile
            </h1>
            <p className='text-gray-600 mt-1'>
              Manage your account settings and personal information
            </p>
          </div>
          <button className='hidden sm:flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors'>
            <Settings className='mr-2 h-4 w-4' />
            Settings
          </button>
        </div>

        <div className='border-t border-gray-200 mb-6'></div>

        {/* Personal Info Card */}
        <div className='bg-white rounded-lg border border-gray-200'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <div className='flex items-center justify-between'>
              <div>
                <h2 className='text-xl font-semibold text-gray-900'>
                  Personal Information
                </h2>
                <p className='text-gray-600 mt-1'>
                  Update your personal details and contact information
                </p>
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
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium text-gray-700'
                >
                  First name
                </label>
                <input
                  id='firstName'
                  type='text'
                  value={isEditing ? tempFormData.firstName : formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled
                  className={`w-full px-3 py-2 border rounded-md transition-colors
                    ${!isEditing
                      ? 'bg-gray-50 border-gray-200 text-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                    }`}
                />
              </div>

              {/* Last Name */}
              <div className='space-y-2'>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-medium text-gray-700'
                >
                  Last name
                </label>
                <input
                  id='lastName'
                  type='text'
                  value={isEditing ? tempFormData.lastName : formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled
                  className={`w-full px-3 py-2 border rounded-md transition-colors
                    ${!isEditing
                      ? 'bg-gray-50 border-gray-200 text-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                    }`}
                />
              </div>

              {/* Email */}
              <div className='space-y-2'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email
                </label>
                <input
                  id='email'
                  type='email'
                  value={isEditing ? tempFormData.email : formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled
                  className={`w-full px-3 py-2 border rounded-md transition-colors
                    ${!isEditing
                      ? 'bg-gray-50 border-gray-200 text-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                    }`}
                />
              </div>

              {/* Phone */}
              <div className='space-y-2'>
                <label
                  htmlFor='phone'
                  className='block text-sm font-medium text-gray-700'
                >
                  Phone Number
                </label>
                <input
                  id='phone'
                  type='tel'
                  value={isEditing ? tempFormData.phone : formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled
                  placeholder='+234 XXX XXX XXXX'
                  className={`w-full px-3 py-2 border rounded-md transition-colors
                    ${!isEditing
                      ? 'bg-gray-50 border-gray-200 text-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                    }`}
                />
              </div>
            </div>

            {/* Address Section */}
            <div className='space-y-4'>
              <h3 className='text-lg font-medium text-gray-900 border-b border-gray-200 pb-2'>
                Address Information
              </h3>
              
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                {/* Street Address */}
                <div className='sm:col-span-2 space-y-2'>
                  <label
                    htmlFor='street_address'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Street Address
                  </label>
                  <input
                    id='street_address'
                    type='text'
                    value={isEditing ? tempFormData.street_address : formData.street_address}
                    onChange={(e) => handleInputChange('street_address', e.target.value)}
                    disabled={!isEditing}
                    placeholder='Enter your street address'
                    className={`w-full px-3 py-2 border rounded-md transition-colors
                      ${!isEditing
                        ? 'bg-gray-50 border-gray-200 text-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                      }`}
                  />
                </div>

                {/* City */}
                <div className='space-y-2'>
                  <label
                    htmlFor='city'
                    className='block text-sm font-medium text-gray-700'
                  >
                    City
                  </label>
                  <input
                    id='city'
                    type='text'
                    value={isEditing ? tempFormData.city : formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    disabled={!isEditing}
                    placeholder='Enter your city'
                    className={`w-full px-3 py-2 border rounded-md transition-colors
                      ${!isEditing
                        ? 'bg-gray-50 border-gray-200 text-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                      }`}
                  />
                </div>

                {/* State */}
                <div className='space-y-2'>
                  <label
                    htmlFor='state'
                    className='block text-sm font-medium text-gray-700'
                  >
                    State
                  </label>
                  <select
                    id='state'
                    value={isEditing ? tempFormData.state : formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md transition-colors
                      ${!isEditing
                        ? 'bg-gray-50 border-gray-200 text-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                      }`}
                  >
                    <option value=''>Select a state</option>
                    {NIGERIA_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}