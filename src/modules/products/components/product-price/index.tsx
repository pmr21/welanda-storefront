import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import { getProductPrice } from "@lib/util/get-product-price"

export default function ProductPrice({
  product,
  variant,
  showVatHint = true,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  showVatHint?: boolean
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-baseline gap-3">
        {selectedPrice.price_type === "sale" && (
          <>
            {/* Original Price */}
            <span
              className="text-lg line-through"
              style={{ color: '#9CA3AF' }}
            >
              {selectedPrice.original_price}
            </span>
            
            {/* Sale Price */}
            <span
              className="text-3xl font-bold"
              style={{ color: '#C9A962' }}
              data-testid="product-price"
            >
              {selectedPrice.calculated_price}
            </span>
            
            {/* Discount Badge */}
            <span 
              className="px-2 py-1 text-xs font-semibold rounded"
              style={{ backgroundColor: '#C9A962', color: '#FFFFFF' }}
            >
              -{selectedPrice.percentage_diff}%
            </span>
          </>
        )}

        {selectedPrice.price_type !== "sale" && (
          <span
            className="text-3xl font-bold"
            style={{ color: '#1A1A1A' }}
            data-testid="product-price"
          >
            {selectedPrice.calculated_price}
          </span>
        )}
      </div>
      
      {/* MwSt. Hinweis - rechtlich erforderlich für DE */}
      {showVatHint && (
        <span className="text-xs text-gray-500 mt-1">
          inkl. MwSt.{" "}
          <LocalizedClientLink href="/versand" className="underline hover:text-gray-700">
            zzgl. Versand
          </LocalizedClientLink>
        </span>
      )}
    </div>
  )
}
