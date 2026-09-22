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
//     <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">
//       {/* Product Image */}
//       <Link to={`/products/${id}`} className="block">
//         <div className="relative aspect-square overflow-hidden bg-gray-100">
//           <img
//             src={image}
//             alt={name}
//             className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//           />

//           {/* Favorite */}
//           <button
//             type="button"
//             onClick={(e) => {
//               e.preventDefault()
//               e.stopPropagation()
//             }}
//             className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-600 shadow-sm backdrop-blur transition hover:bg-white hover:text-red-500"
//             aria-label="Add to favorites"
//           >
//             <Heart className="h-5 w-5" />
//           </button>

//           {/* Availability */}
//           {!available && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black/40">
//               <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900">
//                 {t('noResults')}
//               </span>
//             </div>
//           )}
//         </div>
//       </Link>

//       {/* Product Information */}
//       <div className="p-4 sm:p-5">
//         {/* Seller */}
//         <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
//           {seller}
//         </p>

//         {/* Name */}
//         <Link to={`/products/${id}`}>
//           <h2 className="mt-1 line-clamp-2 min-h-[48px] text-base font-semibold text-gray-900 transition hover:text-gray-600 sm:text-lg">
//             {name}
//           </h2>
//         </Link>

//         {/* Description */}
//         <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-500">
//           {description}
//         </p>

//         {/* Rating */}
//         <div className="mt-3 flex items-center gap-2">
//           <div className="flex items-center gap-0.5">
//             <Star className="h-4 w-4 fill-current text-yellow-500" />

//             <span className="text-sm font-medium text-gray-800">
//               {Number(rating).toFixed(1)}
//             </span>
//           </div>

//           <span className="text-xs text-gray-400">
//             ({reviewCount})
//           </span>
//         </div>

//         {/* Price + Cart */}
//         <div className="mt-4 flex items-center justify-between gap-3">
//           <div>
//             <p className="text-lg font-bold text-gray-900 sm:text-xl">
//               €{Number(price).toFixed(2)}
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={handleAddToCart}
//             disabled={!available}
//             className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
//             aria-label={t('cart')}
//           >
//             <ShoppingCart className="h-5 w-5" />
//           </button>
//         </div>
//       </div>
//     </article>
//   )
// }

// export default ProductCard

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
//     <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">
//       {/* Product Image */}
//       <Link to={`/products/${id}`} className="block">
//         <div className="relative aspect-[0.95] overflow-hidden bg-gray-100">
//           <img
//             src={image}
//             alt={name}
//             className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//           />

//           {/* Favorite */}
//           <button
//             type="button"
//             onClick={(e) => {
//               e.preventDefault()
//               e.stopPropagation()
//             }}
//             className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-600 shadow-sm backdrop-blur transition hover:bg-white hover:text-red-500"
//             aria-label="Add to favorites"
//           >
//             <Heart className="h-4.5 w-4.5" />
//           </button>

//           {/* Availability */}
//           {!available && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black/40">
//               <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900">
//                 {t('noResults')}
//               </span>
//             </div>
//           )}
//         </div>
//       </Link>

//       {/* Product Information */}
//       <div className="p-3 sm:p-3.5">
//         {/* Seller */}
//         <p className="truncate text-[10px] font-medium uppercase tracking-wide text-gray-400 sm:text-xs">
//           {seller}
//         </p>

//         {/* Name */}
//         <Link to={`/products/${id}`}>
//           <h2 className="mt-0.5 line-clamp-1 text-sm font-semibold leading-5 text-gray-900 transition hover:text-gray-600 sm:text-base">
//             {name}
//           </h2>
//         </Link>

//         {/* Description */}
//         <p className="mt-1 line-clamp-1 text-xs leading-4 text-gray-500">
//           {description}
//         </p>

//         {/* Rating */}
//         <div className="mt-2 flex items-center gap-1.5">
//           <div className="flex items-center gap-0.5">
//             <Star className="h-3.5 w-3.5 fill-current text-yellow-500" />

//             <span className="text-xs font-medium text-gray-800">
//               {Number(rating).toFixed(1)}
//             </span>
//           </div>

//           <span className="text-[10px] text-gray-400">
//             ({reviewCount})
//           </span>
//         </div>

//         {/* Price + Cart */}
//         <div className="mt-2.5 flex items-center justify-between gap-2">
//           <div>
//             <p className="text-base font-bold leading-none text-gray-900 sm:text-lg">
//               €{Number(price).toFixed(2)}
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={handleAddToCart}
//             disabled={!available}
//             className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
//             aria-label={t('cart')}
//           >
//             <ShoppingCart className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     </article>
//   )
// }

// export default ProductCard


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
//     <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">
//       {/* Product Image */}
//       <Link to={`/products/${id}`} className="block">
//         <div className="relative aspect-[0.90] overflow-hidden bg-gray-100">
//           <img
//             src={image}
//             alt={name}
//             className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
//           />

//           {/* Favorite */}
//           <button
//             type="button"
//             onClick={(e) => {
//               e.preventDefault()
//               e.stopPropagation()
//             }}
//             className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-600 shadow-sm backdrop-blur transition hover:bg-white hover:text-red-500"
//             aria-label="Add to favorites"
//           >
//             <Heart className="h-4.5 w-4.5" />
//           </button>

//           {/* Availability */}
//           {!available && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black/40">
//               <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900">
//                 {t('noResults')}
//               </span>
//             </div>
//           )}
//         </div>
//       </Link>

//       {/* Product Information */}
//       <div className="p-3 sm:p-3.5">
//         {/* Seller */}
//         <p className="truncate text-[10px] font-medium uppercase tracking-wide text-gray-400 sm:text-xs">
//           {seller}
//         </p>

//         {/* Name */}
//         <Link to={`/products/${id}`}>
//           <h2 className="mt-0.5 line-clamp-1 text-sm font-semibold leading-5 text-gray-900 transition hover:text-gray-600 sm:text-base">
//             {name}
//           </h2>
//         </Link>

//         {/* Description */}
//         <p className="mt-1 line-clamp-1 text-xs leading-4 text-gray-500">
//           {description}
//         </p>

//         {/* Rating */}
//         <div className="mt-2 flex items-center gap-1.5">
//           <div className="flex items-center gap-0.5">
//             <Star className="h-3.5 w-3.5 fill-current text-yellow-500" />

//             <span className="text-xs font-medium text-gray-800">
//               {Number(rating).toFixed(1)}
//             </span>
//           </div>

//           <span className="text-[10px] text-gray-400">
//             ({reviewCount})
//           </span>
//         </div>

//         {/* Price + Cart */}
//         <div className="mt-2.5 flex items-center justify-between gap-2">
//           <div>
//             <p className="text-base font-bold leading-none text-gray-900 sm:text-lg">
//               €{Number(price).toFixed(2)}
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={handleAddToCart}
//             disabled={!available}
//             className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
//             aria-label={t('cart')}
//           >
//             <ShoppingCart className="h-4 w-4" />
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
    <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Product Image */}
      <Link to={`/products/${id}`} className="block">
        <div className="relative w-full overflow-hidden bg-gray-100">
          <div className="relative flex aspect-square w-full">
            <img
              src={image}
              alt={name}
              className="absolute inset-0 h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]"
            />
          </div>

          {/* Favorite */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-600 shadow-sm backdrop-blur transition hover:bg-white hover:text-red-500"
            aria-label="Add to favorites"
          >
            <Heart className="h-4.5 w-4.5" />
          </button>

          {/* Availability */}
          {!available && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900">
                {t('noResults')}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-3 sm:p-3.5">
        {/* Seller */}
        <p className="truncate text-[10px] font-medium uppercase tracking-wide text-gray-400 sm:text-xs">
          {seller}
        </p>

        {/* Name */}
        <Link to={`/products/${id}`}>
          <h2 className="mt-0.5 line-clamp-1 text-sm font-semibold leading-5 text-gray-900 transition hover:text-gray-600 sm:text-base">
            {name}
          </h2>
        </Link>

        {/* Description */}
        <p className="mt-1 line-clamp-1 text-xs leading-4 text-gray-500">
          {description}
        </p>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            <Star className="h-3.5 w-3.5 fill-current text-yellow-500" />

            <span className="text-xs font-medium text-gray-800">
              {Number(rating).toFixed(1)}
            </span>
          </div>

          <span className="text-[10px] text-gray-400">
            ({reviewCount})
          </span>
        </div>

        {/* Price + Cart */}
        <div className="mt-2.5 flex items-center justify-between gap-2">
          <div>
            <p className="text-base font-bold leading-none text-gray-900 sm:text-lg">
              €{Number(price).toFixed(2)}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!available}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
            aria-label={t('cart')}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
