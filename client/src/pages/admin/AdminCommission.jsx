
// import React, { useEffect, useState } from 'react'
// import {
//   DollarSign,
//   Save,
//   Percent,
//   RefreshCw,
// } from 'lucide-react'

// import AdminSidebar from '../../components/admin/AdminSidebar'
// import AdminHeader from '../../components/admin/AdminHeader'

// const API_URL =
//   'https://fegegta-server.onrender.com/api'

// function AdminCommission() {
//   const [mobileOpen, setMobileOpen] = useState(false)

//   const [rate, setRate] = useState(10)

//   const [stats, setStats] = useState({
//     totalSales: 0,
//     commission: 0,
//     sellerEarnings: 0,
//   })

//   const [loading, setLoading] = useState(true)
//   const [saving, setSaving] = useState(false)
//   const [message, setMessage] = useState('')
//   const [error, setError] = useState('')

//   // ============================================================
//   // GET ADMIN TOKEN
//   // ============================================================

//   const getToken = () => {
//     return localStorage.getItem('token')
//   }

//   // ============================================================
//   // LOAD COMMISSION SETTINGS + COMMISSIONS
//   // ============================================================

//   const loadCommissionData = async () => {
//     try {
//       setLoading(true)
//       setError('')

//       const token = getToken()

//       if (!token) {
//         throw new Error(
//           'Admin authentication token not found. Please login again.'
//         )
//       }

//       // --------------------------------------------------------
//       // GET COMMISSION SETTINGS
//       // --------------------------------------------------------

//       const settingsResponse = await fetch(
//         `${API_URL}/commissions/settings`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )

//       const settingsData =
//         await settingsResponse.json()

//       if (!settingsResponse.ok) {
//         throw new Error(
//           settingsData.message ||
//             'Failed to load commission settings.'
//         )
//       }

//       setRate(
//         Number(
//           settingsData.settings?.commissionRate ?? 10
//         )
//       )

//       // --------------------------------------------------------
//       // GET ALL COMMISSIONS
//       // --------------------------------------------------------

//       const commissionsResponse = await fetch(
//         `${API_URL}/commissions`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )

//       const commissionsData =
//         await commissionsResponse.json()

//       if (!commissionsResponse.ok) {
//         throw new Error(
//           commissionsData.message ||
//             'Failed to load commissions.'
//         )
//       }

//       const commissions =
//         Array.isArray(
//           commissionsData.commissions
//         )
//           ? commissionsData.commissions
//           : []

//       // --------------------------------------------------------
//       // CALCULATE ADMIN STATISTICS
//       // --------------------------------------------------------

//       const calculatedStats =
//         commissions.reduce(
//           (result, commission) => {
//             result.totalSales += Number(
//               commission.orderAmount || 0
//             )

//             result.commission += Number(
//               commission.commissionAmount || 0
//             )

//             result.sellerEarnings += Number(
//               commission.sellerAmount || 0
//             )

//             return result
//           },
//           {
//             totalSales: 0,
//             commission: 0,
//             sellerEarnings: 0,
//           }
//         )

//       setStats(calculatedStats)
//     } catch (err) {
//       console.error(
//         'Load commission data error:',
//         err
//       )

//       setError(
//         err.message ||
//           'Failed to load commission data.'
//       )
//     } finally {
//       setLoading(false)
//     }
//   }

//   // ============================================================
//   // INITIAL LOAD
//   // ============================================================

//   useEffect(() => {
//     loadCommissionData()
//   }, [])

//   // ============================================================
//   // SAVE COMMISSION RATE
//   // ============================================================

//   const handleSave = async () => {
//     try {
//       setMessage('')
//       setError('')

//       const numericRate = Number(rate)

//       if (
//         !Number.isFinite(numericRate) ||
//         numericRate < 0 ||
//         numericRate > 100
//       ) {
//         setError(
//           'Commission rate must be between 0 and 100.'
//         )
//         return
//       }

//       const token = getToken()

//       if (!token) {
//         setError(
//           'Admin authentication token not found. Please login again.'
//         )
//         return
//       }

