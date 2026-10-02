import React, { useEffect, useMemo, useState } from 'react'
import {
  BarChart3,
  ShoppingBag,
  Percent,
  TrendingUp,
} from 'lucide-react'

import {
  getSellerOrders,
  calculateCommission,
  calculateSellerEarnings,
} from '../../services/sellerStorage'

function SellerSales() {
  const [orders, setOrders] =
    useState([])

  useEffect(() => {
    setOrders(getSellerOrders())
  }, [])

  const completed =
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

  const totalSales =
    completed.reduce(
      (sum, order) =>
        sum + getSellerAmount(order),
      0
    )

  const commission =
    completed.reduce(
      (sum, order) =>
        sum +
        calculateCommission(
          getSellerAmount(order)
        ),
      0
    )

  const earnings =
    completed.reduce(
      (sum, order) =>
        sum +
        calculateSellerEarnings(
          getSellerAmount(order)
        ),
      0
    )

  const average =
    completed.length
      ? totalSales /
        completed.length
      : 0

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold">
          Sales
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View your completed sales performance.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card
            icon={TrendingUp}
            label="Total Sales"
            value={`€${totalSales.toFixed(2)}`}
          />

          <Card
            icon={ShoppingBag}
            label="Completed Orders"
            value={completed.length}
          />

          <Card
            icon={Percent}
            label="Commission"
            value={`€${commission.toFixed(2)}`}
          />

          <Card
            icon={BarChart3}
            label="Average Order"
            value={`€${average.toFixed(2)}`}
          />
        </div>

        <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6">
          <h2 className="font-bold">
            Sales Overview
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Metric
              label="Gross Sales"
              value={totalSales}
            />

            <Metric
              label="Platform Commission"
              value={commission}
            />

            <Metric
              label="Seller Earnings"
              value={earnings}
            />
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
    <div className="rounded-3xl border border-gray-200 bg-white p-5">
      <Icon className="h-5 w-5" />

      <p className="mt-5 text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold">
        {typeof value === 'number'
          ? value
          : value}
      </p>
    </div>
  )
}

function Metric({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-5">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold">
        €{value.toFixed(2)}
      </p>
    </div>
  )
}

export default SellerSales