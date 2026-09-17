

import { useMemo, useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'

import ProductGrid from '../components/ProductGrid'
import products from '../data/products'
import { useLanguage } from '../context/LanguageContext'

function Products() {
  const { t } = useLanguage()

  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    'all',
    ...new Set(products.map((product) => product.category)),
  ]

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase()

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search) ||
          product.seller.toLowerCase().includes(search)
      )
    }

    if (category !== 'all') {
      result = result.filter(
        (product) => product.category === category
      )
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    }

    if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    }

    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    }

    if (sortBy === 'newest') {
      result.reverse()
    }

    return result
  }, [searchTerm, category, sortBy])

  const clearFilters = () => {
    setSearchTerm('')
    setCategory('all')
    setSortBy('featured')
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              ፈገግታ {t('marketplace')}
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('products')}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              {t('discoverProducts')}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((current) => !current)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {t('filters')}
          </button>
        </div>

        {/* Search */}
        <div className="mt-6">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('searchProducts')}
            className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">
              {t('filters')}
            </h2>

            <button
              type="button"
              onClick={() => setShowFilters(false)}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-white hover:text-gray-900"
              aria-label={t('close')}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t('category')}
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-gray-400"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item === 'all'
                      ? t('allCategoriesFilter')
                      : item}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t('sortBy')}
              </label>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-gray-400"
              >
                <option value="featured">
                  {t('featured')}
                </option>

                <option value="newest">
                  {t('newest')}
                </option>

                <option value="rating">
                  {t('topRated')}
                </option>

                <option value="price-low">
                  {t('priceLowHigh')}
                </option>

                <option value="price-high">
                  {t('priceHighLow')}
                </option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 text-sm font-medium text-gray-600 underline underline-offset-4 hover:text-black"
          >
            {t('clearFilters')}
          </button>
        </div>
      )}

      {/* Results */}
      <div className="mt-8">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {filteredProducts.length} {t('productsFound')}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="rounded-2xl border border-gray-200 py-20 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              {t('noResults')}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {t('tryChangingSearch')}
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              {t('clear')}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Products

