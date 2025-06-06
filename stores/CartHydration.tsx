// components/CartHydration.tsx
'use client'

import { useEffect, useState } from 'react'

export default function CartHydration() {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return null
}