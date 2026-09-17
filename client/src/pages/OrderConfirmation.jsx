// import {
//   Check,
//   Mail,
//   Package,
//   ShieldCheck,
//   ShoppingBag,
//   Truck,
// } from 'lucide-react'

// import { Link, useLocation } from 'react-router-dom'

// import { useLanguage } from '../context/LanguageContext'

// function OrderConfirmation() {
//   const { t } = useLanguage()
//   const location = useLocation()

//   const order = location.state?.order

//   // ============================================================
//   // NO ORDER DATA
//   // ============================================================

//   if (!order) {
//     return (
//       <section className="min-h-[70vh] bg-gray-50 px-4 py-16">
//         <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
//           <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
//             <Package className="h-8 w-8 text-gray-500" />
//           </div>

//           <h1 className="mt-6 text-2xl font-bold text-gray-900">
//             {t('orderInformationUnavailable')}
//           </h1>

//           <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
//             {t('orderInformationUnavailableDescription')}
//           </p>

//           <Link
//             to="/products"
//             className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
//           >
//             <ShoppingBag className="h-4 w-4" />
//             {t('continueShopping')}
//           </Link>
//         </div>
//       </section>
//     )
//   }

//   const customer = order.customer || {}
//   const items = Array.isArray(order.items) ? order.items : []

//   const subtotal = Number(order.subtotal || 0)
//   const shipping = Number(order.shipping || 0)
//   const total = Number(order.total || 0)

//   return (
//     <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
//       <div className="mx-auto max-w-5xl">
//         <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
//           {/* ======================================================
//               SUCCESS HEADER
//           ======================================================= */}

//           <div className="border-b border-gray-100 px-6 py-10 text-center sm:px-10 sm:py-14">
//             {/* SUCCESS ICON */}

//             <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
//               <div className="absolute inset-0 animate-pulse rounded-full bg-emerald-100" />

//               <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-100">
//                 <Check className="h-10 w-10 stroke-[3] text-white" />
//               </div>
//             </div>

//             {/* PAYMENT SUCCESSFUL */}

//             <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
//               {t('paymentSuccessful')}
//             </p>

//             {/* THANK YOU */}

//             <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//               {t('thankYou')}{' '}
//               {customer.firstName || ''}
//             </h1>

//             {/* ORDER COMPLETED */}

//             <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
//               {t('orderCompleted')}
//             </p>

//             {/* EMAIL */}

//             <div className="mx-auto mt-7 flex max-w-xl items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-left">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
//                 <Mail className="h-5 w-5 text-emerald-600" />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-sm font-semibold text-gray-900">
//                   {t('confirmationEmail')}
//                 </p>

//                 <p className="mt-1 break-all text-xs leading-5 text-gray-600">
//                   {customer.email || '-'}
//                 </p>

//                 <p className="mt-1 text-xs leading-5 text-gray-500">
//                   {t('confirmationEmailDescription')}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* ======================================================
//               ORDER INFORMATION
//           ======================================================= */}

//           <div className="grid border-b border-gray-100 sm:grid-cols-3">
//             {/* ORDER NUMBER */}

//             <div className="border-b border-gray-100 px-6 py-5 sm:border-b-0 sm:border-r">
//               <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
//                 {t('orderNumber')}
//               </p>

//               <p className="mt-2 break-all text-sm font-bold text-gray-900">
//                 {order.orderNumber || '-'}
//               </p>
//             </div>

//             {/* PAYMENT */}

//             <div className="border-b border-gray-100 px-6 py-5 sm:border-b-0 sm:border-r">
//               <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
//                 {t('paymentMethod')}
//               </p>

//               <p className="mt-2 text-sm font-bold text-gray-900">
//                 {formatPaymentMethod(order.paymentMethod, t)}
//               </p>
//             </div>

//             {/* TOTAL */}

//             <div className="px-6 py-5">
//               <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
//                 {t('total')}
//               </p>

//               <p className="mt-2 text-lg font-bold text-gray-900">
//                 €{total.toFixed(2)}
//               </p>
//             </div>
//           </div>

//           {/* ======================================================
//               ORDER CONTENT
//           ======================================================= */}

