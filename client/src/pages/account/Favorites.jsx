// import React from 'react'
// import { Link } from 'react-router-dom'
// import {
//   ArrowLeft,
//   Heart,
//   ShoppingBag,
// } from 'lucide-react'

// import { useLanguage } from '../../context/LanguageContext'

// function Favorites() {
//   const { t } = useLanguage()

//   const favorites = []

//   return (
//     <section className="min-h-screen bg-gray-50">
//       <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

//         <Link
//           to="/account"
//           className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
//         >
//           <ArrowLeft size={17} />
//           {t('backToAccount') || 'Back to Account'}
//         </Link>

//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">
//             {t('favorites') || 'Favorites'}
//           </h1>

//           <p className="mt-2 text-sm text-gray-500">
//             {t('favoritesDescription') ||
//               'Products you saved for later.'}
//           </p>
//         </div>

//         {favorites.length === 0 ? (
//           <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

//             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
//               <Heart size={28} className="text-gray-500" />
//             </div>

//             <h2 className="mt-5 text-xl font-semibold text-gray-900">
//               {t('noFavorites') || 'No favorites yet'}
//             </h2>

//             <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
//               {t('noFavoritesDescription') ||
//                 'Save products you love and they will appear here.'}
//             </p>

//             <Link
//               to="/products"
//               className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
//             >
//               <ShoppingBag size={17} />
//               {t('browseProducts') || 'Browse Products'}
//             </Link>

//           </div>
//         ) : (
//           <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//             {favorites.map((product) => (
//               <div key={product.id}>
//                 {product.name}
//               </div>
//             ))}
//           </div>
//         )}

//       </div>
//     </section>
//   )
// }

// export default Favorites

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'

import { useLanguage } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'

const API_URL =
  'https://fegegta-server.onrender.com/api'

