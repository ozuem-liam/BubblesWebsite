'use client'

import { useAuth } from '../../../contexts/auth-context'
import { useEffect, useState } from 'react'
import { Settings, Edit, Save, X } from 'lucide-react'
import { UserAvatar } from '@/components/global/UserAvatar'

export const ProfileComponent = () => {
  // Edit state and form data
  const { user, loading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [userInitials, setUserInitials] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    location: '',
    phone: '',
  })

  const [tempFormData, setTempFormData] = useState({ ...formData })

  const handleEdit = () => {
    setIsEditing(true)
    setTempFormData({ ...formData })
  }

  const handleSave = () => {
    setFormData({ ...tempFormData })
    setIsEditing(false)
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
      setFormData({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        address: user.address.street_address,
        location: `${user.address.city}, ${user.address.state}`,
        phone: user?.phone,
      })
      setUserInitials(
        `${user?.first_name?.charAt(0) + user?.last_name?.charAt(0)}`
      )
    }
  }, [user, loading])

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-6 '>
      <div className='space-y-6'>
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
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCancel}
                      className='flex items-center px-3 py-2 text-sm bg-gray-50 text-gray-600 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors'
                    >
                      <X className='mr-2 h-4 w-4' />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className='flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
                    >
                      <Save className='mr-2 h-4 w-4' />
                      Save
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
              <div className='space-y-2'>
                <button
                  disabled={!isEditing}
                  className={`px-3 py-2 text-sm border rounded-md transition-colors
                    ${
                      isEditing
                        ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    }`}
                >
                  Change avatar
                </button>
                <p className='text-sm text-gray-500'>
                  JPG, GIF or PNG. Max size 2MB
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
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
                  value={
                    isEditing ? tempFormData.firstName : formData.firstName
                  }
                  onChange={(e) =>
                    handleInputChange('firstName', e.target.value)
                  }
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md transition-colors
                    ${
                      !isEditing
                        ? 'bg-gray-50 border-gray-200 text-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                    }`}
                />
              </div>
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
                  onChange={(e) =>
                    handleInputChange('lastName', e.target.value)
                  }
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md transition-colors
                    ${
                      !isEditing
                        ? 'bg-gray-50 border-gray-200 text-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                    }`}
                />
              </div>

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
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md transition-colors
                  ${
                    !isEditing
                      ? 'bg-gray-50 border-gray-200 text-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                  }`}
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='phone'
                  className='block text-sm font-medium text-gray-700'
                >
                  Phone Number
                </label>
                <input
                  id='phone'
                  type='phone'
                  value={isEditing ? tempFormData.phone : formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md transition-colors
                  ${
                    !isEditing
                      ? 'bg-gray-50 border-gray-200 text-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                  }`}
                />
              </div>
            </div>
            <div className='space-y-2'>
              <label
                htmlFor='location'
                className='block text-sm font-medium text-gray-700'
              >
                Location
              </label>
              <input
                id='location'
                type='location'
                value={isEditing ? tempFormData.phone : formData.phone}
                onChange={(e) => handleInputChange('location', e.target.value)}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-md transition-colors
                  ${
                    !isEditing
                      ? 'bg-gray-50 border-gray-200 text-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                  }`}
              />
            </div>
            <div className='space-y-2'>
              <label
                htmlFor='address'
                className='block text-sm font-medium text-gray-700'
              >
                Address
              </label>
              <textarea
                id='address'
                value={isEditing ? tempFormData.address : formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!isEditing}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md resize-none transition-colors
                  ${
                    !isEditing
                      ? 'bg-gray-50 border-gray-200 text-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                  }`}
                placeholder='Tell us about yourself...'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
