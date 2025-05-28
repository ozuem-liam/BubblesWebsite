'use client';

import { Text } from '../../../components/global/Text';
import Image from 'next/image';
import { capitalize } from '../../../lib/utils';
import { useAuth } from '../../../contexts/auth-context';
import { Skeleton } from '../../../components/ui/skeleton';

export const ProfileView = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image Skeleton */}
          <div className="flex-shrink-0">
            <Skeleton className="w-32 h-32 rounded-full bg-gray-200" />
          </div>
          
          {/* Profile Details Skeleton */}
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-64 bg-gray-200" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-20 bg-gray-200 mb-1" />
                  <Skeleton className="h-5 w-full bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-lg p-8 border border-gray-200 shadow-sm text-center">
        <svg 
          className="w-16 h-16 text-gray-400 mx-auto mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
          />
        </svg>
        <Text as="h3" style="text-gray-700 text-lg font-medium mb-2">
          No Profile Found
        </Text>
        <Text as="p" style="text-gray-500">
          We couldn't find any profile data
        </Text>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-300">
              {user.profile_image ? (
                <Image
                  src={user.profile_image}
                  alt={`${user.first_name}'s profile`}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              ) : (
                <Text as="p" style="text-blue-600 text-4xl font-medium">
                  {user.first_name.charAt(0).toUpperCase()}
                  {user.last_name.charAt(0).toUpperCase()}
                </Text>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1">
            <Text as="h1" style="text-gray-800 text-xl font-bold mb-1">
              {capitalize(user.first_name)} {capitalize(user.last_name)}
            </Text>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <ProfileDetail label="Email" value={user.email} />
              <ProfileDetail label="Phone" value={user.phone} />

              {user.address && (
                <ProfileDetail 
                  label="Address" 
                  value={user.address.street_address} 
                  colSpan="full"
                />
              )}
              {user.address && user.address.state && (
                <ProfileDetail 
                  label="Location" 
                  value={`${user.address.city}, ${user.address.state}`} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileDetail = ({
  label,
  value,
  colSpan = 'default'
}: {
  label: string;
  value: string;
  colSpan?: 'default' | 'full';
}) => (
  <div className={colSpan === 'full' ? 'md:col-span-2' : ''}>
    <Text as="p" style="text-gray-500 text-xs mb-1">{label}</Text>
    <Text as="p" style="text-gray-800 text-sm font-medium">
      {value || 'Not provided'}
    </Text>
  </div>
);