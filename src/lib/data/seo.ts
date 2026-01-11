/**
 * Fetch SEO data for a product from the backend
 */
export interface ProductSeo {
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
}

export async function getProductSeo(productId: string): Promise<ProductSeo | null> {
  try {
    const backendUrl = process.env.MEDUSA_BACKEND_URL || "http://localhost:9001"
    const apiKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
    
    const response = await fetch(`${backendUrl}/store/products/${productId}/seo`, {
      headers: {
        "x-publishable-api-key": apiKey,
      },
      next: { revalidate: 60 },
    })
    
    if (!response.ok) {
      return null
    }
    
    const data = await response.json()
    return data.seo || null
  } catch (error) {
    console.error("Error fetching product SEO:", error)
    return null
  }
}
