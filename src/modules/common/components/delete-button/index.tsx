"use client"

import { deleteLineItem } from "@lib/data/cart"
import { Spinner, Trash } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import { useState } from "react"

declare global {
  interface Window {
    umami?: { track?: (event: string, data?: Record<string, unknown>) => void }
  }
}

const DeleteButton = ({
  id,
  children,
  className,
  productTitle,
  variantTitle,
}: {
  id: string
  children?: React.ReactNode
  className?: string
  productTitle?: string
  variantTitle?: string
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)

    // Track cart removal
    try {
      if (typeof window !== "undefined" && typeof window.umami?.track === "function") {
        window.umami.track("cart_removed", {
          lineItemId: id,
          productTitle: productTitle || "unknown",
          variantTitle: variantTitle || "unknown",
        })
      }
    } catch {}

    try {
      await deleteLineItem(id)
    } catch (err: any) {
      console.error("Delete failed:", err)
    } finally {
      // Always reset loading state - important for mobile
      setIsDeleting(false)
    }
  }

  return (
    <div
      className={clx(
        "flex items-center justify-between text-small-regular",
        className
      )}
    >
      <button
        className="flex gap-x-1 text-ui-fg-subtle hover:text-ui-fg-base cursor-pointer touch-manipulation"
        onClick={() => handleDelete(id)}
        disabled={isDeleting}
      >
        {isDeleting ? <Spinner className="animate-spin" /> : <Trash />}
        <span>{children}</span>
      </button>
    </div>
  )
}

export default DeleteButton