//           <div className="grid lg:grid-cols-[minmax(0,1fr)_320px]">
//             {/* ====================================================
//                 ORDER ITEMS
//             ===================================================== */}

//             <div className="p-6 sm:p-8">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
//                   <Package className="h-5 w-5 text-gray-700" />
//                 </div>

//                 <div>
//                   <h2 className="text-lg font-bold text-gray-900">
//                     {t('orderItems')}
//                   </h2>

//                   <p className="text-xs text-gray-500">
//                     {items.length} {t('productsFound')}
//                   </p>
//                 </div>
//               </div>

//               {/* ITEMS */}

//               <div className="mt-7 space-y-5">
//                 {items.length > 0 ? (
//                   items.map((item, index) => (
//                     <OrderItem
//                       key={
//                         item.cartItemId ||
//                         item.id ||
//                         index
//                       }
//                       item={item}
//                       t={t}
//                     />
//                   ))
//                 ) : (
//                   <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center">
//                     <Package className="mx-auto h-7 w-7 text-gray-400" />

//                     <p className="mt-3 text-sm text-gray-500">
//                       {t('orderItems')}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* ====================================================
//                 RIGHT SUMMARY
//             ===================================================== */}

//             <div className="border-t border-gray-100 bg-gray-50 p-6 sm:p-8 lg:border-l lg:border-t-0">
//               <h2 className="text-lg font-bold text-gray-900">
//                 {t('orderSummary')}
//               </h2>

//               {/* PRICE SUMMARY */}

//               <div className="mt-6 space-y-4">
//                 <div className="flex items-center justify-between text-sm text-gray-600">
//                   <span>{t('subtotal')}</span>

//                   <span>
//                     €{subtotal.toFixed(2)}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between text-sm text-gray-600">
//                   <span>{t('shipping')}</span>

//                   <span>
//                     {shipping === 0
//                       ? t('free')
//                       : `€${shipping.toFixed(2)}`}
//                   </span>
//                 </div>

//                 <div className="h-px bg-gray-200" />

//                 <div className="flex items-center justify-between">
//                   <span className="font-bold text-gray-900">
//                     {t('total')}
//                   </span>

//                   <span className="text-xl font-bold text-gray-900">
//                     €{total.toFixed(2)}
//                   </span>
//                 </div>
//               </div>

//               {/* SHIPPING */}

//               <div className="mt-7 rounded-2xl bg-white p-4">
//                 <div className="flex gap-3">
//                   <Truck className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />

//                   <div>
//                     <p className="text-sm font-semibold text-gray-900">
//                       {t('shippingMethod')}
//                     </p>

//                     <p className="mt-1 text-xs text-gray-500">
//                       {formatShippingMethod(
//                         order.shippingMethod,
//                         t
//                       )}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* SHIPPING ADDRESS */}

//               <div className="mt-4 rounded-2xl bg-white p-4">
//                 <p className="text-sm font-semibold text-gray-900">
//                   {t('shippingAddress')}
//                 </p>

//                 <div className="mt-2 text-xs leading-5 text-gray-500">
//                   {customer.address && (
//                     <p>{customer.address}</p>
//                   )}

//                   {customer.apartment && (
//                     <p>{customer.apartment}</p>
//                   )}

//                   <p>
//                     {[
//                       customer.city,
//                       customer.state,
//                       customer.postalCode,
//                     ]
//                       .filter(Boolean)
//                       .join(', ')}
//                   </p>

//                   {customer.country && (
//                     <p>{customer.country}</p>
//                   )}

//                   {!customer.address &&
//                     !customer.city &&
//                     !customer.country && (
//                       <p>-</p>
//                     )}
//                 </div>
//               </div>

//               {/* EMAIL */}

//               <div className="mt-4 rounded-2xl bg-white p-4">
//                 <div className="flex gap-3">
//                   <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />

//                   <div className="min-w-0">
//                     <p className="text-sm font-semibold text-gray-900">
//                       {t('email')}
//                     </p>

//                     <p className="mt-1 break-all text-xs text-gray-500">
//                       {customer.email || '-'}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* SECURITY */}

//               <div className="mt-4 flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4">
//                 <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />

//                 <p className="text-xs leading-5 text-gray-500">
//                   {t('securePurchase')}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* ======================================================
//               FOOTER ACTION
//           ======================================================= */}

//           <div className="border-t border-gray-100 px-6 py-6 sm:px-8">
//             <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
//               <Link
//                 to="/products"
//                 className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
//               >
//                 <ShoppingBag className="h-4 w-4" />
//                 {t('continueShopping')}
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// /* ============================================================
//    ORDER ITEM
// ============================================================ */

// function OrderItem({ item, t }) {
//   const quantity = Number(item.quantity || 0)
//   const price = Number(item.price || 0)

//   const image =
//     item.image ||
//     item.images?.[0] ||
//     '/placeholder-product.png'

//   return (
//     <div className="rounded-2xl border border-gray-100 p-4">
//       <div className="flex gap-4">
//         {/* IMAGE */}

//         <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
//           <img
//             src={image}
//             alt={item.name || 'Product'}
//             className="h-full w-full object-cover"
//           />
//         </div>

//         {/* INFORMATION */}

//         <div className="min-w-0 flex-1">
//           <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
//             {item.name || '-'}
//           </h3>

//           {item.seller && (
//             <p className="mt-1 text-xs text-gray-500">
//               {t('soldBy')} {item.seller}
//             </p>
//           )}

//           <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
//             <span>
//               {t('quantity')}: {quantity}
//             </span>

//             <span>
//               €{price.toFixed(2)}
//             </span>

//             {quantity > 0 && (
//               <span className="font-semibold text-gray-700">
//                 €{(price * quantity).toFixed(2)}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* SIZE / MEASUREMENTS */}

//       <OrderSizeSummary
//         item={item}
//         t={t}
//       />
//     </div>
//   )
// }

// /* ============================================================
//    PAYMENT METHOD
// ============================================================ */

// function formatPaymentMethod(method, t) {
//   if (method === 'card') {
//     return t('creditDebitCard')
//   }

//   if (method === 'paypal') {
//     return t('paypal')
//   }

//   if (method === 'bank') {
//     return t('bankTransfer')
//   }

//   return method || '-'
// }

// /* ============================================================
//    SHIPPING METHOD
// ============================================================ */

// function formatShippingMethod(method, t) {
//   if (method === 'standard') {
//     return t('standardShipping')
//   }

//   if (method === 'express') {
//     return t('expressShipping')
//   }

//   return method || '-'
// }

// /* ============================================================
//    ORDER SIZE SUMMARY
// ============================================================ */

// function OrderSizeSummary({ item, t }) {
//   const sizeData = item?.sizeData

//   if (!sizeData) {
//     return null
//   }

//   const type =
//     sizeData.type ||
//     getProductType(item)

//   if (type === 'other') {
//     return null
//   }

//   const values = []

//   /* ==========================================================
//      WOMEN / MEN CLOTHING
//   =========================================================== */

//   if (
//     type === 'women-clothing' ||
//     type === 'men-clothing'
//   ) {
//     if (sizeData.size) {
//       values.push(
//         `${t('size')}: ${sizeData.size}`
//       )
//     }
//   }

//   /* ==========================================================
//      SHOES
//   =========================================================== */

//   if (type === 'shoes') {
//     if (sizeData.sizeSystem) {
//       values.push(
//         `${t('shoeSizeSystem')}: ${sizeData.sizeSystem}`
//       )
//     }

//     if (sizeData.size) {
//       values.push(
//         `${t('shoeSize')}: ${sizeData.size}`
//       )
//     }

//     if (sizeData.footLength) {
//       values.push(
//         `${t('footLength')}: ${sizeData.footLength} ${
//           sizeData.unit || 'cm'
//         }`
//       )
//     }
//   }

//   /* ==========================================================
//      BAGS
//   =========================================================== */

//   if (type === 'bags' && sizeData.bagSize) {
//     values.push(
//       `${t('bagSize')}: ${translateSizeValue(
//         sizeData.bagSize,
//         t
//       )}`
//     )
//   }

//   /* ==========================================================
//      MEASUREMENTS
//   =========================================================== */

//   const measurements =
//     sizeData.measurements || {}

