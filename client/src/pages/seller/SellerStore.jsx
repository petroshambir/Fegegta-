import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  CheckCircle2,
  Heart,
  Search,
  Share2,
  ShoppingCart,
  Store,
} from 'lucide-react'

import {
  getSellerStoreBySlug,
  getApprovedProductsForStore,
} from '../../services/sellerStorage'

import { useCart } from '../../context/CartContext'

function SellerStore() {
  const { slug } = useParams()
  const { addToCart } = useCart()

  const [store, setStore] = useState(null)
  const [products, setProducts] = useState([])

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')

  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const loadStore = () => {
      const foundStore = getSellerStoreBySlug(slug)

      if (!foundStore) {
        setStore(null)
        setProducts([])
        return
      }

      setStore(foundStore)

      const approvedProducts =
        getApprovedProductsForStore(foundStore.id)

      setProducts(approvedProducts)
    }

    loadStore()
  }, [slug])

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    let result = products.filter((product) => {
      if (!query) return true

      return (
        product.name?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.subcategory?.toLowerCase().includes(query)
      )
    })

    if (sort === 'price-low') {
      result = [...result].sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      )
    }

    if (sort === 'price-high') {
      result = [...result].sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      )
    }

    if (sort === 'newest') {
      result = [...result].sort(
        (a, b) =>
          new Date(b.submittedAt || b.createdAt || 0) -
          new Date(a.submittedAt || a.createdAt || 0)
      )
    }

    return result
  }, [products, search, sort])

  const toggleFavorite = (productId) => {
    setFavorites((previous) =>
      previous.includes(productId)
        ? previous.filter((id) => id !== productId)
        : [...previous, productId]
    )
  }

  const handleShare = async () => {
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title: store?.storeName || 'Fegegta Store',
          text: `Visit ${store?.storeName || 'this store'} on Fegegta.`,
          url,
        })
      } catch (error) {
        if (error?.name !== 'AbortError') {
          console.error('Share failed:', error)
        }
      }

      return
    }

    try {
      await navigator.clipboard.writeText(url)
      alert('Store link copied.')
    } catch {
      alert(url)
    }
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <Store className="mx-auto h-14 w-14 text-gray-400" />

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Store Not Found
          </h1>

          <p className="mt-2 text-gray-500">
            This store does not exist or is not publicly available.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* COVER */}
      <section className="relative h-56 overflow-hidden bg-gray-900 sm:h-72">
        {store.coverImage ? (
          <img
            src={store.coverImage}
            alt={store.storeName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Store className="h-16 w-16 text-gray-600" />
          </div>
        )}

        <div className="absolute inset-0 bg-black/40" />
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* STORE HEADER */}
        <section className="relative -mt-12 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-gray-100 shadow-md">
              {store.logo ? (
                <img
                  src={store.logo}
                  alt={store.storeName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Store className="h-10 w-10 text-gray-400" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {store.storeName}
                </h1>

                {store.verified === true && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Verified
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm text-gray-500">
                {store.storeDescription ||
                  'Welcome to our store.'}
              </p>

              {store.storeCategory && (
                <p className="mt-2 text-xs font-medium text-gray-400">
                  {store.storeCategory}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              <Share2 className="h-4 w-4" />
              Share Store
            </button>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="py-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Store Products
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {visibleProducts.length} approved products
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search products..."
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-black sm:w-64"
                />
              </div>

              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value)
                }
                className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
              >
                <option value="featured">
                  Featured
                </option>

                <option value="newest">
                  Newest
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>
              </select>
            </div>
          </div>

          {visibleProducts.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-12 text-center">
              <Store className="mx-auto h-12 w-12 text-gray-400" />

              <h3 className="mt-4 font-bold">
                No products found
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                This store currently has no approved products matching your search.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {visibleProducts.map((product) => {
                const isFavorite =
                  favorites.includes(product.id)

                const productImages =
                  Array.isArray(product.images)
                    ? product.images
                    : product.image
                      ? [product.image]
                      : []

                const mainImage =
                  productImages[0] || ''

                return (
                  <article
                    key={product.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {/* IMAGE */}
                    <Link
                      to={`/product/${product.id}`}
                      className="block"
                    >
                      <div className="relative aspect-square bg-gray-100">
                        {mainImage ? (
                          <img
                            src={mainImage}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}

                        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-gray-700 shadow-sm">
                          {productImages.length}/4 images
                        </div>

                        <button
                          type="button"
                          onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            toggleFavorite(product.id)
                          }}
                          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm"
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              isFavorite
                                ? 'fill-red-500 text-red-500'
                                : 'text-gray-700'
                            }`}
                          />
                        </button>
                      </div>
                    </Link>

                    {/* PRODUCT INFO */}
                    <div className="p-4">
                      <Link
                        to={`/product/${product.id}`}
                        className="block"
                      >
                        <h3 className="line-clamp-2 text-sm font-semibold hover:underline">
                          {product.name}
                        </h3>

                        {product.category && (
                          <p className="mt-1 text-xs text-gray-400">
                            {product.category}
                          </p>
                        )}

                        <p className="mt-2 font-bold">
                          €{Number(product.price || 0).toFixed(2)}
                        </p>

                        {product.oldPrice &&
                          Number(product.oldPrice) >
                            Number(product.price) && (
                            <p className="text-xs text-gray-400 line-through">
                              €{Number(product.oldPrice).toFixed(2)}
                            </p>
                          )}
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          addToCart({
                            ...product,
                            sellerId: store.sellerId,
                            storeId: store.id,
                            storeSlug: store.slug,
                            storeName: store.storeName,
                          })
                        }
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white hover:bg-gray-800"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default SellerStore