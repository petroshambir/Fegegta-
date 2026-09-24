

// import { Link } from 'react-router-dom'
// import {
//   Minus,
//   Plus,
//   Trash2,
//   ArrowLeft,
//   ShoppingBag,
// } from 'lucide-react'

// import Button from '../components/Button'
// import EmptyState from '../components/EmptyState'
// import { useLanguage } from '../context/LanguageContext'
// import { useCart } from '../context/CartContext'

// function Cart() {
//   const { t } = useLanguage()

//   const {
//     cartItems,
//     increaseQuantity,
//     decreaseQuantity,
//     removeFromCart,
//     totalItems,
//     subtotal,
//     shipping,
//     total,
//   } = useCart()

//   // =========================================================
//   // EMPTY CART
//   // =========================================================

//   if (cartItems.length === 0) {
//     return (
//       <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
//             {t('cart')}
//           </h1>
//         </div>

//         <EmptyState
//           icon="🛒"
//           title={t('emptyCart')}
//           description={t('emptyCartDescription')}
//           action={
//             <Link to="/products">
//               <Button>
//                 {t('continueShopping')}
//               </Button>
//             </Link>
//           }
//         />
//       </section>
//     )
//   }

//   // =========================================================
//   // GET PRODUCT IMAGE
//   // =========================================================

//   const getProductImage = (item) => {
//     if (item.image) {
//       return item.image
//     }

//     if (Array.isArray(item.images) && item.images.length > 0) {
//       return item.images[0]
//     }

//     return '/placeholder-product.png'
//   }

//   // =========================================================
//   // GET PRODUCT SELLER
//   // =========================================================

//   const getSellerName = (item) => {
//     return (
//       item.seller ||
//       item.sellerName ||
//       item.storeName ||
//       t('unknownSeller')
//     )
//   }

//   // =========================================================
//   // CART
//   // =========================================================

//   return (
//     <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
//       {/* =====================================================
//           PAGE HEADER
//       ===================================================== */}

//       <div className="mb-8">
//         <div className="flex items-center gap-3">
//           <ShoppingBag className="h-7 w-7 text-gray-900" />

//           <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
//             {t('cart')}
//           </h1>
//         </div>

//         <p className="mt-2 text-sm text-gray-500">
//           {totalItems} {t('itemsInCart')}
//         </p>
//       </div>

//       {/* =====================================================
//           MAIN CART LAYOUT
//       ===================================================== */}

//       <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
//         {/* ===================================================
//             CART ITEMS
//         =================================================== */}

//         <div className="space-y-4">
//           {cartItems.map((item) => {
//             const itemImage = getProductImage(item)
//             const sellerName = getSellerName(item)
//             const itemTotal =
//               (Number(item.price) || 0) *
//               (Number(item.quantity) || 0)

//             return (
//               <div
//                 key={item.id}
//                 className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
//               >
//                 <div className="flex gap-4">
//                   {/* =================================================
//                       PRODUCT IMAGE
//                   ================================================= */}

//                   <Link
//                     to={`/products/${item.id}`}
//                     className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-32 sm:w-28"
//                   >
//                     <img
//                       src={itemImage}
//                       alt={item.name || 'Product'}
//                       className="h-full w-full object-cover transition duration-300 hover:scale-105"
//                       onError={(event) => {
//                         event.currentTarget.src =
//                           '/placeholder-product.png'
//                       }}
//                     />
//                   </Link>

//                   {/* =================================================
//                       PRODUCT INFORMATION
//                   ================================================= */}

//                   <div className="min-w-0 flex-1">
//                     {/* PRODUCT HEADER */}

//                     <div className="flex items-start justify-between gap-3">
//                       <div className="min-w-0">
//                         <Link
//                           to={`/products/${item.id}`}
//                           className="block truncate font-semibold text-gray-900 transition hover:text-gray-600"
//                         >
//                           {item.name || 'Unnamed Product'}
//                         </Link>

//                         <p className="mt-1 text-sm text-gray-500">
//                           {t('soldBy')}: {sellerName}
//                         </p>

//                         <p className="mt-1 text-sm font-medium text-gray-700">
//                           €{(Number(item.price) || 0).toFixed(2)}
//                         </p>
//                       </div>

//                       {/* REMOVE PRODUCT */}

//                       <button
//                         type="button"
//                         onClick={() => removeFromCart(item.id)}
//                         className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
//                         aria-label={t('remove')}
//                       >
//                         <Trash2 className="h-5 w-5" />
//                       </button>
//                     </div>

//                     {/* =================================================
//                         QUANTITY + PRODUCT TOTAL
//                     ================================================= */}

