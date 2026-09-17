// import React, { useEffect, useState } from 'react'
// import {
//   Bell,
//   CheckCheck,
// } from 'lucide-react'

// import AdminSidebar from '../../components/admin/AdminSidebar'
// import AdminHeader from '../../components/admin/AdminHeader'
// import {
//   getAdminNotifications,
//   markAdminNotificationAsRead,
//   markAllAdminNotificationsAsRead,
// } from '../../utils/adminStorage'

// function AdminNotifications() {
//   const [mobileOpen, setMobileOpen] = useState(false)
//   const [notifications, setNotifications] = useState([])

//   const load = () => {
//     setNotifications(getAdminNotifications())
//   }

//   useEffect(() => {
//     load()
//   }, [])

//   const markRead = (id) => {
//     markAdminNotificationAsRead(id)
//     load()
//   }

//   const markAll = () => {
//     markAllAdminNotificationsAsRead()
//     load()
//   }

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
//           <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 Notifications
//               </h1>

//               <p className="mt-1 text-sm text-gray-500">
//                 Platform activity and administrative notifications.
//               </p>
//             </div>

//             {notifications.length > 0 && (
//               <button
//                 type="button"
//                 onClick={markAll}
//                 className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
//               >
//                 <CheckCheck size={17} />
//                 Mark all as read
//               </button>
//             )}
//           </div>

//           <div className="space-y-3">
//             {notifications.length === 0 ? (
//               <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
//                 <Bell
//                   size={40}
//                   className="mx-auto text-gray-300"
//                 />

//                 <p className="mt-4 text-sm text-gray-500">
//                   No notifications yet.
//                 </p>
//               </div>
//             ) : (
//               notifications.map((notification) => (
//                 <div
//                   key={notification.id}
//                   className={`rounded-2xl border p-5 ${
//                     notification.read
//                       ? 'border-gray-200 bg-white'
//                       : 'border-gray-300 bg-gray-50'
//                   }`}
//                 >
//                   <div className="flex items-start justify-between gap-4">
//                     <div className="flex gap-4">
//                       <div className="rounded-xl bg-white p-3 shadow-sm">
//                         <Bell size={19} />
//                       </div>

//                       <div>
//                         <h2 className="font-semibold text-gray-900">
//                           {notification.title}
//                         </h2>

//                         <p className="mt-1 text-sm text-gray-600">
//                           {notification.message}
//                         </p>

//                         <p className="mt-2 text-xs text-gray-400">
//                           {formatDate(
//                             notification.createdAt
//                           )}
//                         </p>
//                       </div>
//                     </div>

//                     {!notification.read && (
//                       <button
//                         type="button"
//                         onClick={() =>
//                           markRead(
//                             notification.id
//                           )
//                         }
//                         className="shrink-0 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-white"
//                       >
//                         Mark read
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// function formatDate(date) {
//   if (!date) return ''

//   return new Date(date).toLocaleString()
// }

// export default AdminNotifications


import React, { useEffect, useState } from 'react'
import {
  Bell,
  CheckCheck,
  ShoppingBag,
  User,
  MapPin,
  CreditCard,
  Package,
  Mail,
  Phone,
  X,
} from 'lucide-react'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'

import {
  getAdminNotifications,
  markAdminNotificationAsRead,
  markAllAdminNotificationsAsRead,
} from '../../utils/adminStorage'

function AdminNotifications() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [selectedNotification, setSelectedNotification] = useState(null)

  const load = () => {
    setNotifications(getAdminNotifications())
  }

  useEffect(() => {
    load()
  }, [])

  const markRead = (id) => {
    markAdminNotificationAsRead(id)
    load()
  }

  const markAll = () => {
    markAllAdminNotificationsAsRead()
    load()
  }

  const openNotification = (notification) => {
    setSelectedNotification(notification)

    if (!notification.read) {
      markAdminNotificationAsRead(notification.id)
      load()
    }
  }

  const closeNotification = () => {
    setSelectedNotification(null)
  }

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length

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
          {/* =====================================================
              HEADER
          ===================================================== */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  Notifications
                </h1>

                {unreadCount > 0 && (
                  <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                    {unreadCount} new
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-gray-500">
                Platform activity and administrative notifications.
              </p>
            </div>

            {notifications.length > 0 && unreadCount > 0 && (
              <button
                type="button"
                onClick={markAll}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <CheckCheck size={17} />
                Mark all as read
              </button>
            )}
          </div>

          {/* =====================================================
              NOTIFICATIONS LIST
          ===================================================== */}
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
                <Bell
                  size={40}
                  className="mx-auto text-gray-300"
                />

                <p className="mt-4 text-sm font-medium text-gray-600">
                  No notifications yet.
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  New orders and platform activity will appear here.
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onOpen={() =>
                    openNotification(notification)
                  }
                  onMarkRead={() =>
                    markRead(notification.id)
                  }
                />
              ))
            )}
          </div>
        </main>
      </div>

      {/* =========================================================
          ORDER DETAILS MODAL
      ========================================================= */}
      {selectedNotification && (
        <NotificationModal
          notification={selectedNotification}
          onClose={closeNotification}
        />
      )}
    </div>
  )
}

