// components/profile/ProfileView.tsx
'use client';

import { Text } from '@/components/global/Text';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { capitalize } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';

export const ProfileView = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Text as="p" style="text-white">Loading profile...</Text>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <Text as="p" style="text-white">No profile data found</Text>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-[#00112b] rounded-lg p-6 border border-[#1a3b6d]">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-[#001D48] flex items-center justify-center overflow-hidden">
              {user.profile_image ? (
                <Image
                  src={user.profile_image}
                  alt={`${user.first_name}'s profile`}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              ) : (
                <Text as="p" style="text-[#bfdbfe] text-4xl">
                  {user.first_name.charAt(0).toUpperCase()}
                  {user.last_name.charAt(0).toUpperCase()}
                </Text>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1">
            <Text as="h1" style="text-white text-2xl font-bold mb-2">
              {capitalize(user.first_name)} {capitalize(user.last_name)}
            </Text>

            {/* {user.business_name && (
              <Text as="p" style="text-[#bfdbfe] mb-4">
                {profile.business_name}
              </Text>
            )} */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <ProfileDetail label="Email" value={user.email} />
              <ProfileDetail label="Phone" value={user.phone} />
              {/* <ProfileDetail 
                label="User Type" 
                value={capitalize('customer')} 
              /> */}

              {user.address && (
                <ProfileDetail 
                  label="Business Address" 
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

        {/* <div className="mt-8 flex justify-end">
          <Button className="bg-[#bfdbfe] text-[#001D48] hover:bg-[#a3c4fd]">
            Edit Profile
          </Button>
        </div> */}
      </div>
    </div>
  );
};

const ProfileDetail = ({
  label,
  value,
  valueStyle = 'text-white',
  colSpan = 'default'
}: {
  label: string;
  value: string;
  valueStyle?: string;
  colSpan?: 'default' | 'full';
}) => (
  <div className={colSpan === 'full' ? 'md:col-span-2' : ''}>
    <Text as="p" style="text-[#CCD0D4] text-sm mb-1">{label}</Text>
    <Text as="p" style={`${valueStyle} font-medium`}>{value}</Text>
  </div>
);