//                     <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
//                       {/* QUANTITY CONTROLS */}

//                       <div className="flex items-center rounded-lg border border-gray-200">
//                         {/* DECREASE */}

//                         <button
//                           type="button"
//                           onClick={() => decreaseQuantity(item.id)}
//                           disabled={item.quantity <= 1}
//                           className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
//                           aria-label={t('decreaseQuantity')}
//                         >
//                           <Minus className="h-4 w-4" />
//                         </button>

//                         {/* QUANTITY */}

//                         <span className="flex h-9 min-w-10 items-center justify-center border-x border-gray-200 px-3 text-sm font-medium text-gray-900">
//                           {item.quantity}
//                         </span>

//                         {/* INCREASE */}

//                         <button
//                           type="button"
//                           onClick={() => increaseQuantity(item.id)}
//                           className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100"
//                           aria-label={t('increaseQuantity')}
//                         >
//                           <Plus className="h-4 w-4" />
//                         </button>
//                       </div>

//                       {/* PRODUCT TOTAL */}

//                       <p className="text-lg font-bold text-gray-900">
//                         €{itemTotal.toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )
//           })}

//           {/* =====================================================
//               CONTINUE SHOPPING
//           ===================================================== */}

//           <div className="pt-2">
//             <Link
//               to="/products"
//               className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-black"
//             >
//               <ArrowLeft className="h-4 w-4" />

//               {t('continueShopping')}
//             </Link>
//           </div>
//         </div>

//         {/* =====================================================
//             ORDER SUMMARY
//         ===================================================== */}

//         <aside className="h-fit rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6 lg:sticky lg:top-24">
//           <h2 className="text-lg font-bold text-gray-900">
//             {t('orderSummary')}
//           </h2>

//           <div className="mt-6 space-y-4">
//             {/* SUBTOTAL */}

//             <div className="flex items-center justify-between text-sm">
//               <span className="text-gray-500">
//                 {t('subtotal')}
//               </span>

//               <span className="font-medium text-gray-900">
//                 €{subtotal.toFixed(2)}
//               </span>
//             </div>

//             {/* SHIPPING */}

//             <div className="flex items-center justify-between text-sm">
//               <span className="text-gray-500">
//                 {t('shipping')}
//               </span>

//               <span className="font-medium text-gray-900">
//                 {shipping === 0
//                   ? t('free')
//                   : `€${shipping.toFixed(2)}`}
//               </span>
//             </div>

//             {/* FREE SHIPPING MESSAGE */}

//             {shipping === 0 && subtotal >= 100 && (
//               <div className="rounded-xl bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
//                 {t('freeShipping')}
//               </div>
//             )}

//             {/* TOTAL */}

//             <div className="border-t border-gray-200 pt-4">
//               <div className="flex items-center justify-between">
//                 <span className="font-semibold text-gray-900">
//                   {t('total')}
//                 </span>

//                 <span className="text-xl font-bold text-gray-900">
//                   €{total.toFixed(2)}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* =====================================================
//               CHECKOUT BUTTON
//           ===================================================== */}

//           <div className="mt-6">
//             <Link
//               to="/checkout"
//               className="block"
//             >
//               <Button
//                 size="lg"
//                 className="w-full"
//               >
//                 {t('checkout')}
//               </Button>
//             </Link>
//           </div>

//           {/* =====================================================
//               SECURITY MESSAGE
//           ===================================================== */}

//           <p className="mt-4 text-center text-xs leading-5 text-gray-500">
//             {t('secureCheckout')}
//           </p>
//         </aside>
//       </div>
//     </section>
//   )
// }

// export default Cart


import { Link } from 'react-router-dom'
import {
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  ShoppingBag,
} from 'lucide-react'

import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import { useLanguage } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'

