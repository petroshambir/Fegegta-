// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import {
//   Bell,
//   Check,
//   Package,
//   Store,
//   ShoppingBag,
//   ShieldCheck,
// } from 'lucide-react'

// import {
//   getSellerNotifications,
//   markSellerNotificationRead,
//   markAllSellerNotificationsRead,
// } from '../../services/sellerStorage'

// function SellerNotifications() {
//   const [notifications, setNotifications] =
//     useState([])

//   const load = () => {
//     setNotifications(
//       getSellerNotifications()
//     )
//   }

//   useEffect(() => {
//     load()
//   }, [])

//   const markRead = (id) => {
//     markSellerNotificationRead(id)
//     load()
//   }

//   const markAll = () => {
//     markAllSellerNotificationsRead()
//     load()
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-4xl">
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-2xl font-bold">
//               Notifications
//             </h1>

//             <p className="mt-1 text-sm text-gray-500">
//               Stay updated about your store.
//             </p>
//           </div>

//           {notifications.some(
//             (notification) =>
//               !notification.read
//           ) && (
//             <button
//               type="button"
//               onClick={markAll}
//               className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
//             >
//               <Check className="h-4 w-4" />
//               Mark all as read
//             </button>
//           )}
//         </div>

//         <div className="mt-6 space-y-3">
//           {notifications.length === 0 ? (
//             <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center">
//               <Bell className="mx-auto h-12 w-12 text-gray-400" />

//               <h2 className="mt-4 font-bold">
//                 No notifications
//               </h2>
//             </div>
//           ) : (
//             notifications.map(
//               (notification) => (
//                 <div
//                   key={notification.id}
//                   className={`rounded-2xl border p-5 ${
//                     notification.read
//                       ? 'border-gray-200 bg-white'
//                       : 'border-blue-200 bg-blue-50/40'
//                   }`}
//                 >
//                   <div className="flex gap-4">
//                     <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100">
//                       <NotificationIcon
//                         type={
//                           notification.type
//                         }
//                       />
//                     </div>

//                     <div className="min-w-0 flex-1">
//                       <div className="flex flex-wrap items-start justify-between gap-3">
//                         <div>
//                           <h2 className="font-semibold">
//                             {
//                               notification.title
//                             }
//                           </h2>

//                           <p className="mt-1 text-sm text-gray-600">
//                             {
//                               notification.message
//                             }
//                           </p>

//                           {notification.createdAt && (
//                             <p className="mt-2 text-xs text-gray-400">
//                               {new Date(
//                                 notification.createdAt
//                               ).toLocaleString()}
//                             </p>
//                           )}
//                         </div>

//                         {!notification.read && (
//                           <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white">
//                             New
//                           </span>
//                         )}
//                       </div>

//                       <div className="mt-4 flex flex-wrap gap-2">
//                         {notification.orderId && (
//                           <Link
//                             to={`/seller/orders/${notification.orderId}`}
//                             className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-50"
//                             onClick={() =>
//                               markRead(
//                                 notification.id
//                               )
//                             }
//                           >
//                             View Order
//                           </Link>
//                         )}

//                         {notification.productId && (
//                           <Link
//                             to={`/seller/products/${notification.productId}/edit`}
//                             className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-50"
//                             onClick={() =>
//                               markRead(
//                                 notification.id
//                               )
//                             }
//                           >
//                             View Product
//                           </Link>
//                         )}

//                         {!notification.read && (
//                           <button
//                             type="button"
//                             onClick={() =>
//                               markRead(
//                                 notification.id
//                               )
//                             }
//                             className="rounded-lg bg-black px-3 py-2 text-xs font-semibold text-white"
//                           >
//                             Mark as read
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// function NotificationIcon({
//   type,
// }) {
//   if (
//     type === 'new-order'
//   ) {
//     return (
//       <ShoppingBag className="h-5 w-5" />
//     )
//   }

//   if (
//     type === 'product-approved' ||
//     type === 'product-rejected'
//   ) {
//     return (
//       <Package className="h-5 w-5" />
//     )
//   }

//   if (
//     type === 'store-verified'
//   ) {
//     return (
//       <ShieldCheck className="h-5 w-5" />
//     )
//   }

//   if (
//     type ===
//       'application-approved' ||
//     type ===
//       'application-rejected'
//   ) {
//     return (
//       <Store className="h-5 w-5" />
//     )
//   }

//   return (
//     <Bell className="h-5 w-5" />
//   )
// }

// export default SellerNotifications


import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  Check,
  Package,
  Store,
  ShoppingBag,
  ShieldCheck,
} from 'lucide-react'

const API_URL = 'https://fegegta-server.onrender.com/api'

