

// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import {
//   ArrowLeft,
//   CheckCircle2,
//   Clock3,
//   XCircle,
//   Store,
//   Loader2,
// } from 'lucide-react'

// const API_URL =
//   'https://fegegta-server.onrender.com/api'

// function SellerApplicationStatus() {
//   const [seller, setSeller] =
//     useState(null)

//   const [loading, setLoading] =
//     useState(true)

//   const [error, setError] =
//     useState('')

//   // ============================================================
//   // LOAD SELLER APPLICATION FROM BACKEND
//   // ============================================================

//   useEffect(() => {
//     const loadApplication = async () => {
//       try {
//         setLoading(true)
//         setError('')

//         const token =
//           localStorage.getItem('token')

//         if (!token) {
//           setError(
//             'Your session has expired. Please login again.'
//           )
//           return
//         }

//         const response =
//           await fetch(
//             `${API_URL}/seller-applications/my-application`,
//             {
//               method: 'GET',

//               headers: {
//                 Authorization:
//                   `Bearer ${token}`,
//               },
//             }
//           )

//         const data =
//           await response.json()

//         if (response.status === 401) {
//           localStorage.removeItem('token')
//           localStorage.removeItem('user')

//           setError(
//             'Your session has expired. Please login again.'
//           )

//           return
//         }

//         if (
//           response.status === 404
//         ) {
//           setSeller(null)
//           return
//         }

//         if (!response.ok) {
//           throw new Error(
//             data?.message ||
//               'Failed to load seller application.'
//           )
//         }

//         // Current backend returns:
//         //
//         // {
//         //   success: true,
//         //   seller
//         // }

//         setSeller(
//           data?.seller || null
//         )
//       } catch (error) {
//         console.error(
//           'Load seller application error:',
//           error
//         )

//         setError(
//           error.message ||
//             'Something went wrong while loading your application.'
//         )
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadApplication()
//   }, [])

//   // ============================================================
//   // LOADING
//   // ============================================================

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
//         <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
//           <Loader2 className="h-5 w-5 animate-spin text-gray-700" />

//           <span className="text-sm font-medium text-gray-700">
//             Loading application...
//           </span>
//         </div>
//       </div>
//     )
//   }

//   // ============================================================
//   // ERROR
//   // ============================================================

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 px-4 py-12">
//         <div className="mx-auto max-w-2xl rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
//           <XCircle className="mx-auto h-12 w-12 text-red-500" />

//           <h1 className="mt-5 text-2xl font-bold text-gray-900">
//             Unable to load application
//           </h1>

//           <p className="mt-2 text-sm text-red-600">
//             {error}
//           </p>

//           <Link
//             to="/seller/apply"
//             className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
//           >
//             Back to Application
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // ============================================================
//   // NO APPLICATION
//   // ============================================================

//   if (!seller) {
//     return (
//       <div className="min-h-screen bg-gray-50 px-4 py-12">
//         <div className="mx-auto max-w-2xl rounded-3xl border bg-white p-8 text-center shadow-sm">
//           <Store className="mx-auto h-12 w-12 text-gray-400" />

//           <h1 className="mt-5 text-2xl font-bold">
//             No application found
//           </h1>

//           <p className="mt-2 text-gray-500">
//             You have not submitted a seller application yet.
//           </p>

//           <Link
//             to="/seller/apply"
//             className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
//           >
//             Apply to Sell
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // ============================================================
//   // CURRENT SELLER STATUS
//   // ============================================================

//   const status =
//     seller.status || 'pending'

//   const statusConfig = {
//     pending: {
//       title: 'Application Pending',
//       description:
//         'Your application has been submitted and is waiting for admin review.',
//       icon: Clock3,
//       box: 'border-yellow-200 bg-yellow-50',
//       text: 'text-yellow-700',
//     },

//     approved: {
//       title: 'Application Approved',
//       description:
//         'Congratulations. Your seller account and store have been approved.',
//       icon: CheckCircle2,
//       box: 'border-green-200 bg-green-50',
//       text: 'text-green-700',
//     },

//     rejected: {
//       title: 'Application Rejected',
//       description:
//         'Your seller application was not approved.',
//       icon: XCircle,
//       box: 'border-red-200 bg-red-50',
//       text: 'text-red-700',
//     },

//     suspended: {
//       title: 'Seller Account Suspended',
//       description:
//         'Your seller account is currently suspended.',
//       icon: XCircle,
//       box: 'border-red-200 bg-red-50',
//       text: 'text-red-700',
//     },

//     inactive: {
//       title: 'Seller Account Inactive',
//       description:
//         'Your seller account is currently inactive.',
//       icon: Clock3,
//       box: 'border-gray-200 bg-gray-50',
//       text: 'text-gray-700',
//     },
//   }

//   const config =
//     statusConfig[status] ||
//     statusConfig.pending

//   const Icon = config.icon

//   const store =
//     seller.store || null

//   // ============================================================
//   // RENDER
//   // ============================================================

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6">
//       <div className="mx-auto max-w-3xl">
//         <Link
//           to="/"
//           className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back
//         </Link>

