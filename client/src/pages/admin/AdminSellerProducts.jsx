
import React, { useEffect, useMemo, useState } from 'react'
import {
  Check,
  X,
  Search,
  Package,
  RefreshCw,
  Loader2,
  AlertCircle,
} from 'lucide-react'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'

const API_URL =
  'https://fegegta-server.onrender.com/api'

const getToken = () => {
  return localStorage.getItem('token')
}

function AdminSellerProducts() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const [products, setProducts] = useState([])

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const [actionLoading, setActionLoading] =
    useState(null)

  const [error, setError] = useState('')

  // ============================================================
  // LOAD SELLER PRODUCTS
  // ============================================================

  const loadProducts = async ({
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
        `${API_URL}/admin/products`,
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
            'Failed to load seller products.'
        )
      }

      if (data?.success === false) {
        throw new Error(
          data?.message ||
            'Failed to load seller products.'
        )
      }

      // --------------------------------------------------------
      // SUPPORT POSSIBLE RESPONSE STRUCTURES
      // --------------------------------------------------------

      const allProducts =
        Array.isArray(data?.products)
          ? data.products
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.data?.products)
          ? data.data.products
          : []

      // --------------------------------------------------------
      // ONLY SELLER PRODUCTS
      // --------------------------------------------------------
      //
      // Admin-created products normally have no seller.
      // Seller products have seller information.
      //
      // --------------------------------------------------------

      const sellerProducts =
        allProducts.filter((product) => {
          return Boolean(
            product?.seller ||
              product?.sellerId ||
              product?.seller?._id
          )
        })

      setProducts(sellerProducts)
    } catch (error) {
      console.error(
        'Load seller products error:',
        error
      )

      setError(
        error?.message ||
          'Something went wrong while loading seller products.'
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
    loadProducts()
  }, [])

  // ============================================================
  // APPROVE PRODUCT
  // ============================================================

  const handleApprove = async (product) => {
    const productId =
      product?._id || product?.id

    if (!productId) {
      setError('Product ID was not found.')
      return
    }

    try {
      setActionLoading(
        `approve-${productId}`
      )

      setError('')

      const token = getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found. Please login again.'
        )
      }

      const response = await fetch(
        `${API_URL}/admin/products/${productId}/approve`,
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
            'Failed to approve product.'
        )
      }

      if (data?.success === false) {
        throw new Error(
          data?.message ||
            'Failed to approve product.'
        )
      }

      // Update immediately
      setProducts((currentProducts) =>
        currentProducts.map((item) => {
          const itemId =
            item?._id || item?.id

          if (
            String(itemId) !==
            String(productId)
          ) {
            return item
          }

          return {
            ...item,
            approvalStatus: 'approved',
            status: 'approved',
          }
        })
      )
    } catch (error) {
      console.error(
        'Approve seller product error:',
        error
      )

      setError(
        error?.message ||
          'Failed to approve product.'
      )
    } finally {
      setActionLoading(null)
    }
  }

  // ============================================================
  // REJECT PRODUCT
  // ============================================================

  const handleReject = async (product) => {
    const productId =
      product?._id || product?.id

    if (!productId) {
      setError('Product ID was not found.')
      return
    }

    const reason = window.prompt(
      'Enter rejection reason:'
    )

    if (reason === null) {
      return
    }

    const trimmedReason =
      reason.trim()

    if (!trimmedReason) {
      setError(
        'Rejection reason is required.'
      )
      return
    }

    try {
      setActionLoading(
        `reject-${productId}`
      )

      setError('')

      const token = getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found. Please login again.'
        )
      }

      const response = await fetch(
        `${API_URL}/admin/products/${productId}/reject`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reason: trimmedReason,
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
            'Failed to reject product.'
        )
      }

      if (data?.success === false) {
        throw new Error(
          data?.message ||
            'Failed to reject product.'
        )
      }

      // Update immediately
      setProducts((currentProducts) =>
        currentProducts.map((item) => {
          const itemId =
            item?._id || item?.id

          if (
            String(itemId) !==
            String(productId)
          ) {
            return item
          }

          return {
            ...item,
            approvalStatus: 'rejected',
            status: 'rejected',
            rejectionReason:
              data?.product?.rejectionReason ||
              trimmedReason,
          }
        })
      )
    } catch (error) {
      console.error(
        'Reject seller product error:',
        error
      )

      setError(
        error?.message ||
          'Failed to reject product.'
      )
    } finally {
      setActionLoading(null)
    }
  }

  // ============================================================
  // FILTER PRODUCTS
  // ============================================================

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const sellerName =
        product?.seller?.name ||
        product?.seller?.fullName ||
        product?.seller?.user?.name ||
        product?.seller?.user?.fullName ||
        product?.sellerName ||
        product?.sellerId ||
        ''

      const matchesSearch =
        `${product?.name || ''} ${
          product?.category || ''
        } ${sellerName}`
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      const productStatus =
        String(
          product?.approvalStatus ||
            product?.status ||
            'pending'
        ).toLowerCase()

      const matchesStatus =
        status === 'all' ||
        productStatus === status

      return (
        matchesSearch &&
        matchesStatus
      )
    })
  }, [
    products,
    search,
    status,
  ])

  // ============================================================
  // SELLER NAME
  // ============================================================

  const getSellerName = (product) => {
    return (
      product?.seller?.name ||
      product?.seller?.fullName ||
      product?.seller?.user?.name ||
      product?.seller?.user?.fullName ||
      product?.sellerName ||
      product?.sellerId ||
      '—'
    )
  }

  // ============================================================
  // PRODUCT STATUS
  // ============================================================

  const getProductStatus = (product) => {
    return (
      product?.approvalStatus ||
      product?.status ||
      'pending'
    )
  }

  // ============================================================
  // IMAGE URL
  // ============================================================

  const getImageUrl = (image) => {
    if (!image) return ''

    if (typeof image === 'string') {
      return image
    }

    return image?.url || ''
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
                Loading seller products...
              </p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER
  // ============================================================

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

        <main className="p-4 sm:p-6 lg:p-8">
          {/* ================================================== */}
          {/* HEADER */}
          {/* ================================================== */}

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Seller Products
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Review and approve products
                submitted by sellers.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                loadProducts({
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
          {/* FILTERS */}
          {/* ================================================== */}

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
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400"
              />
            </div>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none"
            >
              <option value="all">
                All
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="approved">
                Approved
              </option>

              <option value="rejected">
                Rejected
              </option>
            </select>
          </div>

          {/* ================================================== */}
          {/* TABLE */}
          {/* ================================================== */}

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-[1000px] w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-gray-500">
                      Product
                    </th>

                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-gray-500">
                      Seller
                    </th>

                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-gray-500">
                      Price
                    </th>

                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-gray-500">
                      Images
                    </th>

                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs uppercase tracking-wide text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filtered.map(
                    (product) => {
                      const productId =
                        product?._id ||
                        product?.id

                      const imageUrl =
                        getImageUrl(
                          product
                            ?.images?.[0]
                        )

                      const productStatus =
                        getProductStatus(
                          product
                        )

                      const approveLoading =
                        actionLoading ===
                        `approve-${productId}`

                      const rejectLoading =
                        actionLoading ===
                        `reject-${productId}`

                      return (
                        <tr
                          key={productId}
                          className="transition hover:bg-gray-50"
                        >
                          {/* PRODUCT */}

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              {imageUrl ? (
                                <img
                                  src={
                                    imageUrl
                                  }
                                  alt={
                                    product?.name ||
                                    'Product'
                                  }
                                  className="h-14 w-14 rounded-xl object-cover"
                                />
                              ) : (
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100">
                                  <Package
                                    size={
                                      20
                                    }
                                    className="text-gray-400"
                                  />
                                </div>
                              )}

                              <div>
                                <p className="font-semibold text-gray-900">
                                  {product?.name ||
                                    'Unnamed Product'}
                                </p>

                                <p className="text-xs text-gray-500">
                                  {product?.category ||
                                    '—'}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* SELLER */}

                          <td className="px-5 py-4 text-sm text-gray-600">
                            {getSellerName(
                              product
                            )}
                          </td>

                          {/* PRICE */}

                          <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                            €
                            {Number(
                              product?.price ||
                                0
                            ).toFixed(2)}
                          </td>

                          {/* IMAGES */}

                          <td className="px-5 py-4 text-sm text-gray-600">
                            {product
                              ?.images
                              ?.length ||
                              0}
                            /4
                          </td>

                          {/* STATUS */}

                          <td className="px-5 py-4">
                            <Status
                              status={
                                productStatus
                              }
                            />
                          </td>

                          {/* ACTIONS */}

                          <td className="px-5 py-4">
                            {String(
                              productStatus
                            ).toLowerCase() ===
                              'pending' && (
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleApprove(
                                      product
                                    )
                                  }
                                  disabled={
                                    actionLoading !==
                                    null
                                  }
                                  title="Approve product"
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  {approveLoading ? (
                                    <Loader2
                                      size={
                                        17
                                      }
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <Check
                                      size={
                                        17
                                      }
                                    />
                                  )}
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleReject(
                                      product
                                    )
                                  }
                                  disabled={
                                    actionLoading !==
                                    null
                                  }
                                  title="Reject product"
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  {rejectLoading ? (
                                    <Loader2
                                      size={
                                        17
                                      }
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <X
                                      size={
                                        17
                                      }
                                    />
                                  )}
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      )
                    }
                  )}
                </tbody>
              </table>
            </div>

            {/* ================================================== */}
            {/* EMPTY */}
            {/* ================================================== */}

            {filtered.length ===
              0 && (
              <div className="p-12 text-center">
                <Package
                  size={38}
                  className="mx-auto text-gray-300"
                />

                <p className="mt-4 text-sm font-medium text-gray-700">
                  No seller products
                  found.
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Try changing your
                  search or status
                  filter.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

// ============================================================
// STATUS
// ============================================================

function Status({ status }) {
  const normalizedStatus =
    String(
      status || 'unknown'
    ).toLowerCase()

  const styles = {
    pending:
      'bg-yellow-50 text-yellow-700',
    approved:
      'bg-green-50 text-green-700',
    rejected:
      'bg-red-50 text-red-700',
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
        styles[
          normalizedStatus
        ] ||
        'bg-gray-100 text-gray-600'
      }`}
    >
      {normalizedStatus}
    </span>
  )
}

export default AdminSellerProducts