//       setSaving(true)

//       const response = await fetch(
//         `${API_URL}/commissions/settings`,
//         {
//           method: 'PUT',

//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },

//           body: JSON.stringify({
//             commissionRate: numericRate,
//           }),
//         }
//       )

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(
//           data.message ||
//             'Failed to update commission rate.'
//         )
//       }

//       setRate(
//         Number(
//           data.settings?.commissionRate ??
//             numericRate
//         )
//       )

//       setMessage(
//         data.message ||
//           'Commission rate updated successfully.'
//       )

//       // Refresh statistics
//       await loadCommissionData()

//       setTimeout(() => {
//         setMessage('')
//       }, 3000)
//     } catch (err) {
//       console.error(
//         'Save commission error:',
//         err
//       )

//       setError(
//         err.message ||
//           'Failed to update commission rate.'
//       )
//     } finally {
//       setSaving(false)
//     }
//   }

//   // ============================================================
//   // EXAMPLE
//   // ============================================================

//   const exampleSale = 100

//   const exampleCommission =
//     exampleSale *
//     (Number(rate || 0) / 100)

//   const sellerReceives =
//     exampleSale - exampleCommission

//   // ============================================================
//   // RENDER
//   // ============================================================

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <AdminSidebar
//         mobileOpen={mobileOpen}
//         onClose={() => setMobileOpen(false)}
//       />

//       <div className="lg:pl-72">
//         <AdminHeader
//           onMenuClick={() =>
//             setMobileOpen(true)
//           }
//         />

//         <main className="p-4 sm:p-6 lg:p-8">

//           {/* ==================================================
//               HEADER
//           ================================================== */}

//           <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 Commission
//               </h1>

//               <p className="mt-1 text-sm text-gray-500">
//                 Manage the platform commission charged to sellers.
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={loadCommissionData}
//               disabled={loading}
//               className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               <RefreshCw
//                 size={17}
//                 className={
//                   loading
//                     ? 'animate-spin'
//                     : ''
//                 }
//               />

//               Refresh
//             </button>
//           </div>

//           {/* ==================================================
//               ERROR
//           ================================================== */}

//           {error && (
//             <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//               {error}
//             </div>
//           )}

//           {/* ==================================================
//               SUCCESS
//           ================================================== */}

//           {message && (
//             <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
//               {message}
//             </div>
//           )}

//           {/* ==================================================
//               MAIN CARDS
//           ================================================== */}

//           <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

//             {/* =================================================
//                 COMMISSION RATE
//             ================================================= */}

//             <section className="rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-2">
//               <div className="flex items-center gap-3">

//                 <div className="rounded-xl bg-gray-100 p-3">
//                   <Percent size={22} />
//                 </div>

//                 <div>
//                   <h2 className="font-bold text-gray-900">
//                     Commission Rate
//                   </h2>

//                   <p className="text-sm text-gray-500">
//                     This rate is used to calculate seller earnings.
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-6 max-w-md">

//                 <label className="text-sm font-semibold text-gray-700">
//                   Commission percentage
//                 </label>

//                 <div className="mt-2 flex">

//                   <input
//                     type="number"
//                     min="0"
//                     max="100"
//                     step="0.01"
//                     value={rate}
//                     onChange={(e) =>
//                       setRate(e.target.value)
//                     }
//                     disabled={
//                       loading || saving
//                     }
//                     className="w-full rounded-l-xl border border-gray-200 px-4 py-3 outline-none focus:border-gray-400 disabled:bg-gray-50"
//                   />

//                   <div className="flex items-center rounded-r-xl border border-l-0 border-gray-200 bg-gray-50 px-5 font-semibold">
//                     %
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={handleSave}
//                   disabled={
//                     loading || saving
//                   }
//                   className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {saving ? (
//                     <>
//                       <RefreshCw
//                         size={17}
//                         className="animate-spin"
//                       />

//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <Save size={17} />

//                       Save Commission
//                     </>
//                   )}
//                 </button>
//               </div>
//             </section>

//             {/* =================================================
//                 EXAMPLE
//             ================================================= */}

//             <section className="rounded-2xl border border-gray-200 bg-white p-6">

//               <h2 className="font-bold text-gray-900">
//                 Example
//               </h2>

//               <p className="mt-1 text-sm text-gray-500">
//                 For a €100 seller sale:
//               </p>

//               <div className="mt-5 space-y-4">

//                 <Value
//                   label="Sale"
//                   value="€100.00"
//                 />

//                 <Value
//                   label="Platform commission"
//                   value={`€${exampleCommission.toFixed(2)}`}
//                 />

//                 <Value
//                   label="Seller receives"
//                   value={`€${sellerReceives.toFixed(2)}`}
//                 />

//               </div>
//             </section>
//           </div>

//           {/* ==================================================
//               STATISTICS
//           ================================================== */}

//           <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

//             <Stat
//               icon={DollarSign}
//               label="Gross Sales"
//               value={`€${Number(
//                 stats.totalSales || 0
//               ).toFixed(2)}`}
//             />

//             <Stat
//               icon={Percent}
//               label="Commission"
//               value={`€${Number(
//                 stats.commission || 0
//               ).toFixed(2)}`}
//             />

//             <Stat
//               icon={DollarSign}
//               label="Seller Earnings"
//               value={`€${Number(
//                 stats.sellerEarnings || 0
//               ).toFixed(2)}`}
//             />

//           </section>

//         </main>
//       </div>
//     </div>
//   )
// }

// // ============================================================
// // VALUE
// // ============================================================

// function Value({
//   label,
//   value,
// }) {
//   return (
//     <div className="flex items-center justify-between border-b border-gray-100 pb-3">

//       <span className="text-sm text-gray-500">
//         {label}
//       </span>

//       <span className="font-bold text-gray-900">
//         {value}
//       </span>

//     </div>
//   )
// }

// // ============================================================
// // STAT
// // ============================================================

// function Stat({
//   icon: Icon,
//   label,
//   value,
// }) {
//   return (
//     <div className="rounded-2xl border border-gray-200 bg-white p-5">

//       <Icon
//         size={20}
//         className="text-gray-500"
//       />

//       <p className="mt-4 text-sm text-gray-500">
//         {label}
//       </p>

//       <p className="mt-1 text-xl font-bold">
//         {value}
//       </p>

//     </div>
//   )
// }

// export default AdminCommission

import React, { useEffect, useState } from 'react'
import {
  DollarSign,
  Save,
  Percent,
  RefreshCw,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
} from 'lucide-react'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'

const API_URL =
  'https://fegegta-server.onrender.com/api'

function AdminCommission() {
  const [mobileOpen, setMobileOpen] =
    useState(false)

  const [rate, setRate] = useState(10)

  const [stats, setStats] = useState({
    totalSales: 0,
    commission: 0,
    sellerEarnings: 0,
  })

  const [commissions, setCommissions] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [payingId, setPayingId] =
    useState(null)

  const [message, setMessage] =
    useState('')

  const [error, setError] =
    useState('')

  // ============================================================
  // GET ADMIN TOKEN
  // ============================================================

  const getToken = () => {
    return localStorage.getItem('token')
  }

  // ============================================================
  // LOAD COMMISSION DATA
  // ============================================================

  const loadCommissionData = async () => {
    try {
      setLoading(true)
      setError('')

      const token = getToken()

      if (!token) {
        throw new Error(
          'Admin authentication token not found. Please login again.'
        )
      }

      // ========================================================
      // GET COMMISSION SETTINGS
      // ========================================================

      const settingsResponse =
        await fetch(
          `${API_URL}/commissions/settings`,
          {
            method: 'GET',

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

      const settingsData =
        await settingsResponse.json()

      if (!settingsResponse.ok) {
        throw new Error(
          settingsData.message ||
            'Failed to load commission settings.'
        )
      }

      setRate(
        Number(
          settingsData.settings
            ?.commissionRate ?? 10
        )
      )

      // ========================================================
      // GET ALL COMMISSIONS
      // ========================================================

      const commissionsResponse =
        await fetch(
          `${API_URL}/commissions`,
          {
            method: 'GET',

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

      const commissionsData =
        await commissionsResponse.json()

      if (!commissionsResponse.ok) {
        throw new Error(
          commissionsData.message ||
            'Failed to load commissions.'
        )
      }

      const loadedCommissions =
        Array.isArray(
          commissionsData.commissions
        )
          ? commissionsData.commissions
          : []

      setCommissions(
        loadedCommissions
      )

      // ========================================================
      // CALCULATE STATISTICS
      // ========================================================

      const calculatedStats =
        loadedCommissions.reduce(
          (
            result,
            commission
          ) => {
            result.totalSales +=
              Number(
                commission.orderAmount ||
                  0
              )

            result.commission +=
              Number(
                commission.commissionAmount ||
                  0
              )

            result.sellerEarnings +=
              Number(
                commission.sellerAmount ||
                  0
              )

            return result
          },
          {
            totalSales: 0,
            commission: 0,
            sellerEarnings: 0,
          }
        )

      setStats(
        calculatedStats
      )
    } catch (err) {
      console.error(
        'Load commission data error:',
        err
      )

      setError(
        err.message ||
          'Failed to load commission data.'
      )
    } finally {
      setLoading(false)
    }
  }

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    loadCommissionData()
  }, [])

  // ============================================================
  // SAVE COMMISSION RATE
  // ============================================================

  const handleSave = async () => {
    try {
      setMessage('')
      setError('')

      const numericRate =
        Number(rate)

      if (
        !Number.isFinite(
          numericRate
        ) ||
        numericRate < 0 ||
        numericRate > 100
      ) {
        setError(
          'Commission rate must be between 0 and 100.'
        )

        return
      }

      const token = getToken()

      if (!token) {
        setError(
          'Admin authentication token not found. Please login again.'
        )

        return
      }

      setSaving(true)

      const response =
        await fetch(
          `${API_URL}/commissions/settings`,
          {
            method: 'PUT',

            headers: {
              'Content-Type':
                'application/json',

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              commissionRate:
                numericRate,
            }),
          }
        )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Failed to update commission rate.'
        )
      }

      setRate(
        Number(
          data.settings
            ?.commissionRate ??
            numericRate
        )
      )

      setMessage(
        data.message ||
          'Commission rate updated successfully.'
      )

      await loadCommissionData()

      setTimeout(() => {
        setMessage('')
      }, 3000)
    } catch (err) {
      console.error(
        'Save commission error:',
        err
      )

      setError(
        err.message ||
          'Failed to update commission rate.'
      )
    } finally {
      setSaving(false)
    }
  }

  // ============================================================
  // MARK COMMISSION AS PAID
  // ============================================================

  const handleMarkAsPaid = async (
    commissionId
  ) => {
    try {
      setMessage('')
      setError('')

      const token = getToken()

      if (!token) {
        setError(
          'Admin authentication token not found. Please login again.'
        )

        return
      }

      setPayingId(
        commissionId
      )

      const response =
        await fetch(
          `${API_URL}/commissions/${commissionId}/paid`,
          {
            method: 'PUT',

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Failed to mark commission as paid.'
        )
      }

      setMessage(
        data.message ||
          'Commission marked as paid successfully.'
      )

      // Refresh everything
      await loadCommissionData()

      setTimeout(() => {
        setMessage('')
      }, 3000)
    } catch (err) {
      console.error(
        'Mark commission paid error:',
        err
      )

      setError(
        err.message ||
          'Failed to mark commission as paid.'
      )
    } finally {
      setPayingId(null)
    }
  }

  // ============================================================
  // EXAMPLE
  // ============================================================

  const exampleSale = 100

  const exampleCommission =
    exampleSale *
    (Number(rate || 0) / 100)

  const sellerReceives =
    exampleSale -
    exampleCommission

  // ============================================================
  // FORMAT MONEY
  // ============================================================

  const formatMoney = (
    value
  ) => {
    return `€${Number(
      value || 0
    ).toFixed(2)}`
  }

  // ============================================================
  // FORMAT DATE
  // ============================================================

  const formatDate = (
    value
  ) => {
    if (!value) {
      return '—'
    }

    const date =
      new Date(value)

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return '—'
    }

    return date.toLocaleDateString(
      'en-GB',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }
    )
  }

  // ============================================================
  // STATUS
  // ============================================================

  const getStatusConfig = (
    status
  ) => {
    if (
      status === 'paid'
    ) {
      return {
        label: 'Paid',
        icon: CheckCircle,
        className:
          'bg-green-50 text-green-700 border-green-200',
      }
    }

    if (
      status === 'cancelled'
    ) {
      return {
        label: 'Cancelled',
        icon: XCircle,
        className:
          'bg-red-50 text-red-700 border-red-200',
      }
    }

    return {
      label: 'Pending',
      icon: Clock,
      className:
        'bg-yellow-50 text-yellow-700 border-yellow-200',
    }
  }

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar
        mobileOpen={
          mobileOpen
        }
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

        <main className="p-4 sm:p-6 lg:p-8">

          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Commission
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage platform commission, seller earnings, and commission payments.
              </p>
            </div>

            <button
              type="button"
              onClick={
                loadCommissionData
              }
              disabled={
                loading
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={17}
                className={
                  loading
                    ? 'animate-spin'
                    : ''
                }
              />

              Refresh
            </button>
          </div>

          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* ==================================================
              SUCCESS
          ================================================== */}

          {message && (
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {message}
            </div>
          )}

          {/* ==================================================
              MAIN CARDS
          ================================================== */}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            {/* =================================================
                COMMISSION RATE
            ================================================= */}

            <section className="rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-2">
              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-gray-100 p-3">
                  <Percent
                    size={22}
                  />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Commission Rate
                  </h2>

                  <p className="text-sm text-gray-500">
                    This rate is used for new orders.
                  </p>
                </div>
              </div>

              <div className="mt-6 max-w-md">

                <label className="text-sm font-semibold text-gray-700">
                  Commission percentage
                </label>

                <div className="mt-2 flex">

                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={
                      rate
                    }
                    onChange={(
                      e
                    ) =>
                      setRate(
                        e.target.value
                      )
                    }
                    disabled={
                      loading ||
                      saving
                    }
                    className="w-full rounded-l-xl border border-gray-200 px-4 py-3 outline-none focus:border-gray-400 disabled:bg-gray-50"
                  />

                  <div className="flex items-center rounded-r-xl border border-l-0 border-gray-200 bg-gray-50 px-5 font-semibold">
                    %
                  </div>
                </div>

                <button
                  type="button"
                  onClick={
                    handleSave
                  }
                  disabled={
                    loading ||
                    saving
                  }
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <RefreshCw
                        size={17}
                        className="animate-spin"
                      />

                      Saving...
                    </>
                  ) : (
                    <>
                      <Save
                        size={17}
                      />

                      Save Commission
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* =================================================
                EXAMPLE
            ================================================= */}

            <section className="rounded-2xl border border-gray-200 bg-white p-6">

              <h2 className="font-bold text-gray-900">
                Example
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                For a €100 seller sale:
              </p>

              <div className="mt-5 space-y-4">

                <Value
                  label="Sale"
                  value="€100.00"
                />

                <Value
                  label="Platform commission"
                  value={formatMoney(
                    exampleCommission
                  )}
                />

                <Value
                  label="Seller receives"
                  value={formatMoney(
                    sellerReceives
                  )}
                />

              </div>
            </section>
          </div>

          {/* ==================================================
              STATISTICS
          ================================================== */}

          <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

            <Stat
              icon={
                DollarSign
              }
              label="Gross Sales"
              value={formatMoney(
                stats.totalSales
              )}
            />

            <Stat
              icon={
                Percent
              }
              label="Commission"
              value={formatMoney(
                stats.commission
              )}
            />

            <Stat
              icon={
                DollarSign
              }
              label="Seller Earnings"
              value={formatMoney(
                stats.sellerEarnings
              )}
            />

          </section>

          {/* ==================================================
              COMMISSION LIST
          ================================================== */}

          <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white">

            {/* =================================================
                LIST HEADER
            ================================================= */}

            <div className="border-b border-gray-200 px-5 py-5 sm:px-6">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Commission Transactions
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    View seller commissions and payment status.
                  </p>
                </div>

                <div className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700">
                  {commissions.length}{' '}
                  transaction
                  {commissions.length !==
                  1
                    ? 's'
                    : ''}
                </div>

              </div>

            </div>

            {/* =================================================
                EMPTY
            ================================================= */}

            {!loading &&
              commissions.length ===
                0 && (
                <div className="px-6 py-14 text-center">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                    <CreditCard
                      size={25}
                      className="text-gray-500"
                    />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-gray-900">
                    No commission transactions
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Commission records will appear here after customers place orders.
                  </p>

                </div>
              )}

            {/* =================================================
                DESKTOP TABLE
            ================================================= */}

            {commissions.length >
              0 && (
              <div className="hidden overflow-x-auto lg:block">

                <table className="min-w-full">

                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-left">

                      <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                        Seller
                      </th>

                      <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                        Order
                      </th>

                      <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                        Sale
                      </th>

                      <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                        Rate
                      </th>

                      <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                        Commission
                      </th>

                      <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                        Seller Amount
                      </th>

                      <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                        Status
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-gray-500">
                        Action
                      </th>

                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">

                    {commissions.map(
                      (
                        commission
                      ) => {
                        const status =
                          getStatusConfig(
                            commission.status
                          )

                        const StatusIcon =
                          status.icon

                        return (
                          <tr
                            key={
                              commission._id
                            }
                            className="transition hover:bg-gray-50"
                          >

                            {/* SELLER */}

                            <td className="px-5 py-4">

                              <div className="font-semibold text-gray-900">
                                {commission
                                  .seller
                                  ?.businessName ||
                                  'Unknown Seller'}
                              </div>

                              <div className="mt-1 text-xs text-gray-500">
                                {commission
                                  .seller
                                  ?.email ||
                                  '—'}
                              </div>

                            </td>

                            {/* ORDER */}

                            <td className="px-5 py-4">

                              <div className="font-semibold text-gray-900">
                                {commission
                                  .orderNumber ||
                                  commission
                                    .order
                                    ?.orderNumber ||
                                  '—'}
                              </div>

                              <div className="mt-1 text-xs text-gray-500">
                                {formatDate(
                                  commission.createdAt
                                )}
                              </div>

                            </td>

                            {/* SALE */}

                            <td className="px-5 py-4 font-semibold text-gray-900">
                              {formatMoney(
                                commission.orderAmount
                              )}
                            </td>

                            {/* RATE */}

                            <td className="px-5 py-4">

                              <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-sm font-semibold text-gray-700">
                                {Number(
                                  commission.commissionRate ||
                                    0
                                ).toFixed(
                                  2
                                )}
                                %
                              </span>

                            </td>

                            {/* COMMISSION */}

                            <td className="px-5 py-4 font-semibold text-gray-900">
                              {formatMoney(
                                commission.commissionAmount
                              )}
                            </td>

                            {/* SELLER AMOUNT */}

                            <td className="px-5 py-4 font-semibold text-gray-900">
                              {formatMoney(
                                commission.sellerAmount
                              )}
                            </td>

                            {/* STATUS */}

                            <td className="px-5 py-4">

                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${status.className}`}
                              >
                                <StatusIcon
                                  size={
                                    14
                                  }
                                />

                                {
                                  status.label
                                }
                              </span>

                            </td>

                            {/* ACTION */}

                            <td className="px-5 py-4 text-right">

                              {commission.status ===
                              'pending' ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleMarkAsPaid(
                                      commission._id
                                    )
                                  }
                                  disabled={
                                    payingId ===
                                    commission._id
                                  }
                                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  {payingId ===
                                  commission._id ? (
                                    <>
                                      <RefreshCw
                                        size={
                                          14
                                        }
                                        className="animate-spin"
                                      />

                                      Paying...
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle
                                        size={
                                          14
                                        }
                                      />

                                      Mark as Paid
                                    </>
                                  )}
                                </button>
                              ) : (
                                <span className="text-xs text-gray-400">
                                  —
                                </span>
                              )}

                            </td>

                          </tr>
                        )
                      }
                    )}

                  </tbody>

                </table>

              </div>
            )}

            {/* =================================================
                MOBILE COMMISSION CARDS
            ================================================= */}

            {commissions.length >
              0 && (
              <div className="divide-y divide-gray-100 lg:hidden">

                {commissions.map(
                  (
                    commission
                  ) => {
                    const status =
                      getStatusConfig(
                        commission.status
                      )

                    const StatusIcon =
                      status.icon

                    return (
                      <div
                        key={
                          commission._id
                        }
                        className="p-5"
                      >

                        {/* TOP */}

                        <div className="flex items-start justify-between gap-3">

                          <div>
                            <h3 className="font-bold text-gray-900">
                              {commission
                                .seller
                                ?.businessName ||
                                'Unknown Seller'}
                            </h3>

                            <p className="mt-1 text-xs text-gray-500">
                              {commission
                                .seller
                                ?.email ||
                                '—'}
                            </p>
                          </div>

                          <span
                            className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${status.className}`}
                          >
                            <StatusIcon
                              size={
                                13
                              }
                            />

                            {
                              status.label
                            }
                          </span>

                        </div>

                        {/* DETAILS */}

                        <div className="mt-5 grid grid-cols-2 gap-4">

                          <MobileValue
                            label="Order"
                            value={
                              commission
                                .orderNumber ||
                              commission
                                .order
                                ?.orderNumber ||
                              '—'
                            }
                          />

                          <MobileValue
                            label="Date"
                            value={formatDate(
                              commission.createdAt
                            )}
                          />

                          <MobileValue
                            label="Sale"
                            value={formatMoney(
                              commission.orderAmount
                            )}
                          />

                          <MobileValue
                            label="Rate"
                            value={`${Number(
                              commission.commissionRate ||
                                0
                            ).toFixed(
                              2
                            )}%`}
                          />

                          <MobileValue
                            label="Commission"
                            value={formatMoney(
                              commission.commissionAmount
                            )}
                          />

                          <MobileValue
                            label="Seller Amount"
                            value={formatMoney(
                              commission.sellerAmount
                            )}
                          />

                        </div>

                        {/* ACTION */}

                        {commission.status ===
                          'pending' && (
                          <button
                            type="button"
                            onClick={() =>
                              handleMarkAsPaid(
                                commission._id
                              )
                            }
                            disabled={
                              payingId ===
                              commission._id
                            }
                            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {payingId ===
                            commission._id ? (
                              <>
                                <RefreshCw
                                  size={
                                    16
                                  }
                                  className="animate-spin"
                                />

                                Processing...
                              </>
                            ) : (
                              <>
                                <CheckCircle
                                  size={
                                    16
                                  }
                                />

                                Mark as Paid
                              </>
                            )}
                          </button>
                        )}

                      </div>
                    )
                  }
                )}

              </div>
            )}

          </section>

        </main>
      </div>
    </div>
  )
}

// ============================================================
// VALUE
// ============================================================

function Value({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 pb-3">

      <span className="text-sm text-gray-500">
        {label}
      </span>

      <span className="font-bold text-gray-900">
        {value}
      </span>

    </div>
  )
}

// ============================================================
// STAT
// ============================================================

function Stat({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">

      <Icon
        size={20}
        className="text-gray-500"
      />

      <p className="mt-4 text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold text-gray-900">
        {value}
      </p>

    </div>
  )
}

// ============================================================
// MOBILE VALUE
// ============================================================

function MobileValue({
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">

      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-gray-900">
        {value}
      </p>

    </div>
  )
}

export default AdminCommission