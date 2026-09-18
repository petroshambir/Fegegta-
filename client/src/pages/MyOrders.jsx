// // src/pages/MyOrders.jsx

// import React, { useEffect, useState } from 'react';
// import {
//   ArrowLeft,
//   Calendar,
//   ChevronDown,
//   ChevronUp,
//   Clock,
//   CreditCard,
//   MapPin,
//   Package,
//   ShoppingBag,
//   Truck,
//   User,
// } from 'lucide-react';

// import { Link } from 'react-router-dom';
// import { useLanguage } from '../context/LanguageContext';


// // ============================================================
// // LOCAL STORAGE KEY
// // Must match the key used in Checkout.jsx
// // ============================================================

// const ORDERS_STORAGE_KEY = 'fegegta_orders';


// // ============================================================
// // FORMAT PRICE
// // ============================================================

// const formatPrice = (price) => {
//   const number = Number(price || 0);

//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//   }).format(number);
// };


// // ============================================================
// // FORMAT DATE
// // ============================================================

// const formatDate = (date) => {
//   if (!date) return '—';

//   try {
//     return new Date(date).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   } catch {
//     return '—';
//   }
// };


// // ============================================================
// // FORMAT TIME
// // ============================================================

// const formatTime = (date) => {
//   if (!date) return '';

//   try {
//     return new Date(date).toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   } catch {
//     return '';
//   }
// };


// // ============================================================
// // STATUS COLOR
// // ============================================================

// const getStatusClasses = (status) => {
//   const normalized = String(status || '').toLowerCase();

//   switch (normalized) {
//     case 'delivered':
//       return 'bg-green-100 text-green-700 border-green-200';

//     case 'shipped':
//       return 'bg-blue-100 text-blue-700 border-blue-200';

//     case 'processing':
//       return 'bg-yellow-100 text-yellow-700 border-yellow-200';

//     case 'cancelled':
//     case 'canceled':
//       return 'bg-red-100 text-red-700 border-red-200';

//     case 'pending':
//     default:
//       return 'bg-gray-100 text-gray-700 border-gray-200';
//   }
// };


// // ============================================================
// // STATUS LABEL
// // ============================================================

// const getStatusLabel = (status) => {
//   if (!status) return 'Pending';

//   const normalized = String(status).toLowerCase();

//   switch (normalized) {
//     case 'delivered':
//       return 'Delivered';

//     case 'shipped':
//       return 'Shipped';

//     case 'processing':
//       return 'Processing';

//     case 'cancelled':
//     case 'canceled':
//       return 'Cancelled';

//     case 'pending':
//     default:
//       return 'Pending';
//   }
// };


// // ============================================================
// // ORDER ITEM IMAGE
// // ============================================================

// const getItemImage = (item) => {
//   return (
//     item?.image ||
//     item?.imageUrl ||
//     item?.thumbnail ||
//     item?.images?.[0] ||
//     ''
//   );
// };


// // ============================================================
// // NORMALIZE ORDER
// // This keeps MyOrders compatible with different Checkout shapes.
// // ============================================================

// const normalizeOrder = (order, index) => {
//   const items = Array.isArray(order?.items)
//     ? order.items
//     : Array.isArray(order?.cartItems)
//       ? order.cartItems
//       : [];

//   const normalizedItems = items.map((item, itemIndex) => ({
//     id:
//       item?.id ||
//       item?._id ||
//       item?.productId ||
//       `item-${index}-${itemIndex}`,

//     name:
//       item?.name ||
//       item?.title ||
//       item?.productName ||
//       'Product',

//     seller:
//       item?.seller ||
//       item?.sellerName ||
//       item?.storeName ||
//       'Seller',

//     image: getItemImage(item),

//     price: Number(
//       item?.price ??
//       item?.sellingPrice ??
//       item?.unitPrice ??
//       0
//     ),

//     quantity: Number(
//       item?.quantity ??
//       item?.qty ??
//       1
//     ),
//   }));


//   const subtotalFromItems = normalizedItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );


//   const subtotal = Number(
//     order?.subtotal ??
//     order?.subTotal ??
//     subtotalFromItems
//   );


//   const shipping = Number(
//     order?.shipping ??
//     order?.shippingFee ??
//     order?.deliveryFee ??
//     0
//   );


//   const total = Number(
//     order?.total ??
//     order?.grandTotal ??
//     order?.orderTotal ??
//     subtotal + shipping
//   );


//   return {
//     ...order,

//     id:
//       order?.id ||
//       order?._id ||
//       order?.orderId ||
//       `FG-${Date.now()}-${index}`,

//     orderId:
//       order?.orderId ||
//       order?.id ||
//       order?._id ||
//       `FG-${Date.now()}-${index}`,

//     createdAt:
//       order?.createdAt ||
//       order?.date ||
//       order?.orderDate ||
//       new Date().toISOString(),

