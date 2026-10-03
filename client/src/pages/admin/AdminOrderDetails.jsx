
import React, { useEffect, useState } from 'react'
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
  Loader2,
  AlertCircle,
  Store,
} from 'lucide-react'

const API_URL =
  'https://fegegta-server.onrender.com/api'

const getToken = () => {
  return localStorage.getItem('token')
}

function AdminOrderDetails() {
  const { id } = useParams()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // ============================================================
  // LOAD ORDER
  // ============================================================

  const loadOrder = async () => {
    try {
      setLoading(true)
      setError('')

      const token = getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found. Please login again.'
        )
      }

      if (!id) {
        throw new Error(
          'Order ID is missing.'
        )
      }

      const response = await fetch(
        `${API_URL}/orders/${id}`,
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
            'Failed to load order details.'
        )
      }

      if (data?.success === false) {
        throw new Error(
          data?.message ||
            'Failed to load order details.'
        )
      }

      const receivedOrder =
        data?.order ||
        data?.data?.order ||
        data?.data

      if (!receivedOrder) {
        throw new Error(
          'Order details were not returned by the server.'
        )
      }

      setOrder(receivedOrder)
    } catch (error) {
      console.error(
        'Load admin order details error:',
        error
      )

      setError(
        error?.message ||
          'Something went wrong while loading the order.'
      )
    } finally {
      setLoading(false)
    }
  }

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    loadOrder()
  }, [id])

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="flex min-h-[500px] items-center justify-center">
            <div className="text-center">
              <Loader2
                size={38}
                className="mx-auto animate-spin text-gray-400"
              />

              <p className="mt-4 text-sm text-gray-500">
                Loading order details...
              </p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <Link
              to="/admin/orders"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              <ArrowLeft size={18} />
              Back to Orders
            </Link>
          </div>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={22}
                className="mt-0.5 shrink-0 text-red-600"
              />

              <div>
                <h1 className="text-base font-semibold text-red-800">
                  Failed to load order
                </h1>

                <p className="mt-1 text-sm text-red-700">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={loadOrder}
                  className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!order) {
    return null
  }

  // ============================================================
  // REAL ORDER DATA
  // ============================================================

  const customer =
    order.customer || {}

  const shippingAddress =
    order.shippingAddress || {}

  const items =
    Array.isArray(order.items)
      ? order.items
      : []

  const orderStatus =
    order.orderStatus ||
    order.status ||
    'pending'

  const paymentMethod =
    order.paymentMethod ||
    '—'

  const paymentStatus =
    order.paymentStatus ||
    'pending'

  const paymentReference =
    order.paymentReference ||
    ''

  const subtotal =
    order.subtotal ?? 0

  const shippingCost =
    order.shippingCost ?? 0

  const discount =
    order.discount ?? 0

  const total =
    order.total ?? 0

  const customerName =
    [
      customer.firstName,
      customer.lastName,
    ]
      .filter(Boolean)
      .join(' ')
      .trim() ||
    customer.name ||
    shippingAddress.fullName ||
    'Customer'

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

                {order.orderNumber ||
                  order._id ||
                  id}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={15} />

                {formatDate(
                  order.createdAt
                )}
              </span>

            </div>
          </div>

          <OrderStatus
            status={orderStatus}
          />
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

              {items.length === 0 ? (
                <div className="p-6 text-sm text-gray-500">
                  No products found for this order.
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {items.map(
                    (item, index) => (
                      <OrderItem
                        key={
                          item._id ||
                          item.id ||
                          `${item.product?._id || item.product || 'item'}-${index}`
                        }
                        item={item}
                      />
                    )
                  )}
                </div>
              )}
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
                  value={customerName}
                />

                <InfoItem
                  icon={<Mail size={17} />}
                  label="Email"
                  value={
                    customer.email ||
                    '—'
                  }
                />

                <InfoItem
                  icon={<Phone size={17} />}
                  label="Phone"
                  value={
                    customer.phone ||
                    shippingAddress.phone ||
                    '—'
                  }
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
                    value={
                      shippingAddress.fullName
                    }
                  />

                  <InfoItem
                    label="Phone"
                    value={
                      shippingAddress.phone
                    }
                  />

                  <InfoItem
                    label="Address"
                    value={
                      shippingAddress.address
                    }
                  />

                  <InfoItem
                    label="City"
                    value={
                      shippingAddress.city
                    }
                  />

                  <InfoItem
                    label="State / Province"
                    value={
                      shippingAddress.state
                    }
                  />

                  <InfoItem
                    label="Postal Code"
                    value={
                      shippingAddress.postalCode
                    }
                  />

                  <InfoItem
                    label="Country"
                    value={
                      shippingAddress.country
                    }
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
                  value={
                    getShippingValue(
                      order,
                      'carrier'
                    )
                  }
                />

                <InfoItem
                  label="Service"
                  value={
                    getShippingValue(
                      order,
                      'service'
                    )
                  }
                />

                <InfoItem
                  label="Rate ID"
                  value={
                    getShippingValue(
                      order,
                      'rateId'
                    )
                  }
                />

                <InfoItem
                  label="Shipping Cost"
                  value={formatCurrency(
                    shippingCost
                  )}
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
                    paymentMethod
                  )}
                />

                <InfoItem
                  label="Payment Status"
                  value={formatLabel(
                    paymentStatus
                  )}
                />

                <InfoItem
                  label="Payment Reference"
                  value={
                    paymentReference ||
                    '—'
                  }
                />

              </div>
            </section>

            {/* ================================================== */}
            {/* CUSTOMER NOTES */}
            {/* ================================================== */}

            {order.notes && (
              <section className="rounded-2xl border border-gray-200 bg-white">
                <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                  <h2 className="text-base font-semibold text-gray-900">
                    Customer Notes
                  </h2>
                </div>

                <div className="p-5 sm:p-6">
                  <p className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">
                    {order.notes}
                  </p>
                </div>
              </section>
            )}

            {/* ================================================== */}
            {/* SELLERS / STORES */}
            {/* ================================================== */}

            {items.length > 0 && (
              <section className="rounded-2xl border border-gray-200 bg-white">
                <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-2">

                    <Store
                      size={19}
                      className="text-gray-600"
                    />

                    <h2 className="text-base font-semibold text-gray-900">
                      Seller / Store Information
                    </h2>

                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {items.map(
                    (item, index) => (
                      <SellerItem
                        key={
                          item._id ||
                          item.id ||
                          `seller-${index}`
                        }
                        item={item}
                      />
                    )
                  )}
                </div>
              </section>
            )}

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
                  value={subtotal}
                />

                <SummaryRow
                  label="Shipping"
                  value={shippingCost}
                />

                <SummaryRow
                  label="Discount"
                  value={discount}
                />

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">

                    <span className="text-base font-bold text-gray-900">
                      Total
                    </span>

                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(
                        total
                      )}
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
                  status={orderStatus}
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
                      {formatDate(
                        order.createdAt
                      )}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {formatTime(
                        order.createdAt
                      )}
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
  const product =
    item.product &&
    typeof item.product === 'object'
      ? item.product
      : null

  const image =
    item.image ||
    getProductImage(product)

  const productName =
    item.name ||
    product?.name ||
    'Product'

  const quantity =
    item.quantity ?? 0

  const price =
    item.price ?? 0

  const subtotal =
    item.subtotal ??
    Number(price) * Number(quantity)

  const size =
    item.size ||
    item.sizeData?.size ||
    ''

  const color =
    item.color ||
    item.sizeData?.color ||
    ''

  return (
    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:p-6">

      {/* PRODUCT IMAGE */}

      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">

        {image ? (
          <img
            src={image}
            alt={productName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            <Package size={30} />
          </div>
        )}

      </div>

      {/* PRODUCT DETAILS */}

      <div className="min-w-0 flex-1">

        <h3 className="text-sm font-semibold text-gray-900">
          {productName}
        </h3>

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">

          {size && (
            <span>
              Size:{' '}
              <span className="font-medium text-gray-700">
                {size}
              </span>
            </span>
          )}

          {color && (
            <span>
              Color:{' '}
              <span className="font-medium text-gray-700">
                {color}
              </span>
            </span>
          )}

          <span>
            Quantity:{' '}
            <span className="font-medium text-gray-700">
              {quantity}
            </span>
          </span>

        </div>

        {/* SIZE DATA */}

        {item.sizeData &&
          typeof item.sizeData === 'object' &&
          Object.keys(item.sizeData)
            .filter(
              (key) =>
                ![
                  'size',
                  'color',
                ].includes(key)
            )
            .length > 0 && (
            <div className="mt-3 rounded-lg bg-gray-50 p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Selected Options
              </p>

              <div className="grid gap-2 sm:grid-cols-2">
                {Object.entries(
                  item.sizeData
                )
                  .filter(
                    ([key]) =>
                      ![
                        'size',
                        'color',
                      ].includes(key)
                  )
                  .map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="text-xs text-gray-600"
                      >
                        <span className="font-medium text-gray-700">
                          {formatLabel(
                            key
                          )}
                          :
                        </span>{' '}
                        {String(
                          value ?? ''
                        )}
                      </div>
                    )
                  )}
              </div>
            </div>
          )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

          <div>
            <p className="text-xs text-gray-400">
              Unit Price
            </p>

            <p className="mt-0.5 text-sm font-semibold text-gray-800">
              {formatCurrency(
                price
              )}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-400">
              Subtotal
            </p>

            <p className="mt-0.5 text-sm font-bold text-gray-900">
              {formatCurrency(
                subtotal
              )}
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

// ============================================================
// SELLER ITEM
// ============================================================

function SellerItem({ item }) {
  const seller =
    item.seller &&
    typeof item.seller === 'object'
      ? item.seller
      : null

  const store =
    item.store &&
    typeof item.store === 'object'
      ? item.store
      : null

  const sellerName =
    seller?.businessName ||
    seller?.name ||
    'Seller'

  const storeName =
    store?.name ||
    'Store'

  return (
    <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">

      <InfoItem
        label="Product"
        value={
          item.name ||
          item.product?.name ||
          'Product'
        }
      />

      <InfoItem
        label="Store"
        value={storeName}
      />

      <InfoItem
        label="Seller"
        value={sellerName}
      />

      <InfoItem
        label="Seller Email"
        value={
          seller?.email ||
          '—'
        }
      />

      <InfoItem
        label="Seller Phone"
        value={
          seller?.phone ||
          '—'
        }
      />

      <InfoItem
        label="Store Slug"
        value={
          store?.slug ||
          '—'
        }
      />

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
        {value !== undefined &&
        value !== null &&
        String(value).trim() !== ''
          ? value
          : '—'}
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
// GET SHIPPING VALUE
// ============================================================

function getShippingValue(
  order,
  field
) {
  if (
    order?.shipping &&
    typeof order.shipping === 'object'
  ) {
    return (
      order.shipping[field] ||
      '—'
    )
  }

  if (field === 'carrier') {
    return (
      order?.shippingCarrier ||
      '—'
    )
  }

  if (field === 'service') {
    return (
      order?.shippingService ||
      '—'
    )
  }

  if (field === 'rateId') {
    return (
      order?.shippingRateId ||
      '—'
    )
  }

  return '—'
}

// ============================================================
// PRODUCT IMAGE
// ============================================================

function getProductImage(
  product
) {
  const images =
    product?.images

  if (
    !Array.isArray(images) ||
    images.length === 0
  ) {
    return ''
  }

  const firstImage =
    images[0]

  if (
    typeof firstImage === 'object'
  ) {
    return (
      firstImage?.url ||
      firstImage?.secure_url ||
      ''
    )
  }

  return firstImage || ''
}

// ============================================================
// FORMAT LABEL
// ============================================================

function formatLabel(value) {
  return String(value || '')
    .replace(/_/g, ' ')
    .replace(
      /\b\w/g,
      (char) =>
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

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
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

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return '—'
  }

  return date.toLocaleTimeString(
    [],
    {
      hour: '2-digit',
      minute: '2-digit',
    }
  )
}

export default AdminOrderDetails

