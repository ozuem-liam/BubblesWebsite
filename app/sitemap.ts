import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.bubblesng.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/laundry-service-abuja',
    '/laundry-service-lagos',
    '/how-it-works',
    '/trust-safety',
    '/vendor',
    '/privacy',
    '/terms',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }))
}