//     status:
//       order?.status ||
//       'Pending',

//     items: normalizedItems,

//     subtotal,

//     shipping,

//     total,

//     paymentMethod:
//       order?.paymentMethod ||
//       order?.payment?.method ||
//       '—',

//     customer: {
//       ...(order?.customer || {}),

//       fullName:
//         order?.customer?.fullName ||
//         order?.fullName ||
//         `${order?.firstName || ''} ${order?.lastName || ''}`.trim(),

//       email:
//         order?.customer?.email ||
//         order?.email ||
//         '',

//       phone:
//         order?.customer?.phone ||
//         order?.phone ||
//         '',

//       address:
//         order?.customer?.address ||
//         order?.address ||
//         '',

//       city:
//         order?.customer?.city ||
//         order?.city ||
//         '',

//       country:
//         order?.customer?.country ||
//         order?.country ||
//         '',

//       postalCode:
//         order?.customer?.postalCode ||
//         order?.postalCode ||
//         '',
//     },
//   };
// };


// // ============================================================
// // EMPTY STATE
// // ============================================================

// function EmptyOrders() {
//   return (
//     <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 text-center shadow-sm">

//       <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gray-100 flex items-center justify-center">
//         <ShoppingBag
//           size={38}
//           className="text-gray-400"
//         />
//       </div>

//       <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
//         No orders yet
//       </h2>

//       <p className="text-gray-500 max-w-md mx-auto mb-7">
//         You have not placed any orders yet. Start shopping and your orders will
//         appear here.
//       </p>

//       <Link
//         to="/products"
//         className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
//       >
//         <ShoppingBag size={18} />
//         Start Shopping
//       </Link>

//     </div>
//   );
// }


// // ============================================================
// // ORDER ITEM
// // ============================================================

// function OrderItem({ item }) {
//   return (
//     <div className="flex gap-4 py-4 border-b border-gray-100 last:border-b-0">

//       {/* IMAGE */}
//       <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">

//         {item.image ? (
//           <img
//             src={item.image}
//             alt={item.name}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center">
//             <Package
//               size={28}
//               className="text-gray-400"
//             />
//           </div>
//         )}

//       </div>


//       {/* PRODUCT INFO */}
//       <div className="flex-1 min-w-0">

//         <h4 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2">
//           {item.name}
//         </h4>

//         <p className="text-xs sm:text-sm text-gray-500 mt-1">
//           {item.seller}
//         </p>

//         <div className="flex flex-wrap items-center gap-3 mt-2">

//           <span className="text-sm text-gray-600">
//             Qty: {item.quantity}
//           </span>

//           <span className="font-semibold text-gray-900">
//             {formatPrice(item.price)}
//           </span>

//         </div>

//       </div>


//       {/* ITEM TOTAL */}
//       <div className="text-right shrink-0">

//         <p className="text-xs text-gray-500 mb-1">
//           Total
//         </p>

//         <p className="font-bold text-gray-900">
//           {formatPrice(item.price * item.quantity)}
//         </p>

//       </div>

//     </div>
//   );
// }


// // ============================================================
// // ORDER CARD
// // ============================================================

// function OrderCard({
//   order,
//   isOpen,
//   onToggle,
// }) {
//   return (
//     <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

//       {/* ======================================================
//           ORDER HEADER
//       ====================================================== */}

//       <button
//         type="button"
//         onClick={onToggle}
//         className="w-full text-left p-4 sm:p-6 hover:bg-gray-50 transition"
//       >

//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

//           {/* LEFT */}
//           <div className="flex items-start gap-3">

//             <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
//               <Package
//                 size={21}
//                 className="text-gray-700"
//               />
//             </div>

//             <div>

//               <div className="flex flex-wrap items-center gap-2">

//                 <h3 className="font-bold text-gray-900">
//                   Order #{order.orderId}
//                 </h3>

//                 <span
//                   className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusClasses(
//                     order.status
//                   )}`}
//                 >
//                   {getStatusLabel(order.status)}
//                 </span>

//               </div>


//               <div className="flex flex-wrap items-center gap-3 mt-2 text-xs sm:text-sm text-gray-500">

//                 <span className="inline-flex items-center gap-1.5">
//                   <Calendar size={14} />
//                   {formatDate(order.createdAt)}
//                 </span>

//                 <span className="inline-flex items-center gap-1.5">
//                   <Clock size={14} />
//                   {formatTime(order.createdAt)}
//                 </span>

//               </div>

//             </div>

//           </div>


//           {/* RIGHT */}
//           <div className="flex items-center justify-between lg:justify-end gap-5">

//             <div className="text-left lg:text-right">

//               <p className="text-xs text-gray-500">
//                 Total
//               </p>

//               <p className="text-lg font-bold text-gray-900">
//                 {formatPrice(order.total)}
//               </p>

//             </div>