//   const measurementLabels = {
//     bust: 'bust',
//     waist: 'waist',
//     hips: 'hips',
//     shoulder: 'shoulder',
//     sleeveLength: 'sleeveLength',
//     dressLength: 'dressLength',

//     chest: 'chest',
//     shirtLength: 'shirtLength',
//     trouserWaist: 'trouserWaist',
//     inseam: 'inseam',

//     width: 'width',
//     height: 'height',
//     depth: 'depth',
//     strapLength: 'strapLength',
//   }

//   Object.entries(measurementLabels).forEach(
//     ([field, translationKey]) => {
//       const value = measurements[field]

//       if (
//         value !== undefined &&
//         value !== null &&
//         String(value).trim() !== ''
//       ) {
//         values.push(
//           `${t(translationKey)}: ${value} ${
//             sizeData.unit || 'cm'
//           }`
//         )
//       }
//     }
//   )

//   if (values.length === 0) {
//     return null
//   }

//   return (
//     <div className="mt-4 rounded-xl bg-gray-50 px-3 py-3">
//       <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
//         {t('selectedSize')}
//       </p>

//       <div className="mt-2 flex flex-wrap gap-2">
//         {values.map((value) => (
//           <span
//             key={value}
//             className="rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm"
//           >
//             {value}
//           </span>
//         ))}
//       </div>
//     </div>
//   )
// }

// /* ============================================================
//    SIZE VALUE TRANSLATION
// ============================================================ */

// function translateSizeValue(value, t) {
//   const normalized = String(value).toLowerCase()

//   if (normalized === 'small') {
//     return t('small')
//   }

//   if (normalized === 'medium') {
//     return t('medium')
//   }

//   if (normalized === 'large') {
//     return t('large')
//   }

//   return value
// }

// /* ============================================================
//    PRODUCT TYPE
// ============================================================ */

// function getProductType(item = {}) {
//   const explicitType =
//     item.productType ||
//     item.type

//   if (explicitType) {
//     return normalizeProductType(explicitType)
//   }

//   const category = String(
//     item.category || ''
//   ).toLowerCase().trim()

//   const name = String(
//     item.name || ''
//   ).toLowerCase().trim()

//   /* ==========================================================
//      SHOES
//   =========================================================== */

//   if (
//     category === 'shoes' ||
//     category.includes('shoe') ||
//     name.includes('shoe') ||
//     name.includes('sneaker') ||
//     name.includes('boot')
//   ) {
//     return 'shoes'
//   }

//   /* ==========================================================
//      BAGS
//   =========================================================== */

//   if (
//     category === 'bags' ||
//     category.includes('bag') ||
//     name.includes('bag') ||
//     name.includes('handbag') ||
//     name.includes('backpack')
//   ) {
//     return 'bags'
//   }

//   /* ==========================================================
//      MEN CLOTHING
//   =========================================================== */

//   const isMen =
//     category.includes('men') ||
//     category.includes('male') ||
//     name.includes('men') ||
//     name.includes("men's") ||
//     name.includes('man ') ||
//     name.startsWith('man') ||
//     name.includes('shirt') ||
//     name.includes('trouser') ||
//     name.includes('suit')

//   if (isMen) {
//     return 'men-clothing'
//   }

//   /* ==========================================================
//      WOMEN CLOTHING
//   =========================================================== */

//   const isWomen =
//     category.includes('fashion') ||
//     category.includes('women') ||
//     category.includes('woman') ||
//     category.includes('dress') ||
//     name.includes('dress') ||
//     name.includes('women') ||
//     name.includes("women's") ||
//     name.includes('kemis')

//   if (isWomen) {
//     return 'women-clothing'
//   }

//   return 'other'
// }

// /* ============================================================
//    NORMALIZE PRODUCT TYPE
// ============================================================ */

// function normalizeProductType(type) {
//   const normalized = String(type)
//     .toLowerCase()
//     .trim()

//   if (
//     normalized === 'shoe' ||
//     normalized === 'shoes' ||
//     normalized.includes('footwear')
//   ) {
//     return 'shoes'
//   }

//   if (
//     normalized === 'bag' ||
//     normalized === 'bags'
//   ) {
//     return 'bags'
//   }

