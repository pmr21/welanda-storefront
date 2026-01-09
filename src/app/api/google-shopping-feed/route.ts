import { NextResponse } from "next/server"

const MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL || "https://wlnd.ranasinghe.de"
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
const STORE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://welanda.com"
const BRAND = "WELANDA"

interface MedusaProduct {
  id: string
  title: string
  description: string | null
  handle: string
  thumbnail: string | null
  images: Array<{ url: string }>
  variants: Array<{
    id: string
    title: string
    sku: string | null
    prices: Array<{
      amount: number
      currency_code: string
    }>
    inventory_quantity?: number
    manage_inventory?: boolean
  }>
  status: string
  created_at: string
  collection?: {
    title: string
  }
  options?: Array<{
    title: string
    values: Array<{ value: string }>
  }>
}

export async function GET() {
  try {
    const response = await fetch(`${MEDUSA_BACKEND_URL}/store/products?limit=100`, {
      headers: {
        "x-publishable-api-key": PUBLISHABLE_KEY,
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }

    const data = await response.json()
    const products: MedusaProduct[] = data.products

    const items = products
      .filter((p) => p.status === "published")
      .flatMap((product) =>
        product.variants.map((variant) => {
          const price = variant.prices?.find((p) => p.currency_code === "eur")
          const imageUrl = product.images?.[0]?.url || product.thumbnail || ""
          const availability =
            variant.manage_inventory === false ||
            (variant.inventory_quantity && variant.inventory_quantity > 0)
              ? "in_stock"
              : "out_of_stock"

          return `
    <item>
      <g:id>${variant.id}</g:id>
      <g:title><![CDATA[${product.title} - ${variant.title}]]></g:title>
      <g:description><![CDATA[${product.description || product.title}]]></g:description>
      <g:link>${STORE_URL}/de/products/${product.handle}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:availability>${availability}</g:availability>
      <g:price>${price ? (price.amount / 100).toFixed(2) : "0.00"} EUR</g:price>
      <g:brand>${BRAND}</g:brand>
      <g:condition>new</g:condition>
      <g:gtin></g:gtin>
      <g:mpn>${variant.sku || variant.id}</g:mpn>
      <g:product_type><![CDATA[${product.collection?.title || "Accessories"}]]></g:product_type>
    </item>`
        })
      )
      .join("")

    const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>WELANDA - Premium Snus Dosen</title>
    <link>${STORE_URL}</link>
    <description>Premium personalisierte Snus Dosen mit Lasergravur</description>
    ${items}
  </channel>
</rss>`

    return new NextResponse(feed, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch (error) {
    console.error("Google Shopping Feed Error:", error)
    return NextResponse.json({ error: "Failed to generate feed" }, { status: 500 })
  }
}
