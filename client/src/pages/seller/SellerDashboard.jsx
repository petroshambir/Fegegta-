// import React, { useEffect, useMemo, useState } from 'react'
// import { Link } from 'react-router-dom'
// import {
//   Store,
//   Package,
//   ShoppingBag,
//   TrendingUp,
//   Wallet,
//   Bell,
//   Copy,
//   CheckCircle2,
//   ShieldCheck,
//   Plus,
//   ExternalLink,
//   Share2,
//   Clock3,
//   XCircle,
// } from 'lucide-react'

// import { useAuth } from '../../context/AuthContext'

// import {
//   getSellerStore,
//   getSellerProducts,
//   getSellerOrders,
//   getSellerNotifications,
//   createStoreSlug,
//   calculateCommission,
//   calculateSellerEarnings,
// } from '../../services/sellerStorage'

// function SellerDashboard() {
//   const { user } = useAuth()

//   const [store, setStore] = useState(null)
//   const [products, setProducts] = useState([])
//   const [orders, setOrders] = useState([])
//   const [notifications, setNotifications] = useState([])

//   const [copied, setCopied] = useState(false)
//   const [shareMessage, setShareMessage] = useState('')

//   useEffect(() => {
//     const loadDashboard = () => {
//       setStore(getSellerStore())
//       setProducts(getSellerProducts())
//       setOrders(getSellerOrders())
//       setNotifications(getSellerNotifications())
//     }

//     loadDashboard()
//   }, [])

//   // ---------------------------------------------------------
//   // PRODUCT STATUS
//   // ---------------------------------------------------------

//   const approvedProducts = useMemo(
//     () =>
//       products.filter(
//         (product) =>
//           String(product.status || '').toLowerCase() === 'approved'
//       ),
//     [products]
//   )

//   const pendingProducts = useMemo(
//     () =>
//       products.filter(
//         (product) =>
//           String(product.status || '').toLowerCase() === 'pending'
//       ),
//     [products]
//   )

//   const rejectedProducts = useMemo(
//     () =>
//       products.filter(
//         (product) =>
//           String(product.status || '').toLowerCase() === 'rejected'
//       ),
//     [products]
//   )

//   // ---------------------------------------------------------
//   // COMPLETED ORDERS
//   // ---------------------------------------------------------

//   const completedOrders = useMemo(
//     () =>
//       orders.filter((order) => {
//         const status = String(order.status || '').toLowerCase()

//         return (
//           status === 'delivered' ||
//           status === 'completed'
//         )
//       }),
//     [orders]
//   )

//   // ---------------------------------------------------------
//   // SELLER SALES
//   // ---------------------------------------------------------

//   const grossSales = useMemo(
//     () =>
//       completedOrders.reduce(
//         (sum, order) =>
//           sum + getSellerAmount(order, user),
//         0
//       ),
//     [completedOrders, user]
//   )

//   const commission = useMemo(
//     () =>
//       completedOrders.reduce(
//         (sum, order) => {
//           const amount = getSellerAmount(order, user)

//           return (
//             sum +
//             calculateCommission(amount)
//           )
//         },
//         0
//       ),
//     [completedOrders, user]
//   )

//   const earnings = useMemo(
//     () =>
//       completedOrders.reduce(
//         (sum, order) => {
//           const amount = getSellerAmount(order, user)

//           return (
//             sum +
//             calculateSellerEarnings(amount)
//           )
//         },
//         0
//       ),
//     [completedOrders, user]
//   )

//   // ---------------------------------------------------------
//   // STORE URL
//   // ---------------------------------------------------------

//   const slug =
//     store?.slug ||
//     createStoreSlug(
//       store?.storeName ||
//         user?.storeName ||
//         'my-store'
//     )

//   const publicUrl =
//     `${window.location.origin}/store/${slug}`

