
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Package,
  Eye,
  RefreshCw,
  Loader2,
  AlertCircle,
} from 'lucide-react'

import { Link } from 'react-router-dom'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'

// ============================================================
// FEGEGTA BACKEND API
// ============================================================

const API_URL =
  'https://fegegta-server.onrender.com/api'

// ============================================================
// ADMIN MY PRODUCTS
// ============================================================

function AdminMyProducts() {
  const [mobileOpen, setMobileOpen] =
    useState(false)

  // ==========================================================
  // PRODUCTS
  // ==========================================================

  const [products, setProducts] =
    useState([])

  const [search, setSearch] =
    useState('')

  // ==========================================================
  // LOADING
  // ==========================================================

  const [loading, setLoading] =
    useState(true)

  const [refreshing, setRefreshing] =
    useState(false)

  // ==========================================================
  // DELETE LOADING
  // ==========================================================

  const [deletingId, setDeletingId] =
    useState(null)

  // ==========================================================
  // ERROR
  // ==========================================================

  const [error, setError] =
    useState('')

  // ==========================================================
  // GET TOKEN
  // ==========================================================

  const getToken = () => {
    return localStorage.getItem('token')
  }

  // ==========================================================
  // LOAD PRODUCTS
  // ==========================================================

  const loadProducts = async (
    isRefresh = false
  ) => {
    try {
      setError('')

      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }

      // ------------------------------------------------------
      // AUTH TOKEN
      // ------------------------------------------------------

      const token = getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found. Please login again.'
        )
      }

      // ------------------------------------------------------
      // GET ADMIN PRODUCTS
      // ------------------------------------------------------

      const response =
        await fetch(
          `${API_URL}/admin/products`,
          {
            method: 'GET',

            headers: {
              Authorization:
                `Bearer ${token}`,

              'Content-Type':
                'application/json',
            },
          }
        )

      // ------------------------------------------------------
      // RESPONSE DATA
      // ------------------------------------------------------

      let data = {}

      try {
        data =
          await response.json()
      } catch {
        data = {}
      }

      // ------------------------------------------------------
      // HTTP ERROR
      // ------------------------------------------------------

      if (!response.ok) {
        throw new Error(
          data?.message ||
            'Failed to load products.'
        )
      }

      // ------------------------------------------------------
      // BACKEND SUCCESS ERROR
      // ------------------------------------------------------

      if (!data?.success) {
        throw new Error(
          data?.message ||
            'Failed to load products.'
        )
      }

      // ======================================================
      // RESPONSE STRUCTURE
      // ======================================================

      const backendProducts =
        Array.isArray(
          data?.products
        )
          ? data.products
          : Array.isArray(
                data?.data
              )
            ? data.data
            : Array.isArray(
                  data?.products?.products
                )
              ? data.products.products
              : []

      // ======================================================
      // ADMIN PRODUCTS ONLY
      // ======================================================
      //
      // Backend getProducts returns all products.
      //
      // This page is "My Products", so we identify
      // platform/admin products.
      //
      // Admin products:
      // seller === null
      // seller === undefined
      // seller === ''
      //
      // Seller products:
      // seller object
      // seller ID
      //
      // ======================================================

      const adminProducts =
        backendProducts.filter(
          (product) => {
            const seller =
              product?.seller

            // No seller means
            // platform/admin product
            if (
              seller === null ||
              seller === undefined
            ) {
              return true
            }

            // Empty seller
            if (
              seller === ''
            ) {
              return true
            }

            // Seller object
            if (
              typeof seller ===
              'object'
            ) {
              return false
            }

            // Seller ID
            return false
          }
        )

      setProducts(
        adminProducts
      )
    } catch (error) {
      console.error(
        'Load admin products error:',
        error
      )

      setError(
        error?.message ||
          'Something went wrong while loading products.'
      )

      setProducts([])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    loadProducts()
  }, [])

  // ==========================================================
  // FILTER PRODUCTS
  // ==========================================================

  const filteredProducts =
    useMemo(() => {
      const searchValue =
        search
          .trim()
          .toLowerCase()

      if (!searchValue) {
        return products
      }

      return products.filter(
        (product) => {
          const name =
            product?.name ||
            ''

          const category =
            product?.category ||
            ''

          const sku =
            product?.sku ||
            ''

          return `${name} ${category} ${sku}`
            .toLowerCase()
            .includes(
              searchValue
            )
        }
      )
    }, [
      products,
      search,
    ])

  // ==========================================================
  // DELETE PRODUCT
  // ==========================================================

  const handleDelete = async (
    product
  ) => {
    const productId =
      product?._id ||
      product?.id

    // --------------------------------------------------------
    // PRODUCT ID CHECK
    // --------------------------------------------------------

    if (!productId) {
      setError(
        'Product ID was not found.'
      )

      return
    }

    // --------------------------------------------------------
    // CONFIRM DELETE
    // --------------------------------------------------------

    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${product?.name || 'this product'}"?\n\nThis action cannot be undone.`
      )

    if (!confirmed) {
      return
    }

    try {
      setError('')
      setDeletingId(
        productId
      )

      // ------------------------------------------------------
      // AUTH TOKEN
      // ------------------------------------------------------

      const token =
        getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found. Please login again.'
        )
      }

      // ------------------------------------------------------
      // DELETE PRODUCT
      // ------------------------------------------------------

      const response =
        await fetch(
          `${API_URL}/admin/products/${productId}`,
          {
            method: 'DELETE',

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

      // ------------------------------------------------------
      // RESPONSE DATA
      // ------------------------------------------------------

      let data = {}

      try {
        data =
          await response.json()
      } catch {
        data = {}
      }

      // ------------------------------------------------------
      // HTTP ERROR
      // ------------------------------------------------------

      if (!response.ok) {
        throw new Error(
          data?.message ||
            'Failed to delete product.'
        )
      }

      // ------------------------------------------------------
      // BACKEND SUCCESS ERROR
      // ------------------------------------------------------

      if (
        data?.success === false
      ) {
        throw new Error(
          data?.message ||
            'Failed to delete product.'
        )
      }

      // ------------------------------------------------------
      // REMOVE PRODUCT FROM LOCAL STATE
      // ------------------------------------------------------

      setProducts(
        (currentProducts) =>
          currentProducts.filter(
            (item) => {
              const id =
                item?._id ||
                item?.id

              return (
                String(id) !==
                String(productId)
              )
            }
          )
      )

    } catch (error) {
      console.error(
        'Delete product error:',
        error
      )

      setError(
        error?.message ||
          'Something went wrong while deleting the product.'
      )
    } finally {
      setDeletingId(null)
    }
  }

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <AdminSidebar
        mobileOpen={
          mobileOpen
        }
        onClose={() =>
          setMobileOpen(false)
        }
      />

      {/* ======================================================
          MAIN AREA
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
            MAIN
        ==================================================== */}

        <main className="p-4 sm:p-6 lg:p-8">

          {/* ==================================================
              PAGE HEADER
          ================================================== */}

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                My Products
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage products owned by the Fegegta platform.
              </p>
            </div>

            {/* REFRESH */}

            <button
              type="button"
              onClick={() =>
                loadProducts(true)
              }
              disabled={
                loading ||
                refreshing ||
                deletingId !== null
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
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
              ERROR
          ================================================== */}

          {error && (
            <div className="mb-6 flex flex-col gap-4 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-start gap-3">

                <AlertCircle
                  size={20}
                  className="mt-0.5 shrink-0 text-red-600"
                />

                <div>
                  <p className="text-sm font-semibold text-red-800">
                    Unable to complete request
                  </p>

                  <p className="mt-1 text-sm text-red-700">
                    {error}
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  loadProducts()
                }
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Try Again
              </button>

            </div>
          )}

          {/* ==================================================
              SEARCH + ADD
          ================================================== */}

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* SEARCH */}

            <div className="relative w-full sm:max-w-md">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search products..."
                disabled={
                  loading ||
                  deletingId !== null
                }
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50"
              />

            </div>

            {/* ADD PRODUCT */}

            <Link
              to="/admin/my-products/add"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black"
            >
              <Plus size={18} />

              Add Product
            </Link>

          </div>

          {/* ==================================================
              PRODUCT COUNT
          ================================================== */}

          {!loading && (
            <div className="mb-4 flex items-center justify-between">

              <p className="text-sm text-gray-500">
                Showing{' '}

                <span className="font-semibold text-gray-900">
                  {filteredProducts.length}
                </span>{' '}

                product

                {filteredProducts.length !==
                1
                  ? 's'
                  : ''}
              </p>

            </div>
          )}

          {/* ==================================================
              PRODUCTS TABLE
          ================================================== */}

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* =================================================
                LOADING
            ================================================= */}

            {loading ? (
              <LoadingState />

            ) : filteredProducts.length ===
              0 ? (

              /* =================================================
                 EMPTY
              ================================================= */

              <EmptyState
                hasSearch={
                  Boolean(
                    search.trim()
                  )
                }
              />

            ) : (

              /* =================================================
                 TABLE
              ================================================= */

              <div className="overflow-x-auto">

                <table className="min-w-[900px] w-full">

                  {/* TABLE HEAD */}

                  <thead className="bg-gray-50">

                    <tr>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Product
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Category
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Price
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Stock
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Images
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Status
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  {/* TABLE BODY */}

                  <tbody className="divide-y divide-gray-100">

                    {filteredProducts.map(
                      (product) => {

                        const productId =
                          product?._id ||
                          product?.id

                        const isDeleting =
                          deletingId !== null &&
                          String(
                            deletingId
                          ) ===
                            String(
                              productId
                            )

                        return (
                          <tr
                            key={
                              productId
                            }
                            className="transition hover:bg-gray-50/70"
                          >

                            {/* =================================================
                                PRODUCT
                            ================================================= */}

                            <td className="px-5 py-4">

                              <div className="flex items-center gap-3">

                                <ProductImage
                                  product={
                                    product
                                  }
                                />

                                <div className="min-w-0">

                                  <p className="max-w-[260px] truncate font-semibold text-gray-900">
                                    {product?.name ||
                                      'Unnamed Product'}
                                  </p>

                                  <p className="mt-1 text-xs text-gray-500">
                                    SKU:{' '}

                                    {product?.sku ||
                                      '—'}
                                  </p>

                                </div>

                              </div>

                            </td>

                            {/* =================================================
                                CATEGORY
                            ================================================= */}

                            <td className="px-5 py-4 text-sm text-gray-600">

                              {product?.category ||
                                '—'}

                              {product?.subcategory && (
                                <p className="mt-1 text-xs text-gray-400">
                                  {
                                    product.subcategory
                                  }
                                </p>
                              )}

                            </td>

                            {/* =================================================
                                PRICE
                            ================================================= */}

                            <td className="px-5 py-4">

                              <p className="text-sm font-semibold text-gray-900">
                                €

                                {Number(
                                  product?.price ||
                                    0
                                ).toFixed(
                                  2
                                )}
                              </p>

                              {Number(
                                product?.compareAtPrice ||
                                  0
                              ) >
                                Number(
                                  product?.price ||
                                    0
                                ) && (
                                <p className="mt-1 text-xs text-gray-400 line-through">
                                  €

                                  {Number(
                                    product.compareAtPrice
                                  ).toFixed(
                                    2
                                  )}
                                </p>
                              )}

                            </td>

                            {/* =================================================
                                STOCK
                            ================================================= */}

                            <td className="px-5 py-4">

                              <StockBadge
                                stock={
                                  product?.stock
                                }
                              />

                            </td>

                            {/* =================================================
                                IMAGES
                            ================================================= */}

                            <td className="px-5 py-4 text-sm text-gray-600">

                              {Array.isArray(
                                product?.images
                              )
                                ? product.images
                                    .length
                                : 0}

                              /4

                            </td>

                            {/* =================================================
                                STATUS
                            ================================================= */}

                            <td className="px-5 py-4">

                              <StatusBadge
                                status={
                                  product?.approvalStatus
                                }
                              />

                            </td>

                            {/* =================================================
                                ACTIONS
                            ================================================= */}

                            <td className="px-5 py-4">

                              <div className="flex justify-end gap-2">

                                {/* VIEW */}

                                <Link
                                  to={`/products/${productId}`}
                                  className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                                  title="View Product"
                                >
                                  <Eye
                                    size={
                                      17
                                    }
                                  />
                                </Link>

                                {/* EDIT */}

                                <Link
                                  to={`/admin/my-products/edit/${productId}`}
                                  className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                                  title="Edit Product"
                                >
                                  <Pencil
                                    size={
                                      17
                                    }
                                  />
                                </Link>

                                {/* DELETE */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(
                                      product
                                    )
                                  }
                                  disabled={
                                    deletingId !==
                                      null
                                  }
                                  className="rounded-lg border border-red-100 bg-white p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                  title="Delete Product"
                                >
                                  {isDeleting ? (
                                    <Loader2
                                      size={
                                        17
                                      }
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <Trash2
                                      size={
                                        17
                                      }
                                    />
                                  )}
                                </button>

                              </div>

                            </td>

                          </tr>
                        )
                      }
                    )}

                  </tbody>

                </table>

              </div>
            )}

          </div>

        </main>
      </div>
    </div>
  )
}

