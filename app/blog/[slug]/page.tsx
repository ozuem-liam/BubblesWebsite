import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Footer } from '@/components/global/Footer'
import { TopNav } from '@/components/global/TopNav'
import { articleUrl, getPublishedArticle } from '@/lib/content'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getPublishedArticle((await params).slug)
  if (!article) return {}
  return {
    title: article.seo_title || article.title,
    description: article.meta_description || article.excerpt,
    alternates: { canonical: articleUrl(article) },
    openGraph: { title: article.seo_title || article.title, description: article.meta_description || article.excerpt, type: 'article', images: article.cover_image ? [{ url: article.cover_image, alt: article.cover_image_alt || article.title }] : undefined },
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = await getPublishedArticle((await params).slug)
  if (!article) notFound()
  const canonicalUrl = articleUrl(article)
  const schema = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: article.title, description: article.excerpt,
    datePublished: article.published_at, dateModified: article.last_updated_at || article.published_at,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.bubblesng.com${canonicalUrl}` },
    author: article.author ? { '@type': 'Person', name: `${article.author.first_name} ${article.author.last_name}` } : { '@type': 'Organization', name: 'Bubbles' },
    publisher: { '@type': 'Organization', name: 'Bubbles', url: 'https://www.bubblesng.com' }, image: article.cover_image,
  }
  const breadcrumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bubblesng.com/' }, { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://www.bubblesng.com/blog' }, { '@type': 'ListItem', position: 3, name: article.title, item: `https://www.bubblesng.com${canonicalUrl}` }] }
  const activeFaqs = article.faqs.filter((faq) => faq.is_active)
  const faqSchema = activeFaqs.length ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: activeFaqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) } : null

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
    <div className="bg_linear-gradient px-4 pb-12 pt-28 lg:px-[2.5rem] lg:pt-10 xl:px-[5.5rem]"><TopNav /><article className="m-auto max-w-3xl pt-12 text-white"><Link href="/blog" className="text-sm font-semibold text-tertiary700 hover:underline">← Bubbles guides</Link>{article.primary_category && <p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-tertiary700">{article.primary_category}</p>}<h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">{article.title}</h1><p className="mt-5 text-lg leading-relaxed text-white/80">{article.excerpt}</p>{article.published_at && <p className="mt-6 text-sm text-white/70">Last updated {new Intl.DateTimeFormat('en-NG', { dateStyle: 'long' }).format(new Date(article.last_updated_at || article.published_at))}</p>}</article></div>
    <main className="m-auto max-w-3xl px-4 py-16 lg:px-0"><div className="whitespace-pre-wrap text-lg leading-8 text-slate-700">{article.content}</div>{activeFaqs.length > 0 && <section className="mt-16"><h2 className="text-3xl font-bold text-slate-950">Frequently asked questions</h2><div className="mt-6 space-y-6">{activeFaqs.sort((a, b) => a.sort_order - b.sort_order).map((faq) => <div key={faq.question}><h3 className="text-xl font-bold text-slate-900">{faq.question}</h3><p className="mt-2 leading-7 text-slate-700">{faq.answer}</p></div>)}</div></section>}<section className="mt-16 rounded-2xl bg-slate-950 p-8 text-white"><h2 className="text-2xl font-bold">Ready to find a service professional?</h2><p className="mt-2 text-white/80">Explore the Bubbles app to see the options available in your area.</p><Link href="/" className="mt-5 inline-block font-semibold text-white underline">Explore Bubbles</Link></section></main>
    <Footer />
  </>
}
