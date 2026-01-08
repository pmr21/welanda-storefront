import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductTemplate from "@modules/products/templates"
import { ProductSchema } from "@modules/seo/components"
import { HttpTypes } from "@medusajs/types"

// Force dynamic rendering to prevent DYNAMIC_SERVER_USAGE errors on client-side navigation
export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
  searchParams: Promise<{ v_id?: string; farbe?: string }>
}

type VariantImagesResponse = {
  variant_images: Record<string, string[]>
}

/**
 * Fetch real variant image assignments from custom endpoint
 * This bypasses Medusa's "General Images" logic
 */
async function fetchVariantImages(productId: string): Promise<Record<string, string[]>> {
  try {
    const backendUrl = process.env.MEDUSA_BACKEND_URL || "http://localhost:9001"
    const apiKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
    
    const response = await fetch(`${backendUrl}/store/products/${productId}/variant-images`, {
      headers: {
        "x-publishable-api-key": apiKey,
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    })
    
    if (!response.ok) {
      console.error("Failed to fetch variant images:", response.status)
      return {}
    }
    
    const data: VariantImagesResponse = await response.json()
    return data.variant_images || {}
  } catch (error) {
    console.error("Error fetching variant images:", error)
    return {}
  }
}

/**
 * Get images for a specific variant using real assignments from junction table
 * Falls back to all product images if no specific variant images exist
 */
function getImagesForVariant(
  product: HttpTypes.StoreProduct,
  selectedVariantId: string | undefined,
  variantImageMap: Record<string, string[]>
): HttpTypes.StoreProductImage[] {
  const allImages = product.images || []
  
  // No variant selected - return all product images
  if (!selectedVariantId) {
    return allImages
  }
  
  // Get the real assigned image IDs for this variant (sorted by rank)
  const assignedImageIds = variantImageMap[selectedVariantId]
  
  // No images assigned to this variant - fall back to all images
  if (!assignedImageIds || assignedImageIds.length === 0) {
    return allImages
  }
  
  // Create a map for quick lookup of images by ID
  const imageMap = new Map(allImages.map(img => [img.id, img]))
  
  // Return images in the order specified by rank (from junction table)
  const orderedImages: HttpTypes.StoreProductImage[] = []
  for (const imageId of assignedImageIds) {
    const image = imageMap.get(imageId)
    if (image) {
      orderedImages.push(image)
    }
  }
  
  // Return ordered images, or fall back to all if none found
  return orderedImages.length > 0 ? orderedImages : allImages
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle } = params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle },
  }).then(({ response }) => response.products[0])

  if (!product) {
    notFound()
  }

  const description = product.description 
    || product.title + " - Personalisierbare Premium-Qualitaet von WELANDA. Jetzt mit individueller Lasergravur bestellen."

  // Canonical URL always points to base product page (without query params)
  const canonicalUrl = `https://welanda.com/${params.countryCode}/products/${handle}`

  return {
    title: product.title + " | WELANDA",
    description: description,
    keywords: [product.title || "", "personalisiert", "Gravur", "WELANDA", "Premium", "Snus Dose"].filter(Boolean),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: product.title + " | WELANDA",
      description: description,
      images: product.thumbnail ? [product.thumbnail] : [],
      type: "website",
      siteName: "WELANDA",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: product.title + " | WELANDA",
      description: description,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)
  const searchParams = await props.searchParams

  const selectedVariantId = searchParams.v_id

  if (!region) {
    notFound()
  }

  const pricedProduct = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0])

  if (!pricedProduct) {
    notFound()
  }

  // Fetch real variant image assignments (bypasses Medusa's General Images)
  const variantImageMap = await fetchVariantImages(pricedProduct.id)
  
  // Get images for selected variant (sorted by rank)
  const images = getImagesForVariant(pricedProduct, selectedVariantId, variantImageMap)

  const productUrl = "https://welanda.com/" + params.countryCode + "/products/" + params.handle

  return (
    <>
      <ProductSchema product={pricedProduct} url={productUrl} />
      <ProductTemplate
        product={pricedProduct}
        region={region}
        countryCode={params.countryCode}
        images={images}
      />
    </>
  )
}
