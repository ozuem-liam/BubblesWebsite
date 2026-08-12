"use client"

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export type ActiveService = {
  id: string
  title: string
  description: string
  image?: string
}

type ActiveServicesResponse = {
  data?: {
    services?: Array<{ _id: string; name: string; meta?: string; image?: string; is_active?: boolean }>
    data?: Array<{ _id: string; name: string; meta?: string; image?: string; is_active?: boolean }>
  } | Array<{ _id: string; name: string; meta?: string; image?: string; is_active?: boolean }>
}

export function useActiveServices() {
  const [services, setServices] = useState<ActiveService[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadServices() {
      try {
        const response = await api.get<ActiveServicesResponse>('/service/active')
        const data = response.data
        const rawServices = Array.isArray(data) ? data : data?.services ?? data?.data ?? []
        const activeServices = rawServices
          .filter((service) => service.is_active !== false)
          .map((service) => ({
            id: service._id,
            title: service.name,
            description: service.meta?.trim() || `Explore ${service.name} professionals available through Bubbles.`,
            image: service.image,
          }))

        if (!cancelled) setServices(activeServices)
      } catch {
        // Keep the marketplace section empty rather than showing stale, hard-coded services.
        if (!cancelled) setServices([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadServices()
    return () => { cancelled = true }
  }, [])

  return { services, loading }
}
