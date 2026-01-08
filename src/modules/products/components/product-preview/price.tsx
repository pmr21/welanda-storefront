import { clx } from "@medusajs/ui"

export default function PreviewPrice({
  price,
}: {
  price: {
    calculated_price_number: number
    calculated_price: string
    original_price_number: number
    original_price: string
    currency_code: string
    price_type: string
    percentage_diff: string
  }
}) {
  const hasDiscount = price.price_type === "sale"

  return (
    <div className="flex items-center gap-2">
      {hasDiscount && (
        <>
          {/* Original Price - Strikethrough */}
          <span
            className="text-sm line-through"
            style={{ color: '#9CA3AF' }}
            data-testid="original-price"
          >
            {price.original_price}
          </span>
          
          {/* Sale Price */}
          <span
            className="font-semibold text-base"
            style={{ color: '#C9A962' }}
            data-testid="price"
          >
            {price.calculated_price}
          </span>
          
          {/* Discount Badge */}
          <span 
            className="text-xs font-medium px-2 py-0.5 rounded"
            style={{ 
              backgroundColor: 'rgba(201, 169, 98, 0.1)',
              color: '#C9A962'
            }}
          >
            -{price.percentage_diff}%
          </span>
        </>
      )}
      
      {!hasDiscount && (
        <span
          className="font-semibold text-base"
          style={{ color: '#1A1A1A' }}
          data-testid="price"
        >
          {price.calculated_price}
        </span>
      )}
    </div>
  )
}
