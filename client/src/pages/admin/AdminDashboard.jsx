

import React, { useEffect, useState } from 'react'
import {
  DollarSign,
  ShoppingCart,
  Users,
  Store,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import AdminStatCard from '../../components/admin/AdminStatCard'
import {
  getAdminStatistics,
  getAdminNotifications,
} from '../../utils/adminStorage'

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(Number(value || 0))
}

function AdminDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [stats, setStats] = useState({})
  const [notifications, setNotifications] = useState([])

  const loadDashboard = () => {
    setStats(getAdminStatistics())
    setNotifications(getAdminNotifications().slice(0, 5))
  }

  useEffect(() => {
    loadDashboard()
  }, [])

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
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Welcome back. Here is what is happening on Fegegta.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <AdminStatCard
              title="Total Sales"
              value={formatCurrency(stats.totalSales)}
              subtitle="Completed sales"
              icon={DollarSign}
            />

            <AdminStatCard
              title="Total Orders"
              value={stats.totalOrders || 0}
              subtitle="All platform orders"
              icon={ShoppingCart}
            />

            <AdminStatCard
              title="Customers"
              value={stats.totalCustomers || 0}
              subtitle="Registered customers"
              icon={Users}
            />

            <AdminStatCard
              title="Sellers"
              value={stats.totalSellers || 0}
              subtitle="Approved sellers"
              icon={Store}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <AdminStatCard
              title="Products"
              value={stats.totalProducts || 0}
              subtitle="Admin + seller products"
              icon={Package}
            />

            <AdminStatCard
              title="Pending Sellers"
              value={stats.pendingSellerApplications || 0}
              subtitle="Waiting for review"
              icon={Clock}
            />

            <AdminStatCard
              title="Pending Products"
              value={stats.pendingProducts || 0}
              subtitle="Waiting for approval"
              icon={AlertCircle}
            />

            <AdminStatCard
              title="Commission"
              value={formatCurrency(stats.commission)}
              subtitle="Platform commission"
              icon={CheckCircle}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 xl:col-span-2">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Quick Actions
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage the most important platform tasks.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <QuickAction
                  to="/admin/products/add"
                  title="Add Product"
                  description="Add your own product directly to Fegegta."
                />

                <QuickAction
                  to="/admin/my-products"
                  title="Manage My Products"
                  description="View and manage your own products."
                />

                <QuickAction
                  to="/admin/sellers"
                  title="Review Sellers"
                  description="Approve or reject seller applications."
                />

                <QuickAction
                  to="/admin/seller-products"
                  title="Review Products"
                  description="Approve seller products before publication."
                />

                <QuickAction
                  to="/admin/orders"
                  title="Manage Orders"
                  description="View and manage all platform orders."
                />
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Notifications
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Recent admin activity.
                  </p>
                </div>

                <Link
                  to="/admin/notifications"
                  className="text-sm font-semibold text-gray-700 hover:text-black"
                >
                  View all
                </Link>
              </div>

              <div className="mt-5 space-y-3">
                {notifications.length === 0 ? (
                  <div className="rounded-xl bg-gray-50 p-5 text-center text-sm text-gray-500">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="rounded-xl border border-gray-100 p-4"
                    >
                      <p className="text-sm font-semibold text-gray-900">
                        {notification.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {notification.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Seller Earnings Overview
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  After platform commission.
                </p>
              </div>

              <Link
                to="/admin/commission"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-black"
              >
                View commission
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MiniValue
                label="Gross Sales"
                value={formatCurrency(stats.totalSales)}
              />

              <MiniValue
                label="Platform Commission"
                value={formatCurrency(stats.commission)}
              />

              <MiniValue
                label="Seller Earnings"
                value={formatCurrency(stats.sellerEarnings)}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function QuickAction({ to, title, description }) {
  return (
    <Link
      to={to}
      className="group rounded-xl border border-gray-200 p-4 transition hover:border-gray-400 hover:shadow-sm"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-gray-900">
            {title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            {description}
          </p>
        </div>

        <ArrowRight
          size={18}
          className="shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-gray-900"
        />
      </div>
    </Link>
  )
}

function MiniValue({ label, value }) {
  return (
    <div className="rounded-xl bg-gray-50 p-5">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  )
}

export default AdminDashboard