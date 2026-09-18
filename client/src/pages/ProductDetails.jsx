

// import { useState } from 'react'
// import { useParams, Link, useNavigate } from 'react-router-dom'

// import products from '../data/products'

// import {
//   ArrowLeft,
//   Check,
//   CheckCircle2,
//   Heart,
//   Minus,
//   Plus,
//   RotateCcw,
//   ShieldCheck,
//   ShoppingCart,
//   Star,
//   Truck,
// } from 'lucide-react'

// import ProductGallery from '../components/ProductGallery'
// import Button from '../components/Button'
// import { useCart } from '../context/CartContext'
// import { useLanguage } from '../context/LanguageContext'

// function ProductDetails() {
//   const { id } = useParams()
//   const navigate = useNavigate()

//   const { t } = useLanguage()
//   const { addToCart } = useCart()

//   const product = products.find((item) => item.id === id)

//   const [quantity, setQuantity] = useState(1)
//   const [isFavorite, setIsFavorite] = useState(false)
//   const [addedToCart, setAddedToCart] = useState(false)

//   // =========================================================
//   // PRODUCT NOT FOUND
//   // =========================================================

//   if (!product) {
//     return (
//       <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-xl text-center">
//           <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
//             <ShoppingCart className="h-7 w-7 text-gray-400" />
//           </div>

//           <h1 className="mt-5 text-2xl font-bold text-gray-900">
//             {t('productNotFound')}
//           </h1>

//           <p className="mt-2 text-sm text-gray-500">
//             {t('productNotFoundDescription')}
//           </p>

//           <div className="mt-6">
//             <Link to="/products">
//               <Button>{t('backToProducts')}</Button>
//             </Link>
//           </div>
//         </div>
//       </section>
//     )
//   }

//   // =========================================================
//   // QUANTITY
//   // =========================================================

//   const increaseQuantity = () => {
//     if (quantity < product.stock) {
//       setQuantity((current) => current + 1)
//     }
//   }

//   const decreaseQuantity = () => {
//     setQuantity((current) => Math.max(1, current - 1))
//   }

//   // =========================================================
//   // ADD TO CART
//   // =========================================================

//   const handleAddToCart = () => {
//     addToCart(product, quantity)

//     setAddedToCart(true)

//     setTimeout(() => {
//       setAddedToCart(false)
//     }, 2500)
//   }

//   // =========================================================
//   // BUY NOW
//   // =========================================================

//   const handleBuyNow = () => {
//     addToCart(product, quantity)
//     navigate('/checkout')
//   }

//   // =========================================================
//   // RENDER
//   // =========================================================

//   return (
//     <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
//       {/* =====================================================
//           BACK
//       ===================================================== */}

//       <div className="mb-8">
//         <Link
//           to="/products"
//           className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           {t('backToProducts')}
//         </Link>
//       </div>

//       {/* =====================================================
//           MAIN PRODUCT AREA
//       ===================================================== */}

//       <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
//         {/* ===================================================
//             GALLERY
//         =================================================== */}

//         <div>
//           <ProductGallery
//             images={product.images}
//             productName={product.name}
//           />
//         </div>

//         {/* ===================================================
//             PRODUCT INFORMATION
//         =================================================== */}

//         <div>
//           {/* =================================================
//               SELLER
//           ================================================= */}

//           <div className="flex items-center justify-between gap-4">
//             <div>
//               <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
//                 {t('soldBy')}
//               </p>

//               <p className="mt-1 font-medium text-gray-900">
//                 {product.seller}
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={() => setIsFavorite((current) => !current)}
//               className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition ${
//                 isFavorite
//                   ? 'border-red-200 bg-red-50 text-red-500'
//                   : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-red-500'
//               }`}
//               aria-label={t('addToFavorites')}
//             >
//               <Heart
//                 className={`h-5 w-5 ${
//                   isFavorite ? 'fill-current' : ''
//                 }`}
//               />
//             </button>
//           </div>

//           {/* =================================================
//               NAME
//           ================================================= */}

//           <h1 className="mt-5 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
//             {product.name}
//           </h1>

//           {/* =================================================
//               RATING
//           ================================================= */}

//           <div className="mt-4 flex flex-wrap items-center gap-3">
//             <div className="flex items-center gap-1">
//               <Star className="h-5 w-5 fill-current text-yellow-500" />

//               <span className="font-semibold text-gray-900">
//                 {product.rating.toFixed(1)}
//               </span>
//             </div>

//             <span className="text-sm text-gray-400">
//               ({product.reviewCount} {t('reviews')})
//             </span>

//             <span className="h-1 w-1 rounded-full bg-gray-300" />

//             <span className="text-sm text-gray-500">
//               {t('sellerRating')}:{' '}
//               {product.sellerRating.toFixed(1)}
//             </span>
//           </div>

