

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


import { useEffect, useRef, useState } from 'react'
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

  // ============================================================
  // 3D IMAGE SETUP
  // ============================================================

  const cardRef = useRef(null)

  const animationFrameRef = useRef(null)
  const lastTimeRef = useRef(0)

  const rotationRef = useRef({
    x: -2,
    y: 0,
  })

  const [rotation, setRotation] = useState({
    x: -2,
    y: 0,
  })

  const [isHovered, setIsHovered] = useState(false)

  // ============================================================
  // PREPARE 4 PRODUCT IMAGES
  // ============================================================

  const productImages = [
    ...(Array.isArray(images) ? images : []),
  ].filter(Boolean)

  // Fallback to the existing image if images[] is empty.
  if (
    productImages.length === 0 &&
    image
  ) {
    productImages.push(image)
  }

  // Maximum 4 images for the 3D viewer.
  const fourImages =
    productImages.slice(0, 4)

  // ============================================================
  // CONTINUOUS 3D AUTO ROTATION
  // ============================================================

  useEffect(() => {
    const animate = (time) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time
      }

      const delta =
        time - lastTimeRef.current

      lastTimeRef.current = time

      // --------------------------------------------------------
      // Only auto rotate when mouse is NOT over the card.
      // --------------------------------------------------------

      if (!isHovered) {
        rotationRef.current.y +=
          delta * 0.025

        rotationRef.current.x =
          -4 +
          Math.sin(time * 0.0012) * 3

        setRotation({
          x: rotationRef.current.x,
          y: rotationRef.current.y,
        })
      }

      animationFrameRef.current =
        requestAnimationFrame(animate)
    }

    animationFrameRef.current =
      requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(
          animationFrameRef.current
        )
      }

      lastTimeRef.current = 0
    }
  }, [isHovered])

  // ============================================================
  // MOUSE MOVE → INTERACTIVE 3D
  // ============================================================

  const handleMouseMove = (event) => {
    if (!cardRef.current) {
      return
    }

    const rect =
      cardRef.current.getBoundingClientRect()

    const mouseX =
      event.clientX -
      rect.left

    const mouseY =
      event.clientY -
      rect.top

    const centerX =
      rect.width / 2

    const centerY =
      rect.height / 2

    const percentX =
      (mouseX - centerX) /
      centerX

    const percentY =
      (mouseY - centerY) /
      centerY

    // --------------------------------------------------------
    // Horizontal rotation
    // --------------------------------------------------------

    const rotateY =
      percentX * 32

    // --------------------------------------------------------
    // Vertical rotation
    // --------------------------------------------------------

    const rotateX =
      percentY * -24

    rotationRef.current = {
      x: rotateX,
      y: rotateY,
    }

    setRotation({
      x: rotateX,
      y: rotateY,
    })
  }

  // ============================================================
  // MOUSE ENTER
  // ============================================================

  const handleMouseEnter = () => {
    setIsHovered(true)

    // Start from current position.
    lastTimeRef.current = 0
  }

  // ============================================================
  // MOUSE LEAVE
  // ============================================================

  const handleMouseLeave = () => {
    setIsHovered(false)

    // Return gently toward the default angle.
    rotationRef.current = {
      x: -4,
      y: rotationRef.current.y,
    }

    setRotation({
      x: -4,
      y: rotationRef.current.y,
    })
  }

  // ============================================================
  // ADD TO CART
  // ============================================================

  const handleAddToCart = () => {
    addToCart(product)
  }

  // ============================================================
  // 3D TRANSFORM
  // ============================================================

  const productTransform = {
    transform: `
      perspective(1100px)
      rotateX(${rotation.x}deg)
      rotateY(${rotation.y}deg)
      translateZ(18px)
    `,
  }

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl"
    >
      {/* =====================================================
          PRODUCT IMAGE
      ====================================================== */}

      <Link
        to={`/products/${id}`}
        className="block"
      >
        <div
          ref={cardRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50"
          style={{
            perspective: '1100px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          {/* =================================================
              3D STAGE
          ================================================== */}

          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              perspective: '1100px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* =================================================
                3D PRODUCT OBJECT
            ================================================== */}

            <div
              className="relative h-[88%] w-[88%]"
              style={{
                ...productTransform,
                transformStyle:
                  'preserve-3d',
                transition: isHovered
                  ? 'transform 80ms linear'
                  : 'none',
                willChange: 'transform',
              }}
            >
              {/* =================================================
                  FRONT
              ================================================== */}

              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform:
                    'translateZ(22px)',
                  backfaceVisibility:
                    'hidden',
                }}
              >
                {fourImages[0] && (
                  <img
                    src={fourImages[0]}
                    alt={name}
                    className="h-full w-full object-contain object-center drop-shadow-[0_22px_22px_rgba(0,0,0,0.16)]"
                    draggable="false"
                  />
                )}
              </div>

              {/* =================================================
                  RIGHT SIDE
              ================================================== */}

              {fourImages[1] && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform:
                      'rotateY(90deg) translateZ(22px)',
                    transformOrigin:
                      'center center',
                    backfaceVisibility:
                      'hidden',
                  }}
                >
                  <img
                    src={fourImages[1]}
                    alt={`${name} view 2`}
                    className="h-full w-full object-contain object-center drop-shadow-[0_22px_22px_rgba(0,0,0,0.14)]"
                    draggable="false"
                  />
                </div>
              )}

              {/* =================================================
                  BACK / THIRD IMAGE
              ================================================== */}

              {fourImages[2] && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform:
                      'rotateY(180deg) translateZ(22px)',
                    transformOrigin:
                      'center center',
                    backfaceVisibility:
                      'hidden',
                  }}
                >
                  <img
                    src={fourImages[2]}
                    alt={`${name} view 3`}
                    className="h-full w-full object-contain object-center drop-shadow-[0_22px_22px_rgba(0,0,0,0.14)]"
                    draggable="false"
                  />
                </div>
              )}

              {/* =================================================
                  LEFT SIDE / FOURTH IMAGE
              ================================================== */}

              {fourImages[3] && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform:
                      'rotateY(-90deg) translateZ(22px)',
                    transformOrigin:
                      'center center',
                    backfaceVisibility:
                      'hidden',
                  }}
                >
                  <img
                    src={fourImages[3]}
                    alt={`${name} view 4`}
                    className="h-full w-full object-contain object-center drop-shadow-[0_22px_22px_rgba(0,0,0,0.14)]"
                    draggable="false"
                  />
                </div>
              )}

              {/* =================================================
                  TOP DEPTH
              ================================================== */}

              <div
                className="pointer-events-none absolute inset-0 rounded-xl border border-white/10"
                style={{
                  transform:
                    'translateZ(24px)',
                  backfaceVisibility:
                    'hidden',
                }}
              />
            </div>
          </div>

          {/* =================================================
              3D FLOOR SHADOW
          ================================================== */}

          <div
            className="pointer-events-none absolute bottom-[7%] left-1/2 h-7 w-[55%] -translate-x-1/2 rounded-[50%] bg-black/15 blur-xl"
            style={{
              transform: isHovered
                ? 'translateX(-50%) scale(0.85)'
                : 'translateX(-50%) scale(1)',
              transition:
                'transform 300ms ease, opacity 300ms ease',
              opacity:
                isHovered ? 0.45 : 0.7,
            }}
          />

          {/* =================================================
              SOFT BOTTOM GRADIENT
          ================================================== */}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* =================================================
              FAVORITE
          ================================================== */}

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

          {/* =================================================
              AVAILABILITY
          ================================================== */}

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