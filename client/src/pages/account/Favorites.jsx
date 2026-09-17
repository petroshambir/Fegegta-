import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
} from 'lucide-react'

import { useLanguage } from '../../context/LanguageContext'

function Favorites() {
  const { t } = useLanguage()

  const favorites = []

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        <Link
          to="/account"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={17} />
          {t('backToAccount') || 'Back to Account'}
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('favorites') || 'Favorites'}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {t('favoritesDescription') ||
              'Products you saved for later.'}
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Heart size={28} className="text-gray-500" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              {t('noFavorites') || 'No favorites yet'}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {t('noFavoritesDescription') ||
                'Save products you love and they will appear here.'}
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              <ShoppingBag size={17} />
              {t('browseProducts') || 'Browse Products'}
            </Link>

          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {favorites.map((product) => (
              <div key={product.id}>
                {product.name}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

export default Favorites