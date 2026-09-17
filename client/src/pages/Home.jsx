// import SearchBar from '../components/SearchBar'

// function Home() {
//   return (
//     <div>
//       <section className="mx-auto max-w-7xl px-4 py-10">
//         <SearchBar />
//       </section>
//     </div>
//   )
// }

// export default Home

import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import SearchBar from '../components/SearchBar'
import ProductGrid from '../components/ProductGrid'
import products from '../data/products'
import { useLanguage } from '../context/LanguageContext'

function Home() {
  const { t } = useLanguage()

  return (
    <div>
      {/* Search */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SearchBar />
      </section>

      {/* Hero */}
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

      {/* Featured Products */}
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

        <ProductGrid products={products.slice(0, 4)} />
      </section>
    </div>
  )
}

export default Home