const getReferenceId = (value) => {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object') return String(value._id || value.id || '')
  return String(value)
}

const normalizeNotification = (notification) => {
  const title = String(notification?.title || '')
  const type = String(notification?.type || '').toLowerCase()
  const orderId = getReferenceId(notification?.order || notification?.orderId)
  const productId = getReferenceId(notification?.product || notification?.productId)
  const uiType = type === 'order' || orderId
    ? 'new-order'
    : type === 'product' && /approved/i.test(title)
      ? 'product-approved'
      : type === 'product' && /rejected/i.test(title)
        ? 'product-rejected'
        : type === 'store' && /approved|verified/i.test(title)
          ? 'store-verified'
          : type

  return {
    ...notification,
    id: String(notification?._id || notification?.id || ''),
    type: uiType,
    read: Boolean(notification?.isRead ?? notification?.read),
    orderId,
    productId,
  }
}

function SellerNotifications() {
  const [notifications, setNotifications] =
    useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setNotifications([])
      setError('Please sign in to view notifications.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_URL}/seller/notifications`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data?.message || 'Could not load notifications.')
      setNotifications((Array.isArray(data?.notifications) ? data.notifications : []).map(normalizeNotification))
      setError('')
    } catch (loadError) {
      setError(loadError.message || 'Could not load notifications.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const markRead = async (id) => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const response = await fetch(`${API_URL}/seller/notifications/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      })
      if (!response.ok) throw new Error('Could not mark notification as read.')
      await load()
    } catch (markError) {
      setError(markError.message)
    }
  }

  const markAll = async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const response = await fetch(`${API_URL}/seller/notifications/read-all`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      })
      if (!response.ok) throw new Error('Could not mark notifications as read.')
      await load()
    } catch (markError) {
      setError(markError.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Notifications
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Stay updated about your store.
            </p>
          </div>

          {notifications.some(
            (notification) =>
              !notification.read
          ) && (
            <button
              type="button"
              onClick={markAll}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
            >
              <Check className="h-4 w-4" />
              Mark all as read
            </button>
          )}
        </div>

        {error && (
          <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-3">
          {loading ? (
            <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500">
              Loading notifications…
            </div>
          ) : notifications.length === 0 ? (
            <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center">
              <Bell className="mx-auto h-12 w-12 text-gray-400" />

              <h2 className="mt-4 font-bold">
                No notifications
              </h2>
            </div>
          ) : (
            notifications.map(
              (notification) => (
                <div
                  key={notification.id}
                  className={`rounded-2xl border p-5 ${
                    notification.read
                      ? 'border-gray-200 bg-white'
                      : 'border-blue-200 bg-blue-50/40'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                      <NotificationIcon
                        type={
                          notification.type
                        }
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h2 className="font-semibold">
                            {
                              notification.title
                            }
                          </h2>

                          <p className="mt-1 text-sm text-gray-600">
                            {
                              notification.message
                            }
                          </p>

                          {notification.createdAt && (
                            <p className="mt-2 text-xs text-gray-400">
                              {new Date(
                                notification.createdAt
                              ).toLocaleString()}
                            </p>
                          )}
                        </div>

                        {!notification.read && (
                          <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white">
                            New
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {notification.orderId && (
                          <Link
                            to={`/seller/orders/${notification.orderId}`}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                            onClick={() =>
                              markRead(
                                notification.id
                              )
                            }
                          >
                            View Order
                          </Link>
                        )}

                        {notification.productId && (
                          <Link
                            to={`/seller/products/${notification.productId}/edit`}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                            onClick={() =>
                              markRead(
                                notification.id
                              )
                            }
                          >
                            View Product
                          </Link>
                        )}

                        {!notification.read && (
                          <button
                            type="button"
                            onClick={() =>
                              markRead(
                                notification.id
                              )
                            }
                            className="rounded-lg bg-black px-3 py-2 text-xs font-semibold text-white"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  )
}

function NotificationIcon({
  type,
}) {
  if (
    type === 'new-order'
  ) {
    return (
      <ShoppingBag className="h-5 w-5" />
    )
  }

  if (
    type === 'product-approved' ||
    type === 'product-rejected'
  ) {
    return (
      <Package className="h-5 w-5" />
    )
  }

  if (
    type === 'store-verified'
  ) {
    return (
      <ShieldCheck className="h-5 w-5" />
    )
  }

  if (
    type ===
      'application-approved' ||
    type ===
      'application-rejected'
  ) {
    return (
      <Store className="h-5 w-5" />
    )
  }

  return (
    <Bell className="h-5 w-5" />
  )
}

export default SellerNotifications
