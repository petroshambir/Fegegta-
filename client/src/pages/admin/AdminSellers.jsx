import React, { useEffect, useState } from 'react'
import {
  Search,
  Check,
  X,
  ShieldCheck,
  ShieldOff,
  Store,
  Eye,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import {
  getAllSellerApplications,
  getAllSellerStores,
  approveSeller,
  rejectSeller,
  setSellerStoreStatus,
  setSellerVerification,
} from '../../utils/adminStorage'

function AdminSellers() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [applications, setApplications] = useState([])
  const [stores, setStores] = useState([])
  const [search, setSearch] = useState('')

  const load = () => {
    setApplications(getAllSellerApplications())
    setStores(getAllSellerStores())
  }

  useEffect(() => {
    load()
  }, [])

  const getStore = (sellerId) =>
    stores.find(
      (store) => store.sellerId === sellerId
    )

  const filtered = applications.filter((seller) =>
    `${seller.name || ''} ${seller.email || ''} ${
      seller.storeName || ''
    }`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const handleApprove = (id) => {
    approveSeller(id)
    load()
  }

  const handleReject = (id) => {
    const reason = window.prompt(
      'Enter rejection reason:'
    )

    if (reason === null) return

    rejectSeller(id, reason)
    load()
  }

  const handleVerify = (store) => {
    setSellerVerification(
      store.id,
      !store.verified
    )

    load()
  }

  const handleStoreStatus = (store, status) => {
    setSellerStoreStatus(store.id, status)
    load()
  }

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
              Sellers
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Review sellers, stores and verification.
            </p>
          </div>

          <div className="mb-5 relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sellers..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-gray-400"
            />
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-[1100px] w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
                      Seller
                    </th>

                    <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
                      Store
                    </th>

                    <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
                      Application
                    </th>

                    <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
                      Store Status
                    </th>

                    <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
                      Verification
                    </th>

                    <th className="px-5 py-4 text-right text-xs uppercase text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filtered.map((seller) => {
                    const store = getStore(
                      seller.sellerId ||
                        seller.userId ||
                        seller.id
                    )

                    return (
                      <tr key={seller.id}>
                        <td className="px-5 py-4">
                          <p className="font-semibold text-gray-900">
                            {seller.name ||
                              seller.fullName ||
                              'Seller'}
                          </p>

                          <p className="text-xs text-gray-500">
                            {seller.email || '—'}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <Store size={17} className="text-gray-400" />

                            <span className="text-sm text-gray-700">
                              {seller.storeName ||
                                store?.storeName ||
                                '—'}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge
                            status={seller.status}
                          />
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge
                            status={
                              store?.status ||
                              'pending'
                            }
                          />
                        </td>

                        <td className="px-5 py-4">
                          {store?.verified ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                              <ShieldCheck size={14} />
                              Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                              <ShieldOff size={14} />
                              Unverified
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <Link
                              to={`/admin/sellers/${seller.id}`}
                              className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
                            >
                              <Eye size={17} />
                            </Link>

                            {seller.status === 'pending' && (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleApprove(
                                      seller.id
                                    )
                                  }
                                  className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
                                  title="Approve"
                                >
                                  <Check size={17} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleReject(
                                      seller.id
                                    )
                                  }
                                  className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                                  title="Reject"
                                >
                                  <X size={17} />
                                </button>
                              </>
                            )}

                            {store && (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleVerify(store)
                                  }
                                  className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
                                  title={
                                    store.verified
                                      ? 'Unverify'
                                      : 'Verify'
                                  }
                                >
                                  {store.verified ? (
                                    <ShieldOff size={17} />
                                  ) : (
                                    <ShieldCheck size={17} />
                                  )}
                                </button>

                                <select
                                  value={
                                    store.status ||
                                    'pending'
                                  }
                                  onChange={(e) =>
                                    handleStoreStatus(
                                      store,
                                      e.target.value
                                    )
                                  }
                                  className="rounded-lg border border-gray-200 px-2 text-xs outline-none"
                                >
                                  <option value="pending">
                                    Pending
                                  </option>

                                  <option value="approved">
                                    Approved
                                  </option>

                                  <option value="suspended">
                                    Suspended
                                  </option>

                                  <option value="rejected">
                                    Rejected
                                  </option>
                                </select>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <div className="p-12 text-center text-sm text-gray-500">
                No sellers found.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const styles = {
    pending: 'bg-yellow-50 text-yellow-700',
    approved: 'bg-green-50 text-green-700',
    rejected: 'bg-red-50 text-red-700',
    suspended: 'bg-gray-100 text-gray-700',
  }

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] ||
        'bg-gray-100 text-gray-600'
      }`}
    >
      {status || 'Unknown'}
    </span>
  )
}

export default AdminSellers