"use client"

import { placeOrder, retrieveCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type PaymentCallbackProps = {
  cart: HttpTypes.StoreCart
  countryCode: string
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
        // Refresh cart to get latest payment status
        const cart = await retrieveCart()
        
        if (!cart) {
          if (isMounted) {
            setStatus("error")
            setErrorMessage("Warenkorb nicht gefunden")
          }
          return
        }

        const paymentSession = cart.payment_collection?.payment_sessions?.find(
          (s) => s.status === "pending" || s.status === "authorized"
        )

        if (!paymentSession) {
          // No payment session - payment might have been cancelled or order already completed
          // Check if cart was already converted to order
          if (!cart.payment_collection?.payment_sessions?.length) {
            // Cart might have been completed - try redirecting to orders
            if (isMounted) {
              setStatus("cancelled")
            }
          }
          return
        }

        // IMPORTANT: Check Medusa payment session status FIRST (authoritative source)
        // The webhook updates paymentSession.status, not paymentSession.data.status
        const medusaStatus = paymentSession.status
        const mollieStatus = paymentSession.data?.status as string | undefined

        console.log("[Payment] Medusa status:", medusaStatus, "| Mollie data status:", mollieStatus, "| Attempt:", attempts)

        // If Medusa status is authorized, the webhook has confirmed the payment
        if (medusaStatus === "authorized") {
          // Payment confirmed by webhook - complete the order
          try {
            await placeOrder(cart.id)
            if (isMounted) {
              setStatus("success")
            }
            // placeOrder will redirect to order confirmation automatically
          } catch (err: any) {
            // If order completion fails, it might be because webhook already completed it
            // or there's a redirect happening
            if (err.message?.includes("redirect") || err.message?.includes("NEXT_REDIRECT")) {
              if (isMounted) {
                setStatus("success")
              }
            } else {
              console.error("[Payment] Order completion error:", err)
              if (isMounted) {
                setStatus("error")
                setErrorMessage(err.message || "Fehler beim Abschliessen der Bestellung")
              }
            }
          }
          return
        }

        // Check Mollie status from data field as fallback
        if (mollieStatus === "paid" || mollieStatus === "authorized" || mollieStatus === "captured") {
          // Payment successful according to Mollie - complete the order
          try {
            await placeOrder(cart.id)
            if (isMounted) {
              setStatus("success")
            }
          } catch (err: any) {
            if (err.message?.includes("redirect") || err.message?.includes("NEXT_REDIRECT")) {
              if (isMounted) {
                setStatus("success")
              }
            } else {
              if (isMounted) {
                setStatus("error")
                setErrorMessage(err.message || "Fehler beim Abschliessen der Bestellung")
              }
            }
          }
          return
        }

        if (mollieStatus === "cancelled" || mollieStatus === "expired" || mollieStatus === "failed") {
          if (isMounted) {
            setStatus("cancelled")
          }
          return
        }

        // Payment still processing - wait and retry
        if (mollieStatus === "open" || mollieStatus === "pending" || medusaStatus === "pending") {
          if (attempts < 15) {
            if (isMounted) {
              setAttempts(prev => prev + 1)
            }
            timeoutId = setTimeout(() => processPayment(), 2000) // Retry every 2 seconds
          } else {
            // Max attempts reached - but try to complete anyway in case webhook worked
            try {
              await placeOrder(cart.id)
              if (isMounted) {
                setStatus("success")
              }
            } catch (err: any) {
              if (isMounted) {
                setStatus("error")
                setErrorMessage("Zahlungsstatus konnte nicht abgefragt werden. Bitte kontaktieren Sie uns.")
              }
            }
          }
          return
        }

        // Unknown status - try to complete anyway
        try {
          await placeOrder(cart.id)
          if (isMounted) {
            setStatus("success")
          }
        } catch (err: any) {
          if (isMounted) {
            setStatus("error")
            setErrorMessage(err.message || "Fehler beim Abschliessen der Bestellung")
          }
        }
      } catch (err: any) {
        console.error("[Payment] Unexpected error:", err)
        if (isMounted) {
          setStatus("error")
          setErrorMessage(err.message || "Ein unerwarteter Fehler ist aufgetreten")
        }
      }
    }

    processPayment()

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, []) // Empty dependency array - only run once on mount

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
          <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-2">
            Zahlung wird verarbeitet...
          </h1>
          <p className="text-gray-600">
            Bitte warten Sie, waehrend wir Ihre Zahlung verarbeiten.
          </p>
          {attempts > 0 && (
            <p className="text-sm text-gray-400 mt-4">
              Pruefung {attempts}/15...
            </p>
          )}
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
          <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-2">
            Zahlung abgebrochen
          </h1>
          <p className="text-gray-600 mb-6">
            Die Zahlung wurde abgebrochen oder ist fehlgeschlagen. Ihr Warenkorb wurde nicht veraendert.
          </p>
          <button
            onClick={() => router.push(`/${countryCode}/checkout`)}
            className="px-6 py-3 bg-[#C9A962] text-white font-semibold rounded-lg hover:bg-[#B8944F] transition-colors"
          >
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
          <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-2">
            Fehler bei der Zahlung
          </h1>
          <p className="text-gray-600 mb-2">
            Bei der Verarbeitung Ihrer Zahlung ist ein Fehler aufgetreten.
          </p>
          {errorMessage && (
            <p className="text-red-600 text-sm mb-6">
              {errorMessage}
            </p>
          )}
          <div className="space-x-4">
            <button
              onClick={() => router.push(`/${countryCode}/checkout`)}
              className="px-6 py-3 bg-[#C9A962] text-white font-semibold rounded-lg hover:bg-[#B8944F] transition-colors"
            >
              Erneut versuchen
            </button>
            <button
              onClick={() => router.push(`/${countryCode}/kontakt`)}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Kontakt
            </button>
          </div>
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
        <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-2">
          Zahlung erfolgreich!
        </h1>
        <p className="text-gray-600">
          Sie werden zur Bestellbestaetigung weitergeleitet...
        </p>
      </div>
    </div>
  )
}

export default PaymentCallback
