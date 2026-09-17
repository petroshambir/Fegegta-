import React, { useEffect, useState } from 'react'
import {
  Check,
  X,
  Search,
  Package,
} from 'lucide-react'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import {
  getAllSellerProducts,
  approveSellerProduct,
  rejectSellerProduct,
} from '../../utils/adminStorage'

function AdminSellerProducts() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const load = () => {
    setProducts(getAllSellerProducts())
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = products.filter((product) => {
    const matchesSearch =
      `${product.name || ''} ${
        product.category || ''
      } ${product.sellerId || ''}`
        .toLowerCase()
        .includes(search.toLowerCase())

    const matchesStatus =
      status === 'all' ||
      product.status === status

    return matchesSearch && matchesStatus
  })

  const handleApprove = (id) => {
    approveSellerProduct(id)
    load()
  }

  const handleReject = (id) => {
    const reason = window.prompt(
      'Enter rejection reason:'
    )

    if (reason === null) return

    rejectSellerProduct(id, reason)
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
              Seller Products
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Review and approve products submitted by sellers.
            </p>
          </div>

          <div className="mb-5 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search seller products..."
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none"
              />
            </div>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-[1000px] w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
                      Product
                    </th>

                    <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
                      Seller
                    </th>

                    <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
                      Price
                    </th>

                    <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
                      Images
                    </th>

                    <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs uppercase text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filtered.map((product) => (
                    <tr key={product.id}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {product.images?.[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-14 w-14 rounded-xl object-cover"
                            />
                          ) : (
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100">
                              <Package size={20} />
                            </div>
                          )}

                          <div>
                            <p className="font-semibold text-gray-900">
                              {product.name}
                            </p>

                            <p className="text-xs text-gray-500">
                              {product.category || '—'}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {product.sellerId || '—'}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold">
                        €{Number(product.price || 0).toFixed(2)}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {product.images?.length || 0}/4
                      </td>

                      <td className="px-5 py-4">
                        <Status status={product.status} />
                      </td>

                      <td className="px-5 py-4">
                        {product.status === 'pending' && (
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleApprove(
                                  product.id
                                )
                              }
                              className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
                            >
                              <Check size={17} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleReject(
                                  product.id
                                )
                              }
                              className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                            >
                              <X size={17} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <div className="p-12 text-center text-sm text-gray-500">
                No seller products found.
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
    approved: 'bg-green-50 text-green-700',
    rejected: 'bg-red-50 text-red-700',
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] ||
        'bg-gray-100 text-gray-600'
      }`}
    >
      {status || 'unknown'}
    </span>
  )
}

export default AdminSellerProducts