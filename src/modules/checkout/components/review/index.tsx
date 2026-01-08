"use client"

import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { useActionState } from "react"
import { useState } from "react"

type ReviewProps = {
  cart: HttpTypes.StoreCart
}

// Helper: Check if provider requires external redirect
const isRedirectBasedProvider = (providerId?: string) => {
  return providerId?.startsWith("pp_mollie") || providerId?.startsWith("pp_paypal")
}

const Review = ({ cart }: ReviewProps) => {
  const [state, formAction] = useActionState(placeOrder as any, null)
  const [isRedirecting, setIsRedirecting] = useState(false)
  
  const paymentSession = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )
  
  const hasPayment = !!paymentSession

  if (!hasPayment) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 opacity-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 font-semibold text-sm">4</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-400">Überprüfung</h2>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          Bitte wählen Sie zuerst eine Zahlungsmethode.
        </p>
      </div>
    )
  }

  // Check if this is a redirect-based payment (Mollie, PayPal)
  const isRedirectPayment = isRedirectBasedProvider(paymentSession?.provider_id)
  
  // Get the checkout URL from Mollie session data
  const checkoutUrl = paymentSession?.data?._links?.checkout?.href as string | undefined

  const handleRedirectPayment = () => {
    if (checkoutUrl) {
      setIsRedirecting(true)
      // Redirect to Mollie/PayPal checkout page
      window.location.href = checkoutUrl
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-full bg-[#C9A962] flex items-center justify-center">
          <span className="text-white font-semibold text-sm">4</span>
        </div>
        <h2 className="text-lg font-semibold text-[#1A1A1A]">Bestellung überprüfen</h2>
      </div>

      <div className="space-y-4 mb-6">
        <p className="text-sm text-gray-600">
          Bitte überprüfen Sie Ihre Bestellung, bevor Sie diese abschließen. 
          Mit dem Klick auf "Zahlungspflichtig bestellen" akzeptieren Sie unsere{" "}
          <a href="/agb" className="text-[#C9A962] hover:underline">AGB</a> und{" "}
          <a href="/datenschutz" className="text-[#C9A962] hover:underline">Datenschutzerklärung</a>.
        </p>

        <div className="p-4 bg-[#C9A962]/10 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-[#C9A962] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm">
              <p className="font-medium text-[#1A1A1A]">Hinweis zu personalisierten Produkten</p>
              <p className="text-gray-600 mt-1">
                Personalisierte Produkte sind vom Widerrufsrecht ausgeschlossen (§ 312g Abs. 2 Nr. 1 BGB).
              </p>
            </div>
          </div>
        </div>
      </div>

      {typeof state === "string" && state && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {state}
        </div>
      )}

      {isRedirectPayment && checkoutUrl ? (
        // Mollie/PayPal: Redirect to external payment page
        <button
          type="button"
          onClick={handleRedirectPayment}
          disabled={isRedirecting}
          className="w-full py-4 bg-[#C9A962] text-white font-semibold rounded-lg hover:bg-[#B8944F] transition-colors text-lg disabled:bg-gray-400"
        >
          {isRedirecting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Weiterleitung...
            </span>
          ) : (
            "Zahlungspflichtig bestellen"
          )}
        </button>
      ) : isRedirectPayment && !checkoutUrl ? (
        // Mollie/PayPal but no checkout URL - error state
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          Zahlungsinitialisierung fehlgeschlagen. Bitte wählen Sie eine andere Zahlungsmethode.
        </div>
      ) : (
        // Non-redirect payment (Stripe, Manual, etc.)
        <form action={formAction}>
          <input type="hidden" name="cart_id" value={cart.id} />
          
          <button
            type="submit"
            className="w-full py-4 bg-[#C9A962] text-white font-semibold rounded-lg hover:bg-[#B8944F] transition-colors text-lg"
          >
            Zahlungspflichtig bestellen
          </button>
        </form>
      )}

      <p className="mt-4 text-center text-xs text-gray-500">
        🔒 Sichere Zahlung • 14 Tage Rückgaberecht (außer personalisierte Produkte)
      </p>
    </div>
  )
}

export default Review