// ============================================================
// PRODUCT IMAGE
// ============================================================

function ProductImage({
  product,
}) {
  const image =
    product?.images?.[0]

  // ----------------------------------------------------------
  // NO IMAGE
  // ----------------------------------------------------------

  if (!image) {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
        <Package
          size={20}
          className="text-gray-400"
        />
      </div>
    )
  }

  // ----------------------------------------------------------
  // CLOUDINARY IMAGE OBJECT
  // ----------------------------------------------------------

  const imageUrl =
    typeof image ===
    'string'
      ? image
      : image?.url

  if (!imageUrl) {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
        <Package
          size={20}
          className="text-gray-400"
        />
      </div>
    )
  }

  return (
    <img
      src={imageUrl}
      alt={
        product?.name ||
        'Product'
      }
      className="h-12 w-12 shrink-0 rounded-xl object-cover"
      loading="lazy"
      onError={(event) => {
        event.currentTarget.style.display =
          'none'
      }}
    />
  )
}

// ============================================================
// STOCK BADGE
// ============================================================

function StockBadge({
  stock,
}) {
  const value =
    Number(stock || 0)

  if (value <= 0) {
    return (
      <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
        Out of stock
      </span>
    )
  }

  if (value <= 5) {
    return (
      <div>
        <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
          Low stock
        </span>

        <p className="mt-1 text-xs text-gray-400">
          {value} left
        </p>
      </div>
    )
  }

  return (
    <div>
      <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
        In stock
      </span>

      <p className="mt-1 text-xs text-gray-400">
        {value} available
      </p>
    </div>
  )
}