//             <div className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center">

//               {isOpen ? (
//                 <ChevronUp size={19} />
//               ) : (
//                 <ChevronDown size={19} />
//               )}

//             </div>

//           </div>

//         </div>

//       </button>


//       {/* ======================================================
//           EXPANDED ORDER
//       ====================================================== */}

//       {isOpen && (
//         <div className="border-t border-gray-200">

//           {/* PRODUCTS */}
//           <div className="p-4 sm:p-6">

//             <div className="flex items-center gap-2 mb-3">

//               <ShoppingBag
//                 size={18}
//                 className="text-gray-700"
//               />

//               <h4 className="font-bold text-gray-900">
//                 Ordered Products
//               </h4>

//             </div>


//             {order.items.length > 0 ? (
//               <div>
//                 {order.items.map((item, index) => (
//                   <OrderItem
//                     key={`${item.id}-${index}`}
//                     item={item}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="py-6 text-center text-gray-500">
//                 No product information available.
//               </div>
//             )}

//           </div>


//           {/* DETAILS GRID */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-gray-200">

//             {/* CUSTOMER */}
//             <div className="p-4 sm:p-6 lg:border-r border-gray-200">

//               <div className="flex items-center gap-2 mb-4">

//                 <User
//                   size={18}
//                   className="text-gray-700"
//                 />

//                 <h4 className="font-bold text-gray-900">
//                   Customer Information
//                 </h4>

//               </div>


//               <div className="space-y-3 text-sm">

//                 {order.customer.fullName && (
//                   <div>
//                     <p className="text-xs text-gray-500">
//                       Name
//                     </p>

//                     <p className="font-medium text-gray-900">
//                       {order.customer.fullName}
//                     </p>
//                   </div>
//                 )}


//                 {order.customer.email && (
//                   <div>
//                     <p className="text-xs text-gray-500">
//                       Email
//                     </p>

//                     <p className="font-medium text-gray-900 break-all">
//                       {order.customer.email}
//                     </p>
//                   </div>
//                 )}


//                 {order.customer.phone && (
//                   <div>
//                     <p className="text-xs text-gray-500">
//                       Phone
//                     </p>

//                     <p className="font-medium text-gray-900">
//                       {order.customer.phone}
//                     </p>
//                   </div>
//                 )}

//               </div>

//             </div>


//             {/* SHIPPING */}
//             <div className="p-4 sm:p-6">

//               <div className="flex items-center gap-2 mb-4">

//                 <MapPin
//                   size={18}
//                   className="text-gray-700"
//                 />

//                 <h4 className="font-bold text-gray-900">
//                   Shipping Information
//                 </h4>

//               </div>


//               <div className="space-y-3 text-sm">

//                 {order.customer.address && (
//                   <div>
//                     <p className="text-xs text-gray-500">
//                       Address
//                     </p>

//                     <p className="font-medium text-gray-900">
//                       {order.customer.address}
//                     </p>
//                   </div>
//                 )}


//                 {(order.customer.city || order.customer.country) && (
//                   <div>
//                     <p className="text-xs text-gray-500">
//                       Location
//                     </p>

//                     <p className="font-medium text-gray-900">
//                       {[
//                         order.customer.city,
//                         order.customer.country,
//                       ]
//                         .filter(Boolean)
//                         .join(', ')}
//                     </p>
//                   </div>
//                 )}


//                 {order.customer.postalCode && (
//                   <div>
//                     <p className="text-xs text-gray-500">
//                       Postal Code
//                     </p>

//                     <p className="font-medium text-gray-900">
//                       {order.customer.postalCode}
//                     </p>
//                   </div>
//                 )}

//               </div>

//             </div>

//           </div>


//           {/* ==================================================
//               ORDER SUMMARY
//           ================================================== */}

//           <div className="border-t border-gray-200 bg-gray-50 p-4 sm:p-6">

//             <div className="flex items-center gap-2 mb-4">

//               <CreditCard
//                 size={18}
//                 className="text-gray-700"
//               />

//               <h4 className="font-bold text-gray-900">
//                 Order Summary
//               </h4>

//             </div>


//             <div className="max-w-md ml-auto space-y-3 text-sm">

//               {/* SUBTOTAL */}
//               <div className="flex justify-between gap-4">

//                 <span className="text-gray-600">
//                   Subtotal
//                 </span>

//                 <span className="font-medium text-gray-900">
//                   {formatPrice(order.subtotal)}
//                 </span>

//               </div>


//               {/* SHIPPING */}
//               <div className="flex justify-between gap-4">

//                 <span className="inline-flex items-center gap-2 text-gray-600">

//                   <Truck size={15} />

//                   Shipping

//                 </span>

//                 <span className="font-medium text-gray-900">
//                   {order.shipping === 0
//                     ? 'Free'
//                     : formatPrice(order.shipping)}
//                 </span>

