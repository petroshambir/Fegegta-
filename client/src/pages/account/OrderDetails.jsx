// import React from 'react'
// import { Link, useParams } from 'react-router-dom'
// import {
//   ArrowLeft,
//   Package,
//   Truck,
//   CheckCircle2,
// } from 'lucide-react'

// import { useLanguage } from '../../context/LanguageContext'

// function OrderDetails() {
//   const { id } = useParams()
//   const { t } = useLanguage()

//   const order = null

//   return (
//     <section className="min-h-screen bg-gray-50">
//       <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

//         <Link
//           to="/account/orders"
//           className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
//         >
//           <ArrowLeft size={17} />
//           {t('backToOrders') || 'Back to Orders'}
//         </Link>

//         <div className="mb-8">
//           <p className="text-sm text-gray-500">
//             {t('order') || 'Order'}
//           </p>

//           <h1 className="mt-1 text-3xl font-bold text-gray-900">
//             #{id}
//           </h1>
//         </div>

//         {!order ? (
//           <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
//             <Package
//               size={42}
//               className="mx-auto text-gray-400"
//             />

//             <h2 className="mt-4 text-xl font-semibold text-gray-900">
//               {t('orderDetailsComingSoon') ||
//                 'Order details will appear here'}
//             </h2>

//             <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
//               {t('orderDetailsBackendNote') ||
//                 'Order information will be connected to the backend when the order system is implemented.'}
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-6">

//             <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
//               <div className="flex items-center gap-3">
//                 <CheckCircle2 className="text-green-600" />
//                 <span className="font-semibold">
//                   {t('orderConfirmed') || 'Order Confirmed'}
//                 </span>
//               </div>
//             </div>

//             <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
//               <div className="flex items-center gap-3">
//                 <Truck />
//                 <span>
//                   {t('tracking') || 'Tracking'}
//                 </span>
//               </div>
//             </div>

//           </div>
//         )}

//       </div>
//     </section>
//   )
// }

// export default OrderDetails

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  MapPin,
  CreditCard,
  Loader2,
  AlertCircle,
} from 'lucide-react'

import { useLanguage } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'

const API_URL =
  'https://fegegta-server.onrender.com/api'

