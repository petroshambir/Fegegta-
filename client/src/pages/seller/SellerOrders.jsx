// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import {
//   Eye,
//   Package,
// } from 'lucide-react'

// import {
//   getSellerOrders,
//   calculateCommission,
//   calculateSellerEarnings,
// } from '../../services/sellerStorage'

// function SellerOrders() {
//   const [orders, setOrders] =
//     useState([])

//   useEffect(() => {
//     setOrders(getSellerOrders())
//   }, [])

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <h1 className="text-2xl font-bold">
//           Seller Orders
//         </h1>

//         <p className="mt-1 text-sm text-gray-500">
//           Orders containing products from your store.
//         </p>

//         {orders.length === 0 ? (
//           <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-12 text-center">
//             <Package className="mx-auto h-12 w-12 text-gray-400" />

//             <h2 className="mt-4 font-bold">
//               No orders yet
//             </h2>

//             <p className="mt-1 text-sm text-gray-500">
//               Your customer orders will appear here.
//             </p>
//           </div>
//         ) : (
//           <div className="mt-6 space-y-4">
//             {orders.map((order) => {
//               const sellerItems =
//                 order.items?.filter(
//                   (item) =>
//                     item.sellerId ===
//                     order.sellerId
//                 ) ||
//                 order.items ||
//                 []

//               const subtotal =
//                 sellerItems.reduce(
//                   (sum, item) =>
//                     sum +
//                     Number(
//                       item.price || 0
//                     ) *
//                       Number(
//                         item.quantity || 1
//                       ),
//                   0
//                 )

//               const amount =
//                 subtotal ||
//                 Number(order.total || 0)

//               const commission =
//                 calculateCommission(
//                   amount
//                 )

//               const earnings =
//                 calculateSellerEarnings(
//                   amount
//                 )

//               return (
//                 <div
//                   key={order.id}
//                   className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
//                 >
//                   <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//                     <div>
//                       <p className="text-xs text-gray-500">
//                         Order
//                       </p>

//                       <h2 className="mt-1 font-bold">
//                         #{order.id}
//                       </h2>

//                       <p className="mt-1 text-sm text-gray-500">
//                         {order.customerName ||
//                           'Customer'}
//                       </p>
//                     </div>

//                     <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold">
//                       {order.status ||
//                         'Pending'}
//                     </span>
//                   </div>

//                   <div className="mt-5 grid gap-3 sm:grid-cols-3">
//                     <Summary
//                       label="Sale"
//                       value={`€${amount.toFixed(2)}`}
//                     />

//                     <Summary
//                       label="Commission"
//                       value={`€${commission.toFixed(2)}`}
//                     />

//                     <Summary
//                       label="Your Earnings"
//                       value={`€${earnings.toFixed(2)}`}
//                     />
//                   </div>

//                   <div className="mt-5 border-t pt-5">
//                     <div className="space-y-2">
//                       {sellerItems.map(
//                         (
//                           item,
//                           index
//                         ) => (
//                           <div
//                             key={
//                               item.id ||
//                               item.productId ||
//                               index
//                             }
//                             className="flex justify-between text-sm"
//                           >
//                             <span>
//                               {item.name ||
//                                 'Product'}{' '}
//                               ×{' '}
//                               {item.quantity ||
//                                 1}
//                             </span>

//                             <span className="font-semibold">
//                               €
//                               {(
//                                 Number(
//                                   item.price ||
//                                     0
//                                 ) *
//                                 Number(
//                                   item.quantity ||
//                                     1
//                                 )
//                               ).toFixed(2)}
//                             </span>
//                           </div>
//                         )
//                       )}
//                     </div>
//                   </div>

//                   <div className="mt-5 flex justify-end">
//                     <Link
//                       to={`/seller/orders/${order.id}`}
//                       className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
//                     >
//                       <Eye className="h-4 w-4" />
//                       View Order
//                     </Link>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// function Summary({
//   label,
//   value,
// }) {
//   return (
//     <div className="rounded-2xl bg-gray-50 p-4">
//       <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
//         {label}
//       </p>

//       <p className="mt-1 font-bold">
//         {value}
//       </p>
//     </div>
//   )
// }

// export default SellerOrders

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Eye,
  Package,
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

function SellerOrders() {
  const [orders, setOrders] =
    useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    let refreshTimer = null
    const loadOrders = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('Please sign in again to view seller orders.')
        const response = await fetch(`${API_URL}/seller/orders`, {
          headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data?.message || 'Could not load orders.')
        if (!cancelled) {
          setOrders((Array.isArray(data?.orders) ? data.orders : []).map(normalizeOrder))
          setError('')
        }
      } catch (loadError) {
        if (!cancelled) setError(loadError?.message || 'Could not load orders.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    loadOrders()
    refreshTimer = window.setInterval(loadOrders, 30000)
    return () => {
      cancelled = true
      window.clearInterval(refreshTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold">
          Seller Orders
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          You have {orders.length} {orders.length === 1 ? 'customer order' : 'customer orders'} containing products from your store.
        </p>

        {loading ? (
          <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500">
            Loading your customer orders...
          </div>
        ) : error ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-12 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-400" />

            <h2 className="mt-4 font-bold">
              No orders yet
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your customer orders will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {orders.map((order) => {
              const sellerItems =
                order.items?.filter(
                  (item) =>
                    item.sellerId ===
                    order.sellerId
                ) ||
                order.items ||
                []

              const subtotal =
                sellerItems.reduce(
                  (sum, item) =>
                    sum +
                    Number(
                      item.price || 0
                    ) *
                      Number(
                        item.quantity || 1
                      ),
                  0
                )

              const amount =
                subtotal ||
                Number(order.total || 0)

              const commission =
                calculateCommission(
                  amount
                )

              const earnings =
                calculateSellerEarnings(
                  amount
                )

              return (
                <div
                  key={order.id}
                  className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-xs text-gray-500">
                        Order
                      </p>

                      <h2 className="mt-1 font-bold">
                        #{order.id}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {order.customerName ||
                          'Customer'}
                      </p>
                      {(order.customerEmail || order.customerPhone) && (
                        <p className="mt-1 text-xs text-gray-500">
                          {[order.customerEmail, order.customerPhone].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </div>

                    <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold">
                      {order.status ||
                        'Pending'}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <Summary
                      label="Sale"
                      value={`€${amount.toFixed(2)}`}
                    />

                    <Summary
                      label="Commission"
                      value={`€${commission.toFixed(2)}`}
                    />

                    <Summary
                      label="Your Earnings"
                      value={`€${earnings.toFixed(2)}`}
                    />
                  </div>

                  <div className="mt-5 border-t pt-5">
                    <div className="space-y-2">
                      {sellerItems.map(
                        (
                          item,
                          index
                        ) => (
                          <div
                            key={
                              item.id ||
                              item.productId ||
                              index
                            }
                            className="flex justify-between text-sm"
                          >
                            <span>
                              {item.name ||
                                'Product'}{' '}
                              ×{' '}
                              {item.quantity ||
                                1}
                            </span>

                            <span className="font-semibold">
                              €
                              {(
                                Number(
                                  item.price ||
                                    0
                                ) *
                                Number(
                                  item.quantity ||
                                    1
                                )
                              ).toFixed(2)}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="mt-5 flex justify-end">
                    <Link
                      to={`/seller/orders/${order.id}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
                    >
                      <Eye className="h-4 w-4" />
                      View Order
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function Summary({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-bold">
        {value}
      </p>
    </div>
  )
}

export default SellerOrders
