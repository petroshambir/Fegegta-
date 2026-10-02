// import React from 'react'
// import { Link } from 'react-router-dom'
// import {
//   ArrowLeft,
//   Package,
//   ChevronRight,
// } from 'lucide-react'

// import { useLanguage } from '../../context/LanguageContext'

// function Orders() {
//   const { t } = useLanguage()

//   const orders = []

//   return (
//     <section className="min-h-screen bg-gray-50">
//       <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

//         <Link
//           to="/account"
//           className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
//         >
//           <ArrowLeft size={17} />
//           {t('backToAccount') || 'Back to Account'}
//         </Link>

//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">
//             {t('myOrders') || 'My Orders'}
//           </h1>

//           <p className="mt-2 text-sm text-gray-500">
//             {t('myOrdersDescription') ||
//               'View and track your orders.'}
//           </p>
//         </div>

//         {orders.length === 0 ? (
//           <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

//             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
//               <Package size={28} className="text-gray-500" />
//             </div>

//             <h2 className="mt-5 text-xl font-semibold text-gray-900">
//               {t('noOrders') || 'No orders yet'}
//             </h2>

//             <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
//               {t('noOrdersDescription') ||
//                 'When you place an order, it will appear here.'}
//             </p>

//             <Link
//               to="/products"
//               className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
//             >
//               {t('startShopping') || 'Start Shopping'}
//               <ChevronRight size={17} />
//             </Link>

//           </div>
//         ) : (
//           <div className="space-y-4">
//             {orders.map((order) => (
//               <Link
//                 key={order.id}
//                 to={`/account/orders/${order.id}`}
//                 className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md"
//               >
//                 {order.id}
//               </Link>
//             ))}
//           </div>
//         )}

//       </div>
//     </section>
//   )
// }

// export default Orders

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Package,
  ChevronRight,
  Loader2,
  AlertCircle,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react'

import { useLanguage } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'

const API_URL =
  'https://fegegta-server.onrender.com/api'

