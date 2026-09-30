// import React, { useEffect, useMemo, useState } from 'react'
// import { Link, useParams } from 'react-router-dom'
// import {
//   CheckCircle2,
//   Heart,
//   Search,
//   Share2,
//   ShoppingCart,
//   Store,
// } from 'lucide-react'

// import {
//   getSellerStoreBySlug,
//   getApprovedProductsForStore,
// } from '../../services/sellerStorage'

// import { useCart } from '../../context/CartContext'

// function SellerStore() {
//   const { slug } = useParams()
//   const { addToCart } = useCart()

//   const [store, setStore] = useState(null)
//   const [products, setProducts] = useState([])

//   const [search, setSearch] = useState('')
//   const [sort, setSort] = useState('featured')

//   const [favorites, setFavorites] = useState([])

//   useEffect(() => {
//     const loadStore = () => {
//       const foundStore = getSellerStoreBySlug(slug)

//       if (!foundStore) {
//         setStore(null)
//         setProducts([])
//         return
//       }

//       setStore(foundStore)

//       const approvedProducts =
//         getApprovedProductsForStore(foundStore.id)

//       setProducts(approvedProducts)
//     }

//     loadStore()
//   }, [slug])

//   const visibleProducts = useMemo(() => {
//     const query = search.trim().toLowerCase()

//     let result = products.filter((product) => {
//       if (!query) return true

//       return (
//         product.name?.toLowerCase().includes(query) ||
//         product.category?.toLowerCase().includes(query) ||
//         product.subcategory?.toLowerCase().includes(query)
//       )
//     })

//     if (sort === 'price-low') {
//       result = [...result].sort(
//         (a, b) =>
//           Number(a.price || 0) -
//           Number(b.price || 0)
//       )
//     }

//     if (sort === 'price-high') {
//       result = [...result].sort(
//         (a, b) =>
//           Number(b.price || 0) -
//           Number(a.price || 0)
//       )
//     }

//     if (sort === 'newest') {
//       result = [...result].sort(
//         (a, b) =>
//           new Date(b.submittedAt || b.createdAt || 0) -
//           new Date(a.submittedAt || a.createdAt || 0)
//       )
//     }

//     return result
//   }, [products, search, sort])

//   const toggleFavorite = (productId) => {
//     setFavorites((previous) =>
//       previous.includes(productId)
//         ? previous.filter((id) => id !== productId)
//         : [...previous, productId]
//     )
//   }

//   const handleShare = async () => {
//     const url = window.location.href

//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: store?.storeName || 'Fegegta Store',
//           text: `Visit ${store?.storeName || 'this store'} on Fegegta.`,
//           url,
//         })
//       } catch (error) {
//         if (error?.name !== 'AbortError') {
//           console.error('Share failed:', error)
//         }
//       }

//       return
//     }

//     try {
//       await navigator.clipboard.writeText(url)
//       alert('Store link copied.')
//     } catch {
//       alert(url)
//     }
//   }

//   if (!store) {
//     return (
//       <div className="min-h-screen bg-gray-50 px-4 py-16">
//         <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
//           <Store className="mx-auto h-14 w-14 text-gray-400" />

//           <h1 className="mt-5 text-2xl font-bold text-gray-900">
//             Store Not Found
//           </h1>

//           <p className="mt-2 text-gray-500">
//             This store does not exist or is not publicly available.
//           </p>

//           <Link
//             to="/products"
//             className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
//           >
//             Browse Products
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* COVER */}
//       <section className="relative h-56 overflow-hidden bg-gray-900 sm:h-72">
//         {store.coverImage ? (
//           <img
//             src={store.coverImage}
//             alt={store.storeName}
//             className="h-full w-full object-cover"
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center">
//             <Store className="h-16 w-16 text-gray-600" />
//           </div>
//         )}

//         <div className="absolute inset-0 bg-black/40" />
//       </section>

//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* STORE HEADER */}
//         <section className="relative -mt-12 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
//           <div className="flex flex-col gap-5 md:flex-row md:items-center">
//             <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-gray-100 shadow-md">
//               {store.logo ? (
//                 <img
//                   src={store.logo}
//                   alt={store.storeName}
//                   className="h-full w-full object-cover"
//                 />
//               ) : (
//                 <Store className="h-10 w-10 text-gray-400" />
//               )}
//             </div>

//             <div className="min-w-0 flex-1">
//               <div className="flex flex-wrap items-center gap-2">
//                 <h1 className="text-2xl font-bold text-gray-900">
//                   {store.storeName}
//                 </h1>

//                 {store.verified === true && (
//                   <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
//                     <CheckCircle2 className="h-3.5 w-3.5" />
//                     Verified
//                   </span>
//                 )}
//               </div>

//               <p className="mt-2 text-sm text-gray-500">
//                 {store.storeDescription ||
//                   'Welcome to our store.'}
//               </p>

//               {store.storeCategory && (
//                 <p className="mt-2 text-xs font-medium text-gray-400">
//                   {store.storeCategory}
//                 </p>
//               )}
//             </div>

//             <button
//               type="button"
//               onClick={handleShare}
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800"
//             >
//               <Share2 className="h-4 w-4" />
//               Share Store
//             </button>
//           </div>
//         </section>

//         {/* PRODUCTS */}
//         <section className="py-8">
//           <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//             <div>
//               <h2 className="text-xl font-bold">
//                 Store Products
//               </h2>

//               <p className="mt-1 text-sm text-gray-500">
//                 {visibleProducts.length} approved products
//               </p>
//             </div>

//             <div className="flex flex-col gap-3 sm:flex-row">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

//                 <input
//                   value={search}
//                   onChange={(event) =>
//                     setSearch(event.target.value)
//                   }
//                   placeholder="Search products..."
//                   className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-black sm:w-64"
//                 />
//               </div>

//               <select
//                 value={sort}
//                 onChange={(event) =>
//                   setSort(event.target.value)
//                 }
//                 className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
//               >
//                 <option value="featured">
//                   Featured
//                 </option>

//                 <option value="newest">
//                   Newest
//                 </option>

//                 <option value="price-low">
//                   Price: Low to High
//                 </option>

//                 <option value="price-high">
//                   Price: High to Low
//                 </option>
//               </select>
//             </div>
//           </div>

//           {visibleProducts.length === 0 ? (
//             <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-12 text-center">
//               <Store className="mx-auto h-12 w-12 text-gray-400" />

//               <h3 className="mt-4 font-bold">
//                 No products found
//               </h3>

//               <p className="mt-1 text-sm text-gray-500">
//                 This store currently has no approved products matching your search.
//               </p>
//             </div>
//           ) : (
//             <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//               {visibleProducts.map((product) => {
//                 const isFavorite =
//                   favorites.includes(product.id)

//                 const productImages =
//                   Array.isArray(product.images)
//                     ? product.images
//                     : product.image
//                       ? [product.image]
//                       : []

//                 const mainImage =
//                   productImages[0] || ''

//                 return (
//                   <article
//                     key={product.id}
//                     className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//                   >
//                     {/* IMAGE */}
//                     <Link
//                       to={`/product/${product.id}`}
//                       className="block"
//                     >
//                       <div className="relative aspect-square bg-gray-100">
//                         {mainImage ? (
//                           <img
//                             src={mainImage}
//                             alt={product.name}
//                             className="h-full w-full object-cover"
//                           />
//                         ) : (
//                           <div className="flex h-full items-center justify-center text-gray-400">
//                             No Image
//                           </div>
//                         )}

//                         <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-gray-700 shadow-sm">
//                           {productImages.length}/4 images
//                         </div>

//                         <button
//                           type="button"
//                           onClick={(event) => {
//                             event.preventDefault()
//                             event.stopPropagation()
//                             toggleFavorite(product.id)
//                           }}
//                           className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm"
//                         >
//                           <Heart
//                             className={`h-4 w-4 ${
//                               isFavorite
//                                 ? 'fill-red-500 text-red-500'
//                                 : 'text-gray-700'
//                             }`}
//                           />
//                         </button>
//                       </div>
//                     </Link>

//                     {/* PRODUCT INFO */}
//                     <div className="p-4">
//                       <Link
//                         to={`/product/${product.id}`}
//                         className="block"
//                       >
//                         <h3 className="line-clamp-2 text-sm font-semibold hover:underline">
//                           {product.name}
//                         </h3>

//                         {product.category && (
//                           <p className="mt-1 text-xs text-gray-400">
//                             {product.category}
//                           </p>
//                         )}

//                         <p className="mt-2 font-bold">
//                           €{Number(product.price || 0).toFixed(2)}
//                         </p>

//                         {product.oldPrice &&
//                           Number(product.oldPrice) >
//                             Number(product.price) && (
//                             <p className="text-xs text-gray-400 line-through">
//                               €{Number(product.oldPrice).toFixed(2)}
//                             </p>
//                           )}
//                       </Link>

//                       <button
//                         type="button"
//                         onClick={() =>
//                           addToCart({
//                             ...product,
//                             sellerId: store.sellerId,
//                             storeId: store.id,
//                             storeSlug: store.slug,
//                             storeName: store.storeName,
//                           })
//                         }
//                         className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white hover:bg-gray-800"
//                       >
//                         <ShoppingCart className="h-4 w-4" />
//                         Add to Cart
//                       </button>
//                     </div>
//                   </article>
//                 )
//               })}
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   )
// }

// export default SellerStore


// import React, { useEffect, useMemo, useState } from 'react'
// import { Link, useParams } from 'react-router-dom'
// import {
//   CheckCircle2,
//   Heart,
//   Search,
//   Share2,
//   ShoppingCart,
//   Store,
//   Loader2,
//   AlertCircle,
// } from 'lucide-react'

// import { useCart } from '../../context/CartContext'

// // ============================================================
// // API
// // ============================================================

// const API_URL =
//   'https://fegegta-server.onrender.com/api'

// // ============================================================
// // HELPERS
// // ============================================================

// const getId = (value) => {
//   if (!value) return ''

//   if (typeof value === 'string') {
//     return value
//   }

//   if (typeof value === 'object') {
//     return value._id || value.id || ''
//   }

//   return ''
// }

// const getImageUrl = (image) => {
//   if (!image) return ''

//   if (typeof image === 'string') {
//     return image
//   }

//   if (typeof image === 'object') {
//     return (
//       image.url ||
//       image.secure_url ||
//       image.path ||
//       image.src ||
//       ''
//     )
//   }

//   return ''
// }

// // ============================================================
// // SELLER STORE
// // ============================================================

// function SellerStore() {
//   const { slug } = useParams()
//   const { addToCart } = useCart()

//   const [store, setStore] = useState(null)
//   const [products, setProducts] = useState([])

//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   const [search, setSearch] = useState('')
//   const [sort, setSort] = useState('featured')

//   const [favorites, setFavorites] = useState([])

//   // ==========================================================
//   // LOAD STORE + PRODUCTS FROM BACKEND
//   // ==========================================================

//   useEffect(() => {
//     let cancelled = false

//     const loadStore = async () => {
//       try {
//         setLoading(true)
//         setError('')
//         setStore(null)
//         setProducts([])

//         if (!slug) {
//           setError('Store slug is missing.')
//           return
//         }

//         // ------------------------------------------------------
//         // GET STORE BY SLUG
//         // ------------------------------------------------------

//         const storeResponse = await fetch(
//           `${API_URL}/stores/${encodeURIComponent(slug)}`
//         )

//         let storeData = null

//         try {
//           storeData = await storeResponse.json()
//         } catch {
//           storeData = null
//         }

//         if (!storeResponse.ok) {
//           throw new Error(
//             storeData?.message ||
//               'Unable to load this store.'
//           )
//         }

//         if (cancelled) return

//         // ------------------------------------------------------
//         // SUPPORT DIFFERENT BACKEND RESPONSE SHAPES
//         // ------------------------------------------------------

//         const foundStore =
//           storeData?.store ||
//           storeData?.data?.store ||
//           storeData?.data ||
//           storeData

//         if (!foundStore) {
//           throw new Error('Store not found.')
//         }

//         setStore(foundStore)

//         // ------------------------------------------------------
//         // STORE ID
//         // ------------------------------------------------------

//         const storeId =
//           getId(foundStore._id) ||
//           getId(foundStore.id)

//         // ------------------------------------------------------
//         // GET PRODUCTS
//         //
//         // We request all public products and then filter by
//         // this store on the frontend as a safe fallback.
//         // ------------------------------------------------------

//         const productsResponse = await fetch(
//           `${API_URL}/products`
//         )

//         let productsData = null

//         try {
//           productsData = await productsResponse.json()
//         } catch {
//           productsData = null
//         }

//         if (!productsResponse.ok) {
//           throw new Error(
//             productsData?.message ||
//               'Unable to load store products.'
//           )
//         }

//         if (cancelled) return

//         const allProducts =
//           productsData?.products ||
//           productsData?.data?.products ||
//           productsData?.data ||
//           (Array.isArray(productsData)
//             ? productsData
//             : [])

//         // ------------------------------------------------------
//         // FILTER APPROVED + ACTIVE PRODUCTS FOR THIS STORE
//         // ------------------------------------------------------

//         const storeProducts = allProducts.filter(
//           (product) => {
//             const productStoreId =
//               getId(product.store) ||
//               getId(product.storeId)

//             const sameStore =
//               String(productStoreId) ===
//               String(storeId)

//             const approved =
//               product.approvalStatus ===
//                 'approved' ||
//               product.status === 'approved'

//             const active =
//               product.isActive !== false

//             const inStock =
//               product.stock === undefined ||
//               Number(product.stock) > 0

//             return (
//               sameStore &&
//               approved &&
//               active &&
//               inStock
//             )
//           }
//         )

//         setProducts(storeProducts)
//       } catch (err) {
//         if (cancelled) return

//         console.error(
//           'Seller store loading error:',
//           err
//         )

//         setError(
//           err?.message ||
//             'Something went wrong while loading this store.'
//         )

//         setStore(null)
//         setProducts([])
//       } finally {
//         if (!cancelled) {
//           setLoading(false)
//         }
//       }
//     }

//     loadStore()

//     return () => {
//       cancelled = true
//     }
//   }, [slug])

//   // ==========================================================
//   // SEARCH + SORT
//   // ==========================================================

//   const visibleProducts = useMemo(() => {
//     const query = search
//       .trim()
//       .toLowerCase()

//     let result = products.filter(
//       (product) => {
//         if (!query) return true

//         return (
//           product.name
//             ?.toLowerCase()
//             .includes(query) ||
//           product.category
//             ?.toLowerCase()
//             .includes(query) ||
//           product.subcategory
//             ?.toLowerCase()
//             .includes(query) ||
//           product.description
//             ?.toLowerCase()
//             .includes(query)
//         )
//       }
//     )

//     // --------------------------------------------------------
//     // FEATURED
//     // --------------------------------------------------------

//     if (sort === 'featured') {
//       result = [...result].sort(
//         (a, b) => {
//           const aFeatured =
//             a.isFeatured === true ? 1 : 0

//           const bFeatured =
//             b.isFeatured === true ? 1 : 0

//           return bFeatured - aFeatured
//         }
//       )
//     }

//     // --------------------------------------------------------
//     // PRICE LOW
//     // --------------------------------------------------------

//     if (sort === 'price-low') {
//       result = [...result].sort(
//         (a, b) =>
//           Number(a.price || 0) -
//           Number(b.price || 0)
//       )
//     }

//     // --------------------------------------------------------
//     // PRICE HIGH
//     // --------------------------------------------------------

//     if (sort === 'price-high') {
//       result = [...result].sort(
//         (a, b) =>
//           Number(b.price || 0) -
//           Number(a.price || 0)
//       )
//     }

//     // --------------------------------------------------------
//     // NEWEST
//     // --------------------------------------------------------

//     if (sort === 'newest') {
//       result = [...result].sort(
//         (a, b) =>
//           new Date(
//             b.createdAt ||
//               b.submittedAt ||
//               0
//           ) -
//           new Date(
//             a.createdAt ||
//               a.submittedAt ||
//               0
//           )
//       )
//     }

//     return result
//   }, [products, search, sort])

//   // ==========================================================
//   // FAVORITE
//   // ==========================================================

//   const toggleFavorite = (productId) => {
//     setFavorites((previous) =>
//       previous.includes(productId)
//         ? previous.filter(
//             (id) => id !== productId
//           )
//         : [...previous, productId]
//     )
//   }

//   // ==========================================================
//   // SHARE STORE
//   // ==========================================================

//   const handleShare = async () => {
//     const url = window.location.href

//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title:
//             store?.name ||
//             store?.storeName ||
//             'Fegegta Store',

//           text: `Visit ${
//             store?.name ||
//             store?.storeName ||
//             'this store'
//           } on Fegegta.`,

//           url,
//         })
//       } catch (shareError) {
//         if (
//           shareError?.name !==
//           'AbortError'
//         ) {
//           console.error(
//             'Share failed:',
//             shareError
//           )
//         }
//       }

//       return
//     }

//     try {
//       await navigator.clipboard.writeText(url)

//       alert('Store link copied.')
//     } catch {
//       alert(url)
//     }
//   }

//   // ==========================================================
//   // LOADING
//   // ==========================================================

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
//         <div className="text-center">
//           <Loader2 className="mx-auto h-10 w-10 animate-spin text-gray-700" />

//           <p className="mt-4 text-sm text-gray-500">
//             Loading store...
//           </p>
//         </div>
//       </div>
//     )
//   }

//   // ==========================================================
//   // STORE NOT FOUND / ERROR
//   // ==========================================================

//   if (!store) {
//     return (
//       <div className="min-h-screen bg-gray-50 px-4 py-16">
//         <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
//           <Store className="mx-auto h-14 w-14 text-gray-400" />

//           <h1 className="mt-5 text-2xl font-bold text-gray-900">
//             Store Not Found
//           </h1>

//           <p className="mt-2 text-gray-500">
//             {error ||
//               'This store does not exist or is not publicly available.'}
//           </p>

//           <Link
//             to="/products"
//             className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
//           >
//             Browse Products
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // ==========================================================
//   // NORMALIZE STORE DATA
//   // ==========================================================

//   const storeId =
//     getId(store._id) ||
//     getId(store.id)

//   const sellerId =
//     getId(store.seller) ||
//     getId(store.sellerId)

//   const storeName =
//     store.name ||
//     store.storeName ||
//     'Fegegta Store'

//   const storeDescription =
//     store.description ||
//     store.storeDescription ||
//     'Welcome to our store.'

//   const storeLogo =
//     getImageUrl(store.logo) ||
//     getImageUrl(store.logoUrl)

//   const storeCover =
//     getImageUrl(store.banner) ||
//     getImageUrl(store.coverImage) ||
//     getImageUrl(store.cover)

//   const storeCategory =
//     store.category ||
//     store.storeCategory ||
//     store.productType ||
//     ''

//   const verified =
//     store.verified === true

//   // ==========================================================
//   // RENDER
//   // ==========================================================

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* ======================================================
//           COVER
//       ====================================================== */}

//       <section className="relative h-56 overflow-hidden bg-gray-900 sm:h-72">
//         {storeCover ? (
//           <img
//             src={storeCover}
//             alt={storeName}
//             className="h-full w-full object-cover"
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center">
//             <Store className="h-16 w-16 text-gray-600" />
//           </div>
//         )}

//         <div className="absolute inset-0 bg-black/40" />
//       </section>

//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//         {/* ====================================================
//             STORE HEADER
//         ==================================================== */}

//         <section className="relative -mt-12 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
//           <div className="flex flex-col gap-5 md:flex-row md:items-center">

//             {/* LOGO */}

//             <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-gray-100 shadow-md">
//               {storeLogo ? (
//                 <img
//                   src={storeLogo}
//                   alt={storeName}
//                   className="h-full w-full object-cover"
//                 />
//               ) : (
//                 <Store className="h-10 w-10 text-gray-400" />
//               )}
//             </div>

//             {/* STORE INFORMATION */}

//             <div className="min-w-0 flex-1">
//               <div className="flex flex-wrap items-center gap-2">

//                 <h1 className="text-2xl font-bold text-gray-900">
//                   {storeName}
//                 </h1>

//                 {verified && (
//                   <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
//                     <CheckCircle2 className="h-3.5 w-3.5" />
//                     Verified
//                   </span>
//                 )}
//               </div>

//               <p className="mt-2 text-sm text-gray-500">
//                 {storeDescription}
//               </p>

//               {storeCategory && (
//                 <p className="mt-2 text-xs font-medium text-gray-400">
//                   {storeCategory}
//                 </p>
//               )}
//             </div>

//             {/* SHARE */}

//             <button
//               type="button"
//               onClick={handleShare}
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800"
//             >
//               <Share2 className="h-4 w-4" />
//               Share Store
//             </button>
//           </div>
//         </section>

//         {/* ====================================================
//             PRODUCTS
//         ==================================================== */}

//         <section className="py-8">

//           {/* HEADER */}

//           <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//             <div>
//               <h2 className="text-xl font-bold">
//                 Store Products
//               </h2>

//               <p className="mt-1 text-sm text-gray-500">
//                 {visibleProducts.length}{' '}
//                 approved products
//               </p>
//             </div>

//             <div className="flex flex-col gap-3 sm:flex-row">

//               {/* SEARCH */}

//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

//                 <input
//                   value={search}
//                   onChange={(event) =>
//                     setSearch(event.target.value)
//                   }
//                   placeholder="Search products..."
//                   className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-black sm:w-64"
//                 />
//               </div>

//               {/* SORT */}

//               <select
//                 value={sort}
//                 onChange={(event) =>
//                   setSort(event.target.value)
//                 }
//                 className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
//               >
//                 <option value="featured">
//                   Featured
//                 </option>

//                 <option value="newest">
//                   Newest
//                 </option>

//                 <option value="price-low">
//                   Price: Low to High
//                 </option>

//                 <option value="price-high">
//                   Price: High to Low
//                 </option>
//               </select>
//             </div>
//           </div>

//           {/* ==================================================
//               NO PRODUCTS
//           ================================================== */}

//           {visibleProducts.length === 0 ? (
//             <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-12 text-center">

//               <Store className="mx-auto h-12 w-12 text-gray-400" />

//               <h3 className="mt-4 font-bold">
//                 No products found
//               </h3>

//               <p className="mt-1 text-sm text-gray-500">
//                 This store currently has no approved products matching your search.
//               </p>
//             </div>
//           ) : (

//             /* =================================================
//                PRODUCT GRID
//             ================================================= */

//             <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

//               {visibleProducts.map(
//                 (product) => {
//                   const productId =
//                     getId(product._id) ||
//                     getId(product.id)

//                   const isFavorite =
//                     favorites.includes(
//                       productId
//                     )

//                   // --------------------------------------------
//                   // PRODUCT IMAGES
//                   // --------------------------------------------

//                   let productImages = []

//                   if (
//                     Array.isArray(
//                       product.images
//                     )
//                   ) {
//                     productImages =
//                       product.images
//                         .map(getImageUrl)
//                         .filter(Boolean)
//                   }

//                   if (
//                     productImages.length ===
//                       0 &&
//                     product.image
//                   ) {
//                     const image =
//                       getImageUrl(
//                         product.image
//                       )

//                     if (image) {
//                       productImages = [
//                         image,
//                       ]
//                     }
//                   }

//                   const mainImage =
//                     productImages[0] || ''

//                   // --------------------------------------------
//                   // OLD PRICE
//                   // --------------------------------------------

//                   const oldPrice =
//                     product.oldPrice ??
//                     product.compareAtPrice

//                   return (
//                     <article
//                       key={productId}
//                       className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//                     >

//                       {/* IMAGE */}

//                       <Link
//                         to={`/product/${productId}`}
//                         className="block"
//                       >
//                         <div className="relative aspect-square bg-gray-100">

//                           {mainImage ? (
//                             <img
//                               src={mainImage}
//                               alt={
//                                 product.name ||
//                                 'Product'
//                               }
//                               className="h-full w-full object-cover"
//                               loading="lazy"
//                             />
//                           ) : (
//                             <div className="flex h-full items-center justify-center text-gray-400">
//                               No Image
//                             </div>
//                           )}

//                           {/* IMAGE COUNT */}

//                           <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-gray-700 shadow-sm">
//                             {productImages.length}/4
//                             {' '}
//                             images
//                           </div>

//                           {/* FAVORITE */}

//                           <button
//                             type="button"
//                             onClick={(event) => {
//                               event.preventDefault()
//                               event.stopPropagation()

//                               toggleFavorite(
//                                 productId
//                               )
//                             }}
//                             className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm"
//                             aria-label={
//                               isFavorite
//                                 ? 'Remove from favorites'
//                                 : 'Add to favorites'
//                             }
//                           >
//                             <Heart
//                               className={`h-4 w-4 ${
//                                 isFavorite
//                                   ? 'fill-red-500 text-red-500'
//                                   : 'text-gray-700'
//                               }`}
//                             />
//                           </button>
//                         </div>
//                       </Link>

//                       {/* PRODUCT INFO */}

//                       <div className="p-4">

//                         <Link
//                           to={`/product/${productId}`}
//                           className="block"
//                         >
//                           <h3 className="line-clamp-2 text-sm font-semibold hover:underline">
//                             {product.name}
//                           </h3>

//                           {product.category && (
//                             <p className="mt-1 text-xs text-gray-400">
//                               {product.category}
//                             </p>
//                           )}

//                           <p className="mt-2 font-bold">
//                             €
//                             {Number(
//                               product.price || 0
//                             ).toFixed(2)}
//                           </p>

//                           {oldPrice &&
//                             Number(oldPrice) >
//                               Number(
//                                 product.price
//                               ) && (
//                               <p className="text-xs text-gray-400 line-through">
//                                 €
//                                 {Number(
//                                   oldPrice
//                                 ).toFixed(2)}
//                               </p>
//                             )}
//                         </Link>

//                         {/* ADD TO CART */}

//                         <button
//                           type="button"
//                           onClick={() =>
//                             addToCart({
//                               ...product,

//                               id:
//                                 productId,

//                               sellerId,

//                               storeId,

//                               storeSlug:
//                                 store.slug ||
//                                 slug,

//                               storeName,
//                             })
//                           }
//                           className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white hover:bg-gray-800"
//                         >
//                           <ShoppingCart className="h-4 w-4" />
//                           Add to Cart
//                         </button>
//                       </div>
//                     </article>
//                   )
//                 }
//               )}
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   )
// }

// export default SellerStore


// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from 'react'

// import {
//   Link,
//   useParams,
// } from 'react-router-dom'

// import {
//   CheckCircle2,
//   Heart,
//   Search,
//   Share2,
//   ShoppingCart,
//   Store,
//   Loader2,
//   AlertCircle,
// } from 'lucide-react'

// import { useCart } from '../../context/CartContext'

// // ============================================================
// // API
// // ============================================================

// const API_URL =
//   'https://fegegta-server.onrender.com/api'

// // ============================================================
// // HELPERS
// // ============================================================

// const getId = (value) => {
//   if (!value) return ''

//   if (typeof value === 'string') {
//     return value
//   }

//   if (typeof value === 'object') {
//     return (
//       value._id ||
//       value.id ||
//       ''
//     )
//   }

//   return ''
// }

// // ============================================================
// // HUMAN-READABLE STORE ID
// // ============================================================

// const getStorePublicId = (store) => {
//   if (!store) return ''

//   return (
//     store.storeId ||
//     getId(store._id) ||
//     getId(store.id) ||
//     ''
//   )
// }

// // ============================================================
// // HUMAN-READABLE SELLER ID
// // ============================================================

// const getSellerPublicId = (store) => {
//   if (!store) return ''

//   // ----------------------------------------------------------
//   // If seller is populated
//   // ----------------------------------------------------------

//   if (
//     store.seller &&
//     typeof store.seller === 'object'
//   ) {
//     return (
//       store.seller.sellerId ||
//       getId(store.seller._id) ||
//       getId(store.seller.id) ||
//       ''
//     )
//   }

//   // ----------------------------------------------------------
//   // If backend already returned sellerId
//   // ----------------------------------------------------------

//   if (store.sellerId) {
//     return store.sellerId
//   }

//   return getId(store.seller)
// }

// // ============================================================
// // IMAGE URL
// // ============================================================

// const getImageUrl = (image) => {
//   if (!image) return ''

//   if (typeof image === 'string') {
//     return image
//   }

//   if (typeof image === 'object') {
//     return (
//       image.url ||
//       image.secure_url ||
//       image.path ||
//       image.src ||
//       ''
//     )
//   }

//   return ''
// }

// // ============================================================
// // PRODUCT STORE ID
// //
// // Supports:
// // product.store = ObjectId
// // product.store = populated Store
// // product.storeId = MongoDB ObjectId
// // product.storeId = FEG-STORE-XXXXXX
// // ============================================================

// const getProductStoreIds = (product) => {
//   if (!product) {
//     return []
//   }

//   const ids = []

//   // ----------------------------------------------------------
//   // product.store
//   // ----------------------------------------------------------

//   if (product.store) {
//     if (
//       typeof product.store === 'object'
//     ) {
//       if (product.store.storeId) {
//         ids.push(
//           String(product.store.storeId)
//         )
//       }

//       if (product.store._id) {
//         ids.push(
//           String(product.store._id)
//         )
//       }

//       if (product.store.id) {
//         ids.push(
//           String(product.store.id)
//         )
//       }
//     } else {
//       ids.push(
//         String(product.store)
//       )
//     }
//   }

//   // ----------------------------------------------------------
//   // product.storeId
//   // ----------------------------------------------------------

//   if (product.storeId) {
//     if (
//       typeof product.storeId === 'object'
//     ) {
//       if (product.storeId.storeId) {
//         ids.push(
//           String(product.storeId.storeId)
//         )
//       }

//       if (product.storeId._id) {
//         ids.push(
//           String(product.storeId._id)
//         )
//       }

//       if (product.storeId.id) {
//         ids.push(
//           String(product.storeId.id)
//         )
//       }
//     } else {
//       ids.push(
//         String(product.storeId)
//       )
//     }
//   }

//   return ids.filter(Boolean)
// }

// // ============================================================
// // CHECK PRODUCT BELONGS TO STORE
// // ============================================================

// const productBelongsToStore = (
//   product,
//   store
// ) => {
//   if (!product || !store) {
//     return false
//   }

//   const storeIds = [
//     store.storeId,
//     store._id,
//     store.id,
//   ]
//     .filter(Boolean)
//     .map(String)

//   const productStoreIds =
//     getProductStoreIds(product)

//   return productStoreIds.some(
//     (productStoreId) =>
//       storeIds.includes(
//         String(productStoreId)
//       )
//   )
// }

// // ============================================================
// // SELLER STORE
// // ============================================================

// function SellerStore() {
//   const { slug } = useParams()

//   const { addToCart } = useCart()

//   const [store, setStore] =
//     useState(null)

//   const [products, setProducts] =
//     useState([])

//   const [loading, setLoading] =
//     useState(true)

//   const [error, setError] =
//     useState('')

//   const [search, setSearch] =
//     useState('')

//   const [sort, setSort] =
//     useState('featured')

//   const [favorites, setFavorites] =
//     useState([])

//   // ==========================================================
//   // LOAD STORE + PRODUCTS
//   // ==========================================================

//   useEffect(() => {
//     let cancelled = false

//     const loadStore = async () => {
//       try {
//         setLoading(true)
//         setError('')
//         setStore(null)
//         setProducts([])

//         // ------------------------------------------------------
//         // CHECK SLUG
//         // ------------------------------------------------------

//         if (!slug) {
//           setError(
//             'Store slug is missing.'
//           )

//           return
//         }

//         // ======================================================
//         // GET STORE BY SLUG
//         // ======================================================

//         const storeUrl =
//           `${API_URL}/stores/slug/${encodeURIComponent(
//             slug
//           )}`

//         const storeResponse =
//           await fetch(storeUrl)

//         let storeData = null

//         try {
//           storeData =
//             await storeResponse.json()
//         } catch {
//           storeData = null
//         }

//         if (!storeResponse.ok) {
//           throw new Error(
//             storeData?.message ||
//               'Unable to load this store.'
//           )
//         }

//         if (cancelled) {
//           return
//         }

//         // ------------------------------------------------------
//         // SUPPORT BACKEND RESPONSE
//         //
//         // Expected backend:
//         //
//         // {
//         //   store,
//         //   storeId,
//         //   storeMongoId,
//         //   storeName,
//         //   storeSlug,
//         //   sellerId,
//         //   sellerMongoId,
//         //   seller
//         // }
//         // ------------------------------------------------------

//         const foundStore =
//           storeData?.store ||
//           storeData?.data?.store ||
//           storeData?.data ||
//           storeData

//         if (!foundStore) {
//           throw new Error(
//             'Store not found.'
//           )
//         }

//         // ------------------------------------------------------
//         // Attach backend metadata to store
//         // ------------------------------------------------------

//         const normalizedStore = {
//           ...foundStore,

//           storeId:
//             foundStore.storeId ||
//             storeData?.storeId ||
//             foundStore._id,

//           storeMongoId:
//             storeData?.storeMongoId ||
//             foundStore._id,

//           storeName:
//             foundStore.name ||
//             foundStore.storeName ||
//             storeData?.storeName ||
//             'Fegegta Store',

//           storeSlug:
//             foundStore.slug ||
//             foundStore.storeSlug ||
//             storeData?.storeSlug ||
//             slug,

//           sellerId:
//             foundStore.seller?.sellerId ||
//             storeData?.sellerId ||
//             foundStore.sellerId ||
//             '',

//           sellerMongoId:
//             storeData?.sellerMongoId ||
//             getId(foundStore.seller),
//         }

//         setStore(normalizedStore)

//         // ======================================================
//         // GET PUBLIC PRODUCTS
//         // ======================================================

//         const productsResponse =
//           await fetch(
//             `${API_URL}/products`
//           )

//         let productsData = null

//         try {
//           productsData =
//             await productsResponse.json()
//         } catch {
//           productsData = null
//         }

//         if (!productsResponse.ok) {
//           throw new Error(
//             productsData?.message ||
//               'Unable to load store products.'
//           )
//         }

//         if (cancelled) {
//           return
//         }

//         // ------------------------------------------------------
//         // SUPPORT DIFFERENT PRODUCT RESPONSE SHAPES
//         // ------------------------------------------------------

//         const allProducts =
//           productsData?.products ||
//           productsData?.data?.products ||
//           productsData?.data ||
//           (Array.isArray(productsData)
//             ? productsData
//             : [])

//         // ======================================================
//         // FILTER STORE PRODUCTS
//         // ======================================================

//         const storeProducts =
//           allProducts.filter(
//             (product) => {
//               // ------------------------------------------------
//               // SAME STORE
//               // ------------------------------------------------

//               const sameStore =
//                 productBelongsToStore(
//                   product,
//                   normalizedStore
//                 )

//               // ------------------------------------------------
//               // APPROVED
//               // ------------------------------------------------

//               const approved =
//                 product.approvalStatus ===
//                   'approved' ||
//                 product.status ===
//                   'approved'

//               // ------------------------------------------------
//               // ACTIVE
//               // ------------------------------------------------

//               const active =
//                 product.isActive !== false

//               // ------------------------------------------------
//               // STOCK
//               // ------------------------------------------------

//               const inStock =
//                 product.stock ===
//                   undefined ||
//                 product.stock === null ||
//                 Number(product.stock) > 0

//               return (
//                 sameStore &&
//                 approved &&
//                 active &&
//                 inStock
//               )
//             }
//           )

//         setProducts(
//           storeProducts
//         )
//       } catch (err) {
//         if (cancelled) {
//           return
//         }

//         console.error(
//           'Seller store loading error:',
//           err
//         )

//         setError(
//           err?.message ||
//             'Something went wrong while loading this store.'
//         )

//         setStore(null)
//         setProducts([])
//       } finally {
//         if (!cancelled) {
//           setLoading(false)
//         }
//       }
//     }

//     loadStore()

//     return () => {
//       cancelled = true
//     }
//   }, [slug])

//   // ==========================================================
//   // SEARCH + SORT
//   // ==========================================================

//   const visibleProducts =
//     useMemo(() => {
//       const query =
//         search
//           .trim()
//           .toLowerCase()

//       let result =
//         products.filter(
//           (product) => {
//             if (!query) {
//               return true
//             }

//             return (
//               product.name
//                 ?.toLowerCase()
//                 .includes(query) ||
//               product.category
//                 ?.toLowerCase()
//                 .includes(query) ||
//               product.subcategory
//                 ?.toLowerCase()
//                 .includes(query) ||
//               product.description
//                 ?.toLowerCase()
//                 .includes(query)
//             )
//           }
//         )

//       // ------------------------------------------------------
//       // FEATURED
//       // ------------------------------------------------------

//       if (
//         sort === 'featured'
//       ) {
//         result =
//           [...result].sort(
//             (a, b) => {
//               const aFeatured =
//                 a.isFeatured === true
//                   ? 1
//                   : 0

//               const bFeatured =
//                 b.isFeatured === true
//                   ? 1
//                   : 0

//               return (
//                 bFeatured -
//                 aFeatured
//               )
//             }
//           )
//       }

//       // ------------------------------------------------------
//       // PRICE LOW
//       // ------------------------------------------------------

//       if (
//         sort === 'price-low'
//       ) {
//         result =
//           [...result].sort(
//             (a, b) =>
//               Number(
//                 a.price || 0
//               ) -
//               Number(
//                 b.price || 0
//               )
//           )
//       }

//       // ------------------------------------------------------
//       // PRICE HIGH
//       // ------------------------------------------------------

//       if (
//         sort === 'price-high'
//       ) {
//         result =
//           [...result].sort(
//             (a, b) =>
//               Number(
//                 b.price || 0
//               ) -
//               Number(
//                 a.price || 0
//               )
//           )
//       }

//       // ------------------------------------------------------
//       // NEWEST
//       // ------------------------------------------------------

//       if (
//         sort === 'newest'
//       ) {
//         result =
//           [...result].sort(
//             (a, b) =>
//               new Date(
//                 b.createdAt ||
//                   b.submittedAt ||
//                   0
//               ) -
//               new Date(
//                 a.createdAt ||
//                   a.submittedAt ||
//                   0
//               )
//           )
//       }

//       return result
//     }, [
//       products,
//       search,
//       sort,
//     ])

//   // ==========================================================
//   // FAVORITE
//   // ==========================================================

//   const toggleFavorite = (
//     productId
//   ) => {
//     setFavorites(
//       (previous) =>
//         previous.includes(
//           productId
//         )
//           ? previous.filter(
//               (id) =>
//                 id !== productId
//             )
//           : [
//               ...previous,
//               productId,
//             ]
//     )
//   }

//   // ==========================================================
//   // SHARE STORE
//   // ==========================================================

//   const handleShare =
//     async () => {
//       const url =
//         window.location.href

//       const currentStoreName =
//         store?.name ||
//         store?.storeName ||
//         'Fegegta Store'

//       if (
//         navigator.share
//       ) {
//         try {
//           await navigator.share({
//             title:
//               currentStoreName,

//             text:
//               `Visit ${currentStoreName} on Fegegta.`,

//             url,
//           })
//         } catch (
//           shareError
//         ) {
//           if (
//             shareError?.name !==
//             'AbortError'
//           ) {
//             console.error(
//               'Share failed:',
//               shareError
//             )
//           }
//         }

//         return
//       }

//       try {
//         await navigator.clipboard.writeText(
//           url
//         )

//         alert(
//           'Store link copied.'
//         )
//       } catch {
//         alert(url)
//       }
//     }

//   // ==========================================================
//   // LOADING
//   // ==========================================================

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
//         <div className="text-center">
//           <Loader2 className="mx-auto h-10 w-10 animate-spin text-gray-700" />

//           <p className="mt-4 text-sm text-gray-500">
//             Loading store...
//           </p>
//         </div>
//       </div>
//     )
//   }

//   // ==========================================================
//   // STORE NOT FOUND / ERROR
//   // ==========================================================

//   if (!store) {
//     return (
//       <div className="min-h-screen bg-gray-50 px-4 py-16">
//         <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">

//           <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
//             <AlertCircle className="h-7 w-7 text-red-500" />
//           </div>

//           <h1 className="mt-5 text-2xl font-bold text-gray-900">
//             Store Not Found
//           </h1>

//           <p className="mt-2 text-gray-500">
//             {error ||
//               'This store does not exist or is not publicly available.'}
//           </p>

//           <Link
//             to="/products"
//             className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
//           >
//             Browse Products
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // ==========================================================
//   // NORMALIZE STORE DATA
//   // ==========================================================

//   const storeId =
//     getStorePublicId(store)

//   const sellerId =
//     getSellerPublicId(store)

//   const storeName =
//     store.name ||
//     store.storeName ||
//     'Fegegta Store'

//   const storeDescription =
//     store.description ||
//     store.storeDescription ||
//     'Welcome to our store.'

//   const storeLogo =
//     getImageUrl(
//       store.logo
//     ) ||
//     getImageUrl(
//       store.logoUrl
//     )

//   const storeCover =
//     getImageUrl(
//       store.banner
//     ) ||
//     getImageUrl(
//       store.coverImage
//     ) ||
//     getImageUrl(
//       store.cover
//     )

//   const storeCategory =
//     store.category ||
//     store.storeCategory ||
//     store.productType ||
//     ''

//   // ----------------------------------------------------------
//   // VERIFIED
//   //
//   // Store schema does not currently contain "verified".
//   // If backend provides it, use it.
//   //
//   // Otherwise an approved/active seller can still be shown
//   // without incorrectly inventing a verification status.
//   // ----------------------------------------------------------

//   const verified =
//     store.verified === true

//   // ==========================================================
//   // RENDER
//   // ==========================================================

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* ======================================================
//           COVER
//       ====================================================== */}

//       <section className="relative h-56 overflow-hidden bg-gray-900 sm:h-72">

//         {storeCover ? (
//           <img
//             src={storeCover}
//             alt={storeName}
//             className="h-full w-full object-cover"
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center">
//             <Store className="h-16 w-16 text-gray-600" />
//           </div>
//         )}

//         <div className="absolute inset-0 bg-black/40" />
//       </section>

//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//         {/* ====================================================
//             STORE HEADER
//         ==================================================== */}

//         <section className="relative -mt-12 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">

//           <div className="flex flex-col gap-5 md:flex-row md:items-center">

//             {/* LOGO */}

//             <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-gray-100 shadow-md">

//               {storeLogo ? (
//                 <img
//                   src={storeLogo}
//                   alt={storeName}
//                   className="h-full w-full object-cover"
//                 />
//               ) : (
//                 <Store className="h-10 w-10 text-gray-400" />
//               )}

//             </div>

//             {/* STORE INFORMATION */}

//             <div className="min-w-0 flex-1">

//               <div className="flex flex-wrap items-center gap-2">

//                 <h1 className="text-2xl font-bold text-gray-900">
//                   {storeName}
//                 </h1>

//                 {verified && (
//                   <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
//                     <CheckCircle2 className="h-3.5 w-3.5" />
//                     Verified
//                   </span>
//                 )}

//               </div>

//               <p className="mt-2 text-sm text-gray-500">
//                 {storeDescription}
//               </p>

//               {storeCategory && (
//                 <p className="mt-2 text-xs font-medium text-gray-400">
//                   {storeCategory}
//                 </p>
//               )}

//               {/* ------------------------------------------------
//                   STORE / SELLER IDs
//               ------------------------------------------------ */}

//               <div className="mt-3 flex flex-wrap gap-2">

//                 {storeId && (
//                   <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">
//                     Store ID: {storeId}
//                   </span>
//                 )}

//                 {sellerId && (
//                   <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">
//                     Seller ID: {sellerId}
//                   </span>
//                 )}

//               </div>

//             </div>

//             {/* SHARE */}

//             <button
//               type="button"
//               onClick={handleShare}
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800"
//             >
//               <Share2 className="h-4 w-4" />
//               Share Store
//             </button>

//           </div>
//         </section>

//         {/* ====================================================
//             PRODUCTS
//         ==================================================== */}

//         <section className="py-8">

//           {/* HEADER */}

//           <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//             <div>
//               <h2 className="text-xl font-bold">
//                 Store Products
//               </h2>

//               <p className="mt-1 text-sm text-gray-500">
//                 {visibleProducts.length}{' '}
//                 approved products
//               </p>
//             </div>

//             <div className="flex flex-col gap-3 sm:flex-row">

//               {/* SEARCH */}

//               <div className="relative">

//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

//                 <input
//                   value={search}
//                   onChange={(event) =>
//                     setSearch(
//                       event.target.value
//                     )
//                   }
//                   placeholder="Search products..."
//                   className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-black sm:w-64"
//                 />

//               </div>

//               {/* SORT */}

//               <select
//                 value={sort}
//                 onChange={(event) =>
//                   setSort(
//                     event.target.value
//                   )
//                 }
//                 className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
//               >

//                 <option value="featured">
//                   Featured
//                 </option>

//                 <option value="newest">
//                   Newest
//                 </option>

//                 <option value="price-low">
//                   Price: Low to High
//                 </option>

//                 <option value="price-high">
//                   Price: High to Low
//                 </option>

//               </select>

//             </div>
//           </div>

//           {/* ==================================================
//               NO PRODUCTS
//           ================================================== */}

//           {visibleProducts.length === 0 ? (

//             <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-12 text-center">

//               <Store className="mx-auto h-12 w-12 text-gray-400" />

//               <h3 className="mt-4 font-bold">
//                 No products found
//               </h3>

//               <p className="mt-1 text-sm text-gray-500">
//                 This store currently has no approved products matching your search.
//               </p>

//             </div>

//           ) : (

//             /* =================================================
//                PRODUCT GRID
//             ================================================= */

//             <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

//               {visibleProducts.map(
//                 (product) => {

//                   const productId =
//                     getId(
//                       product._id
//                     ) ||
//                     getId(
//                       product.id
//                     )

//                   const isFavorite =
//                     favorites.includes(
//                       productId
//                     )

//                   // --------------------------------------------
//                   // PRODUCT IMAGES
//                   // --------------------------------------------

//                   let productImages = []

//                   if (
//                     Array.isArray(
//                       product.images
//                     )
//                   ) {
//                     productImages =
//                       product.images
//                         .map(
//                           getImageUrl
//                         )
//                         .filter(
//                           Boolean
//                         )
//                   }

//                   if (
//                     productImages.length ===
//                       0 &&
//                     product.image
//                   ) {
//                     const image =
//                       getImageUrl(
//                         product.image
//                       )

//                     if (image) {
//                       productImages = [
//                         image,
//                       ]
//                     }
//                   }

//                   const mainImage =
//                     productImages[0] ||
//                     ''

//                   // --------------------------------------------
//                   // OLD PRICE
//                   // --------------------------------------------

//                   const oldPrice =
//                     product.oldPrice ??
//                     product.compareAtPrice

//                   return (
//                     <article
//                       key={productId}
//                       className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//                     >

//                       {/* IMAGE */}

//                       <Link
//                         to={`/product/${productId}`}
//                         className="block"
//                       >

//                         <div className="relative aspect-square bg-gray-100">

//                           {mainImage ? (
//                             <img
//                               src={mainImage}
//                               alt={
//                                 product.name ||
//                                 'Product'
//                               }
//                               className="h-full w-full object-cover"
//                               loading="lazy"
//                             />
//                           ) : (
//                             <div className="flex h-full items-center justify-center text-gray-400">
//                               No Image
//                             </div>
//                           )}

//                           {/* IMAGE COUNT */}

//                           <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-gray-700 shadow-sm">
//                             {productImages.length}/4{' '}
//                             images
//                           </div>

//                           {/* FAVORITE */}

//                           <button
//                             type="button"
//                             onClick={(event) => {
//                               event.preventDefault()
//                               event.stopPropagation()

//                               toggleFavorite(
//                                 productId
//                               )
//                             }}
//                             className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm"
//                             aria-label={
//                               isFavorite
//                                 ? 'Remove from favorites'
//                                 : 'Add to favorites'
//                             }
//                           >

//                             <Heart
//                               className={`h-4 w-4 ${
//                                 isFavorite
//                                   ? 'fill-red-500 text-red-500'
//                                   : 'text-gray-700'
//                               }`}
//                             />

//                           </button>

//                         </div>
//                       </Link>

//                       {/* PRODUCT INFO */}

//                       <div className="p-4">

//                         <Link
//                           to={`/product/${productId}`}
//                           className="block"
//                         >

//                           <h3 className="line-clamp-2 text-sm font-semibold hover:underline">
//                             {product.name}
//                           </h3>

//                           {product.category && (
//                             <p className="mt-1 text-xs text-gray-400">
//                               {product.category}
//                             </p>
//                           )}

//                           <p className="mt-2 font-bold">
//                             €
//                             {Number(
//                               product.price ||
//                                 0
//                             ).toFixed(2)}
//                           </p>

//                           {oldPrice &&
//                             Number(
//                               oldPrice
//                             ) >
//                               Number(
//                                 product.price ||
//                                   0
//                               ) && (
//                               <p className="text-xs text-gray-400 line-through">
//                                 €
//                                 {Number(
//                                   oldPrice
//                                 ).toFixed(2)}
//                               </p>
//                             )}

//                         </Link>

//                         {/* ADD TO CART */}

//                         <button
//                           type="button"
//                           onClick={() =>
//                             addToCart({
//                               ...product,

//                               id: productId,

//                               // ------------------------------------------------
//                               // Human-readable IDs from backend
//                               // ------------------------------------------------

//                               sellerId,

//                               storeId,

//                               storeSlug:
//                                 store.slug ||
//                                 store.storeSlug ||
//                                 slug,

//                               storeName,
//                             })
//                           }
//                           className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white hover:bg-gray-800"
//                         >
//                           <ShoppingCart className="h-4 w-4" />
//                           Add to Cart
//                         </button>

//                       </div>
//                     </article>
//                   )
//                 }
//               )}

//             </div>
//           )}

//         </section>
//       </div>
//     </div>
//   )
// }

// export default SellerStore



// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from 'react'

// import {
//   Link,
//   useParams,
// } from 'react-router-dom'

// import {
//   CheckCircle2,
//   Heart,
//   Search,
//   Share2,
//   ShoppingCart,
//   Store,
//   Loader2,
//   AlertCircle,
// } from 'lucide-react'

// import { useCart } from '../../context/CartContext'

// // ============================================================
// // API
// // ============================================================

// const API_URL =
//   'https://fegegta-server.onrender.com/api'

// // ============================================================
// // HELPERS
// // ============================================================

// const getId = (value) => {
//   if (!value) return ''

//   if (typeof value === 'string') {
//     return value
//   }

//   if (typeof value === 'object') {
//     return (
//       value._id ||
//       value.id ||
//       ''
//     )
//   }

//   return ''
// }

// // ============================================================
// // HUMAN-READABLE STORE ID
// // ============================================================

// const getStorePublicId = (store) => {
//   if (!store) return ''

//   return (
//     store.storeId ||
//     getId(store._id) ||
//     getId(store.id) ||
//     ''
//   )
// }

// // ============================================================
// // HUMAN-READABLE SELLER ID
// // ============================================================

// const getSellerPublicId = (store) => {
//   if (!store) return ''

//   // ----------------------------------------------------------
//   // If seller is populated
//   // ----------------------------------------------------------

//   if (
//     store.seller &&
//     typeof store.seller === 'object'
//   ) {
//     return (
//       store.seller.sellerId ||
//       getId(store.seller._id) ||
//       getId(store.seller.id) ||
//       ''
//     )
//   }

//   // ----------------------------------------------------------
//   // If backend already returned sellerId
//   // ----------------------------------------------------------

//   if (store.sellerId) {
//     return store.sellerId
//   }

//   return getId(store.seller)
// }

// // ============================================================
// // IMAGE URL
// // ============================================================

// const getImageUrl = (image) => {
//   if (!image) return ''

//   if (typeof image === 'string') {
//     return image
//   }

//   if (typeof image === 'object') {
//     return (
//       image.url ||
//       image.secure_url ||
//       image.path ||
//       image.src ||
//       ''
//     )
//   }

//   return ''
// }

// // ============================================================
// // PRODUCT STORE ID
// //
// // Supports:
// // product.store = ObjectId
// // product.store = populated Store
// // product.storeId = MongoDB ObjectId
// // product.storeId = FEG-STORE-XXXXXX
// // ============================================================

// const getProductStoreIds = (product) => {
//   if (!product) {
//     return []
//   }

//   const ids = []

//   // ----------------------------------------------------------
//   // product.store
//   // ----------------------------------------------------------

//   if (product.store) {
//     if (
//       typeof product.store === 'object'
//     ) {
//       if (product.store.storeId) {
//         ids.push(
//           String(product.store.storeId)
//         )
//       }

//       if (product.store._id) {
//         ids.push(
//           String(product.store._id)
//         )
//       }

//       if (product.store.id) {
//         ids.push(
//           String(product.store.id)
//         )
//       }
//     } else {
//       ids.push(
//         String(product.store)
//       )
//     }
//   }

//   // ----------------------------------------------------------
//   // product.storeId
//   // ----------------------------------------------------------

//   if (product.storeId) {
//     if (
//       typeof product.storeId === 'object'
//     ) {
//       if (product.storeId.storeId) {
//         ids.push(
//           String(product.storeId.storeId)
//         )
//       }

//       if (product.storeId._id) {
//         ids.push(
//           String(product.storeId._id)
//         )
//       }

//       if (product.storeId.id) {
//         ids.push(
//           String(product.storeId.id)
//         )
//       }
//     } else {
//       ids.push(
//         String(product.storeId)
//       )
//     }
//   }

//   return ids.filter(Boolean)
// }

// // ============================================================
// // CHECK PRODUCT BELONGS TO STORE
// // ============================================================

// const productBelongsToStore = (
//   product,
//   store
// ) => {
//   if (!product || !store) {
//     return false
//   }

//   const storeIds = [
//     store.storeId,
//     store._id,
//     store.id,
//   ]
//     .filter(Boolean)
//     .map(String)

//   const productStoreIds =
//     getProductStoreIds(product)

//   return productStoreIds.some(
//     (productStoreId) =>
//       storeIds.includes(
//         String(productStoreId)
//       )
//   )
// }

// // ============================================================
// // SELLER STORE
// // ============================================================

// function SellerStore() {
//   const { slug } = useParams()

//   const { addToCart } = useCart()

//   const [store, setStore] =
//     useState(null)

//   const [products, setProducts] =
//     useState([])

//   const [loading, setLoading] =
//     useState(true)

//   const [error, setError] =
//     useState('')

//   const [search, setSearch] =
//     useState('')

//   const [sort, setSort] =
//     useState('featured')

//   const [favorites, setFavorites] =
//     useState([])

//   // ==========================================================
//   // LOAD STORE + PRODUCTS
//   // ==========================================================

//   useEffect(() => {
//     let cancelled = false

//     const loadStore = async () => {
//       try {
//         setLoading(true)
//         setError('')
//         setStore(null)
//         setProducts([])

//         // ------------------------------------------------------
//         // CHECK SLUG
//         // ------------------------------------------------------

//         if (!slug) {
//           setError(
//             'Store slug is missing.'
//           )

//           return
//         }

//         // ======================================================
//         // GET STORE BY SLUG
//         // ======================================================

//         const storeUrl =
//           `${API_URL}/stores/slug/${encodeURIComponent(
//             slug
//           )}`

//         const storeResponse =
//           await fetch(storeUrl)

//         let storeData = null

//         try {
//           storeData =
//             await storeResponse.json()
//         } catch {
//           storeData = null
//         }

//         if (!storeResponse.ok) {
//           throw new Error(
//             storeData?.message ||
//               'Unable to load this store.'
//           )
//         }

//         if (cancelled) {
//           return
//         }

//         // ------------------------------------------------------
//         // SUPPORT BACKEND RESPONSE
//         //
//         // Expected backend:
//         //
//         // {
//         //   store,
//         //   storeId,
//         //   storeMongoId,
//         //   storeName,
//         //   storeSlug,
//         //   sellerId,
//         //   sellerMongoId,
//         //   seller
//         // }
//         // ------------------------------------------------------

//         const foundStore =
//           storeData?.store ||
//           storeData?.data?.store ||
//           storeData?.data ||
//           storeData

//         if (!foundStore) {
//           throw new Error(
//             'Store not found.'
//           )
//         }

//         // ------------------------------------------------------
//         // Attach backend metadata to store
//         // ------------------------------------------------------

//         const normalizedStore = {
//           ...foundStore,

//           storeId:
//             foundStore.storeId ||
//             storeData?.storeId ||
//             foundStore._id,

//           storeMongoId:
//             storeData?.storeMongoId ||
//             foundStore._id,

//           storeName:
//             foundStore.name ||
//             foundStore.storeName ||
//             storeData?.storeName ||
//             'Fegegta Store',

//           storeSlug:
//             foundStore.slug ||
//             foundStore.storeSlug ||
//             storeData?.storeSlug ||
//             slug,

//           sellerId:
//             foundStore.seller?.sellerId ||
//             storeData?.sellerId ||
//             foundStore.sellerId ||
//             '',

//           sellerMongoId:
//             storeData?.sellerMongoId ||
//             getId(foundStore.seller),
//         }

//         setStore(normalizedStore)

//         // ======================================================
//         // GET PUBLIC PRODUCTS
//         // ======================================================

//         const productsResponse =
//           await fetch(
//             `${API_URL}/products`
//           )

//         let productsData = null

//         try {
//           productsData =
//             await productsResponse.json()
//         } catch {
//           productsData = null
//         }

//         if (!productsResponse.ok) {
//           throw new Error(
//             productsData?.message ||
//               'Unable to load store products.'
//           )
//         }

//         if (cancelled) {
//           return
//         }

//         // ------------------------------------------------------
//         // SUPPORT DIFFERENT PRODUCT RESPONSE SHAPES
//         // ------------------------------------------------------

//         const allProducts =
//           productsData?.products ||
//           productsData?.data?.products ||
//           productsData?.data ||
//           (Array.isArray(productsData)
//             ? productsData
//             : [])

//         // ======================================================
//         // FILTER STORE PRODUCTS
//         // ======================================================

//         const storeProducts =
//           allProducts.filter(
//             (product) => {
//               // ------------------------------------------------
//               // SAME STORE
//               // ------------------------------------------------

//               const sameStore =
//                 productBelongsToStore(
//                   product,
//                   normalizedStore
//                 )

//               // ------------------------------------------------
//               // APPROVED
//               // ------------------------------------------------

//               const approved =
//                 product.approvalStatus ===
//                   'approved' ||
//                 product.status ===
//                   'approved'

//               // ------------------------------------------------
//               // ACTIVE
//               // ------------------------------------------------

//               const active =
//                 product.isActive !== false

//               // ------------------------------------------------
//               // STOCK
//               // ------------------------------------------------

//               const inStock =
//                 product.stock ===
//                   undefined ||
//                 product.stock === null ||
//                 Number(product.stock) > 0

//               return (
//                 sameStore &&
//                 approved &&
//                 active &&
//                 inStock
//               )
//             }
//           )

//         setProducts(
//           storeProducts
//         )
//       } catch (err) {
//         if (cancelled) {
//           return
//         }

//         console.error(
//           'Seller store loading error:',
//           err
//         )

//         setError(
//           err?.message ||
//             'Something went wrong while loading this store.'
//         )

//         setStore(null)
//         setProducts([])
//       } finally {
//         if (!cancelled) {
//           setLoading(false)
//         }
//       }
//     }

//     loadStore()

//     return () => {
//       cancelled = true
//     }
//   }, [slug])

//   // ==========================================================
//   // SEARCH + SORT
//   // ==========================================================

//   const visibleProducts =
//     useMemo(() => {
//       const query =
//         search
//           .trim()
//           .toLowerCase()

//       let result =
//         products.filter(
//           (product) => {
//             if (!query) {
//               return true
//             }

//             return (
//               product.name
//                 ?.toLowerCase()
//                 .includes(query) ||
//               product.category
//                 ?.toLowerCase()
//                 .includes(query) ||
//               product.subcategory
//                 ?.toLowerCase()
//                 .includes(query) ||
//               product.description
//                 ?.toLowerCase()
//                 .includes(query)
//             )
//           }
//         )

//       // ------------------------------------------------------
//       // FEATURED
//       // ------------------------------------------------------

//       if (
//         sort === 'featured'
//       ) {
//         result =
//           [...result].sort(
//             (a, b) => {
//               const aFeatured =
//                 a.isFeatured === true
//                   ? 1
//                   : 0

//               const bFeatured =
//                 b.isFeatured === true
//                   ? 1
//                   : 0

//               return (
//                 bFeatured -
//                 aFeatured
//               )
//             }
//           )
//       }

//       // ------------------------------------------------------
//       // PRICE LOW
//       // ------------------------------------------------------

//       if (
//         sort === 'price-low'
//       ) {
//         result =
//           [...result].sort(
//             (a, b) =>
//               Number(
//                 a.price || 0
//               ) -
//               Number(
//                 b.price || 0
//               )
//           )
//       }

//       // ------------------------------------------------------
//       // PRICE HIGH
//       // ------------------------------------------------------

//       if (
//         sort === 'price-high'
//       ) {
//         result =
//           [...result].sort(
//             (a, b) =>
//               Number(
//                 b.price || 0
//               ) -
//               Number(
//                 a.price || 0
//               )
//           )
//       }

//       // ------------------------------------------------------
//       // NEWEST
//       // ------------------------------------------------------

//       if (
//         sort === 'newest'
//       ) {
//         result =
//           [...result].sort(
//             (a, b) =>
//               new Date(
//                 b.createdAt ||
//                   b.submittedAt ||
//                   0
//               ) -
//               new Date(
//                 a.createdAt ||
//                   a.submittedAt ||
//                   0
//               )
//           )
//       }

//       return result
//     }, [
//       products,
//       search,
//       sort,
//     ])

//   // ==========================================================
//   // FAVORITE
//   // ==========================================================

//   const toggleFavorite = (
//     productId
//   ) => {
//     setFavorites(
//       (previous) =>
//         previous.includes(
//           productId
//         )
//           ? previous.filter(
//               (id) =>
//                 id !== productId
//             )
//           : [
//               ...previous,
//               productId,
//             ]
//     )
//   }

//   // ==========================================================
//   // SHARE STORE
//   // ==========================================================

//   const handleShare =
//     async () => {
//       const url =
//         window.location.href

//       const currentStoreName =
//         store?.name ||
//         store?.storeName ||
//         'Fegegta Store'

//       if (
//         navigator.share
//       ) {
//         try {
//           await navigator.share({
//             title:
//               currentStoreName,

//             text:
//               `Visit ${currentStoreName} on Fegegta.`,

//             url,
//           })
//         } catch (
//           shareError
//         ) {
//           if (
//             shareError?.name !==
//             'AbortError'
//           ) {
//             console.error(
//               'Share failed:',
//               shareError
//             )
//           }
//         }

//         return
//       }

//       try {
//         await navigator.clipboard.writeText(
//           url
//         )

//         alert(
//           'Store link copied.'
//         )
//       } catch {
//         alert(url)
//       }
//     }

//   // ==========================================================
//   // LOADING
//   // ==========================================================

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
//         <div className="text-center">
//           <Loader2 className="mx-auto h-10 w-10 animate-spin text-gray-700" />

//           <p className="mt-4 text-sm text-gray-500">
//             Loading store...
//           </p>
//         </div>
//       </div>
//     )
//   }

//   // ==========================================================
//   // STORE NOT FOUND / ERROR
//   // ==========================================================

//   if (!store) {
//     return (
//       <div className="min-h-screen bg-gray-50 px-4 py-16">
//         <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">

//           <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
//             <AlertCircle className="h-7 w-7 text-red-500" />
//           </div>

//           <h1 className="mt-5 text-2xl font-bold text-gray-900">
//             Store Not Found
//           </h1>

//           <p className="mt-2 text-gray-500">
//             {error ||
//               'This store does not exist or is not publicly available.'}
//           </p>

//           <Link
//             to="/products"
//             className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
//           >
//             Browse Products
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // ==========================================================
//   // NORMALIZE STORE DATA
//   // ==========================================================

//   const storeId =
//     getStorePublicId(store)

//   const sellerId =
//     getSellerPublicId(store)

//   const storeName =
//     store.name ||
//     store.storeName ||
//     'Fegegta Store'

//   const storeDescription =
//     store.description ||
//     store.storeDescription ||
//     'Welcome to our store.'

//   const storeLogo =
//     getImageUrl(
//       store.logo
//     ) ||
//     getImageUrl(
//       store.logoUrl
//     )

//   const storeCover =
//     getImageUrl(
//       store.banner
//     ) ||
//     getImageUrl(
//       store.coverImage
//     ) ||
//     getImageUrl(
//       store.cover
//     )

//   const storeCategory =
//     store.category ||
//     store.storeCategory ||
//     store.productType ||
//     ''

//   // ----------------------------------------------------------
//   // VERIFIED
//   //
//   // Store schema does not currently contain "verified".
//   // If backend provides it, use it.
//   //
//   // Otherwise an approved/active seller can still be shown
//   // without incorrectly inventing a verification status.
//   // ----------------------------------------------------------

//   const verified =
//     store.verified === true

//   // ==========================================================
//   // RENDER
//   // ==========================================================

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* ======================================================
//           COVER
//       ====================================================== */}

//       <section className="relative h-56 overflow-hidden bg-gray-900 sm:h-72">

//         {storeCover ? (
//           <img
//             src={storeCover}
//             alt={storeName}
//             className="h-full w-full object-cover"
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center">
//             <Store className="h-16 w-16 text-gray-600" />
//           </div>
//         )}

//         <div className="absolute inset-0 bg-black/40" />
//       </section>

//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//         {/* ====================================================
//             STORE HEADER
//         ==================================================== */}

//         <section className="relative -mt-12 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">

//           <div className="flex flex-col gap-5 md:flex-row md:items-center">

//             {/* LOGO */}

//             <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-gray-100 shadow-md">

//               {storeLogo ? (
//                 <img
//                   src={storeLogo}
//                   alt={storeName}
//                   className="h-full w-full object-cover"
//                 />
//               ) : (
//                 <Store className="h-10 w-10 text-gray-400" />
//               )}

//             </div>

//             {/* STORE INFORMATION */}

//             <div className="min-w-0 flex-1">

//               <div className="flex flex-wrap items-center gap-2">

//                 <h1 className="text-2xl font-bold text-gray-900">
//                   {storeName}
//                 </h1>

//                 {verified && (
//                   <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
//                     <CheckCircle2 className="h-3.5 w-3.5" />
//                     Verified
//                   </span>
//                 )}

//               </div>

//               <p className="mt-2 text-sm text-gray-500">
//                 {storeDescription}
//               </p>

//               {storeCategory && (
//                 <p className="mt-2 text-xs font-medium text-gray-400">
//                   {storeCategory}
//                 </p>
//               )}

//               {/* ------------------------------------------------
//                   STORE / SELLER IDs
//               ------------------------------------------------ */}

//               <div className="mt-3 flex flex-wrap gap-2">

//                 {storeId && (
//                   <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">
//                     Store ID: {storeId}
//                   </span>
//                 )}

//                 {sellerId && (
//                   <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">
//                     Seller ID: {sellerId}
//                   </span>
//                 )}

//               </div>

//             </div>

//             {/* SHARE */}

//             <button
//               type="button"
//               onClick={handleShare}
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800"
//             >
//               <Share2 className="h-4 w-4" />
//               Share Store
//             </button>

//           </div>
//         </section>

//         {/* ====================================================
//             PRODUCTS
//         ==================================================== */}

//         <section className="py-8">

//           {/* HEADER */}

//           <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//             <div>
//               <h2 className="text-xl font-bold">
//                 Store Products
//               </h2>

//               <p className="mt-1 text-sm text-gray-500">
//                 {visibleProducts.length}{' '}
//                 approved products
//               </p>
//             </div>

//             <div className="flex flex-col gap-3 sm:flex-row">

//               {/* SEARCH */}

//               <div className="relative">

//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

//                 <input
//                   value={search}
//                   onChange={(event) =>
//                     setSearch(
//                       event.target.value
//                     )
//                   }
//                   placeholder="Search products..."
//                   className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-black sm:w-64"
//                 />

//               </div>

//               {/* SORT */}

//               <select
//                 value={sort}
//                 onChange={(event) =>
//                   setSort(
//                     event.target.value
//                   )
//                 }
//                 className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
//               >

//                 <option value="featured">
//                   Featured
//                 </option>

//                 <option value="newest">
//                   Newest
//                 </option>

//                 <option value="price-low">
//                   Price: Low to High
//                 </option>

//                 <option value="price-high">
//                   Price: High to Low
//                 </option>

//               </select>

//             </div>
//           </div>

//           {/* ==================================================
//               NO PRODUCTS
//           ================================================== */}

//           {visibleProducts.length === 0 ? (

//             <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-12 text-center">

//               <Store className="mx-auto h-12 w-12 text-gray-400" />

//               <h3 className="mt-4 font-bold">
//                 No products found
//               </h3>

//               <p className="mt-1 text-sm text-gray-500">
//                 This store currently has no approved products matching your search.
//               </p>

//             </div>

//           ) : (

//             /* =================================================
//                PRODUCT GRID
//             ================================================= */

//             <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

//               {visibleProducts.map(
//                 (product) => {

//                   const productId =
//                     getId(
//                       product._id
//                     ) ||
//                     getId(
//                       product.id
//                     )

//                   const isFavorite =
//                     favorites.includes(
//                       productId
//                     )

//                   // --------------------------------------------
//                   // PRODUCT IMAGES
//                   // --------------------------------------------

//                   let productImages = []

//                   if (
//                     Array.isArray(
//                       product.images
//                     )
//                   ) {
//                     productImages =
//                       product.images
//                         .map(
//                           getImageUrl
//                         )
//                         .filter(
//                           Boolean
//                         )
//                   }

//                   if (
//                     productImages.length ===
//                       0 &&
//                     product.image
//                   ) {
//                     const image =
//                       getImageUrl(
//                         product.image
//                       )

//                     if (image) {
//                       productImages = [
//                         image,
//                       ]
//                     }
//                   }

//                   const mainImage =
//                     productImages[0] ||
//                     ''

//                   // --------------------------------------------
//                   // OLD PRICE
//                   // --------------------------------------------

//                   const oldPrice =
//                     product.oldPrice ??
//                     product.compareAtPrice

//                   const productUrl =
//                     `/products/${encodeURIComponent(
//                       productId
//                     )}`

//                   return (
//                     <article
//                       key={productId}
//                       className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//                     >

//                       {/* IMAGE */}

//                       <Link
//                         to={productUrl}
//                         className="block"
//                       >

//                         <div className="relative aspect-square bg-gray-100">

//                           {mainImage ? (
//                             <img
//                               src={mainImage}
//                               alt={
//                                 product.name ||
//                                 'Product'
//                               }
//                               className="h-full w-full object-cover"
//                               loading="lazy"
//                             />
//                           ) : (
//                             <div className="flex h-full items-center justify-center text-gray-400">
//                               No Image
//                             </div>
//                           )}

//                           {/* IMAGE COUNT */}

//                           <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-gray-700 shadow-sm">
//                             {productImages.length}/4{' '}
//                             images
//                           </div>

//                           {/* FAVORITE */}

//                           <button
//                             type="button"
//                             onClick={(event) => {
//                               event.preventDefault()
//                               event.stopPropagation()

//                               toggleFavorite(
//                                 productId
//                               )
//                             }}
//                             className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm"
//                             aria-label={
//                               isFavorite
//                                 ? 'Remove from favorites'
//                                 : 'Add to favorites'
//                             }
//                           >

//                             <Heart
//                               className={`h-4 w-4 ${
//                                 isFavorite
//                                   ? 'fill-red-500 text-red-500'
//                                   : 'text-gray-700'
//                               }`}
//                             />

//                           </button>

//                         </div>
//                       </Link>

//                       {/* PRODUCT INFO */}

//                       <div className="p-4">

//                         <Link
//                           to={productUrl}
//                           className="block"
//                         >

//                           <h3 className="line-clamp-2 text-sm font-semibold hover:underline">
//                             {product.name}
//                           </h3>

//                           {product.category && (
//                             <p className="mt-1 text-xs text-gray-400">
//                               {product.category}
//                             </p>
//                           )}

//                           <p className="mt-2 font-bold">
//                             €
//                             {Number(
//                               product.price ||
//                                 0
//                             ).toFixed(2)}
//                           </p>

//                           {oldPrice &&
//                             Number(
//                               oldPrice
//                             ) >
//                               Number(
//                                 product.price ||
//                                   0
//                               ) && (
//                               <p className="text-xs text-gray-400 line-through">
//                                 €
//                                 {Number(
//                                   oldPrice
//                                 ).toFixed(2)}
//                               </p>
//                             )}

//                         </Link>

//                         {/* ADD TO CART */}

//                         <button
//                           type="button"
//                           onClick={() =>
//                             addToCart({
//                               ...product,

//                               id: productId,

//                               // ------------------------------------------------
//                               // Human-readable IDs from backend
//                               // ------------------------------------------------

//                               sellerId,

//                               storeId,

//                               storeSlug:
//                                 store.slug ||
//                                 store.storeSlug ||
//                                 slug,

//                               storeName,
//                             })
//                           }
//                           className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white hover:bg-gray-800"
//                         >
//                           <ShoppingCart className="h-4 w-4" />
//                           Add to Cart
//                         </button>

//                       </div>
//                     </article>
//                   )
//                 }
//               )}

//             </div>
//           )}

//         </section>
//       </div>
//     </div>
//   )
// }

// export default SellerStore



// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from 'react'

// import {
//   Link,
//   useParams,
// } from 'react-router-dom'

// import {
//   ArrowLeft,
//   CheckCircle2,
//   Heart,
//   Search,
//   Share2,
//   ShoppingCart,
//   Store,
//   Loader2,
//   AlertCircle,
// } from 'lucide-react'

// import { useCart } from '../../context/CartContext'

// // ============================================================
// // API
// // ============================================================

// const API_URL =
//   'https://fegegta-server.onrender.com/api'

// // ============================================================
// // HELPERS
// // ============================================================

// const getId = (value) => {
//   if (!value) return ''

//   if (typeof value === 'string') {
//     return value
//   }

//   if (typeof value === 'object') {
//     return (
//       value._id ||
//       value.id ||
//       ''
//     )
//   }

//   return ''
// }

// // ============================================================
// // HUMAN-READABLE STORE ID
// // ============================================================

// const getStorePublicId = (store) => {
//   if (!store) return ''

//   return (
//     store.storeId ||
//     getId(store._id) ||
//     getId(store.id) ||
//     ''
//   )
// }

// // ============================================================
// // HUMAN-READABLE SELLER ID
// // ============================================================

// const getSellerPublicId = (store) => {
//   if (!store) return ''

//   // ----------------------------------------------------------
//   // If seller is populated
//   // ----------------------------------------------------------

//   if (
//     store.seller &&
//     typeof store.seller === 'object'
//   ) {
//     return (
//       store.seller.sellerId ||
//       getId(store.seller._id) ||
//       getId(store.seller.id) ||
//       ''
//     )
//   }

//   // ----------------------------------------------------------
//   // If backend already returned sellerId
//   // ----------------------------------------------------------

//   if (store.sellerId) {
//     return store.sellerId
//   }

//   return getId(store.seller)
// }

// // ============================================================
// // IMAGE URL
// // ============================================================

// const getImageUrl = (image) => {
//   if (!image) return ''

//   if (typeof image === 'string') {
//     return image
//   }

//   if (typeof image === 'object') {
//     return (
//       image.url ||
//       image.secure_url ||
//       image.path ||
//       image.src ||
//       ''
//     )
//   }

//   return ''
// }

// // ============================================================
// // PRODUCT STORE ID
// //
// // Supports:
// // product.store = ObjectId
// // product.store = populated Store
// // product.storeId = MongoDB ObjectId
// // product.storeId = FEG-STORE-XXXXXX
// // ============================================================

// const getProductStoreIds = (product) => {
//   if (!product) {
//     return []
//   }

//   const ids = []

//   // ----------------------------------------------------------
//   // product.store
//   // ----------------------------------------------------------

//   if (product.store) {
//     if (
//       typeof product.store === 'object'
//     ) {
//       if (product.store.storeId) {
//         ids.push(
//           String(product.store.storeId)
//         )
//       }

//       if (product.store._id) {
//         ids.push(
//           String(product.store._id)
//         )
//       }

//       if (product.store.id) {
//         ids.push(
//           String(product.store.id)
//         )
//       }
//     } else {
//       ids.push(
//         String(product.store)
//       )
//     }
//   }

//   // ----------------------------------------------------------
//   // product.storeId
//   // ----------------------------------------------------------

//   if (product.storeId) {
//     if (
//       typeof product.storeId === 'object'
//     ) {
//       if (product.storeId.storeId) {
//         ids.push(
//           String(product.storeId.storeId)
//         )
//       }

//       if (product.storeId._id) {
//         ids.push(
//           String(product.storeId._id)
//         )
//       }

//       if (product.storeId.id) {
//         ids.push(
//           String(product.storeId.id)
//         )
//       }
//     } else {
//       ids.push(
//         String(product.storeId)
//       )
//     }
//   }

//   return ids.filter(Boolean)
// }

// // ============================================================
// // CHECK PRODUCT BELONGS TO STORE
// // ============================================================

// const productBelongsToStore = (
//   product,
//   store
// ) => {
//   if (!product || !store) {
//     return false
//   }

//   const storeIds = [
//     store.storeId,
//     store._id,
//     store.id,
//   ]
//     .filter(Boolean)
//     .map(String)

//   const productStoreIds =
//     getProductStoreIds(product)

//   return productStoreIds.some(
//     (productStoreId) =>
//       storeIds.includes(
//         String(productStoreId)
//       )
//   )
// }

// // ============================================================
// // SELLER STORE
// // ============================================================

// function SellerStore() {
//   const { slug } = useParams()

//   const { addToCart } = useCart()

//   const [store, setStore] =
//     useState(null)

//   const [products, setProducts] =
//     useState([])

//   const [loading, setLoading] =
//     useState(true)

//   const [error, setError] =
//     useState('')

//   const [search, setSearch] =
//     useState('')

//   const [sort, setSort] =
//     useState('featured')

//   const [favorites, setFavorites] =
//     useState([])

//   // ==========================================================
//   // LOAD STORE + PRODUCTS
//   // ==========================================================

//   useEffect(() => {
//     let cancelled = false

//     const loadStore = async () => {
//       try {
//         setLoading(true)
//         setError('')
//         setStore(null)
//         setProducts([])

//         // ------------------------------------------------------
//         // CHECK SLUG
//         // ------------------------------------------------------

//         if (!slug) {
//           setError(
//             'Store slug is missing.'
//           )

//           return
//         }

//         // ======================================================
//         // GET STORE BY SLUG
//         // ======================================================

//         const storeUrl =
//           `${API_URL}/stores/slug/${encodeURIComponent(
//             slug
//           )}`

//         const storeResponse =
//           await fetch(storeUrl)

//         let storeData = null

//         try {
//           storeData =
//             await storeResponse.json()
//         } catch {
//           storeData = null
//         }

//         if (!storeResponse.ok) {
//           throw new Error(
//             storeData?.message ||
//               'Unable to load this store.'
//           )
//         }

//         if (cancelled) {
//           return
//         }

//         // ------------------------------------------------------
//         // SUPPORT BACKEND RESPONSE
//         //
//         // Expected backend:
//         //
//         // {
//         //   store,
//         //   storeId,
//         //   storeMongoId,
//         //   storeName,
//         //   storeSlug,
//         //   sellerId,
//         //   sellerMongoId,
//         //   seller
//         // }
//         // ------------------------------------------------------

//         const foundStore =
//           storeData?.store ||
//           storeData?.data?.store ||
//           storeData?.data ||
//           storeData

//         if (!foundStore) {
//           throw new Error(
//             'Store not found.'
//           )
//         }

//         // ------------------------------------------------------
//         // Attach backend metadata to store
//         // ------------------------------------------------------

//         const normalizedStore = {
//           ...foundStore,

//           storeId:
//             foundStore.storeId ||
//             storeData?.storeId ||
//             foundStore._id,

//           storeMongoId:
//             storeData?.storeMongoId ||
//             foundStore._id,

//           storeName:
//             foundStore.name ||
//             foundStore.storeName ||
//             storeData?.storeName ||
//             'Fegegta Store',

//           storeSlug:
//             foundStore.slug ||
//             foundStore.storeSlug ||
//             storeData?.storeSlug ||
//             slug,

//           sellerId:
//             foundStore.seller?.sellerId ||
//             storeData?.sellerId ||
//             foundStore.sellerId ||
//             '',

//           sellerMongoId:
//             storeData?.sellerMongoId ||
//             getId(foundStore.seller),
//         }

//         setStore(normalizedStore)

//         // ======================================================
//         // GET PUBLIC PRODUCTS
//         // ======================================================

//         const productsResponse =
//           await fetch(
//             `${API_URL}/products`
//           )

//         let productsData = null

//         try {
//           productsData =
//             await productsResponse.json()
//         } catch {
//           productsData = null
//         }

//         if (!productsResponse.ok) {
//           throw new Error(
//             productsData?.message ||
//               'Unable to load store products.'
//           )
//         }

//         if (cancelled) {
//           return
//         }

//         // ------------------------------------------------------
//         // SUPPORT DIFFERENT PRODUCT RESPONSE SHAPES
//         // ------------------------------------------------------

//         const allProducts =
//           productsData?.products ||
//           productsData?.data?.products ||
//           productsData?.data ||
//           (Array.isArray(productsData)
//             ? productsData
//             : [])

//         // ======================================================
//         // FILTER STORE PRODUCTS
//         // ======================================================

//         const storeProducts =
//           allProducts.filter(
//             (product) => {
//               // ------------------------------------------------
//               // SAME STORE
//               // ------------------------------------------------

//               const sameStore =
//                 productBelongsToStore(
//                   product,
//                   normalizedStore
//                 )

//               // ------------------------------------------------
//               // APPROVED
//               // ------------------------------------------------

//               const approved =
//                 product.approvalStatus ===
//                   'approved' ||
//                 product.status ===
//                   'approved'

//               // ------------------------------------------------
//               // ACTIVE
//               // ------------------------------------------------

//               const active =
//                 product.isActive !== false

//               // ------------------------------------------------
//               // STOCK
//               // ------------------------------------------------

//               const inStock =
//                 product.stock ===
//                   undefined ||
//                 product.stock === null ||
//                 Number(product.stock) > 0

//               return (
//                 sameStore &&
//                 approved &&
//                 active &&
//                 inStock
//               )
//             }
//           )

//         setProducts(
//           storeProducts
//         )
//       } catch (err) {
//         if (cancelled) {
//           return
//         }

//         console.error(
//           'Seller store loading error:',
//           err
//         )

//         setError(
//           err?.message ||
//             'Something went wrong while loading this store.'
//         )

//         setStore(null)
//         setProducts([])
//       } finally {
//         if (!cancelled) {
//           setLoading(false)
//         }
//       }
//     }

//     loadStore()

//     return () => {
//       cancelled = true
//     }
//   }, [slug])

//   // ==========================================================
//   // SEARCH + SORT
//   // ==========================================================

//   const visibleProducts =
//     useMemo(() => {
//       const query =
//         search
//           .trim()
//           .toLowerCase()

//       let result =
//         products.filter(
//           (product) => {
//             if (!query) {
//               return true
//             }

//             return (
//               product.name
//                 ?.toLowerCase()
//                 .includes(query) ||
//               product.category
//                 ?.toLowerCase()
//                 .includes(query) ||
//               product.subcategory
//                 ?.toLowerCase()
//                 .includes(query) ||
//               product.description
//                 ?.toLowerCase()
//                 .includes(query)
//             )
//           }
//         )

//       // ------------------------------------------------------
//       // FEATURED
//       // ------------------------------------------------------

//       if (
//         sort === 'featured'
//       ) {
//         result =
//           [...result].sort(
//             (a, b) => {
//               const aFeatured =
//                 a.isFeatured === true
//                   ? 1
//                   : 0

//               const bFeatured =
//                 b.isFeatured === true
//                   ? 1
//                   : 0

//               return (
//                 bFeatured -
//                 aFeatured
//               )
//             }
//           )
//       }

//       // ------------------------------------------------------
//       // PRICE LOW
//       // ------------------------------------------------------

//       if (
//         sort === 'price-low'
//       ) {
//         result =
//           [...result].sort(
//             (a, b) =>
//               Number(
//                 a.price || 0
//               ) -
//               Number(
//                 b.price || 0
//               )
//           )
//       }

//       // ------------------------------------------------------
//       // PRICE HIGH
//       // ------------------------------------------------------

//       if (
//         sort === 'price-high'
//       ) {
//         result =
//           [...result].sort(
//             (a, b) =>
//               Number(
//                 b.price || 0
//               ) -
//               Number(
//                 a.price || 0
//               )
//           )
//       }

//       // ------------------------------------------------------
//       // NEWEST
//       // ------------------------------------------------------

//       if (
//         sort === 'newest'
//       ) {
//         result =
//           [...result].sort(
//             (a, b) =>
//               new Date(
//                 b.createdAt ||
//                   b.submittedAt ||
//                   0
//               ) -
//               new Date(
//                 a.createdAt ||
//                   a.submittedAt ||
//                   0
//               )
//           )
//       }

//       return result
//     }, [
//       products,
//       search,
//       sort,
//     ])

//   // ==========================================================
//   // FAVORITE
//   // ==========================================================

//   const toggleFavorite = (
//     productId
//   ) => {
//     setFavorites(
//       (previous) =>
//         previous.includes(
//           productId
//         )
//           ? previous.filter(
//               (id) =>
//                 id !== productId
//             )
//           : [
//               ...previous,
//               productId,
//             ]
//     )
//   }

//   // ==========================================================
//   // SHARE STORE
//   // ==========================================================

//   const handleShare =
//     async () => {
//       const url =
//         window.location.href

//       const currentStoreName =
//         store?.name ||
//         store?.storeName ||
//         'Fegegta Store'

//       if (
//         navigator.share
//       ) {
//         try {
//           await navigator.share({
//             title:
//               currentStoreName,

//             text:
//               `Visit ${currentStoreName} on Fegegta.`,

//             url,
//           })
//         } catch (
//           shareError
//         ) {
//           if (
//             shareError?.name !==
//             'AbortError'
//           ) {
//             console.error(
//               'Share failed:',
//               shareError
//             )
//           }
//         }

//         return
//       }

//       try {
//         await navigator.clipboard.writeText(
//           url
//         )

//         alert(
//           'Store link copied.'
//         )
//       } catch {
//         alert(url)
//       }
//     }

//   // ==========================================================
//   // LOADING
//   // ==========================================================

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
//         <div className="text-center">
//           <Loader2 className="mx-auto h-10 w-10 animate-spin text-gray-700" />

//           <p className="mt-4 text-sm text-gray-500">
//             Loading store...
//           </p>
//         </div>
//       </div>
//     )
//   }

//   // ==========================================================
//   // STORE NOT FOUND / ERROR
//   // ==========================================================

//   if (!store) {
//     return (
//       <div className="min-h-screen bg-gray-50 px-4 py-16">
//         <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">

//           <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
//             <AlertCircle className="h-7 w-7 text-red-500" />
//           </div>

//           <h1 className="mt-5 text-2xl font-bold text-gray-900">
//             Store Not Found
//           </h1>

//           <p className="mt-2 text-gray-500">
//             {error ||
//               'This store does not exist or is not publicly available.'}
//           </p>

//           <Link
//             to="/products"
//             className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
//           >
//             Browse Products
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // ==========================================================
//   // NORMALIZE STORE DATA
//   // ==========================================================

//   const storeId =
//     getStorePublicId(store)

//   const sellerId =
//     getSellerPublicId(store)

//   const storeName =
//     store.name ||
//     store.storeName ||
//     'Fegegta Store'

//   const storeDescription =
//     store.description ||
//     store.storeDescription ||
//     'Welcome to our store.'

//   const storeLogo =
//     getImageUrl(
//       store.logo
//     ) ||
//     getImageUrl(
//       store.logoUrl
//     )

//   const storeCover =
//     getImageUrl(
//       store.banner
//     ) ||
//     getImageUrl(
//       store.coverImage
//     ) ||
//     getImageUrl(
//       store.cover
//     )

//   const storeCategory =
//     store.category ||
//     store.storeCategory ||
//     store.productType ||
//     ''

//   // ----------------------------------------------------------
//   // VERIFIED
//   //
//   // Store schema does not currently contain "verified".
//   // If backend provides it, use it.
//   //
//   // Otherwise an approved/active seller can still be shown
//   // without incorrectly inventing a verification status.
//   // ----------------------------------------------------------

//   const verified =
//     store.verified === true

//   // ==========================================================
//   // RENDER
//   // ==========================================================

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* STORE-SPECIFIC NAVIGATION */}
//       <header className="border-b border-gray-200 bg-white">
//         <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
//           <Link
//             to="/"
//             className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             <span className="hidden sm:inline">Back to Fegegta</span>
//             <span className="sm:hidden">Fegegta</span>
//           </Link>

//           <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
//             {storeLogo ? (
//               <img
//                 src={storeLogo}
//                 alt=""
//                 className="h-8 w-8 shrink-0 rounded-full object-cover"
//               />
//             ) : (
//               <Store className="h-5 w-5 shrink-0 text-gray-500" />
//             )}
//             <span className="truncate text-sm font-bold text-gray-900 sm:text-base">
//               {storeName}
//             </span>
//           </div>

//           <Link
//             to="/cart"
//             aria-label="Open cart"
//             className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
//           >
//             <ShoppingCart className="h-4 w-4" />
//             <span className="hidden sm:inline">Cart</span>
//           </Link>
//         </div>
//       </header>

//       {/* ======================================================
//           COVER
//       ====================================================== */}

//       <section className="relative h-56 overflow-hidden bg-gray-900 sm:h-72">

//         {storeCover ? (
//           <img
//             src={storeCover}
//             alt={storeName}
//             className="h-full w-full object-cover"
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center">
//             <Store className="h-16 w-16 text-gray-600" />
//           </div>
//         )}

//         <div className="absolute inset-0 bg-black/40" />
//       </section>

//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//         {/* ====================================================
//             STORE HEADER
//         ==================================================== */}

//         <section className="relative -mt-12 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">

//           <div className="flex flex-col gap-5 md:flex-row md:items-center">

//             {/* LOGO */}

//             <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-gray-100 shadow-md">

//               {storeLogo ? (
//                 <img
//                   src={storeLogo}
//                   alt={storeName}
//                   className="h-full w-full object-cover"
//                 />
//               ) : (
//                 <Store className="h-10 w-10 text-gray-400" />
//               )}

//             </div>

//             {/* STORE INFORMATION */}

//             <div className="min-w-0 flex-1">

//               <div className="flex flex-wrap items-center gap-2">

//                 <h1 className="text-2xl font-bold text-gray-900">
//                   {storeName}
//                 </h1>

//                 {verified && (
//                   <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
//                     <CheckCircle2 className="h-3.5 w-3.5" />
//                     Verified
//                   </span>
//                 )}

//               </div>

//               <p className="mt-2 text-sm text-gray-500">
//                 {storeDescription}
//               </p>

//               {storeCategory && (
//                 <p className="mt-2 text-xs font-medium text-gray-400">
//                   {storeCategory}
//                 </p>
//               )}

//               {/* ------------------------------------------------
//                   STORE / SELLER IDs
//               ------------------------------------------------ */}

//               <div className="mt-3 flex flex-wrap gap-2">

//                 {storeId && (
//                   <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">
//                     Store ID: {storeId}
//                   </span>
//                 )}

//                 {sellerId && (
//                   <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">
//                     Seller ID: {sellerId}
//                   </span>
//                 )}

//               </div>

//             </div>

//             {/* SHARE */}

//             <button
//               type="button"
//               onClick={handleShare}
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800"
//             >
//               <Share2 className="h-4 w-4" />
//               Share Store
//             </button>

//           </div>
//         </section>

//         {/* ====================================================
//             PRODUCTS
//         ==================================================== */}

//         <section className="py-8">

//           {/* HEADER */}

//           <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//             <div>
//               <h2 className="text-xl font-bold">
//                 Store Products
//               </h2>

//               <p className="mt-1 text-sm text-gray-500">
//                 {visibleProducts.length}{' '}
//                 approved products
//               </p>
//             </div>

//             <div className="flex flex-col gap-3 sm:flex-row">

//               {/* SEARCH */}

//               <div className="relative">

//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

//                 <input
//                   value={search}
//                   onChange={(event) =>
//                     setSearch(
//                       event.target.value
//                     )
//                   }
//                   placeholder="Search products..."
//                   className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-black sm:w-64"
//                 />

//               </div>

//               {/* SORT */}

//               <select
//                 value={sort}
//                 onChange={(event) =>
//                   setSort(
//                     event.target.value
//                   )
//                 }
//                 className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
//               >

//                 <option value="featured">
//                   Featured
//                 </option>

//                 <option value="newest">
//                   Newest
//                 </option>

//                 <option value="price-low">
//                   Price: Low to High
//                 </option>

//                 <option value="price-high">
//                   Price: High to Low
//                 </option>

//               </select>

//             </div>
//           </div>

//           {/* ==================================================
//               NO PRODUCTS
//           ================================================== */}

//           {visibleProducts.length === 0 ? (

//             <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-12 text-center">

//               <Store className="mx-auto h-12 w-12 text-gray-400" />

//               <h3 className="mt-4 font-bold">
//                 No products found
//               </h3>

//               <p className="mt-1 text-sm text-gray-500">
//                 This store currently has no approved products matching your search.
//               </p>

//             </div>

//           ) : (

//             /* =================================================
//                PRODUCT GRID
//             ================================================= */

//             <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

//               {visibleProducts.map(
//                 (product) => {

//                   const productId =
//                     getId(
//                       product._id
//                     ) ||
//                     getId(
//                       product.id
//                     )

//                   const isFavorite =
//                     favorites.includes(
//                       productId
//                     )

//                   // --------------------------------------------
//                   // PRODUCT IMAGES
//                   // --------------------------------------------

//                   let productImages = []

//                   if (
//                     Array.isArray(
//                       product.images
//                     )
//                   ) {
//                     productImages =
//                       product.images
//                         .map(
//                           getImageUrl
//                         )
//                         .filter(
//                           Boolean
//                         )
//                   }

//                   if (
//                     productImages.length ===
//                       0 &&
//                     product.image
//                   ) {
//                     const image =
//                       getImageUrl(
//                         product.image
//                       )

//                     if (image) {
//                       productImages = [
//                         image,
//                       ]
//                     }
//                   }

//                   const mainImage =
//                     productImages[0] ||
//                     ''

//                   // --------------------------------------------
//                   // OLD PRICE
//                   // --------------------------------------------

//                   const oldPrice =
//                     product.oldPrice ??
//                     product.compareAtPrice

//                   const productUrl =
//                     `/products/${encodeURIComponent(
//                       productId
//                     )}`

//                   return (
//                     <article
//                       key={productId}
//                       className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//                     >

//                       {/* IMAGE */}

//                       <Link
//                         to={productUrl}
//                         className="block"
//                       >

//                         <div className="relative aspect-square bg-gray-100">

//                           {mainImage ? (
//                             <img
//                               src={mainImage}
//                               alt={
//                                 product.name ||
//                                 'Product'
//                               }
//                               className="h-full w-full object-cover"
//                               loading="lazy"
//                             />
//                           ) : (
//                             <div className="flex h-full items-center justify-center text-gray-400">
//                               No Image
//                             </div>
//                           )}

//                           {/* IMAGE COUNT */}

//                           <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-gray-700 shadow-sm">
//                             {productImages.length}/4{' '}
//                             images
//                           </div>

//                           {/* FAVORITE */}

//                           <button
//                             type="button"
//                             onClick={(event) => {
//                               event.preventDefault()
//                               event.stopPropagation()

//                               toggleFavorite(
//                                 productId
//                               )
//                             }}
//                             className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm"
//                             aria-label={
//                               isFavorite
//                                 ? 'Remove from favorites'
//                                 : 'Add to favorites'
//                             }
//                           >

//                             <Heart
//                               className={`h-4 w-4 ${
//                                 isFavorite
//                                   ? 'fill-red-500 text-red-500'
//                                   : 'text-gray-700'
//                               }`}
//                             />

//                           </button>

//                         </div>
//                       </Link>

//                       {/* PRODUCT INFO */}

//                       <div className="p-4">

//                         <Link
//                           to={productUrl}
//                           className="block"
//                         >

//                           <h3 className="line-clamp-2 text-sm font-semibold hover:underline">
//                             {product.name}
//                           </h3>

//                           {product.category && (
//                             <p className="mt-1 text-xs text-gray-400">
//                               {product.category}
//                             </p>
//                           )}

//                           <p className="mt-2 font-bold">
//                             €
//                             {Number(
//                               product.price ||
//                                 0
//                             ).toFixed(2)}
//                           </p>

//                           {oldPrice &&
//                             Number(
//                               oldPrice
//                             ) >
//                               Number(
//                                 product.price ||
//                                   0
//                               ) && (
//                               <p className="text-xs text-gray-400 line-through">
//                                 €
//                                 {Number(
//                                   oldPrice
//                                 ).toFixed(2)}
//                               </p>
//                             )}

//                         </Link>

//                         {/* ADD TO CART */}

//                         <button
//                           type="button"
//                           onClick={() =>
//                             addToCart({
//                               ...product,

//                               id: productId,

//                               // ------------------------------------------------
//                               // Human-readable IDs from backend
//                               // ------------------------------------------------

//                               sellerId,

//                               storeId,

//                               storeSlug:
//                                 store.slug ||
//                                 store.storeSlug ||
//                                 slug,

//                               storeName,
//                             })
//                           }
//                           className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white hover:bg-gray-800"
//                         >
//                           <ShoppingCart className="h-4 w-4" />
//                           Add to Cart
//                         </button>

//                       </div>
//                     </article>
//                   )
//                 }
//               )}

//             </div>
//           )}

//         </section>
//       </div>
//     </div>
//   )
// }

// export default SellerStore


import React, {
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  Link,
  useParams,
} from 'react-router-dom'

import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Heart,
  Search,
  Share2,
  ShoppingCart,
  Store,
  Loader2,
  AlertCircle,
  X,
} from 'lucide-react'

import { useCart } from '../../context/CartContext'

// ============================================================
// API
// ============================================================

const API_URL =
  'https://fegegta-server.onrender.com/api'

// ============================================================
// HELPERS
// ============================================================

const getId = (value) => {
  if (!value) return ''

  if (typeof value === 'string') {
    return value
  }

  if (typeof value === 'object') {
    return (
      value._id ||
      value.id ||
      ''
    )
  }

  return ''
}

// ============================================================
// HUMAN-READABLE STORE ID
// ============================================================

const getStorePublicId = (store) => {
  if (!store) return ''

  return (
    store.storeId ||
    getId(store._id) ||
    getId(store.id) ||
    ''
  )
}

// ============================================================
// HUMAN-READABLE SELLER ID
// ============================================================

const getSellerPublicId = (store) => {
  if (!store) return ''

  // ----------------------------------------------------------
  // If seller is populated
  // ----------------------------------------------------------

  if (
    store.seller &&
    typeof store.seller === 'object'
  ) {
    return (
      store.seller.sellerId ||
      getId(store.seller._id) ||
      getId(store.seller.id) ||
      ''
    )
  }

  // ----------------------------------------------------------
  // If backend already returned sellerId
  // ----------------------------------------------------------

  if (store.sellerId) {
    return store.sellerId
  }

  return getId(store.seller)
}

// ============================================================
// IMAGE URL
// ============================================================

const getImageUrl = (image) => {
  if (!image) return ''

  if (typeof image === 'string') {
    return image
  }

  if (typeof image === 'object') {
    return (
      image.url ||
      image.secure_url ||
      image.path ||
      image.src ||
      ''
    )
  }

  return ''
}

// ============================================================
// PRODUCT STORE ID
//
// Supports:
// product.store = ObjectId
// product.store = populated Store
// product.storeId = MongoDB ObjectId
// product.storeId = FEG-STORE-XXXXXX
// ============================================================

const getProductStoreIds = (product) => {
  if (!product) {
    return []
  }

  const ids = []

  // ----------------------------------------------------------
  // product.store
  // ----------------------------------------------------------

  if (product.store) {
    if (
      typeof product.store === 'object'
    ) {
      if (product.store.storeId) {
        ids.push(
          String(product.store.storeId)
        )
      }

      if (product.store._id) {
        ids.push(
          String(product.store._id)
        )
      }

      if (product.store.id) {
        ids.push(
          String(product.store.id)
        )
      }
    } else {
      ids.push(
        String(product.store)
      )
    }
  }

  // ----------------------------------------------------------
  // product.storeId
  // ----------------------------------------------------------

  if (product.storeId) {
    if (
      typeof product.storeId === 'object'
    ) {
      if (product.storeId.storeId) {
        ids.push(
          String(product.storeId.storeId)
        )
      }

      if (product.storeId._id) {
        ids.push(
          String(product.storeId._id)
        )
      }

      if (product.storeId.id) {
        ids.push(
          String(product.storeId.id)
        )
      }
    } else {
      ids.push(
        String(product.storeId)
      )
    }
  }

  return ids.filter(Boolean)
}

// ============================================================
// CHECK PRODUCT BELONGS TO STORE
// ============================================================

const productBelongsToStore = (
  product,
  store
) => {
  if (!product || !store) {
    return false
  }

  const storeIds = [
    store.storeId,
    store._id,
    store.id,
  ]
    .filter(Boolean)
    .map(String)

  const productStoreIds =
    getProductStoreIds(product)

  return productStoreIds.some(
    (productStoreId) =>
      storeIds.includes(
        String(productStoreId)
      )
  )
}

// ============================================================
// SELLER STORE
// ============================================================

function SellerStore() {
  const { slug } = useParams()

  const { addToCart, totalItems } = useCart()

  const [store, setStore] =
    useState(null)

  const [products, setProducts] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  const [search, setSearch] =
    useState('')

  const [sort, setSort] =
    useState('featured')

  const [favorites, setFavorites] =
    useState([])

  const [imageViewer, setImageViewer] =
    useState(null)

  const openImageViewer = (
    product,
    productId,
    images
  ) => {
    if (!images.length) return

    setImageViewer({
      productName: product.name || 'Product',
      product: {
        ...product,
        id: productId,
        sellerId,
        storeId,
        storeSlug:
          store.slug ||
          store.storeSlug ||
          slug,
        storeName,
      },
      images,
      index: 0,
    })
  }

  const changeViewerImage = (direction) => {
    setImageViewer((current) => {
      if (!current || current.images.length < 2) {
        return current
      }

      return {
        ...current,
        index:
          (current.index + direction + current.images.length) %
          current.images.length,
      }
    })
  }

  useEffect(() => {
    if (!imageViewer) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setImageViewer(null)
      if (event.key === 'ArrowLeft') changeViewerImage(-1)
      if (event.key === 'ArrowRight') changeViewerImage(1)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [imageViewer])

  // ==========================================================
  // LOAD STORE + PRODUCTS
  // ==========================================================

  useEffect(() => {
    let cancelled = false

    const loadStore = async () => {
      try {
        setLoading(true)
        setError('')
        setStore(null)
        setProducts([])

        // ------------------------------------------------------
        // CHECK SLUG
        // ------------------------------------------------------

        if (!slug) {
          setError(
            'Store slug is missing.'
          )

          return
        }

        // ======================================================
        // GET STORE BY SLUG
        // ======================================================

        const storeUrl =
          `${API_URL}/stores/slug/${encodeURIComponent(
            slug
          )}`

        const storeResponse =
          await fetch(storeUrl)

        let storeData = null

        try {
          storeData =
            await storeResponse.json()
        } catch {
          storeData = null
        }

        if (!storeResponse.ok) {
          throw new Error(
            storeData?.message ||
              'Unable to load this store.'
          )
        }

        if (cancelled) {
          return
        }

        // ------------------------------------------------------
        // SUPPORT BACKEND RESPONSE
        //
        // Expected backend:
        //
        // {
        //   store,
        //   storeId,
        //   storeMongoId,
        //   storeName,
        //   storeSlug,
        //   sellerId,
        //   sellerMongoId,
        //   seller
        // }
        // ------------------------------------------------------

        const foundStore =
          storeData?.store ||
          storeData?.data?.store ||
          storeData?.data ||
          storeData

        if (!foundStore) {
          throw new Error(
            'Store not found.'
          )
        }

        // ------------------------------------------------------
        // Attach backend metadata to store
        // ------------------------------------------------------

        const normalizedStore = {
          ...foundStore,

          storeId:
            foundStore.storeId ||
            storeData?.storeId ||
            foundStore._id,

          storeMongoId:
            storeData?.storeMongoId ||
            foundStore._id,

          storeName:
            foundStore.name ||
            foundStore.storeName ||
            storeData?.storeName ||
            'Fegegta Store',

          storeSlug:
            foundStore.slug ||
            foundStore.storeSlug ||
            storeData?.storeSlug ||
            slug,

          sellerId:
            foundStore.seller?.sellerId ||
            storeData?.sellerId ||
            foundStore.sellerId ||
            '',

          sellerMongoId:
            storeData?.sellerMongoId ||
            getId(foundStore.seller),
        }

        setStore(normalizedStore)

        // ======================================================
        // GET PUBLIC PRODUCTS
        // ======================================================

        const productsResponse =
          await fetch(
            `${API_URL}/products`
          )

        let productsData = null

        try {
          productsData =
            await productsResponse.json()
        } catch {
          productsData = null
        }

        if (!productsResponse.ok) {
          throw new Error(
            productsData?.message ||
              'Unable to load store products.'
          )
        }

        if (cancelled) {
          return
        }

        // ------------------------------------------------------
        // SUPPORT DIFFERENT PRODUCT RESPONSE SHAPES
        // ------------------------------------------------------

        const allProducts =
          productsData?.products ||
          productsData?.data?.products ||
          productsData?.data ||
          (Array.isArray(productsData)
            ? productsData
            : [])

        // ======================================================
        // FILTER STORE PRODUCTS
        // ======================================================

        const storeProducts =
          allProducts.filter(
            (product) => {
              // ------------------------------------------------
              // SAME STORE
              // ------------------------------------------------

              const sameStore =
                productBelongsToStore(
                  product,
                  normalizedStore
                )

              // ------------------------------------------------
              // APPROVED
              // ------------------------------------------------

              const approved =
                product.approvalStatus ===
                  'approved' ||
                product.status ===
                  'approved'

              // ------------------------------------------------
              // ACTIVE
              // ------------------------------------------------

              const active =
                product.isActive !== false

              // ------------------------------------------------
              // STOCK
              // ------------------------------------------------

              const inStock =
                product.stock ===
                  undefined ||
                product.stock === null ||
                Number(product.stock) > 0

              return (
                sameStore &&
                approved &&
                active &&
                inStock
              )
            }
          )

        setProducts(
          storeProducts
        )
      } catch (err) {
        if (cancelled) {
          return
        }

        console.error(
          'Seller store loading error:',
          err
        )

        setError(
          err?.message ||
            'Something went wrong while loading this store.'
        )

        setStore(null)
        setProducts([])
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadStore()

    return () => {
      cancelled = true
    }
  }, [slug])

  // ==========================================================
  // SEARCH + SORT
  // ==========================================================

  const visibleProducts =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase()

      let result =
        products.filter(
          (product) => {
            if (!query) {
              return true
            }

            return (
              product.name
                ?.toLowerCase()
                .includes(query) ||
              product.category
                ?.toLowerCase()
                .includes(query) ||
              product.subcategory
                ?.toLowerCase()
                .includes(query) ||
              product.description
                ?.toLowerCase()
                .includes(query)
            )
          }
        )

      // ------------------------------------------------------
      // FEATURED
      // ------------------------------------------------------

      if (
        sort === 'featured'
      ) {
        result =
          [...result].sort(
            (a, b) => {
              const aFeatured =
                a.isFeatured === true
                  ? 1
                  : 0

              const bFeatured =
                b.isFeatured === true
                  ? 1
                  : 0

              return (
                bFeatured -
                aFeatured
              )
            }
          )
      }

      // ------------------------------------------------------
      // PRICE LOW
      // ------------------------------------------------------

      if (
        sort === 'price-low'
      ) {
        result =
          [...result].sort(
            (a, b) =>
              Number(
                a.price || 0
              ) -
              Number(
                b.price || 0
              )
          )
      }

      // ------------------------------------------------------
      // PRICE HIGH
      // ------------------------------------------------------

      if (
        sort === 'price-high'
      ) {
        result =
          [...result].sort(
            (a, b) =>
              Number(
                b.price || 0
              ) -
              Number(
                a.price || 0
              )
          )
      }

      // ------------------------------------------------------
      // NEWEST
      // ------------------------------------------------------

      if (
        sort === 'newest'
      ) {
        result =
          [...result].sort(
            (a, b) =>
              new Date(
                b.createdAt ||
                  b.submittedAt ||
                  0
              ) -
              new Date(
                a.createdAt ||
                  a.submittedAt ||
                  0
              )
          )
      }

      return result
    }, [
      products,
      search,
      sort,
    ])

  // ==========================================================
  // FAVORITE
  // ==========================================================

  const toggleFavorite = (
    productId
  ) => {
    setFavorites(
      (previous) =>
        previous.includes(
          productId
        )
          ? previous.filter(
              (id) =>
                id !== productId
            )
          : [
              ...previous,
              productId,
            ]
    )
  }

  // ==========================================================
  // SHARE STORE
  // ==========================================================

  const handleShare =
    async () => {
      const url =
        window.location.href

      const currentStoreName =
        store?.name ||
        store?.storeName ||
        'Fegegta Store'

      if (
        navigator.share
      ) {
        try {
          await navigator.share({
            title:
              currentStoreName,

            text:
              `Visit ${currentStoreName} on Fegegta.`,

            url,
          })
        } catch (
          shareError
        ) {
          if (
            shareError?.name !==
            'AbortError'
          ) {
            console.error(
              'Share failed:',
              shareError
            )
          }
        }

        return
      }

      try {
        await navigator.clipboard.writeText(
          url
        )

        alert(
          'Store link copied.'
        )
      } catch {
        alert(url)
      }
    }

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-gray-700" />

          <p className="mt-4 text-sm text-gray-500">
            Loading store...
          </p>
        </div>
      </div>
    )
  }

  // ==========================================================
  // STORE NOT FOUND / ERROR
  // ==========================================================

  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <AlertCircle className="h-7 w-7 text-red-500" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Store Not Found
          </h1>

          <p className="mt-2 text-gray-500">
            {error ||
              'This store does not exist or is not publicly available.'}
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  // ==========================================================
  // NORMALIZE STORE DATA
  // ==========================================================

  const storeId =
    getStorePublicId(store)

  const sellerId =
    getSellerPublicId(store)

  const storeName =
    store.name ||
    store.storeName ||
    'Fegegta Store'

  const storeDescription =
    store.description ||
    store.storeDescription ||
    'Welcome to our store.'

  const storeLogo =
    getImageUrl(
      store.logo
    ) ||
    getImageUrl(
      store.logoUrl
    )

  const storeCover =
    getImageUrl(
      store.banner
    ) ||
    getImageUrl(
      store.coverImage
    ) ||
    getImageUrl(
      store.cover
    )

  const storeCategory =
    store.category ||
    store.storeCategory ||
    store.productType ||
    ''

  // ----------------------------------------------------------
  // VERIFIED
  //
  // Store schema does not currently contain "verified".
  // If backend provides it, use it.
  //
  // Otherwise an approved/active seller can still be shown
  // without incorrectly inventing a verification status.
  // ----------------------------------------------------------

  const verified =
    store.verified === true

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* STORE-SPECIFIC NAVIGATION */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Fegegta</span>
            <span className="sm:hidden">Fegegta</span>
          </Link>

          <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
            {storeLogo ? (
              <img
                src={storeLogo}
                alt=""
                className="h-8 w-8 shrink-0 rounded-full object-cover"
              />
            ) : (
              <Store className="h-5 w-5 shrink-0 text-gray-500" />
            )}
            <span className="truncate text-sm font-bold text-gray-900 sm:text-base">
              {storeName}
            </span>
          </div>

          <Link
            to="/cart"
            aria-label="Open cart"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            <span className="relative inline-flex">
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[9px] font-bold leading-none text-white">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </span>
            <span className="hidden sm:inline">Cart</span>
          </Link>
        </div>
      </header>

      {/* ======================================================
          COVER
      ====================================================== */}

      <section className="relative h-56 overflow-hidden bg-gray-900 sm:h-72">

        {storeCover ? (
          <img
            src={storeCover}
            alt={storeName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Store className="h-16 w-16 text-gray-600" />
          </div>
        )}

        <div className="absolute inset-0 bg-black/40" />
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ====================================================
            STORE HEADER
        ==================================================== */}

        <section className="relative -mt-12 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-center">

            {/* LOGO */}

            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-gray-100 shadow-md">

              {storeLogo ? (
                <img
                  src={storeLogo}
                  alt={storeName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Store className="h-10 w-10 text-gray-400" />
              )}

            </div>

            {/* STORE INFORMATION */}

            <div className="min-w-0 flex-1">

              <div className="flex flex-wrap items-center gap-2">

                <h1 className="text-2xl font-bold text-gray-900">
                  {storeName}
                </h1>

                {verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Verified
                  </span>
                )}

              </div>

              <p className="mt-2 text-sm text-gray-500">
                {storeDescription}
              </p>

              {storeCategory && (
                <p className="mt-2 text-xs font-medium text-gray-400">
                  {storeCategory}
                </p>
              )}

              {/* ------------------------------------------------
                  STORE / SELLER IDs
              ------------------------------------------------ */}

              <div className="mt-3 flex flex-wrap gap-2">

                {storeId && (
                  <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">
                    Store ID: {storeId}
                  </span>
                )}

                {sellerId && (
                  <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">
                    Seller ID: {sellerId}
                  </span>
                )}

              </div>

            </div>

            {/* SHARE */}

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              <Share2 className="h-4 w-4" />
              Share Store
            </button>

          </div>
        </section>

        {/* ====================================================
            PRODUCTS
        ==================================================== */}

        <section className="py-8">

          {/* HEADER */}

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-xl font-bold">
                Store Products
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {visibleProducts.length}{' '}
                approved products
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              {/* SEARCH */}

              <div className="relative">

                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search products..."
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-black sm:w-64"
                />

              </div>

              {/* SORT */}

              <select
                value={sort}
                onChange={(event) =>
                  setSort(
                    event.target.value
                  )
                }
                className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
              >

                <option value="featured">
                  Featured
                </option>

                <option value="newest">
                  Newest
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

              </select>

            </div>
          </div>

          {/* ==================================================
              NO PRODUCTS
          ================================================== */}

          {visibleProducts.length === 0 ? (

            <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-12 text-center">

              <Store className="mx-auto h-12 w-12 text-gray-400" />

              <h3 className="mt-4 font-bold">
                No products found
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                This store currently has no approved products matching your search.
              </p>

            </div>

          ) : (

            /* =================================================
               PRODUCT GRID
            ================================================= */

            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

              {visibleProducts.map(
                (product) => {

                  const productId =
                    getId(
                      product._id
                    ) ||
                    getId(
                      product.id
                    )

                  const isFavorite =
                    favorites.includes(
                      productId
                    )

                  // --------------------------------------------
                  // PRODUCT IMAGES
                  // --------------------------------------------

                  let productImages = []

                  if (
                    Array.isArray(
                      product.images
                    )
                  ) {
                    productImages =
                      product.images
                        .map(
                          getImageUrl
                        )
                        .filter(
                          Boolean
                        )
                  }

                  if (
                    productImages.length ===
                      0 &&
                    product.image
                  ) {
                    const image =
                      getImageUrl(
                        product.image
                      )

                    if (image) {
                      productImages = [
                        image,
                      ]
                    }
                  }

                  const mainImage =
                    productImages[0] ||
                    ''

                  // --------------------------------------------
                  // OLD PRICE
                  // --------------------------------------------

                  const oldPrice =
                    product.oldPrice ??
                    product.compareAtPrice

                  const productUrl =
                    `/products/${encodeURIComponent(
                      productId
                    )}`

                  return (
                    <article
                      key={productId}
                      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >

                      {/* IMAGE */}

                      <div className="relative aspect-square bg-gray-100">
                        <button
                          type="button"
                          onClick={() =>
                            openImageViewer(
                              product,
                              productId,
                              productImages
                            )
                          }
                          disabled={!productImages.length}
                          aria-label={`View images for ${product.name || 'product'}`}
                          className="absolute inset-0 block h-full w-full cursor-zoom-in disabled:cursor-default"
                        >
                          {mainImage ? (
                            <img
                              src={mainImage}
                              alt={product.name || 'Product'}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-gray-400">
                              No Image
                            </div>
                          )}
                        </button>

                        <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-gray-700 shadow-sm">
                          {productImages.length}/4 images
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleFavorite(productId)}
                          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm"
                          aria-label={
                            isFavorite
                              ? 'Remove from favorites'
                              : 'Add to favorites'
                          }
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              isFavorite
                                ? 'fill-red-500 text-red-500'
                                : 'text-gray-700'
                            }`}
                          />
                        </button>
                      </div>

                      {/* PRODUCT INFO */}

                      <div className="p-4">

                        <Link
                          to={productUrl}
                          className="block"
                        >

                          <h3 className="line-clamp-2 text-sm font-semibold hover:underline">
                            {product.name}
                          </h3>

                          {product.category && (
                            <p className="mt-1 text-xs text-gray-400">
                              {product.category}
                            </p>
                          )}

                          <p className="mt-2 font-bold">
                            €
                            {Number(
                              product.price ||
                                0
                            ).toFixed(2)}
                          </p>

                          {oldPrice &&
                            Number(
                              oldPrice
                            ) >
                              Number(
                                product.price ||
                                  0
                              ) && (
                              <p className="text-xs text-gray-400 line-through">
                                €
                                {Number(
                                  oldPrice
                                ).toFixed(2)}
                              </p>
                            )}

                        </Link>

                        {/* ADD TO CART */}

                        <button
                          type="button"
                          onClick={() =>
                            addToCart({
                              ...product,

                              id: productId,

                              // ------------------------------------------------
                              // Human-readable IDs from backend
                              // ------------------------------------------------

                              sellerId,

                              storeId,

                              storeSlug:
                                store.slug ||
                                store.storeSlug ||
                                slug,

                              storeName,
                            })
                          }
                          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white hover:bg-gray-800"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </button>

                      </div>
                    </article>
                  )
                }
              )}

            </div>
          )}

        </section>
      </div>

      {imageViewer && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-6"
          onClick={() => setImageViewer(null)}
          role="presentation"
        >
          <div
            className="w-full max-w-5xl"
            role="dialog"
            aria-modal="true"
            aria-label={`${imageViewer.productName} images`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-4 text-white">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold sm:text-base">
                  {imageViewer.productName}
                </p>
                <p className="mt-1 text-xs text-white/70">
                  {imageViewer.index + 1} / {imageViewer.images.length}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setImageViewer(null)}
                className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                aria-label="Close image viewer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex h-[55vh] min-h-64 items-center justify-center rounded-2xl bg-black sm:h-[68vh]">
              <img
                src={imageViewer.images[imageViewer.index]}
                alt={`${imageViewer.productName} ${imageViewer.index + 1}`}
                className="max-h-full max-w-full rounded-xl object-contain"
              />

              {imageViewer.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => changeViewerImage(-1)}
                    className="absolute left-2 rounded-full bg-white/15 p-2 text-white hover:bg-white/30 sm:left-4 sm:p-3"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => changeViewerImage(1)}
                    className="absolute right-2 rounded-full bg-white/15 p-2 text-white hover:bg-white/30 sm:right-4 sm:p-3"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {imageViewer.images.length > 1 && (
              <div className="mt-3 flex justify-center gap-2 overflow-x-auto pb-1">
                {imageViewer.images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() =>
                      setImageViewer((current) =>
                        current ? { ...current, index } : current
                      )
                    }
                    className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 sm:h-16 sm:w-16 ${
                      index === imageViewer.index
                        ? 'border-white'
                        : 'border-white/30 opacity-70 hover:opacity-100'
                    }`}
                    aria-label={`Show image ${index + 1}`}
                    aria-pressed={index === imageViewer.index}
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl bg-white p-3 sm:p-4">
              <div>
                <p className="text-xs text-gray-500">Price</p>
                <p className="mt-1 text-lg font-bold text-gray-900">
                  €{Number(imageViewer.product.price || 0).toFixed(2)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => addToCart(imageViewer.product)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SellerStore
