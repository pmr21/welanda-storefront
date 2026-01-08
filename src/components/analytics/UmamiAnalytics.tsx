import Script from 'next/script'

export function UmamiAnalytics() {
  if (process.env.NODE_ENV !== 'production') return null
  
  return (
    <Script
      src="https://analytics.ranasinghe.de/script.js"
      data-website-id="f73336a2-8c32-4f71-a87d-8c91e1db6630"
      strategy="afterInteractive"
    />
  )
}

export default UmamiAnalytics