//   // ---------------------------------------------------------
//   // COPY STORE LINK
//   // ---------------------------------------------------------

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(
//         publicUrl
//       )

//       setCopied(true)

//       setTimeout(
//         () => setCopied(false),
//         2000
//       )
//     } catch (error) {
//       console.error(
//         'Failed to copy store link:',
//         error
//       )
//     }
//   }

//   // ---------------------------------------------------------
//   // SHARE STORE
//   // ---------------------------------------------------------

//   const handleShare = async () => {
//     const storeName =
//       store?.storeName || 'My Store'

//     try {
//       if (navigator.share) {
//         await navigator.share({
//           title: storeName,
//           text: `Visit ${storeName} on Fegegta.`,
//           url: publicUrl,
//         })

//         return
//       }

//       await navigator.clipboard.writeText(
//         publicUrl
//       )

//       setShareMessage(
//         'Store link copied. You can now share it anywhere.'
//       )

//       setTimeout(
//         () => setShareMessage(''),
//         3000
//       )
//     } catch (error) {
//       // User cancelled native share.
//       if (error?.name !== 'AbortError') {
//         console.error(
//           'Failed to share store:',
//           error
//         )
//       }
//     }
//   }

//   // ---------------------------------------------------------
//   // ADMIN-CONTROLLED VERIFICATION
//   // ---------------------------------------------------------

//   const verified =
//     store?.verified === true

//   // ---------------------------------------------------------
//   // STORE APPLICATION / STATUS
//   // ---------------------------------------------------------

//   const storeStatus =
//     store?.status ||
//     store?.sellerStatus ||
//     'pending'

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">

//         {/* =====================================================
//             HEADER
//         ====================================================== */}

//         <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

//           <div>
//             <p className="text-sm font-medium text-gray-500">
//               Seller Dashboard
//             </p>

//             <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
//               Welcome back
//               {user?.name
//                 ? `, ${user.name}`
//                 : ''}
//             </h1>

//             <p className="mt-2 text-sm text-gray-500">
//               Manage your store, products, orders and earnings.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-2">

//             <Link
//               to="/seller/notifications"
//               className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
//             >
//               <Bell className="h-4 w-4" />

//               Notifications
//             </Link>

//             <Link
//               to="/seller/products/add"
//               className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
//             >
//               <Plus className="h-4 w-4" />

//               Add Product
//             </Link>

//           </div>
//         </div>

//         {/* =====================================================
//             MAIN STATISTICS
//         ====================================================== */}

//         <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

//           <Card
//             icon={TrendingUp}
//             label="Gross Sales"
//             value={`€${grossSales.toFixed(2)}`}
//           />

//           <Card
//             icon={ShoppingBag}
//             label="Completed Orders"
//             value={completedOrders.length}
//           />

//           <Card
//             icon={Package}
//             label="Products"
//             value={products.length}
//           />

//           <Card
//             icon={Wallet}
//             label="Seller Earnings"
//             value={`€${earnings.toFixed(2)}`}
//           />

//         </div>

//         {/* =====================================================
//             PRODUCT STATUS SUMMARY
//         ====================================================== */}

//         <div className="mt-6 grid gap-4 sm:grid-cols-3">

//           <StatusCard
//             icon={CheckCircle2}
//             label="Approved Products"
//             value={approvedProducts.length}
//             description="Visible in your public store"
//             className="text-green-700"
//           />

//           <StatusCard
//             icon={Clock3}
//             label="Pending Products"
//             value={pendingProducts.length}
//             description="Waiting for admin approval"
//             className="text-yellow-700"
//           />

//           <StatusCard
//             icon={XCircle}
//             label="Rejected Products"
//             value={rejectedProducts.length}
//             description="Need changes before approval"
//             className="text-red-700"
//           />

//         </div>

//         {/* =====================================================
//             STORE + QUICK ACTIONS
//         ====================================================== */}

//         <div className="mt-6 grid gap-6 lg:grid-cols-3">

//           {/* STORE */}

//           <section className="rounded-3xl border border-gray-200 bg-white p-6 lg:col-span-2">

//             <div className="flex items-start gap-4">

//               <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-100">
//                 <Store className="h-6 w-6" />
//               </div>

//               <div className="min-w-0 flex-1">

//                 <div className="flex flex-wrap items-center gap-2">

//                   <h2 className="text-lg font-bold text-gray-950">
//                     {store?.storeName ||
//                       'Your Store'}
//                   </h2>

//                   {verified && (
//                     <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
//                       <CheckCircle2 className="h-3.5 w-3.5" />

//                       Verified
//                     </span>
//                   )}

//                 </div>

//                 <p className="mt-1 text-sm text-gray-500">
//                   {store?.storeDescription ||
//                     'Complete your store profile to start selling.'}
//                 </p>

//               </div>

//             </div>

//             {/* PUBLIC STORE LINK */}

//             <div className="mt-6 rounded-2xl bg-gray-50 p-5">

//               <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

//                 <div className="min-w-0">

//                   <p className="text-sm font-semibold text-gray-900">
//                     Public Store Link
//                   </p>

//                   <p className="mt-2 break-all text-sm text-gray-500">
//                     {publicUrl}
//                   </p>

//                 </div>

//                 <ExternalLink className="hidden h-5 w-5 shrink-0 text-gray-400 sm:block" />

//               </div>

//               <div className="mt-4 flex flex-wrap gap-2">

//                 <button
//                   type="button"
//                   onClick={handleCopy}
//                   className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
//                 >
//                   {copied ? (
//                     <CheckCircle2 className="h-4 w-4 text-green-600" />
//                   ) : (
//                     <Copy className="h-4 w-4" />
//                   )}

//                   {copied
//                     ? 'Copied'
//                     : 'Copy Link'}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleShare}
//                   className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
//                 >
//                   <Share2 className="h-4 w-4" />

//                   Share Store
//                 </button>

//                 <Link
//                   to={`/store/${slug}`}
//                   className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
//                 >
//                   <ExternalLink className="h-4 w-4" />

//                   View Store
//                 </Link>

//               </div>

//               {shareMessage && (
//                 <p className="mt-3 text-xs font-medium text-green-700">
//                   {shareMessage}
//                 </p>
//               )}

//             </div>

//             {/* QUICK ACTIONS */}

//             <div className="mt-6 grid gap-3 sm:grid-cols-2">

//               <DashboardLink
//                 to="/seller/products/add"
//                 icon={Plus}
//                 title="Add Product"
//                 description="Upload up to 4 product images and add product information."
//               />

//               <DashboardLink
//                 to="/seller/products"
//                 icon={Package}
//                 title="My Products"
//                 description="Manage your products, prices, stock and approval status."
//               />

//               <DashboardLink
//                 to="/seller/orders"
//                 icon={ShoppingBag}
//                 title="Orders"
//                 description="View customer orders belonging to your store."
//               />

//               <DashboardLink
//                 to="/seller/sales"
//                 icon={TrendingUp}
//                 title="Sales"
//                 description="Track your store sales and completed orders."
//               />

//               <DashboardLink
//                 to="/seller/earnings"
//                 icon={Wallet}
//                 title="Earnings"
//                 description="See commission and your seller earnings."
//               />

//               <DashboardLink
//                 to="/seller/store"
//                 icon={Store}
//                 title="Store Settings"
//                 description="Manage your store profile and business information."
//               />

//             </div>

//           </section>

//           {/* NOTIFICATIONS */}

//           <section className="rounded-3xl border border-gray-200 bg-white p-6">

//             <div className="flex items-center justify-between">

//               <div className="flex items-center gap-2">
//                 <Bell className="h-5 w-5" />

//                 <h2 className="font-bold text-gray-950">
//                   Notifications
//                 </h2>
//               </div>

//               <Link
//                 to="/seller/notifications"
//                 className="text-xs font-semibold text-gray-700 underline underline-offset-2"
//               >
//                 View all
//               </Link>

//             </div>

//             <div className="mt-5 space-y-3">

//               {notifications
//                 .slice(0, 5)
//                 .map((notification) => (
//                   <div
//                     key={notification.id}
//                     className={`rounded-2xl p-4 ${
//                       notification.read
//                         ? 'bg-gray-50'
//                         : 'border border-gray-200 bg-white shadow-sm'
//                     }`}
//                   >

//                     <div className="flex items-start gap-3">

//                       <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-black" />

//                       <div className="min-w-0">

//                         <p className="text-sm font-semibold text-gray-900">
//                           {notification.title}
//                         </p>

//                         <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
//                           {notification.message}
//                         </p>

//                         {notification.createdAt && (
//                           <p className="mt-2 text-[11px] text-gray-400">
//                             {formatDate(
//                               notification.createdAt
//                             )}
//                           </p>
//                         )}

//                       </div>

//                     </div>

//                   </div>
//                 ))}

//               {notifications.length === 0 && (
//                 <div className="rounded-2xl bg-gray-50 p-5 text-center">
//                   <Bell className="mx-auto h-7 w-7 text-gray-300" />

//                   <p className="mt-3 text-sm text-gray-500">
//                     No notifications yet.
//                   </p>
//                 </div>
//               )}

//             </div>

//           </section>

//         </div>

//         {/* =====================================================
//             EARNINGS SUMMARY
//         ====================================================== */}

//         <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6">

//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

//             <div>

//               <h2 className="font-bold text-gray-950">
//                 Earnings Summary
//               </h2>

//               <p className="mt-1 text-sm text-gray-500">
//                 Your completed sales after the platform commission.
//               </p>

//             </div>

//             <Link
//               to="/seller/earnings"
//               className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold transition hover:bg-gray-50"
//             >
//               View Earnings
//             </Link>

//           </div>

//           <div className="mt-6 grid gap-4 sm:grid-cols-3">

//             <MiniStat
//               label="Gross Sales"
//               value={`€${grossSales.toFixed(2)}`}
//             />

//             <MiniStat
//               label="Platform Commission"
//               value={`€${commission.toFixed(2)}`}
//             />

//             <MiniStat
//               label="Your Earnings"
//               value={`€${earnings.toFixed(2)}`}
//             />

//           </div>

//           <div className="mt-5 rounded-2xl bg-gray-50 p-4">

//             <p className="text-xs leading-5 text-gray-500">
//               Example: if a completed product sale is €100 and the
//               platform commission is 10%, the commission is €10 and
//               your seller earnings are €90.
//             </p>

//           </div>

//         </section>

//         {/* =====================================================
//             STORE VERIFICATION
//         ====================================================== */}

//         <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6">

//           <div className="flex items-start gap-3">

//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
//               <ShieldCheck className="h-5 w-5" />
//             </div>

//             <div className="min-w-0 flex-1">

//               <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

//                 <div>

//                   <h2 className="font-bold text-gray-950">
//                     Store Verification
//                   </h2>

//                   <p className="mt-1 text-sm text-gray-500">
//                     {verified
//                       ? 'Your store has been verified by the platform administrator.'
//                       : 'Your store is waiting for verification by the platform administrator.'}
//                   </p>

//                 </div>

//                 <span
//                   className={`sm:ml-auto w-fit rounded-full px-3 py-1 text-xs font-semibold ${
//                     verified
//                       ? 'bg-green-100 text-green-700'
//                       : 'bg-yellow-100 text-yellow-700'
//                   }`}
//                 >
//                   {verified
//                     ? 'Verified'
//                     : 'Pending'}
//                 </span>

//               </div>

//               <div className="mt-4 rounded-2xl bg-gray-50 p-4">

//                 <p className="text-xs leading-5 text-gray-500">
//                   Store verification is controlled by the Fegegta
//                   administrator. Sellers cannot manually change their
//                   verification status.
//                 </p>

//               </div>

//             </div>

//           </div>

//         </section>

//         {/* =====================================================
//             FOOTER SPACE
//         ====================================================== */}

//         <div className="h-8" />

//       </div>
//     </div>
//   )
// }

// /* =============================================================
//    SELLER ORDER AMOUNT
// ============================================================= */

// function getSellerAmount(order, user) {
//   if (!order) {
//     return 0
//   }

//   const items = Array.isArray(order.items)
//     ? order.items
//     : []

//   const sellerId =
//     user?.id ||
//     user?._id ||
//     user?.sellerId ||
//     null

//   /*
//     First priority:
//     sellerId stored on each order item.
//   */

//   const sellerItems = items.filter((item) => {
//     if (!sellerId) {
//       return false
//     }

//     return (
//       String(item.sellerId || '') ===
//       String(sellerId)
//     )
//   })

//   if (sellerItems.length > 0) {
//     return sellerItems.reduce(
//       (sum, item) =>
//         sum +
//         Number(item.price || 0) *
//           Number(item.quantity || 1),
//       0
//     )
//   }

//   /*
//     Second priority:
//     order itself belongs to this seller.
//   */

//   const orderSellerId =
//     order.sellerId ||
//     order.seller?._id ||
//     order.seller?.id

//   if (
//     sellerId &&
//     orderSellerId &&
//     String(orderSellerId) ===
//       String(sellerId)
//   ) {
//     return Number(order.total || 0)
//   }

//   /*
//     IMPORTANT:
//     Never fall back to order.total for another seller.
//   */

//   return 0
// }

// /* =============================================================
//    DASHBOARD CARD
// ============================================================= */

// function Card({
//   icon: Icon,
//   label,
//   value,
// }) {
//   return (
//     <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

//       <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
//         <Icon className="h-5 w-5" />
//       </div>

//       <p className="mt-5 text-sm text-gray-500">
//         {label}
//       </p>

//       <p className="mt-1 text-2xl font-bold text-gray-950">
//         {value}
//       </p>

//     </div>
//   )
// }

// /* =============================================================
//    STATUS CARD
// ============================================================= */

// function StatusCard({
//   icon: Icon,
//   label,
//   value,
//   description,
//   className = '',
// }) {
//   return (
//     <div className="rounded-3xl border border-gray-200 bg-white p-5">

//       <div className="flex items-start justify-between gap-3">

//         <div>

//           <p className="text-sm text-gray-500">
//             {label}
//           </p>

//           <p className="mt-1 text-2xl font-bold text-gray-950">
//             {value}
//           </p>

//         </div>

//         <Icon className={`h-5 w-5 ${className}`} />

//       </div>

//       <p className="mt-3 text-xs text-gray-400">
//         {description}
//       </p>

//     </div>
//   )
// }

// /* =============================================================
//    DASHBOARD QUICK LINK
// ============================================================= */

// function DashboardLink({
//   to,
//   icon: Icon,
//   title,
//   description,
// }) {
//   return (
//     <Link
//       to={to}
//       className="group rounded-2xl border border-gray-200 p-5 transition hover:border-gray-300 hover:bg-gray-50"
//     >

//       <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 transition group-hover:bg-white">
//         <Icon className="h-5 w-5" />
//       </div>

//       <p className="mt-4 font-semibold text-gray-950">
//         {title}
//       </p>

//       <p className="mt-1 text-sm leading-5 text-gray-500">
//         {description}
//       </p>

//     </Link>
//   )
// }

// /* =============================================================
//    MINI STAT
// ============================================================= */

// function MiniStat({
//   label,
//   value,
// }) {
//   return (
//     <div className="rounded-2xl border border-gray-200 p-5">

//       <p className="text-sm text-gray-500">
//         {label}
//       </p>

//       <p className="mt-2 text-xl font-bold text-gray-950">
//         {value}
//       </p>

//     </div>
//   )
// }

// /* =============================================================
//    DATE FORMAT
// ============================================================= */

// function formatDate(value) {
//   try {
//     return new Date(value).toLocaleDateString(
//       undefined,
//       {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//       }
//     )
//   } catch {
//     return ''
//   }
// }

// export default SellerDashboard

import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Store,
  Package,
  ShoppingBag,
  TrendingUp,
  Wallet,
  Bell,
  Copy,
  CheckCircle2,
  ShieldCheck,
  Plus,
  ExternalLink,
  Share2,
  Clock3,
  XCircle,
} from 'lucide-react'

