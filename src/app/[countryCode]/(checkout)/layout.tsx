import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-[#FAFAFA] relative min-h-screen">
      {/* Header */}
      <div className="h-16 bg-white border-b border-gray-200">
        <nav className="flex h-full items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LocalizedClientLink
            href="/cart"
            className="flex items-center gap-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            data-testid="back-to-cart-link"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:block text-sm">Zurück zum Warenkorb</span>
            <span className="block sm:hidden text-sm">Zurück</span>
          </LocalizedClientLink>
          
          <LocalizedClientLink
            href="/"
            className="text-xl font-bold tracking-wider text-[#1A1A1A] hover:text-[#C9A962] transition-colors"
            data-testid="store-link"
          >
            WELANDA
          </LocalizedClientLink>
          
          <div className="w-24 flex justify-end">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:block">Sicher</span>
            </div>
          </div>
        </nav>
      </div>
      
      {/* Content */}
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
      
      {/* Footer */}
      <div className="py-6 border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-6">
              <LocalizedClientLink href="/datenschutz" className="hover:text-[#C9A962]">
                Datenschutz
              </LocalizedClientLink>
              <LocalizedClientLink href="/agb" className="hover:text-[#C9A962]">
                AGB
              </LocalizedClientLink>
              <LocalizedClientLink href="/impressum" className="hover:text-[#C9A962]">
                Impressum
              </LocalizedClientLink>
            </div>
            <div className="flex items-center gap-2">
              <span>© 2025 WELANDA</span>
              <span>•</span>
              <span>Personalisiert in Hamburg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
