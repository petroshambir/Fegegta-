import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Package,
  User,
  MapPin,
  CreditCard,
  Truck,
  CalendarDays,
  Phone,
  Mail,
  ShoppingBag,
  Hash,
} from 'lucide-react'

function AdminOrderDetails() {
  const { id } = useParams()

  const [order] = useState({
    orderNumber: 'FEG-20261003-81AB3A',

    status: 'pending',

    createdAt: '2026-10-03T10:30:00',

    customer: {
      fullName: 'Meron Tkabo',
      email: 'meron@gmail.com',
      phone: '0707415421',
    },

    shippingAddress: {
      fullName: 'Meron Tkabo',
      phone: '0707415421',
      address: '1',
      city: 'Rotterdam',
      state: 'South Holland',
      postalCode: '3011AA',
      country: 'Netherlands',
    },

    shipping: {
      carrier: 'FedEx',
      service: 'FedEx Test Shipping',
      rateId: 'test-fedex',
      price: 0,
      currency: 'EUR',
    },

    payment: {
      method: 'test',
      status: 'pending',
      reference: '',
    },

    items: [
      {
        id: '1',
        name: 'Traditional Habesha Dress',
        image:
          'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
        price: 300,
        quantity: 1,
        size: 'M',
        color: 'White',
        subtotal: 300,
      },
    ],

    subtotal: 300,
    shippingCost: 0,
    discount: 0,
    total: 300,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-4 sm:p-6 lg:p-8">

        {/* ================================================== */}
        {/* BACK */}
        {/* ================================================== */}

        <div className="mb-6">
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </Link>
        </div>

        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Package
                size={25}
                className="text-gray-700"
              />

              <h1 className="text-2xl font-bold text-gray-900">
                Order Details
              </h1>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <Hash size={15} />
                {order.orderNumber}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={15} />
                {formatDate(order.createdAt)}
              </span>
            </div>
          </div>

          <OrderStatus status={order.status} />
        </div>

        {/* ================================================== */}
        {/* MAIN GRID */}
        {/* ================================================== */}

        <div className="grid gap-6 xl:grid-cols-3">

          {/* ================================================== */}
          {/* LEFT SIDE */}
          {/* ================================================== */}

          <div className="space-y-6 xl:col-span-2">

            {/* ================================================== */}
            {/* ORDER ITEMS */}
            {/* ================================================== */}

            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag
                    size={19}
                    className="text-gray-600"
                  />

                  <h2 className="text-base font-semibold text-gray-900">
                    Ordered Products
                  </h2>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <OrderItem
                    key={item.id}
                    item={item}
                  />
                ))}
              </div>
            </section>

            {/* ================================================== */}
            {/* CUSTOMER INFORMATION */}
            {/* ================================================== */}

            <section className="rounded-2xl border border-gray-200 bg-white">
              <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <User
                    size={19}
                    className="text-gray-600"
                  />

                  <h2 className="text-base font-semibold text-gray-900">
                    Customer Information
                  </h2>
                </div>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">

                <InfoItem
                  icon={<User size={17} />}
                  label="Full Name"
                  value={order.customer.fullName}
                />

                <InfoItem
                  icon={<Mail size={17} />}
                  label="Email"
                  value={order.customer.email}
                />

                <InfoItem
                  icon={<Phone size={17} />}
                  label="Phone"
                  value={order.customer.phone}
                />

                <InfoItem
                  icon={<Hash size={17} />}
                  label="Customer Order ID"
                  value={id}
                />

              </div>
            </section>

            {/* ================================================== */}
            {/* SHIPPING ADDRESS */}
            {/* ================================================== */}

            <section className="rounded-2xl border border-gray-200 bg-white">
              <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <MapPin
                    size={19}
                    className="text-gray-600"
                  />

                  <h2 className="text-base font-semibold text-gray-900">
                    Shipping Address
                  </h2>
                </div>
              </div>

              <div className="p-5 sm:p-6">

                <div className="grid gap-5 sm:grid-cols-2">

                  <InfoItem
                    label="Full Name"
                    value={order.shippingAddress.fullName}
                  />

                  <InfoItem
                    label="Phone"
                    value={order.shippingAddress.phone}
                  />

                  <InfoItem
                    label="Address"
                    value={order.shippingAddress.address}
                  />

                  <InfoItem
                    label="City"
                    value={order.shippingAddress.city}
                  />

                  <InfoItem
                    label="State / Province"
                    value={order.shippingAddress.state}
                  />

                  <InfoItem
                    label="Postal Code"
                    value={order.shippingAddress.postalCode}
                  />

                  <InfoItem
                    label="Country"
                    value={order.shippingAddress.country}
                  />

                </div>

              </div>
            </section>

            {/* ================================================== */}
            {/* SHIPPING INFORMATION */}
            {/* ================================================== */}

            <section className="rounded-2xl border border-gray-200 bg-white">
              <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <Truck
                    size={19}
                    className="text-gray-600"
                  />

                  <h2 className="text-base font-semibold text-gray-900">
                    Shipping Information
                  </h2>
                </div>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">

                <InfoItem
                  label="Carrier"
                  value={order.shipping.carrier}
                />

                <InfoItem
                  label="Service"
                  value={order.shipping.service}
                />

                <InfoItem
                  label="Rate ID"
                  value={order.shipping.rateId}
                />

                <InfoItem
                  label="Shipping Cost"
                  value={formatCurrency(order.shipping.price)}
                />

              </div>
            </section>

            {/* ================================================== */}
            {/* PAYMENT INFORMATION */}
            {/* ================================================== */}

            <section className="rounded-2xl border border-gray-200 bg-white">
              <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <CreditCard
                    size={19}
                    className="text-gray-600"
                  />

                  <h2 className="text-base font-semibold text-gray-900">
                    Payment Information
                  </h2>
                </div>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">

                <InfoItem
                  label="Payment Method"
                  value={formatLabel(
                    order.payment.method
                  )}
                />

                <InfoItem
                  label="Payment Status"
                  value={formatLabel(
                    order.payment.status
                  )}
                />

                <InfoItem
                  label="Payment Reference"
                  value={
                    order.payment.reference || '—'
                  }
                />

              </div>
            </section>

          </div>

          {/* ================================================== */}
          {/* RIGHT SIDE */}
          {/* ================================================== */}

          <div className="space-y-6">

            {/* ================================================== */}
            {/* ORDER SUMMARY */}
            {/* ================================================== */}

            <section className="rounded-2xl border border-gray-200 bg-white">
              <div className="border-b border-gray-100 px-5 py-4">
                <h2 className="text-base font-semibold text-gray-900">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-4 p-5">

                <SummaryRow
                  label="Subtotal"
                  value={order.subtotal}
                />

                <SummaryRow
                  label="Shipping"
                  value={order.shippingCost}
                />

                <SummaryRow
                  label="Discount"
                  value={order.discount}
                />

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-gray-900">
                      Total
                    </span>

                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>

              </div>
            </section>

            {/* ================================================== */}
            {/* ORDER STATUS */}
            {/* ================================================== */}

            <section className="rounded-2xl border border-gray-200 bg-white">
              <div className="border-b border-gray-100 px-5 py-4">
                <h2 className="text-base font-semibold text-gray-900">
                  Order Status
                </h2>
              </div>

              <div className="p-5">
                <OrderStatus
                  status={order.status}
                  large
                />
              </div>
            </section>

            {/* ================================================== */}
            {/* ORDER DATE */}
            {/* ================================================== */}

            <section className="rounded-2xl border border-gray-200 bg-white">
              <div className="p-5">

                <div className="flex items-start gap-3">
                  <CalendarDays
                    size={20}
                    className="mt-0.5 text-gray-500"
                  />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Order Date
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {formatDate(order.createdAt)}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {formatTime(order.createdAt)}
                    </p>
                  </div>
                </div>

              </div>
            </section>

          </div>

        </div>
      </main>
    </div>
  )
}

