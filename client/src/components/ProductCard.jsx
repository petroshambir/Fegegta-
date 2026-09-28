

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

function ProductCard({ product }) {
  const { t } = useLanguage()
  const { addToCart } = useCart()

  const {
    id,
    name,
    description,
    price,
    image,
    images = [],
    seller,
    rating = 0,
    reviewCount = 0,
    available = true,
  } = product

  const handleAddToCart = () => {
    addToCart(product)
  }

  // ============================================================
  // GET PRODUCT IMAGES
  // ============================================================

  const getImageUrl = (item) => {
    if (!item) return ''

    if (typeof item === 'string') {
      return item
    }

    if (typeof item === 'object' && item.url) {
      return item.url
    }

    return ''
  }

  const productImages = [
    ...images.map(getImageUrl),
    getImageUrl(image),
  ].filter(Boolean)

  const uniqueImages = [...new Set(productImages)]

  const image1 = uniqueImages[0] || ''
  const image2 = uniqueImages[1] || image1
  const image3 = uniqueImages[2] || image1
  const image4 = uniqueImages[3] || image1

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl">

      {/* =====================================================
          PRODUCT IMAGE
      ====================================================== */}

      <Link to={`/products/${id}`} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">

          {/* =================================================
              STATIC 3D SCENE
          ================================================== */}

          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              perspective: '1600px',
              perspectiveOrigin: '50% 48%',
            }}
          >

            {/* =================================================
                3D PRODUCT
            ================================================== */}

            <div
              className="relative h-[78%] w-[78%]"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateX(-6deg) rotateY(-15deg)',
              }}
            >

              {/* =================================================
                  FLOOR / DROP SHADOW
              ================================================== */}

              <div
                className="absolute bottom-[-8%] left-[10%] h-[12%] w-[80%] rounded-full bg-black/20 blur-xl"
                style={{
                  transform: 'translateZ(-40px) rotateX(72deg)',
                }}
              />

              {/* =================================================
                  BACK IMAGE
              ================================================== */}

              <div
                className="absolute left-[8%] top-[8%] h-[84%] w-[84%] overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-[0_25px_55px_rgba(0,0,0,0.12)]"
                style={{
                  transform:
                    'translate3d(-18px, 8px, -42px) rotateY(-10deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <img
                  src={image4}
                  alt={`${name} view 4`}
                  className="h-full w-full object-contain object-center"
                  draggable="false"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10" />
              </div>

              {/* =================================================
                  LEFT SIDE IMAGE
              ================================================== */}

              <div
                className="absolute left-[-2%] top-[6%] h-[88%] w-[86%] overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-[0_25px_55px_rgba(0,0,0,0.15)]"
                style={{
                  transform:
                    'translate3d(-28px, 7px, 8px) rotateY(-13deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <img
                  src={image2}
                  alt={`${name} view 2`}
                  className="h-full w-full object-contain object-center"
                  draggable="false"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-white/20" />
              </div>

              {/* =================================================
                  RIGHT SIDE IMAGE
              ================================================== */}

              <div
                className="absolute right-[-2%] top-[6%] h-[88%] w-[86%] overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-[0_25px_55px_rgba(0,0,0,0.15)]"
                style={{
                  transform:
                    'translate3d(28px, 7px, 8px) rotateY(13deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <img
                  src={image3}
                  alt={`${name} view 3`}
                  className="h-full w-full object-contain object-center"
                  draggable="false"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/10 via-transparent to-white/20" />
              </div>

              {/* =================================================
                  FRONT / MAIN IMAGE
              ================================================== */}

              <div
                className="absolute inset-[3%] overflow-hidden rounded-[22px] border border-white bg-white shadow-[0_30px_65px_rgba(0,0,0,0.20)]"
                style={{
                  transform: 'translateZ(50px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <img
                  src={image1}
                  alt={name}
                  className="h-full w-full object-contain object-center"
                  draggable="false"
                />

                {/* Glass reflection */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/10" />

                {/* Top highlight */}
                <div className="pointer-events-none absolute left-[8%] right-[8%] top-[4%] h-[16%] rounded-full bg-white/30 blur-2xl" />
              </div>

              {/* =================================================
                  FRONT BOTTOM EDGE
              ================================================== */}

              <div
                className="absolute bottom-[1%] left-[15%] h-[10px] w-[70%] rounded-full bg-black/15 blur-md"
                style={{
                  transform: 'translateZ(30px) rotateX(75deg)',
                }}
              />

            </div>
          </div>

          {/* =====================================================
              SOFT LIGHT
          ====================================================== */}

          <div className="pointer-events-none absolute left-1/2 top-[8%] h-40 w-40 -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />

          {/* =====================================================
              BOTTOM SHADOW
          ====================================================== */}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/[0.08] via-transparent to-transparent" />

          {/* =====================================================
              FAVORITE
          ====================================================== */}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/80 bg-white/95 text-gray-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:text-red-500 hover:shadow-md"
            aria-label="Add to favorites"
          >
            <Heart className="h-4.5 w-4.5 transition-transform duration-300 hover:scale-110" />
          </button>

          {/* =====================================================
              AVAILABILITY
          ====================================================== */}

          {!available && (
            <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/45 backdrop-blur-[1px]">
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