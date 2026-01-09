import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import USPBar from "@modules/home/components/usp-bar"
import HowItWorks from "@modules/home/components/how-it-works"
import TrustSection from "@modules/home/components/trust-section"
import ProductShowcase from "@modules/home/components/product-showcase"
import { OrganizationSchema } from "@modules/seo/components"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getBaseURL } from "@lib/util/env"

const baseUrl = getBaseURL()

export const metadata: Metadata = {
  title: { absolute: "WELANDA - Personalisierte Premium Snus Dosen | Lasergravur Made in Germany" },
  description: "Hochwertige Snus Dosen aus CNC-gefrastem Aluminium. Personalisiere mit deinem eigenen Design - gefertigt in Hamburg. Kostenlose Gravur, schneller Versand.",
  keywords: "snus dose, snus container, personalisiert, lasergravur, aluminium, premium, hamburg, deutschland",
  alternates: {
    canonical: `${baseUrl}/de`,
  },
  openGraph: {
    title: "WELANDA - Personalisierte Premium Snus Dosen",
    description: "Hochwertige Snus Dosen aus CNC-gefrastem Aluminium. Personalisiere mit deinem eigenen Design - gefertigt in Hamburg.",
    type: "website",
    locale: "de_DE",
    siteName: "WELANDA",
    url: `${baseUrl}/de`,
    images: [
      {
        url: `${baseUrl}/opengraph-image.jpg`,
        width: 1200,
        height: 630,
        alt: "WELANDA Premium Snus Dosen - Personalisierbare Aluminium Cases mit Lasergravur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WELANDA - Personalisierte Premium Snus Dosen",
    description: "Hochwertige Snus Dosen aus CNC-gefrastem Aluminium. Personalisiere mit deinem eigenen Design.",
    images: [`${baseUrl}/twitter-image.jpg`],
  },
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      {/* Organization Schema for SEO */}
      <OrganizationSchema />

      {/* Hero Section */}
      <Hero />

      {/* USP Bar */}
      <USPBar />

      {/* Interactive Product Showcase */}
      <ProductShowcase />

      {/* How It Works */}
      <HowItWorks />

      {/* Featured Products - Full Grid */}
      <section className="py-16 bg-[#FAF9F7]">
        <div className="content-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-[#C9A962] mb-4">
              <span className="w-8 h-px bg-[#C9A962]"></span>
              Weitere Produkte
              <span className="w-8 h-px bg-[#C9A962]"></span>
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
              Das komplette Sortiment
            </h2>
            <p className="text-gray-600">
              Alle unsere handgefertigten Dosen aus hochwertigem Aluminium
            </p>
          </div>
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      </section>

      {/* Trust Section / Reviews */}
      <TrustSection />
    </>
  )
}
