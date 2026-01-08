'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    umami?: { track?: (event: string, data?: Record<string, unknown>) => void }
  }
}

type Props = {
  productId: string
  productName: string
  price: number
}

export function ProductViewTracker({ productId, productName, price }: Props) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && typeof window.umami?.track === 'function') {
        window.umami.track('product_view', { productId, productName, price })
      }
    } catch (e) {
      // Silent fail - analytics should not break the app
    }
  }, [productId, productName, price])

  return null
}

export default ProductViewTracker
