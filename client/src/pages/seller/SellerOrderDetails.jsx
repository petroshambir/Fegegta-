// import React, { useEffect, useState } from 'react'
// import { Link, useParams } from 'react-router-dom'
// import {
//   ArrowLeft,
//   Package,
//   Receipt,
// } from 'lucide-react'

// import {
//   getSellerOrderById,
//   calculateCommission,
//   calculateSellerEarnings,
// } from '../../services/sellerStorage'

// function SellerOrderDetails() {
//   const { id } = useParams()

//   const [order, setOrder] = useState(null)

//   useEffect(() => {
//     setOrder(getSellerOrderById(id))
//   }, [id])

//   if (!order) {
//     return (
//       <div className="min-h-screen bg-gray-50 px-4 py-12">
//         <div className="mx-auto max-w-2xl rounded-3xl border bg-white p-10 text-center">
//           <Package className="mx-auto h-12 w-12 text-gray-400" />

//           <h1 className="mt-4 text-2xl font-bold">
//             Order Not Found
//           </h1>

//           <Link
//             to="/seller/orders"
//             className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
//           >
//             Back to Orders
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   const sellerId =
//     order.sellerId ||
//     order.items?.find(
//       (item) =>
//         item.sellerId
//     )?.sellerId

//   const sellerItems =
//     order.items?.filter(
//       (item) =>
//         !sellerId ||
//         item.sellerId === sellerId
//     ) || []

//   const subtotal = sellerItems.reduce(
//     (sum, item) =>
//       sum +
//       Number(item.price || 0) *
//         Number(item.quantity || 1),
//     0
//   )

//   const baseAmount =
//     sellerItems.length > 0
//       ? subtotal
//       : Number(order.total || 0)

//   const commission =
//     calculateCommission(baseAmount)

//   const earnings =
//     calculateSellerEarnings(baseAmount)

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-5xl">
//         <Link
//           to="/seller/orders"
//           className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to Orders
//         </Link>

//         <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
//           <div className="border-b border-gray-200 p-6 sm:p-8">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">
//                   Order
//                 </p>

//                 <h1 className="mt-1 text-2xl font-bold">
//                   #{order.id}
//                 </h1>
//               </div>

//               <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold">
//                 {order.status || 'Pending'}
//               </span>
//             </div>
//           </div>

//           <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
//             <section>
//               <div className="flex items-center gap-2">
//                 <Package className="h-5 w-5" />
//                 <h2 className="font-bold">
//                   Products
//                 </h2>
//               </div>

//               <div className="mt-4 space-y-3">
//                 {sellerItems.map(
//                   (item, index) => (
//                     <div
//                       key={
//                         item.id ||
//                         item.productId ||
//                         index
//                       }
//                       className="flex gap-4 rounded-2xl border border-gray-200 p-4"
//                     >
//                       <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
//                         {item.image && (
//                           <img
//                             src={item.image}
//                             alt={item.name}
//                             className="h-full w-full object-cover"
//                           />
//                         )}
//                       </div>

//                       <div className="min-w-0 flex-1">
//                         <p className="font-semibold">
//                           {item.name ||
//                             'Product'}
//                         </p>

//                         <p className="mt-1 text-sm text-gray-500">
//                           Qty: {item.quantity || 1}
//                         </p>
//                       </div>

//                       <p className="font-semibold">
//                         €
//                         {(
//                           Number(item.price || 0) *
//                           Number(item.quantity || 1)
//                         ).toFixed(2)}
//                       </p>
//                     </div>
//                   )
//                 )}
//               </div>
//             </section>

//             <section>
//               <div className="flex items-center gap-2">
//                 <Receipt className="h-5 w-5" />
//                 <h2 className="font-bold">
//                   Seller Earnings
//                 </h2>
//               </div>

//               <div className="mt-4 space-y-3">
//                 <Summary
//                   label="Seller Sales"
//                   value={`€${baseAmount.toFixed(2)}`}
//                 />

//                 <Summary
//                   label="Platform Commission"
//                   value={`€${commission.toFixed(2)}`}
//                 />

//                 <div className="rounded-2xl bg-black p-5 text-white">
//                   <p className="text-sm text-gray-300">
//                     Seller Earnings
//                   </p>

//                   <p className="mt-1 text-2xl font-bold">
//                     €{earnings.toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//             </section>
//           </div>

//           <div className="border-t border-gray-200 p-6 sm:p-8">
//             <h2 className="font-bold">
//               Customer Information
//             </h2>

//             <div className="mt-4 grid gap-4 sm:grid-cols-2">
//               <Summary
//                 label="Customer"
//                 value={
//                   order.customerName ||
//                   order.customer?.name ||
//                   '—'
//                 }
//               />

//               <Summary
//                 label="Email"
//                 value={
//                   order.customerEmail ||
//                   order.customer?.email ||
//                   '—'
//                 }
//               />

//               <Summary
//                 label="Phone"
//                 value={
//                   order.customerPhone ||
//                   order.customer?.phone ||
//                   '—'
//                 }
//               />

//               <Summary
//                 label="Order Date"
//                 value={
//                   order.createdAt
//                     ? new Date(
//                         order.createdAt
//                       ).toLocaleString()
//                     : '—'
//                 }
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function Summary({ label, value }) {
//   return (
//     <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
//       <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
//         {label}
//       </p>

//       <p className="mt-1 font-semibold text-gray-900">
//         {value}
//       </p>
//     </div>
//   )
// }

// export default SellerOrderDetails

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Package,
  Receipt,
} from 'lucide-react'

import {
  calculateCommission,
  calculateSellerEarnings,
} from '../../services/sellerStorage'

