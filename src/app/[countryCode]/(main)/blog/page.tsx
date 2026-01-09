import { Metadata } from "next"
import Link from "next/link"
import { getBlogPosts, getFeaturedPosts, getAllCategories } from "@lib/data/blog"

export const metadata: Metadata = {
  title: "Blog - Snus Dosen & Personalisierung",
  description: "Tipps, Guides und News rund um Premium Snus Dosen, Personalisierung und EDC Lifestyle. Personalisiert in Hamburg.",
  keywords: "snus dose, snus box, personalisierung, lasergravur, edc, hamburg",
  openGraph: {
    title: "WELANDA Blog - Insights & Guides",
    description: "Tipps zur Personalisierung, Produktguides und Einblicke in die Welt der Premium Snus Dosen.",
    type: 'website',
  },
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string; tag?: string }
}) {
  let posts = await getBlogPosts()
  const featuredPosts = await getFeaturedPosts()
  const categories = await getAllCategories()
  
  // Filter nach Kategorie oder Tag
  if (searchParams.category) {
    posts = posts.filter(p => p.category.toLowerCase() === searchParams.category?.toLowerCase())
  }
  if (searchParams.tag) {
    posts = posts.filter(p => p.tags?.some(t => t.toLowerCase() === searchParams.tag?.toLowerCase()))
  }

  // JSON-LD für Blog
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'WELANDA Blog',
    description: 'Tipps, Guides und News rund um Premium Snus Dosen',
    url: 'https://welanda.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'WELANDA',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="content-container py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <span 
            className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase mb-4"
            style={{ color: '#C9A962' }}
          >
            <span className="w-8 h-px" style={{ backgroundColor: '#C9A962' }}></span>
            WELANDA Blog
            <span className="w-8 h-px" style={{ backgroundColor: '#C9A962' }}></span>
          </span>
          <h1 
            className="text-4xl font-bold tracking-tight mb-4"
            style={{ color: '#0A0A0A' }}
          >
            Insights & Guides
          </h1>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: '#6B7280' }}
          >
            Tipps zur Personalisierung, Produktguides und Einblicke in die Welt der Premium Snus Dosen.
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Link
              href="/blog"
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                !searchParams.category 
                  ? 'bg-[#C9A962] text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Alle
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/blog?category=${encodeURIComponent(category)}`}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  searchParams.category === category 
                    ? 'bg-[#C9A962] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </Link>
            ))}
          </div>
        )}

        {/* Featured Post (nur wenn kein Filter aktiv) */}
        {!searchParams.category && !searchParams.tag && featuredPosts.length > 0 && (
          <div className="mb-16">
            <Link 
              href={`/blog/${featuredPosts[0].slug}`}
              className="group block"
            >
              <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div 
                  className="aspect-[16/10] rounded-lg overflow-hidden"
                  style={{ backgroundColor: '#F8F8F8' }}
                >
                  {featuredPosts[0].image ? (
                    <img 
                      src={featuredPosts[0].image} 
                      alt={featuredPosts[0].title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div 
                        className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
                      >
                        <svg className="w-10 h-10" style={{ color: '#C9A962' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <span 
                    className="inline-block text-xs font-medium tracking-wide uppercase mb-3 px-3 py-1 rounded-full"
                    style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)', color: '#C9A962' }}
                  >
                    ⭐ Featured
                  </span>
                  <h2 
                    className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-[#C9A962] transition-colors"
                    style={{ color: '#1A1A1A' }}
                  >
                    {featuredPosts[0].title}
                  </h2>
                  <p 
                    className="text-base mb-4"
                    style={{ color: '#6B7280' }}
                  >
                    {featuredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm" style={{ color: '#9CA3AF' }}>
                    <span>{featuredPosts[0].date}</span>
                    <span>·</span>
                    <span>{featuredPosts[0].readTime} Lesezeit</span>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        )}

        {/* Active Filter Info */}
        {(searchParams.category || searchParams.tag) && (
          <div className="mb-8 flex items-center gap-2">
            <span style={{ color: '#6B7280' }}>Filter:</span>
            {searchParams.category && (
              <span 
                className="px-3 py-1 text-sm rounded-full"
                style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)', color: '#C9A962' }}
              >
                {searchParams.category}
              </span>
            )}
            {searchParams.tag && (
              <span 
                className="px-3 py-1 text-sm rounded-full"
                style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)', color: '#C9A962' }}
              >
                #{searchParams.tag}
              </span>
            )}
            <Link 
              href="/blog" 
              className="text-sm underline ml-2"
              style={{ color: '#6B7280' }}
            >
              Filter entfernen
            </Link>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="h-full flex flex-col">
                {/* Image */}
                <div 
                  className="aspect-[16/10] rounded-lg overflow-hidden mb-4"
                  style={{ backgroundColor: '#F8F8F8' }}
                >
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
                      >
                        <svg className="w-8 h-8" style={{ color: '#C9A962' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <span 
                    className="text-xs font-medium tracking-wide uppercase mb-2"
                    style={{ color: '#C9A962' }}
                  >
                    {post.category}
                  </span>
                  <h2 
                    className="text-xl font-semibold mb-2 group-hover:text-[#C9A962] transition-colors"
                    style={{ color: '#1A1A1A' }}
                  >
                    {post.title}
                  </h2>
                  <p 
                    className="text-sm flex-1 mb-4"
                    style={{ color: '#6B7280' }}
                  >
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs" style={{ color: '#9CA3AF' }}>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime} Lesezeit</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-16">
            <p style={{ color: '#6B7280' }}>Keine Blogposts gefunden.</p>
            <Link 
              href="/blog" 
              className="inline-block mt-4 text-sm font-medium"
              style={{ color: '#C9A962' }}
            >
              Alle Artikel anzeigen
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