function OrderDetails() {
  const { id } = useParams()
  const { t } = useLanguage()
  const { getToken, isAuthenticated } =
    useAuth()

  const [order, setOrder] = useState(null)

  const [isLoading, setIsLoading] =
    useState(true)

  const [error, setError] = useState('')

  // ============================================================
  // LOAD ORDER
  // ============================================================

  const loadOrder = async () => {
    try {
      setIsLoading(true)
      setError('')

      const token = getToken?.()

      if (!token) {
        setError(
          t('loginRequired') ||
            'Please login to view this order.'
        )

        return
      }

      if (!id) {
        setError(
          t('orderNotFound') ||
            'Order not found.'
        )

        return
      }

      const response = await fetch(
        `${API_URL}/orders/${id}`,
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
            'Failed to load order.'
        )
      }

      if (!data.order) {
        throw new Error(
          t('orderNotFound') ||
            'Order not found.'
        )
      }

      setOrder(data.order)
    } catch (error) {
      console.error(
        'Load order error:',
        error
      )

      setError(
        error.message ||
          'Unable to load order details.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  // ============================================================
  // LOAD ORDER WHEN ID CHANGES
  // ============================================================

  useEffect(() => {
    if (isAuthenticated) {
      loadOrder()
    } else {
      setIsLoading(false)
    }
  }, [id, isAuthenticated])

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
          month: 'long',
          day: 'numeric',
        }
      )
    } catch {
      return ''
    }
  }

  // ============================================================
  // STATUS
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

      case 'delivered':
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
  // NOT LOGGED IN
  // ============================================================

  if (
    !isAuthenticated &&
    !isLoading
  ) {
    return (
      <section className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

          <Link
            to="/account/orders"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={17} />

            {t('backToOrders') ||
              'Back to Orders'}
          </Link>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">

            <AlertCircle
              size={42}
              className="mx-auto text-gray-400"
            />

            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              {t('loginRequired') ||
                'Login Required'}
            </h2>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
              {t('loginToViewOrder') ||
                'Please login to view your order details.'}
            </p>

            <Link
              to="/login"
              className="mt-6 inline-flex items-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              {t('login') || 'Login'}
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
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* ======================================================
            BACK
        ====================================================== */}

        <Link
          to="/account/orders"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={17} />

          {t('backToOrders') ||
            'Back to Orders'}
        </Link>

        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="mb-8">
          <p className="text-sm text-gray-500">
            {t('order') || 'Order'}
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            #
            {order?.orderNumber ||
              id}
          </h1>

          {order?.createdAt && (
            <p className="mt-2 text-sm text-gray-500">
              {t('placedOn') ||
                'Placed on'}{' '}
              {formatDate(
                order.createdAt
              )}
            </p>
          )}
        </div>

        {/* ======================================================
            LOADING
        ====================================================== */}

        {isLoading ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">

            <Loader2
              size={36}
              className="mx-auto animate-spin text-gray-600"
            />

            <p className="mt-4 text-sm text-gray-500">
              {t('loading') ||
                'Loading...'}
            </p>

          </div>
        ) : error ? (

          /* ====================================================
             ERROR
          ==================================================== */

          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

            <AlertCircle
              size={42}
              className="mx-auto text-red-500"
            />

            <h2 className="mt-4 text-xl font-semibold text-red-800">
              {t('orderDetailsError') ||
                'Unable to load order'}
            </h2>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={loadOrder}
              className="mt-6 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              {t('tryAgain') ||
                'Try Again'}
            </button>

          </div>

        ) : !order ? (

          /* ====================================================
             ORDER NOT FOUND
          ==================================================== */

          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">

            <Package
              size={42}
              className="mx-auto text-gray-400"
            />

            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              {t('orderNotFound') ||
                'Order not found'}
            </h2>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
              {t('orderDetailsNotFound') ||
                'The order could not be found.'}
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {/* ==================================================
                STATUS
            ================================================== */}

            {(() => {
              const statusInfo =
                getStatusInfo(
                  order.status
                )

              const StatusIcon =
                statusInfo.icon

              return (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                        <StatusIcon
                          size={22}
                        />
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          {t('orderStatus') ||
                            'Order Status'}
                        </p>

                        <p className="mt-1 font-semibold text-gray-900">
                          {statusInfo.label}
                        </p>
                      </div>

                    </div>

                    <span
                      className={`inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-sm font-medium ${statusInfo.className}`}
                    >
                      {statusInfo.label}
                    </span>

                  </div>
                </div>
              )
            })()}

            {/* ==================================================
                PRODUCTS
            ================================================== */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="mb-6 flex items-center gap-3">
                <Package
                  size={21}
                  className="text-gray-700"
                />

                <h2 className="text-lg font-semibold text-gray-900">
                  {t('orderItems') ||
                    'Order Items'}
                </h2>
              </div>

              <div className="divide-y divide-gray-100">

                {Array.isArray(
                  order.items
                ) &&
                  order.items.map(
                    (item, index) => {
                      const productId =
                        item.product?._id ||
                        item.product?.id ||
                        index

                      const image =
                        item.image ||
                        (
                          Array.isArray(
                            item.product
                              ?.images
                          ) &&
                          item.product
                            .images.length > 0
                            ? typeof item
                                .product
                                .images[0] ===
                              'string'
                              ? item.product
                                  .images[0]
                              : item.product
                                  .images[0]
                                  ?.url
                            : ''
                        )

                      const itemName =
                        item.name ||
                        item.product
                          ?.name ||
                        t('product') ||
                        'Product'

                      const quantity =
                        Number(
                          item.quantity
                        ) || 1

                      const price =
                        Number(
                          item.price
                        ) || 0

                      const itemTotal =
                        price *
                        quantity

                      const size =
                        item.sizeData
                          ?.size ||
                        item.sizeData
                          ?.selectedSize ||
                        item.size ||
                        ''

                      return (
                        <div
                          key={`${productId}-${index}`}
                          className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                        >

                          <div className="flex items-center gap-4">

                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">

                              {image ? (
                                <img
                                  src={image}
                                  alt={
                                    itemName
                                  }
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                  <ShoppingBagIcon />
                                </div>
                              )}

                            </div>

                            <div>

                              <h3 className="font-semibold text-gray-900">
                                {itemName}
                              </h3>

                              {item.seller && (
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.seller
                                    ?.businessName ||
                                    item.seller
                                      ?.name ||
                                    item.seller
                                      ?.email ||
                                    ''}
                                </p>
                              )}

                              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">

                                <span>
                                  {t('quantity') ||
                                    'Quantity'}:
                                  {' '}
                                  {quantity}
                                </span>

                                {size && (
                                  <span>
                                    {t('size') ||
                                      'Size'}:
                                    {' '}
                                    {size}
                                  </span>
                                )}

                              </div>

                            </div>

                          </div>

                          <div className="text-left sm:text-right">

                            <p className="font-semibold text-gray-900">
                              {formatPrice(
                                itemTotal
                              )}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                              {formatPrice(
                                price
                              )}{' '}
                              ×{' '}
                              {quantity}
                            </p>

                          </div>

                        </div>
                      )
                    }
                  )}

              </div>
            </div>

            {/* ==================================================
                SHIPPING + PAYMENT
            ================================================== */}

            <div className="grid gap-6 md:grid-cols-2">

              {/* SHIPPING */}

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center gap-3">
                  <MapPin
                    size={21}
                    className="text-gray-700"
                  />

                  <h2 className="text-lg font-semibold text-gray-900">
                    {t('shippingAddress') ||
                      'Shipping Address'}
                  </h2>
                </div>

                <div className="text-sm leading-6 text-gray-600">

                  {order.customer?.name && (
                    <p className="font-medium text-gray-900">
                      {order.customer.name}
                    </p>
                  )}

                  {order.customer
                    ?.fullName && (
                    <p className="font-medium text-gray-900">
                      {
                        order.customer
                          .fullName
                      }
                    </p>
                  )}

                  {order.customer
                    ?.phone && (
                    <p>
                      {
                        order.customer
                          .phone
                      }
                    </p>
                  )}

                  {order.address && (
                    <>
                      {typeof order.address ===
                      'string' ? (
                        <p>
                          {order.address}
                        </p>
                      ) : (
                        <>
                          {order.address
                            .address && (
                            <p>
                              {
                                order
                                  .address
                                  .address
                              }
                            </p>
                          )}

                          {order.address
                            .city && (
                            <p>
                              {
                                order
                                  .address
                                  .city
                              }

                              {order
                                .address
                                .postalCode &&
                                ` ${order.address.postalCode}`}
                            </p>
                          )}

                          {order.address
                            .country && (
                            <p>
                              {
                                order
                                  .address
                                  .country
                              }
                            </p>
                          )}
                        </>
                      )}
                    </>
                  )}

                  {order.shippingAddress && (
                    <>
                      {typeof order.shippingAddress ===
                      'string' ? (
                        <p>
                          {
                            order.shippingAddress
                          }
                        </p>
                      ) : (
                        <>
                          {order.shippingAddress
                            .address && (
                            <p>
                              {
                                order
                                  .shippingAddress
                                  .address
                              }
                            </p>
                          )}

                          {order.shippingAddress
                            .city && (
                            <p>
                              {
                                order
                                  .shippingAddress
                                  .city
                              }
                            </p>
                          )}

                          {order.shippingAddress
                            .country && (
                            <p>
                              {
                                order
                                  .shippingAddress
                                  .country
                              }
                            </p>
                          )}
                        </>
                      )}
                    </>
                  )}

                  {order.shippingMethod && (
                    <p className="mt-3">
                      <span className="font-medium text-gray-900">
                        {t(
                          'shippingMethod'
                        ) ||
                          'Shipping Method'}:
                      </span>{' '}
                      {
                        order.shippingMethod
                      }
                    </p>
                  )}

                </div>
              </div>

              {/* PAYMENT */}

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center gap-3">
                  <CreditCard
                    size={21}
                    className="text-gray-700"
                  />

                  <h2 className="text-lg font-semibold text-gray-900">
                    {t('payment') ||
                      'Payment'}
                  </h2>
                </div>

                <div className="space-y-3 text-sm">

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      {t('paymentMethod') ||
                        'Payment Method'}
                    </span>

                    <span className="font-medium text-gray-900">
                      {order.paymentMethod ||
                        '-'}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      {t('subtotal') ||
                        'Subtotal'}
                    </span>

                    <span className="font-medium text-gray-900">
                      {formatPrice(
                        order.subtotal
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      {t('shipping') ||
                        'Shipping'}
                    </span>

                    <span className="font-medium text-gray-900">
                      {formatPrice(
                        order.shipping
                      )}
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-3">

                    <div className="flex justify-between gap-4">

                      <span className="font-semibold text-gray-900">
                        {t('total') ||
                          'Total'}
                      </span>

                      <span className="text-xl font-bold text-gray-900">
                        {formatPrice(
                          order.total
                        )}
                      </span>

                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  )
}


// ============================================================
// FALLBACK PRODUCT ICON
// ============================================================

function ShoppingBagIcon() {
  return (
    <Package
      size={28}
      className="text-gray-400"
    />
  )
}

export default OrderDetails