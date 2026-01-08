"use client"

// FREE_SHIPPING_THRESHOLD in Cents (Medusa v2 stores prices in smallest currency unit)
const FREE_SHIPPING_THRESHOLD = 10000 // 100 EUR = 10000 Cents

type FreeShippingBarProps = {
  cartSubtotal: number // in Cents (Medusa v2 stores prices in smallest currency unit)
}

export default function FreeShippingBar({ cartSubtotal }: FreeShippingBarProps) {
  const remaining = FREE_SHIPPING_THRESHOLD - cartSubtotal
  const progress = Math.min((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const hasFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD

  if (hasFreeShipping) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-green-700 font-medium">
            Gratisversand freigeschaltet!
          </span>
        </div>
      </div>
    )
  }

  // Format remaining as EUR (convert from cents)
  const remainingEur = (remaining / 100).toFixed(2).replace(".", ",")

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          <span className="text-amber-800 text-sm">
            Noch <strong>{remainingEur} EUR</strong> bis zum Gratisversand
          </span>
        </div>
      </div>
      <div className="w-full bg-amber-200 rounded-full h-2">
        <div
          className="bg-[#C9A962] h-2 rounded-full transition-all duration-300"
          style={{ width: progress + "%" }}
        />
      </div>
    </div>
  )
}