//           {/* =================================================
//               PRICE
//           ================================================= */}

//           <div className="mt-6 border-y border-gray-100 py-6">
//             <p className="text-3xl font-bold text-gray-900">
//               €{product.price.toFixed(2)}
//             </p>

//             <div className="mt-3 flex items-center gap-2 text-sm">
//               {product.available ? (
//                 <>
//                   <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
//                     <Check className="h-3.5 w-3.5 text-green-600" />
//                   </span>

//                   <span className="font-medium text-green-600">
//                     {t('inStock')}
//                   </span>

//                   <span className="text-gray-400">
//                     ({product.stock} {t('available')})
//                   </span>
//                 </>
//               ) : (
//                 <span className="font-medium text-red-600">
//                   {t('outOfStock')}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* =================================================
//               DESCRIPTION
//           ================================================= */}

//           <div className="mt-6">
//             <h2 className="text-base font-semibold text-gray-900">
//               {t('description')}
//             </h2>

//             <p className="mt-2 text-sm leading-7 text-gray-600">
//               {product.description}
//             </p>
//           </div>

//           {/* =================================================
//               QUANTITY
//           ================================================= */}

//           {product.available && (
//             <div className="mt-7">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm font-semibold text-gray-900">
//                   {t('quantity')}
//                 </span>

//                 <span className="text-xs text-gray-400">
//                   {product.stock} {t('available')}
//                 </span>
//               </div>

//               <div className="mt-3 flex h-12 w-fit items-center rounded-xl border border-gray-200">
//                 <button
//                   type="button"
//                   onClick={decreaseQuantity}
//                   disabled={quantity <= 1}
//                   className="flex h-full w-12 items-center justify-center text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
//                   aria-label={t('decreaseQuantity')}
//                 >
//                   <Minus className="h-4 w-4" />
//                 </button>

//                 <span className="flex h-full min-w-14 items-center justify-center border-x border-gray-200 px-4 text-sm font-semibold text-gray-900">
//                   {quantity}
//                 </span>

//                 <button
//                   type="button"
//                   onClick={increaseQuantity}
//                   disabled={quantity >= product.stock}
//                   className="flex h-full w-12 items-center justify-center text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
//                   aria-label={t('increaseQuantity')}
//                 >
//                   <Plus className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* =================================================
//               ACTIONS
//           ================================================= */}

//           <div className="mt-7 grid gap-3 sm:grid-cols-2">
//             {/* ADD TO CART */}

//             <Button
//               size="lg"
//               disabled={!product.available}
//               onClick={handleAddToCart}
//               className={`w-full transition ${
//                 addedToCart
//                   ? 'bg-green-600 hover:bg-green-600'
//                   : ''
//               }`}
//             >
//               {addedToCart ? (
//                 <>
//                   <CheckCircle2 className="mr-2 h-5 w-5" />
//                   {t('addedToCart')}
//                 </>
//               ) : (
//                 <>
//                   <ShoppingCart className="mr-2 h-5 w-5" />
//                   {t('addToCart')}
//                 </>
//               )}
//             </Button>

//             {/* BUY NOW */}

//             <Button
//               size="lg"
//               variant="outline"
//               disabled={!product.available}
//               onClick={handleBuyNow}
//               className="w-full"
//             >
//               {t('buyNow')}
//             </Button>
//           </div>

//           {/* =================================================
//               ADDED TO CART CONFIRMATION
//           ================================================= */}

//           {addedToCart && (
//             <div className="mt-3 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
//               <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100">
//                 <Check className="h-4 w-4 text-green-600" />
//               </div>

//               <span>{t('addedToCart')}</span>

//               <Link
//                 to="/cart"
//                 className="ml-auto font-semibold text-green-700 underline underline-offset-2 transition hover:text-green-900"
//               >
//                 {t('viewCart')}
//               </Link>
//             </div>
//           )}

//           {/* =================================================
//               PRODUCT BENEFITS
//           ================================================= */}

//           <div className="mt-8 divide-y divide-gray-100 rounded-2xl border border-gray-200">
//             {/* SHIPPING */}

//             <div className="flex gap-4 p-4">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
//                 <Truck className="h-5 w-5 text-gray-700" />
//               </div>

//               <div>
//                 <h3 className="text-sm font-semibold text-gray-900">
//                   {t('shippingInformation')}
//                 </h3>

//                 <p className="mt-1 text-xs leading-5 text-gray-500">
//                   {t('shippingInformationDescription')}
//                 </p>
//               </div>
//             </div>

//             {/* RETURNS */}

//             <div className="flex gap-4 p-4">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
//                 <RotateCcw className="h-5 w-5 text-gray-700" />
//               </div>

