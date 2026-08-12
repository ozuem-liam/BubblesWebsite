import Link from 'next/link'

type LocationServicePageProps = {
  city: string
  region: string
  description: string
  neighbourhoods: string[]
  faq: Array<{ question: string; answer: string }>
}

export function LocationServicePage({
  city,
  region,
  description,
  neighbourhoods,
  faq,
}: LocationServicePageProps) {
  return (
    <main className="bg-white text-[#001029]">
      <section className="bg-[#001330] px-4 py-20 text-white sm:py-28 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#a9c7ff]">
            Bubbles in {city}
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">
            Find service professionals in {city}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85">{description}</p>
          <Link
            href="/#contact"
            className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-bold text-[#001330] transition hover:bg-[#dce8ff]"
          >
            Check availability in {city}
          </Link>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-10">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-3xl font-bold">A simpler way to get things done in {city}</h2>
            <p className="mt-5 leading-8 text-slate-700">
              Bubbles helps you discover independent professionals for everyday services. Compare available options,
              send a request, and manage the booking in one place.
            </p>
            <ul className="mt-6 grid gap-3 text-slate-700 sm:grid-cols-2">
              <li>• Vendor-offered laundry and dry cleaning</li>
              <li>• Vendor-offered home and office cleaning</li>
              <li>• Vendor-offered fumigation and pest control</li>
              <li>• Booking support when a request needs attention</li>
            </ul>
          </div>
          <aside className="rounded-2xl bg-[#eef4ff] p-7">
            <h2 className="text-xl font-bold">Service areas</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Availability depends on the category and independent provider. Areas we are building for in {city} include:
            </p>
            <p className="mt-4 font-medium text-[#001330]">{neighbourhoods.join(', ')}</p>
          </aside>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold">Frequently asked questions about Bubbles in {city}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {faq.map(({ question, answer }) => (
              <article key={question} className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold">{question}</h3>
                <p className="mt-3 leading-7 text-slate-700">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 text-center lg:px-10">
        <h2 className="text-3xl font-bold">Looking for a professional in {city}?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-700">
          Tell us what you need and where you are. We will help you check the independent professionals available in your area.
        </p>
        <Link href="/#contact" className="mt-7 inline-flex rounded-full bg-[#001330] px-6 py-3 font-bold text-white">
          Contact Bubbles
        </Link>
      </section>
    </main>
  )
}
