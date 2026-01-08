'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    umami?: { track?: (event: string, data?: Record<string, unknown>) => void }
  }
}

type Props = {
  cartId: string
  total: number
}

export function CheckoutTracker({ cartId, total }: Props) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && typeof window.umami?.track === 'function') {
        window.umami.track('checkout_started', { 
          cartId, 
          total 
        })
      }
    } catch (e) {
      // Silent fail
    }
  }, [cartId, total])

  return null
}

export default CheckoutTracker
