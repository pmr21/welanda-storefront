import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4">
        {/* Collection Link */}
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase transition-colors hover:text-[#C9A962]"
            style={{ color: '#C9A962' }}
          >
            <span className="w-6 h-px" style={{ backgroundColor: '#C9A962' }}></span>
            {product.collection.title}
          </LocalizedClientLink>
        )}
        
        {/* Product Title */}
        <h1
          className="text-3xl lg:text-4xl font-bold tracking-tight"
          style={{ color: '#0A0A0A' }}
          data-testid="product-title"
        >
          {product.title}
        </h1>

        {/* Subtitle */}
        {product.subtitle && (
          <p 
            className="text-lg"
            style={{ color: '#6B7280' }}
          >
            {product.subtitle}
          </p>
        )}

        {/* Description */}
        <p
          className="text-base leading-relaxed whitespace-pre-line"
          style={{ color: '#4B5563' }}
          data-testid="product-description"
        >
          {product.description}
        </p>

        {/* Features List */}
        <div className="flex flex-wrap gap-3 pt-2">
          <span 
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)', color: '#C9A962' }}
          >
            CNC-gefräst
          </span>
          <span 
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)', color: '#C9A962' }}
          >
            Aluminium
          </span>
          <span 
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)', color: '#C9A962' }}
          >
            Personalisierbar
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
