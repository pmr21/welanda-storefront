"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useState, useRef, TouchEvent, useEffect } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)
  
  // Swipe handling
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)
  const minSwipeDistance = 50

  const selectedImage = images[selectedIndex] || null

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const goToPrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && images.length > 1) {
      goToNext()
    }
    if (isRightSwipe && images.length > 1) {
      goToPrev()
    }
  }

  // Scroll selected thumbnail into view
  useEffect(() => {
    if (thumbnailContainerRef.current && images.length > 1) {
      const container = thumbnailContainerRef.current
      const selectedThumb = container.children[selectedIndex] as HTMLElement
      if (selectedThumb) {
        const containerRect = container.getBoundingClientRect()
        const thumbRect = selectedThumb.getBoundingClientRect()
        
        // Check if thumbnail is outside visible area
        if (thumbRect.left < containerRect.left || thumbRect.right > containerRect.right) {
          selectedThumb.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest', 
            inline: 'center' 
          })
        }
      }
    }
  }, [selectedIndex, images.length])

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Main Image */}
        <div
          className="relative aspect-square w-full overflow-hidden rounded-lg cursor-zoom-in"
          style={{ backgroundColor: '#F8F8F8' }}
          onClick={() => selectedImage && setIsLightboxOpen(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {selectedImage ? (
            <Image
              src={selectedImage.url}
              alt="Produktbild"
              fill
              className="object-cover object-center transition-transform duration-300 hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
              >
                <svg
                  className="w-12 h-12"
                  style={{ color: '#D4AF37' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          )}
          
          {/* Zoom Icon Overlay */}
          {selectedImage && (
            <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          )}

          {/* Navigation Arrows on Main Image (visible on hover, desktop only) */}
          {images.length > 1 && (
            <>
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity hidden md:block hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrev()
                }}
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity hidden md:block hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Horizontal Scrollable Thumbnails - Max 4 visible, larger size */}
        {images.length > 1 && (
          <div 
            ref={thumbnailContainerRef}
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'thin',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {images.map((image, index) => (
              <button
                key={image.id || index}
                className={`relative flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200 snap-start border-2 ${
                  selectedIndex === index 
                    ? 'border-[#D4AF37]' 
                    : 'border-gray-200 hover:border-[#D4AF37]/50'
                }`}
                style={{ 
                  backgroundColor: '#F8F8F8',
                  // Calculate width: (100% - 3 gaps of 8px) / 4 = ~23.5% each
                  width: 'calc((100% - 24px) / 4)',
                  aspectRatio: '1 / 1',
                  minWidth: '70px',
                  maxWidth: '120px',
                }}
                onClick={() => setSelectedIndex(index)}
              >
                <Image
                  src={image.url}
                  alt={`Produktbild ${index + 1}`}
                  fill
                  className="object-cover object-center"
                  sizes="120px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 text-white hover:text-[#D4AF37] transition-colors z-10"
            onClick={() => setIsLightboxOpen(false)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Arrows (Desktop) */}
          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 text-white hover:text-[#D4AF37] transition-colors z-10 p-2 hidden md:block"
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrev()
                }}
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute right-4 text-white hover:text-[#D4AF37] transition-colors z-10 p-2 hidden md:block"
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Main Lightbox Image */}
          <div 
            className="relative w-full h-full max-w-4xl max-h-[80vh] m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.url}
              alt="Produktbild vergrößert"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Image Counter & Thumbnails in Lightbox */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-3">
              {/* Horizontal Thumbnails in Lightbox */}
              <div className="flex gap-2 px-4 overflow-x-auto max-w-full">
                {images.map((image, index) => (
                  <button
                    key={image.id || index}
                    className={`relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded border-2 transition-all ${
                      selectedIndex === index 
                        ? 'border-[#D4AF37] opacity-100' 
                        : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedIndex(index)
                    }}
                  >
                    <Image
                      src={image.url}
                      alt={`Bild ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </button>
                ))}
              </div>
              {/* Counter */}
              <div className="text-white/60 text-sm">
                {selectedIndex + 1} / {images.length}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ImageGallery
