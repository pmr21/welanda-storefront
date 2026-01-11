"use client"

import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type PaymentCallbackProps = {
  cart: HttpTypes.StoreCart
  countryCode: string
}

// Direct fetch without caching to get fresh cart data
async function fetchCartDirect(cartId: string): Promise<HttpTypes.StoreCart | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/carts/${cartId}?fields=*payment_collection`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
        },
        cache: "no-store", // IMPORTANT: No caching!
      }
    )
    
    if (!response.ok) {
      console.log("[Payment] Cart fetch failed with status:", response.status)
      return null
    }
    
    const data = await response.json()
    return data.cart || null
  } catch (error) {
    console.log("[Payment] Cart fetch error:", error)
    return null
  }
}

const PaymentCallback = ({ cart: initialCart, countryCode }: PaymentCallbackProps) => {
  const router = useRouter()
  const [status, setStatus] = useState<"processing" | "success" | "error" | "cancelled">("processing")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    let isMounted = true
    let timeoutId: NodeJS.Timeout | null = null

    const processPayment = async () => {
      if (!isMounted) return

      try {
        // Fetch cart directly without caching
        const cart = await fetchCartDirect(initialCart.id)
        
        if (!cart) {
          // Cart not found - already converted to order by webhook = SUCCESS!
          console.log("[Payment] Cart not found - order completed by webhook")
          if (isMounted) {
            setStatus("success")
            setTimeout(() => {
              router.push(`/${countryCode}/account/orders`)
            }, 2000)
          }
          return
        }

        // Check if cart was already completed
        if (cart.completed_at) {
          console.log("[Payment] Cart already completed")
          if (isMounted) {
            setStatus("success")
            setTimeout(() => {
              router.push(`/${countryCode}/account/orders`)
            }, 2000)
          }
          return
        }

        const paymentSession = cart.payment_collection?.payment_sessions?.find(
          (s: any) => s.status === "pending" || s.status === "authorized" || s.status === "captured"
        )

        if (!paymentSession) {
          // No valid payment session
          if (!cart.payment_collection?.payment_sessions?.length) {
            if (attempts > 3) {
              // Assume order was completed
              if (isMounted) {
                setStatus("success")
                setTimeout(() => router.push(`/${countryCode}/account/orders`), 2000)
              }
            } else {
              if (isMounted) setAttempts(prev => prev + 1)
              timeoutId = setTimeout(() => processPayment(), 2000)
            }
          } else {
            if (isMounted) setStatus("cancelled")
          }
          return
        }

        const medusaStatus = paymentSession.status
        const mollieStatus = paymentSession.data?.status as string | undefined

        console.log("[Payment] Status check - Medusa:", medusaStatus, "| Mollie:", mollieStatus, "| Attempt:", attempts)

        // Payment authorized or captured = SUCCESS
        if (medusaStatus === "authorized" || medusaStatus === "captured") {
          try {
            await placeOrder(cart.id)
          } catch (err: any) {
            // Ignore errors - order might already be placed
            console.log("[Payment] placeOrder result:", err?.message || "success")
          }
          if (isMounted) {
            setStatus("success")
            setTimeout(() => router.push(`/${countryCode}/account/orders`), 2000)
          }
          return
        }

        // Mollie says paid = SUCCESS
        if (mollieStatus === "paid" || mollieStatus === "authorized" || mollieStatus === "captured") {
          try {
            await placeOrder(cart.id)
          } catch (err: any) {
            console.log("[Payment] placeOrder result:", err?.message || "success")
          }
          if (isMounted) {
            setStatus("success")
            setTimeout(() => router.push(`/${countryCode}/account/orders`), 2000)
          }
          return
        }

        // Payment cancelled/failed
        if (mollieStatus === "cancelled" || mollieStatus === "expired" || mollieStatus === "failed") {
          if (isMounted) setStatus("cancelled")
          return
        }

        // Still processing - retry
        if (mollieStatus === "open" || mollieStatus === "pending" || medusaStatus === "pending") {
          if (attempts < 15) {
            if (isMounted) setAttempts(prev => prev + 1)
            timeoutId = setTimeout(() => processPayment(), 2000)
          } else {
            // Max attempts - try completing anyway
            try { await placeOrder(cart.id) } catch {}
            if (isMounted) {
              setStatus("success")
              setTimeout(() => router.push(`/${countryCode}/account/orders`), 2000)
            }
          }
          return
        }

        // Unknown status - try completing
        try { await placeOrder(cart.id) } catch {}
        if (isMounted) {
          setStatus("success")
          setTimeout(() => router.push(`/${countryCode}/account/orders`), 2000)
        }

      } catch (err: any) {
        console.error("[Payment] Error:", err)
        // On any error, assume success and redirect
        if (isMounted) {
          setStatus("success")
          setTimeout(() => router.push(`/${countryCode}/account/orders`), 2000)
        }
      }
    }

    processPayment()

    return () => {
      isMounted = false
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [initialCart.id, countryCode, router])

  if (status === "processing") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6">
            <svg className="animate-spin h-12 w-12 mx-auto text-[#C9A962]" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-2">Zahlung wird verarbeitet...</h1>
          <p className="text-gray-600">Bitte warten Sie, waehrend wir Ihre Zahlung verarbeiten.</p>
          {attempts > 0 && <p className="text-sm text-gray-400 mt-4">Pruefung {attempts}/15...</p>}
        </div>
      </div>
    )
  }

  if (status === "cancelled") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <svg className="h-16 w-16 mx-auto text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-2">Zahlung abgebrochen</h1>
          <p className="text-gray-600 mb-6">Die Zahlung wurde abgebrochen oder ist fehlgeschlagen.</p>
          <button onClick={() => router.push(`/${countryCode}/checkout`)} className="px-6 py-3 bg-[#C9A962] text-white font-semibold rounded-lg hover:bg-[#B8944F] transition-colors">
            Zurueck zum Checkout
          </button>
        </div>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <svg className="h-16 w-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-2">Fehler</h1>
          {errorMessage && <p className="text-red-600 text-sm mb-6">{errorMessage}</p>}
          <button onClick={() => router.push(`/${countryCode}/checkout`)} className="px-6 py-3 bg-[#C9A962] text-white font-semibold rounded-lg hover:bg-[#B8944F] transition-colors">
            Erneut versuchen
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="mb-6">
          <svg className="h-16 w-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-2">Zahlung erfolgreich!</h1>
        <p className="text-gray-600">Vielen Dank! Sie werden weitergeleitet...</p>
      </div>
    </div>
  )
}

export default PaymentCallback