function Cart() {
  const { t } = useLanguage()

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalItems,
    subtotal,
    total,
  } = useCart()

  // =========================================================
  // EMPTY CART
  // =========================================================

  if (cartItems.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {t('cart')}
          </h1>
        </div>

        <EmptyState
          icon="🛒"
          title={t('emptyCart')}
          description={t('emptyCartDescription')}
          action={
            <Link to="/products">
              <Button>
                {t('continueShopping')}
              </Button>
            </Link>
          }
        />
      </section>
    )
  }

  // =========================================================
  // GET PRODUCT IMAGE
  // =========================================================

  const getProductImage = (item) => {
    if (item.image) {
      return item.image
    }

    if (Array.isArray(item.images) && item.images.length > 0) {
      const firstImage = item.images[0]

      if (typeof firstImage === 'string') {
        return firstImage
      }

      if (firstImage?.url) {
        return firstImage.url
      }
    }

    return '/placeholder-product.png'
  }

  // =========================================================
  // GET PRODUCT SELLER
  // =========================================================

  const getSellerName = (item) => {
    return (
      item.seller ||
      item.sellerName ||
      item.storeName ||
      t('unknownSeller')
    )
  }

  // =========================================================
  // CART
  // =========================================================

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-7 w-7 text-gray-900" />

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {t('cart')}
          </h1>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {totalItems} {t('itemsInCart')}
        </p>
      </div>

      {/* =====================================================
          MAIN CART LAYOUT
      ===================================================== */}

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* ===================================================
            CART ITEMS
        =================================================== */}

        <div className="space-y-4">
          {cartItems.map((item) => {
            const itemImage = getProductImage(item)
            const sellerName = getSellerName(item)

            const itemTotal =
              (Number(item.price) || 0) *
              (Number(item.quantity) || 0)

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex gap-4">
                  {/* =================================================
                      PRODUCT IMAGE
                  ================================================= */}

                  <Link
                    to={`/products/${item.id}`}
                    className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-32 sm:w-28"
                  >
                    <img
                      src={itemImage}
                      alt={item.name || 'Product'}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.src =
                          '/placeholder-product.png'
                      }}
                    />
                  </Link>

                  {/* =================================================
                      PRODUCT INFORMATION
                  ================================================= */}

                  <div className="min-w-0 flex-1">
                    {/* PRODUCT HEADER */}

                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          to={`/products/${item.id}`}
                          className="block truncate font-semibold text-gray-900 transition hover:text-gray-600"
                        >
                          {item.name || 'Unnamed Product'}
                        </Link>

                        <p className="mt-1 text-sm text-gray-500">
                          {t('soldBy')}: {sellerName}
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-700">
                          €{(Number(item.price) || 0).toFixed(2)}
                        </p>
                      </div>

                      {/* REMOVE PRODUCT */}

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                        aria-label={t('remove')}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    {/* =================================================
                        QUANTITY + PRODUCT TOTAL
                    ================================================= */}

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      {/* QUANTITY CONTROLS */}

                      <div className="flex items-center rounded-lg border border-gray-200">
                        {/* DECREASE */}

                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          disabled={item.quantity <= 1}
                          className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label={t('decreaseQuantity')}
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        {/* QUANTITY */}

                        <span className="flex h-9 min-w-10 items-center justify-center border-x border-gray-200 px-3 text-sm font-medium text-gray-900">
                          {item.quantity}
                        </span>

                        {/* INCREASE */}

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100"
                          aria-label={t('increaseQuantity')}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* PRODUCT TOTAL */}

                      <p className="text-lg font-bold text-gray-900">
                        €{itemTotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* =====================================================
              CONTINUE SHOPPING
          ===================================================== */}

          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-black"
            >
              <ArrowLeft className="h-4 w-4" />

              {t('continueShopping')}
            </Link>
          </div>
        </div>

        {/* =====================================================
            ORDER SUMMARY
        ===================================================== */}

        <aside className="h-fit rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-gray-900">
            {t('orderSummary')}
          </h2>

          <div className="mt-6 space-y-4">
            {/* SUBTOTAL */}

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">
                {t('subtotal')}
              </span>

              <span className="font-medium text-gray-900">
                €{Number(subtotal || 0).toFixed(2)}
              </span>
            </div>

            {/* =================================================
                SHIPPING
            ================================================= */}

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">
                {t('shipping')}
              </span>

              <span className="font-medium text-gray-900">
                Calculated at checkout
              </span>
            </div>

            {/* SHIPPING INFORMATION */}

            <div className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-xs leading-5 text-gray-600">
              Shipping fees apply. Your shipping cost will be
              calculated at checkout based on your delivery
              destination, package weight, and selected shipping
              carrier such as DHL or FedEx.
            </div>

            {/* TOTAL */}

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">
                  {t('total')}
                </span>

                <span className="text-xl font-bold text-gray-900">
                  €{Number(total || 0).toFixed(2)}
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Shipping will be added after the shipping rate is
                calculated at checkout.
              </p>
            </div>
          </div>

          {/* =====================================================
              CHECKOUT BUTTON
          ===================================================== */}

          <div className="mt-6">
            <Link
              to="/checkout"
              className="block"
            >
              <Button
                size="lg"
                className="w-full"
              >
                {t('checkout')}
              </Button>
            </Link>
          </div>

          {/* =====================================================
              SECURITY MESSAGE
          ===================================================== */}

          <p className="mt-4 text-center text-xs leading-5 text-gray-500">
            {t('secureCheckout')}
          </p>
        </aside>
      </div>
    </section>
  )
}

export default Cart
