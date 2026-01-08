import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import Script from "next/script"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "WELANDA | Premium Personalized Accessories",
    template: "%s | WELANDA"
  },
  description: "Hochwertige personalisierbare Snus Dosen & EDC Accessoires. Lasergravur made in Hamburg.",
  keywords: ["Snus Dose", "Snus Case", "personalisiert", "Gravur", "ZYN", "Premium", "EDC"],
  openGraph: {
    title: "WELANDA | Premium Personalized Accessories",
    description: "Hochwertige personalisierbare Snus Dosen & EDC Accessoires.",
    siteName: "WELANDA",
    type: "website",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="de" data-mode="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-white text-welanda-charcoal antialiased" suppressHydrationWarning>
        <main className="relative">{props.children}</main>
        {/* Umami Analytics - Datenschutzfreundlich, keine Cookies */}
        <Script
          id="umami"
          strategy="afterInteractive"
          src="https://analytics.ranasinghe.de/script.js"
          data-website-id="f73336a2-8c32-4f71-a87d-8c91e1db6630"
        />
        {/* Consentmanager - DSGVO/TDDDG Cookie Banner */}
        <Script
          id="consentmanager"
          strategy="afterInteractive"
          src="https://cdn.consentmanager.net/delivery/autoblocking/4f23edc94294b.js"
          data-cmp-host="c.delivery.consentmanager.net"
          data-cmp-cdn="cdn.consentmanager.net"
          data-cmp-codesrc="1"
        />
      </body>
    </html>
  )
}