// ============================================================
// ORDER ITEM
// ============================================================

function OrderItem({ item }) {
  return (
    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:p-6">

      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">

        <h3 className="text-sm font-semibold text-gray-900">
          {item.name}
        </h3>

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">

          {item.size && (
            <span>
              Size:{' '}
              <span className="font-medium text-gray-700">
                {item.size}
              </span>
            </span>
          )}

          {item.color && (
            <span>
              Color:{' '}
              <span className="font-medium text-gray-700">
                {item.color}
              </span>
            </span>
          )}

          <span>
            Quantity:{' '}
            <span className="font-medium text-gray-700">
              {item.quantity}
            </span>
          </span>

        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

          <div>
            <p className="text-xs text-gray-400">
              Unit Price
            </p>

            <p className="mt-0.5 text-sm font-semibold text-gray-800">
              {formatCurrency(item.price)}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-400">
              Subtotal
            </p>

            <p className="mt-0.5 text-sm font-bold text-gray-900">
              {formatCurrency(item.subtotal)}
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}

// ============================================================
// INFO ITEM
// ============================================================

function InfoItem({
  icon,
  label,
  value,
}) {
  return (
    <div>

      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-400">
        {icon}
        <span>{label}</span>
      </div>

      <p className="mt-1.5 break-words text-sm font-medium text-gray-900">
        {value || '—'}
      </p>

    </div>
  )
}

// ============================================================
// SUMMARY ROW
// ============================================================

function SummaryRow({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-gray-500">
        {label}
      </span>

      <span className="font-medium text-gray-900">
        {formatCurrency(value)}
      </span>
    </div>
  )
}

// ============================================================
// ORDER STATUS
// ============================================================

function OrderStatus({
  status,
  large = false,
}) {
  const normalized = String(
    status || 'pending'
  )
    .toLowerCase()
    .trim()

  const styles = {
    pending:
      'bg-yellow-50 text-yellow-700 border-yellow-200',

    confirmed:
      'bg-blue-50 text-blue-700 border-blue-200',

    processing:
      'bg-blue-50 text-blue-700 border-blue-200',

    shipped:
      'bg-purple-50 text-purple-700 border-purple-200',

    delivered:
      'bg-green-50 text-green-700 border-green-200',

    completed:
      'bg-green-50 text-green-700 border-green-200',

    cancelled:
      'bg-red-50 text-red-700 border-red-200',

    canceled:
      'bg-red-50 text-red-700 border-red-200',
  }

  const label = formatLabel(
    status || 'pending'
  )

  return (
    <span
      className={`inline-flex items-center rounded-full border font-semibold ${
        large
          ? 'px-4 py-2 text-sm'
          : 'px-3 py-1 text-xs'
      } ${
        styles[normalized] ||
        'border-gray-200 bg-gray-100 text-gray-600'
      }`}
    >
      {label}
    </span>
  )
}

// ============================================================
// FORMAT LABEL
// ============================================================

function formatLabel(value) {
  return String(value || '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    )
}

// ============================================================
// CURRENCY
// ============================================================

function formatCurrency(value) {
  const amount = Number(value)

  if (!Number.isFinite(amount)) {
    return '€0.00'
  }

  return `€${amount.toFixed(2)}`
}

// ============================================================
// DATE
// ============================================================

function formatDate(value) {
  if (!value) {
    return '—'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  return date.toLocaleDateString()
}

// ============================================================
// TIME
// ============================================================

function formatTime(value) {
  if (!value) {
    return '—'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default AdminOrderDetails