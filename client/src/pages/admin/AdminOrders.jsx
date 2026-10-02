// import React, { useEffect, useMemo, useState } from 'react'
// import {
//   Search,
//   ShoppingCart,
//   Eye,
// } from 'lucide-react'
// import { Link } from 'react-router-dom'

// import AdminSidebar from '../../components/admin/AdminSidebar'
// import AdminHeader from '../../components/admin/AdminHeader'
// import { getAllOrders } from '../../utils/adminStorage'

// function AdminOrders() {
//   const [mobileOpen, setMobileOpen] = useState(false)
//   const [orders, setOrders] = useState([])
//   const [search, setSearch] = useState('')

//   useEffect(() => {
//     setOrders(getAllOrders())
//   }, [])

//   const filtered = useMemo(() => {
//     return orders.filter((order) =>
//       `${order.id || ''} ${
//         order.orderNumber || ''
//       } ${order.customerName || ''} ${
//         order.email || ''
//       }`
//         .toLowerCase()
//         .includes(search.toLowerCase())
//     )
//   }, [orders, search])

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <AdminSidebar
//         mobileOpen={mobileOpen}
//         onClose={() => setMobileOpen(false)}
//       />

//       <div className="lg:pl-72">
//         <AdminHeader
//           onMenuClick={() => setMobileOpen(true)}
//         />

//         <main className="p-4 sm:p-6 lg:p-8">
//           <div className="mb-6">
//             <h1 className="text-2xl font-bold text-gray-900">
//               Orders
//             </h1>

//             <p className="mt-1 text-sm text-gray-500">
//               View all orders across the platform.
//             </p>
//           </div>

//           <div className="mb-5 relative max-w-md">
//             <Search
//               size={18}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />

//             <input
//               value={search}
//               onChange={(e) =>
//                 setSearch(e.target.value)
//               }
//               placeholder="Search orders..."
//               className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none"
//             />
//           </div>

//           <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
//             {filtered.length === 0 ? (
//               <div className="p-12 text-center">
//                 <ShoppingCart
//                   className="mx-auto text-gray-300"
//                   size={40}
//                 />

//                 <p className="mt-4 text-sm text-gray-500">
//                   No orders found.
//                 </p>
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="min-w-[950px] w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
//                         Order
//                       </th>

//                       <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
//                         Customer
//                       </th>

//                       <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
//                         Total
//                       </th>

//                       <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
//                         Status
//                       </th>

//                       <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
//                         Date
//                       </th>

//                       <th className="px-5 py-4 text-right text-xs uppercase text-gray-500">
//                         View
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y divide-gray-100">
//                     {filtered.map((order) => (
//                       <tr key={order.id}>
//                         <td className="px-5 py-4 text-sm font-semibold text-gray-900">
//                           #{order.orderNumber || order.id}
//                         </td>

//                         <td className="px-5 py-4">
//                           <p className="text-sm font-medium text-gray-900">
//                             {order.customerName ||
//                               order.customer?.name ||
//                               'Customer'}
//                           </p>

//                           <p className="text-xs text-gray-500">
//                             {order.email ||
//                               order.customer?.email ||
//                               ''}
//                           </p>
//                         </td>

//                         <td className="px-5 py-4 text-sm font-semibold">
//                           €{Number(
//                             order.total ||
//                               order.amount ||
//                               0
//                           ).toFixed(2)}
//                         </td>

//                         <td className="px-5 py-4">
//                           <Status
//                             status={order.status}
//                           />
//                         </td>

//                         <td className="px-5 py-4 text-sm text-gray-500">
//                           {formatDate(
//                             order.createdAt ||
//                               order.date
//                           )}
//                         </td>

//                         <td className="px-5 py-4 text-right">
//                           <Link
//                             to={`/account/orders/${order.id}`}
//                             className="inline-flex rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
//                           >
//                             <Eye size={17} />
//                           </Link>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// function Status({ status }) {
//   const styles = {
//     pending: 'bg-yellow-50 text-yellow-700',
//     processing: 'bg-blue-50 text-blue-700',
//     shipped: 'bg-purple-50 text-purple-700',
//     delivered: 'bg-green-50 text-green-700',
//     completed: 'bg-green-50 text-green-700',
//     cancelled: 'bg-red-50 text-red-700',
//   }

