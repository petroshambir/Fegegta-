
// import React, { useEffect, useState } from 'react'
// import {
//   ArrowLeft,
//   ShieldCheck,
//   ShieldOff,
//   Store,
//   Mail,
//   Phone,
//   RefreshCw,
//   Loader2,
//   AlertCircle,
// } from 'lucide-react'
// import { Link, useParams } from 'react-router-dom'

// import AdminSidebar from '../../components/admin/AdminSidebar'
// import AdminHeader from '../../components/admin/AdminHeader'

// const API_URL =
//   'https://fegegta-server.onrender.com/api'

// const getToken = () => {
//   return localStorage.getItem('token')
// }

// function AdminSellerDetails() {
//   const { id } = useParams()

//   const [mobileOpen, setMobileOpen] = useState(false)

//   const [seller, setSeller] = useState(null)
//   const [store, setStore] = useState(null)

//   const [loading, setLoading] = useState(true)
//   const [refreshing, setRefreshing] = useState(false)
//   const [actionLoading, setActionLoading] =
//     useState(false)

//   const [error, setError] = useState('')

//   // ============================================================
//   // LOAD SELLER
//   // ============================================================

//   const loadSeller = async ({
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

//       // --------------------------------------------------------
//       // Support different possible response structures
//       // --------------------------------------------------------

//       const sellers =
//         Array.isArray(data?.sellers)
//           ? data.sellers
//           : Array.isArray(data?.data)
//           ? data.data
//           : Array.isArray(data?.data?.sellers)
//           ? data.data.sellers
//           : []

//       // --------------------------------------------------------
//       // Find current seller
//       // --------------------------------------------------------

//       const foundSeller = sellers.find(
//         (item) => {
//           const sellerId =
//             item?._id ||
//             item?.id ||
//             item?.sellerId ||
//             item?.userId

//           const userId =
//             item?.user?._id ||
//             item?.user?.id ||
//             item?.userId

//           const applicationId =
//             item?.applicationId

//           return (
//             String(sellerId) === String(id) ||
//             String(userId) === String(id) ||
//             String(applicationId) === String(id)
//           )
//         }
//       )

//       if (!foundSeller) {
//         setSeller(null)
//         setStore(null)
//         return
//       }

//       setSeller(foundSeller)

//       // --------------------------------------------------------
//       // Store can be embedded in seller response
//       // --------------------------------------------------------

//       const embeddedStore =
//         foundSeller?.store ||
//         foundSeller?.storeData ||
//         null

//       if (embeddedStore) {
//         setStore(embeddedStore)
//       } else {
//         // Some backend structures may have store fields
//         // directly inside the seller object.
//         const storeObject =
//           foundSeller?.storeId ||
//           foundSeller?.storeInfo

//         if (
//           typeof storeObject === 'object' &&
//           storeObject !== null
//         ) {
//           setStore(storeObject)
//         } else {
//           setStore(null)
//         }
//       }
//     } catch (error) {
//       console.error(
//         'Load seller details error:',
//         error
//       )

//       setError(
//         error?.message ||
//           'Something went wrong while loading seller details.'
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
//     loadSeller()
//   }, [id])

//   // ============================================================
//   // VERIFY / UNVERIFY
//   // ============================================================

//   const toggleVerification = async () => {
//     if (!seller) return

//     try {
//       setActionLoading(true)
//       setError('')

//       const token = getToken()

//       if (!token) {
//         throw new Error(
//           'Authentication token not found. Please login again.'
//         )
//       }

//       /*
//         Backend currently exposes:

//         PUT /api/admin/sellers/:id/approve

//         The seller ID is used here.
//       */

//       const sellerId =
//         seller?._id ||
//         seller?.id ||
//         seller?.sellerId ||
//         seller?.userId

//       if (!sellerId) {
//         throw new Error(
//           'Seller ID was not found.'
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
//             'Failed to verify seller.'
//         )
//       }

//       if (data?.success === false) {
//         throw new Error(
//           data?.message ||
//             'Failed to verify seller.'
//         )
//       }

//       // Reload from backend
//       await loadSeller({ refresh: true })
//     } catch (error) {
//       console.error(
//         'Verify seller error:',
//         error
//       )

//       setError(
//         error?.message ||
//           'Failed to verify seller.'
//       )
//     } finally {
//       setActionLoading(false)
//     }
//   }

//   // ============================================================
//   // CHANGE STORE / SELLER STATUS
//   // ============================================================

//   const changeStatus = async (status) => {
//     if (!seller) return

//     try {
//       setActionLoading(true)
//       setError('')

//       const token = getToken()

//       if (!token) {
//         throw new Error(
//           'Authentication token not found. Please login again.'
//         )
//       }

//       const sellerId =
//         seller?._id ||
//         seller?.id ||
//         seller?.sellerId ||
//         seller?.userId

//       if (!sellerId) {
//         throw new Error(
//           'Seller ID was not found.'
//         )
//       }

//       // --------------------------------------------------------
//       // APPROVED
//       // --------------------------------------------------------

//       if (status === 'approved') {
//         const response = await fetch(
//           `${API_URL}/admin/sellers/${sellerId}/approve`,
//           {
//             method: 'PUT',
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           }
//         )

//         let data = {}

//         try {
//           data = await response.json()
//         } catch {
//           data = {}
//         }

//         if (!response.ok) {
//           throw new Error(
//             data?.message ||
//               'Failed to approve seller.'
//           )
//         }

//         if (data?.success === false) {
//           throw new Error(
//             data?.message ||
//               'Failed to approve seller.'
//           )
//         }
//       }

//       // --------------------------------------------------------
//       // REJECTED
//       // --------------------------------------------------------

//       else if (status === 'rejected') {
//         const response = await fetch(
//           `${API_URL}/admin/sellers/${sellerId}/reject`,
//           {
//             method: 'PUT',
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           }
//         )

//         let data = {}

//         try {
//           data = await response.json()
//         } catch {
//           data = {}
//         }

//         if (!response.ok) {
//           throw new Error(
//             data?.message ||
//               'Failed to reject seller.'
//           )
//         }

//         if (data?.success === false) {
//           throw new Error(
//             data?.message ||
//               'Failed to reject seller.'
//           )
//         }
//       }

//       // --------------------------------------------------------
//       // PENDING / SUSPENDED
//       // --------------------------------------------------------
//       /*
//         IMPORTANT:

//         The backend routes currently provided are:

//         /approve
//         /reject

//         There is no confirmed backend route for:

//         /suspend
//         /pending

//         Therefore we do not invent those endpoints.
//       */

//       else if (
//         status === 'pending' ||
//         status === 'suspended'
//       ) {
//         setError(
//           `The backend currently does not provide an endpoint to change seller status to "${status}".`
//         )

//         return
//       }

//       await loadSeller({ refresh: true })
//     } catch (error) {
//       console.error(
//         'Change seller status error:',
//         error
//       )

//       setError(
//         error?.message ||
//           'Failed to change seller status.'
//       )
//     } finally {
//       setActionLoading(false)
//     }
//   }

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
//                 size={35}
//                 className="mx-auto animate-spin text-gray-400"
//               />

//               <p className="mt-4 text-sm text-gray-500">
//                 Loading seller details...
//               </p>
//             </div>
//           </main>
//         </div>
//       </div>
//     )
//   }

//   // ============================================================
//   // SELLER NOT FOUND
//   // ============================================================

//   if (!seller) {
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
//               <Store
//                 size={42}
//                 className="mx-auto text-gray-300"
//               />

//               <p className="mt-4 text-gray-500">
//                 Seller not found.
//               </p>

//               {error && (
//                 <p className="mt-2 text-sm text-red-600">
//                   {error}
//                 </p>
//               )}

//               <Link
//                 to="/admin/sellers"
//                 className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
//               >
//                 <ArrowLeft size={16} />
//                 Back to Sellers
//               </Link>
//             </div>
//           </main>
//         </div>
//       </div>
//     )
//   }

//   // ============================================================
//   // SELLER DATA
//   // ============================================================

//   const sellerName =
//     seller?.name ||
//     seller?.fullName ||
//     seller?.user?.name ||
//     seller?.user?.fullName ||
//     'Seller'

//   const storeName =
//     seller?.storeName ||
//     seller?.store?.storeName ||
//     seller?.store?.name ||
//     store?.storeName ||
//     store?.name ||
//     'Seller Store'

//   const email =
//     seller?.email ||
//     seller?.user?.email ||
//     ''

//   const phone =
//     seller?.phone ||
//     seller?.businessPhone ||
//     seller?.user?.phone ||
//     ''

//   const sellerStatus =
//     seller?.status ||
//     seller?.approvalStatus ||
//     seller?.sellerStatus ||
//     'pending'

//   const storeStatus =
//     seller?.store?.status ||
//     store?.status ||
//     sellerStatus ||
//     'pending'

//   const verified =
//     Boolean(
//       seller?.verified ??
//       seller?.store?.verified ??
//       store?.verified
//     )

//   const category =
//     seller?.category ||
//     seller?.productCategory ||
//     ''

//   const productType =
//     seller?.productType ||
//     ''

//   const applicationDate =
//     seller?.createdAt ||
//     seller?.submittedAt ||
//     seller?.applicationDate

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
//           {/* TOP NAVIGATION */}
//           {/* ================================================== */}

//           <div className="flex items-center justify-between">
//             <Link
//               to="/admin/sellers"
//               className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
//             >
//               <ArrowLeft size={17} />
//               Back to Sellers
//             </Link>

//             <button
//               type="button"
//               onClick={() =>
//                 loadSeller({
//                   refresh: true,
//                 })
//               }
//               disabled={
//                 refreshing ||
//                 actionLoading
//               }
//               className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
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
//           {/* ERROR */}
//           {/* ================================================== */}

//           {error && (
//             <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
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
//           {/* SELLER HEADER */}
//           {/* ================================================== */}

//           <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
//             <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
//                   <Store
//                     size={28}
//                     className="text-gray-500"
//                   />
//                 </div>

//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900">
//                     {storeName}
//                   </h1>

//                   <p className="mt-1 text-sm text-gray-500">
//                     {sellerName}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-2">
//                 {/* VERIFY */}
//                 <button
//                   type="button"
//                   onClick={
//                     toggleVerification
//                   }
//                   disabled={
//                     actionLoading
//                   }
//                   className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {actionLoading ? (
//                     <Loader2
//                       size={17}
//                       className="animate-spin"
//                     />
//                   ) : verified ? (
//                     <ShieldOff size={17} />
//                   ) : (
//                     <ShieldCheck size={17} />
//                   )}

//                   {verified
//                     ? 'Unverify'
//                     : 'Verify Seller'}
//                 </button>

//                 {/* STATUS */}
//                 <select
//                   value={String(
//                     storeStatus ||
//                       'pending'
//                   ).toLowerCase()}
//                   onChange={(e) =>
//                     changeStatus(
//                       e.target.value
//                     )
//                   }
//                   disabled={
//                     actionLoading
//                   }
//                   className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold outline-none disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   <option value="pending">
//                     Pending
//                   </option>

//                   <option value="approved">
//                     Approved
//                   </option>

//                   <option value="suspended">
//                     Suspended
//                   </option>

//                   <option value="rejected">
//                     Rejected
//                   </option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* ================================================== */}
//           {/* INFORMATION */}
//           {/* ================================================== */}

//           <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
//             {/* SELLER INFORMATION */}

//             <InfoCard title="Seller Information">
//               <InfoRow
//                 icon={Mail}
//                 label="Email"
//                 value={email}
//               />

//               <InfoRow
//                 icon={Phone}
//                 label="Phone"
//                 value={phone}
//               />

//               <InfoRow
//                 icon={Store}
//                 label="Store"
//                 value={storeName}
//               />
//             </InfoCard>

//             {/* APPLICATION INFORMATION */}

//             <InfoCard title="Application Information">
//               <Detail
//                 label="Application Status"
//                 value={sellerStatus}
//               />

//               <Detail
//                 label="Application Date"
//                 value={formatDate(
//                   applicationDate
//                 )}
//               />

//               <Detail
//                 label="Category"
//                 value={category}
//               />

//               <Detail
//                 label="Product Type"
//                 value={productType}
//               />
//             </InfoCard>

//             {/* VERIFICATION */}

//             <InfoCard
//               title="Store Verification"
//               className="lg:col-span-2"
//             >
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//                 <StatusBox
//                   label="Seller Application"
//                   value={sellerStatus}
//                 />

//                 <StatusBox
//                   label="Store Status"
//                   value={storeStatus}
//                 />

//                 <StatusBox
//                   label="Verification"
//                   value={
//                     verified
//                       ? 'verified'
//                       : 'unverified'
//                   }
//                 />
//               </div>
//             </InfoCard>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// // ============================================================
// // INFO CARD
// // ============================================================

// function InfoCard({
//   title,
//   children,
//   className = '',
// }) {
//   return (
//     <section
//       className={`rounded-2xl border border-gray-200 bg-white p-6 ${className}`}
//     >
//       <h2 className="text-lg font-bold text-gray-900">
//         {title}
//       </h2>

//       <div className="mt-5 space-y-4">
//         {children}
//       </div>
//     </section>
//   )
// }

// // ============================================================
// // INFO ROW
// // ============================================================

// function InfoRow({
//   icon: Icon,
//   label,
//   value,
// }) {
//   return (
//     <div className="flex items-center gap-3">
//       <div className="rounded-lg bg-gray-100 p-2">
//         <Icon size={17} />
//       </div>

//       <div>
//         <p className="text-xs text-gray-500">
//           {label}
//         </p>

//         <p className="text-sm font-medium text-gray-900">
//           {value || '—'}
//         </p>
//       </div>
//     </div>
//   )
// }

// // ============================================================
// // DETAIL
// // ============================================================

// function Detail({ label, value }) {
//   return (
//     <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-0">
//       <span className="text-sm text-gray-500">
//         {label}
//       </span>

//       <span className="text-right text-sm font-semibold capitalize text-gray-900">
//         {value || '—'}
//       </span>
//     </div>
//   )
// }

// // ============================================================
// // STATUS BOX
// // ============================================================

// function StatusBox({ label, value }) {
//   return (
//     <div className="rounded-xl bg-gray-50 p-5">
//       <p className="text-xs text-gray-500">
//         {label}
//       </p>

//       <p className="mt-2 text-sm font-bold capitalize text-gray-900">
//         {value || '—'}
//       </p>
//     </div>
//   )
// }

// // ============================================================
// // DATE
// // ============================================================

// function formatDate(date) {
//   if (!date) return '—'

//   const parsedDate = new Date(date)

//   if (
//     Number.isNaN(
//       parsedDate.getTime()
//     )
//   ) {
//     return '—'
//   }

//   return parsedDate.toLocaleDateString()
// }

// export default AdminSellerDetails

