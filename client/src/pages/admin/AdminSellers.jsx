

// import React, { useEffect, useState } from 'react'
// import {
//   Search,
//   Check,
//   X,
//   Store,
//   Eye,
//   RefreshCw,
//   Loader2,
//   AlertCircle,
// } from 'lucide-react'
// import { Link } from 'react-router-dom'

// import AdminSidebar from '../../components/admin/AdminSidebar'
// import AdminHeader from '../../components/admin/AdminHeader'

// const API_URL =
//   'https://fegegta-server.onrender.com/api'

// const getToken = () => {
//   return localStorage.getItem('token')
// }

// function AdminSellers() {
//   const [mobileOpen, setMobileOpen] = useState(false)

//   const [sellers, setSellers] = useState([])

//   const [search, setSearch] = useState('')

//   const [loading, setLoading] = useState(true)
//   const [refreshing, setRefreshing] = useState(false)
//   const [actionLoading, setActionLoading] =
//     useState(null)

//   const [error, setError] = useState('')
//   const [successMessage, setSuccessMessage] =
//     useState('')

//   // ============================================================
//   // LOAD SELLERS
//   // ============================================================

//   const loadSellers = async ({
//     refresh = false,
//   } = {}) => {
//     try {
//       if (refresh) {
//         setRefreshing(true)
//       } else {
//         setLoading(true)
//       }

//       setError('')

//       const token = getToken()

//       if (!token) {
//         throw new Error(
//           'Authentication token not found. Please login again.'
//         )
//       }

//       const response = await fetch(
//         `${API_URL}/admin/sellers`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       )

//       let data = {}

//       try {
//         data = await response.json()
//       } catch {
//         data = {}
//       }

//       if (!response.ok) {
//         throw new Error(
//           data?.message ||
//             'Failed to load sellers.'
//         )
//       }

//       if (data?.success === false) {
//         throw new Error(
//           data?.message ||
//             'Failed to load sellers.'
//         )
//       }

//       // Current backend:
//       //
//       // {
//       //   success: true,
//       //   sellers: [...]
//       // }

//       const sellerList =
//         Array.isArray(data?.sellers)
//           ? data.sellers
//           : Array.isArray(data?.data)
//           ? data.data
//           : Array.isArray(data?.data?.sellers)
//           ? data.data.sellers
//           : []

//       setSellers(sellerList)
//     } catch (error) {
//       console.error(
//         'Load sellers error:',
//         error
//       )

//       setError(
//         error?.message ||
//           'Something went wrong while loading sellers.'
//       )
//     } finally {
//       setLoading(false)
//       setRefreshing(false)
//     }
//   }

//   // ============================================================
//   // INITIAL LOAD
//   // ============================================================

//   useEffect(() => {
//     loadSellers()
//   }, [])

//   // ============================================================
//   // APPROVE SELLER
//   // ============================================================

//   const handleApprove = async (seller) => {
//     const sellerId = seller?._id

//     if (!sellerId) {
//       setError('Seller ID was not found.')
//       return
//     }

//     try {
//       setActionLoading(sellerId)
//       setError('')
//       setSuccessMessage('')

//       const token = getToken()

//       if (!token) {
//         throw new Error(
//           'Authentication token not found. Please login again.'
//         )
//       }

//       const response = await fetch(
//         `${API_URL}/admin/sellers/${sellerId}/approve`,
//         {
//           method: 'PUT',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       )

//       let data = {}

//       try {
//         data = await response.json()
//       } catch {
//         data = {}
//       }

//       if (!response.ok) {
//         throw new Error(
//           data?.message ||
//             'Failed to approve seller.'
//         )
//       }

//       if (data?.success === false) {
//         throw new Error(
//           data?.message ||
//             'Failed to approve seller.'
//         )
//       }

//       setSuccessMessage(
//         data?.message ||
//           'Seller approved successfully.'
//       )

//       await loadSellers({ refresh: true })
//     } catch (error) {
//       console.error(
//         'Approve seller error:',
//         error
//       )

//       setError(
//         error?.message ||
//           'Failed to approve seller.'
//       )
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   // ============================================================
//   // REJECT SELLER
//   // ============================================================

//   const handleReject = async (seller) => {
//     const sellerId = seller?._id

//     if (!sellerId) {
//       setError('Seller ID was not found.')
//       return
//     }

//     const reason = window.prompt(
//       'Enter rejection reason (optional):'
//     )

//     if (reason === null) {
//       return
//     }

//     try {
//       setActionLoading(sellerId)
//       setError('')
//       setSuccessMessage('')

//       const token = getToken()

//       if (!token) {
//         throw new Error(
//           'Authentication token not found. Please login again.'
//         )
//       }

//       const response = await fetch(
//         `${API_URL}/admin/sellers/${sellerId}/reject`,
//         {
//           method: 'PUT',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             reason: String(reason).trim(),
//           }),
//         }
//       )

//       let data = {}

//       try {
//         data = await response.json()
//       } catch {
//         data = {}
//       }

//       if (!response.ok) {
//         throw new Error(
//           data?.message ||
//             'Failed to reject seller.'
//         )
//       }

//       if (data?.success === false) {
//         throw new Error(
//           data?.message ||
//             'Failed to reject seller.'
//         )
//       }

//       setSuccessMessage(
//         data?.message ||
//           'Seller rejected successfully.'
//       )

//       await loadSellers({ refresh: true })
//     } catch (error) {
//       console.error(
//         'Reject seller error:',
//         error
//       )

//       setError(
//         error?.message ||
//           'Failed to reject seller.'
//       )
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   // ============================================================
//   // APPROVE STORE
//   // ============================================================

//   const handleApproveStore = async (seller) => {
//     const storeId = seller?.store?._id

//     if (!storeId) {
//       setError('Store ID was not found.')
//       return
//     }

//     try {
//       setActionLoading(
//         `store-${storeId}`
//       )

//       setError('')
//       setSuccessMessage('')

//       const token = getToken()

//       if (!token) {
//         throw new Error(
//           'Authentication token not found. Please login again.'
//         )
//       }

//       const response = await fetch(
//         `${API_URL}/admin/stores/${storeId}/approve`,
//         {
//           method: 'PUT',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       )

//       let data = {}

//       try {
//         data = await response.json()
//       } catch {
//         data = {}
//       }

//       if (!response.ok) {
//         throw new Error(
//           data?.message ||
//             'Failed to approve store.'
//         )
//       }

//       if (data?.success === false) {
//         throw new Error(
//           data?.message ||
//             'Failed to approve store.'
//         )
//       }

//       setSuccessMessage(
//         data?.message ||
//           'Store approved successfully.'
//       )

//       await loadSellers({ refresh: true })
//     } catch (error) {
//       console.error(
//         'Approve store error:',
//         error
//       )

//       setError(
//         error?.message ||
//           'Failed to approve store.'
//       )
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   // ============================================================
//   // SEARCH
//   // ============================================================

//   const filtered = sellers.filter(
//     (seller) => {
//       const sellerName =
//         seller?.businessName ||
//         seller?.user?.name ||
//         [
//           seller?.user?.firstName,
//           seller?.user?.lastName,
//         ]
//           .filter(Boolean)
//           .join(' ')

//       const email =
//         seller?.user?.email ||
//         seller?.email ||
//         ''

//       const phone =
//         seller?.user?.phone ||
//         seller?.phone ||
//         ''

//       const storeName =
//         seller?.store?.name ||
//         ''

//       const searchableText = `
//         ${sellerName}
//         ${email}
//         ${phone}
//         ${storeName}
//       `.toLowerCase()

//       return searchableText.includes(
//         search.toLowerCase()
//       )
//     }
//   )

//   // ============================================================
//   // LOADING
//   // ============================================================

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <AdminSidebar
//           mobileOpen={mobileOpen}
//           onClose={() =>
//             setMobileOpen(false)
//           }
//         />

//         <div className="lg:pl-72">
//           <AdminHeader
//             onMenuClick={() =>
//               setMobileOpen(true)
//             }
//           />

//           <main className="flex min-h-[70vh] items-center justify-center p-6">
//             <div className="text-center">
//               <Loader2
//                 size={36}
//                 className="mx-auto animate-spin text-gray-400"
//               />

//               <p className="mt-4 text-sm text-gray-500">
//                 Loading sellers...
//               </p>
//             </div>
//           </main>
//         </div>
//       </div>
//     )
//   }

//   // ============================================================
//   // MAIN
//   // ============================================================

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

//           {/* ================================================== */}
//           {/* HEADER */}
//           {/* ================================================== */}

//           <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 Sellers
//               </h1>

//               <p className="mt-1 text-sm text-gray-500">
//                 Review sellers and their stores.
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={() =>
//                 loadSellers({
//                   refresh: true,
//                 })
//               }
//               disabled={
//                 refreshing ||
//                 actionLoading !== null
//               }
//               className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {refreshing ? (
//                 <Loader2
//                   size={17}
//                   className="animate-spin"
//                 />
//               ) : (
//                 <RefreshCw size={17} />
//               )}

//               {refreshing
//                 ? 'Refreshing...'
//                 : 'Refresh'}
//             </button>
//           </div>

//           {/* ================================================== */}
//           {/* SUCCESS */}
//           {/* ================================================== */}

//           {successMessage && (
//             <div className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
//               <Check
//                 size={19}
//                 className="mt-0.5 shrink-0 text-green-600"
//               />

//               <p className="text-sm font-medium text-green-800">
//                 {successMessage}
//               </p>
//             </div>
//           )}

//           {/* ================================================== */}
//           {/* ERROR */}
//           {/* ================================================== */}

//           {error && (
//             <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
//               <AlertCircle
//                 size={19}
//                 className="mt-0.5 shrink-0 text-red-600"
//               />

//               <p className="text-sm font-medium text-red-800">
//                 {error}
//               </p>
//             </div>
//           )}

//           {/* ================================================== */}
//           {/* SEARCH */}
//           {/* ================================================== */}

//           <div className="relative mb-5 max-w-md">
//             <Search
//               size={18}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />

//             <input
//               value={search}
//               onChange={(e) =>
//                 setSearch(e.target.value)
//               }
//               placeholder="Search sellers..."
//               className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
//             />
//           </div>

//           {/* ================================================== */}
//           {/* TABLE */}
//           {/* ================================================== */}

//           <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
//             <div className="overflow-x-auto">
//               <table className="min-w-[1100px] w-full">
//                 <thead className="bg-gray-50">
//                   <tr>

//                     <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
//                       Seller
//                     </th>

//                     <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
//                       Store
//                     </th>

//                     <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
//                       Seller Status
//                     </th>

//                     <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
//                       Store Status
//                     </th>

//                     <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
//                       Actions
//                     </th>

//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-gray-100">

//                   {filtered.map((seller) => {
//                     const sellerId =
//                       seller?._id

//                     const sellerName =
//                       seller?.businessName ||
//                       seller?.user?.name ||
//                       [
//                         seller?.user?.firstName,
//                         seller?.user?.lastName,
//                       ]
//                         .filter(Boolean)
//                         .join(' ') ||
//                       'Seller'

//                     const email =
//                       seller?.user?.email ||
//                       seller?.email ||
//                       '—'

//                     const storeName =
//                       seller?.store?.name ||
//                       '—'

//                     const sellerStatus =
//                       seller?.status ||
//                       'pending'

//                     const storeStatus =
//                       seller?.store?.status ||
//                       'pending'

//                     const storeId =
//                       seller?.store?._id

//                     const isActionLoading =
//                       actionLoading ===
//                         sellerId ||
//                       actionLoading ===
//                         `store-${storeId}`

//                     return (
//                       <tr
//                         key={sellerId}
//                         className="hover:bg-gray-50/70"
//                       >

//                         {/* SELLER */}

//                         <td className="px-5 py-4">
//                           <div>
//                             <p className="font-semibold text-gray-900">
//                               {sellerName}
//                             </p>

//                             <p className="mt-1 text-xs text-gray-500">
//                               {email}
//                             </p>
//                           </div>
//                         </td>

//                         {/* STORE */}

//                         <td className="px-5 py-4">
//                           <div className="flex items-center gap-2">
//                             <div className="rounded-lg bg-gray-100 p-2">
//                               <Store
//                                 size={16}
//                                 className="text-gray-500"
//                               />
//                             </div>

//                             <span className="text-sm text-gray-700">
//                               {storeName}
//                             </span>
//                           </div>
//                         </td>

//                         {/* SELLER STATUS */}

//                         <td className="px-5 py-4">
//                           <StatusBadge
//                             status={sellerStatus}
//                           />
//                         </td>

//                         {/* STORE STATUS */}

//                         <td className="px-5 py-4">
//                           <StatusBadge
//                             status={storeStatus}
//                           />
//                         </td>

//                         {/* ACTIONS */}

//                         <td className="px-5 py-4">
//                           <div className="flex justify-end gap-2">

//                             {/* VIEW */}

//                             <Link
//                               to={`/admin/sellers/${sellerId}`}
//                               className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50"
//                               title="View seller"
//                             >
//                               <Eye size={17} />
//                             </Link>

//                             {/* APPROVE SELLER */}

//                             {sellerStatus !==
//                               'approved' && (
//                               <button
//                                 type="button"
//                                 onClick={() =>
//                                   handleApprove(
//                                     seller
//                                   )
//                                 }
//                                 disabled={
//                                   isActionLoading
//                                 }
//                                 className="rounded-lg bg-green-600 p-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
//                                 title="Approve seller"
//                               >
//                                 {actionLoading ===
//                                 sellerId ? (
//                                   <Loader2
//                                     size={17}
//                                     className="animate-spin"
//                                   />
//                                 ) : (
//                                   <Check size={17} />
//                                 )}
//                               </button>
//                             )}

//                             {/* REJECT SELLER */}

//                             {sellerStatus !==
//                               'rejected' && (
//                               <button
//                                 type="button"
//                                 onClick={() =>
//                                   handleReject(
//                                     seller
//                                   )
//                                 }
//                                 disabled={
//                                   isActionLoading
//                                 }
//                                 className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                                 title="Reject seller"
//                               >
//                                 {actionLoading ===
//                                 sellerId ? (
//                                   <Loader2
//                                     size={17}
//                                     className="animate-spin"
//                                   />
//                                 ) : (
//                                   <X size={17} />
//                                 )}
//                               </button>
//                             )}

//                             {/* APPROVE STORE */}

//                             {seller?.store &&
//                               storeStatus !==
//                                 'approved' &&
//                               storeStatus !==
//                                 'active' && (
//                                 <button
//                                   type="button"
//                                   onClick={() =>
//                                     handleApproveStore(
//                                       seller
//                                     )
//                                   }
//                                   disabled={
//                                     isActionLoading
//                                   }
//                                   className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
//                                   title="Approve store"
//                                 >
//                                   {actionLoading ===
//                                   `store-${storeId}` ? (
//                                     <Loader2
//                                       size={17}
//                                       className="animate-spin"
//                                     />
//                                   ) : (
//                                     <Store
//                                       size={17}
//                                     />
//                                   )}
//                                 </button>
//                               )}
//                           </div>
//                         </td>
//                       </tr>
//                     )
//                   })}

//                 </tbody>
//               </table>
//             </div>

//             {/* EMPTY */}

//             {filtered.length === 0 && (
//               <div className="p-12 text-center">
//                 <Store
//                   size={38}
//                   className="mx-auto text-gray-300"
//                 />

//                 <p className="mt-4 text-sm font-medium text-gray-600">
//                   No sellers found.
//                 </p>

//                 {search && (
//                   <p className="mt-1 text-xs text-gray-400">
//                     Try a different search term.
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// // ============================================================
// // STATUS BADGE
// // ============================================================

// function StatusBadge({ status }) {
//   const normalized =
//     String(status || 'unknown')
//       .toLowerCase()

//   const styles = {
//     pending:
//       'bg-yellow-50 text-yellow-700',

//     approved:
//       'bg-green-50 text-green-700',

//     active:
//       'bg-green-50 text-green-700',

//     rejected:
//       'bg-red-50 text-red-700',

//     suspended:
//       'bg-gray-100 text-gray-700',

//     unknown:
//       'bg-gray-100 text-gray-600',
//   }

//   return (
//     <span
//       className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
//         styles[normalized] ||
//         styles.unknown
//       }`}
//     >
//       {normalized}
//     </span>
//   )
// }

// export default AdminSellers

import React, { useEffect, useMemo, useState } from 'react'
import {
  Search,
  Check,
  X,
  Store,
  Eye,
  RefreshCw,
  Loader2,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Package,
  FileText,
  UserRound,
} from 'lucide-react'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'

const API_URL =
  'https://fegegta-server.onrender.com/api'

const getToken = () => {
  return localStorage.getItem('token')
}

function AdminSellers() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const [applications, setApplications] = useState([])

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] =
    useState('pending')

  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const [actionLoading, setActionLoading] =
    useState(null)

  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] =
    useState('')

  const [selectedApplication, setSelectedApplication] =
    useState(null)

  // ============================================================
  // LOAD SELLER APPLICATIONS
  // ============================================================

  const loadApplications = async ({
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
        `${API_URL}/seller-applications`,
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
            'Failed to load seller applications.'
        )
      }

      if (data?.success === false) {
        throw new Error(
          data?.message ||
            'Failed to load seller applications.'
        )
      }

      // Backend:
      //
      // {
      //   success: true,
      //   applications: [...]
      // }

      const applicationList =
        Array.isArray(data?.applications)
          ? data.applications
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.data?.applications)
          ? data.data.applications
          : []

      setApplications(applicationList)
    } catch (error) {
      console.error(
        'Load seller applications error:',
        error
      )

      setError(
        error?.message ||
          'Something went wrong while loading seller applications.'
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
    loadApplications()
  }, [])

  // ============================================================
  // APPROVE APPLICATION
  // ============================================================

  const handleApprove = async (application) => {
    const applicationId = application?._id

    if (!applicationId) {
      setError(
        'Seller application ID was not found.'
      )
      return
    }

    const confirmed = window.confirm(
      `Approve the seller application for "${
        application?.storeName ||
        application?.businessName ||
        'this seller'
      }"?\n\nThis will create/activate the seller and their store.`
    )

    if (!confirmed) {
      return
    }

    try {
      setActionLoading(applicationId)
      setError('')
      setSuccessMessage('')

      const token = getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found. Please login again.'
        )
      }

      const response = await fetch(
        `${API_URL}/seller-applications/${applicationId}/status`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'approved',
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
            'Failed to approve seller application.'
        )
      }

      if (data?.success === false) {
        throw new Error(
          data?.message ||
            'Failed to approve seller application.'
        )
      }

      setSuccessMessage(
        data?.message ||
          'Seller application approved successfully. Seller and store have been created.'
      )

      setSelectedApplication(null)

      await loadApplications({
        refresh: true,
      })
    } catch (error) {
      console.error(
        'Approve seller application error:',
        error
      )

      setError(
        error?.message ||
          'Failed to approve seller application.'
      )
    } finally {
      setActionLoading(null)
    }
  }

  // ============================================================
  // REJECT APPLICATION
  // ============================================================

  const handleReject = async (application) => {
    const applicationId = application?._id

    if (!applicationId) {
      setError(
        'Seller application ID was not found.'
      )
      return
    }

    const reason = window.prompt(
      'Enter rejection reason:'
    )

    if (reason === null) {
      return
    }

    try {
      setActionLoading(applicationId)
      setError('')
      setSuccessMessage('')

      const token = getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found. Please login again.'
        )
      }

      const response = await fetch(
        `${API_URL}/seller-applications/${applicationId}/status`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'rejected',
            rejectionReason:
              String(reason).trim(),
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
            'Failed to reject seller application.'
        )
      }

      if (data?.success === false) {
        throw new Error(
          data?.message ||
            'Failed to reject seller application.'
        )
      }

      setSuccessMessage(
        data?.message ||
          'Seller application rejected successfully.'
      )

      setSelectedApplication(null)

      await loadApplications({
        refresh: true,
      })
    } catch (error) {
      console.error(
        'Reject seller application error:',
        error
      )

      setError(
        error?.message ||
          'Failed to reject seller application.'
      )
    } finally {
      setActionLoading(null)
    }
  }

  // ============================================================
  // SEARCH + FILTER
  // ============================================================

  const filteredApplications = useMemo(() => {
    return applications.filter(
      (application) => {
        const userName =
          application?.user?.name ||
          [
            application?.user?.firstName,
            application?.user?.lastName,
          ]
            .filter(Boolean)
            .join(' ') ||
          ''

        const businessName =
          application?.businessName || ''

        const storeName =
          application?.storeName || ''

        const email =
          application?.email ||
          application?.user?.email ||
          ''

        const phone =
          application?.phone ||
          application?.user?.phone ||
          ''

        const productType =
          application?.productType || ''

        const productCategory =
          application?.productCategory || ''

        const searchableText = `
          ${userName}
          ${businessName}
          ${storeName}
          ${email}
          ${phone}
          ${productType}
          ${productCategory}
        `.toLowerCase()

        const matchesSearch =
          searchableText.includes(
            search.toLowerCase()
          )

        const matchesStatus =
          statusFilter === 'all' ||
          String(
            application?.status || ''
          ).toLowerCase() ===
            statusFilter.toLowerCase()

        return (
          matchesSearch &&
          matchesStatus
        )
      }
    )
  }, [
    applications,
    search,
    statusFilter,
  ])

  // ============================================================
  // COUNTS
  // ============================================================

  const pendingCount = applications.filter(
    (application) =>
      application?.status === 'pending'
  ).length

  const approvedCount = applications.filter(
    (application) =>
      application?.status === 'approved'
  ).length

  const rejectedCount = applications.filter(
    (application) =>
      application?.status === 'rejected'
  ).length

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
                Loading seller applications...
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

          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Seller Applications
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Review seller applications and approve or reject them.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                loadApplications({
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

          {/* ==================================================
              SUCCESS
          ================================================== */}

          {successMessage && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
              <Check
                size={19}
                className="mt-0.5 shrink-0 text-green-600"
              />

              <p className="text-sm font-medium text-green-800">
                {successMessage}
              </p>

              <button
                type="button"
                onClick={() =>
                  setSuccessMessage('')
                }
                className="ml-auto text-green-600 hover:text-green-800"
              >
                <X size={17} />
              </button>
            </div>
          )}

          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <AlertCircle
                size={19}
                className="mt-0.5 shrink-0 text-red-600"
              />

              <p className="text-sm font-medium text-red-800">
                {error}
              </p>

              <button
                type="button"
                onClick={() => setError('')}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                <X size={17} />
              </button>
            </div>
          )}

          {/* ==================================================
              STATISTICS
          ================================================== */}

          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard
              label="All Applications"
              value={applications.length}
            />

            <StatCard
              label="Pending"
              value={pendingCount}
            />

            <StatCard
              label="Approved"
              value={approvedCount}
            />

            <StatCard
              label="Rejected"
              value={rejectedCount}
            />
          </div>

          {/* ==================================================
              SEARCH + FILTER
          ================================================== */}

          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative max-w-md flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search applications..."
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <FilterButton
                active={
                  statusFilter === 'pending'
                }
                onClick={() =>
                  setStatusFilter('pending')
                }
              >
                Pending
              </FilterButton>

              <FilterButton
                active={
                  statusFilter === 'approved'
                }
                onClick={() =>
                  setStatusFilter('approved')
                }
              >
                Approved
              </FilterButton>

              <FilterButton
                active={
                  statusFilter === 'rejected'
                }
                onClick={() =>
                  setStatusFilter('rejected')
                }
              >
                Rejected
              </FilterButton>

              <FilterButton
                active={
                  statusFilter === 'all'
                }
                onClick={() =>
                  setStatusFilter('all')
                }
              >
                All
              </FilterButton>
            </div>
          </div>

          {/* ==================================================
              TABLE
          ================================================== */}

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-[1200px] w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Applicant
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Store
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Product
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Contact
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredApplications.map(
                    (application) => {
                      const applicationId =
                        application?._id

                      const applicantName =
                        application?.user?.name ||
                        [
                          application?.user
                            ?.firstName,
                          application?.user
                            ?.lastName,
                        ]
                          .filter(Boolean)
                          .join(' ') ||
                        'Applicant'

                      const businessName =
                        application?.businessName ||
                        '—'

                      const storeName =
                        application?.storeName ||
                        application?.businessName ||
                        '—'

                      const productType =
                        application?.productType ||
                        '—'

                      const productCategory =
                        application?.productCategory ||
                        '—'

                      const email =
                        application?.email ||
                        application?.user?.email ||
                        '—'

                      const phone =
                        application?.phone ||
                        application?.user?.phone ||
                        '—'

                      const status =
                        application?.status ||
                        'pending'

                      const isActionLoading =
                        actionLoading ===
                        applicationId

                      return (
                        <tr
                          key={applicationId}
                          className="transition hover:bg-gray-50/70"
                        >
                          {/* APPLICANT */}

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                                <UserRound
                                  size={18}
                                  className="text-gray-500"
                                />
                              </div>

                              <div>
                                <p className="font-semibold text-gray-900">
                                  {applicantName}
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                  {businessName}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* STORE */}

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="rounded-lg bg-gray-100 p-2">
                                <Store
                                  size={17}
                                  className="text-gray-500"
                                />
                              </div>

                              <div>
                                <p className="text-sm font-semibold text-gray-800">
                                  {storeName}
                                </p>

                                <p className="mt-1 max-w-[220px] truncate text-xs text-gray-500">
                                  {application?.storeDescription ||
                                    'No store description'}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* PRODUCT */}

                          <td className="px-5 py-4">
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {productType}
                              </p>

                              <p className="mt-1 text-xs text-gray-500">
                                {productCategory}
                              </p>
                            </div>
                          </td>

                          {/* CONTACT */}

                          <td className="px-5 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <Mail
                                  size={13}
                                />
                                <span>
                                  {email}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <Phone
                                  size={13}
                                />
                                <span>
                                  {phone}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* STATUS */}

                          <td className="px-5 py-4">
                            <StatusBadge
                              status={status}
                            />
                          </td>

                          {/* ACTIONS */}

                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-2">

                              {/* VIEW */}

                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedApplication(
                                    application
                                  )
                                }
                                className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition hover:bg-gray-50"
                                title="View application"
                              >
                                <Eye size={17} />
                              </button>

                              {/* APPROVE */}

                              {status !==
                                'approved' && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleApprove(
                                      application
                                    )
                                  }
                                  disabled={
                                    isActionLoading
                                  }
                                  className="rounded-lg bg-green-600 p-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                  title="Approve application"
                                >
                                  {isActionLoading ? (
                                    <Loader2
                                      size={17}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <Check
                                      size={17}
                                    />
                                  )}
                                </button>
                              )}

                              {/* REJECT */}

                              {status !==
                                'rejected' && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleReject(
                                      application
                                    )
                                  }
                                  disabled={
                                    isActionLoading
                                  }
                                  className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                  title="Reject application"
                                >
                                  {isActionLoading ? (
                                    <Loader2
                                      size={17}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <X size={17} />
                                  )}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    }
                  )}
                </tbody>
              </table>
            </div>

            {/* EMPTY */}

            {filteredApplications.length ===
              0 && (
              <div className="p-12 text-center">
                <Store
                  size={40}
                  className="mx-auto text-gray-300"
                />

                <p className="mt-4 text-sm font-semibold text-gray-600">
                  No seller applications found.
                </p>

                {search ? (
                  <p className="mt-1 text-xs text-gray-400">
                    Try a different search term.
                  </p>
                ) : statusFilter !== 'all' ? (
                  <p className="mt-1 text-xs text-gray-400">
                    There are no {statusFilter}{' '}
                    applications.
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-gray-400">
                    No seller applications have been submitted yet.
                  </p>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ========================================================
          APPLICATION DETAILS MODAL
      ======================================================== */}

      {selectedApplication && (
        <ApplicationModal
          application={selectedApplication}
          onClose={() =>
            setSelectedApplication(null)
          }
          onApprove={() =>
            handleApprove(selectedApplication)
          }
          onReject={() =>
            handleReject(selectedApplication)
          }
          actionLoading={
            actionLoading ===
            selectedApplication?._id
          }
        />
      )}
    </div>
  )
}

// ============================================================
// STAT CARD
// ============================================================

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  )
}