//         <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
//           {/* STATUS */}

//           <div
//             className={`rounded-2xl border p-6 ${config.box}`}
//           >
//             <div className="flex items-start gap-4">
//               <Icon
//                 className={`mt-0.5 h-7 w-7 ${config.text}`}
//               />

//               <div>
//                 <h1
//                   className={`text-xl font-bold ${config.text}`}
//                 >
//                   {config.title}
//                 </h1>

//                 <p className="mt-2 text-sm text-gray-700">
//                   {config.description}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* SELLER INFORMATION */}

//           <div className="mt-8 grid gap-5 sm:grid-cols-2">
//             <Info
//               label="Store Name"
//               value={
//                 store?.name ||
//                 '—'
//               }
//             />

//             <Info
//               label="Business Name"
//               value={
//                 seller.businessName
//               }
//             />

//             <Info
//               label="Business Email"
//               value={
//                 seller.email
//               }
//             />

//             <Info
//               label="Business Phone"
//               value={
//                 seller.phone
//               }
//             />

//             <Info
//               label="Address"
//               value={
//                 seller.address
//               }
//             />

//             <Info
//               label="Submitted"
//               value={
//                 seller.createdAt
//                   ? new Date(
//                       seller.createdAt
//                     ).toLocaleDateString()
//                   : '—'
//               }
//             />
//           </div>

//           {/* STORE */}

//           {store && (
//             <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">
//               <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
//                 Store Status
//               </p>

//               <p className="mt-2 font-semibold text-gray-900">
//                 {store.status || '—'}
//               </p>
//             </div>
//           )}

//           {/* APPROVED ACTIONS */}

//           {status === 'approved' && (
//             <div className="mt-8 grid gap-3 sm:grid-cols-3">
//               <Link
//                 to="/seller"
//                 className="rounded-xl bg-black px-5 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800"
//               >
//                 Seller Dashboard
//               </Link>

//               <Link
//                 to="/seller/store"
//                 className="rounded-xl border border-gray-300 px-5 py-3 text-center text-sm font-semibold hover:bg-gray-50"
//               >
//                 Manage Store
//               </Link>

//               {store?.slug && (
//                 <Link
//                   to={`/store/${store.slug}`}
//                   className="rounded-xl border border-gray-300 px-5 py-3 text-center text-sm font-semibold hover:bg-gray-50"
//                 >
//                   View My Store
//                 </Link>
//               )}
//             </div>
//           )}

//           {/* REJECTED */}

//           {status === 'rejected' && (
//             <div className="mt-8">
//               <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
//                 <p className="font-semibold text-red-800">
//                   Your application was rejected.
//                 </p>

//                 <p className="mt-2 text-sm text-red-700">
//                   Please review the information and submit a new application.
//                 </p>
//               </div>

//               <Link
//                 to="/seller/apply"
//                 className="mt-5 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
//               >
//                 Submit New Application
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// function Info({
//   label,
//   value,
// }) {
//   return (
//     <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
//       <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
//         {label}
//       </p>

//       <p className="mt-2 font-semibold text-gray-900">
//         {value || '—'}
//       </p>
//     </div>
//   )
// }

// export default SellerApplicationStatus


import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  XCircle,
  Store,
  Loader2,
} from 'lucide-react'

const API_URL =
  'https://fegegta-server.onrender.com/api'

