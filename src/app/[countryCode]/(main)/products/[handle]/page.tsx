import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { getProductSeo } from "@lib/data/seo"
import ProductTemplate from "@modules/products/templates"
import { ProductSchema } from "@modules/seo/components"
import { HttpTypes } from "@medusajs/types"

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
  searchParams: Promise<{ v_id?: string; farbe?: string }>
}

type VariantImagesResponse = {
  variant_images: Record<string, string[]>
}

async function fetchVariantImages(productId: string): Promise<Record<string, string[]>> {
  try {
    const backendUrl = process.env.MEDUSA_BACKEND_URL || "http://localhost:9001"
    const apiKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
    
    const response = await fetch(`${backendUrl}/store/products/${productId}/variant-images`, {
      headers: { "x-publishable-api-key": apiKey },
      next: { revalidate: 60 },
    })
    
    if (!response.ok) return {}
    const data: VariantImagesResponse = await response.json()
    return data.variant_images || {}
  } catch (error) {
    console.error("Error fetching variant images:", error)
    return {}
  }
}

function getImagesForVariant(
  product: HttpTypes.StoreProduct,
  selectedVariantId: string | undefined,
  variantImageMap: Record<string, string[]>
): HttpTypes.StoreProductImage[] {
  const allImages = product.images || []
  if (!selectedVariantId) return allImages
  
  const assignedImageIds = variantImageMap[selectedVariantId]
  if (!assignedImageIds || assignedImageIds.length === 0) return allImages
  
  const imageMap = new Map(allImages.map(img => [img.id, img]))
  const orderedImages: HttpTypes.StoreProductImage[] = []
  
  for (const imageId of assignedImageIds) {
    const image = imageMap.get(imageId)
    if (image) orderedImages.push(image)
  }
  
  return orderedImages.length > 0 ? orderedImages : allImages
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle } = params
  const region = await getRegion(params.countryCode)

  if (!region) notFound()

  const product = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle },
  }).then(({ response }) => response.products[0])

  if (!product) notFound()

  // Fetch custom SEO data from admin
  const seo = await getProductSeo(product.id)

  // Use custom SEO or fall back to defaults
  const title = seo?.meta_title || product.title
  const description = seo?.meta_description 
    || product.description 
    || product.title + " - Personalisierbare Premium-Qualitaet von WELANDA. Jetzt mit individueller Lasergravur bestellen."
  
  // Parse keywords from comma-separated string
  const defaultKeywords = [product.title || "", "personalisiert", "Gravur", "WELANDA", "Premium", "Snus Dose"]
  const keywords = seo?.meta_keywords 
    ? seo.meta_keywords.split(",").map(k => k.trim()).filter(Boolean)
    : defaultKeywords

  const canonicalUrl = `https://welanda.com/${params.countryCode}/products/${handle}`

  // Determine if we should use absolute title (skip template)
  // If custom SEO title already contains WELANDA, use it as-is
  const titleConfig = seo?.meta_title && seo.meta_title.toLowerCase().includes('welanda')
    ? { absolute: seo.meta_title }
    : title

  return {
    title: titleConfig,
    description: description,
    keywords: keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: titleConfig,
      description: description,
      images: product.thumbnail ? [product.thumbnail] : [],
      type: "website",
      siteName: "WELANDA",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: titleConfig,
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

  if (!region) notFound()

  const pricedProduct = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0])

  if (!pricedProduct) notFound()

  const variantImageMap = await fetchVariantImages(pricedProduct.id)
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
