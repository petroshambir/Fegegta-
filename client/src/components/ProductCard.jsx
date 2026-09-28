

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
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">

          {/* =================================================
              3D LIGHT
          ================================================== */}

          <div className="pointer-events-none absolute left-1/2 top-[8%] z-0 h-56 w-56 -translate-x-1/2 rounded-full bg-white blur-3xl" />

          {/* =================================================
              3D PRODUCT STAGE
          ================================================== */}

          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              perspective: '1800px',
              perspectiveOrigin: '50% 42%',
            }}
          >

            {/* =================================================
                PRODUCT OBJECT
            ================================================== */}

            <div
              className="relative h-[88%] w-[88%]"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateX(-4deg) rotateY(-7deg)',
              }}
            >

              {/* =================================================
                  DEEP FLOOR SHADOW
              ================================================== */}

              <div
                className="absolute bottom-[3%] left-[9%] h-[12%] w-[82%] rounded-full bg-black/25 blur-2xl"
                style={{
                  transform:
                    'translateZ(-100px) rotateX(75deg)',
                }}
              />

              {/* =================================================
                  SOFT PRODUCT SHADOW
              ================================================== */}

              <div
                className="absolute left-[6%] top-[5%] h-[90%] w-[88%] rounded-[28px] bg-black/15 blur-2xl"
                style={{
                  transform:
                    'translate3d(18px, 22px, -50px)',
                }}
              />

              {/* =================================================
                  3D BACK THICKNESS
              ================================================== */}

              <div
                className="absolute left-[5%] top-[4%] h-[92%] w-[90%] overflow-hidden rounded-[28px] bg-gray-300"
                style={{
                  transform:
                    'translate3d(12px, 18px, -28px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <img
                  src={image}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-contain object-top opacity-20"
                  draggable="false"
                />
              </div>

              {/* =================================================
                  3D LEFT EDGE
              ================================================== */}

              <div
                className="absolute left-[3%] top-[5%] h-[90%] w-[5px] rounded-l-[20px] bg-gradient-to-b from-gray-300 via-gray-200 to-gray-400"
                style={{
                  transform:
                    'translateZ(5px) translateX(-3px)',
                }}
              />

              {/* =================================================
                  3D RIGHT EDGE
              ================================================== */}

              <div
                className="absolute right-[3%] top-[5%] h-[90%] w-[7px] rounded-r-[20px] bg-gradient-to-b from-gray-200 via-gray-400 to-gray-300"
                style={{
                  transform:
                    'translateZ(5px) translateX(3px)',
                }}
              />

              {/* =================================================
                  MAIN 3D FACE
              ================================================== */}

              <div
                className="absolute inset-[3%] overflow-hidden rounded-[24px] border border-white/90 bg-white"
                style={{
                  transform: 'translateZ(55px)',
                  transformStyle: 'preserve-3d',
                  boxShadow:
                    '0 35px 70px rgba(0,0,0,0.20), 0 12px 28px rgba(0,0,0,0.10)',
                }}
              >

                {/* =================================================
                    PRODUCT IMAGE
                ================================================== */}

                <img
                  src={image}
                  alt={name}
                  className="absolute inset-0 h-full w-full object-contain object-top"
                  draggable="false"
                />

                {/* =================================================
                    3D LIGHTING
                ================================================== */}

                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.12) 24%, transparent 48%, rgba(0,0,0,0.10) 100%)',
                  }}
                />

                {/* =================================================
                    TOP REFLECTION
                ================================================== */}

                <div
                  className="pointer-events-none absolute left-[6%] top-[3%] h-[25%] w-[65%] rounded-full bg-white/35 blur-2xl"
                  style={{
                    transform: 'rotate(-14deg)',
                  }}
                />

                {/* =================================================
                    SIDE DARKNESS
                ================================================== */}

                <div
                  className="pointer-events-none absolute right-0 top-0 h-full w-[18%]"
                  style={{
                    background:
                      'linear-gradient(to left, rgba(0,0,0,0.12), transparent)',
                  }}
                />

                {/* =================================================
                    BOTTOM DEPTH
                ================================================== */}

                <div
                  className="pointer-events-none absolute bottom-0 left-0 h-[18%] w-full"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.10), transparent)',
                  }}
                />

                {/* =================================================
                    3D GLASS BORDER
                ================================================== */}

                <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/80" />

              </div>

              {/* =================================================
                  BOTTOM EXTRUSION
              ================================================== */}

              <div
                className="absolute bottom-[3%] left-[7%] h-[13px] w-[86%] rounded-b-[22px] bg-gradient-to-b from-gray-200 to-gray-400"
                style={{
                  transform:
                    'translateZ(18px) rotateX(72deg)',
                }}
              />

              {/* =================================================
                  FRONT FLOOR REFLECTION
              ================================================== */}

              <div
                className="absolute bottom-[1%] left-[18%] h-[6%] w-[64%] rounded-full bg-black/10 blur-lg"
                style={{
                  transform:
                    'translateZ(15px) rotateX(78deg)',
                }}
              />

            </div>
          </div>

          {/* =====================================================
              BOTTOM ATMOSPHERIC GRADIENT
          ====================================================== */}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-black/[0.08] via-transparent to-transparent" />

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