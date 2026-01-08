import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogPost, getBlogPosts, getRelatedPosts } from "@lib/data/blog"

type Props = {
  params: { slug: string; countryCode: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return { title: "Artikel nicht gefunden | WELANDA" }
  }

  const title = post.seoTitle || `${post.title} | WELANDA Blog`
  const description = post.seoDescription || post.excerpt
  const ogImage = post.ogImage || post.image || '/images/og-default.jpg'
  const canonical = post.canonical || `https://welanda.com/${params.countryCode}/blog/${post.slug}`

  return {
    title,
    description,
    keywords: post.seoKeywords?.join(', '),
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      title: post.ogTitle || post.title,
      description: post.ogDescription || post.excerpt,
      type: 'article',
      publishedTime: post.rawDate,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      images: ogImage ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.ogTitle || post.title,
      description: post.ogDescription || post.excerpt,
      images: ogImage ? [ogImage] : undefined,
    },
    alternates: {
      canonical,
    },
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(params.slug, 3)

  // JSON-LD Structured Data für SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.rawDate,
    dateModified: post.rawDate,
    author: {
      '@type': 'Organization',
      name: post.author || 'WELANDA',
    },
    publisher: {
      '@type': 'Organization',
      name: 'WELANDA',
      logo: {
        '@type': 'ImageObject',
        url: 'https://welanda.com/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://welanda.com/blog/${post.slug}`,
    },
  }

  return (
    <>
      {/* JSON-LD für Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="content-container py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: '#6B7280' }}>
          <Link href="/" className="hover:text-[#C9A962] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#C9A962] transition-colors">Blog</Link>
          <span>/</span>
          <span style={{ color: '#1A1A1A' }}>{post.title}</span>
        </nav>

        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <span 
              className="inline-block text-xs font-medium tracking-wide uppercase mb-4 px-3 py-1 rounded-full"
              style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)', color: '#C9A962' }}
            >
              {post.category}
            </span>
            
            <h1 
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
              style={{ color: '#0A0A0A' }}
            >
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm" style={{ color: '#6B7280' }}>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime} Lesezeit</span>
              {post.author && (
                <>
                  <span>·</span>
                  <span>von {post.author}</span>
                </>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="aspect-[16/9] rounded-lg overflow-hidden mb-8" style={{ backgroundColor: '#F8F8F8' }}>
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-[#0A0A0A] prose-p:text-[#4B5563] prose-a:text-[#C9A962] prose-strong:text-[#1A1A1A] prose-li:text-[#4B5563]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-medium mb-3" style={{ color: '#1A1A1A' }}>Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link 
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 text-sm rounded-full transition-colors hover:bg-[#C9A962] hover:text-white"
                    style={{ backgroundColor: '#F3F4F6', color: '#4B5563' }}
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Products */}
          {post.relatedProducts && post.relatedProducts.length > 0 && (
            <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#1A1A1A' }}>
                Passende Produkte
              </h3>
              <div className="flex flex-wrap gap-3">
                {post.relatedProducts.map((productHandle) => (
                  <Link 
                    key={productHandle}
                    href={`/products/${productHandle}`}
                    className="px-4 py-2 text-sm font-medium rounded-md transition-colors"
                    style={{ backgroundColor: '#C9A962', color: '#FFFFFF' }}
                  >
                    {productHandle.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back Link */}
          <div className="mt-12">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#C9A962]"
              style={{ color: '#1A1A1A' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Zurück zum Blog
            </Link>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-5xl mx-auto mt-16 pt-12 border-t border-gray-200">
            <h2 
              className="text-2xl font-bold mb-8 text-center"
              style={{ color: '#1A1A1A' }}
            >
              Das könnte dich auch interessieren
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.slug} 
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <article>
                    <div 
                      className="aspect-[16/10] rounded-lg overflow-hidden mb-4"
                      style={{ backgroundColor: '#F8F8F8' }}
                    >
                      {relatedPost.image ? (
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
                          >
                            <svg className="w-6 h-6" style={{ color: '#C9A962' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    <span 
                      className="text-xs font-medium tracking-wide uppercase"
                      style={{ color: '#C9A962' }}
                    >
                      {relatedPost.category}
                    </span>
                    <h3 
                      className="text-lg font-semibold mt-1 group-hover:text-[#C9A962] transition-colors"
                      style={{ color: '#1A1A1A' }}
                    >
                      {relatedPost.title}
                    </h3>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
