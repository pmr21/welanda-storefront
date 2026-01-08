'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    umami?: { track?: (event: string, data?: Record<string, unknown>) => void }
  }
}

type Props = {
  pageType: string
  pageId?: string
}

export function ScrollDepthTracker({ pageType, pageId }: Props) {
  const tracked = useRef<Set<number>>(new Set())
  const thresholds = [25, 50, 75, 100]

  useEffect(() => {
    const handleScroll = () => {
      try {
        if (typeof window === 'undefined' || typeof window.umami?.track !== 'function') return

        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        
        if (docHeight <= 0) return
        
        const scrollPercent = Math.round((scrollTop / docHeight) * 100)

        for (const threshold of thresholds) {
          if (scrollPercent >= threshold && !tracked.current.has(threshold)) {
            tracked.current.add(threshold)
            window.umami.track('scroll_depth', {
              pageType,
              pageId: pageId || 'unknown',
              depth: threshold,
            })
          }
        }
      } catch (e) {
        // Silent fail
      }
    }

    let timeout: NodeJS.Timeout
    const debouncedScroll = () => {
      clearTimeout(timeout)
      timeout = setTimeout(handleScroll, 100)
    }

    window.addEventListener('scroll', debouncedScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', debouncedScroll)
      clearTimeout(timeout)
    }
  }, [pageType, pageId])

  return null
}

export default ScrollDepthTracker
