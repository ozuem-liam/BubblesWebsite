export type Article = {
  _id: string
  title: string
  slug: string
  excerpt: string
  content?: string
  seo_title: string
  meta_description: string
  canonical_url?: string
  cover_image?: string
  cover_image_alt?: string
  primary_category?: string
  tags: string[]
  related_service_slugs: string[]
  related_location_slugs: string[]
  faqs: Array<{ question: string; answer: string; sort_order: number; is_active: boolean }>
  published_at?: string
  last_updated_at?: string
  author?: { first_name: string; last_name: string }
}

type ApiResponse<T> = { data: T; meta?: { page: number; limit: number; total: number; total_pages: number } }

function contentApiUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  return baseUrl ? `${baseUrl.replace(/\/$/, '')}/content${path}` : undefined
}

export async function getPublishedArticles(): Promise<ApiResponse<Article[]> | null> {
  const url = contentApiUrl('/articles?limit=12')
  if (!url) return null
  const response = await fetch(url, { cache: 'no-store' })
  if (!response.ok) return null
  return response.json()
}

export async function getPublishedArticle(slug: string): Promise<Article | null> {
  const url = contentApiUrl(`/articles/${encodeURIComponent(slug)}`)
  if (!url) return null
  const response = await fetch(url, { cache: 'no-store' })
  if (!response.ok) return null
  const result: ApiResponse<Article> = await response.json()
  return result.data
}

export function articleUrl(article: Article) {
  return article.canonical_url || `/blog/${article.slug}`
}
