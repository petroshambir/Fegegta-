import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Category name on image */}
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            {category.name}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <p className="line-clamp-2 text-sm leading-6 text-gray-500">
          {category.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">
            Explore category
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition group-hover:bg-black group-hover:text-white">
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard