

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
//   Ruler,
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

//   const product = products.find(
//     (item) => item.id === id
//   )

//   const [quantity, setQuantity] = useState(1)
//   const [isFavorite, setIsFavorite] = useState(false)
//   const [addedToCart, setAddedToCart] = useState(false)

//   // =========================================================
//   // PRODUCT SIZE DATA
//   // =========================================================

//   const productType = getProductType(product)

//   const [sizeData, setSizeData] = useState(() =>
//     createDefaultSizeData(product)
//   )

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
//               <Button>
//                 {t('backToProducts')}
//               </Button>
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
//     setQuantity((current) =>
//       Math.max(1, current - 1)
//     )
//   }

//   // =========================================================
//   // SIZE DATA CHANGE
//   // =========================================================

//   const updateSizeData = (updates) => {
//     setSizeData((current) => ({
//       ...current,
//       ...updates,
//     }))
//   }

//   // =========================================================
//   // VALIDATE SIZE
//   // =========================================================

//   const validateSizeSelection = () => {
//     // Products without size requirements
//     // can be added directly.

//     if (productType === 'other') {
//       return true
//     }

//     // -------------------------------------------------------
//     // WOMEN
//     // -------------------------------------------------------

//     if (productType === 'women') {
//       if (!sizeData.size) {
//         return false
//       }

//       return true
//     }

//     // -------------------------------------------------------
//     // MEN
//     // -------------------------------------------------------

//     if (productType === 'men') {
//       if (!sizeData.size) {
//         return false
//       }

//       return true
//     }

//     // -------------------------------------------------------
//     // SHOES
//     // -------------------------------------------------------

//     if (productType === 'shoes') {
//       if (!sizeData.sizeSystem) {
//         return false
//       }

//       if (!sizeData.size) {
//         return false
//       }

//       if (!sizeData.footLength) {
//         return false
//       }

//       return true
//     }

//     // -------------------------------------------------------
//     // BAGS
//     // -------------------------------------------------------

//     if (productType === 'bags') {
//       if (!sizeData.size) {
//         return false
//       }

//       return true
//     }

//     return true
//   }

//   // =========================================================
//   // ADD TO CART
//   // =========================================================

//   const handleAddToCart = () => {
//     if (!validateSizeSelection()) {
//       return
//     }

//     addToCart(product, quantity, {
//       size: sizeData.size || '',
//       sizeSystem: sizeData.sizeSystem || '',
//       unit: sizeData.unit || 'cm',
//       sizeData,
//     })

//     setAddedToCart(true)

//     setTimeout(() => {
//       setAddedToCart(false)
//     }, 2500)
//   }

//   // =========================================================
//   // BUY NOW
//   // =========================================================

//   const handleBuyNow = () => {
//     if (!validateSizeSelection()) {
//       return
//     }

//     addToCart(product, quantity, {
//       size: sizeData.size || '',
//       sizeSystem: sizeData.sizeSystem || '',
//       unit: sizeData.unit || 'cm',
//       sizeData,
//     })

//     navigate('/checkout')
//   }

//   // =========================================================
//   // SIZE REQUIREMENT MESSAGE
//   // =========================================================

//   const needsSizeSelection =
//     productType !== 'other'

//   const sizeIsValid =
//     validateSizeSelection()

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
//               onClick={() =>
//                 setIsFavorite((current) => !current)
//               }
//               className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition ${
//                 isFavorite
//                   ? 'border-red-200 bg-red-50 text-red-500'
//                   : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-red-500'
//               }`}
//               aria-label={t('addToFavorites')}
//             >
//               <Heart
//                 className={`h-5 w-5 ${
//                   isFavorite
//                     ? 'fill-current'
//                     : ''
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
//               SIZE / MEASUREMENTS
//           ================================================= */}

//           {needsSizeSelection && product.available && (
//             <div className="mt-7 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">

//               <div className="flex items-start gap-3">

//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
//                   <Ruler className="h-5 w-5 text-gray-700" />
//                 </div>

//                 <div>
//                   <h2 className="text-base font-bold text-gray-900">
//                     {t('sizeAndMeasurements')}
//                   </h2>

//                   <p className="mt-1 text-xs leading-5 text-gray-500">
//                     {t('sizeAndMeasurementsDescription')}
//                   </p>
//                 </div>

//               </div>

//               {/* WOMEN */}

//               {productType === 'women' && (
//                 <WomenSizeSelector
//                   data={sizeData}
//                   t={t}
//                   onChange={updateSizeData}
//                 />
//               )}

//               {/* MEN */}

//               {productType === 'men' && (
//                 <MenSizeSelector
//                   data={sizeData}
//                   t={t}
//                   onChange={updateSizeData}
//                 />
//               )}

//               {/* SHOES */}

//               {productType === 'shoes' && (
//                 <ShoesSizeSelector
//                   data={sizeData}
//                   t={t}
//                   onChange={updateSizeData}
//                 />
//               )}

//               {/* BAGS */}

//               {productType === 'bags' && (
//                 <BagSizeSelector
//                   data={sizeData}
//                   t={t}
//                   onChange={updateSizeData}
//                 />
//               )}

//               {/* Required message */}

//               {!sizeIsValid && (
//                 <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-700">
//                   {productType === 'shoes'
//                     ? t('shoeSizeRequired')
//                     : t('sizeRequired')}
//                 </div>
//               )}

//             </div>
//           )}

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
//                   aria-label={t(
//                     'decreaseQuantity'
//                   )}
//                 >
//                   <Minus className="h-4 w-4" />
//                 </button>

//                 <span className="flex h-full min-w-14 items-center justify-center border-x border-gray-200 px-4 text-sm font-semibold text-gray-900">
//                   {quantity}
//                 </span>

//                 <button
//                   type="button"
//                   onClick={increaseQuantity}
//                   disabled={
//                     quantity >= product.stock
//                   }
//                   className="flex h-full w-12 items-center justify-center text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
//                   aria-label={t(
//                     'increaseQuantity'
//                   )}
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
//               disabled={
//                 !product.available ||
//                 (needsSizeSelection &&
//                   !sizeIsValid)
//               }
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
//               disabled={
//                 !product.available ||
//                 (needsSizeSelection &&
//                   !sizeIsValid)
//               }
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

//               <span>
//                 {t('addedToCart')}
//               </span>

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

// // =============================================================
// // PRODUCT TYPE DETECTION
// // =============================================================
// //
// // The future backend can provide:
// // product.type
// // product.productType
// // product.category
// //
// // For now this also works with the existing test products.

// function getProductType(product) {
//   if (!product) {
//     return 'other'
//   }

//   const value = [
//     product.type,
//     product.productType,
//     product.category,
//     product.name,
//   ]
//     .filter(Boolean)
//     .join(' ')
//     .toLowerCase()

//   // Shoes
//   if (
//     value.includes('shoe') ||
//     value.includes('sneaker') ||
//     value.includes('boot') ||
//     value.includes('footwear')
//   ) {
//     return 'shoes'
//   }

//   // Bags
//   if (
//     value.includes('bag') ||
//     value.includes('backpack') ||
//     value.includes('handbag') ||
//     value.includes('purse')
//   ) {
//     return 'bags'
//   }

//   // Women's clothing
//   if (
//     value.includes('women') ||
//     value.includes("women's") ||
//     value.includes('woman') ||
//     value.includes('dress') ||
//     value.includes('kemis') ||
//     value.includes('skirt') ||
//     value.includes('blouse')
//   ) {
//     return 'women'
//   }

//   // Men's clothing
//   if (
//     value.includes('men') ||
//     value.includes("men's") ||
//     value.includes('man') ||
//     value.includes('shirt') ||
//     value.includes('trouser') ||
//     value.includes('jacket')
//   ) {
//     return 'men'
//   }

//   return 'other'
// }

// // =============================================================
// // DEFAULT SIZE DATA
// // =============================================================

// function createDefaultSizeData(product) {
//   const type = getProductType(product)

//   if (type === 'women') {
//     return {
//       size: '',
//       unit: 'cm',
//       bust: '',
//       waist: '',
//       hips: '',
//       shoulder: '',
//       sleeveLength: '',
//       dressLength: '',
//       useCustomMeasurements: false,
//     }
//   }

//   if (type === 'men') {
//     return {
//       size: '',
//       unit: 'cm',
//       chest: '',
//       waist: '',
//       shoulder: '',
//       sleeveLength: '',
//       shirtLength: '',
//       trouserWaist: '',
//       inseam: '',
//       useCustomMeasurements: false,
//     }
//   }

//   if (type === 'shoes') {
//     return {
//       sizeSystem: 'EU',
//       size: '',
//       footLength: '',
//       unit: 'cm',
//     }
//   }

//   if (type === 'bags') {
//     return {
//       size: '',
//       unit: 'cm',
//       width: '',
//       height: '',
//       depth: '',
//       strapLength: '',
//     }
//   }

//   return {
//     size: '',
//   }
// }

// // =============================================================
// // WOMEN SIZE SELECTOR
// // =============================================================

// function WomenSizeSelector({
//   data,
//   t,
//   onChange,
// }) {
//   const sizes = [
//     'XS',
//     'S',
//     'M',
//     'L',
//     'XL',
//     'XXL',
//   ]

//   return (
//     <div className="mt-6 space-y-7">

//       <div>
//         <label className="mb-3 block text-sm font-semibold text-gray-900">
//           {t('womenSize')}
//         </label>

//         <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
//           {sizes.map((size) => (
//             <SizeButton
//               key={size}
//               value={size}
//               selected={data.size === size}
//               onClick={() =>
//                 onChange({ size })
//               }
//             />
//           ))}
//         </div>
//       </div>

//       <UnitSelector
//         value={data.unit}
//         t={t}
//         onChange={(unit) =>
//           onChange({ unit })
//         }
//       />

//       <div className="grid gap-4 sm:grid-cols-2">

//         <MeasurementInput
//           label={t('bust')}
//           value={data.bust}
//           onChange={(value) =>
//             onChange({ bust: value })
//           }
//           unit={data.unit}
//           placeholder="90"
//         />

//         <MeasurementInput
//           label={t('waist')}
//           value={data.waist}
//           onChange={(value) =>
//             onChange({ waist: value })
//           }
//           unit={data.unit}
//           placeholder="70"
//         />

//         <MeasurementInput
//           label={t('hips')}
//           value={data.hips}
//           onChange={(value) =>
//             onChange({ hips: value })
//           }
//           unit={data.unit}
//           placeholder="96"
//         />

//         <MeasurementInput
//           label={t('shoulder')}
//           value={data.shoulder}
//           onChange={(value) =>
//             onChange({ shoulder: value })
//           }
//           unit={data.unit}
//           placeholder="38"
//         />

//         <MeasurementInput
//           label={t('sleeveLength')}
//           value={data.sleeveLength}
//           onChange={(value) =>
//             onChange({
//               sleeveLength: value,
//             })
//           }
//           unit={data.unit}
//           placeholder="58"
//         />

//         <MeasurementInput
//           label={t('dressLength')}
//           value={data.dressLength}
//           onChange={(value) =>
//             onChange({
//               dressLength: value,
//             })
//           }
//           unit={data.unit}
//           placeholder="145"
//         />

//       </div>

//       <CustomMeasurementToggle
//         checked={data.useCustomMeasurements}
//         t={t}
//         onChange={(checked) =>
//           onChange({
//             useCustomMeasurements:
//               checked,
//           })
//         }
//       />

//     </div>
//   )
// }

// // =============================================================
// // MEN SIZE SELECTOR
// // =============================================================

// function MenSizeSelector({
//   data,
//   t,
//   onChange,
// }) {
//   const sizes = [
//     'S',
//     'M',
//     'L',
//     'XL',
//     'XXL',
//   ]

//   return (
//     <div className="mt-6 space-y-7">

//       <div>
//         <label className="mb-3 block text-sm font-semibold text-gray-900">
//           {t('menSize')}
//         </label>

//         <div className="grid grid-cols-5 gap-2">
//           {sizes.map((size) => (
//             <SizeButton
//               key={size}
//               value={size}
//               selected={data.size === size}
//               onClick={() =>
//                 onChange({ size })
//               }
//             />
//           ))}
//         </div>
//       </div>

//       <UnitSelector
//         value={data.unit}
//         t={t}
//         onChange={(unit) =>
//           onChange({ unit })
//         }
//       />

//       <div className="grid gap-4 sm:grid-cols-2">

//         <MeasurementInput
//           label={t('chest')}
//           value={data.chest}
//           onChange={(value) =>
//             onChange({ chest: value })
//           }
//           unit={data.unit}
//           placeholder="100"
//         />

//         <MeasurementInput
//           label={t('waist')}
//           value={data.waist}
//           onChange={(value) =>
//             onChange({ waist: value })
//           }
//           unit={data.unit}
//           placeholder="85"
//         />

//         <MeasurementInput
//           label={t('shoulder')}
//           value={data.shoulder}
//           onChange={(value) =>
//             onChange({ shoulder: value })
//           }
//           unit={data.unit}
//           placeholder="45"
//         />

//         <MeasurementInput
//           label={t('sleeveLength')}
//           value={data.sleeveLength}
//           onChange={(value) =>
//             onChange({
//               sleeveLength: value,
//             })
//           }
//           unit={data.unit}
//           placeholder="62"
//         />

//         <MeasurementInput
//           label={t('shirtLength')}
//           value={data.shirtLength}
//           onChange={(value) =>
//             onChange({
//               shirtLength: value,
//             })
//           }
//           unit={data.unit}
//           placeholder="72"
//         />

//         <MeasurementInput
//           label={t('trouserWaist')}
//           value={data.trouserWaist}
//           onChange={(value) =>
//             onChange({
//               trouserWaist: value,
//             })
//           }
//           unit={data.unit}
//           placeholder="85"
//         />

//         <MeasurementInput
//           label={t('inseam')}
//           value={data.inseam}
//           onChange={(value) =>
//             onChange({
//               inseam: value,
//             })
//           }
//           unit={data.unit}
//           placeholder="80"
//         />

//       </div>

//       <CustomMeasurementToggle
//         checked={data.useCustomMeasurements}
//         t={t}
//         onChange={(checked) =>
//           onChange({
//             useCustomMeasurements:
//               checked,
//           })
//         }
//       />

//     </div>
//   )
// }

// // =============================================================
// // SHOES
// // =============================================================

// function ShoesSizeSelector({
//   data,
//   t,
//   onChange,
// }) {
//   const shoeSizes = {
//     EU: [
//       '35',
//       '36',
//       '37',
//       '38',
//       '39',
//       '40',
//       '41',
//       '42',
//       '43',
//       '44',
//       '45',
//       '46',
//       '47',
//     ],

//     US: [
//       '4',
//       '5',
//       '6',
//       '7',
//       '8',
//       '9',
//       '10',
//       '11',
//       '12',
//       '13',
//     ],

//     UK: [
//       '3',
//       '4',
//       '5',
//       '6',
//       '7',
//       '8',
//       '9',
//       '10',
//       '11',
//       '12',
//     ],
//   }

//   const currentSystem =
//     data.sizeSystem || 'EU'

//   const availableSizes =
//     shoeSizes[currentSystem] ||
//     shoeSizes.EU

//   return (
//     <div className="mt-6 space-y-7">

//       {/* SIZE SYSTEM */}

//       <div>
//         <label className="mb-2 block text-sm font-semibold text-gray-900">
//           {t('shoeSizeSystem')}
//         </label>

//         <div className="grid grid-cols-3 gap-2">
//           {['EU', 'US', 'UK'].map(
//             (system) => (
//               <SizeButton
//                 key={system}
//                 value={system}
//                 selected={
//                   currentSystem === system
//                 }
//                 onClick={() =>
//                   onChange({
//                     sizeSystem: system,
//                     size: '',
//                   })
//                 }
//               />
//             )
//           )}
//         </div>
//       </div>

//       {/* SHOE SIZE */}

//       <div>
//         <label className="mb-2 block text-sm font-semibold text-gray-900">
//           {t('shoeSize')}
//         </label>

//         <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-7">
//           {availableSizes.map(
//             (size) => (
//               <SizeButton
//                 key={`${currentSystem}-${size}`}
//                 value={size}
//                 selected={
//                   data.size === size
//                 }
//                 onClick={() =>
//                   onChange({ size })
//                 }
//               />
//             )
//           )}
//         </div>
//       </div>

//       {/* FOOT LENGTH */}

//       <div>
//         <label className="mb-2 block text-sm font-semibold text-gray-900">
//           {t('footLength')}
//         </label>

//         <div className="grid gap-4 sm:grid-cols-[1fr_170px]">

//           <input
//             type="number"
//             min="0"
//             step="0.1"
//             value={data.footLength || ''}
//             onChange={(event) =>
//               onChange({
//                 footLength:
//                   event.target.value,
//               })
//             }
//             placeholder={
//               data.unit === 'in'
//                 ? '10.0'
//                 : '25.5'
//             }
//             className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
//           />

//           <UnitSelector
//             value={data.unit}
//             t={t}
//             onChange={(unit) =>
//               onChange({ unit })
//             }
//           />

//         </div>
//       </div>

//     </div>
//   )
// }

// // =============================================================
// // BAG
// // =============================================================

// function BagSizeSelector({
//   data,
//   t,
//   onChange,
// }) {
//   const sizes = [
//     'Small',
//     'Medium',
//     'Large',
//   ]

//   return (
//     <div className="mt-6 space-y-7">

//       <div>
//         <label className="mb-3 block text-sm font-semibold text-gray-900">
//           {t('bagSize')}
//         </label>

//         <div className="grid grid-cols-3 gap-2">
//           {sizes.map((size) => (
//             <SizeButton
//               key={size}
//               value={size}
//               selected={data.size === size}
//               onClick={() =>
//                 onChange({ size })
//               }
//             />
//           ))}
//         </div>
//       </div>

//       <UnitSelector
//         value={data.unit}
//         t={t}
//         onChange={(unit) =>
//           onChange({ unit })
//         }
//       />

//       <div className="grid gap-4 sm:grid-cols-2">

//         <MeasurementInput
//           label={t('width')}
//           value={data.width}
//           onChange={(value) =>
//             onChange({ width: value })
//           }
//           unit={data.unit}
//           placeholder="30"
//         />

//         <MeasurementInput
//           label={t('height')}
//           value={data.height}
//           onChange={(value) =>
//             onChange({ height: value })
//           }
//           unit={data.unit}
//           placeholder="40"
//         />

//         <MeasurementInput
//           label={t('depth')}
//           value={data.depth}
//           onChange={(value) =>
//             onChange({ depth: value })
//           }
//           unit={data.unit}
//           placeholder="15"
//         />

//         <MeasurementInput
//           label={t('strapLength')}
//           value={data.strapLength}
//           onChange={(value) =>
//             onChange({
//               strapLength: value,
//             })
//           }
//           unit={data.unit}
//           placeholder="90"
//         />

//       </div>

//     </div>
//   )
// }

// // =============================================================
// // UNIT SELECTOR
// // =============================================================

// function UnitSelector({
//   value,
//   t,
//   onChange,
// }) {
//   return (
//     <div>

//       <label className="mb-2 block text-xs font-medium text-gray-500">
//         {t('measurementUnit')}
//       </label>

//       <div className="grid grid-cols-2 gap-2">

//         <SizeButton
//           value="cm"
//           selected={(value || 'cm') === 'cm'}
//           onClick={() =>
//             onChange('cm')
//           }
//         />

//         <SizeButton
//           value="in"
//           selected={value === 'in'}
//           onClick={() =>
//             onChange('in')
//           }
//         />

//       </div>
//     </div>
//   )
// }

// // =============================================================
// // SIZE BUTTON
// // =============================================================

// function SizeButton({
//   value,
//   selected,
//   onClick,
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`flex h-11 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition ${
//         selected
//           ? 'border-black bg-black text-white'
//           : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
//       }`}
//     >
//       {value}
//     </button>
//   )
// }

// // =============================================================
// // MEASUREMENT INPUT
// // =============================================================

// function MeasurementInput({
//   label,
//   value,
//   onChange,
//   unit,
//   placeholder,
// }) {
//   return (
//     <div>

//       <label className="mb-2 block text-xs font-medium text-gray-600">
//         {label}
//       </label>

//       <div className="relative">

//         <input
//           type="number"
//           min="0"
//           step="0.1"
//           value={value || ''}
//           onChange={(event) =>
//             onChange(event.target.value)
//           }
//           placeholder={placeholder}
//           className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
//         />

//         <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
//           {unit || 'cm'}
//         </span>

//       </div>

//     </div>
//   )
// }

// // =============================================================
// // CUSTOM MEASUREMENTS
// // =============================================================

// function CustomMeasurementToggle({
//   checked,
//   t,
//   onChange,
// }) {
//   return (
//     <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">

//       <input
//         type="checkbox"
//         checked={checked || false}
//         onChange={(event) =>
//           onChange(event.target.checked)
//         }
//         className="mt-0.5 h-4 w-4 rounded border-gray-300"
//       />

//       <span>
//         <span className="block text-sm font-semibold text-gray-900">
//           {t('customMeasurements')}
//         </span>

//         <span className="mt-1 block text-xs leading-5 text-gray-500">
//           {t('customMeasurementsDescription')}
//         </span>
//       </span>

//     </label>
//   )
// }

// export default ProductDetails

import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import products from '../data/products'

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

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { t } = useLanguage()
  const { addToCart } = useCart()

  const product = products.find((item) => item.id === id)

  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  // =========================================================
  // PRODUCT NOT FOUND
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
            {t('productNotFoundDescription')}
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
              onClick={() => setIsFavorite((current) => !current)}
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