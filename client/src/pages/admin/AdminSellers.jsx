// import React, { useEffect, useState } from 'react'
// import {
//   Search,
//   Check,
//   X,
//   ShieldCheck,
//   ShieldOff,
//   Store,
//   Eye,
// } from 'lucide-react'
// import { Link } from 'react-router-dom'

// import AdminSidebar from '../../components/admin/AdminSidebar'
// import AdminHeader from '../../components/admin/AdminHeader'
// import {
//   getAllSellerApplications,
//   getAllSellerStores,
//   approveSeller,
//   rejectSeller,
//   setSellerStoreStatus,
//   setSellerVerification,
// } from '../../utils/adminStorage'

// function AdminSellers() {
//   const [mobileOpen, setMobileOpen] = useState(false)
//   const [applications, setApplications] = useState([])
//   const [stores, setStores] = useState([])
//   const [search, setSearch] = useState('')

//   const load = () => {
//     setApplications(getAllSellerApplications())
//     setStores(getAllSellerStores())
//   }

//   useEffect(() => {
//     load()
//   }, [])

//   const getStore = (sellerId) =>
//     stores.find(
//       (store) => store.sellerId === sellerId
//     )

//   const filtered = applications.filter((seller) =>
//     `${seller.name || ''} ${seller.email || ''} ${
//       seller.storeName || ''
//     }`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   )

//   const handleApprove = (id) => {
//     approveSeller(id)
//     load()
//   }

//   const handleReject = (id) => {
//     const reason = window.prompt(
//       'Enter rejection reason:'
//     )

//     if (reason === null) return

//     rejectSeller(id, reason)
//     load()
//   }

//   const handleVerify = (store) => {
//     setSellerVerification(
//       store.id,
//       !store.verified
//     )

//     load()
//   }

//   const handleStoreStatus = (store, status) => {
//     setSellerStoreStatus(store.id, status)
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
//           <div className="mb-6">
//             <h1 className="text-2xl font-bold text-gray-900">
//               Sellers
//             </h1>

//             <p className="mt-1 text-sm text-gray-500">
//               Review sellers, stores and verification.
//             </p>
//           </div>

//           <div className="mb-5 relative max-w-md">
//             <Search
//               size={18}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />

//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search sellers..."
//               className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-gray-400"
//             />
//           </div>

//           <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
//             <div className="overflow-x-auto">
//               <table className="min-w-[1100px] w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
//                       Seller
//                     </th>

//                     <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
//                       Store
//                     </th>

//                     <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
//                       Application
//                     </th>

//                     <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
//                       Store Status
//                     </th>

//                     <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
//                       Verification
//                     </th>

//                     <th className="px-5 py-4 text-right text-xs uppercase text-gray-500">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-gray-100">
//                   {filtered.map((seller) => {
//                     const store = getStore(
//                       seller.sellerId ||
//                         seller.userId ||
//                         seller.id
//                     )

//                     return (
//                       <tr key={seller.id}>
//                         <td className="px-5 py-4">
//                           <p className="font-semibold text-gray-900">
//                             {seller.name ||
//                               seller.fullName ||
//                               'Seller'}
//                           </p>

//                           <p className="text-xs text-gray-500">
//                             {seller.email || '—'}
//                           </p>
//                         </td>

//                         <td className="px-5 py-4">
//                           <div className="flex items-center gap-2">
//                             <Store size={17} className="text-gray-400" />

//                             <span className="text-sm text-gray-700">
//                               {seller.storeName ||
//                                 store?.storeName ||
//                                 '—'}
//                             </span>
//                           </div>
//                         </td>

//                         <td className="px-5 py-4">
//                           <StatusBadge
//                             status={seller.status}
//                           />
//                         </td>

//                         <td className="px-5 py-4">
//                           <StatusBadge
//                             status={
//                               store?.status ||
//                               'pending'
//                             }
//                           />
//                         </td>

//                         <td className="px-5 py-4">
//                           {store?.verified ? (
//                             <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
//                               <ShieldCheck size={14} />
//                               Verified
//                             </span>
//                           ) : (
//                             <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
//                               <ShieldOff size={14} />
//                               Unverified
//                             </span>
//                           )}
//                         </td>

//                         <td className="px-5 py-4">
//                           <div className="flex justify-end gap-2">
//                             <Link
//                               to={`/admin/sellers/${seller.id}`}
//                               className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
//                             >
//                               <Eye size={17} />
//                             </Link>

//                             {seller.status === 'pending' && (
//                               <>
//                                 <button
//                                   type="button"
//                                   onClick={() =>
//                                     handleApprove(
//                                       seller.id
//                                     )
//                                   }
//                                   className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
//                                   title="Approve"
//                                 >
//                                   <Check size={17} />
//                                 </button>

