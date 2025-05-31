import { Metadata } from 'next'
import { ProfileComponent } from '../../../components/sections/profile/Profile'

export const metadata: Metadata = {
  title: 'Profile | Bubbles',
}

export default async function ProfilePage() {
  return <ProfileComponent />
}
