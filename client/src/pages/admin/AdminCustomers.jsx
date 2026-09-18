// import React, { useEffect, useState } from 'react'
// import {
//   Search,
//   Users,
//   Mail,
// } from 'lucide-react'

// import AdminSidebar from '../../components/admin/AdminSidebar'
// import AdminHeader from '../../components/admin/AdminHeader'
// import { getAllCustomers } from '../../utils/adminStorage'

// function AdminCustomers() {
//   const [mobileOpen, setMobileOpen] = useState(false)
//   const [customers, setCustomers] = useState([])
//   const [search, setSearch] = useState('')

//   useEffect(() => {
//     setCustomers(getAllCustomers())
//   }, [])

//   const filtered = customers.filter((customer) =>
//     `${customer.name || ''} ${
//       customer.email || ''
//     } ${customer.phone || ''}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   )

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
//           <div className="mb-6">
//             <h1 className="text-2xl font-bold text-gray-900">
//               Customers
//             </h1>

//             <p className="mt-1 text-sm text-gray-500">
//               Manage registered Fegegta customers.
//             </p>
//           </div>

//           <div className="mb-5 relative max-w-md">
//             <Search
//               size={18}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />

//             <input
//               value={search}
//               onChange={(e) =>
//                 setSearch(e.target.value)
//               }
//               placeholder="Search customers..."
//               className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none"
//             />
//           </div>

//           <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
//             {filtered.length === 0 ? (
//               <div className="p-12 text-center">
//                 <Users
//                   size={40}
//                   className="mx-auto text-gray-300"
//                 />

//                 <p className="mt-4 text-sm text-gray-500">
//                   No customers found.
//                 </p>
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="min-w-[800px] w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
//                         Customer
//                       </th>

//                       <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
//                         Email
//                       </th>

//                       <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
//                         Phone
//                       </th>

//                       <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
//                         Registered
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y divide-gray-100">
//                     {filtered.map((customer) => (
//                       <tr key={customer.id}>
//                         <td className="px-5 py-4">
//                           <p className="font-semibold text-gray-900">
//                             {customer.name ||
//                               customer.fullName ||
//                               'Customer'}
//                           </p>
//                         </td>

//                         <td className="px-5 py-4">
//                           <div className="flex items-center gap-2 text-sm text-gray-600">
//                             <Mail size={15} />
//                             {customer.email || '—'}
//                           </div>
//                         </td>

//                         <td className="px-5 py-4 text-sm text-gray-600">
//                           {customer.phone || '—'}
//                         </td>

//                         <td className="px-5 py-4 text-sm text-gray-500">
//                           {formatDate(
//                             customer.createdAt ||
//                               customer.registeredAt
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// function formatDate(date) {
//   if (!date) return '—'

//   return new Date(date).toLocaleDateString()
// }

// export default AdminCustomers

import React, { useEffect, useMemo, useState } from 'react'
import {
  Search,
  Users,
  Mail,
  Phone,
  Calendar,
  RefreshCw,
} from 'lucide-react'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'

// ============================================================
// API
// ============================================================

const API_URL =
  'https://fegegta-server.onrender.com/api'

// ============================================================
// ADMIN CUSTOMERS
// ============================================================

