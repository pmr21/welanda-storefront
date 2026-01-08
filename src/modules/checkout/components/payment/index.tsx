"use client"

import { initiatePaymentSessionAction } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { useActionState } from "react"
import { useState, useEffect } from "react"

type PaymentProps = {
  cart: HttpTypes.StoreCart
  availablePaymentMethods: HttpTypes.StorePaymentProvider[]
}

const paymentMethodInfo: Record<string, { name: string; icon: string; description: string }> = {
  "pp_paypal": {
    name: "PayPal",
    icon: "paypal",
    description: "Sicher bezahlen mit PayPal"
  },
  "paypal": {
    name: "PayPal",
    icon: "paypal",
    description: "Sicher bezahlen mit PayPal"
  },
  "pp_paypal_paypal": {
    name: "PayPal",
    icon: "paypal",
    description: "Sicher bezahlen mit PayPal"
  },
  "pp_mollie-hosted-checkout_mollie": {
    name: "Kreditkarte & mehr",
    icon: "card",
    description: "Kreditkarte, iDEAL, Klarna, SOFORT"
  },
  "pp_mollie-card_mollie": {
    name: "Kreditkarte",
    icon: "card",
    description: "Visa, Mastercard, American Express"
  },
  "pp_mollie-ideal_mollie": {
    name: "iDEAL",
    icon: "bank",
    description: "Direkte Bankueberweisung (NL)"
  },
  "pp_mollie-apple-pay_mollie": {
    name: "Apple Pay",
    icon: "apple",
    description: "Bezahlen mit Apple Pay"
  },
  "manual": {
    name: "Manuelle Zahlung",
    icon: "manual",
    description: "Zahlung nach Absprache"
  }
}