function Favorites() {
  const { t } = useLanguage()
  const {
    getToken,
    isAuthenticated,
  } = useAuth()

  const [favorites, setFavorites] = useState([])

  const [isLoading, setIsLoading] =
    useState(true)

  const [removingId, setRemovingId] =
    useState(null)

  const [error, setError] = useState('')

  const [successMessage, setSuccessMessage] =
    useState('')

  // ============================================================
  // LOAD FAVORITES
  // ============================================================

  const loadFavorites = async () => {
    try {
      setIsLoading(true)
      setError('')

      const token = getToken?.()

      if (!token) {
        setFavorites([])

        setError(
          t('loginRequired') ||
            'Please login to view your favorites.'
        )

        return
      }

      const response = await fetch(
        `${API_URL}/favorites`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Failed to load favorites.'
        )
      }

      setFavorites(
        Array.isArray(data.favorites)
          ? data.favorites
          : []
      )
    } catch (error) {
      console.error(
        'Load favorites error:',
        error
      )

      setError(
        error.message ||
          'Unable to load favorites. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  // ============================================================
  // LOAD WHEN PAGE OPENS
  // ============================================================

  useEffect(() => {
    if (isAuthenticated) {
      loadFavorites()
    } else {
      setIsLoading(false)
    }
  }, [isAuthenticated])

  // ============================================================
  // REMOVE FAVORITE
  // ============================================================

  const removeFavorite = async (
    productId
  ) => {
    try {
      setRemovingId(productId)
      setError('')
      setSuccessMessage('')

      const token = getToken?.()

      if (!token) {
        setError(
          t('loginRequired') ||
            'Please login to manage favorites.'
        )

        return
      }

      const response = await fetch(
        `${API_URL}/favorites/${productId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Failed to remove favorite.'
        )
      }

      setFavorites((previous) =>
        previous.filter(
          (item) =>
            String(
              item.product?._id ||
                item.product?.id
            ) !== String(productId)
        )
      )

      setSuccessMessage(
        data.message ||
          t('favoriteRemoved') ||
          'Product removed from favorites.'
      )
    } catch (error) {
      console.error(
        'Remove favorite error:',
        error
      )

      setError(
        error.message ||
          'Unable to remove favorite. Please try again.'
      )
    } finally {
      setRemovingId(null)
    }
  }

  // ============================================================
  // LOGIN REQUIRED
  // ============================================================

  if (
    !isAuthenticated &&
    !isLoading
  ) {
    return (
      <section className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

          <Link
            to="/account"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={17} />

            {t('backToAccount') ||
              'Back to Account'}
          </Link>

          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Heart
                size={28}
                className="text-gray-500"
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              {t('loginRequired') ||
                'Login Required'}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {t('loginToViewFavorites') ||
                'Please login to view your favorite products.'}
            </p>

            <Link
              to="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              {t('login') || 'Login'}
            </Link>

          </div>
        </div>
      </section>
    )
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* ======================================================
            BACK TO ACCOUNT
        ====================================================== */}

        <Link
          to="/account"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={17} />

          {t('backToAccount') ||
            'Back to Account'}
        </Link>

        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('favorites') ||
              'Favorites'}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {t('favoritesDescription') ||
              'Products you saved for later.'}
          </p>
        </div>

        {/* ======================================================
            SUCCESS MESSAGE
        ====================================================== */}

        {successMessage && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">

            <CheckCircle
              size={19}
              className="mt-0.5 shrink-0"
            />

            <p>{successMessage}</p>

          </div>
        )}

        {/* ======================================================
            ERROR MESSAGE
        ====================================================== */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0"
            />

            <p>{error}</p>

          </div>
        )}

        {/* ======================================================
            LOADING
        ====================================================== */}

        {isLoading ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

            <Loader2
              size={32}
              className="mx-auto animate-spin text-gray-600"
            />

            <p className="mt-4 text-sm text-gray-500">
              {t('loading') ||
                'Loading...'}
            </p>

          </div>
        ) : favorites.length === 0 ? (

          /* ====================================================
             EMPTY FAVORITES
          ==================================================== */

          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Heart
                size={28}
                className="text-gray-500"
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              {t('noFavorites') ||
                'No favorites yet'}
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

              {t('browseProducts') ||
                'Browse Products'}
            </Link>

          </div>

        ) : (

          /* ====================================================
             FAVORITES GRID
          ==================================================== */

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {favorites.map((item) => {
              const product =
                item.product

              if (!product) {
                return null
              }

              const productId =
                product._id ||
                product.id

              // ------------------------------------------------
              // PRODUCT IMAGE
              // ------------------------------------------------

              let productImage = ''

              if (
                Array.isArray(
                  product.images
                ) &&
                product.images.length > 0
              ) {
                const firstImage =
                  product.images[0]

                if (
                  typeof firstImage ===
                  'string'
                ) {
                  productImage =
                    firstImage
                } else {
                  productImage =
                    firstImage?.url || ''
                }
              }

              // ------------------------------------------------
              // SELLER
              // ------------------------------------------------

              const sellerName =
                product.seller
                  ?.businessName ||
                product.seller?.name ||
                ''

              // ------------------------------------------------
              // PRICE
              // ------------------------------------------------

              const price =
                Number(product.price) || 0

              return (
                <div
                  key={
                    item.favoriteId ||
                    productId
                  }
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                >

                  {/* ==========================================
                      IMAGE
                  ========================================== */}

                  <Link
                    to={`/products/${productId}`}
                    className="block"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-100">

                      {productImage ? (
                        <img
                          src={productImage}
                          alt={
                            product.name ||
                            'Product'
                          }
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ShoppingBag
                            size={42}
                            className="text-gray-400"
                          />
                        </div>
                      )}

                    </div>
                  </Link>

                  {/* ==========================================
                      PRODUCT INFORMATION
                  ========================================== */}

                  <div className="p-4">

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">

                        <Link
                          to={`/products/${productId}`}
                          className="block truncate text-sm font-semibold text-gray-900 hover:text-gray-600"
                        >
                          {product.name}
                        </Link>

                        {sellerName && (
                          <p className="mt-1 truncate text-xs text-gray-500">
                            {sellerName}
                          </p>
                        )}

                      </div>

                      {/* ========================================
                          REMOVE FAVORITE
                      ======================================== */}

                      <button
                        type="button"
                        onClick={() =>
                          removeFavorite(
                            productId
                          )
                        }
                        disabled={
                          removingId ===
                          productId
                        }
                        aria-label={
                          t(
                            'removeFavorite'
                          ) ||
                          'Remove from favorites'
                        }
                        className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {removingId ===
                        productId ? (
                          <Loader2
                            size={17}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2
                            size={17}
                          />
                        )}
                      </button>

                    </div>

                    {/* ==========================================
                        PRICE
                    ========================================== */}

                    <p className="mt-3 text-lg font-bold text-gray-900">
                      €{price.toFixed(2)}
                    </p>

                  </div>
                </div>
              )
            })}

          </div>
        )}

      </div>
    </section>
  )
}

export default Favorites