//                                 <button
//                                   type="button"
//                                   onClick={() =>
//                                     handleReject(
//                                       seller.id
//                                     )
//                                   }
//                                   className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
//                                   title="Reject"
//                                 >
//                                   <X size={17} />
//                                 </button>
//                               </>
//                             )}

//                             {store && (
//                               <>
//                                 <button
//                                   type="button"
//                                   onClick={() =>
//                                     handleVerify(store)
//                                   }
//                                   className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
//                                   title={
//                                     store.verified
//                                       ? 'Unverify'
//                                       : 'Verify'
//                                   }
//                                 >
//                                   {store.verified ? (
//                                     <ShieldOff size={17} />
//                                   ) : (
//                                     <ShieldCheck size={17} />
//                                   )}
//                                 </button>

//                                 <select
//                                   value={
//                                     store.status ||
//                                     'pending'
//                                   }
//                                   onChange={(e) =>
//                                     handleStoreStatus(
//                                       store,
//                                       e.target.value
//                                     )
//                                   }
//                                   className="rounded-lg border border-gray-200 px-2 text-xs outline-none"
//                                 >
//                                   <option value="pending">
//                                     Pending
//                                   </option>

//                                   <option value="approved">
//                                     Approved
//                                   </option>

//                                   <option value="suspended">
//                                     Suspended
//                                   </option>

//                                   <option value="rejected">
//                                     Rejected
//                                   </option>
//                                 </select>
//                               </>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     )
//                   })}
//                 </tbody>
//               </table>
//             </div>

//             {filtered.length === 0 && (
//               <div className="p-12 text-center text-sm text-gray-500">
//                 No sellers found.
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// function StatusBadge({ status }) {
//   const styles = {
//     pending: 'bg-yellow-50 text-yellow-700',
//     approved: 'bg-green-50 text-green-700',
//     rejected: 'bg-red-50 text-red-700',
//     suspended: 'bg-gray-100 text-gray-700',
//   }

//   return (
//     <span
//       className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
//         styles[status] ||
//         'bg-gray-100 text-gray-600'
//       }`}
//     >
//       {status || 'Unknown'}
//     </span>
//   )
// }

// export default AdminSellers