//   const normalized = String(
//     status || 'pending'
//   ).toLowerCase()

//   return (
//     <span
//       className={`rounded-full px-3 py-1 text-xs font-semibold ${
//         styles[normalized] ||
//         'bg-gray-100 text-gray-600'
//       }`}
//     >
//       {status || 'Pending'}
//     </span>
//   )
// }

// function formatDate(date) {
//   if (!date) return '—'

//   return new Date(date).toLocaleDateString()
// }

// export default AdminOrders

import React, { useEffect, useMemo, useState } from 'react'
import {
  Search,
  ShoppingCart,
  Eye,
  RefreshCw,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'

const API_URL =
  'https://fegegta-server.onrender.com/api'

const getToken = () => {
  return localStorage.getItem('token')
}

function AdminOrders() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState('')

  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')

  // ============================================================
  // LOAD ORDERS
  // ============================================================

  const loadOrders = async ({ refresh = false } = {}) => {
    try {
      if (refresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }

      setError('')

      const token = getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found. Please login again.'
        )
      }

      const response = await fetch(
        `${API_URL}/admin/orders`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      let data = {}

      try {
        data = await response.json()
      } catch {
        data = {}
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            'Failed to load orders.'
        )
      }

      if (data?.success === false) {
        throw new Error(
          data?.message ||
            'Failed to load orders.'
        )
      }

      /*
        Backend may return:

        {
          success: true,
          orders: [...]
        }

        or:

        {
          success: true,
          data: {
            orders: [...]
          }
        }
      */

      const receivedOrders =
        Array.isArray(data?.orders)
          ? data.orders
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.data?.orders)
          ? data.data.orders
          : []

      setOrders(receivedOrders)
    } catch (error) {
      console.error(
        'Load admin orders error:',
        error
      )

      setError(
        error?.message ||
          'Something went wrong while loading orders.'
      )
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    loadOrders()
  }, [])

  // ============================================================
  // FILTER ORDERS
  // ============================================================

  const filtered = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase()

    if (!query) {
      return orders
    }

    return orders.filter((order) => {
      const orderId =
        order?._id ||
        order?.id ||
        ''

      const orderNumber =
        order?.orderNumber ||
        order?.orderNo ||
        order?.orderId ||
        ''

      const customerName =
        order?.customerName ||
        order?.customer?.name ||
        order?.user?.name ||
        order?.user?.fullName ||
        ''

      const email =
        order?.email ||
        order?.customer?.email ||
        order?.user?.email ||
        ''

      const phone =
        order?.phone ||
        order?.customer?.phone ||
        order?.user?.phone ||
        ''

      const searchableText = `
        ${orderId}
        ${orderNumber}
        ${customerName}
        ${email}
        ${phone}
      `.toLowerCase()

      return searchableText.includes(query)
    })
  }, [orders, search])

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="lg:pl-72">
        <AdminHeader
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          {/* ================================================== */}
          {/* HEADER */}
          {/* ================================================== */}

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Orders
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                View all orders across the platform.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                loadOrders({ refresh: true })
              }
              disabled={
                loading || refreshing
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {refreshing ? (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <RefreshCw size={17} />
              )}

              {refreshing
                ? 'Refreshing...'
                : 'Refresh'}
            </button>
          </div>

          {/* ================================================== */}
          {/* SEARCH */}
          {/* ================================================== */}

          <div className="mb-5 relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search orders..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-gray-300 focus:ring-2 focus:ring-gray-100"
            />
          </div>

          {/* ================================================== */}
          {/* ERROR */}
          {/* ================================================== */}

          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <AlertCircle
                size={19}
                className="mt-0.5 shrink-0 text-red-600"
              />

              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    loadOrders()
                  }
                  className="mt-2 text-sm font-semibold text-red-700 underline hover:no-underline"
                >
                  Try again
                </button>
              </div>
            </div>
          )}

          {/* ================================================== */}
          {/* ORDERS TABLE */}
          {/* ================================================== */}

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {loading ? (
              <LoadingState />
            ) : filtered.length === 0 ? (
              <EmptyState
                hasSearch={Boolean(
                  search.trim()
                )}
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-[950px] w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Order
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Customer
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Total
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Status
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Date
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                        View
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filtered.map(
                      (order) => {
                        const orderId =
                          order?._id ||
                          order?.id

                        const orderNumber =
                          order?.orderNumber ||
                          order?.orderNo ||
                          orderId

                        const customerName =
                          order?.customerName ||
                          order?.customer?.name ||
                          order?.user?.name ||
                          order?.user?.fullName ||
                          'Customer'

                        const email =
                          order?.email ||
                          order?.customer?.email ||
                          order?.user?.email ||
                          ''

                        const total =
                          order?.total ??
                          order?.amount ??
                          order?.totalAmount ??
                          order?.grandTotal ??
                          0

                        const status =
                          order?.status ||
                          'pending'

                        const createdAt =
                          order?.createdAt ||
                          order?.date ||
                          order?.orderedAt

                        return (
                          <tr
                            key={orderId}
                            className="transition hover:bg-gray-50"
                          >
                            {/* ORDER */}
                            <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                              #
                              {orderNumber}
                            </td>

                            {/* CUSTOMER */}
                            <td className="px-5 py-4">
                              <p className="text-sm font-medium text-gray-900">
                                {customerName}
                              </p>

                              {email && (
                                <p className="mt-0.5 text-xs text-gray-500">
                                  {email}
                                </p>
                              )}
                            </td>

                            {/* TOTAL */}
                            <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                              {formatCurrency(
                                total
                              )}
                            </td>

                            {/* STATUS */}
                            <td className="px-5 py-4">
                              <Status
                                status={status}
                              />
                            </td>

                            {/* DATE */}
                            <td className="px-5 py-4 text-sm text-gray-500">
                              {formatDate(
                                createdAt
                              )}
                            </td>

                            {/* VIEW */}
                            <td className="px-5 py-4 text-right">
                              {orderId ? (
                                <Link
                                  to={`/account/orders/${orderId}`}
                                  className="inline-flex rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                                  title="View order"
                                >
                                  <Eye
                                    size={17}
                                  />
                                </Link>
                              ) : (
                                <span className="text-xs text-gray-400">
                                  —
                                </span>
                              )}
                            </td>
                          </tr>
                        )
                      }
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

// ============================================================
// STATUS
// ============================================================

function Status({ status }) {
  const styles = {
    pending:
      'bg-yellow-50 text-yellow-700',
    processing:
      'bg-blue-50 text-blue-700',
    confirmed:
      'bg-blue-50 text-blue-700',
    shipped:
      'bg-purple-50 text-purple-700',
    delivered:
      'bg-green-50 text-green-700',
    completed:
      'bg-green-50 text-green-700',
    cancelled:
      'bg-red-50 text-red-700',
    canceled:
      'bg-red-50 text-red-700',
    refunded:
      'bg-gray-100 text-gray-700',
  }

  const normalized = String(
    status || 'pending'
  )
    .toLowerCase()
    .trim()

  const label =
    String(status || 'Pending')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      )

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[normalized] ||
        'bg-gray-100 text-gray-600'
      }`}
    >
      {label}
    </span>
  )
}

// ============================================================
// LOADING STATE
// ============================================================

function LoadingState() {
  return (
    <div className="p-12 text-center">
      <Loader2
        size={32}
        className="mx-auto animate-spin text-gray-400"
      />

      <p className="mt-4 text-sm text-gray-500">
        Loading orders...
      </p>
    </div>
  )
}

// ============================================================
// EMPTY STATE
// ============================================================

function EmptyState({ hasSearch }) {
  return (
    <div className="p-12 text-center">
      <ShoppingCart
        className="mx-auto text-gray-300"
        size={40}
      />

      <p className="mt-4 text-sm font-medium text-gray-700">
        {hasSearch
          ? 'No matching orders found.'
          : 'No orders found.'}
      </p>

      {hasSearch && (
        <p className="mt-1 text-xs text-gray-400">
          Try searching with another order
          number, customer name, email, or
          phone number.
        </p>
      )}
    </div>
  )
}

// ============================================================
// CURRENCY
// ============================================================

function formatCurrency(value) {
  const amount = Number(value)

  if (Number.isNaN(amount)) {
    return '€0.00'
  }

  return `€${amount.toFixed(2)}`
}

// ============================================================
// DATE
// ============================================================

function formatDate(date) {
  if (!date) {
    return '—'
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return '—'
  }

  return parsedDate.toLocaleDateString()
}

export default AdminOrders