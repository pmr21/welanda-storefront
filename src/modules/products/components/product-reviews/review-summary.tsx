"use client"

import { useState, useEffect } from "react"

type ReviewStats = {
  average_rating: number
  total_reviews: number
}

type ReviewSummaryProps = {
  productId: string
}

export default function ReviewSummary({ productId }: ReviewSummaryProps) {
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || ""}/store/product-review-stats?product_id=${productId}`,
          {
            headers: {
              "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
            },
          }
        )

        if (response.ok) {
          const data = await response.json()
          if (data.stats?.[0]) {
            setStats(data.stats[0])
          }
        }
      } catch (err) {
        console.error("Error fetching review stats:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [productId])

  const scrollToReviews = () => {
    const reviewsSection = document.querySelector('[data-testid="product-reviews-container"]')
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (isLoading || !stats || stats.total_reviews === 0) {
    return null
  }

  return (
    <button
      onClick={scrollToReviews}
      className="inline-flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
    >
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className="w-4 h-4"
            fill={Math.round(stats.average_rating) >= star ? "#C9A962" : "none"}
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
        ))}
      </div>
      <span className="text-gray-600">
        {stats.average_rating.toFixed(1)} ({stats.total_reviews} {stats.total_reviews === 1 ? "Bewertung" : "Bewertungen"})
      </span>
    </button>
  )
}
