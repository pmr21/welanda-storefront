import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink 
      href={`/products/${product.handle}`} 
      className="group block"
    >
      <div 
        className="relative overflow-hidden transition-all duration-300"
        data-testid="product-wrapper"
      >
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-lg">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
          
          {/* Quick View Badge - appears on hover */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span 
              className="px-4 py-2 text-xs font-medium tracking-wide uppercase rounded-full"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#1A1A1A',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              Ansehen
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-1">
          {/* Product Title */}
          <h3 
            className="font-medium text-base transition-colors duration-200 group-hover:text-[#C9A962]"
            style={{ color: '#1A1A1A' }}
            data-testid="product-title"
          >
            {product.title}
          </h3>
          
          {/* Subtitle if available */}
          {product.subtitle && (
            <p 
              className="text-sm"
              style={{ color: '#6B7280' }}
            >
              {product.subtitle}
            </p>
          )}
          
          {/* Price */}
          <div className="pt-1">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
        
        {/* Bottom Border Animation */}
        <div 
          className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-out"
          style={{ backgroundColor: '#C9A962' }}
        />
      </div>
    </LocalizedClientLink>
  )
}