function SellerApplicationStatus() {
  const [application, setApplication] =
    useState(null)

  const [seller, setSeller] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  // ============================================================
  // LOAD SELLER APPLICATION FROM BACKEND
  // ============================================================

  useEffect(() => {
    const loadApplication = async () => {
      try {
        setLoading(true)
        setError('')

        const token =
          localStorage.getItem('token')

        if (!token) {
          setError(
            'Your session has expired. Please login again.'
          )
          return
        }

        const response =
          await fetch(
            `${API_URL}/seller-applications/my-application`,
            {
              method: 'GET',

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          )

        let data = {}

        try {
          data = await response.json()
        } catch {
          data = {}
        }

        // ========================================================
        // AUTH ERROR
        // ========================================================

        if (response.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')

          setError(
            'Your session has expired. Please login again.'
          )

          return
        }

        // ========================================================
        // NO APPLICATION
        // ========================================================

        if (
          response.status === 404
        ) {
          setApplication(null)
          setSeller(null)
          return
        }

        if (!response.ok) {
          throw new Error(
            data?.message ||
              'Failed to load seller application.'
          )
        }

        // ========================================================
        // BACKEND RESPONSE
        //
        // {
        //   success: true,
        //   application,
        //   seller
        // }
        // ========================================================

        setApplication(
          data?.application || null
        )

        setSeller(
          data?.seller || null
        )
      } catch (error) {
        console.error(
          'Load seller application error:',
          error
        )

        setError(
          error.message ||
            'Something went wrong while loading your application.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadApplication()
  }, [])

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
          <Loader2 className="h-5 w-5 animate-spin text-gray-700" />

          <span className="text-sm font-medium text-gray-700">
            Loading application...
          </span>
        </div>
      </div>
    )
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <XCircle className="mx-auto h-12 w-12 text-red-500" />

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Unable to load application
          </h1>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <Link
            to="/seller/apply"
            className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
          >
            Back to Application
          </Link>
        </div>
      </div>
    )
  }

  // ============================================================
  // NO APPLICATION
  // ============================================================

  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-3xl border bg-white p-8 text-center shadow-sm">
          <Store className="mx-auto h-12 w-12 text-gray-400" />

          <h1 className="mt-5 text-2xl font-bold">
            No application found
          </h1>

          <p className="mt-2 text-gray-500">
            You have not submitted a seller application yet.
          </p>

          <Link
            to="/seller/apply"
            className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
          >
            Apply to Sell
          </Link>
        </div>
      </div>
    )
  }

  // ============================================================
  // CURRENT APPLICATION STATUS
  // ============================================================

  const status =
    application.status || 'pending'

  const statusConfig = {
    pending: {
      title: 'Application Pending',
      description:
        'Your application has been submitted and is waiting for admin review.',
      icon: Clock3,
      box: 'border-yellow-200 bg-yellow-50',
      text: 'text-yellow-700',
    },

    approved: {
      title: 'Application Approved',
      description:
        'Congratulations. Your seller account and store have been approved.',
      icon: CheckCircle2,
      box: 'border-green-200 bg-green-50',
      text: 'text-green-700',
    },

    rejected: {
      title: 'Application Rejected',
      description:
        'Your seller application was not approved.',
      icon: XCircle,
      box: 'border-red-200 bg-red-50',
      text: 'text-red-700',
    },
  }

  const config =
    statusConfig[status] ||
    statusConfig.pending

  const Icon = config.icon

  const store =
    seller?.store || null

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
          {/* STATUS */}

          <div
            className={`rounded-2xl border p-6 ${config.box}`}
          >
            <div className="flex items-start gap-4">
              <Icon
                className={`mt-0.5 h-7 w-7 ${config.text}`}
              />

              <div>
                <h1
                  className={`text-xl font-bold ${config.text}`}
                >
                  {config.title}
                </h1>

                <p className="mt-2 text-sm text-gray-700">
                  {config.description}
                </p>
              </div>
            </div>
          </div>

          {/* REJECTION REASON */}

          {status === 'rejected' &&
            application.rejectionReason && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-red-500">
                  Rejection Reason
                </p>

                <p className="mt-2 text-sm text-red-800">
                  {application.rejectionReason}
                </p>
              </div>
            )}

          {/* APPLICATION / SELLER INFORMATION */}

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Info
              label="Store Name"
              value={
                seller?.store?.name ||
                application.storeName
              }
            />

            <Info
              label="Business Name"
              value={
                seller?.businessName ||
                application.businessName
              }
            />

            <Info
              label="Business Email"
              value={
                seller?.email ||
                application.email
              }
            />

            <Info
              label="Business Phone"
              value={
                seller?.phone ||
                application.phone
              }
            />

            <Info
              label="Address"
              value={
                seller?.address ||
                application.address
              }
            />

            <Info
              label="Product Category"
              value={
                application.productCategory
              }
            />

            <Info
              label="Product Type"
              value={
                application.productType
              }

            />

            <Info
              label="Submitted"
              value={
                application.createdAt
                  ? new Date(
                      application.createdAt
                    ).toLocaleDateString()
                  : '—'
              }
            />
          </div>

          {/* STORE */}

          {store && (
            <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Store Status
              </p>

              <p className="mt-2 font-semibold text-gray-900">
                {store.status || '—'}
              </p>
            </div>
          )}

          {/* PENDING INFORMATION */}

          {status === 'pending' && (
            <div className="mt-8 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
              <p className="font-semibold text-yellow-800">
                Waiting for Admin Review
              </p>

              <p className="mt-2 text-sm text-yellow-700">
                Your application has been received successfully.
                An administrator will review your information
                before creating your seller account and store.
              </p>
            </div>
          )}

          {/* APPROVED ACTIONS */}

          {status === 'approved' && (
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Link
                to="/seller"
                className="rounded-xl bg-black px-5 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800"
              >
                Seller Dashboard
              </Link>

              <Link
                to="/seller/store"
                className="rounded-xl border border-gray-300 px-5 py-3 text-center text-sm font-semibold hover:bg-gray-50"
              >
                Manage Store
              </Link>

              {store?.slug && (
                <Link
                  to={`/store/${store.slug}`}
                  className="rounded-xl border border-gray-300 px-5 py-3 text-center text-sm font-semibold hover:bg-gray-50"
                >
                  View My Store
                </Link>
              )}
            </div>
          )}

          {/* REJECTED */}

          {status === 'rejected' && (
            <div className="mt-8">
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                <p className="font-semibold text-red-800">
                  Your application was rejected.
                </p>

                <p className="mt-2 text-sm text-red-700">
                  Please review the information and submit a new application.
                </p>
              </div>

              <Link
                to="/seller/apply"
                className="mt-5 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
              >
                Submit New Application
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Info({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-2 font-semibold text-gray-900">
        {value || '—'}
      </p>
    </div>
  )
}

export default SellerApplicationStatus