import React, { useEffect, useMemo, useState } from 'react'
import {
  Wallet,
  TrendingUp,
  Percent,
  BadgeDollarSign,
} from 'lucide-react'

import {
  getSellerOrders,
  getCommissionRate,
  calculateCommission,
  calculateSellerEarnings,
} from '../../services/sellerStorage'

function SellerEarnings() {
  const [orders, setOrders] =
    useState([])

  useEffect(() => {
    setOrders(getSellerOrders())
  }, [])

  const completedOrders =
    useMemo(
      () =>
        orders.filter(
          (order) =>
            order.status ===
              'Delivered' ||
            order.status === 'Completed'
        ),
      [orders]
    )

  const grossSales =
    completedOrders.reduce(
      (sum, order) =>
        sum + getSellerAmount(order),
      0
    )

  const commission =
    completedOrders.reduce(
      (sum, order) =>
        sum +
        calculateCommission(
          getSellerAmount(order)
        ),
      0
    )

  const earnings =
    completedOrders.reduce(
      (sum, order) =>
        sum +
        calculateSellerEarnings(
          getSellerAmount(order)
        ),
      0
    )

  const rate = getCommissionRate()

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <h1 className="text-2xl font-bold">
            Earnings
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Track your sales, commission and seller earnings.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card
            icon={TrendingUp}
            label="Gross Sales"
            value={`€${grossSales.toFixed(2)}`}
          />

          <Card
            icon={Percent}
            label="Platform Commission"
            value={`€${commission.toFixed(2)}`}
          />

          <Card
            icon={BadgeDollarSign}
            label="Net Earnings"
            value={`€${earnings.toFixed(2)}`}
          />

          <Card
            icon={Wallet}
            label="Available Balance"
            value={`€${earnings.toFixed(2)}`}
          />
        </div>

        <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6">
          <h2 className="font-bold">
            Commission
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Current platform commission rate:{' '}
            <strong>
              {(rate * 100).toFixed(0)}%
            </strong>
          </p>

          <div className="mt-5 rounded-2xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">
              Example
            </p>

            <p className="mt-2 text-lg font-bold">
              €100.00 sale
            </p>

            <div className="mt-3 space-y-2 text-sm">
              <p>
                Platform commission:{' '}
                <strong>€10.00</strong>
              </p>

              <p>
                Seller earnings:{' '}
                <strong>€90.00</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getSellerAmount(order) {
  const items = order.items || []

  const sellerItems =
    items.filter(
      (item) =>
        item.sellerId ===
        order.sellerId
    )

  if (!sellerItems.length) {
    return Number(order.total || 0)
  }

  return sellerItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  )
}

function Card({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
        <Icon className="h-5 w-5" />
      </div>

      <p className="mt-5 text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>
    </div>
  )
}

export default SellerEarnings