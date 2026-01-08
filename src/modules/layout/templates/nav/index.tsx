import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <header className="relative h-16 small:h-20 mx-auto bg-white/95 backdrop-blur-md border-b border-grey-10">
        <nav className="content-container flex items-center justify-between w-full h-full">
          
          {/* Left: Menu + Flag (Desktop) */}
          <div className="flex-1 basis-0 h-full flex items-center gap-x-4">
            <SideMenu regions={regions} />
          </div>

          {/* Center: Logo */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="group flex items-center gap-2"
              data-testid="nav-store-link"
            >
              {/* WELANDA Logo Text */}
              <span className="font-display text-xl small:text-2xl font-bold tracking-tight text-welanda-black group-hover:text-welanda-gold transition-colors duration-300">
                WELANDA
              </span>
            </LocalizedClientLink>
          </div>

          {/* Right: Account & Cart */}
          <div className="flex items-center gap-x-4 small:gap-x-6 h-full flex-1 basis-0 justify-end">
            {/* Desktop Navigation Links */}
            <div className="hidden small:flex items-center gap-x-6">
              <LocalizedClientLink
                className="text-sm font-medium text-grey-60 hover:text-welanda-black transition-colors duration-200"
                href="/store"
              >
                Shop
              </LocalizedClientLink>
              <LocalizedClientLink
                className="text-sm font-medium text-grey-60 hover:text-welanda-black transition-colors duration-200"
                href="/account"
                data-testid="nav-account-link"
              >
                Konto
              </LocalizedClientLink>
            </div>
            
            {/* Cart */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="relative flex items-center gap-2 text-sm font-medium text-grey-60 hover:text-welanda-black transition-colors"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