// ============================================================
// FILTER BUTTON
// ============================================================

function FilterButton({
  active,
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
        active
          ? 'bg-gray-900 text-white'
          : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  )
}

// ============================================================
// STATUS BADGE
// ============================================================

function StatusBadge({ status }) {
  const normalized = String(
    status || 'unknown'
  ).toLowerCase()

  const styles = {
    pending:
      'bg-yellow-50 text-yellow-700',

    approved:
      'bg-green-50 text-green-700',

    rejected:
      'bg-red-50 text-red-700',

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

// ============================================================
// APPLICATION MODAL
// ============================================================

function ApplicationModal({
  application,
  onClose,
  onApprove,
  onReject,
  actionLoading,
}) {
  const applicantName =
    application?.user?.name ||
    [
      application?.user?.firstName,
      application?.user?.lastName,
    ]
      .filter(Boolean)
      .join(' ') ||
    'Applicant'

  const status =
    application?.status || 'pending'

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* MODAL HEADER */}

        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Seller Application
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Review the information submitted by the seller.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* MODAL CONTENT */}

        <div className="max-h-[calc(90vh-140px)] overflow-y-auto p-5 sm:p-6">

          {/* APPLICANT */}

          <DetailSection
            icon={<UserRound size={18} />}
            title="Applicant Information"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem
                label="Applicant"
                value={applicantName}
              />

              <DetailItem
                label="Business Name"
                value={
                  application?.businessName
                }
              />

              <DetailItem
                label="Email"
                value={
                  application?.email ||
                  application?.user?.email
                }
              />

              <DetailItem
                label="Phone"
                value={
                  application?.phone ||
                  application?.user?.phone
                }
              />

              <DetailItem
                label="Address"
                value={
                  application?.address
                }
                icon={<MapPin size={14} />}
              />
            </div>
          </DetailSection>

          {/* STORE */}

          <DetailSection
            icon={<Store size={18} />}
            title="Store Information"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem
                label="Store Name"
                value={
                  application?.storeName
                }
              />

              <DetailItem
                label="Store Description"
                value={
                  application?.storeDescription
                }
                full
              />
            </div>
          </DetailSection>

          {/* PRODUCT */}

          <DetailSection
            icon={<Package size={18} />}
            title="Product Information"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem
                label="Product Type"
                value={
                  application?.productType
                }
              />

              <DetailItem
                label="Product Category"
                value={
                  application?.productCategory
                }
              />

              <DetailItem
                label="Product Description"
                value={
                  application?.productDescription
                }
                full
              />

              <DetailItem
                label="Product Quality"
                value={
                  application?.productQuality
                }
                full
              />
            </div>
          </DetailSection>

          {/* ADDITIONAL */}

          <DetailSection
            icon={<FileText size={18} />}
            title="Additional Information"
          >
            <div className="space-y-4">
              <DetailItem
                label="Other Information"
                value={
                  application?.otherInformation
                }
                full
              />

              {application?.description && (
                <DetailItem
                  label="General Description"
                  value={
                    application.description
                  }
                  full
                />
              )}
            </div>
          </DetailSection>

          {/* STATUS */}

          <DetailSection
            icon={<Check size={18} />}
            title="Application Status"
          >
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge
                status={status}
              />

              {application?.createdAt && (
                <span className="text-xs text-gray-500">
                  Submitted:{' '}
                  {formatDate(
                    application.createdAt
                  )}
                </span>
              )}

              {application?.reviewedAt && (
                <span className="text-xs text-gray-500">
                  Reviewed:{' '}
                  {formatDate(
                    application.reviewedAt
                  )}
                </span>
              )}
            </div>

            {status === 'rejected' &&
              application?.rejectionReason && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                    Rejection Reason
                  </p>

                  <p className="mt-2 text-sm text-red-800">
                    {
                      application.rejectionReason
                    }
                  </p>
                </div>
              )}
          </DetailSection>
        </div>

        {/* MODAL FOOTER */}

        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Close
          </button>

          {status !== 'rejected' && (
            <button
              type="button"
              onClick={onReject}
              disabled={actionLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {actionLoading ? (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <X size={17} />
              )}

              Reject
            </button>
          )}

          {status !== 'approved' && (
            <button
              type="button"
              onClick={onApprove}
              disabled={actionLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {actionLoading ? (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <Check size={17} />
              )}

              Approve Seller
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// DETAIL SECTION
// ============================================================

function DetailSection({
  icon,
  title,
  children,
}) {
  return (
    <section className="mb-6 last:mb-0">
      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-lg bg-gray-100 p-2 text-gray-600">
          {icon}
        </div>

        <h3 className="text-sm font-bold text-gray-900">
          {title}
        </h3>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        {children}
      </div>
    </section>
  )
}

// ============================================================
// DETAIL ITEM
// ============================================================

function DetailItem({
  label,
  value,
  icon,
  full = false,
}) {
  return (
    <div
      className={
        full
          ? 'sm:col-span-2'
          : ''
      }
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <div className="mt-1 flex items-start gap-1.5">
        {icon && (
          <span className="mt-0.5 text-gray-400">
            {icon}
          </span>
        )}

        <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
          {value || '—'}
        </p>
      </div>
    </div>
  )
}

// ============================================================
// FORMAT DATE
// ============================================================

function formatDate(date) {
  try {
    return new Date(date).toLocaleString()
  } catch {
    return '—'
  }
}

export default AdminSellers