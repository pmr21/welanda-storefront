"use client"

import { useState, useEffect } from "react"

type Review = {
  id: string
  rating: number
  title: string
  content: string
  author_name: string
  created_at: string
  status: string
  response?: {
    content: string
    created_at: string
  }
}

type ReviewStats = {
  product_id: string
  average_rating: number
  total_reviews: number
  rating_distribution: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
}

type ProductReviewsProps = {
  productId: string
}

const StarRating = ({ 
  rating, 
  onRate, 
  interactive = false,
  size = "md"
}: { 
  rating: number
  onRate?: (rating: number) => void
  interactive?: boolean
  size?: "sm" | "md" | "lg"
}) => {
  const [hover, setHover] = useState(0)
  
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  }
  
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          className={interactive ? "cursor-pointer" : "cursor-default"}
        >
          <svg
            className={sizeClasses[size]}
            fill={(hover || rating) >= star ? "#C9A962" : "none"}
            stroke="#C9A962"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </button>
      ))}
    </div>
  )
}

const ReviewForm = ({ 
  productId, 
  onSuccess 
}: { 
  productId: string
  onSuccess: () => void 
}) => {
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (rating === 0) {
      setError("Bitte wählen Sie eine Bewertung")
      return
    }
    
    if (!authorName.trim()) {
      setError("Bitte geben Sie eine gültige E-Mail-Adresse ein")
      return
    }
    
    if (!email.trim()) {
      setError("Bitte geben Sie Ihre E-Mail-Adresse ein")
      return
    }
    
    if (!email.includes("@") || !email.includes(".")) {
      setError("Bitte geben Sie eine gültige E-Mail-Adresse ein")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || ""}/store/product-reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
          },
          body: JSON.stringify({
            product_id: productId,
            rating,
            title: title || undefined,
            content: content || undefined,
            author_name: authorName,
            author_email: email,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Fehler beim Absenden")
      }

      setSuccess(true)
      setRating(0)
      setTitle("")
      setContent("")
      setAuthorName("")
      setEmail("")
      onSuccess()
      
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && (
        <div className="p-4 rounded-lg bg-green-50 text-green-800 text-sm">
          Vielen Dank für Ihre Bewertung! Sie wird nach Prüfung veröffentlicht.
        </div>
      )}
      
      {error && (
        <div className="p-4 rounded-lg bg-red-50 text-red-800 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ihre Bewertung *
        </label>
        <StarRating rating={rating} onRate={setRating} interactive size="lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A962] focus:border-[#C9A962] outline-none transition-all"
            placeholder="Ihr Name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-Mail *
          </label>
          <input
            type="email" required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A962] focus:border-[#C9A962] outline-none transition-all"
            placeholder="ihre@email.de"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Titel (optional)
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A962] focus:border-[#C9A962] outline-none transition-all"
          placeholder="Zusammenfassung Ihrer Bewertung"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ihre Erfahrung (optional)
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A962] focus:border-[#C9A962] outline-none transition-all resize-none"
          placeholder="Teilen Sie Ihre Erfahrung mit diesem Produkt..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto px-6 py-3 bg-[#C9A962] text-white font-medium rounded-lg hover:bg-[#B8944F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Wird gesendet..." : "Bewertung absenden"}
      </button>
    </form>
  )
}

const ReviewItem = ({ review }: { review: Review }) => {
  const formattedDate = new Date(review.created_at).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="border-b border-gray-200 pb-6 last:border-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <StarRating rating={review.rating} size="sm" />
            <span className="text-sm text-gray-500">{formattedDate}</span>
          </div>
          
          {review.title && (
            <h4 className="font-semibold text-gray-900 mb-1">{review.title}</h4>
          )}
          
          {review.content && (
            <p className="text-gray-600 text-sm mb-2">{review.content}</p>
          )}
          
          <p className="text-sm text-gray-500">
            von <span className="font-medium text-gray-700">{review.author_name}</span>
          </p>
          
          {review.response && (
            <div className="mt-4 ml-4 pl-4 border-l-2 border-[#C9A962] bg-gray-50 p-3 rounded-r-lg">
              <p className="text-sm font-medium text-[#C9A962] mb-1">Antwort von WELANDA</p>
              <p className="text-sm text-gray-600">{review.response.content}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const RatingBar = ({ 
  stars, 
  count, 
  total 
}: { 
  stars: number
  count: number
  total: number 
}) => {
  const percentage = total > 0 ? (count / total) * 100 : 0
  
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-3 text-gray-600">{stars}</span>
      <svg className="w-4 h-4" fill="#C9A962" viewBox="0 0 24 24">
        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#C9A962] rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-8 text-right text-gray-500">{count}</span>
    </div>
  )
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const fetchReviews = async () => {
    try {
      const [reviewsRes, statsRes] = await Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || ""}/store/product-reviews?product_id=${productId}&status=approved`,
          {
            headers: {
              "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
            },
          }
        ),
        fetch(
          `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || ""}/store/product-review-stats?product_id=${productId}`,
          {
            headers: {
              "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
            },
          }
        ),
      ])

      if (reviewsRes.ok) {
        const data = await reviewsRes.json()
        setReviews(data.reviews || [])
      }

      if (statsRes.ok) {
        const data = await statsRes.json()
        setStats(data.stats?.[0] || null)
      }
    } catch (err) {
      console.error("Error fetching reviews:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [productId])

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    )
  }

  const totalReviews = stats?.total_reviews || 0
  const avgRating = stats?.average_rating || 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Kundenbewertungen</h2>
          {totalReviews > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-lg font-semibold">{avgRating.toFixed(1)}</span>
              <span className="text-gray-500">({totalReviews} {totalReviews === 1 ? "Bewertung" : "Bewertungen"})</span>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2.5 border-2 border-[#C9A962] text-[#C9A962] font-medium rounded-lg hover:bg-[#C9A962] hover:text-white transition-colors"
        >
          {showForm ? "Abbrechen" : "Bewertung schreiben"}
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ihre Bewertung</h3>
          <ReviewForm 
            productId={productId} 
            onSuccess={() => {
              fetchReviews()
              setShowForm(false)
            }} 
          />
        </div>
      )}

      {/* Stats */}
      {totalReviews > 0 && stats?.rating_distribution && (
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">{avgRating.toFixed(1)}</div>
              <StarRating rating={Math.round(avgRating)} size="lg" />
              <p className="text-gray-500 mt-2">{totalReviews} {totalReviews === 1 ? "Bewertung" : "Bewertungen"}</p>
            </div>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => (
                <RatingBar
                  key={stars}
                  stars={stars}
                  count={stats.rating_distribution[stars as keyof typeof stats.rating_distribution] || 0}
                  total={totalReviews}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Noch keine Bewertungen</h3>
          <p className="text-gray-500 mb-4">Seien Sie der Erste, der dieses Produkt bewertet!</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2.5 bg-[#C9A962] text-white font-medium rounded-lg hover:bg-[#B8944F] transition-colors"
          >
            Erste Bewertung schreiben
          </button>
        </div>
      )}
    </div>
  )
}
