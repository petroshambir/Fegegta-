import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  Check,
  Package,
  Store,
  ShoppingBag,
  ShieldCheck,
} from 'lucide-react'

import {
  getSellerNotifications,
  markSellerNotificationRead,
  markAllSellerNotificationsRead,
} from '../../services/sellerStorage'

function SellerNotifications() {
  const [notifications, setNotifications] =
    useState([])

  const load = () => {
    setNotifications(
      getSellerNotifications()
    )
  }

  useEffect(() => {
    load()
  }, [])

  const markRead = (id) => {
    markSellerNotificationRead(id)
    load()
  }

  const markAll = () => {
    markAllSellerNotificationsRead()
    load()
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

        <div className="mt-6 space-y-3">
          {notifications.length === 0 ? (
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