//   if (
//     normalized === 'men' ||
//     normalized === 'mens' ||
//     normalized === "men's" ||
//     normalized === 'men-clothing' ||
//     normalized === 'men clothing'
//   ) {
//     return 'men-clothing'
//   }

//   if (
//     normalized === 'women' ||
//     normalized === 'womens' ||
//     normalized === "women's" ||
//     normalized === 'women-clothing' ||
//     normalized === 'women clothing'
//   ) {
//     return 'women-clothing'
//   }

//   return normalized
// }

// export default OrderConfirmation

import {
  Check,
  Mail,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from 'lucide-react'

import { Link, useLocation } from 'react-router-dom'

import { useLanguage } from '../context/LanguageContext'

function OrderConfirmation() {
  const { t } = useLanguage()
  const location = useLocation()

  const order = location.state?.order

  // ============================================================
  // SAVE ORDER NOTIFICATION FOR ADMIN
  // ============================================================

  useEffect(() => {
    if (!order) {
      return
    }

    try {
      const NOTIFICATIONS_KEY =
        'fegegta_admin_notifications'

      const existingNotifications =
        JSON.parse(
          localStorage.getItem(NOTIFICATIONS_KEY) || '[]'
        )

      const orderId =
        order.orderNumber ||
        order.orderId ||
        order.id ||
        order._id

      // ----------------------------------------------------------
      // Prevent duplicate notification
      // ----------------------------------------------------------

      const alreadyExists =
        existingNotifications.some(
          (notification) =>
            notification.orderId === orderId ||
            notification.order?.orderNumber === orderId ||
            notification.order?.orderId === orderId ||
            notification.order?.id === orderId ||
            notification.order?._id === orderId
        )

      if (alreadyExists) {
        return
      }

      // ----------------------------------------------------------
      // Create admin notification
      // ----------------------------------------------------------

      const notification = {
        id: `notification-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 9)}`,

        type: 'new_order',

        title: 'New Order Received',

        message: `A new order ${
          orderId || ''
        } has been placed.`,

        orderId: orderId || null,

        read: false,

        createdAt: new Date().toISOString(),

        // --------------------------------------------------------
        // Keep complete order information for admin
        // --------------------------------------------------------

        order: order,
      }

      const updatedNotifications = [
        notification,
        ...existingNotifications,
      ]

      localStorage.setItem(
        NOTIFICATIONS_KEY,
        JSON.stringify(updatedNotifications)
      )

      console.log(
        'Admin order notification created:',
        notification
      )
    } catch (error) {
      console.error(
        'Failed to create admin order notification:',
        error
      )
    }
  }, [order])

  // ============================================================
  // NO ORDER DATA
  // ============================================================

  if (!order) {
    return (
      <section className="min-h-[70vh] bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Package className="h-8 w-8 text-gray-500" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            {t('orderInformationUnavailable')}
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
            {t('orderInformationUnavailableDescription')}
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            <ShoppingBag className="h-4 w-4" />
            {t('continueShopping')}
          </Link>
        </div>
      </section>
    )
  }

  const customer = order.customer || {}
  const items = Array.isArray(order.items) ? order.items : []

  const subtotal = Number(order.subtotal || 0)
  const shipping = Number(order.shipping || 0)
  const total = Number(order.total || 0)

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

          {/* ======================================================
              SUCCESS HEADER
          ======================================================= */}

          <div className="border-b border-gray-100 px-6 py-10 text-center sm:px-10 sm:py-14">

            {/* SUCCESS ICON */}

            <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-emerald-100" />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-100">
                <Check className="h-10 w-10 stroke-[3] text-white" />
              </div>
            </div>

            {/* PAYMENT SUCCESSFUL */}

            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              {t('paymentSuccessful')}
            </p>

            {/* THANK YOU */}

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('thankYou')}{' '}
              {customer.firstName || ''}
            </h1>

            {/* ORDER COMPLETED */}

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              {t('orderCompleted')}
            </p>

            {/* EMAIL */}

            <div className="mx-auto mt-7 flex max-w-xl items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                <Mail className="h-5 w-5 text-emerald-600" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">
                  {t('confirmationEmail')}
                </p>

                <p className="mt-1 break-all text-xs leading-5 text-gray-600">
                  {customer.email || '-'}
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {t('confirmationEmailDescription')}
                </p>
              </div>
            </div>
          </div>

          {/* ======================================================
              ORDER INFORMATION
          ======================================================= */}

          <div className="grid border-b border-gray-100 sm:grid-cols-3">

            {/* ORDER NUMBER */}

            <div className="border-b border-gray-100 px-6 py-5 sm:border-b-0 sm:border-r">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                {t('orderNumber')}
              </p>

              <p className="mt-2 break-all text-sm font-bold text-gray-900">
                {order.orderNumber || '-'}
              </p>
            </div>

            {/* PAYMENT */}

            <div className="border-b border-gray-100 px-6 py-5 sm:border-b-0 sm:border-r">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                {t('paymentMethod')}
              </p>

              <p className="mt-2 text-sm font-bold text-gray-900">
                {formatPaymentMethod(
                  order.paymentMethod,
                  t
                )}
              </p>
            </div>

            {/* TOTAL */}

            <div className="px-6 py-5">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                {t('total')}
              </p>

              <p className="mt-2 text-lg font-bold text-gray-900">
                €{total.toFixed(2)}
              </p>
            </div>
          </div>

          {/* ======================================================
              ORDER CONTENT
          ======================================================= */}

          <div className="grid lg:grid-cols-[minmax(0,1fr)_320px]">

            {/* ====================================================
                ORDER ITEMS
            ===================================================== */}

            <div className="p-6 sm:p-8">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                  <Package className="h-5 w-5 text-gray-700" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {t('orderItems')}
                  </h2>

                  <p className="text-xs text-gray-500">
                    {items.length} {t('productsFound')}
                  </p>
                </div>
              </div>

              {/* ITEMS */}

              <div className="mt-7 space-y-5">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <OrderItem
                      key={
                        item.cartItemId ||
                        item.id ||
                        index
                      }
                      item={item}
                      t={t}
                    />
                  ))
                ) : (
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center">
                    <Package className="mx-auto h-7 w-7 text-gray-400" />

                    <p className="mt-3 text-sm text-gray-500">
                      {t('orderItems')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ====================================================
                RIGHT SUMMARY
            ===================================================== */}

            <div className="border-t border-gray-100 bg-gray-50 p-6 sm:p-8 lg:border-l lg:border-t-0">

              <h2 className="text-lg font-bold text-gray-900">
                {t('orderSummary')}
              </h2>

              {/* PRICE SUMMARY */}

              <div className="mt-6 space-y-4">

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{t('subtotal')}</span>

                  <span>
                    €{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{t('shipping')}</span>

                  <span>
                    {shipping === 0
                      ? t('free')
                      : `€${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="h-px bg-gray-200" />

                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900">
                    {t('total')}
                  </span>

                  <span className="text-xl font-bold text-gray-900">
                    €{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* SHIPPING */}

              <div className="mt-7 rounded-2xl bg-white p-4">
                <div className="flex gap-3">
                  <Truck className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {t('shippingMethod')}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {formatShippingMethod(
                        order.shippingMethod,
                        t
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* SHIPPING ADDRESS */}

              <div className="mt-4 rounded-2xl bg-white p-4">

                <p className="text-sm font-semibold text-gray-900">
                  {t('shippingAddress')}
                </p>

                <div className="mt-2 text-xs leading-5 text-gray-500">

                  {customer.address && (
                    <p>{customer.address}</p>
                  )}

                  {customer.apartment && (
                    <p>{customer.apartment}</p>
                  )}

                  <p>
                    {[
                      customer.city,
                      customer.state,
                      customer.postalCode,
                    ]
                      .filter(Boolean)
                      .join(', ')}
                  </p>

                  {customer.country && (
                    <p>{customer.country}</p>
                  )}

                  {!customer.address &&
                    !customer.city &&
                    !customer.country && (
                      <p>-</p>
                    )}
                </div>
              </div>

              {/* EMAIL */}

              <div className="mt-4 rounded-2xl bg-white p-4">
                <div className="flex gap-3">

                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />

                  <div className="min-w-0">

                    <p className="text-sm font-semibold text-gray-900">
                      {t('email')}
                    </p>

                    <p className="mt-1 break-all text-xs text-gray-500">
                      {customer.email || '-'}
                    </p>

                  </div>
                </div>
              </div>

              {/* SECURITY */}

              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4">

                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />

                <p className="text-xs leading-5 text-gray-500">
                  {t('securePurchase')}
                </p>

              </div>
            </div>
          </div>

          {/* ======================================================
              FOOTER ACTION
          ======================================================= */}

          <div className="border-t border-gray-100 px-6 py-6 sm:px-8">

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">

              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                <ShoppingBag className="h-4 w-4" />

                {t('continueShopping')}
              </Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


/* ============================================================
   ORDER ITEM
============================================================ */

function OrderItem({ item, t }) {
  const quantity = Number(item.quantity || 0)
  const price = Number(item.price || 0)

  const image =
    item.image ||
    item.images?.[0] ||
    '/placeholder-product.png'

  return (
    <div className="rounded-2xl border border-gray-100 p-4">

      <div className="flex gap-4">

        {/* IMAGE */}

        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">

          <img
            src={image}
            alt={item.name || 'Product'}
            className="h-full w-full object-cover"
          />

        </div>

        {/* INFORMATION */}

        <div className="min-w-0 flex-1">

          <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
            {item.name || '-'}
          </h3>

          {item.seller && (
            <p className="mt-1 text-xs text-gray-500">
              {t('soldBy')} {item.seller}
            </p>
          )}

          <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">

            <span>
              {t('quantity')}: {quantity}
            </span>

            <span>
              €{price.toFixed(2)}
            </span>

            {quantity > 0 && (
              <span className="font-semibold text-gray-700">
                €{(price * quantity).toFixed(2)}
              </span>
            )}

          </div>
        </div>
      </div>

      {/* SIZE / MEASUREMENTS */}

      <OrderSizeSummary
        item={item}
        t={t}
      />

    </div>
  )
}


/* ============================================================
   PAYMENT METHOD
============================================================ */

function formatPaymentMethod(method, t) {
  if (method === 'card') {
    return t('creditDebitCard')
  }

  if (method === 'paypal') {
    return t('paypal')
  }

  if (method === 'bank') {
    return t('bankTransfer')
  }

  return method || '-'
}


/* ============================================================
   SHIPPING METHOD
============================================================ */

function formatShippingMethod(method, t) {
  if (method === 'standard') {
    return t('standardShipping')
  }

  if (method === 'express') {
    return t('expressShipping')
  }

  return method || '-'
}


/* ============================================================
   ORDER SIZE SUMMARY
============================================================ */

function OrderSizeSummary({ item, t }) {
  const sizeData = item?.sizeData

  if (!sizeData) {
    return null
  }

  const type =
    sizeData.type ||
    getProductType(item)

  if (type === 'other') {
    return null
  }

  const values = []

  /* ==========================================================
     WOMEN / MEN CLOTHING
  =========================================================== */

  if (
    type === 'women-clothing' ||
    type === 'men-clothing'
  ) {
    if (sizeData.size) {
      values.push(
        `${t('size')}: ${sizeData.size}`
      )
    }
  }

  /* ==========================================================
     SHOES
  =========================================================== */

  if (type === 'shoes') {
    if (sizeData.sizeSystem) {
      values.push(
        `${t('shoeSizeSystem')}: ${sizeData.sizeSystem}`
      )
    }

    if (sizeData.size) {
      values.push(
        `${t('shoeSize')}: ${sizeData.size}`
      )
    }

    if (sizeData.footLength) {
      values.push(
        `${t('footLength')}: ${sizeData.footLength} ${
          sizeData.unit || 'cm'
        }`
      )
    }
  }

  /* ==========================================================
     BAGS
  =========================================================== */

  if (
    type === 'bags' &&
    sizeData.bagSize
  ) {
    values.push(
      `${t('bagSize')}: ${translateSizeValue(
        sizeData.bagSize,
        t
      )}`
    )
  }

  /* ==========================================================
     MEASUREMENTS
  =========================================================== */

  const measurements =
    sizeData.measurements || {}

  const measurementLabels = {
    bust: 'bust',
    waist: 'waist',
    hips: 'hips',
    shoulder: 'shoulder',
    sleeveLength: 'sleeveLength',
    dressLength: 'dressLength',

    chest: 'chest',
    shirtLength: 'shirtLength',
    trouserWaist: 'trouserWaist',
    inseam: 'inseam',

    width: 'width',
    height: 'height',
    depth: 'depth',
    strapLength: 'strapLength',
  }

  Object.entries(measurementLabels).forEach(
    ([field, translationKey]) => {
      const value = measurements[field]

      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ''
      ) {
        values.push(
          `${t(translationKey)}: ${value} ${
            sizeData.unit || 'cm'
          }`
        )
      }
    }
  )

  if (values.length === 0) {
    return null
  }

  return (
    <div className="mt-4 rounded-xl bg-gray-50 px-3 py-3">

      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
        {t('selectedSize')}
      </p>

      <div className="mt-2 flex flex-wrap gap-2">

        {values.map((value) => (
          <span
            key={value}
            className="rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm"
          >
            {value}
          </span>
        ))}

      </div>
    </div>
  )
}


/* ============================================================
   SIZE VALUE TRANSLATION
============================================================ */

function translateSizeValue(value, t) {
  const normalized = String(value).toLowerCase()

  if (normalized === 'small') {
    return t('small')
  }

  if (normalized === 'medium') {
    return t('medium')
  }

  if (normalized === 'large') {
    return t('large')
  }

  return value
}


/* ============================================================
   PRODUCT TYPE
============================================================ */

function getProductType(item = {}) {
  const explicitType =
    item.productType ||
    item.type

  if (explicitType) {
    return normalizeProductType(explicitType)
  }

  const category = String(
    item.category || ''
  ).toLowerCase().trim()

  const name = String(
    item.name || ''
  ).toLowerCase().trim()

  /* ==========================================================
     SHOES
  =========================================================== */

  if (
    category === 'shoes' ||
    category.includes('shoe') ||
    name.includes('shoe') ||
    name.includes('sneaker') ||
    name.includes('boot')
  ) {
    return 'shoes'
  }

  /* ==========================================================
     BAGS
  =========================================================== */

  if (
    category === 'bags' ||
    category.includes('bag') ||
    name.includes('bag') ||
    name.includes('handbag') ||
    name.includes('backpack')
  ) {
    return 'bags'
  }

  /* ==========================================================
     MEN CLOTHING
  =========================================================== */

  const isMen =
    category.includes('men') ||
    category.includes('male') ||
    name.includes('men') ||
    name.includes("men's") ||
    name.includes('man ') ||
    name.startsWith('man') ||
    name.includes('shirt') ||
    name.includes('trouser') ||
    name.includes('suit')

  if (isMen) {
    return 'men-clothing'
  }

  /* ==========================================================
     WOMEN CLOTHING
  =========================================================== */

  const isWomen =
    category.includes('fashion') ||
    category.includes('women') ||
    category.includes('woman') ||
    category.includes('dress') ||
    name.includes('dress') ||
    name.includes('women') ||
    name.includes("women's") ||
    name.includes('kemis')

  if (isWomen) {
    return 'women-clothing'
  }

  return 'other'
}


/* ============================================================
   NORMALIZE PRODUCT TYPE
============================================================ */

function normalizeProductType(type) {
  const normalized = String(type)
    .toLowerCase()
    .trim()

  if (
    normalized === 'shoe' ||
    normalized === 'shoes' ||
    normalized.includes('footwear')
  ) {
    return 'shoes'
  }

  if (
    normalized === 'bag' ||
    normalized === 'bags'
  ) {
    return 'bags'
  }

  if (
    normalized === 'men' ||
    normalized === 'mens' ||
    normalized === "men's" ||
    normalized === 'men-clothing' ||
    normalized === 'men clothing'
  ) {
    return 'men-clothing'
  }

  if (
    normalized === 'women' ||
    normalized === 'womens' ||
    normalized === "women's" ||
    normalized === 'women-clothing' ||
    normalized === 'women clothing'
  ) {
    return 'women-clothing'
  }

  return normalized
}


export default OrderConfirmation