//               <div>
//                 <h3 className="text-sm font-semibold text-gray-900">
//                   {t('returnInformation')}
//                 </h3>

//                 <p className="mt-1 text-xs leading-5 text-gray-500">
//                   {t('returnInformationDescription')}
//                 </p>
//               </div>
//             </div>

//             {/* SECURE PURCHASE */}

//             <div className="flex gap-4 p-4">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
//                 <ShieldCheck className="h-5 w-5 text-gray-700" />
//               </div>

//               <div>
//                 <h3 className="text-sm font-semibold text-gray-900">
//                   {t('securePurchase')}
//                 </h3>

//                 <p className="mt-1 text-xs leading-5 text-gray-500">
//                   {t('securePurchaseDescription')}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default ProductDetails

import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react'

import ProductGallery from '../components/ProductGallery'
import Button from '../components/Button'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'

const API_URL = 'https://fegegta-server.onrender.com/api'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { t } = useLanguage()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  // =========================================================
  // FETCH PRODUCT FROM BACKEND
  // =========================================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(`${API_URL}/products/${id}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load product.')
        }

        const backendProduct = data.product || data

        if (!backendProduct) {
          throw new Error('Product not found.')
        }

        // -----------------------------------------------------
        // BACKEND IMAGES -> FRONTEND IMAGE ARRAY
        // -----------------------------------------------------

        const images = Array.isArray(backendProduct.images)
          ? backendProduct.images
              .map((image) => {
                if (typeof image === 'string') return image
                return image?.url || ''
              })
              .filter(Boolean)
          : []

        // -----------------------------------------------------
        // SELLER NAME
        // -----------------------------------------------------

        const sellerName =
          backendProduct.seller?.businessName ||
          backendProduct.seller?.name ||
          'Fegegta Seller'

        // -----------------------------------------------------
        // FORMAT PRODUCT FOR EXISTING FRONTEND
        // -----------------------------------------------------

        const formattedProduct = {
          id: backendProduct._id || backendProduct.id,

          name: backendProduct.name || '',

          description: backendProduct.description || '',

          price: Number(backendProduct.price) || 0,

          seller: sellerName,

          sellerRating: Number(
            backendProduct.seller?.rating ||
              backendProduct.rating ||
              0
          ),

          rating: Number(backendProduct.rating) || 0,

          reviewCount: Number(
            backendProduct.totalReviews ||
              backendProduct.reviewCount ||
              0
          ),

          available:
            backendProduct.approvalStatus === 'approved' &&
            backendProduct.isActive !== false &&
            Number(backendProduct.stock || 0) > 0,

          stock: Number(backendProduct.stock) || 0,

          category: backendProduct.category || '',

          image: images[0] || '',

          images,

          // Keep useful backend data for future features
          sku: backendProduct.sku || '',
          slug: backendProduct.slug || '',
          sizes: backendProduct.sizes || [],
          colors: backendProduct.colors || [],
          tags: backendProduct.tags || [],
          compareAtPrice:
            Number(backendProduct.compareAtPrice) || 0,

          store: backendProduct.store || null,
          sellerData: backendProduct.seller || null,
        }

        setProduct(formattedProduct)

        // Make sure quantity starts correctly
        setQuantity(1)
      } catch (err) {
        console.error('Failed to fetch product:', err)

        setError(
          err.message ||
            'Unable to load this product. Please try again.'
        )

        setProduct(null)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  // =========================================================
  // LOADING
  // =========================================================

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

            <p className="mt-4 text-sm text-gray-500">
              Loading product...
            </p>
          </div>
        </div>
      </section>
    )
  }

  // =========================================================
  // PRODUCT NOT FOUND / ERROR
  // =========================================================

  if (!product) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <ShoppingCart className="h-7 w-7 text-gray-400" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            {t('productNotFound')}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {error || t('productNotFoundDescription')}
          </p>

          <div className="mt-6">
            <Link to="/products">
              <Button>{t('backToProducts')}</Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  // =========================================================
  // QUANTITY
  // =========================================================

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((current) => current + 1)
    }
  }

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1))
  }

  // =========================================================
  // ADD TO CART
  // =========================================================

  const handleAddToCart = () => {
    addToCart(product, quantity)

    setAddedToCart(true)

    setTimeout(() => {
      setAddedToCart(false)
    }, 2500)
  }

  // =========================================================
  // BUY NOW
  // =========================================================

  const handleBuyNow = () => {
    addToCart(product, quantity)
    navigate('/checkout')
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {/* =====================================================
          BACK
      ===================================================== */}

      <div className="mb-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backToProducts')}
        </Link>
      </div>

      {/* =====================================================
          MAIN PRODUCT AREA
      ===================================================== */}

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* ===================================================
            GALLERY
        =================================================== */}

        <div>
          <ProductGallery
            images={product.images}
            productName={product.name}
          />
        </div>

        {/* ===================================================
            PRODUCT INFORMATION
        =================================================== */}

        <div>
          {/* =================================================
              SELLER
          ================================================= */}

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                {t('soldBy')}
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {product.seller}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setIsFavorite((current) => !current)
              }
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition ${
                isFavorite
                  ? 'border-red-200 bg-red-50 text-red-500'
                  : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-red-500'
              }`}
              aria-label={t('addToFavorites')}
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? 'fill-current' : ''
                }`}
              />
            </button>
          </div>

          {/* =================================================
              NAME
          ================================================= */}

          <h1 className="mt-5 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>

          {/* =================================================
              RATING
          ================================================= */}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-current text-yellow-500" />

              <span className="font-semibold text-gray-900">
                {product.rating.toFixed(1)}
              </span>
            </div>

            <span className="text-sm text-gray-400">
              ({product.reviewCount} {t('reviews')})
            </span>

            <span className="h-1 w-1 rounded-full bg-gray-300" />

            <span className="text-sm text-gray-500">
              {t('sellerRating')}:{' '}
              {product.sellerRating.toFixed(1)}
            </span>
          </div>

          {/* =================================================
              PRICE
          ================================================= */}

          <div className="mt-6 border-y border-gray-100 py-6">
            <p className="text-3xl font-bold text-gray-900">
              €{product.price.toFixed(2)}
            </p>

            <div className="mt-3 flex items-center gap-2 text-sm">
              {product.available ? (
                <>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-3.5 w-3.5 text-green-600" />
                  </span>

                  <span className="font-medium text-green-600">
                    {t('inStock')}
                  </span>

                  <span className="text-gray-400">
                    ({product.stock} {t('available')})
                  </span>
                </>
              ) : (
                <span className="font-medium text-red-600">
                  {t('outOfStock')}
                </span>
              )}
            </div>
          </div>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <div className="mt-6">
            <h2 className="text-base font-semibold text-gray-900">
              {t('description')}
            </h2>

            <p className="mt-2 text-sm leading-7 text-gray-600">
              {product.description}
            </p>
          </div>

          {/* =================================================
              QUANTITY
          ================================================= */}

          {product.available && (
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  {t('quantity')}
                </span>

                <span className="text-xs text-gray-400">
                  {product.stock} {t('available')}
                </span>
              </div>

              <div className="mt-3 flex h-12 w-fit items-center rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="flex h-full w-12 items-center justify-center text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label={t('decreaseQuantity')}
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span className="flex h-full min-w-14 items-center justify-center border-x border-gray-200 px-4 text-sm font-semibold text-gray-900">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                  className="flex h-full w-12 items-center justify-center text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label={t('increaseQuantity')}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {/* ADD TO CART */}

            <Button
              size="lg"
              disabled={!product.available}
              onClick={handleAddToCart}
              className={`w-full transition ${
                addedToCart
                  ? 'bg-green-600 hover:bg-green-600'
                  : ''
              }`}
            >
              {addedToCart ? (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  {t('addedToCart')}
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {t('addToCart')}
                </>
              )}
            </Button>

            {/* BUY NOW */}

            <Button
              size="lg"
              variant="outline"
              disabled={!product.available}
              onClick={handleBuyNow}
              className="w-full"
            >
              {t('buyNow')}
            </Button>
          </div>

          {/* =================================================
              ADDED TO CART CONFIRMATION
          ================================================= */}

          {addedToCart && (
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100">
                <Check className="h-4 w-4 text-green-600" />
              </div>

              <span>{t('addedToCart')}</span>

              <Link
                to="/cart"
                className="ml-auto font-semibold text-green-700 underline underline-offset-2 transition hover:text-green-900"
              >
                {t('viewCart')}
              </Link>
            </div>
          )}

          {/* =================================================
              PRODUCT BENEFITS
          ================================================= */}

          <div className="mt-8 divide-y divide-gray-100 rounded-2xl border border-gray-200">
            {/* SHIPPING */}

            <div className="flex gap-4 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                <Truck className="h-5 w-5 text-gray-700" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {t('shippingInformation')}
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {t('shippingInformationDescription')}
                </p>
              </div>
            </div>

            {/* RETURNS */}

            <div className="flex gap-4 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                <RotateCcw className="h-5 w-5 text-gray-700" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {t('returnInformation')}
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {t('returnInformationDescription')}
                </p>
              </div>
            </div>

            {/* SECURE PURCHASE */}

            <div className="flex gap-4 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                <ShieldCheck className="h-5 w-5 text-gray-700" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {t('securePurchase')}
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {t('securePurchaseDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails