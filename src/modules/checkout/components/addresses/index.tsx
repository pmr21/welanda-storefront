"use client"

import { useActionState } from "react"
import { setAddresses } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { useEffect, useState } from "react"
import CountrySelect from "../country-select"

type AddressesProps = {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}

const Addresses = ({ cart, customer }: AddressesProps) => {
  const [isEditing, setIsEditing] = useState(!cart?.shipping_address?.address_1)
  const [useDifferentBilling, setUseDifferentBilling] = useState(false)
  const [state, formAction] = useActionState(setAddresses, { success: false, error: null })

  useEffect(() => {
    if (state.success) {
      setIsEditing(false)
    }
  }, [state.success])

  // Check if billing address is different from shipping
  useEffect(() => {
    const billing = cart?.billing_address
    const shipping = cart?.shipping_address
    if (billing && shipping) {
      const isDifferent = 
        billing.address_1 !== shipping.address_1 ||
        billing.city !== shipping.city ||
        billing.postal_code !== shipping.postal_code
      setUseDifferentBilling(isDifferent)
    }
  }, [cart])

  const shippingAddress = cart?.shipping_address
  const billingAddress = cart?.billing_address

  if (!isEditing && shippingAddress?.address_1) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-[#1A1A1A]">Adressen</h2>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-[#C9A962] hover:text-[#B8944F] font-medium"
          >
            Bearbeiten
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-gray-500 mb-1 font-medium">Lieferadresse</p>
            <p className="text-[#1A1A1A]">
              {shippingAddress.first_name} {shippingAddress.last_name}<br />
              {shippingAddress.address_1}<br />
              {shippingAddress.address_2 && <>{shippingAddress.address_2}<br /></>}
              {shippingAddress.postal_code} {shippingAddress.city}<br />
              {shippingAddress.country_code?.toUpperCase()}
            </p>
            <p className="text-gray-500 mt-2">
              {cart?.email}<br />
              {shippingAddress.phone || "-"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 mb-1 font-medium">Rechnungsadresse</p>
            {useDifferentBilling && billingAddress?.address_1 ? (
              <p className="text-[#1A1A1A]">
                {billingAddress.first_name} {billingAddress.last_name}<br />
                {billingAddress.address_1}<br />
                {billingAddress.address_2 && <>{billingAddress.address_2}<br /></>}
                {billingAddress.postal_code} {billingAddress.city}<br />
                {billingAddress.country_code?.toUpperCase()}
              </p>
            ) : (
              <p className="text-[#1A1A1A]">Identisch mit Lieferadresse</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-full bg-[#C9A962] flex items-center justify-center">
          <span className="text-white font-semibold text-sm">1</span>
        </div>
        <h2 className="text-lg font-semibold text-[#1A1A1A]">Lieferadresse</h2>
      </div>

      <form action={formAction}>
        <input type="hidden" name="cart_id" value={cart?.id || ""} />
        <input type="hidden" name="same_as_shipping" value={useDifferentBilling ? "false" : "true"} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* E-Mail */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-Mail-Adresse *
            </label>
            <input
              type="email"
              name="email"
              required
              defaultValue={cart?.email || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A962] focus:border-transparent outline-none transition-all"
              placeholder="ihre@email.de"
            />
          </div>

          {/* Vorname */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vorname *
            </label>
            <input
              type="text"
              name="shipping_address.first_name"
              required
              defaultValue={shippingAddress?.first_name || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A962] focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Nachname */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nachname *
            </label>
            <input
              type="text"
              name="shipping_address.last_name"
              required
              defaultValue={shippingAddress?.last_name || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A962] focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Straße */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Straße und Hausnummer *
            </label>
            <input
              type="text"
              name="shipping_address.address_1"
              required
              defaultValue={shippingAddress?.address_1 || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A962] focus:border-transparent outline-none transition-all"
              placeholder="Musterstraße 123"
            />
          </div>

          {/* Adresszusatz */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresszusatz (optional)
            </label>
            <input
              type="text"
              name="shipping_address.address_2"
              defaultValue={shippingAddress?.address_2 || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A962] focus:border-transparent outline-none transition-all"
              placeholder="Apartment, Etage, etc."
            />
          </div>

          {/* PLZ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postleitzahl *
            </label>
            <input
              type="text"
              name="shipping_address.postal_code"
              required
              defaultValue={shippingAddress?.postal_code || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A962] focus:border-transparent outline-none transition-all"
              placeholder="12345"
            />
          </div>

          {/* Stadt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stadt *
            </label>
            <input
              type="text"
              name="shipping_address.city"
              required
              defaultValue={shippingAddress?.city || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A962] focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Land */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Land *
            </label>
            <CountrySelect
              name="shipping_address.country_code"
              region={cart?.region}
              defaultValue={shippingAddress?.country_code || "de"}
            />
          </div>

          {/* Telefon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon (optional)
            </label>
            <input
              type="tel"
              name="shipping_address.phone"
              defaultValue={shippingAddress?.phone || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A962] focus:border-transparent outline-none transition-all"
              placeholder="+49 123 456789"
            />
          </div>
        </div>

        {/* Abweichende Rechnungsadresse Toggle */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={useDifferentBilling}
                onChange={(e) => setUseDifferentBilling(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#C9A962] transition-colors"></div>
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
            </div>
            <span className="text-sm font-medium text-gray-700">
              Abweichende Rechnungsadresse
            </span>
          </label>
        </div>

        {/* Rechnungsadresse Felder */}
        {useDifferentBilling && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">Rechnungsadresse</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Vorname */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vorname *
                </label>
                <input
                  type="text"
                  name="billing_address.first_name"
                  required={useDifferentBilling}
                  defaultValue={billingAddress?.first_name || ""}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A962] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Nachname */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nachname *
                </label>
                <input
                  type="text"
                  name="billing_address.last_name"
                  required={useDifferentBilling}
                  defaultValue={billingAddress?.last_name || ""}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A962] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Firma (optional) */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Firma (optional)
                </label>
                <input
                  type="text"
                  name="billing_address.company"
                  defaultValue={billingAddress?.company || ""}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A962] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Straße */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Straße und Hausnummer *
                </label>
                <input
                  type="text"
                  name="billing_address.address_1"
                  required={useDifferentBilling}
                  defaultValue={billingAddress?.address_1 || ""}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A962] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Adresszusatz */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresszusatz (optional)
                </label>
                <input
                  type="text"
                  name="billing_address.address_2"
                  defaultValue={billingAddress?.address_2 || ""}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A962] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* PLZ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postleitzahl *
                </label>
                <input
                  type="text"
                  name="billing_address.postal_code"
                  required={useDifferentBilling}
                  defaultValue={billingAddress?.postal_code || ""}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A962] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Stadt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stadt *
                </label>
                <input
                  type="text"
                  name="billing_address.city"
                  required={useDifferentBilling}
                  defaultValue={billingAddress?.city || ""}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A962] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Land */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Land *
                </label>
                <CountrySelect
                  name="billing_address.country_code"
                  region={cart?.region}
                  defaultValue={billingAddress?.country_code || "de"}
                />
              </div>
            </div>
          </div>
        )}

        {state.error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {state.error}
          </div>
        )}

        <div className="mt-6">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-[#1A1A1A] text-white font-medium rounded-lg hover:bg-[#333] transition-colors"
          >
            Weiter zur Lieferung
          </button>
        </div>
      </form>
    </div>
  )
}

export default Addresses
