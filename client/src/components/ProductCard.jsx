

// import { Link } from 'react-router-dom'
// import { Heart, ShoppingCart, Star } from 'lucide-react'

// import { useCart } from '../context/CartContext'
// import { useLanguage } from '../context/LanguageContext'

// function ProductCard({ product }) {
//   const { t } = useLanguage()
//   const { addToCart } = useCart()

//   const {
//     id,
//     name,
//     description,
//     price,
//     image,
//     seller,
//     rating = 0,
//     reviewCount = 0,
//     available = true,
//   } = product

//   const handleAddToCart = () => {
//     addToCart(product)
//   }

//   return (
//     <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl">
//       {/* =====================================================
//           PRODUCT IMAGE
//       ====================================================== */}
//       <Link to={`/products/${id}`} className="block">
//         <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50">
//           {/* Image */}
//           <img
//             src={image}
//             alt={name}
//             className="absolute inset-0 h-full w-full object-contain object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
//           />

//           {/* Soft bottom gradient */}
//           <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

//           {/* Favorite */}
//           <button
//             type="button"
//             onClick={(e) => {
//               e.preventDefault()
//               e.stopPropagation()
//             }}
//             className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/80 bg-white/95 text-gray-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:text-red-500 hover:shadow-md"
//             aria-label="Add to favorites"
//           >
//             <Heart className="h-4.5 w-4.5 transition-transform duration-300 hover:scale-110" />
//           </button>

//           {/* Availability */}
//           {!available && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[1px]">
//               <span className="rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-gray-900 shadow-lg">
//                 {t('noResults')}
//               </span>
//             </div>
//           )}
//         </div>
//       </Link>

//       {/* =====================================================
//           PRODUCT INFORMATION
//       ====================================================== */}
//       <div className="p-4">
//         {/* Seller */}
//         <p className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400 sm:text-[11px]">
//           {seller}
//         </p>

//         {/* Product Name */}
//         <Link to={`/products/${id}`}>
//           <h2 className="mt-1.5 line-clamp-1 text-[15px] font-semibold leading-5 text-gray-900 transition-colors duration-200 hover:text-gray-600 sm:text-base">
//             {name}
//           </h2>
//         </Link>

//         {/* Description */}
//         <p className="mt-1 line-clamp-1 text-xs leading-4 text-gray-500">
//           {description}
//         </p>

//         {/* Rating */}
//         <div className="mt-2.5 flex items-center gap-2">
//           <div className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1">
//             <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />

//             <span className="text-xs font-semibold text-gray-800">
//               {Number(rating).toFixed(1)}
//             </span>
//           </div>

//           <span className="text-[11px] text-gray-400">
//             ({reviewCount} reviews)
//           </span>
//         </div>

//         {/* Divider */}
//         <div className="my-2 border-t border-gray-100" />

//         {/* Price + Cart */}
//         <div className="flex items-center justify-between gap-2">
//           {/* Price */}
//           <div>
//             <p className="text-[9px] font-medium uppercase tracking-wide text-gray-400">
//               Price
//             </p>

//             <p className="mt-0.5 text-lg font-bold leading-none tracking-tight text-gray-950 sm:text-xl">
//               €{Number(price).toFixed(2)}
//             </p>
//           </div>

//           {/* Add To Cart */}
//           <button
//             type="button"
//             onClick={handleAddToCart}
//             disabled={!available}
//             className="group/cart flex h-10 items-center gap-2 rounded-xl bg-gray-950 px-3.5 text-white shadow-sm transition-all duration-300 hover:bg-gray-800 hover:shadow-md disabled:cursor-not-allowed disabled:bg-gray-300"
//             aria-label={t('cart')}
//           >
//             <ShoppingCart className="h-4 w-4 transition-transform duration-300 group-hover/cart:scale-110" />

//             <span className="hidden text-xs font-semibold sm:inline">
//               {t('cart')}
//             </span>
//           </button>
//         </div>
//       </div>
//     </article>
//   )
// }

// export default ProductCard


import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Star } from 'lucide-react'

import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import ProductImage3D from './ProductImage3D'

function ProductCard({ product }) {
  const { t } = useLanguage()
  const { addToCart } = useCart()

  const {
    id,
    name,
    description,
    price,
    image,
    seller,
    rating = 0,
    reviewCount = 0,
    available = true,
  } = product

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl">
      {/* =====================================================
          PRODUCT IMAGE
      ====================================================== */}
      <Link to={`/products/${id}`} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50">

          {/* =================================================
              ONLY PRODUCT IMAGE IS 3D
          ================================================== */}
          <ProductImage3D
            image={image}
            alt={name}
          />

          {/* Soft bottom gradient */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Favorite */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/80 bg-white/95 text-gray-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:text-red-500 hover:shadow-md"
            aria-label="Add to favorites"
          >
            <Heart className="h-4.5 w-4.5 transition-transform duration-300 hover:scale-110" />
          </button>

          {/* Availability */}
          {!available && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[1px]">
              <span className="rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-gray-900 shadow-lg">
                {t('noResults')}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* =====================================================
          PRODUCT INFORMATION
      ====================================================== */}
      <div className="p-4">

        {/* Seller */}
        <p className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400 sm:text-[11px]">
          {seller}
        </p>

        {/* Product Name */}
        <Link to={`/products/${id}`}>
          <h2 className="mt-1.5 line-clamp-1 text-[15px] font-semibold leading-5 text-gray-900 transition-colors duration-200 hover:text-gray-600 sm:text-base">
            {name}
          </h2>
        </Link>

        {/* Description */}
        <p className="mt-1 line-clamp-1 text-xs leading-4 text-gray-500">
          {description}
        </p>

        {/* Rating */}
        <div className="mt-2.5 flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />

            <span className="text-xs font-semibold text-gray-800">
              {Number(rating).toFixed(1)}
            </span>
          </div>

          <span className="text-[11px] text-gray-400">
            ({reviewCount} reviews)
          </span>
        </div>

        {/* Divider */}
        <div className="my-2 border-t border-gray-100" />

        {/* Price + Cart */}
        <div className="flex items-center justify-between gap-2">

          {/* Price */}
          <div>
            <p className="text-[9px] font-medium uppercase tracking-wide text-gray-400">
              Price
            </p>

            <p className="mt-0.5 text-lg font-bold leading-none tracking-tight text-gray-950 sm:text-xl">
              €{Number(price).toFixed(2)}
            </p>
          </div>

          {/* Add To Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!available}
            className="group/cart flex h-10 items-center gap-2 rounded-xl bg-gray-950 px-3.5 text-white shadow-sm transition-all duration-300 hover:bg-gray-800 hover:shadow-md disabled:cursor-not-allowed disabled:bg-gray-300"
            aria-label={t('cart')}
          >
            <ShoppingCart className="h-4 w-4 transition-transform duration-300 group-hover/cart:scale-110" />

            <span className="hidden text-xs font-semibold sm:inline">
              {t('cart')}
            </span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard