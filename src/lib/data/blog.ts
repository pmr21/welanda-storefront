import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  rawDate: string
  category: string
  image?: string
  author?: string
  tags?: string[]
  readTime: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  featured?: boolean
  draft?: boolean
  relatedProducts?: string[]
  relatedPosts?: string[]
}

const postsDirectory = path.join(process.cwd(), 'content/blog')

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx?$/, '')
        return getBlogPost(slug)
      })
  )

  return posts
    .filter((post): post is BlogPost => post !== null)
    .filter((post) => !post.draft)
    .sort((a, b) => (new Date(b.rawDate) > new Date(a.rawDate) ? 1 : -1))
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getBlogPosts()
  return posts.filter((post) => post.featured)
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getBlogPosts()
  return posts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getBlogPosts()
  return posts.filter((post) => post.tags?.some(t => t.toLowerCase() === tag.toLowerCase()))
}

export async function getRelatedPosts(currentSlug: string, limit: number = 3): Promise<BlogPost[]> {
  const currentPost = await getBlogPost(currentSlug)
  if (!currentPost) return []
  
  const allPosts = await getBlogPosts()
  
  const related = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      let score = 0
      if (post.category === currentPost.category) score += 2
      if (post.tags && currentPost.tags) {
        const overlap = post.tags.filter(t => currentPost.tags?.includes(t))
        score += overlap.length
      }
      return { post, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post)
  
  return related
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getBlogPosts()
  const categories = new Set(posts.map((post) => post.category))
  return Array.from(categories)
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getBlogPosts()
  const tags = new Set(posts.flatMap((post) => post.tags || []))
  return Array.from(tags)
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    let fullPath = path.join(postsDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.mdx`)
    }
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()

    const wordCount = content.split(/\s+/).length
    const calculatedReadTime = `${Math.ceil(wordCount / 200)} Min.`

    const rawDate = data.date ? new Date(data.date).toISOString() : ''
    const formattedDate = data.date ? new Date(data.date).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : ''

    return {
      slug,
      title: data.title || slug,
      excerpt: data.excerpt || content.substring(0, 160).replace(/\n/g, ' ') + '...',
      content: contentHtml,
      date: formattedDate,
      rawDate,
      category: data.category || 'Allgemein',
      image: data.image || null,
      author: data.author || null,
      tags: data.tags || [],
      readTime: data.readTime || calculatedReadTime,
      seoTitle: data.seoTitle || null,
      seoDescription: data.seoDescription || null,
      seoKeywords: data.seoKeywords || [],
      canonical: data.canonical || null,
      ogTitle: data.ogTitle || null,
      ogDescription: data.ogDescription || null,
      ogImage: data.ogImage || data.image || null,
      featured: data.featured || false,
      draft: data.draft || false,
      relatedProducts: data.relatedProducts || [],
      relatedPosts: data.relatedPosts || [],
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}
