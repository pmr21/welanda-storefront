import { HttpTypes } from "@medusajs/types"

// FREE_SHIPPING_THRESHOLD in Cents (100 EUR)
const FREE_SHIPPING_THRESHOLD = 10000

type CartTotalsProps = {
  totals: HttpTypes.StoreCart | HttpTypes.StoreOrder
}

// Helper to get personalization price from line item metadata
const getPersonalizationPrice = (metadata: Record<string, any> | null | undefined): number => {
  if (!metadata?.personalization) return 0
  try {
    const personalization = typeof metadata.personalization === "string"
      ? JSON.parse(metadata.personalization)
      : metadata.personalization
    return personalization?.totalPrice || 0
  } catch {
    return 0
  }
}

// Calculate total personalization cost from all items
const calculateTotalPersonalization = (items: any[] | undefined): number => {
  if (!items) return 0
  return items.reduce((sum, item) => {
    const itemPersonalization = getPersonalizationPrice(item.metadata)
    return sum + (itemPersonalization * (item.quantity || 1))
  }, 0)
}

const CartTotals = ({ totals }: CartTotalsProps) => {
  const {
    subtotal,
    discount_total,
    gift_card_total,
    tax_total,
    shipping_total,
    total,
  } = totals

  // Get items from cart/order
  const items = "items" in totals ? totals.items : undefined
  const totalPersonalization = calculateTotalPersonalization(items)
  
  // Check if shipping address exists (for Bug 2.5)
  const hasShippingAddress = "shipping_address" in totals && totals.shipping_address?.address_1
  
  // Check if cart qualifies for free shipping (subtotal >= 100 EUR)
  const qualifiesForFreeShipping = (subtotal ?? 0) >= FREE_SHIPPING_THRESHOLD
  
  // Calculate effective shipping cost (0 if qualifies for free shipping)
  const effectiveShippingCost = qualifiesForFreeShipping ? 0 : (shipping_total ?? 0)

  const formatPrice = (amount: number | null | undefined) => {
    if (amount == null) return "0,00 €"
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  // Adjusted totals including personalization
  const adjustedSubtotal = (subtotal ?? 0) + totalPersonalization
  
  // Adjust total: if qualifies for free shipping, subtract the shipping_total and add back 0
  const shippingAdjustment = qualifiesForFreeShipping ? -(shipping_total ?? 0) : 0
  const adjustedTotal = (total ?? 0) + totalPersonalization + shippingAdjustment

  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between text-gray-600">
        <span>Zwischensumme</span>
        <span>{formatPrice(adjustedSubtotal)}</span>
      </div>
      
      {totalPersonalization > 0 && (
        <div className="flex justify-between text-[#C9A962]">
          <span>davon Personalisierung</span>
          <span>{formatPrice(totalPersonalization)}</span>
        </div>
      )}
      
      {discount_total > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Rabatt</span>
          <span>-{formatPrice(discount_total)}</span>
        </div>
      )}
      
      {gift_card_total > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Gutschein</span>
          <span>-{formatPrice(gift_card_total)}</span>
        </div>
      )}
      
      <div className="flex justify-between text-gray-600">
        <span>Versand</span>
        <span>
          {!hasShippingAddress ? (
            <span className="text-ui-fg-muted">Wird im Checkout berechnet</span>
          ) : qualifiesForFreeShipping || effectiveShippingCost === 0 ? (
            <span className="text-green-600">Kostenlos</span>
          ) : (
            formatPrice(effectiveShippingCost)
          )}
        </span>
      </div>
      
      {qualifiesForFreeShipping && shipping_total && shipping_total > 0 && (
        <div className="flex justify-between text-xs text-green-600">
          <span>Gratisversand ab 100 EUR</span>
          <span className="line-through text-gray-400">{formatPrice(shipping_total)}</span>
        </div>
      )}
      
      <div className="flex justify-between text-gray-600">
        <span>MwSt. (19%)</span>
        <span>{formatPrice(tax_total)}</span>
      </div>
      
      <div className="pt-3 mt-3 border-t border-gray-200">
        <div className="flex justify-between text-lg font-semibold text-[#1A1A1A]">
          <span>Gesamt</span>
          <span>{formatPrice(adjustedTotal)}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">inkl. MwSt.</p>
      </div>
    </div>
  )
}

export default CartTotals