// ============================================================
// STATUS BADGE
// ============================================================

function StatusBadge({
  status,
}) {
  const normalized =
    String(
      status || ''
    ).toLowerCase()

  if (
    normalized ===
    'approved'
  ) {
    return (
      <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
        Approved
      </span>
    )
  }

  if (
    normalized ===
      'rejected' ||
    normalized ===
      'declined'
  ) {
    return (
      <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
        Rejected
      </span>
    )
  }

  return (
    <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
      Pending
    </span>
  )
}

// ============================================================
// LOADING STATE
// ============================================================

function LoadingState() {
  return (
    <div className="p-12 text-center">

      <Loader2
        size={34}
        className="mx-auto animate-spin text-gray-700"
      />

      <p className="mt-3 text-sm text-gray-500">
        Loading products...
      </p>

    </div>
  )
}

// ============================================================
// EMPTY STATE
// ============================================================

function EmptyState({
  hasSearch,
}) {
  return (
    <div className="p-12 text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">

        <Package
          className="text-gray-400"
          size={30}
        />

      </div>

      <h3 className="mt-4 font-semibold text-gray-900">
        {hasSearch
          ? 'No products found'
          : 'No products yet'}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {hasSearch
          ? 'Try changing your search.'
          : 'Add your first product to the platform.'}
      </p>

      {!hasSearch && (
        <Link
          to="/admin/my-products/add"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black"
        >
          <Plus size={17} />

          Add Product
        </Link>
      )}

    </div>
  )
}

// ============================================================
// EXPORT
// ============================================================

export default AdminMyProducts