import React, { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ShieldCheck,
  Store,
  Mail,
  Phone,
  RefreshCw,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'

const API_URL =
  'https://fegegta-server.onrender.com/api'

const getToken = () => {
  return localStorage.getItem('token')
}

// ============================================================
// ADMIN SELLER DETAILS
// ============================================================

function AdminSellerDetails() {
  const { id } = useParams()

  const [mobileOpen, setMobileOpen] = useState(false)

  const [seller, setSeller] = useState(null)
  const [store, setStore] = useState(null)

  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [actionLoading, setActionLoading] =
    useState(false)

  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] =
    useState('')

  // ============================================================
  // LOAD SELLER
  // ============================================================

  const loadSeller = async ({
    refresh = false,
  } = {}) => {
    try {
      if (refresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }

      setError('')
      setSuccessMessage('')

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

      // ========================================================
      // BACKEND RESPONSE
      //
      // Current backend:
      //
      // {
      //   success: true,
      //   sellers: [...]
      // }
      // ========================================================

      const sellers =
        Array.isArray(data?.sellers)
          ? data.sellers
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.data?.sellers)
          ? data.data.sellers
          : []

      // ========================================================
      // FIND SELLER
      // ========================================================

      const foundSeller = sellers.find(
        (item) => {
          const sellerId =
            item?._id ||
            item?.id ||
            item?.sellerId

          const userId =
            item?.user?._id ||
            item?.user?.id

          return (
            String(sellerId) === String(id) ||
            String(userId) === String(id)
          )
        }
      )

      if (!foundSeller) {
        setSeller(null)
        setStore(null)
        return
      }

      setSeller(foundSeller)

      // ========================================================
      // STORE
      //
      // Current backend populates:
      //
      // seller.store
      // ========================================================

      if (
        foundSeller?.store &&
        typeof foundSeller.store === 'object'
      ) {
        setStore(foundSeller.store)
      } else {
        setStore(null)
      }
    } catch (error) {
      console.error(
        'Load seller details error:',
        error
      )

      setError(
        error?.message ||
          'Something went wrong while loading seller details.'
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
    loadSeller()
  }, [id])

  // ============================================================
  // APPROVE SELLER
  // ============================================================

  const approveSeller = async () => {
    if (!seller) return

    try {
      setActionLoading(true)
      setError('')
      setSuccessMessage('')

      const token = getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found. Please login again.'
        )
      }

      const sellerId =
        seller?._id

      if (!sellerId) {
        throw new Error(
          'Seller ID was not found.'
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

      await loadSeller({ refresh: true })
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
      setActionLoading(false)
    }
  }

  // ============================================================
  // REJECT SELLER
  // ============================================================

  const rejectSeller = async () => {
    if (!seller) return

    const reason = window.prompt(
      'Enter rejection reason (optional):'
    )

    // User cancelled the prompt
    if (reason === null) {
      return
    }

    try {
      setActionLoading(true)
      setError('')
      setSuccessMessage('')

      const token = getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found. Please login again.'
        )
      }

      const sellerId =
        seller?._id

      if (!sellerId) {
        throw new Error(
          'Seller ID was not found.'
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

      await loadSeller({ refresh: true })
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
      setActionLoading(false)
    }
  }

  // ============================================================
  // APPROVE STORE
  // ============================================================

  const approveStore = async () => {
    if (!store?._id) {
      setError(
        'Store ID was not found.'
      )

      return
    }

    try {
      setActionLoading(true)
      setError('')
      setSuccessMessage('')

      const token = getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found. Please login again.'
        )
      }

      const response = await fetch(
        `${API_URL}/admin/stores/${store._id}/approve`,
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

      await loadSeller({ refresh: true })
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
      setActionLoading(false)
    }
  }

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
                size={35}
                className="mx-auto animate-spin text-gray-400"
              />

              <p className="mt-4 text-sm text-gray-500">
                Loading seller details...
              </p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  // ============================================================
  // SELLER NOT FOUND
  // ============================================================

  if (!seller) {
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
              <Store
                size={42}
                className="mx-auto text-gray-300"
              />

              <p className="mt-4 text-gray-500">
                Seller not found.
              </p>

              {error && (
                <p className="mt-2 text-sm text-red-600">
                  {error}
                </p>
              )}

              <Link
                to="/admin/sellers"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
              >
                <ArrowLeft size={16} />
                Back to Sellers
              </Link>
            </div>
          </main>
        </div>
      </div>
    )
  }

  // ============================================================
  // SELLER DATA
  // ============================================================

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

  const storeName =
    store?.name ||
    'Seller Store'

  const email =
    seller?.email ||
    seller?.user?.email ||
    ''

  const phone =
    seller?.phone ||
    seller?.user?.phone ||
    ''

  const sellerStatus =
    seller?.status ||
    'pending'

  const storeStatus =
    store?.status ||
    'pending'

  const applicationDate =
    seller?.createdAt ||
    ''

  const sellerStatusLower =
    String(sellerStatus).toLowerCase()

  const storeStatusLower =
    String(storeStatus).toLowerCase()

  const sellerApproved =
    sellerStatusLower === 'approved'

  const sellerRejected =
    sellerStatusLower === 'rejected'

  const storeApproved =
    storeStatusLower === 'approved' ||
    storeStatusLower === 'active'

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
          {/* TOP NAVIGATION */}
          {/* ================================================== */}

          <div className="flex items-center justify-between gap-4">
            <Link
              to="/admin/sellers"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={17} />
              Back to Sellers
            </Link>

            <button
              type="button"
              onClick={() =>
                loadSeller({
                  refresh: true,
                })
              }
              disabled={
                refreshing ||
                actionLoading
              }
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
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
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
              <CheckCircle2
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
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
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
          {/* SELLER HEADER */}
          {/* ================================================== */}

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              {/* SELLER / STORE */}
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
                  {store?.logo ? (
                    <img
                      src={store.logo}
                      alt={storeName}
                      className="h-full w-full object-cover"
                    />
                  ) : seller?.logo ? (
                    <img
                      src={seller.logo}
                      alt={sellerName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Store
                      size={28}
                      className="text-gray-500"
                    />
                  )}
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {storeName}
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    {sellerName}
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-2">

                {/* APPROVE SELLER */}
                {!sellerApproved && (
                  <button
                    type="button"
                    onClick={approveSeller}
                    disabled={actionLoading}
                    className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {actionLoading ? (
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                    ) : (
                      <ShieldCheck size={17} />
                    )}

                    Approve Seller
                  </button>
                )}

                {/* REJECT SELLER */}
                {!sellerRejected && (
                  <button
                    type="button"
                    onClick={rejectSeller}
                    disabled={actionLoading}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <XCircle size={17} />
                    Reject Seller
                  </button>
                )}

                {/* APPROVE STORE */}
                {store && !storeApproved && (
                  <button
                    type="button"
                    onClick={approveStore}
                    disabled={actionLoading}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Store size={17} />
                    Approve Store
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ================================================== */}
          {/* INFORMATION */}
          {/* ================================================== */}

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* SELLER INFORMATION */}

            <InfoCard title="Seller Information">
              <InfoRow
                icon={Mail}
                label="Email"
                value={email}
              />

              <InfoRow
                icon={Phone}
                label="Phone"
                value={phone}
              />

              <InfoRow
                icon={Store}
                label="Store"
                value={storeName}
              />

              <Detail
                label="Seller Status"
                value={sellerStatus}
              />
            </InfoCard>

            {/* STORE INFORMATION */}

            <InfoCard title="Store Information">
              <Detail
                label="Store Name"
                value={storeName}
              />

              <Detail
                label="Store Slug"
                value={store?.slug}
              />

              <Detail
                label="Store Status"
                value={storeStatus}
              />

              <Detail
                label="Seller Status"
                value={sellerStatus}
              />
            </InfoCard>

            {/* APPLICATION INFORMATION */}

            <InfoCard
              title="Application Information"
              className="lg:col-span-2"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                <StatusBox
                  label="Seller Application"
                  value={sellerStatus}
                  type={
                    sellerApproved
                      ? 'success'
                      : sellerRejected
                      ? 'danger'
                      : 'default'
                  }
                />

                <StatusBox
                  label="Store Status"
                  value={storeStatus}
                  type={
                    storeApproved
                      ? 'success'
                      : 'default'
                  }
                />

                <StatusBox
                  label="Application Date"
                  value={formatDate(
                    applicationDate
                  )}
                />
              </div>
            </InfoCard>

            {/* STORE VERIFICATION */}

            <InfoCard
              title="Store Verification"
              className="lg:col-span-2"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <StatusBox
                  label="Seller Approval"
                  value={
                    sellerApproved
                      ? 'Approved'
                      : sellerRejected
                      ? 'Rejected'
                      : sellerStatus
                  }
                  type={
                    sellerApproved
                      ? 'success'
                      : sellerRejected
                      ? 'danger'
                      : 'default'
                  }
                />

                <StatusBox
                  label="Store Approval"
                  value={
                    storeApproved
                      ? 'Approved'
                      : storeStatus
                  }
                  type={
                    storeApproved
                      ? 'success'
                      : 'default'
                  }
                />

              </div>
            </InfoCard>
          </div>
        </main>
      </div>
    </div>
  )
}