const PaymentIcon = ({ type }: { type: string }) => {
  if (type === "paypal") {
    return (
      <svg className="h-6" viewBox="0 0 101 32" xmlns="http://www.w3.org/2000/svg">
        <path fill="#003087" d="M12.237 5.063h7.894c3.735 0 6.468 1.262 7.175 4.903.739 3.803-1.146 6.262-4.786 7.177l-.203.051c.66 3.208-1.176 5.367-4.487 5.367H14.67l-1.005 5.178c-.083.428-.43.722-.861.722H9.139c-.517 0-.878-.457-.773-.977l3.871-21.699a.997.997 0 0 1 .86-.722h.14Zm6.912 3.965h-2.95l-1.206 6.207h2.787c2.284 0 3.735-1.163 4.112-3.207.392-2.123-.718-3-2.743-3Z"/>
        <path fill="#009CDE" d="M35.534 5.063h7.893c3.736 0 6.469 1.262 7.176 4.903.739 3.803-1.147 6.262-4.787 7.177l-.202.051c.659 3.208-1.177 5.367-4.488 5.367h-3.159l-1.006 5.178c-.082.428-.43.722-.86.722h-3.666c-.517 0-.879-.457-.774-.977l3.872-21.699a.997.997 0 0 1 .86-.722h.14Zm6.912 3.965h-2.95l-1.206 6.207h2.787c2.284 0 3.735-1.163 4.112-3.207.392-2.123-.718-3-2.743-3Z"/>
        <path fill="#003087" d="m56.07 22.461 1.236-6.367c.195-1.003-.39-1.648-1.399-1.648h-2.364l-1.438 7.398c-.082.427-.43.721-.86.721h-3.534c-.518 0-.879-.456-.774-.976l3.872-21.7a.997.997 0 0 1 .86-.721h3.666c.517 0 .878.456.773.977l-1.154 5.938h2.982c3.8 0 5.978 2.04 5.335 5.35l-1.247 6.426c-.68 3.505-3.524 5.603-6.986 5.603h-.107c-2.36 0-3.68-1.506-3.14-3.759l.28-1.242Zm-29.297 0 1.236-6.367c.195-1.003-.39-1.648-1.399-1.648h-2.364l-1.438 7.398c-.082.427-.43.721-.86.721h-3.534c-.518 0-.879-.456-.774-.976l3.872-21.7a.997.997 0 0 1 .86-.721h3.666c.517 0 .878.456.773.977l-1.154 5.938h2.982c3.8 0 5.978 2.04 5.335 5.35l-1.247 6.426c-.68 3.505-3.524 5.603-6.986 5.603h-.107c-2.36 0-3.68-1.506-3.14-3.759l.28-1.242Z"/>
      </svg>
    )
  }
  if (type === "card") {
    return (
      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )
  }
  if (type === "bank") {
    return (
      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  }
  return (
    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  )
}

const Payment = ({ cart, availablePaymentMethods }: PaymentProps) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )
  
  const [isEditing, setIsEditing] = useState(!activeSession)
  const [selectedMethod, setSelectedMethod] = useState<string>("")
  const [state, formAction] = useActionState(initiatePaymentSessionAction, null)
  
  const hasShipping = (cart.shipping_methods?.length ?? 0) > 0

  useEffect(() => {
    if (activeSession && !state) {
      setIsEditing(false)
    }
  }, [activeSession, state])

  if (!hasShipping) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 opacity-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 font-semibold text-sm">3</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-400">Zahlung</h2>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          Bitte waehlen Sie zuerst eine Versandart.
        </p>
      </div>
    )
  }

  if (activeSession && !isEditing) {
    const methodInfo = paymentMethodInfo[activeSession.provider_id] || {
      name: activeSession.provider_id.replace("pp_", "").replace("_paypal", "").replace("_mollie", ""),
      icon: "card",
      description: ""
    }
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-[#1A1A1A]">Zahlung</h2>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-[#C9A962] hover:text-[#B8944F] font-medium"
          >
            Bearbeiten
          </button>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <PaymentIcon type={methodInfo.icon} />
          <div>
            <p className="font-medium text-[#1A1A1A]">{methodInfo.name}</p>
            <p className="text-gray-500">{methodInfo.description}</p>
          </div>
        </div>
      </div>
    )
  }

  const getClassName = (isSelected: boolean) => {
    const base = "flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all"
    if (isSelected) {
      return base + " border-[#C9A962] bg-[#C9A962]/5"
    }
    return base + " border-gray-200 hover:border-gray-300"
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#C9A962] flex items-center justify-center">
            <span className="text-white font-semibold text-sm">3</span>
          </div>
          <h2 className="text-lg font-semibold text-[#1A1A1A]">Zahlung</h2>
        </div>
        {activeSession && (
          <button
            onClick={() => setIsEditing(false)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Abbrechen
          </button>
        )}
      </div>

      <form action={formAction}>
        <input type="hidden" name="cart_id" value={cart.id} />
        
        <div className="space-y-3">
          {availablePaymentMethods.length > 0 ? (
            availablePaymentMethods.map((method) => {
              const info = paymentMethodInfo[method.id] || {
                name: method.id.replace("pp_", "").replace("_paypal", " (PayPal)").replace("_mollie", ""),
                icon: "card",
                description: ""
              }
              
              return (
                <label
                  key={method.id}
                  className={getClassName(selectedMethod === method.id)}
                >
                  <input
                    type="radio"
                    name="provider_id"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={() => setSelectedMethod(method.id)}
                    className="w-4 h-4 text-[#C9A962] focus:ring-[#C9A962]"
                  />
                  <PaymentIcon type={info.icon} />
                  <div className="flex-1">
                    <p className="font-medium text-[#1A1A1A]">{info.name}</p>
                    <p className="text-sm text-gray-500">{info.description}</p>
                  </div>
                </label>
              )
            })
          ) : (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
              Keine Zahlungsmethoden verfuegbar. Bitte kontaktieren Sie uns.
            </div>
          )}
        </div>

        {typeof state === "string" && state && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {state}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-700">Sichere Zahlung</p>
              <p>Ihre Zahlungsdaten werden verschluesselt uebertragen.</p>
            </div>
          </div>
        </div>

        {availablePaymentMethods.length > 0 && (
          <div className="mt-6">
            <button
              type="submit"
              disabled={!selectedMethod}
              className="w-full sm:w-auto px-8 py-3 bg-[#1A1A1A] text-white font-medium rounded-lg hover:bg-[#333] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Weiter zur Ueberpruefung
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

export default Payment