import React, { useEffect, useState } from 'react'
import {
  Search,
  Check,
  X,
  Store,
  Eye,
  RefreshCw,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'

const API_URL =
  'https://fegegta-server.onrender.com/api'

const getToken = () => {
  return localStorage.getItem('token')
}

function AdminSellers() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const [sellers, setSellers] = useState([])

  const [search, setSearch] = useState('')

  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [actionLoading, setActionLoading] =
    useState(null)

  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] =
    useState('')

  // ============================================================
  // LOAD SELLERS
  // ============================================================

  const loadSellers = async ({
    refresh = false,
  } = {}) => {
    try {
      if (refresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }

      setError('')

      const token = getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found. Please login again.'
        )
      }

      const response = await fetch(
        `${API_URL}/admin/sellers`,
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
            'Failed to load sellers.'
        )
      }

      if (data?.success === false) {
        throw new Error(
          data?.message ||
            'Failed to load sellers.'
        )
      }

      // Current backend:
      //
      // {
      //   success: true,
      //   sellers: [...]
      // }

      const sellerList =
        Array.isArray(data?.sellers)
          ? data.sellers
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.data?.sellers)
          ? data.data.sellers
          : []

      setSellers(sellerList)
    } catch (error) {
      console.error(
        'Load sellers error:',
        error
      )

      setError(
        error?.message ||
          'Something went wrong while loading sellers.'
      )
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    loadSellers()
  }, [])

  // ============================================================
  // APPROVE SELLER
  // ============================================================

  const handleApprove = async (seller) => {
    const sellerId = seller?._id

    if (!sellerId) {
      setError('Seller ID was not found.')
      return
    }

    try {
      setActionLoading(sellerId)
      setError('')
      setSuccessMessage('')

      const token = getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found. Please login again.'
        )
      }

      const response = await fetch(
        `${API_URL}/admin/sellers/${sellerId}/approve`,
        {
          method: 'PUT',
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
            'Failed to approve seller.'
        )
      }

      if (data?.success === false) {
        throw new Error(
          data?.message ||
            'Failed to approve seller.'
        )
      }

      setSuccessMessage(
        data?.message ||
          'Seller approved successfully.'
      )

      await loadSellers({ refresh: true })
    } catch (error) {
      console.error(
        'Approve seller error:',
        error
      )

      setError(
        error?.message ||
          'Failed to approve seller.'
      )
    } finally {
      setActionLoading(null)
    }
  }

  // ============================================================
  // REJECT SELLER
  // ============================================================

  const handleReject = async (seller) => {
    const sellerId = seller?._id

    if (!sellerId) {
      setError('Seller ID was not found.')
      return
    }

    const reason = window.prompt(
      'Enter rejection reason (optional):'
    )

    if (reason === null) {
      return
    }

    try {
      setActionLoading(sellerId)
      setError('')
      setSuccessMessage('')

      const token = getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found. Please login again.'
        )
      }

      const response = await fetch(
        `${API_URL}/admin/sellers/${sellerId}/reject`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reason: String(reason).trim(),
          }),
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
            'Failed to reject seller.'
        )
      }

      if (data?.success === false) {
        throw new Error(
          data?.message ||
            'Failed to reject seller.'
        )
      }

      setSuccessMessage(
        data?.message ||
          'Seller rejected successfully.'
      )

      await loadSellers({ refresh: true })
    } catch (error) {
      console.error(
        'Reject seller error:',
        error
      )

      setError(
        error?.message ||
          'Failed to reject seller.'
      )
    } finally {
      setActionLoading(null)
    }
  }

  // ============================================================
  // APPROVE STORE
  // ============================================================

  const handleApproveStore = async (seller) => {
    const storeId = seller?.store?._id

    if (!storeId) {
      setError('Store ID was not found.')
      return
    }

    try {
      setActionLoading(
        `store-${storeId}`
      )

      setError('')
      setSuccessMessage('')

      const token = getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found. Please login again.'
        )
      }

      const response = await fetch(
        `${API_URL}/admin/stores/${storeId}/approve`,
        {
          method: 'PUT',
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
            'Failed to approve store.'
        )
      }

      if (data?.success === false) {
        throw new Error(
          data?.message ||
            'Failed to approve store.'
        )
      }

      setSuccessMessage(
        data?.message ||
          'Store approved successfully.'
      )

      await loadSellers({ refresh: true })
    } catch (error) {
      console.error(
        'Approve store error:',
        error
      )

      setError(
        error?.message ||
          'Failed to approve store.'
      )
    } finally {
      setActionLoading(null)
    }
  }

  // ============================================================
  // SEARCH
  // ============================================================

  const filtered = sellers.filter(
    (seller) => {
      const sellerName =
        seller?.businessName ||
        seller?.user?.name ||
        [
          seller?.user?.firstName,
          seller?.user?.lastName,
        ]
          .filter(Boolean)
          .join(' ')

      const email =
        seller?.user?.email ||
        seller?.email ||
        ''

      const phone =
        seller?.user?.phone ||
        seller?.phone ||
        ''

      const storeName =
        seller?.store?.name ||
        ''

      const searchableText = `
        ${sellerName}
        ${email}
        ${phone}
        ${storeName}
      `.toLowerCase()

      return searchableText.includes(
        search.toLowerCase()
      )
    }
  )

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar
          mobileOpen={mobileOpen}
          onClose={() =>
            setMobileOpen(false)
          }
        />

        <div className="lg:pl-72">
          <AdminHeader
            onMenuClick={() =>
              setMobileOpen(true)
            }
          />

          <main className="flex min-h-[70vh] items-center justify-center p-6">
            <div className="text-center">
              <Loader2
                size={36}
                className="mx-auto animate-spin text-gray-400"
              />

              <p className="mt-4 text-sm text-gray-500">
                Loading sellers...
              </p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  // ============================================================
  // MAIN
  // ============================================================

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

          {/* ================================================== */}
          {/* HEADER */}
          {/* ================================================== */}

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Sellers
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Review sellers and their stores.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                loadSellers({
                  refresh: true,
                })
              }
              disabled={
                refreshing ||
                actionLoading !== null
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {refreshing ? (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <RefreshCw size={17} />
              )}

              {refreshing
                ? 'Refreshing...'
                : 'Refresh'}
            </button>
          </div>

          {/* ================================================== */}
          {/* SUCCESS */}
          {/* ================================================== */}

          {successMessage && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
              <Check
                size={19}
                className="mt-0.5 shrink-0 text-green-600"
              />

              <p className="text-sm font-medium text-green-800">
                {successMessage}
              </p>
            </div>
          )}

          {/* ================================================== */}
          {/* ERROR */}
          {/* ================================================== */}

          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <AlertCircle
                size={19}
                className="mt-0.5 shrink-0 text-red-600"
              />

              <p className="text-sm font-medium text-red-800">
                {error}
              </p>
            </div>
          )}

          {/* ================================================== */}
          {/* SEARCH */}
          {/* ================================================== */}

          <div className="relative mb-5 max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search sellers..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />
          </div>

          {/* ================================================== */}
          {/* TABLE */}
          {/* ================================================== */}

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-[1100px] w-full">
                <thead className="bg-gray-50">
                  <tr>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Seller
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Store
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Seller Status
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Store Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">

                  {filtered.map((seller) => {
                    const sellerId =
                      seller?._id

                    const sellerName =
                      seller?.businessName ||
                      seller?.user?.name ||
                      [
                        seller?.user?.firstName,
                        seller?.user?.lastName,
                      ]
                        .filter(Boolean)
                        .join(' ') ||
                      'Seller'

                    const email =
                      seller?.user?.email ||
                      seller?.email ||
                      '—'

                    const storeName =
                      seller?.store?.name ||
                      '—'

                    const sellerStatus =
                      seller?.status ||
                      'pending'

                    const storeStatus =
                      seller?.store?.status ||
                      'pending'

                    const storeId =
                      seller?.store?._id

                    const isActionLoading =
                      actionLoading ===
                        sellerId ||
                      actionLoading ===
                        `store-${storeId}`

                    return (
                      <tr
                        key={sellerId}
                        className="hover:bg-gray-50/70"
                      >

                        {/* SELLER */}

                        <td className="px-5 py-4">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {sellerName}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {email}
                            </p>
                          </div>
                        </td>

                        {/* STORE */}

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="rounded-lg bg-gray-100 p-2">
                              <Store
                                size={16}
                                className="text-gray-500"
                              />
                            </div>

                            <span className="text-sm text-gray-700">
                              {storeName}
                            </span>
                          </div>
                        </td>

                        {/* SELLER STATUS */}

                        <td className="px-5 py-4">
                          <StatusBadge
                            status={sellerStatus}
                          />
                        </td>

                        {/* STORE STATUS */}

                        <td className="px-5 py-4">
                          <StatusBadge
                            status={storeStatus}
                          />
                        </td>

                        {/* ACTIONS */}

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">

                            {/* VIEW */}

                            <Link
                              to={`/admin/sellers/${sellerId}`}
                              className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50"
                              title="View seller"
                            >
                              <Eye size={17} />
                            </Link>

                            {/* APPROVE SELLER */}

                            {sellerStatus !==
                              'approved' && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleApprove(
                                    seller
                                  )
                                }
                                disabled={
                                  isActionLoading
                                }
                                className="rounded-lg bg-green-600 p-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                title="Approve seller"
                              >
                                {actionLoading ===
                                sellerId ? (
                                  <Loader2
                                    size={17}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <Check size={17} />
                                )}
                              </button>
                            )}

                            {/* REJECT SELLER */}

                            {sellerStatus !==
                              'rejected' && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleReject(
                                    seller
                                  )
                                }
                                disabled={
                                  isActionLoading
                                }
                                className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                title="Reject seller"
                              >
                                {actionLoading ===
                                sellerId ? (
                                  <Loader2
                                    size={17}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <X size={17} />
                                )}
                              </button>
                            )}

                            {/* APPROVE STORE */}

                            {seller?.store &&
                              storeStatus !==
                                'approved' &&
                              storeStatus !==
                                'active' && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleApproveStore(
                                      seller
                                    )
                                  }
                                  disabled={
                                    isActionLoading
                                  }
                                  className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                  title="Approve store"
                                >
                                  {actionLoading ===
                                  `store-${storeId}` ? (
                                    <Loader2
                                      size={17}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <Store
                                      size={17}
                                    />
                                  )}
                                </button>
                              )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}

                </tbody>
              </table>
            </div>

            {/* EMPTY */}

            {filtered.length === 0 && (
              <div className="p-12 text-center">
                <Store
                  size={38}
                  className="mx-auto text-gray-300"
                />

                <p className="mt-4 text-sm font-medium text-gray-600">
                  No sellers found.
                </p>

                {search && (
                  <p className="mt-1 text-xs text-gray-400">
                    Try a different search term.
                  </p>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

// ============================================================
// STATUS BADGE
// ============================================================

function StatusBadge({ status }) {
  const normalized =
    String(status || 'unknown')
      .toLowerCase()

  const styles = {
    pending:
      'bg-yellow-50 text-yellow-700',

    approved:
      'bg-green-50 text-green-700',

    active:
      'bg-green-50 text-green-700',

    rejected:
      'bg-red-50 text-red-700',

    suspended:
      'bg-gray-100 text-gray-700',

    unknown:
      'bg-gray-100 text-gray-600',
  }

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
        styles[normalized] ||
        styles.unknown
      }`}
    >
      {normalized}
    </span>
  )
}

export default AdminSellers