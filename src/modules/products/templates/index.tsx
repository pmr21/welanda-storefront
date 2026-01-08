import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductReviews from "@modules/products/components/product-reviews"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import ProductViewTracker from "@modules/analytics/ProductViewTracker"
import ScrollDepthTracker from "@modules/analytics/ScrollDepthTracker"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const price = (product.variants?.[0]?.calculated_price?.calculated_amount || 0) / 100

  return (
    <>
      {/* Analytics: Track Product View */}
      <ScrollDepthTracker pageType="product" pageId={product.id} />
      <ProductViewTracker 
        productId={product.id} 
        productName={product.title || ""} 
        price={price}
      />

      {/* Breadcrumb */}
      <div className="content-container pt-6">
        <nav className="flex items-center gap-2 text-sm" style={{ color: '#6B7280' }}>
          <a href="/" className="hover:text-[#C9A962] transition-colors">Home</a>
          <span>/</span>
          <a href="/store" className="hover:text-[#C9A962] transition-colors">Shop</a>
          <span>/</span>
          <span style={{ color: '#1A1A1A' }}>{product.title}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div
        className="content-container py-8 lg:py-12"
        data-testid="product-container"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Left: Image Gallery */}
          <div className="relative">
            <ImageGallery images={images} />
          </div>

          {/* Right: Product Info & Actions */}
          <div className="flex flex-col gap-y-8 lg:sticky lg:top-24 lg:self-start">
            {/* Product Info */}
            <ProductInfo product={product} />
            
            {/* Product Actions (Variants, Add to Cart) */}
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" style={{ color: '#C9A962' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm" style={{ color: '#4B5563' }}>Kostenloser Versand ab 50 €</span>
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

            {/* Product Tabs (Details, Shipping, etc.) */}
            <ProductTabs product={product} />
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="content-container my-16 lg:my-24" data-testid="product-reviews-container">
        <ProductReviews productId={product.id} />
      </div>

      {/* Related Products */}
      <div
        className="content-container my-16 lg:my-24"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