// ============================================================
// INFO CARD
// ============================================================

function InfoCard({
  title,
  children,
  className = '',
}) {
  return (
    <section
      className={`rounded-2xl border border-gray-200 bg-white p-6 ${className}`}
    >
      <h2 className="text-lg font-bold text-gray-900">
        {title}
      </h2>

      <div className="mt-5 space-y-4">
        {children}
      </div>
    </section>
  )
}

// ============================================================
// INFO ROW
// ============================================================

function InfoRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-gray-100 p-2">
        <Icon
          size={17}
          className="text-gray-600"
        />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-gray-500">
          {label}
        </p>

        <p className="truncate text-sm font-medium text-gray-900">
          {value || '—'}
        </p>
      </div>
    </div>
  )
}

// ============================================================
// DETAIL
// ============================================================

function Detail({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-0">
      <span className="text-sm text-gray-500">
        {label}
      </span>

      <span className="text-right text-sm font-semibold capitalize text-gray-900">
        {value || '—'}
      </span>
    </div>
  )
}

// ============================================================
// STATUS BOX
// ============================================================

function StatusBox({
  label,
  value,
  type = 'default',
}) {
  const typeClass =
    type === 'success'
      ? 'bg-green-50 text-green-700'
      : type === 'danger'
      ? 'bg-red-50 text-red-700'
      : 'bg-gray-50 text-gray-900'

  return (
    <div
      className={`rounded-xl p-5 ${typeClass}`}
    >
      <p className="text-xs opacity-70">
        {label}
      </p>

      <p className="mt-2 text-sm font-bold capitalize">
        {value || '—'}
      </p>
    </div>
  )
}

// ============================================================
// DATE
// ============================================================

function formatDate(date) {
  if (!date) return '—'

  const parsedDate = new Date(date)

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

export default AdminSellerDetails