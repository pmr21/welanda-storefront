"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import PersonalizationConfigurator from "@modules/products/components/personalization-configurator"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { useRouter } from "next/navigation"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

const COUNTRY_TO_LOCALE: Record<string, string> = {
  de: "de",
  at: "de",
  ch: "de",
  us: "en",
  gb: "en",
  uk: "en",
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = useParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [personalization, setPersonalization] = useState<any>(null)
  const countryCode = params.countryCode as string
  
  const locale = COUNTRY_TO_LOCALE[countryCode?.toLowerCase()] || "de"

  const isPersonalizable = product.handle?.includes("snus") || 
                           product.title?.toLowerCase().includes("snus") ||
                           product.title?.toLowerCase().includes("dose") ||
                           product.title?.toLowerCase().includes("welanda")

  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const selectedColor = useMemo(() => {
    if (!selectedVariant?.options) return "black"
    const colorOption = selectedVariant.options.find(
      (opt: any) => opt.option?.title?.toLowerCase() === "color" || opt.option?.title?.toLowerCase() === "farbe"
    )
    return colorOption?.value || "black"
  }, [selectedVariant])

  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }
    if (selectedVariant?.allow_backorder) {
      return true
    }
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
      metadata: personalization ? {
        personalization: JSON.stringify(personalization)
      } : undefined
    })

    setIsAdding(false)

    // Analytics: Track Add to Cart
    try {
      if (typeof window !== "undefined" && typeof window.umami?.track === "function") {
        window.umami.track("add_to_cart", {
          productId: product.id,
          variantId: selectedVariant.id,
          price: (selectedVariant.calculated_price?.calculated_amount || 0) / 100
        })

        // Analytics: Track Personalization Complete
        if (personalization && personalization.totalPrice > 0) {
          window.umami.track("personalization_complete", {
            productId: product.id,
            optionsCount: Object.keys(personalization).filter(k => k !== "totalPrice" && k !== "couponApplied").length,
            totalPrice: personalization.totalPrice
          })
        }
      }
    } catch (e) {
      // Silent fail - analytics should not break the app
    }
  }

  const buttonText = useMemo(() => {
    if (!selectedVariant && Object.keys(options).length === 0) return "Farbe wählen"
    if (!inStock || !isValidVariant) return "Ausverkauft"
    return "In den Warenkorb"
  }, [selectedVariant, options, inStock, isValidVariant])

  return (
    <>
      <div className="flex flex-col gap-y-6" ref={actionsRef}>
        {/* Price */}
        <ProductPrice product={product} variant={selectedVariant} />

        {/* Variant Options */}
        {(product.variants?.length ?? 0) > 1 && (
          <div className="flex flex-col gap-y-4">
            {(product.options || []).map((option) => {
              return (
                <div key={option.id}>
                  <OptionSelect productId={product.id}
                    option={option}
                    current={options[option.id]}
                    updateOption={setOptionValue}
                    title={option.title ?? ""}
                    data-testid="product-options"
                    disabled={!!disabled || isAdding}
                  />
                </div>
              )
            })}
          </div>
        )}

        {/* Personalization Configurator */}
        {isPersonalizable && (
          <div className="pt-4 border-t border-gray-200">
            <PersonalizationConfigurator
              onPersonalizationChange={setPersonalization}
              variantColor={selectedColor}
              pricePerPersonalization={9.99}
              locale={locale}
            />
          </div>
        )}
        
        {/* Personalization Price */}
        {personalization && personalization.totalPrice > 0 && (
          <div 
            className="flex justify-between text-sm py-3 px-4 rounded-lg"
            style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
          >
            <span style={{ color: '#4B5563' }}>+ Personalisierung</span>
            <span className="font-semibold" style={{ color: '#C9A962' }}>
              {personalization.totalPrice.toFixed(2)} €
            </span>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={
            !inStock ||
            !selectedVariant ||
            !!disabled ||
            isAdding ||
            !isValidVariant
          }
          className="w-full py-4 px-8 text-base font-semibold tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ 
            backgroundColor: (!inStock || !selectedVariant || !isValidVariant) ? '#E5E7EB' : '#1A1A1A',
            color: (!inStock || !selectedVariant || !isValidVariant) ? '#9CA3AF' : '#FFFFFF',
          }}
          data-testid="add-product-button"
        >
          {isAdding ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Wird hinzugefügt...
            </span>
          ) : (
            buttonText
          )}
        </button>

        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