const API_URL = 'https://fegegta-server.onrender.com/api'

const getId = (value) => {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object') return String(value._id || value.id || '')
  return String(value)
}

const normalizeOrder = (order) => {
  const customer = order.user || order.customer || {}
  const items = (Array.isArray(order.items) ? order.items : []).map((item) => {
    const product = item.product && typeof item.product === 'object' ? item.product : {}
    const firstImage = Array.isArray(product.images) ? product.images[0] : null
    const image = typeof firstImage === 'string'
      ? firstImage
      : firstImage?.url || firstImage?.secure_url || product.image || ''
    return {
      ...item,
      id: String(item._id || item.id || product._id || product.id || ''),
      sellerId: getId(item.seller || item.sellerId),
      name: item.name || product.name || 'Product',
      image: item.image || image,
      price: Number(item.price ?? product.price ?? 0),
      quantity: Number(item.quantity || 1),
    }
  })
  return {
    ...order,
    id: String(order._id || order.id || ''),
    sellerId: getId(order.sellerId || items.find((item) => item.sellerId)?.sellerId),
    status: order.status || order.orderStatus || 'pending',
    customer,
    customerName:
      order.customerName || customer.name ||
      [customer.firstName, customer.lastName].filter(Boolean).join(' ') || 'Customer',
    customerEmail: order.customerEmail || customer.email || '',
    customerPhone: order.customerPhone || customer.phone || '',
    items,
  }
}

function SellerOrderDetails() {
  const { id } = useParams()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    const loadOrder = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('Please sign in again to view this order.')
        const response = await fetch(`${API_URL}/seller/orders`, {
          headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data?.message || 'Could not load this order.')
        const orders = (Array.isArray(data?.orders) ? data.orders : []).map(normalizeOrder)
        if (!cancelled) {
          setOrder(orders.find((entry) => String(entry.id) === String(id)) || null)
          setError('')
        }
      } catch (loadError) {
        if (!cancelled) setError(loadError?.message || 'Could not load this order.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    loadOrder()
    return () => { cancelled = true }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-3xl border bg-white p-10 text-center text-sm text-gray-500">
          Loading order details...
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-3xl border bg-white p-10 text-center">
          <Package className="mx-auto h-12 w-12 text-gray-400" />

          <h1 className="mt-4 text-2xl font-bold">
            {error ? 'Could Not Load Order' : 'Order Not Found'}
          </h1>

          {error && <p className="mt-2 text-sm text-gray-500">{error}</p>}

          <Link
            to="/seller/orders"
            className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    )
  }

  const sellerId =
    order.sellerId ||
    order.items?.find(
      (item) =>
        item.sellerId
    )?.sellerId

  const sellerItems =
    order.items?.filter(
      (item) =>
        !sellerId ||
        item.sellerId === sellerId
    ) || []

  const subtotal = sellerItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  )

  const baseAmount =
    sellerItems.length > 0
      ? subtotal
      : Number(order.total || 0)

  const commission =
    calculateCommission(baseAmount)

  const earnings =
    calculateSellerEarnings(baseAmount)

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/seller/orders"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Link>

        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Order
                </p>

                <h1 className="mt-1 text-2xl font-bold">
                  #{order.id}
                </h1>
              </div>

              <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold">
                {order.status || 'Pending'}
              </span>
            </div>
          </div>

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
            <section>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                <h2 className="font-bold">
                  Products
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                {sellerItems.map(
                  (item, index) => (
                    <div
                      key={
                        item.id ||
                        item.productId ||
                        index
                      }
                      className="flex gap-4 rounded-2xl border border-gray-200 p-4"
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">
                          {item.name ||
                            'Product'}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Qty: {item.quantity || 1}
                        </p>
                      </div>

                      <p className="font-semibold">
                        €
                        {(
                          Number(item.price || 0) *
                          Number(item.quantity || 1)
                        ).toFixed(2)}
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                <h2 className="font-bold">
                  Seller Earnings
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                <Summary
                  label="Seller Sales"
                  value={`€${baseAmount.toFixed(2)}`}
                />

                <Summary
                  label="Platform Commission"
                  value={`€${commission.toFixed(2)}`}
                />

                <div className="rounded-2xl bg-black p-5 text-white">
                  <p className="text-sm text-gray-300">
                    Seller Earnings
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    €{earnings.toFixed(2)}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="border-t border-gray-200 p-6 sm:p-8">
            <h2 className="font-bold">
              Customer Information
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Summary
                label="Customer"
                value={
                  order.customerName ||
                  order.customer?.name ||
                  '—'
                }
              />

              <Summary
                label="Email"
                value={
                  order.customerEmail ||
                  order.customer?.email ||
                  '—'
                }
              />

              <Summary
                label="Phone"
                value={
                  order.customerPhone ||
                  order.customer?.phone ||
                  '—'
                }
              />

              <Summary
                label="Shipping Address"
                value={formatShippingAddress(order.shippingAddress || order.deliveryAddress)}
              />

              <Summary
                label="Order Date"
                value={
                  order.createdAt
                    ? new Date(
                        order.createdAt
                      ).toLocaleString()
                    : '—'
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatShippingAddress(address) {
  if (!address) return '—'
  if (typeof address === 'string') return address
  if (typeof address !== 'object') return String(address)
  return [
    address.fullName,
    address.address || address.street || address.line1,
    address.address2 || address.line2,
    address.city,
    address.region || address.state,
    address.postalCode || address.zipCode,
    address.country,
    address.phone,
  ].filter(Boolean).join(', ') || '—'
}

function Summary({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-semibold text-gray-900">
        {value}
      </p>
    </div>
  )
}

export default SellerOrderDetails
