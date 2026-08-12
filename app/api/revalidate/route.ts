import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const slug = typeof body.slug === 'string' ? body.slug : undefined
  revalidatePath('/blog')
  revalidatePath('/sitemap.xml')
  if (slug) revalidatePath(`/blog/${slug}`)
  return NextResponse.json({ revalidated: true })
}