import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'

import {
  getSellerStore,
  getSellerProducts,
  getSellerOrders,
  getSellerNotifications,
  createStoreSlug,
  calculateCommission,
  calculateSellerEarnings,
} from '../../services/sellerStorage'

function SellerDashboard() {
  const { user } = useAuth()
  const { t } = useLanguage()

  const [store, setStore] = useState(null)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [notifications, setNotifications] = useState([])

  const [copied, setCopied] = useState(false)
  const [shareMessage, setShareMessage] = useState('')

  useEffect(() => {
    const loadDashboard = () => {
      setStore(getSellerStore())
      setProducts(getSellerProducts())
      setOrders(getSellerOrders())
      setNotifications(getSellerNotifications())
    }

    loadDashboard()
  }, [])

  // ---------------------------------------------------------
  // PRODUCT STATUS
  // ---------------------------------------------------------

  const approvedProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          String(product.status || '').toLowerCase() === 'approved'
      ),
    [products]
  )

  const pendingProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          String(product.status || '').toLowerCase() === 'pending'
      ),
    [products]
  )

  const rejectedProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          String(product.status || '').toLowerCase() === 'rejected'
      ),
    [products]
  )

  // ---------------------------------------------------------
  // COMPLETED ORDERS
  // ---------------------------------------------------------

  const completedOrders = useMemo(
    () =>
      orders.filter((order) => {
        const status = String(order.status || '').toLowerCase()

        return (
          status === 'delivered' ||
          status === 'completed'
        )
      }),
    [orders]
  )

  // ---------------------------------------------------------
  // SELLER SALES
  // ---------------------------------------------------------

  const grossSales = useMemo(
    () =>
      completedOrders.reduce(
        (sum, order) =>
          sum + getSellerAmount(order, user),
        0
      ),
    [completedOrders, user]
  )

  const commission = useMemo(
    () =>
      completedOrders.reduce(
        (sum, order) => {
          const amount = getSellerAmount(order, user)

          return (
            sum +
            calculateCommission(amount)
          )
        },
        0
      ),
    [completedOrders, user]
  )

  const earnings = useMemo(
    () =>
      completedOrders.reduce(
        (sum, order) => {
          const amount = getSellerAmount(order, user)

          return (
            sum +
            calculateSellerEarnings(amount)
          )
        },
        0
      ),
    [completedOrders, user]
  )

  // ---------------------------------------------------------
  // STORE URL
  // ---------------------------------------------------------

  const slug =
    store?.slug ||
    createStoreSlug(
      store?.storeName ||
        user?.storeName ||
        'my-store'
    )

  const publicUrl =
    `${window.location.origin}/store/${slug}`

  // ---------------------------------------------------------
  // COPY STORE LINK
  // ---------------------------------------------------------

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        publicUrl
      )

      setCopied(true)

      setTimeout(
        () => setCopied(false),
        2000
      )
    } catch (error) {
      console.error(
        'Failed to copy store link:',
        error
      )
    }
  }

  // ---------------------------------------------------------
  // SHARE STORE
  // ---------------------------------------------------------

  const handleShare = async () => {
    const storeName =
      store?.storeName || 'My Store'

    try {
      if (navigator.share) {
        await navigator.share({
          title: storeName,
          text: `Visit ${storeName} on Fegegta.`,
          url: publicUrl,
        })

        return
      }

      await navigator.clipboard.writeText(
        publicUrl
      )

      setShareMessage(
        t('storeLinkCopied')
      )

      setTimeout(
        () => setShareMessage(''),
        3000
      )
    } catch (error) {
      // User cancelled native share.
      if (error?.name !== 'AbortError') {
        console.error(
          'Failed to share store:',
          error
        )
      }
    }
  }

  // ---------------------------------------------------------
  // ADMIN-CONTROLLED VERIFICATION
  // ---------------------------------------------------------

  const verified =
    store?.verified === true

  // ---------------------------------------------------------
  // STORE APPLICATION / STATUS
  // ---------------------------------------------------------

  const storeStatus =
    store?.status ||
    store?.sellerStatus ||
    'pending'

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-sm font-medium text-gray-500">
              {t('sellerDashboardTitle')}
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              {t('welcomeBackSeller')}
              {user?.name
                ? `, ${user.name}`
                : ''}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {t('sellerDashboardDescription')}
            </p>

          </div>

          <div className="flex flex-wrap gap-2">

            <Link
              to="/seller/notifications"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
            >
              <Bell className="h-4 w-4" />

              {t('notifications')}
            </Link>

            <Link
              to="/seller/products/add"
              className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <Plus className="h-4 w-4" />

              {t('addProduct')}
            </Link>

          </div>
        </div>

        {/* =====================================================
            MAIN STATISTICS
        ====================================================== */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <Card
            icon={TrendingUp}
            label={t('grossSales')}
            value={`€${grossSales.toFixed(2)}`}
          />

          <Card
            icon={ShoppingBag}
            label={t('completedOrders')}
            value={completedOrders.length}
          />

          <Card
            icon={Package}
            label={t('sellerProducts')}
            value={products.length}
          />

          <Card
            icon={Wallet}
            label={t('sellerEarnings')}
            value={`€${earnings.toFixed(2)}`}
          />

        </div>

        {/* =====================================================
            PRODUCT STATUS SUMMARY
        ====================================================== */}

        <div className="mt-6 grid gap-4 sm:grid-cols-3">

          <StatusCard
            icon={CheckCircle2}
            label={t('approvedProducts')}
            value={approvedProducts.length}
            description={t('visibleInPublicStore')}
            className="text-green-700"
          />

          <StatusCard
            icon={Clock3}
            label={t('pendingProducts')}
            value={pendingProducts.length}
            description={t('waitingForAdminApproval')}
            className="text-yellow-700"
          />

          <StatusCard
            icon={XCircle}
            label={t('rejectedProducts')}
            value={rejectedProducts.length}
            description={t('needChangesBeforeApproval')}
            className="text-red-700"
          />

        </div>

        {/* =====================================================
            STORE + QUICK ACTIONS
        ====================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* STORE */}

          <section className="rounded-3xl border border-gray-200 bg-white p-6 lg:col-span-2">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-100">
                <Store className="h-6 w-6" />
              </div>

              <div className="min-w-0 flex-1">

                <div className="flex flex-wrap items-center gap-2">

                  <h2 className="text-lg font-bold text-gray-950">
                    {store?.storeName ||
                      t('yourStore')}
                  </h2>

                  {verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />

                      {t('verified')}
                    </span>
                  )}

                </div>

                <p className="mt-1 text-sm text-gray-500">
                  {store?.storeDescription ||
                    t('completeStoreProfile')}
                </p>

              </div>

            </div>

            {/* PUBLIC STORE LINK */}

            <div className="mt-6 rounded-2xl bg-gray-50 p-5">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                <div className="min-w-0">

                  <p className="text-sm font-semibold text-gray-900">
                    {t('publicStoreLink')}
                  </p>

                  <p className="mt-2 break-all text-sm text-gray-500">
                    {publicUrl}
                  </p>

                </div>

                <ExternalLink className="hidden h-5 w-5 shrink-0 text-gray-400 sm:block" />

              </div>

              <div className="mt-4 flex flex-wrap gap-2">

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
                >

                  {copied ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}

                  {copied
                    ? t('copied')
                    : t('copyLink')}

                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
                >

                  <Share2 className="h-4 w-4" />

                  {t('shareStore')}

                </button>

                <Link
                  to={`/store/${slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
                >

                  <ExternalLink className="h-4 w-4" />

                  {t('viewStore')}

                </Link>

              </div>

              {shareMessage && (
                <p className="mt-3 text-xs font-medium text-green-700">
                  {shareMessage}
                </p>
              )}

            </div>

            {/* QUICK ACTIONS */}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              <DashboardLink
                to="/seller/products/add"
                icon={Plus}
                title={t('addProduct')}
                description={t('addProductDescription')}
              />

              <DashboardLink
                to="/seller/products"
                icon={Package}
                title={t('myProducts')}
                description={t('manageProductsDescription')}
              />

              <DashboardLink
                to="/seller/orders"
                icon={ShoppingBag}
                title={t('orders')}
                description={t('ordersDescription')}
              />

              <DashboardLink
                to="/seller/sales"
                icon={TrendingUp}
                title={t('sales')}
                description={t('salesDescription')}
              />

              <DashboardLink
                to="/seller/earnings"
                icon={Wallet}
                title={t('earnings')}
                description={t('earningsDescription')}
              />

              <DashboardLink
                to="/seller/store"
                icon={Store}
                title={t('storeSettings')}
                description={t('storeSettingsDescription')}
              />

            </div>

          </section>

          {/* NOTIFICATIONS */}

          <section className="rounded-3xl border border-gray-200 bg-white p-6">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <Bell className="h-5 w-5" />

                <h2 className="font-bold text-gray-950">
                  {t('notifications')}
                </h2>

              </div>

              <Link
                to="/seller/notifications"
                className="text-xs font-semibold text-gray-700 underline underline-offset-2"
              >
                {t('viewAll')}
              </Link>

            </div>

            <div className="mt-5 space-y-3">

              {notifications
                .slice(0, 5)
                .map((notification) => (
                  <div
                    key={notification.id}
                    className={`rounded-2xl p-4 ${
                      notification.read
                        ? 'bg-gray-50'
                        : 'border border-gray-200 bg-white shadow-sm'
                    }`}
                  >

                    <div className="flex items-start gap-3">

                      <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-black" />

                      <div className="min-w-0">

                        <p className="text-sm font-semibold text-gray-900">
                          {notification.title}
                        </p>

                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
                          {notification.message}
                        </p>

                        {notification.createdAt && (
                          <p className="mt-2 text-[11px] text-gray-400">
                            {formatDate(
                              notification.createdAt
                            )}
                          </p>
                        )}

                      </div>

                    </div>

                  </div>
                ))}

              {notifications.length === 0 && (
                <div className="rounded-2xl bg-gray-50 p-5 text-center">

                  <Bell className="mx-auto h-7 w-7 text-gray-300" />

                  <p className="mt-3 text-sm text-gray-500">
                    {t('noNotificationsYet')}
                  </p>

                </div>
              )}

            </div>

          </section>

        </div>

        {/* =====================================================
            EARNINGS SUMMARY
        ====================================================== */}

        <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="font-bold text-gray-950">
                {t('earningsSummary')}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {t('completedSalesAfterCommission')}
              </p>

            </div>

            <Link
              to="/seller/earnings"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold transition hover:bg-gray-50"
            >
              {t('viewEarnings')}
            </Link>

          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <MiniStat
              label={t('grossSales')}
              value={`€${grossSales.toFixed(2)}`}
            />

            <MiniStat
              label={t('platformCommission')}
              value={`€${commission.toFixed(2)}`}
            />

            <MiniStat
              label={t('yourEarnings')}
              value={`€${earnings.toFixed(2)}`}
            />

          </div>

          <div className="mt-5 rounded-2xl bg-gray-50 p-4">

            <p className="text-xs leading-5 text-gray-500">
              {t('commissionExample')}
            </p>

          </div>

        </section>

        {/* =====================================================
            STORE VERIFICATION
        ====================================================== */}

        <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                <div>

                  <h2 className="font-bold text-gray-950">
                    {t('storeVerification')}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {verified
                      ? t('storeVerifiedDescription')
                      : t('storePendingVerificationDescription')}
                  </p>

                </div>

                <span
                  className={`sm:ml-auto w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                    verified
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {verified
                    ? t('verifiedStatus')
                    : t('pendingStatus')}
                </span>

              </div>

              <div className="mt-4 rounded-2xl bg-gray-50 p-4">

                <p className="text-xs leading-5 text-gray-500">
                  {t('verificationControlledByAdmin')}
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            FOOTER SPACE
        ====================================================== */}

        <div className="h-8" />

      </div>
    </div>
  )
}

