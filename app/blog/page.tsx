import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/global/Footer'
import { TopNav } from '@/components/global/TopNav'
import { getPublishedArticles } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Bubbles Guides',
  description: 'Practical guides for laundry, cleaning, fumigation, and finding trusted service professionals in Nigeria.',
  alternates: { canonical: '/blog' },
}

export default async function BlogPage() {
  const result = await getPublishedArticles()
  const articles = result?.data ?? []

  return <>
    <div className="bg_linear-gradient px-4 pb-12 pt-28 lg:px-[2.5rem] lg:pt-10 xl:px-[5.5rem]">
      <TopNav />
      <section className="m-auto max-w-[1440px] pt-12 text-white">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-tertiary700">Bubbles guides</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">Helpful guides for everyday services.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">Clear, locally relevant information about laundry, cleaning, fumigation, and booking independent professionals through Bubbles.</p>
      </section>
    </div>
    <main className="m-auto max-w-[1440px] px-4 py-16 lg:px-[2.5rem] xl:px-[5.5rem]">
      {articles.length ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => <article key={article._id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {article.primary_category && <p className="text-sm font-semibold capitalize text-blue-700">{article.primary_category}</p>}
          <h2 className="mt-3 text-2xl font-bold leading-tight text-slate-950"><Link href={`/blog/${article.slug}`} className="hover:underline">{article.title}</Link></h2>
          <p className="mt-4 flex-1 leading-relaxed text-slate-600">{article.excerpt}</p>
          <Link href={`/blog/${article.slug}`} className="mt-6 font-semibold text-blue-700 hover:underline">Read guide <span aria-hidden="true">→</span></Link>
        </article>)}
      </div> : <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-slate-700"><h2 className="text-2xl font-bold text-slate-950">Guides are coming soon.</h2><p className="mt-2">We’re preparing practical service guides for Bubbles customers and professionals.</p></div>}
    </main>
    <Footer />
  </>
}
