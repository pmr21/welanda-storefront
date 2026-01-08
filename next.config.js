const nextConfig = {
  typescript: {
    // TypeScript-Fehler beim Build ignorieren (für Produktion)
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint-Fehler beim Build ignorieren
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "159.195.50.163",
      },
      {
        protocol: "https",
        hostname: "wlnd.ranasinghe.de",
      },
      {
        protocol: "https", 
        hostname: "welanda.com",
      },
      {
        protocol: "http",
        hostname: "159.195.50.163",
        port: "9002",
        pathname: "/welanda/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        // Redirect Mollie callback to country-specific route
        source: '/checkout/payment',
        destination: '/de/checkout/payment',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