/* =============================================================
  SELLER ORDER AMOUNT
============================================================= */

function getSellerAmount(order, user) {
  if (!order) {
    return 0
  }

  const items = Array.isArray(order.items)
    ? order.items
    : []

  const sellerId =
    user?.id ||
    user?._id ||
    user?.sellerId ||
    null

  /*
    First priority:
    sellerId stored on each order item.
  */

  const sellerItems = items.filter((item) => {
    if (!sellerId) {
      return false
    }

    return (
      String(item.sellerId || '') ===
      String(sellerId)
    )
  })

  if (sellerItems.length > 0) {
    return sellerItems.reduce(
      (sum, item) =>
        sum +
        Number(item.price || 0) *
          Number(item.quantity || 1),
      0
    )
  }

  /*
    Second priority:
    order itself belongs to this seller.
  */

  const orderSellerId =
    order.sellerId ||
    order.seller?._id ||
    order.seller?.id

  if (
    sellerId &&
    orderSellerId &&
    String(orderSellerId) ===
      String(sellerId)
  ) {
    return Number(order.total || 0)
  }

  /*
    IMPORTANT:
    Never fall back to order.total for another seller.
  */

  return 0
}

/* =============================================================
  DASHBOARD CARD
============================================================= */

function Card({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
        <Icon className="h-5 w-5" />
      </div>

      <p className="mt-5 text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold text-gray-950">
        {value}
      </p>

    </div>
  )
}

