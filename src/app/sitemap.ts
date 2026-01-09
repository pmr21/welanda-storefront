import { MetadataRoute } from 'next'
import { getBaseURL } from '@lib/util/env'

// Medusa API configuration
const MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL || 'https://wlnd.ranasinghe.de'
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ''

// Fetch all products from Medusa
async function getAllProducts() {
  try {
    const response = await fetch(
      `${MEDUSA_BACKEND_URL}/store/products?limit=100&fields=handle,updated_at`,
      {
        headers: {
          'x-publishable-api-key': PUBLISHABLE_KEY,
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    )
    
    if (!response.ok) {
      console.error('Failed to fetch products for sitemap')
      return []
    }
    
    const data = await response.json()
    return data.products || []
  } catch (error) {
    console.error('Error fetching products for sitemap:', error)
    return []
  }
}

// Fetch all collections from Medusa
async function getAllCollections() {
  try {
    const response = await fetch(
      `${MEDUSA_BACKEND_URL}/store/collections?limit=100&fields=handle,updated_at`,
      {
        headers: {
          'x-publishable-api-key': PUBLISHABLE_KEY,
        },
        next: { revalidate: 3600 },
      }
    )
    
    if (!response.ok) {
      return []
    }
    
    const data = await response.json()
    return data.collections || []
  } catch (error) {
    console.error('Error fetching collections for sitemap:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseURL()
  const countryCode = 'de' // Primary market
  
  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/${countryCode}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/${countryCode}/store`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/${countryCode}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/${countryCode}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/${countryCode}/impressum`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/${countryCode}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/${countryCode}/rueckgabe`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/${countryCode}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
  ]

  // Fetch dynamic content
  const [products, collections] = await Promise.all([
    getAllProducts(),
    getAllCollections(),
  ])

  // Product pages
  const productPages = products.map((product: { handle: string; updated_at?: string }) => ({
    url: `${baseUrl}/${countryCode}/products/${product.handle}`,
    lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Collection pages
  const collectionPages = collections.map((collection: { handle: string; updated_at?: string }) => ({
    url: `${baseUrl}/${countryCode}/collections/${collection.handle}`,
    lastModified: collection.updated_at ? new Date(collection.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...productPages, ...collectionPages]
}
