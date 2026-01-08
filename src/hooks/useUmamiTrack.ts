import { useCallback } from 'react'

type WelandaEvent = 
  | 'product_view' 
  | 'editor_opened' 
  | 'editor_font_selected' 
  | 'editor_color_selected' 
  | 'editor_image_uploaded' 
  | 'personalization_complete'
  | 'add_to_cart' 
  | 'checkout_started' 
  | 'purchase_completed'
  | 'variant_selected'
  | 'coupon_success'
  | 'coupon_failed'
  | 'cart_removed'
  | 'scroll_depth'

declare global {
  interface Window {
    umami?: { track?: (event: string, data?: Record<string, unknown>) => void }
  }
}

export function useUmamiTrack() {
  const track = useCallback((event: WelandaEvent, data?: Record<string, unknown>) => {
    try {
      if (typeof window !== 'undefined' && typeof window.umami?.track === 'function') {
        window.umami.track(event, data)
      }
    } catch (e) {
      // Silent fail
    }
  }, [])
  
  return { track }
}

// Convenience Hook for Editor Tracking
export function useEditorTracking() {
  const { track } = useUmamiTrack()
  
  return {
    trackEditorOpened: (productId: string) => 
      track('editor_opened', { productId }),
    trackFontSelected: (fontName: string) => 
      track('editor_font_selected', { fontName }),
    trackColorSelected: (color: string, zone: 'lid' | 'bottom') => 
      track('editor_color_selected', { color, zone }),
    trackImageUploaded: (zone: 'lid' | 'bottom') => 
      track('editor_image_uploaded', { zone }),
    trackPersonalizationComplete: (productId: string, options: number) => 
      track('personalization_complete', { productId, options })
  }
}

// Convenience Hook for Checkout Tracking
export function useCheckoutTracking() {
  const { track } = useUmamiTrack()
  
  return {
    trackAddToCart: (productId: string, variantId: string, price: number) => 
      track('add_to_cart', { productId, variantId, price }),
    trackCheckoutStarted: (cartId: string, total: number) => 
      track('checkout_started', { cartId, total }),
    trackPurchaseCompleted: (orderId: string, total: number) => 
      track('purchase_completed', { orderId, total })
  }
}

// Convenience Hook for Product Tracking
export function useProductTracking() {
  const { track } = useUmamiTrack()
  
  return {
    trackProductView: (productId: string, productName: string, price: number) => 
      track('product_view', { productId, productName, price }),
    trackVariantSelected: (productId: string, variantName: string) => 
      track('variant_selected', { productId, variantName })
  }
}

export default useUmamiTrack