function Orders() {
  const { t } = useLanguage()
  const { getToken, isAuthenticated } =
    useAuth()

  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] =
    useState(true)
  const [error, setError] = useState('')

  // ============================================================
  // LOAD MY ORDERS
  // ============================================================

  const loadOrders = async () => {
    try {
      setIsLoading(true)
      setError('')

      const token = getToken?.()

      if (!token) {
        setOrders([])
        setError(
          t('loginRequired') ||
            'Please login to view your orders.'
        )
        return
      }

      const response = await fetch(
        `${API_URL}/orders/my-orders`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Failed to load your orders.'
        )
      }

      const loadedOrders = Array.isArray(
        data
      )
        ? data
        : Array.isArray(data.orders)
        ? data.orders
        : []

      setOrders(loadedOrders)
    } catch (error) {
      console.error(
        'Load orders error:',
        error
      )

      setError(
        error.message ||
          'Unable to load your orders.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  // ============================================================
  // LOAD ON PAGE OPEN
  // ============================================================

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders()
    } else {
      setIsLoading(false)
      setOrders([])
    }
  }, [isAuthenticated])

  // ============================================================
  // FORMAT PRICE
  // ============================================================

  const formatPrice = (value) => {
    const amount = Number(value) || 0

    return `€${amount.toFixed(2)}`
  }

  // ============================================================
  // FORMAT DATE
  // ============================================================

  const formatDate = (date) => {
    if (!date) return ''

    try {
      return new Date(date).toLocaleDateString(
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

  // ============================================================
  // STATUS INFORMATION
  // ============================================================

  const getStatusInfo = (status) => {
    const normalized =
      String(status || '')
        .toLowerCase()
        .replace(/[\s-]+/g, '_')

    switch (normalized) {
      case 'pending':
        return {
          label:
            t('pending') ||
            'Pending',
          icon: Clock,
          className:
            'bg-yellow-50 text-yellow-700 border-yellow-200',
        }

      case 'confirmed':
      case 'paid':
        return {
          label:
            t('confirmed') ||
            'Confirmed',
          icon: CheckCircle2,
          className:
            'bg-green-50 text-green-700 border-green-200',
        }

      case 'processing':
        return {
          label:
            t('processing') ||
            'Processing',
          icon: Package,
          className:
            'bg-blue-50 text-blue-700 border-blue-200',
        }

      case 'shipped':
        return {
          label:
            t('shipped') ||
            'Shipped',
          icon: Truck,
          className:
            'bg-purple-50 text-purple-700 border-purple-200',
        }

      case 'out_for_delivery':
        return {
          label:
            t('outForDelivery') ||
            'Out for Delivery',
          icon: Truck,
          className:
            'bg-indigo-50 text-indigo-700 border-indigo-200',
        }

      case 'delivered':
      case 'completed':
      case 'fulfilled':
      case 'complete':
        return {
          label:
            t('delivered') ||
            'Delivered',
          icon: CheckCircle2,
          className:
            'bg-green-50 text-green-700 border-green-200',
        }

      case 'cancelled':
      case 'canceled':
        return {
          label:
            t('cancelled') ||
            'Cancelled',
          icon: XCircle,
          className:
            'bg-red-50 text-red-700 border-red-200',
        }

      default:
        return {
          label:
            status ||
            t('unknown') ||
            'Unknown',
          icon: Package,
          className:
            'bg-gray-50 text-gray-700 border-gray-200',
        }
    }
  }

  // ============================================================
  // GET ORDER ID
  // ============================================================

  const getOrderId = (order) => {
    return (
      order._id ||
      order.id ||
      order.orderId ||
      order.orderNumber
    )
  }

  // ============================================================
  // GET ORDER NUMBER
  // ============================================================

  const getOrderNumber = (order) => {
    return (
      order.orderNumber ||
      order._id ||
      order.id ||
      ''
    )
  }

  // ============================================================
  // GET ORDER ITEMS COUNT
  // ============================================================

  const getItemsCount = (order) => {
    if (!Array.isArray(order.items)) {
      return 0
    }

    return order.items.reduce(
      (total, item) =>
        total +
        (Number(item.quantity) || 1),
      0
    )
  }

  // ============================================================
  // NOT LOGGED IN
  // ============================================================

  if (
    !isAuthenticated &&
    !isLoading
  ) {
    return (
      <section className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

          <Link
            to="/account"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={17} />

            {t('backToAccount') ||
              'Back to Account'}
          </Link>

          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <AlertCircle
                size={28}
                className="text-gray-500"
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              {t('loginRequired') ||
                'Login Required'}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {t('loginToViewOrders') ||
                'Please login to view your orders.'}
            </p>

            <Link
              to="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              {t('login') || 'Login'}
              <ChevronRight size={17} />
            </Link>

          </div>

        </div>
      </section>
    )
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* ======================================================
            BACK TO ACCOUNT
        ====================================================== */}

        <Link
          to="/account"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={17} />

          {t('backToAccount') ||
            'Back to Account'}
        </Link>

        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('myOrders') ||
              'My Orders'}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {t('myOrdersDescription') ||
              'View and track your orders.'}
          </p>
        </div>

        {/* ======================================================
            LOADING
        ====================================================== */}

        {isLoading ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

            <Loader2
              size={34}
              className="mx-auto animate-spin text-gray-600"
            />

            <p className="mt-4 text-sm text-gray-500">
              {t('loading') ||
                'Loading your orders...'}
            </p>

          </div>
        ) : error ? (

          /* ====================================================
             ERROR
          ==================================================== */

          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertCircle
                size={28}
                className="text-red-500"
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-red-900">
              {t('ordersLoadError') ||
                'Unable to load orders'}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={loadOrders}
              className="mt-6 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              {t('tryAgain') ||
                'Try Again'}
            </button>

          </div>

        ) : orders.length === 0 ? (

          /* ====================================================
             EMPTY
          ==================================================== */

          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Package
                size={28}
                className="text-gray-500"
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              {t('noOrders') ||
                'No orders yet'}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {t('noOrdersDescription') ||
                'When you place an order, it will appear here.'}
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              {t('startShopping') ||
                'Start Shopping'}

              <ChevronRight size={17} />
            </Link>

          </div>

        ) : (

          /* ====================================================
             ORDERS LIST
          ==================================================== */

          <div className="space-y-4">

            {orders.map((order) => {
              const orderId =
                getOrderId(order)

              const orderNumber =
                getOrderNumber(order)

              const statusInfo =
                getStatusInfo(
                  order.status
                )

              const StatusIcon =
                statusInfo.icon

              const itemsCount =
                getItemsCount(order)

              return (
                <Link
                  key={orderId}
                  to={`/account/orders/${orderId}`}
                  className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >

                  {/* ==================================================
                      TOP ROW
                  ================================================== */}

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <h2 className="font-semibold text-gray-900">
                          #
                          {orderNumber}
                        </h2>

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusInfo.className}`}
                        >
                          <StatusIcon
                            size={14}
                          />

                          {
                            statusInfo.label
                          }
                        </span>

                      </div>

                      {order.createdAt && (
                        <p className="mt-2 text-sm text-gray-500">
                          {t('orderedOn') ||
                            'Ordered on'}{' '}
                          {formatDate(
                            order.createdAt
                          )}
                        </p>
                      )}

                    </div>

                    <ChevronRight
                      size={20}
                      className="hidden text-gray-400 sm:block"
                    />

                  </div>

                  {/* ==================================================
                      ORDER INFO
                  ================================================== */}

                  <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-3">

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        {t('items') ||
                          'Items'}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {itemsCount}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        {t('total') ||
                          'Total'}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {formatPrice(
                          order.total
                        )}
                      </p>
                    </div>

                    <div className="col-span-2 sm:col-span-1">

                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        {t('viewDetails') ||
                          'View Details'}
                      </p>

                      <p className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-gray-900">
                        {t('viewOrder') ||
                          'View Order'}

                        <ChevronRight
                          size={15}
                        />
                      </p>

                    </div>

                  </div>

                  {/* ==================================================
                      PRODUCT PREVIEW
                  ================================================== */}

                  {Array.isArray(
                    order.items
                  ) &&
                    order.items.length >
                      0 && (
                      <div className="mt-5 flex gap-2 overflow-hidden">

                        {order.items
                          .slice(0, 4)
                          .map(
                            (
                              item,
                              index
                            ) => {
                              const image =
                                item.image ||
                                (
                                  Array.isArray(
                                    item
                                      .product
                                      ?.images
                                  ) &&
                                  item
                                    .product
                                    .images
                                    .length >
                                    0
                                    ? typeof item
                                        .product
                                        .images[0] ===
                                      'string'
                                      ? item
                                          .product
                                          .images[0]
                                      : item
                                          .product
                                          .images[0]
                                          ?.url
                                    : ''
                                )

                              return (
                                <div
                                  key={`${orderId}-item-${index}`}
                                  className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100"
                                >
                                  {image ? (
                                    <img
                                      src={
                                        image
                                      }
                                      alt={
                                        item
                                          .name ||
                                        item
                                          .product
                                          ?.name ||
                                        'Product'
                                      }
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                      <Package
                                        size={
                                          22
                                        }
                                        className="text-gray-400"
                                      />
                                    </div>
                                  )}
                                </div>
                              )
                            }
                          )}

                        {order.items.length >
                          4 && (
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-medium text-gray-500">
                            +
                            {order.items.length -
                              4}
                          </div>
                        )}

                      </div>
                    )}

                </Link>
              )
            })}

          </div>
        )}

      </div>
    </section>
  )
}

export default Orders