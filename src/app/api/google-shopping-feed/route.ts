import { NextResponse } from "next/server"

const MEDUSA_BACKEND_URL = "https://wlnd.ranasinghe.de"
const PUBLISHABLE_KEY = "pk_8dbcb8896ba37c8122cf1bc9f537eacce87e1b49a9f58ab9fcb7de003610891a"
const STORE_URL = "https://welanda.com"
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
    manage_inventory: boolean
    inventory_quantity: number
  }>
  categories?: Array<{ name: string }>
}

function escapeXml(unsafe: string | null | undefined): string {
  if (!unsafe) return ""
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function getPrice(variant: MedusaProduct["variants"][0]): number {
  const eurPrice = variant.prices?.find(p => p.currency_code.toLowerCase() === "eur")
  return eurPrice ? eurPrice.amount : 0
}

function getAvailability(variant: MedusaProduct["variants"][0]): string {
  if (!variant.manage_inventory) return "in_stock"
  return variant.inventory_quantity > 0 ? "in_stock" : "out_of_stock"
}

function generateProductXml(product: MedusaProduct): string {
  const items: string[] = []

  for (const variant of product.variants) {
    const price = getPrice(variant)
    if (price <= 0) continue

    const itemId = variant.sku || product.id + "_" + variant.id
    const title = variant.title !== "Default" 
      ? product.title + " - " + variant.title
      : product.title
    const link = STORE_URL + "/de/products/" + product.handle
    const imageUrl = product.thumbnail || product.images?.[0]?.url || ""
    const availability = getAvailability(variant)
    const category = product.categories?.[0]?.name || "Snus Zubehoer"
    
    items.push("<item>" +
      "<g:id>" + escapeXml(itemId) + "</g:id>" +
      "<title>" + escapeXml(title) + "</title>" +
      "<description>" + escapeXml(product.description || title) + "</description>" +
      "<link>" + escapeXml(link) + "</link>" +
      "<g:image_link>" + escapeXml(imageUrl) + "</g:image_link>" +
      "<g:price>" + price.toFixed(2) + " EUR</g:price>" +
      "<g:availability>" + availability + "</g:availability>" +
      "<g:brand>" + BRAND + "</g:brand>" +
      "<g:condition>new</g:condition>" +
      "<g:identifier_exists>false</g:identifier_exists>" +
      "<g:google_product_category>499676</g:google_product_category>" +
      "<g:product_type>" + escapeXml(category) + "</g:product_type>" +
      "<g:shipping>" +
        "<g:country>DE</g:country>" +
        "<g:service>Standard</g:service>" +
        "<g:price>4.90 EUR</g:price>" +
      "</g:shipping>" +
      "<g:shipping>" +
        "<g:country>AT</g:country>" +
        "<g:service>Standard</g:service>" +
        "<g:price>9.90 EUR</g:price>" +
      "</g:shipping>" +
      "<g:shipping>" +
        "<g:country>CH</g:country>" +
        "<g:service>Standard</g:service>" +
        "<g:price>14.90 EUR</g:price>" +
      "</g:shipping>" +
      "</item>")
  }

  return items.join("")
}

async function fetchProducts(): Promise<MedusaProduct[]> {
  try {
    const response = await fetch(
      MEDUSA_BACKEND_URL + "/store/products?limit=100&fields=*variants.prices,*categories",
      {
        headers: {
          "x-publishable-api-key": PUBLISHABLE_KEY,
        },
        cache: "no-store",
      }
    )

    if (!response.ok) {
      console.error("Failed to fetch products:", response.status)
      return []
    }

    const data = await response.json()
    return data.products || []
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function GET() {
  try {
    const products = await fetchProducts()
    
    const productItems = products.map(generateProductXml).join("")

    const xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
      "<rss version=\"2.0\" xmlns:g=\"http://base.google.com/ns/1.0\">\n" +
      "<channel>\n" +
      "<title>WELANDA - Premium Snus Container</title>\n" +
      "<link>" + STORE_URL + "</link>\n" +
      "<description>Personalisierte Premium Snus-Dosen aus Aluminium</description>\n" +
      productItems +
      "</channel>\n" +
      "</rss>"

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    })
  } catch (error) {
    console.error("Error generating feed:", error)
    return new NextResponse("Error generating feed", { status: 500 })
  }
}
