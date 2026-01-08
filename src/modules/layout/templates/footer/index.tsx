import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  return (
    <footer className="bg-welanda-charcoal text-white">
      {/* Main Footer */}
      <div className="content-container py-16">
        <div className="grid grid-cols-1 small:grid-cols-2 medium:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="small:col-span-2 medium:col-span-1">
            <LocalizedClientLink href="/" className="inline-block mb-6">
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                WELANDA
              </span>
            </LocalizedClientLink>
            <p className="text-grey-40 text-sm leading-relaxed mb-6">
              Premium personalisierte Accessoires. Hochwertige Snus Dosen & EDC-Produkte mit Lasergravur – gefertigt in Hamburg.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="https://instagram.com/welanda" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-welanda-gold hover:text-welanda-black transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://tiktok.com/@welanda" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-welanda-gold hover:text-welanda-black transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-6">Shop</h4>
            <ul className="space-y-3">
              <li>
                <LocalizedClientLink href="/store" className="text-grey-40 hover:text-welanda-gold transition-colors text-sm">
                  Alle Produkte
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/collections/snus-cases" className="text-grey-40 hover:text-welanda-gold transition-colors text-sm">
                  Snus Dosen
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/blog" className="text-grey-40 hover:text-welanda-gold transition-colors text-sm">
                  Blog
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-6">Hilfe</h4>
            <ul className="space-y-3">
              <li>
                <LocalizedClientLink href="/faq" className="text-grey-40 hover:text-welanda-gold transition-colors text-sm">
                  FAQ
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/versand" className="text-grey-40 hover:text-welanda-gold transition-colors text-sm">
                  Versand & Lieferung
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/rueckgabe" className="text-grey-40 hover:text-welanda-gold transition-colors text-sm">
                  Rückgabe & Umtausch
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/kontakt" className="text-grey-40 hover:text-welanda-gold transition-colors text-sm">
                  Kontakt
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-6">Rechtliches</h4>
            <ul className="space-y-3">
              <li>
                <LocalizedClientLink href="/impressum" className="text-grey-40 hover:text-welanda-gold transition-colors text-sm">
                  Impressum
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/datenschutz" className="text-grey-40 hover:text-welanda-gold transition-colors text-sm">
                  Datenschutz
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/agb" className="text-grey-40 hover:text-welanda-gold transition-colors text-sm">
                  AGB
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/widerruf" className="text-grey-40 hover:text-welanda-gold transition-colors text-sm">
                  Widerrufsbelehrung
                </LocalizedClientLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="content-container py-6">
          <div className="flex flex-col small:flex-row justify-between items-center gap-4">
            <p className="text-grey-50 text-sm">
              © {new Date().getFullYear()} WELANDA. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-6">
              {/* Payment Icons */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-grey-50">Zahlungsarten:</span>
                <div className="flex gap-2">
                  <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center">
                    <span className="text-[10px] text-grey-40">VISA</span>
                  </div>
                  <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center">
                    <span className="text-[10px] text-grey-40">MC</span>
                  </div>
                  <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center">
                    <span className="text-[10px] text-grey-40">PayPal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
