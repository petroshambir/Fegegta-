


import { useState } from 'react'
import { Link } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { t } = useLanguage()
  const { totalItems } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Navbar */}
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
              F
            </div>

            <span className="text-xl font-bold tracking-tight">
              ፈገግታ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 md:flex">

            <Link
              to="/"
              className="text-sm font-medium text-gray-700 transition hover:text-black"
            >
              {t('home')}
            </Link>

            <Link
              to="/products"
              className="text-sm font-medium text-gray-700 transition hover:text-black"
            >
              {t('products')}
            </Link>

            <Link
              to="/stores"
              className="text-sm font-medium text-gray-700 transition hover:text-black"
            >
              {t('stores')}
            </Link>

            <Link
              to="/about"
              className="text-sm font-medium text-gray-700 transition hover:text-black"
            >
              {t('about')}
            </Link>

            {/* Sell With Us */}
            <Link
              to="/seller/apply"
              className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              {t('sellWithUs') || 'Sell With Us'}
            </Link>
            <Link to="/my-orders">
  My Orders
</Link>

          </nav>

          {/* Desktop Actions */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Language */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Login */}
            <Link
              to="/login"
              className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black sm:block"
            >
              {t('login')}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 hover:text-black"
              aria-label={t('cart')}
            >
              <span className="relative block text-xl leading-none">
                🛒

                {totalItems > 0 && (
                  <span className="absolute -right-3 -top-3 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 hover:text-black md:hidden"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>

          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-gray-100 py-4 md:hidden">

            <nav className="flex flex-col">

              <Link
                to="/"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
              >
                {t('home')}
              </Link>

              <Link
                to="/products"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
              >
                {t('products')}
              </Link>

              <Link
                to="/stores"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
              >
                {t('stores')}
              </Link>

              <Link
                to="/about"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
              >
                {t('about')}
              </Link>

              {/* Mobile Sell With Us */}
              <Link
                to="/seller/apply"
                onClick={closeMenu}
                className="mt-2 rounded-lg bg-black px-3 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                {t('sellWithUs') || 'Sell With Us'}
              </Link>

              {/* Mobile Login */}
              <Link
                to="/login"
                onClick={closeMenu}
                className="mt-2 rounded-lg bg-gray-100 px-3 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-200"
              >
                {t('login')}
              </Link>

              {/* Mobile Language */}
              <div className="mt-3 border-t border-gray-100 pt-3">
                <LanguageSwitcher />
              </div>

            </nav>
          </div>
        )}

      </div>
    </header>
  )
}

export default Navbar