/* ===============================================================
   NOTIFICATION CARD
================================================================ */

function NotificationCard({
  notification,
  onOpen,
  onMarkRead,
}) {
  const isOrder =
    notification.type === 'new_order' ||
    notification.type === 'order' ||
    Boolean(notification.order)

  return (
    <div
      className={`rounded-2xl border p-5 transition ${
        notification.read
          ? 'border-gray-200 bg-white'
          : 'border-gray-300 bg-gray-50 shadow-sm'
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-4">
          {/* ICON */}
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              isOrder
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {isOrder ? (
              <ShoppingBag size={19} />
            ) : (
              <Bell size={19} />
            )}
          </div>

          {/* CONTENT */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-semibold text-gray-900">
                {notification.title || 'Notification'}
              </h2>

              {!notification.read && (
                <span className="rounded-full bg-black px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  New
                </span>
              )}
            </div>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              {notification.message || 'New platform activity.'}
            </p>

            {notification.orderNumber && (
              <p className="mt-2 text-xs font-semibold text-gray-700">
                Order: {notification.orderNumber}
              </p>
            )}

            <p className="mt-2 text-xs text-gray-400">
              {formatDate(notification.createdAt)}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex shrink-0 items-center gap-2 sm:ml-4">
          {isOrder && (
            <button
              type="button"
              onClick={onOpen}
              className="rounded-lg bg-black px-4 py-2 text-xs font-semibold text-white transition hover:bg-gray-800"
            >
              View order
            </button>
          )}

          {!notification.read && (
            <button
              type="button"
              onClick={onMarkRead}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Mark read
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ===============================================================
   NOTIFICATION MODAL
================================================================ */

function NotificationModal({
  notification,
  onClose,
}) {
  const order = notification.order || notification.orderData || null

  const customer =
    order?.customer ||
    notification.customer ||
    {}

  const items =
    order?.items ||
    notification.items ||
    []

  const subtotal =
    Number(order?.subtotal ?? notification.subtotal ?? 0)

  const shipping =
    Number(order?.shipping ?? notification.shipping ?? 0)

  const total =
    Number(order?.total ?? notification.total ?? 0)

  const paymentMethod =
    order?.paymentMethod ||
    notification.paymentMethod ||
    'Not specified'

  const shippingMethod =
    order?.shippingMethod ||
    notification.shippingMethod ||
    'Not specified'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {notification.title || 'Order Details'}
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {notification.orderNumber
                ? `Order ${notification.orderNumber}`
                : order?.orderNumber
                  ? `Order ${order.orderNumber}`
                  : 'Order information'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={20} />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="overflow-y-auto p-5 sm:p-6">
          {/* =====================================================
              CUSTOMER
          ===================================================== */}
          <section className="mb-6">
            <SectionTitle
              icon={<User size={17} />}
              title="Customer Information"
            />

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <InfoBox
                label="Full Name"
                value={
                  customer.fullName ||
                  `${customer.firstName || ''} ${
                    customer.lastName || ''
                  }`.trim() ||
                  'Not provided'
                }
              />

              <InfoBox
                label="Email"
                value={
                  customer.email ||
                  order?.email ||
                  'Not provided'
                }
                icon={<Mail size={15} />}
              />

              <InfoBox
                label="Phone"
                value={
                  customer.phone ||
                  order?.phone ||
                  'Not provided'
                }
                icon={<Phone size={15} />}
              />

              <InfoBox
                label="Customer ID"
                value={
                  customer.userId ||
                  order?.userId ||
                  'Guest customer'
                }
              />
            </div>
          </section>

          {/* =====================================================
              SHIPPING ADDRESS
          ===================================================== */}
          <section className="mb-6">
            <SectionTitle
              icon={<MapPin size={17} />}
              title="Shipping Address"
            />

            <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm leading-6 text-gray-700">
                {formatAddress(customer, order)}
              </p>
            </div>
          </section>

          {/* =====================================================
              ORDER INFORMATION
          ===================================================== */}
          <section className="mb-6">
            <SectionTitle
              icon={<Package size={17} />}
              title="Order Information"
            />

            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <InfoBox
                label="Order Number"
                value={
                  order?.orderNumber ||
                  notification.orderNumber ||
                  order?.id ||
                  notification.orderId ||
                  'Not provided'
                }
              />

              <InfoBox
                label="Status"
                value={order?.status || 'Pending'}
              />

              <InfoBox
                label="Shipping Method"
                value={shippingMethod}
              />

              <InfoBox
                label="Payment Method"
                value={paymentMethod}
                icon={<CreditCard size={15} />}
              />
            </div>
          </section>

          {/* =====================================================
              PRODUCTS
          ===================================================== */}
          <section className="mb-6">
            <SectionTitle
              icon={<ShoppingBag size={17} />}
              title="Products"
            />

            <div className="mt-3 overflow-hidden rounded-xl border border-gray-200">
              {items.length === 0 ? (
                <div className="p-6 text-center text-sm text-gray-500">
                  No product information available.
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {items.map((item, index) => (
                    <OrderItem
                      key={
                        item.id ||
                        item.productId ||
                        index
                      }
                      item={item}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* =====================================================
              PAYMENT SUMMARY
          ===================================================== */}
          <section>
            <SectionTitle
              icon={<CreditCard size={17} />}
              title="Payment Summary"
            />

            <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <div className="space-y-3 text-sm">
                <SummaryRow
                  label="Subtotal"
                  value={formatCurrency(subtotal)}
                />

                <SummaryRow
                  label="Shipping"
                  value={
                    shipping === 0
                      ? 'Free'
                      : formatCurrency(shipping)
                  }
                />

                <div className="border-t border-gray-200 pt-3">
                  <SummaryRow
                    label="Total"
                    value={formatCurrency(total)}
                    strong
                  />
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              NOTIFICATION MESSAGE
          ===================================================== */}
          {notification.message && (
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Notification
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {notification.message}
              </p>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="border-t border-gray-200 bg-gray-50 px-5 py-4 sm:px-6">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ===============================================================
   ORDER ITEM
================================================================ */

function OrderItem({ item }) {
  const image =
    item.image ||
    item.images?.[0] ||
    ''

  const quantity =
    Number(item.quantity) || 1

  const price =
    Number(item.price) || 0

  const lineTotal =
    price * quantity

  return (
    <div className="flex gap-4 p-4">
      {/* IMAGE */}
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={item.name || 'Product'}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ShoppingBag
              size={22}
              className="text-gray-300"
            />
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-gray-900">
          {item.name || 'Product'}
        </h3>

        {item.sellerName && (
          <p className="mt-1 text-xs text-gray-500">
            Seller: {item.sellerName}
          </p>
        )}

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
          <span>
            Quantity: {quantity}
          </span>

          <span>
            Unit price: {formatCurrency(price)}
          </span>
        </div>
      </div>

      {/* TOTAL */}
      <div className="shrink-0 text-right">
        <p className="text-sm font-bold text-gray-900">
          {formatCurrency(lineTotal)}
        </p>
      </div>
    </div>
  )
}

/* ===============================================================
   SECTION TITLE
================================================================ */

function SectionTitle({
  icon,
  title,
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-gray-700">
        {icon}
      </div>

      <h3 className="text-sm font-bold text-gray-900">
        {title}
      </h3>
    </div>
  )
}

/* ===============================================================
   INFO BOX
================================================================ */

function InfoBox({
  label,
  value,
  icon,
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-xs font-medium text-gray-400">
        {label}
      </p>

      <div className="mt-2 flex items-center gap-2">
        {icon && (
          <span className="text-gray-400">
            {icon}
          </span>
        )}

        <p className="break-all text-sm font-semibold text-gray-800">
          {value}
        </p>
      </div>
    </div>
  )
}

/* ===============================================================
   SUMMARY ROW
================================================================ */

function SummaryRow({
  label,
  value,
  strong = false,
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span
        className={
          strong
            ? 'font-bold text-gray-900'
            : 'text-gray-600'
        }
      >
        {label}
      </span>

      <span
        className={
          strong
            ? 'text-lg font-bold text-gray-900'
            : 'font-semibold text-gray-800'
        }
      >
        {value}
      </span>
    </div>
  )
}

/* ===============================================================
   ADDRESS FORMATTER
================================================================ */

function formatAddress(customer, order) {
  const source = customer || {}

  const address =
    source.address ||
    order?.address ||
    ''

  const apartment =
    source.apartment ||
    order?.apartment ||
    ''

  const city =
    source.city ||
    order?.city ||
    ''

  const state =
    source.state ||
    order?.state ||
    ''

  const postalCode =
    source.postalCode ||
    order?.postalCode ||
    ''

  const country =
    source.country ||
    order?.country ||
    ''

  const parts = [
    address,
    apartment,
    city,
    state,
    postalCode,
    country,
  ].filter(Boolean)

  return parts.length > 0
    ? parts.join(', ')
    : 'Shipping address not provided'
}

/* ===============================================================
   CURRENCY
================================================================ */

function formatCurrency(value) {
  const amount = Number(value) || 0

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

/* ===============================================================
   DATE
================================================================ */

function formatDate(date) {
  if (!date) return ''

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return ''
  }

  return parsedDate.toLocaleString()
}

export default AdminNotifications

