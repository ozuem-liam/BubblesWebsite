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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bubbles-api.pipeops.app/api/v1'
  return `${baseUrl.replace(/\/$/, '')}/content${path}`
}

export async function getPublishedArticles(page = 1, limit = 12): Promise<ApiResponse<Article[]> | null> {
  const url = contentApiUrl(`/articles?page=${page}&limit=${limit}`)
  const response = await fetch(url, { cache: 'no-store' })
  if (!response.ok) return null
  return response.json()
}

export async function getPublishedArticle(slug: string): Promise<Article | null> {
  const url = contentApiUrl(`/articles/${encodeURIComponent(slug)}`)
  const response = await fetch(url, { cache: 'no-store' })
  if (!response.ok) return null
  const result: ApiResponse<Article> = await response.json()
  return result.data
}

export async function getAllPublishedArticles(): Promise<Article[]> {
  const firstPage = await getPublishedArticles(1, 50)
  if (!firstPage) return []
  const pageCount = firstPage.meta?.total_pages || 1
  if (pageCount === 1) return firstPage.data
  const remaining = await Promise.all(Array.from({ length: pageCount - 1 }, (_, index) => getPublishedArticles(index + 2, 50)))
  return [...firstPage.data, ...remaining.flatMap((page) => page?.data || [])]
}

export function articleUrl(article: Article) {
  return article.canonical_url || `/blog/${article.slug}`
}

export function articleCoverImageUrl(image?: string) {
  if (!image) return undefined
  const googleDriveFileId = image.match(/drive\.google\.com\/file\/d\/([^/]+)/)?.[1]
  return googleDriveFileId ? `https://drive.google.com/uc?export=view&id=${googleDriveFileId}` : image
}
