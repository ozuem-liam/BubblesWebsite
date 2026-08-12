import Link from 'next/link'
import { Footer } from '@/components/global/Footer'
import { TopNav } from '@/components/global/TopNav'

type InfoPageProps = {
  eyebrow: string
  title: string
  introduction: string
  sections: Array<{ title: string; body: string }>
}

export function MarketplaceInfoPage({ eyebrow, title, introduction, sections }: InfoPageProps) {
  return (
    <>
      <section className="bg-[#001330] px-4 pb-20 pt-36 text-white lg:px-10">
        <TopNav />
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a9c7ff]">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85">{introduction}</p>
        </div>
      </section>
      <main className="px-4 py-16 lg:px-10">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {sections.map(({ title: sectionTitle, body }) => (
            <article key={sectionTitle} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-xl font-bold text-[#001330]">{sectionTitle}</h2>
              <p className="mt-3 leading-7 text-slate-700">{body}</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-5xl rounded-2xl bg-[#eef4ff] p-8 text-center">
          <h2 className="text-2xl font-bold text-[#001330]">Ready to explore Bubbles?</h2>
          <p className="mt-3 text-slate-700">Find the service professionals available in your area, or join as a service professional.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/#service" className="rounded-full bg-[#001330] px-5 py-3 font-semibold text-white">Explore services</Link>
            <Link href="/vendor" className="rounded-full border border-[#001330] px-5 py-3 font-semibold text-[#001330]">Join as a professional</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
