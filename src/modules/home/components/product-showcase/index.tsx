"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState, useRef } from "react"

const COLOR_OPTIONS = [
  { name: "Black", slug: "black", hex: "#1A1A1A", image: "/images/products/dose-black.jpg" },
  { name: "Gold", slug: "gold", hex: "#D4AF37", image: "/images/products/dose-gold.jpg" },
  { name: "Champagner", slug: "champagner", hex: "#F7E7CE", image: "/images/products/dose-champagner.jpg" },
  { name: "Silver", slug: "silver", hex: "#C0C0C0", image: "/images/products/dose-silver.jpg" },
  { name: "Rosa", slug: "rosa", hex: "#E8B4B8", image: "/images/products/dose-rosa.jpg" },
  { name: "Lila", slug: "lila", hex: "#9B7BB8", image: "/images/products/dose-lila.jpg" },
  { name: "Blaugrau", slug: "blaugrau", hex: "#6B7D8C", image: "/images/products/dose-blaugrau.jpg" },
  { name: "Dark Green", slug: "dark-green", hex: "#2D4A3E", image: "/images/products/dose-dark-green.jpg" },
  { name: "Army Green", slug: "army-green", hex: "#4A5240", image: "/images/products/dose-army-green.jpg" },
  { name: "Gunmetal", slug: "gunmetal", hex: "#3D3D3D", image: "/images/products/dose-gunmetal.jpg" },
  { name: "Cognac", slug: "cognac", hex: "#8B5A2B", image: "/images/products/dose-cognac.jpg" },
  { name: "Mocca", slug: "mocca", hex: "#5D4037", image: "/images/products/dose-mocca.jpg" },
]

const ProductShowcase = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      })
    }
  }

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="content-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-[#C9A962] mb-4">
            <span className="w-8 h-px bg-[#C9A962]"></span>
            Unsere Kollektion
            <span className="w-8 h-px bg-[#C9A962]"></span>
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            Premium Snus Dosen
          </h2>
          <p className="text-gray-600">
            Entdecke unsere Kollektion in verschiedenen Farben – jede Dose ein Unikat
          </p>
        </div>

        {/* Desktop: Fan Layout */}
        <div className="hidden md:flex justify-center items-center gap-4 py-12">
          {COLOR_OPTIONS.map((color, index) => {
            const totalItems = COLOR_OPTIONS.length
            const middleIndex = Math.floor(totalItems / 2)
            const offset = index - middleIndex
            const rotation = offset * 5 // -15 to +15 degrees
            const translateY = Math.abs(offset) * 10 // Higher at edges
            const translateX = offset * 20 // Spread out

            return (
              <motion.div
                key={color.slug}
                className="relative cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg)`,
                  zIndex: hoveredIndex === index ? 20 : totalItems - Math.abs(offset),
                }}
                whileHover={{
                  scale: 1.15,
                  rotate: 0,
                  translateX: 0,
                  translateY: -20,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <LocalizedClientLink 
                  href={`/products/premium-snus-dose-grip?color=${color.slug}`}
                  className="block"
                >
                  <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gray-100">
                    {/* Placeholder if no image */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ backgroundColor: color.hex + "20" }}
                    >
                      <div 
                        className="w-32 h-32 rounded-full shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                    </div>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none" />
                  </div>

                  {/* Color Label */}
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full border border-gray-200"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-sm font-medium text-gray-700">{color.name}</span>
                  </div>
                </LocalizedClientLink>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile: Horizontal Carousel */}
        <div className="md:hidden relative">
          {/* Scroll buttons */}
          <button 
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-white"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-white"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel */}
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-8 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {COLOR_OPTIONS.map((color, index) => (
              <motion.div
                key={color.slug}
                className="flex-shrink-0 snap-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <LocalizedClientLink 
                  href={`/products/premium-snus-dose-grip?color=${color.slug}`}
                  className="block"
                >
                  <div className="relative w-56 h-56 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                    {/* Placeholder */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ backgroundColor: color.hex + "20" }}
                    >
                      <div 
                        className="w-36 h-36 rounded-full shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                    </div>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none" />
                  </div>

                  {/* Color Label */}
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full border border-gray-200"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-sm font-medium text-gray-700">{color.name}</span>
                  </div>

                  {/* Price */}
                  <div className="mt-1 text-center">
                    <span className="text-sm text-gray-500">Ab 29,90 € inkl. MwSt.</span>
                  </div>
                </LocalizedClientLink>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0A0A0A] text-white font-medium rounded-lg hover:bg-[#1A1A1A] transition-colors"
          >
            Alle Produkte ansehen
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase
