
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
  RefreshCw,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import AdminStatCard from '../../components/admin/AdminStatCard'

// ============================================================
// FEGEGTA BACKEND API
// ============================================================

const API_URL =
  'https://fegegta-server.onrender.com/api'

// ============================================================
// FORMAT CURRENCY
// ============================================================

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(Number(value || 0))
}

// ============================================================
// ADMIN DASHBOARD
// ============================================================

function AdminDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false)

  // ==========================================================
  // DASHBOARD STATISTICS
  // ==========================================================

  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalSellers: 0,
    totalProducts: 0,
    pendingSellerApplications: 0,
    pendingProducts: 0,
    commission: 0,
    sellerEarnings: 0,
  })

  // ==========================================================
  // NOTIFICATIONS
  // ==========================================================

  const [notifications, setNotifications] = useState([])

  // ==========================================================
  // LOADING / ERROR
  // ==========================================================

  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')

  // ==========================================================
  // GET AUTH TOKEN
  // ==========================================================

  const getToken = () => {
    return localStorage.getItem('token')
  }

  // ==========================================================
  // LOAD DASHBOARD DATA
  // ==========================================================

  const loadDashboard = async (isRefresh = false) => {
    try {
      setError('')

      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }

      // --------------------------------------------------------
      // GET ADMIN TOKEN
      // --------------------------------------------------------

      const token = getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found. Please login again.'
        )
      }

      // ========================================================
      // 1. GET DASHBOARD STATISTICS
      // ========================================================

      const dashboardResponse = await fetch(
        `${API_URL}/admin/dashboard`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      const dashboardData =
        await dashboardResponse.json()

      if (!dashboardResponse.ok) {
        throw new Error(
          dashboardData?.message ||
            'Failed to load dashboard statistics.'
        )
      }

      if (!dashboardData?.success) {
        throw new Error(
          dashboardData?.message ||
            'Failed to load dashboard statistics.'
        )
      }

      // --------------------------------------------------------
      // SUPPORT DIFFERENT BACKEND RESPONSE STRUCTURES
      // --------------------------------------------------------

      const dashboardStats =
        dashboardData?.stats ||
        dashboardData?.data ||
        dashboardData

      // --------------------------------------------------------
      // SAVE STATISTICS
      // --------------------------------------------------------

      setStats({
        totalSales:
          Number(
            dashboardStats?.totalSales || 0
          ),

        totalOrders:
          Number(
            dashboardStats?.totalOrders || 0
          ),

        totalCustomers:
          Number(
            dashboardStats?.totalCustomers || 0
          ),

        totalSellers:
          Number(
            dashboardStats?.totalSellers || 0
          ),

        totalProducts:
          Number(
            dashboardStats?.totalProducts || 0
          ),

        pendingSellerApplications:
          Number(
            dashboardStats?.pendingSellerApplications || 0
          ),

        pendingProducts:
          Number(
            dashboardStats?.pendingProducts || 0
          ),

        commission:
          Number(
            dashboardStats?.commission || 0
          ),

        sellerEarnings:
          Number(
            dashboardStats?.sellerEarnings || 0
          ),
      })

      // ========================================================
      // 2. GET ADMIN NOTIFICATIONS
      // ========================================================

      const notificationsResponse =
        await fetch(
          `${API_URL}/admin/notifications`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

      const notificationsData =
        await notificationsResponse.json()

      if (!notificationsResponse.ok) {
        throw new Error(
          notificationsData?.message ||
            'Failed to load notifications.'
        )
      }

      if (!notificationsData?.success) {
        throw new Error(
          notificationsData?.message ||
            'Failed to load notifications.'
        )
      }

      // --------------------------------------------------------
      // SUPPORT DIFFERENT NOTIFICATION RESPONSE STRUCTURES
      // --------------------------------------------------------

      const backendNotifications =
        Array.isArray(
          notificationsData?.notifications
        )
          ? notificationsData.notifications
          : Array.isArray(
                notificationsData?.data
              )
            ? notificationsData.data
            : []

      // Show only latest 5
      setNotifications(
        backendNotifications.slice(0, 5)
      )
    } catch (error) {
      console.error(
        'Admin dashboard error:',
        error
      )

      setError(
        error?.message ||
          'Something went wrong while loading the dashboard.'
      )
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // ============================================================
  // LOAD WHEN PAGE OPENS
  // ============================================================

  useEffect(() => {
    loadDashboard()
  }, [])

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <AdminSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="lg:pl-72">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <AdminHeader
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8">

          {/* ==================================================
              PAGE HEADER
          ================================================== */}

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Welcome back. Here is what is happening on Fegegta.
              </p>
            </div>

            {/* REFRESH BUTTON */}

            <button
              type="button"
              onClick={() => loadDashboard(true)}
              disabled={loading || refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={17}
                className={
                  refreshing
                    ? 'animate-spin'
                    : ''
                }
              />

              {refreshing
                ? 'Refreshing...'
                : 'Refresh'}
            </button>
          </div>

          {/* ==================================================
              ERROR MESSAGE
          ================================================== */}

          {error && (
            <div className="mb-6 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-sm text-red-700">
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  loadDashboard()
                }
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* ==================================================
              FIRST STAT ROW
          ================================================== */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <AdminStatCard
              title="Total Sales"
              value={
                loading
                  ? '...'
                  : formatCurrency(
                      stats.totalSales
                    )
              }
              subtitle="Completed sales"
              icon={DollarSign}
            />

            <AdminStatCard
              title="Total Orders"
              value={
                loading
                  ? '...'
                  : stats.totalOrders
              }
              subtitle="All platform orders"
              icon={ShoppingCart}
            />

            <AdminStatCard
              title="Customers"
              value={
                loading
                  ? '...'
                  : stats.totalCustomers
              }
              subtitle="Registered customers"
              icon={Users}
            />

            <AdminStatCard
              title="Sellers"
              value={
                loading
                  ? '...'
                  : stats.totalSellers
              }
              subtitle="Approved sellers"
              icon={Store}
            />
          </div>

          {/* ==================================================
              SECOND STAT ROW
          ================================================== */}

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <AdminStatCard
              title="Products"
              value={
                loading
                  ? '...'
                  : stats.totalProducts
              }
              subtitle="Admin + seller products"
              icon={Package}
            />

            <AdminStatCard
              title="Pending Sellers"
              value={
                loading
                  ? '...'
                  : stats.pendingSellerApplications
              }
              subtitle="Waiting for review"
              icon={Clock}
            />

            <AdminStatCard
              title="Pending Products"
              value={
                loading
                  ? '...'
                  : stats.pendingProducts
              }
              subtitle="Waiting for approval"
              icon={AlertCircle}
            />

            <AdminStatCard
              title="Commission"
              value={
                loading
                  ? '...'
                  : formatCurrency(
                      stats.commission
                    )
              }
              subtitle="Platform commission"
              icon={CheckCircle}
            />
          </div>

          {/* ==================================================
              QUICK ACTIONS + NOTIFICATIONS
          ================================================== */}

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

            {/* =================================================
                QUICK ACTIONS
            ================================================= */}

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

            {/* =================================================
                NOTIFICATIONS
            ================================================= */}

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

                {/* LOADING */}

                {loading ? (
                  <div className="rounded-xl bg-gray-50 p-5 text-center">

                    <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-gray-800" />

                    <p className="mt-3 text-sm text-gray-500">
                      Loading notifications...
                    </p>
                  </div>

                ) : notifications.length === 0 ? (

                  /* EMPTY */

                  <div className="rounded-xl bg-gray-50 p-5 text-center text-sm text-gray-500">
                    No notifications yet.
                  </div>

                ) : (

                  /* NOTIFICATION LIST */

                  notifications.map(
                    (notification) => (
                      <div
                        key={
                          notification._id ||
                          notification.id
                        }
                        className="rounded-xl border border-gray-100 p-4"
                      >
                        <p className="text-sm font-semibold text-gray-900">
                          {notification.title ||
                            'Notification'}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {notification.message ||
                            ''}
                        </p>
                      </div>
                    )
                  )
                )}

              </div>
            </section>
          </div>

          {/* ==================================================
              SELLER EARNINGS OVERVIEW
          ================================================== */}

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
                value={
                  loading
                    ? '...'
                    : formatCurrency(
                        stats.totalSales
                      )
                }
              />

              <MiniValue
                label="Platform Commission"
                value={
                  loading
                    ? '...'
                    : formatCurrency(
                        stats.commission
                      )
                }
              />

              <MiniValue
                label="Seller Earnings"
                value={
                  loading
                    ? '...'
                    : formatCurrency(
                        stats.sellerEarnings
                      )
                }
              />

            </div>
          </section>

        </main>
      </div>
    </div>
  )
}

// ============================================================
// QUICK ACTION COMPONENT
// ============================================================

function QuickAction({
  to,
  title,
  description,
}) {
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

// ============================================================
// MINI VALUE COMPONENT
// ============================================================

function MiniValue({
  label,
  value,
}) {
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

