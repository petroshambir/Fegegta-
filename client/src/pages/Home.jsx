
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import SearchBar from '../components/SearchBar'
import ProductGrid from '../components/ProductGrid'
import { useLanguage } from '../context/LanguageContext'


// ============================================================
// FEGEGTA API
// ============================================================

const API_URL = 'https://fegegta-server.onrender.com/api'


// ============================================================
// HOME
// ============================================================

function Home() {
  const { t } = useLanguage()

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')


  // ==========================================================
  // LOAD FEATURED PRODUCTS
  // ==========================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(
          `${API_URL}/products`
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data?.message ||
            'Failed to load products.'
          )
        }


        // Backend can return:
        // [...]
        // OR
        // { products: [...] }

        const backendProducts =
          Array.isArray(data)
            ? data
            : Array.isArray(data?.products)
              ? data.products
              : []


        // ====================================================
        // FORMAT BACKEND PRODUCTS
        // ====================================================

        const formattedProducts =
          backendProducts
            .filter((product) => {
              return (
                product?.approvalStatus === 'approved' &&
                product?.isActive !== false &&
                Number(product?.stock || 0) > 0
              )
            })
            .map((product) => {
              const images =
                Array.isArray(product?.images)
                  ? product.images
                      .map((image) => {
                        if (
                          typeof image === 'string'
                        ) {
                          return image
                        }

                        return image?.url || ''
                      })
                      .filter(Boolean)
                  : []


              const sellerName =
                product?.seller?.businessName ||
                product?.seller?.name ||
                'Fegegta Seller'


              return {
                id:
                  product?._id ||
                  product?.id,

                name:
                  product?.name || '',

                description:
                  product?.description || '',

                price:
                  Number(product?.price) || 0,

                seller:
                  sellerName,

                sellerRating:
                  Number(
                    product?.seller?.rating ||
                    product?.sellerRating ||
                    0
                  ),

                rating:
                  Number(product?.rating) || 0,

                reviewCount:
                  Number(
                    product?.totalReviews ||
                    product?.reviewCount ||
                    0
                  ),

                available:
                  true,

                stock:
                  Number(product?.stock) || 0,

                category:
                  product?.category || '',

                image:
                  images[0] || '',

                images,
              }
            })


        // ====================================================
        // FEATURED PRODUCTS
        //
        // First show products marked as featured.
        // If there are not enough featured products,
        // fill the remaining spaces with approved products.
        // ====================================================

        const featuredProducts =
          formattedProducts.filter(
            (product, index) =>
              backendProducts[index]?.isFeatured === true
          )


        const nonFeaturedProducts =
          formattedProducts.filter(
            (product) =>
              !featuredProducts.some(
                (featured) =>
                  featured.id === product.id
              )
          )


        const homeProducts = [
          ...featuredProducts,
          ...nonFeaturedProducts,
        ].slice(0, 4)


        setProducts(homeProducts)

      } catch (err) {
        console.error(
          'Failed to fetch home products:',
          err
        )

        setError(
          err?.message ||
          'Failed to load products.'
        )

        setProducts([])

      } finally {
        setIsLoading(false)
      }
    }


    fetchProducts()
  }, [])


  return (
    <div>

      {/* ====================================================
          SEARCH
      ==================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SearchBar />
      </section>


      {/* ====================================================
          HERO
      ==================================================== */}

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">

        <div className="overflow-hidden rounded-3xl bg-gray-950 px-6 py-14 text-white sm:px-10 lg:px-16 lg:py-20">

          <div className="max-w-2xl">

            <p className="text-sm font-medium tracking-wide text-gray-400">
              ፈገግታ Marketplace
            </p>


            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Discover products you’ll love.
            </h1>


            <p className="mt-5 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
              Shop quality products from trusted sellers in one simple,
              professional marketplace.
            </p>


            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              {t('viewAll')}

              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>

        </div>

      </section>


      {/* ====================================================
          FEATURED PRODUCTS
      ==================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="mb-7 flex items-end justify-between gap-4">

          <div>

            <p className="text-sm font-medium text-gray-500">
              Featured
            </p>


            <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
              {t('products')}
            </h2>

          </div>


          <Link
            to="/products"
            className="hidden items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-black sm:flex"
          >
            {t('viewAll')}

            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>


        {/* ==================================================
            LOADING
        ================================================== */}

        {isLoading && (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
              >

                <div className="aspect-square animate-pulse bg-gray-200" />

                <div className="space-y-3 p-4">

                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />

                  <div className="h-3 w-full animate-pulse rounded bg-gray-200" />

                  <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200" />

                </div>

              </div>
            ))}

          </div>
        )}


        {/* ==================================================
            ERROR
        ================================================== */}

        {!isLoading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">

            <h3 className="text-lg font-semibold text-red-800">
              Unable to load products
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-sm text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Try Again
            </button>

          </div>
        )}


        {/* ==================================================
            PRODUCTS
        ================================================== */}

        {!isLoading &&
          !error &&
          products.length > 0 && (
            <ProductGrid
              products={products}
            />
          )}


        {/* ==================================================
            NO PRODUCTS
        ================================================== */}

        {!isLoading &&
          !error &&
          products.length === 0 && (
            <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-16 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <ShoppingBagIcon />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                No products available yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                New products will appear here once sellers have products approved.
              </p>

              <Link
                to="/products"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                {t('viewAll')}
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>
          )}

      </section>

    </div>
  )
}


// ============================================================
// SMALL EMPTY ICON
// ============================================================

function ShoppingBagIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-7 w-7 text-gray-400"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 8h12l1 12H5L6 8Z"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 8a3 3 0 0 1 6 0"
      />
    </svg>
  )
}


export default Home