/* =============================================================
  STATUS CARD
============================================================= */

function StatusCard({
  icon: Icon,
  label,
  value,
  description,
  className = '',
}) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5">

      <div className="flex items-start justify-between gap-3">

        <div>

          <p className="text-sm text-gray-500">
            {label}
          </p>

          <p className="mt-1 text-2xl font-bold text-gray-950">
            {value}
          </p>

        </div>

        <Icon className={`h-5 w-5 ${className}`} />

      </div>

      <p className="mt-3 text-xs text-gray-400">
        {description}
      </p>

    </div>
  )
}

/* =============================================================
  DASHBOARD QUICK LINK
============================================================= */

function DashboardLink({
  to,
  icon: Icon,
  title,
  description,
}) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-gray-200 p-5 transition hover:border-gray-300 hover:bg-gray-50"
    >

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 transition group-hover:bg-white">
        <Icon className="h-5 w-5" />
      </div>

      <p className="mt-4 font-semibold text-gray-950">
        {title}
      </p>

      <p className="mt-1 text-sm leading-5 text-gray-500">
        {description}
      </p>

    </Link>
  )
}

/* =============================================================
  MINI STAT
============================================================= */

function MiniStat({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5">

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold text-gray-950">
        {value}
      </p>

    </div>
  )
}

/* =============================================================
  DATE FORMAT
============================================================= */

function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString(
      undefined,
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
    )
  } catch {
    return ''
  }
}

export default SellerDashboard