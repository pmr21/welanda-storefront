import { HttpTypes } from "@medusajs/types"

type ProductSchemaProps = {
  product: HttpTypes.StoreProduct
  url: string
}

export default function ProductSchema({ product, url }: ProductSchemaProps) {
  // Ersten Preis ermitteln
  const variant = product.variants?.[0]
  const price = variant?.calculated_price?.calculated_amount
  const currencyCode = variant?.calculated_price?.currency_code || "EUR"
  
  // Verfügbarkeit prüfen
  const inStock = variant?.inventory_quantity === undefined || (variant?.inventory_quantity ?? 0) > 0
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description || product.title,
    "image": product.images?.map(img => img.url) || [product.thumbnail],
    "sku": variant?.sku || product.id,
    "brand": {
      "@type": "Brand",
      "name": "WELANDA"
    },
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": currencyCode.toUpperCase(),
      "price": price ? (price / 100).toFixed(2) : "0.00",
      "availability": inStock 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "WELANDA"
      },
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "DE"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 2,
            "maxValue": 3,
            "unitCode": "d"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 3,
            "unitCode": "d"
          }
        }
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
