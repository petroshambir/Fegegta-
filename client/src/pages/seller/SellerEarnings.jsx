// import React, { useEffect, useMemo, useState } from 'react'
// import {
//   Wallet,
//   TrendingUp,
//   Percent,
//   BadgeDollarSign,
// } from 'lucide-react'

// import {
//   getSellerOrders,
//   getCommissionRate,
//   calculateCommission,
//   calculateSellerEarnings,
// } from '../../services/sellerStorage'

// function SellerEarnings() {
//   const [orders, setOrders] =
//     useState([])

//   useEffect(() => {
//     setOrders(getSellerOrders())
//   }, [])

//   const completedOrders =
//     useMemo(
//       () =>
//         orders.filter(
//           (order) =>
//             order.status ===
//               'Delivered' ||
//             order.status === 'Completed'
//         ),
//       [orders]
//     )

//   const grossSales =
//     completedOrders.reduce(
//       (sum, order) =>
//         sum + getSellerAmount(order),
//       0
//     )

//   const commission =
//     completedOrders.reduce(
//       (sum, order) =>
//         sum +
//         calculateCommission(
//           getSellerAmount(order)
//         ),
//       0
//     )

//   const earnings =
//     completedOrders.reduce(
//       (sum, order) =>
//         sum +
//         calculateSellerEarnings(
//           getSellerAmount(order)
//         ),
//       0
//     )

//   const rate = getCommissionRate()

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <div>
//           <h1 className="text-2xl font-bold">
//             Earnings
//           </h1>

//           <p className="mt-1 text-sm text-gray-500">
//             Track your sales, commission and seller earnings.
//           </p>
//         </div>

//         <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//           <Card
//             icon={TrendingUp}
//             label="Gross Sales"
//             value={`€${grossSales.toFixed(2)}`}
//           />

//           <Card
//             icon={Percent}
//             label="Platform Commission"
//             value={`€${commission.toFixed(2)}`}
//           />

//           <Card
//             icon={BadgeDollarSign}
//             label="Net Earnings"
//             value={`€${earnings.toFixed(2)}`}
//           />

//           <Card
//             icon={Wallet}
//             label="Available Balance"
//             value={`€${earnings.toFixed(2)}`}
//           />
//         </div>

//         <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6">
//           <h2 className="font-bold">
//             Commission
//           </h2>

//           <p className="mt-2 text-sm text-gray-500">
//             Current platform commission rate:{' '}
//             <strong>
//               {(rate * 100).toFixed(0)}%
//             </strong>
//           </p>

//           <div className="mt-5 rounded-2xl bg-gray-50 p-5">
//             <p className="text-sm text-gray-500">
//               Example
//             </p>

//             <p className="mt-2 text-lg font-bold">
//               €100.00 sale
//             </p>

//             <div className="mt-3 space-y-2 text-sm">
//               <p>
//                 Platform commission:{' '}
//                 <strong>€10.00</strong>
//               </p>

//               <p>
//                 Seller earnings:{' '}
//                 <strong>€90.00</strong>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function getSellerAmount(order) {
//   const items = order.items || []

//   const sellerItems =
//     items.filter(
//       (item) =>
//         item.sellerId ===
//         order.sellerId
//     )

//   if (!sellerItems.length) {
//     return Number(order.total || 0)
//   }

//   return sellerItems.reduce(
//     (sum, item) =>
//       sum +
//       Number(item.price || 0) *
//         Number(item.quantity || 1),
//     0
//   )
// }

// function Card({
//   icon: Icon,
//   label,
//   value,
// }) {
//   return (
//     <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//       <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
//         <Icon className="h-5 w-5" />
//       </div>

//       <p className="mt-5 text-sm text-gray-500">
//         {label}
//       </p>

//       <p className="mt-1 text-2xl font-bold">
//         {value}
//       </p>
//     </div>
//   )
// }

// export default SellerEarnings

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Wallet,
  TrendingUp,
  Percent,
  BadgeDollarSign,
} from 'lucide-react'

import {
  getCommissionRate,
  calculateCommission,
  calculateSellerEarnings,
} from '../../services/sellerStorage'

const API_URL = 'https://fegegta-server.onrender.com/api'

function normalizeOrder(order) {
  return {
    ...order,
    id: String(order?._id || order?.id || ''),
    status: String(order?.status || order?.orderStatus || '').toLowerCase(),
    items: Array.isArray(order?.items) ? order.items : [],
  }
}

function SellerEarnings() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const rate = Number(getCommissionRate()) || 0

  const loadOrders = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setOrders([])
      setError('Please sign in to view your earnings.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_URL}/seller/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.message || 'Could not load your earnings.')
      }
      setOrders((Array.isArray(data?.orders) ? data.orders : []).map(normalizeOrder))
      setError('')
    } catch (loadError) {
      setError(loadError.message || 'Could not load your earnings.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadOrders()
    const timer = window.setInterval(loadOrders, 30000)
    return () => window.clearInterval(timer)
  }, [loadOrders])

  const completedOrders = useMemo(
    () => orders.filter((order) => ['delivered', 'completed'].includes(order.status)),
    [orders]
  )

  const grossSales = useMemo(
    () => completedOrders.reduce((sum, order) => sum + getSellerAmount(order), 0),
    [completedOrders]
  )

  const commission = useMemo(
    () => completedOrders.reduce((sum, order) => sum + calculateCommission(getSellerAmount(order)), 0),
    [completedOrders]
  )

  const earnings = useMemo(
    () => completedOrders.reduce((sum, order) => sum + calculateSellerEarnings(getSellerAmount(order)), 0),
    [completedOrders]
  )

  const exampleCommission = calculateCommission(100)
  const exampleEarnings = calculateSellerEarnings(100)

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <h1 className="text-2xl font-bold">Earnings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your completed sales, commission and seller earnings.
          </p>
        </div>

        {error && (
          <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-8 text-sm text-gray-500">
            Loading earnings…
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Card icon={TrendingUp} label="Gross Sales" value={`€${grossSales.toFixed(2)}`} />
              <Card icon={Percent} label="Platform Commission" value={`€${commission.toFixed(2)}`} />
              <Card icon={BadgeDollarSign} label="Net Earnings" value={`€${earnings.toFixed(2)}`} />
              <Card icon={Wallet} label="Available Balance" value={`€${earnings.toFixed(2)}`} />
            </div>

            <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6">
              <h2 className="font-bold">Commission</h2>
              <p className="mt-2 text-sm text-gray-500">
                Current platform commission rate: <strong>{(rate * 100).toFixed(0)}%</strong>
              </p>

              <div className="mt-5 rounded-2xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Example</p>
                <p className="mt-2 text-lg font-bold">€100.00 sale</p>
                <div className="mt-3 space-y-2 text-sm">
                  <p>Platform commission: <strong>€{exampleCommission.toFixed(2)}</strong></p>
                  <p>Seller earnings: <strong>€{exampleEarnings.toFixed(2)}</strong></p>
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                These totals use the same completed orders as the seller dashboard and refresh every 30 seconds.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function getSellerAmount(order) {
  return (order?.items || []).reduce((sum, item) => {
    const amount = Number(item.price || 0) * Number(item.quantity || 1)
    return sum + (Number.isFinite(amount) ? amount : 0)
  }, 0)
}

function Card({ icon: Icon, label, value }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-5 text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  )
}

export default SellerEarnings