function AdminCustomers() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const [customers, setCustomers] = useState([])

  const [search, setSearch] = useState('')

  const [loading, setLoading] = useState(true)

  const [refreshing, setRefreshing] = useState(false)

  const [error, setError] = useState('')

  // ==========================================================
  // GET TOKEN
  // ==========================================================

  const getToken = () => {
    return localStorage.getItem('token')
  }

  // ==========================================================
  // LOAD CUSTOMERS FROM BACKEND
  // ==========================================================

  const loadCustomers = async (isRefresh = false) => {
    try {
      setError('')

      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }

      const token = getToken()

      if (!token) {
        setError(
          'Authentication token not found. Please login again.'
        )
        return
      }

      const response = await fetch(
        `${API_URL}/admin/users`,
        {
          method: 'GET',

          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data?.message ||
            'Failed to load customers.'
        )
      }

      if (!data?.success) {
        throw new Error(
          data?.message ||
            'Failed to load customers.'
        )
      }

      // ======================================================
      // BACKEND RETURNS ALL USERS
      // WE ONLY NEED CUSTOMERS
      // ======================================================

      const customerUsers =
        Array.isArray(data.users)
          ? data.users.filter(
              (user) =>
                user.role === 'customer'
            )
          : []

      setCustomers(customerUsers)
    } catch (error) {
      console.error(
        'Load customers error:',
        error
      )

      setError(
        error.message ||
          'Something went wrong while loading customers.'
      )

      setCustomers([])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    loadCustomers()
  }, [])

  // ==========================================================
  // CUSTOMER NAME
  // ==========================================================

  const getCustomerName = (customer) => {
    if (customer.name) {
      return customer.name
    }

    const fullName =
      `${customer.firstName || ''} ${
        customer.lastName || ''
      }`.trim()

    return fullName || 'Customer'
  }

  // ==========================================================
  // FILTER
  // ==========================================================

  const filtered = useMemo(() => {
    const query =
      search.trim().toLowerCase()

    if (!query) {
      return customers
    }

    return customers.filter(
      (customer) => {
        const name =
          getCustomerName(
            customer
          )

        const email =
          customer.email || ''

        const phone =
          customer.phone || ''

        return `${name} ${email} ${phone}`
          .toLowerCase()
          .includes(query)
      }
    )
  }, [customers, search])

  // ==========================================================
  // FORMAT DATE
  // ==========================================================

  const formatDate = (date) => {
    if (!date) {
      return '—'
    }

    const parsedDate =
      new Date(date)

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return '—'
    }

    return parsedDate.toLocaleDateString(
      undefined,
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
    )
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <AdminSidebar
        mobileOpen={mobileOpen}
        onClose={() =>
          setMobileOpen(false)
        }
      />

      {/* ======================================================
          MAIN
      ====================================================== */}

      <div className="lg:pl-72">
        {/* ====================================================
            HEADER
        ==================================================== */}

        <AdminHeader
          onMenuClick={() =>
            setMobileOpen(true)
          }
        />

        {/* ====================================================
            PAGE CONTENT
        ==================================================== */}

        <main className="p-4 sm:p-6 lg:p-8">
          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Customers
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage registered Fegegta customers.
              </p>
            </div>

            {/* ==================================================
                REFRESH
            ================================================== */}

            <button
              type="button"
              onClick={() =>
                loadCustomers(true)
              }
              disabled={
                loading ||
                refreshing
              }
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
              CUSTOMER COUNT
          ================================================== */}

          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Customers
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {customers.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
                <Users
                  size={21}
                  className="text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* ==================================================
              SEARCH
          ================================================== */}

          <div className="relative mb-5 max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search customers..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />
          </div>

          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (
            <div className="mb-5 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-red-700">
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  loadCustomers()
                }
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* ==================================================
              TABLE
          ================================================== */}

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {loading ? (
              /* =================================================
                 LOADING
              ================================================= */

              <div className="p-12 text-center">
                <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-gray-800" />

                <p className="mt-4 text-sm text-gray-500">
                  Loading customers...
                </p>
              </div>
            ) : filtered.length === 0 ? (
              /* =================================================
                 EMPTY
              ================================================= */

              <div className="p-12 text-center">
                <Users
                  size={40}
                  className="mx-auto text-gray-300"
                />

                <p className="mt-4 text-sm text-gray-500">
                  {search
                    ? 'No customers match your search.'
                    : 'No customers found.'}
                </p>

                {search && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearch('')
                    }
                    className="mt-3 text-sm font-medium text-gray-700 underline underline-offset-2"
                  >
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-[900px] w-full">
                  {/* ============================================
                      TABLE HEADER
                  ============================================ */}

                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Customer
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Email
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Phone
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Status
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Registered
                      </th>
                    </tr>
                  </thead>

                  {/* ============================================
                      TABLE BODY
                  ============================================ */}

                  <tbody className="divide-y divide-gray-100">
                    {filtered.map(
                      (customer) => (
                        <tr
                          key={
                            customer._id ||
                            customer.id
                          }
                          className="transition hover:bg-gray-50"
                        >
                          {/* ====================================
                              CUSTOMER
                          ==================================== */}

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                                <Users
                                  size={18}
                                  className="text-gray-500"
                                />
                              </div>

                              <div>
                                <p className="font-semibold text-gray-900">
                                  {getCustomerName(
                                    customer
                                  )}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* ====================================
                              EMAIL
                          ==================================== */}

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail
                                size={15}
                                className="shrink-0 text-gray-400"
                              />

                              <span>
                                {customer.email ||
                                  '—'}
                              </span>
                            </div>
                          </td>

                          {/* ====================================
                              PHONE
                          ==================================== */}

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone
                                size={15}
                                className="shrink-0 text-gray-400"
                              />

                              <span>
                                {customer.phone ||
                                  '—'}
                              </span>
                            </div>
                          </td>

                          {/* ====================================
                              STATUS
                          ==================================== */}

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                customer.status ===
                                'active'
                                  ? 'bg-green-100 text-green-700'
                                  : customer.status ===
                                      'blocked'
                                    ? 'bg-red-100 text-red-700'
                                    : customer.status ===
                                        'suspended'
                                      ? 'bg-yellow-100 text-yellow-700'
                                      : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {customer.status ||
                                'active'}
                            </span>
                          </td>

                          {/* ====================================
                              REGISTERED
                          ==================================== */}

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Calendar
                                size={15}
                                className="shrink-0 text-gray-400"
                              />

                              <span>
                                {formatDate(
                                  customer.createdAt ||
                                    customer.registeredAt
                                )}
                              </span>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* ==================================================
              RESULT COUNT
          ================================================== */}

          {!loading &&
            customers.length > 0 && (
              <div className="mt-4 text-sm text-gray-500">
                Showing{' '}
                <span className="font-medium text-gray-700">
                  {filtered.length}
                </span>{' '}
                of{' '}
                <span className="font-medium text-gray-700">
                  {customers.length}
                </span>{' '}
                customers
              </div>
            )}
        </main>
      </div>
    </div>
  )
}

export default AdminCustomers