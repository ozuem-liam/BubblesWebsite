import type { MetadataRoute } from 'next'
import { getAllPublishedArticles } from '@/lib/content'

const SITE_URL = 'https://www.bubblesng.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const corePages: MetadataRoute.Sitemap = [
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
  const articles = await getAllPublishedArticles()
  const articlePages = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: article.last_updated_at || article.published_at || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  return [...corePages, ...articlePages]
}
