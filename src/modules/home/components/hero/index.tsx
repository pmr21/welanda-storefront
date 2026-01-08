"use client"

import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative w-full" style={{ backgroundColor: '#FAF9F7' }}>
      {/* Main Hero Content */}
      <div className="content-container">
        <div className="grid small:grid-cols-2 gap-8 items-center min-h-[85vh] py-16 small:py-0">
          
          {/* Left: Text Content */}
          <div className="flex flex-col gap-6 order-2 small:order-1">
            {/* Tagline */}
            <span className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase" style={{ color: '#C9A962' }}>
              <span className="w-8 h-px" style={{ backgroundColor: '#C9A962' }}></span>
              Premium Accessories
            </span>

            {/* Main Headline */}
            <h1 className="font-display text-4xl small:text-5xl medium:text-6xl font-bold tracking-tight leading-[1.1]" style={{ color: '#0A0A0A' }}>
              Dein Style.
              <br />
              <span style={{ color: '#C9A962' }}>Laser-graviert.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg max-w-md leading-relaxed" style={{ color: '#4B5563' }}>
              Hochwertige Snus Dosen aus CNC-gefrästem Aluminium. 
              Personalisiere mit deinem eigenen Design – gefertigt in Hamburg.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col xsmall:flex-row gap-4 mt-4">
              <LocalizedClientLink 
                href="/store"
                className="px-8 py-3 text-center font-medium tracking-wide transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
              >
                Kollektion entdecken
              </LocalizedClientLink>
              <button 
                onClick={scrollToHowItWorks}
                className="px-8 py-3 text-center font-medium tracking-wide border transition-all duration-300 hover:bg-gray-100 cursor-pointer"
                style={{ borderColor: '#1A1A1A', color: '#1A1A1A' }}
              >
                So funktioniert's
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" style={{ color: '#C9A962' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm" style={{ color: '#4B5563' }}>Kostenloser Versand ab 50€</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" style={{ color: '#C9A962' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm" style={{ color: '#4B5563' }}>Personalisiert in Hamburg</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" style={{ color: '#C9A962' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm" style={{ color: '#4B5563' }}>14 Tage Rückgabe</span>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative order-1 small:order-2">
            <div className="relative aspect-square rounded-2xl overflow-hidden" style={{ backgroundColor: '#F3F4F6' }}>
              <Image
                src="/images/hero/welanda-snus-dosen-kollektion.jpg"
                alt="WELANDA Premium Snus Dosen Kollektion - Personalisierbare Aluminium Cases mit Lasergravur"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Decorative blur effects */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl" style={{ backgroundColor: 'rgba(201, 169, 98, 0.2)' }}></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}></div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 small:bottom-8 small:-left-8 bg-white shadow-xl rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}>
                  <svg className="w-6 h-6" style={{ color: '#C9A962' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold" style={{ color: '#1A1A1A' }}>Personalisierbar</p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>Dein Design, deine Dose</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </section>
  )
}

export default Hero
