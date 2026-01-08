'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    umami?: { track?: (event: string, data?: Record<string, unknown>) => void }
  }
}

type Props = {
  orderId: string
  total: number
  itemCount: number
}

export function OrderCompletedTracker({ orderId, total, itemCount }: Props) {
  const tracked = useRef(false)
  
  useEffect(() => {
    if (tracked.current) return
    
    try {
      if (typeof window !== 'undefined' && typeof window.umami?.track === 'function') {
        window.umami.track('purchase_completed', { 
          orderId, 
          total,
          itemCount
        })
        tracked.current = true
      }
    } catch (e) {
      // Silent fail
    }
  }, [orderId, total, itemCount])

  return null
}

export default OrderCompletedTracker
