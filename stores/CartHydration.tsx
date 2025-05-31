// components/CartHydration.tsx
'use client'

import { useEffect, useState } from 'react'
import { useCartStore } from '@/stores/CartStore'

export default function CartHydration() {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return null
}