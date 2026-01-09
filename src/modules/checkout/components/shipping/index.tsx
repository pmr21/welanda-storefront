"use client"

import { setShippingMethod } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

// FREE_SHIPPING_THRESHOLD in Cents (100 EUR)
const FREE_SHIPPING_THRESHOLD = 10000

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[]
}

const Shipping = ({ cart, availableShippingMethods }: ShippingProps) => {
  const hasShippingMethod = (cart.shipping_methods?.length ?? 0) > 0
  const [isEditing, setIsEditing] = useState(!hasShippingMethod)
  const [selectedMethod, setSelectedMethod] = useState<string>(
    cart.shipping_methods?.[0]?.shipping_option_id || ""
  )
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  
  const hasAddress = cart.shipping_address?.address_1
  
  // Check if cart qualifies for free shipping (subtotal >= 100 EUR)
  const cartSubtotal = cart.subtotal ?? 0
  const qualifiesForFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!selectedMethod) {
      setError("Bitte waehlen Sie eine Versandart")
      return
    }

    startTransition(async () => {
      try {
        await setShippingMethod({
          cartId: cart.id,
          shippingMethodId: selectedMethod
        })
        setIsEditing(false)
        router.refresh()
      } catch (err: any) {
        setError(err.message || "Fehler beim Setzen der Versandart")
      }
    })
  }

  if (!hasAddress) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 opacity-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 font-semibold text-sm">2</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-400">Versandart</h2>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          Bitte geben Sie zuerst Ihre Lieferadresse ein.
        </p>
      </div>
    )
  }

  // Completed state - show summary with edit button
  if (hasShippingMethod && !isEditing && !error) {
    const currentMethod = availableShippingMethods.find(
      m => m.id === cart.shipping_methods?.[0]?.shipping_option_id
    )
    
    // Display price: if qualifies for free shipping, show "Kostenlos"
    const displayPrice = qualifiesForFreeShipping 
      ? "Kostenlos" 
      : (currentMethod?.amount === 0 
        ? "Kostenlos" 
        : currentMethod?.amount 
          ? (currentMethod.amount).toFixed(2).replace(".", ",") + " EUR"
          : "Kostenlos")
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-[#1A1A1A]">Versandart</h2>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-[#C9A962] hover:text-[#B8944F] font-medium"
          >
            Bearbeiten
          </button>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span className="text-[#1A1A1A]">{currentMethod?.name || "Standard Versand"}</span>
          </div>
          <span className={"font-medium " + (qualifiesForFreeShipping ? "text-green-600" : "text-[#1A1A1A]")}>
            {displayPrice}
          </span>
        </div>
        
        {qualifiesForFreeShipping && (
          <div className="mt-3 text-xs text-green-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Gratisversand ab 100 EUR Bestellwert
          </div>
        )}
      </div>
    )
  }

  // Edit mode
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#C9A962] flex items-center justify-center">
            <span className="text-white font-semibold text-sm">2</span>
          </div>
          <h2 className="text-lg font-semibold text-[#1A1A1A]">Versandart</h2>
        </div>
        {hasShippingMethod && (
          <button
            onClick={() => setIsEditing(false)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Abbrechen
          </button>
        )}
      </div>
      
      {qualifiesForFreeShipping && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2 text-green-700 text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Gratisversand freigeschaltet!</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          {availableShippingMethods.length > 0 ? (
            availableShippingMethods.map((method) => {
              // If qualifies for free shipping, show all methods as free
              const originalPrice = method.amount ? (method.amount).toFixed(2).replace(".", ",") : "0,00"
              const isFree = qualifiesForFreeShipping || !method.amount || method.amount === 0
              const displayPrice = isFree ? "Kostenlos" : originalPrice + " EUR"
              
              return (
                <label
                  key={method.id}
                  className={"flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all " +
                    (selectedMethod === method.id
                      ? "border-[#C9A962] bg-[#C9A962]/5"
                      : "border-gray-200 hover:border-gray-300")
                  }
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping_option_id"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={() => setSelectedMethod(method.id)}
                      className="w-4 h-4 text-[#C9A962] focus:ring-[#C9A962]"
                    />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">{method.name}</p>
                      <p className="text-sm text-gray-500">
                        {method.name?.toLowerCase().includes("express") 
                          ? "1-2 Werktage" 
                          : "3-5 Werktage"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={"font-medium " + (isFree ? "text-green-600" : "text-[#1A1A1A]")}>
                      {displayPrice}
                    </span>
                    {qualifiesForFreeShipping && method.amount && method.amount > 0 && (
                      <p className="text-xs text-gray-400 line-through">
                        {originalPrice} EUR
                      </p>
                    )}
                  </div>
                </label>
              )
            })
          ) : (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
              Keine Versandoptionen fuer diese Adresse verfuegbar.
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {availableShippingMethods.length > 0 && (
          <div className="mt-6">
            <button
              type="submit"
              disabled={!selectedMethod || isPending}
              className="w-full sm:w-auto px-8 py-3 bg-[#1A1A1A] text-white font-medium rounded-lg hover:bg-[#333] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isPending ? "Wird gespeichert..." : "Weiter zur Zahlung"}
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

export default Shipping