//               </div>


//               {/* PAYMENT */}
//               <div className="flex justify-between gap-4">

//                 <span className="text-gray-600">
//                   Payment
//                 </span>

//                 <span className="font-medium text-gray-900 capitalize">
//                   {String(order.paymentMethod || '—').replace(
//                     /[_-]/g,
//                     ' '
//                   )}
//                 </span>

//               </div>


//               {/* TOTAL */}
//               <div className="pt-3 border-t border-gray-200 flex justify-between gap-4">

//                 <span className="font-bold text-gray-900">
//                   Total
//                 </span>

//                 <span className="text-xl font-bold text-gray-900">
//                   {formatPrice(order.total)}
//                 </span>

//               </div>

//             </div>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// }


// // ============================================================
// // MAIN COMPONENT
// // ============================================================

// export default function MyOrders() {

//   const { t } = useLanguage();

//   const [orders, setOrders] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [openOrderId, setOpenOrderId] = useState(null);


//   // ==========================================================
//   // LOAD ORDERS
//   // ==========================================================

//   useEffect(() => {
//     loadOrders();

//     // Listen when another component changes localStorage
//     const handleStorage = (event) => {
//       if (event.key === ORDERS_STORAGE_KEY) {
//         loadOrders();
//       }
//     };

//     window.addEventListener('storage', handleStorage);

//     return () => {
//       window.removeEventListener('storage', handleStorage);
//     };
//   }, []);


//   // ==========================================================
//   // LOAD ORDERS FUNCTION
//   // ==========================================================

//   const loadOrders = () => {
//     setLoading(true);

//     try {
//       const storedOrders = localStorage.getItem(
//         ORDERS_STORAGE_KEY
//       );


//       if (!storedOrders) {
//         setOrders([]);
//         setLoading(false);
//         return;
//       }


//       const parsedOrders = JSON.parse(storedOrders);


//       if (!Array.isArray(parsedOrders)) {
//         setOrders([]);
//         setLoading(false);
//         return;
//       }


//       const normalizedOrders = parsedOrders
//         .map((order, index) =>
//           normalizeOrder(order, index)
//         )
//         .sort(
//           (a, b) =>
//             new Date(b.createdAt) -
//             new Date(a.createdAt)
//         );


//       setOrders(normalizedOrders);

//     } catch (error) {
//       console.error(
//         'Failed to load orders:',
//         error
//       );

//       setOrders([]);

//     } finally {
//       setLoading(false);
//     }
//   };


//   // ==========================================================
//   // TOGGLE ORDER
//   // ==========================================================

//   const toggleOrder = (orderId) => {
//     setOpenOrderId((current) =>
//       current === orderId
//         ? null
//         : orderId
//     );
//   };


//   // ==========================================================
//   // PAGE
//   // ==========================================================

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* ====================================================
//           HEADER
//       ==================================================== */}

//       <div className="bg-white border-b border-gray-200">

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//           <div className="py-6 sm:py-8">

//             {/* BACK */}
//             <Link
//               to="/"
//               className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition mb-5"
//             >
//               <ArrowLeft size={17} />
//               Back to Home
//             </Link>


//             {/* TITLE */}
//             <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

//               <div>

//                 <div className="flex items-center gap-3 mb-2">

//                   <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center">

//                     <Package size={22} />

//                   </div>

//                   <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                     {t?.myOrders || 'My Orders'}
//                   </h1>

//                 </div>


//                 <p className="text-gray-500 text-sm sm:text-base">
//                   View and track all your orders in one place.
//                 </p>

//               </div>


//               {/* ORDER COUNT */}
//               {!loading && orders.length > 0 && (
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold w-fit">

//                   <ShoppingBag size={17} />

//                   {orders.length}{' '}
//                   {orders.length === 1
//                     ? 'Order'
//                     : 'Orders'}

//                 </div>
//               )}

//             </div>

//           </div>

//         </div>

//       </div>


//       {/* ====================================================
//           CONTENT
//       ==================================================== */}

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

//         {/* LOADING */}
//         {loading ? (

//           <div className="space-y-4">

//             {[1, 2, 3].map((item) => (
//               <div
//                 key={item}
//                 className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse"
//               >

//                 <div className="flex items-center gap-4">

//                   <div className="w-11 h-11 rounded-xl bg-gray-200" />

//                   <div className="flex-1">

//                     <div className="h-4 bg-gray-200 rounded w-40 mb-3" />

//                     <div className="h-3 bg-gray-200 rounded w-28" />

//                   </div>

//                   <div className="h-6 bg-gray-200 rounded w-20" />

//                 </div>

//               </div>
//             ))}

//           </div>

//         ) : orders.length === 0 ? (

//           <EmptyOrders />

//         ) : (

//           <div className="space-y-4">

//             {orders.map((order) => (
//               <OrderCard
//                 key={order.id}
//                 order={order}
//                 isOpen={
//                   openOrderId === order.id
//                 }
//                 onToggle={() =>
//                   toggleOrder(order.id)
//                 }
//               />
//             ))}

//           </div>

//         )}

//       </main>

//     </div>
//   );
// }

import React, { useEffect, useState } from 'react'

import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  MapPin,
  Package,
  ShoppingBag,
  Truck,
  User,
} from 'lucide-react'

import { Link } from 'react-router-dom'

import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'


// ============================================================
// FEGEGTA API
// ============================================================

const API_URL = 'https://fegegta-server.onrender.com/api'


// ============================================================
// FORMAT PRICE
// ============================================================

const formatPrice = (price) => {
  const number = Number(price || 0)

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(number)
}


// ============================================================
// FORMAT DATE
// ============================================================

const formatDate = (date) => {
  if (!date) return '—'

  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return '—'
  }
}


// ============================================================
// FORMAT TIME
// ============================================================

const formatTime = (date) => {
  if (!date) return ''

  try {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return ''
  }
}


// ============================================================
// STATUS COLOR
// ============================================================

const getStatusClasses = (status) => {
  const normalized = String(status || '').toLowerCase()

  switch (normalized) {
    case 'delivered':
      return 'bg-green-100 text-green-700 border-green-200'

    case 'shipped':
      return 'bg-blue-100 text-blue-700 border-blue-200'

    case 'processing':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200'

    case 'cancelled':
    case 'canceled':
      return 'bg-red-100 text-red-700 border-red-200'

    case 'pending':
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}


// ============================================================
// STATUS LABEL
// ============================================================

const getStatusLabel = (status) => {
  if (!status) return 'Pending'

  const normalized = String(status).toLowerCase()

  switch (normalized) {
    case 'delivered':
      return 'Delivered'

    case 'shipped':
      return 'Shipped'

    case 'processing':
      return 'Processing'

    case 'cancelled':
    case 'canceled':
      return 'Cancelled'

    case 'pending':
    default:
      return 'Pending'
  }
}


// ============================================================
// ORDER ITEM IMAGE
// ============================================================

const getItemImage = (item) => {
  if (!item) return ''

  if (item.image) return item.image

  if (item.imageUrl) return item.imageUrl

  if (item.thumbnail) return item.thumbnail

  if (Array.isArray(item.images)) {
    const firstImage = item.images[0]

    if (typeof firstImage === 'string') {
      return firstImage
    }

    if (firstImage?.url) {
      return firstImage.url
    }
  }

  if (item.product?.image) {
    return item.product.image
  }

  if (Array.isArray(item.product?.images)) {
    const firstImage = item.product.images[0]

    if (typeof firstImage === 'string') {
      return firstImage
    }

    if (firstImage?.url) {
      return firstImage.url
    }
  }

  return ''
}


// ============================================================
// NORMALIZE ORDER
// Backend order -> frontend order shape
// ============================================================

const normalizeOrder = (order, index) => {
  const items = Array.isArray(order?.items)
    ? order.items
    : Array.isArray(order?.cartItems)
      ? order.cartItems
      : []

  const normalizedItems = items.map((item, itemIndex) => {
    const product = item?.product || {}

    return {
      id:
        item?.id ||
        item?._id ||
        item?.productId ||
        product?._id ||
        product?.id ||
        `item-${index}-${itemIndex}`,

      name:
        item?.name ||
        item?.title ||
        item?.productName ||
        product?.name ||
        'Product',

      seller:
        item?.seller ||
        item?.sellerName ||
        item?.storeName ||
        product?.seller?.businessName ||
        product?.seller?.name ||
        'Seller',

      image: getItemImage(item) || getItemImage(product),

      price: Number(
        item?.price ??
        item?.sellingPrice ??
        item?.unitPrice ??
        product?.price ??
        0
      ),

      quantity: Number(
        item?.quantity ??
        item?.qty ??
        1
      ),
    }
  })


  const subtotalFromItems = normalizedItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )


  const subtotal = Number(
    order?.subtotal ??
    order?.subTotal ??
    subtotalFromItems
  )


  const shipping = Number(
    order?.shipping ??
    order?.shippingFee ??
    order?.deliveryFee ??
    0
  )


  const total = Number(
    order?.total ??
    order?.grandTotal ??
    order?.orderTotal ??
    subtotal + shipping
  )


  const customerData = order?.customer || {}


  return {
    ...order,

    id:
      order?.id ||
      order?._id ||
      order?.orderId ||
      `FG-${Date.now()}-${index}`,

    orderId:
      order?.orderNumber ||
      order?.orderId ||
      order?.id ||
      order?._id ||
      `FG-${Date.now()}-${index}`,

    createdAt:
      order?.createdAt ||
      order?.date ||
      order?.orderDate ||
      new Date().toISOString(),

    status:
      order?.status ||
      'Pending',

    items: normalizedItems,

    subtotal,

    shipping,

    total,

    paymentMethod:
      order?.paymentMethod ||
      order?.payment?.method ||
      '—',

    customer: {
      ...customerData,

      fullName:
        customerData?.fullName ||
        order?.fullName ||
        `${order?.firstName || ''} ${order?.lastName || ''}`.trim(),

      email:
        customerData?.email ||
        order?.email ||
        '',

      phone:
        customerData?.phone ||
        order?.phone ||
        '',

      address:
        customerData?.address ||
        order?.address ||
        '',

      apartment:
        customerData?.apartment ||
        order?.apartment ||
        '',

      city:
        customerData?.city ||
        order?.city ||
        '',

      state:
        customerData?.state ||
        order?.state ||
        '',

      country:
        customerData?.country ||
        order?.country ||
        '',

      postalCode:
        customerData?.postalCode ||
        order?.postalCode ||
        '',
    },
  }
}


// ============================================================
// EMPTY STATE
// ============================================================

function EmptyOrders() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">

      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <ShoppingBag
          size={38}
          className="text-gray-400"
        />
      </div>

      <h2 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
        No orders yet
      </h2>

      <p className="mx-auto mb-7 max-w-md text-gray-500">
        You have not placed any orders yet. Start shopping and your orders will
        appear here.
      </p>

      <Link
        to="/products"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
      >
        <ShoppingBag size={18} />
        Start Shopping
      </Link>

    </div>
  )
}


// ============================================================
// ORDER ITEM
// ============================================================

function OrderItem({ item }) {
  return (
    <div className="flex gap-4 border-b border-gray-100 py-4 last:border-b-0">

      {/* IMAGE */}

      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-24 sm:w-24">

        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package
              size={28}
              className="text-gray-400"
            />
          </div>
        )}

      </div>


      {/* PRODUCT INFO */}

      <div className="min-w-0 flex-1">

        <h4 className="line-clamp-2 text-sm font-semibold text-gray-900 sm:text-base">
          {item.name}
        </h4>

        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          {item.seller}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3">

          <span className="text-sm text-gray-600">
            Qty: {item.quantity}
          </span>

          <span className="font-semibold text-gray-900">
            {formatPrice(item.price)}
          </span>

        </div>

      </div>


      {/* ITEM TOTAL */}

      <div className="shrink-0 text-right">

        <p className="mb-1 text-xs text-gray-500">
          Total
        </p>

        <p className="font-bold text-gray-900">
          {formatPrice(
            item.price * item.quantity
          )}
        </p>

      </div>

    </div>
  )
}


// ============================================================
// ORDER CARD
// ============================================================

