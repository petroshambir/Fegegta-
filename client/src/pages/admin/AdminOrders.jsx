import React, { useEffect, useMemo, useState } from 'react'
import {
  Search,
  ShoppingCart,
  Eye,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import { getAllOrders } from '../../utils/adminStorage'

function AdminOrders() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    setOrders(getAllOrders())
  }, [])

  const filtered = useMemo(() => {
    return orders.filter((order) =>
      `${order.id || ''} ${
        order.orderNumber || ''
      } ${order.customerName || ''} ${
        order.email || ''
      }`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [orders, search])

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
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Orders
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              View all orders across the platform.
            </p>
          </div>

          <div className="mb-5 relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search orders..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none"
            />
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {filtered.length === 0 ? (
              <div className="p-12 text-center">
                <ShoppingCart
                  className="mx-auto text-gray-300"
                  size={40}
                />

                <p className="mt-4 text-sm text-gray-500">
                  No orders found.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-[950px] w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
                        Order
                      </th>

                      <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
                        Customer
                      </th>

                      <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
                        Total
                      </th>

                      <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
                        Status
                      </th>

                      <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
                        Date
                      </th>

                      <th className="px-5 py-4 text-right text-xs uppercase text-gray-500">
                        View
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((order) => (
                      <tr key={order.id}>
                        <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                          #{order.orderNumber || order.id}
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-gray-900">
                            {order.customerName ||
                              order.customer?.name ||
                              'Customer'}
                          </p>

                          <p className="text-xs text-gray-500">
                            {order.email ||
                              order.customer?.email ||
                              ''}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm font-semibold">
                          €{Number(
                            order.total ||
                              order.amount ||
                              0
                          ).toFixed(2)}
                        </td>

                        <td className="px-5 py-4">
                          <Status
                            status={order.status}
                          />
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-500">
                          {formatDate(
                            order.createdAt ||
                              order.date
                          )}
                        </td>

                        <td className="px-5 py-4 text-right">
                          <Link
                            to={`/account/orders/${order.id}`}
                            className="inline-flex rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
                          >
                            <Eye size={17} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

function Status({ status }) {
  const styles = {
    pending: 'bg-yellow-50 text-yellow-700',
    processing: 'bg-blue-50 text-blue-700',
    shipped: 'bg-purple-50 text-purple-700',
    delivered: 'bg-green-50 text-green-700',
    completed: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-700',
  }

  const normalized = String(
    status || 'pending'
  ).toLowerCase()

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[normalized] ||
        'bg-gray-100 text-gray-600'
      }`}
    >
      {status || 'Pending'}
    </span>
  )
}

function formatDate(date) {
  if (!date) return '—'

  return new Date(date).toLocaleDateString()
}

export default AdminOrders