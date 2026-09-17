// import { ArrowLeft } from 'lucide-react'
// import { Link } from 'react-router-dom'

// import CategoryCard from '../components/CategoryCard'
// import categories from '../data/categories'
// import { useLanguage } from '../context/LanguageContext'

// function Categories() {
//   const { t } = useLanguage()

//   return (
//     <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
//       {/* Header */}
//       <div className="border-b border-gray-200 pb-8">
//         <Link
//           to="/"
//           className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           {t('home')}
//         </Link>

//         <div>
//           <p className="text-sm font-medium text-gray-500">
//             ፈገግታ Marketplace
//           </p>

//           <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
//             Categories
//           </h1>

//           <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
//             Explore products by category and discover items from trusted
//             sellers.
//           </p>
//         </div>
//       </div>

//       {/* Categories */}
//       <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
//         {categories.map((category) => (
//           <CategoryCard
//             key={category.id}
//             category={category}
//           />
//         ))}
//       </div>
//     </section>
//   )
// }

// export default Categories


import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import CategoryCard from '../components/CategoryCard'
import categories from '../data/categories'
import { useLanguage } from '../context/LanguageContext'

function Categories() {
  const { t } = useLanguage()

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="border-b border-gray-200 pb-8">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('home')}
        </Link>

        <div>
          {/* Marketplace */}
          <p className="text-sm font-medium text-gray-500">
            ፈገግታ {t('marketplace')}
          </p>

          {/* Categories title */}
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {t('categoriesTitle')}
          </h1>

          {/* Categories description */}
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            {t('categoriesDescription')}
          </p>
        </div>
      </div>

      {/* =====================================================
          CATEGORIES GRID
      ===================================================== */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}
      </div>
    </section>
  )
}

export default Categories