function OrderCard({
  order,
  isOpen,
  onToggle,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* ORDER HEADER */}

      <button
        type="button"
        onClick={onToggle}
        className="w-full p-4 text-left transition hover:bg-gray-50 sm:p-6"
      >

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* LEFT */}

          <div className="flex items-start gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100">
              <Package
                size={21}
                className="text-gray-700"
              />
            </div>

            <div>

              <div className="flex flex-wrap items-center gap-2">

                <h3 className="font-bold text-gray-900">
                  Order #{order.orderId}
                </h3>

                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                    order.status
                  )}`}
                >
                  {getStatusLabel(order.status)}
                </span>

              </div>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500 sm:text-sm">

                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} />
                  {formatDate(order.createdAt)}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} />
                  {formatTime(order.createdAt)}
                </span>

              </div>

            </div>

          </div>


          {/* RIGHT */}

          <div className="flex items-center justify-between gap-5 lg:justify-end">

            <div className="text-left lg:text-right">

              <p className="text-xs text-gray-500">
                Total
              </p>

              <p className="text-lg font-bold text-gray-900">
                {formatPrice(order.total)}
              </p>

            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200">

              {isOpen ? (
                <ChevronUp size={19} />
              ) : (
                <ChevronDown size={19} />
              )}

            </div>

          </div>

        </div>

      </button>


      {/* EXPANDED ORDER */}

      {isOpen && (
        <div className="border-t border-gray-200">

          {/* PRODUCTS */}

          <div className="p-4 sm:p-6">

            <div className="mb-3 flex items-center gap-2">

              <ShoppingBag
                size={18}
                className="text-gray-700"
              />

              <h4 className="font-bold text-gray-900">
                Ordered Products
              </h4>

            </div>

            {order.items.length > 0 ? (
              <div>
                {order.items.map((item, index) => (
                  <OrderItem
                    key={`${item.id}-${index}`}
                    item={item}
                  />
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-gray-500">
                No product information available.
              </div>
            )}

          </div>


          {/* DETAILS GRID */}

          <div className="grid grid-cols-1 border-t border-gray-200 lg:grid-cols-2">

            {/* CUSTOMER */}

            <div className="p-4 sm:p-6 lg:border-r lg:border-gray-200">

              <div className="mb-4 flex items-center gap-2">

                <User
                  size={18}
                  className="text-gray-700"
                />

                <h4 className="font-bold text-gray-900">
                  Customer Information
                </h4>

              </div>

              <div className="space-y-3 text-sm">

                {order.customer.fullName && (
                  <div>
                    <p className="text-xs text-gray-500">
                      Name
                    </p>

                    <p className="font-medium text-gray-900">
                      {order.customer.fullName}
                    </p>
                  </div>
                )}

                {order.customer.email && (
                  <div>
                    <p className="text-xs text-gray-500">
                      Email
                    </p>

                    <p className="break-all font-medium text-gray-900">
                      {order.customer.email}
                    </p>
                  </div>
                )}

                {order.customer.phone && (
                  <div>
                    <p className="text-xs text-gray-500">
                      Phone
                    </p>

                    <p className="font-medium text-gray-900">
                      {order.customer.phone}
                    </p>
                  </div>
                )}

              </div>

            </div>


            {/* SHIPPING */}

            <div className="p-4 sm:p-6">

              <div className="mb-4 flex items-center gap-2">

                <MapPin
                  size={18}
                  className="text-gray-700"
                />

                <h4 className="font-bold text-gray-900">
                  Shipping Information
                </h4>

              </div>

              <div className="space-y-3 text-sm">

                {order.customer.address && (
                  <div>
                    <p className="text-xs text-gray-500">
                      Address
                    </p>

                    <p className="font-medium text-gray-900">
                      {order.customer.address}
                    </p>
                  </div>
                )}

                {order.customer.apartment && (
                  <div>
                    <p className="text-xs text-gray-500">
                      Apartment
                    </p>

                    <p className="font-medium text-gray-900">
                      {order.customer.apartment}
                    </p>
                  </div>
                )}

                {(order.customer.city ||
                  order.customer.state ||
                  order.customer.country) && (
                  <div>
                    <p className="text-xs text-gray-500">
                      Location
                    </p>

                    <p className="font-medium text-gray-900">
                      {[
                        order.customer.city,
                        order.customer.state,
                        order.customer.country,
                      ]
                        .filter(Boolean)
                        .join(', ')}
                    </p>
                  </div>
                )}

                {order.customer.postalCode && (
                  <div>
                    <p className="text-xs text-gray-500">
                      Postal Code
                    </p>

                    <p className="font-medium text-gray-900">
                      {order.customer.postalCode}
                    </p>
                  </div>
                )}

              </div>

            </div>

          </div>


          {/* ORDER SUMMARY */}

          <div className="border-t border-gray-200 bg-gray-50 p-4 sm:p-6">

            <div className="mb-4 flex items-center gap-2">

              <CreditCard
                size={18}
                className="text-gray-700"
              />

              <h4 className="font-bold text-gray-900">
                Order Summary
              </h4>

            </div>

            <div className="ml-auto max-w-md space-y-3 text-sm">

              {/* SUBTOTAL */}

              <div className="flex justify-between gap-4">

                <span className="text-gray-600">
                  Subtotal
                </span>

                <span className="font-medium text-gray-900">
                  {formatPrice(order.subtotal)}
                </span>

              </div>


              {/* SHIPPING */}

              <div className="flex justify-between gap-4">

                <span className="inline-flex items-center gap-2 text-gray-600">

                  <Truck size={15} />

                  Shipping

                </span>

                <span className="font-medium text-gray-900">
                  {order.shipping === 0
                    ? 'Free'
                    : formatPrice(order.shipping)}
                </span>

              </div>


              {/* PAYMENT */}

              <div className="flex justify-between gap-4">

                <span className="text-gray-600">
                  Payment
                </span>

                <span className="font-medium capitalize text-gray-900">
                  {String(
                    order.paymentMethod || '—'
                  ).replace(
                    /[_-]/g,
                    ' '
                  )}
                </span>

              </div>


              {/* TOTAL */}

              <div className="flex justify-between gap-4 border-t border-gray-200 pt-3">

                <span className="font-bold text-gray-900">
                  Total
                </span>

                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(order.total)}
                </span>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}


// ============================================================
// MAIN COMPONENT
// ============================================================

export default function MyOrders() {
  const { t } = useLanguage()
  const { user, isLoading: authLoading, getToken } = useAuth()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [openOrderId, setOpenOrderId] = useState(null)


  // ==========================================================
  // LOAD ORDERS FROM BACKEND
  // ==========================================================

  useEffect(() => {
    if (authLoading) {
      return
    }

    if (!user) {
      setOrders([])
      setLoading(false)
      return
    }

    loadOrders()
  }, [user, authLoading])


  // ==========================================================
  // LOAD ORDERS FUNCTION
  // ==========================================================

  const loadOrders = async () => {
    setLoading(true)
    setError('')

    try {
      const token = getToken()

      if (!token) {
        throw new Error(
          'Your login session has expired. Please log in again.'
        )
      }


      // ======================================================
      // BACKEND AUTHENTICATED ORDERS REQUEST
      // ======================================================

      const response = await fetch(
        `${API_URL}/orders/my-orders`,
        {
          method: 'GET',

          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )


      const data = await response.json()


      if (!response.ok) {
        throw new Error(
          data?.message ||
          'Failed to load your orders.'
        )
      }


      // Backend returns:
      // { success: true, orders: [...] }

      const backendOrders =
        Array.isArray(data)
          ? data
          : Array.isArray(data?.orders)
            ? data.orders
            : []


      const normalizedOrders =
        backendOrders
          .map((order, index) =>
            normalizeOrder(order, index)
          )
          .sort(
            (a, b) =>
              new Date(b.createdAt) -
              new Date(a.createdAt)
          )


      setOrders(normalizedOrders)

    } catch (err) {
      console.error(
        'Failed to load orders:',
        err
      )

      setOrders([])

      setError(
        err?.message ||
        'Failed to load your orders.'
      )

    } finally {
      setLoading(false)
    }
  }


  // ==========================================================
  // TOGGLE ORDER
  // ==========================================================

  const toggleOrder = (orderId) => {
    setOpenOrderId((current) =>
      current === orderId
        ? null
        : orderId
    )
  }


  // ==========================================================
  // AUTH LOADING
  // ==========================================================

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50">

        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          <div className="animate-pulse space-y-4">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-gray-200 bg-white p-6"
              >
                <div className="flex items-center gap-4">

                  <div className="h-11 w-11 rounded-xl bg-gray-200" />

                  <div className="flex-1">

                    <div className="mb-3 h-4 w-40 rounded bg-gray-200" />

                    <div className="h-3 w-28 rounded bg-gray-200" />

                  </div>

                  <div className="h-6 w-20 rounded bg-gray-200" />

                </div>
              </div>
            ))}

          </div>

        </main>

      </div>
    )
  }


  // ==========================================================
  // NOT LOGGED IN
  // ==========================================================

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">

        <div className="border-b border-gray-200 bg-white">

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="py-6 sm:py-8">

              <Link
                to="/"
                className="mb-5 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-black"
              >
                <ArrowLeft size={17} />
                Back to Home
              </Link>

              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {t?.myOrders || 'My Orders'}
              </h1>

            </div>

          </div>

        </div>


        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <User
                size={30}
                className="text-gray-400"
              />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Please log in
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Please log in to view your orders.
            </p>

            <Link
              to="/login"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Log In
            </Link>

          </div>

        </main>

      </div>
    )
  }


  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="py-6 sm:py-8">

            {/* BACK */}

            <Link
              to="/"
              className="mb-5 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-black"
            >
              <ArrowLeft size={17} />
              Back to Home
            </Link>


            {/* TITLE */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <div className="mb-2 flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">

                    <Package size={22} />

                  </div>

                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    {t?.myOrders || 'My Orders'}
                  </h1>

                </div>


                <p className="text-sm text-gray-500 sm:text-base">
                  View and track all your orders in one place.
                </p>

              </div>


              {/* ORDER COUNT */}

              {!loading && orders.length > 0 && (
                <div className="inline-flex w-fit items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">

                  <ShoppingBag size={17} />

                  {orders.length}{' '}

                  {orders.length === 1
                    ? 'Order'
                    : 'Orders'}

                </div>
              )}

            </div>

          </div>

        </div>

      </div>


      {/* ====================================================
          CONTENT
      ==================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* ERROR */}

        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-5">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="font-semibold text-red-800">
                  Unable to load orders
                </h2>

                <p className="mt-1 text-sm text-red-600">
                  {error}
                </p>

              </div>

              <button
                type="button"
                onClick={loadOrders}
                className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Try Again
              </button>

            </div>

          </div>
        )}


        {/* LOADING */}

        {loading ? (

          <div className="space-y-4">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6"
              >

                <div className="flex items-center gap-4">

                  <div className="h-11 w-11 rounded-xl bg-gray-200" />

                  <div className="flex-1">

                    <div className="mb-3 h-4 w-40 rounded bg-gray-200" />

                    <div className="h-3 w-28 rounded bg-gray-200" />

                  </div>

                  <div className="h-6 w-20 rounded bg-gray-200" />

                </div>

              </div>
            ))}

          </div>

        ) : orders.length === 0 && !error ? (

          <EmptyOrders />

        ) : (

          <div className="space-y-4">

            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isOpen={
                  openOrderId === order.id
                }
                onToggle={() =>
                  toggleOrder(order.id)
                }
              />
            ))}

          </div>

        )}

      </main>

    </div>
  )
}