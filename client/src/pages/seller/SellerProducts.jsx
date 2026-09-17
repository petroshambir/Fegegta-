import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Package,
  ExternalLink,
  Eye,
  Image as ImageIcon,
} from 'lucide-react'

import {
  getSellerProducts,
  deleteSellerProduct,
  getSellerStore,
} from '../../services/sellerStorage'

function SellerProducts() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [store, setStore] = useState(null)

  const loadProducts = () => {
    setProducts(getSellerProducts())
    setStore(getSellerStore())
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.sku?.toLowerCase().includes(query)

      const matchesStatus =
        status === 'all' || product.status === status

      return matchesSearch && matchesStatus
    })
  }, [products, search, status])

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    )

    if (!confirmed) return

    deleteSellerProduct(id)
    loadProducts()
  }

  const getImages = (product) => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images
    }

    if (product.image) {
      return [{ url: product.image }]
    }

    return []
  }

  const getImageUrl = (product) => {
    const images = getImages(product)

    if (!images.length) return ''

    return typeof images[0] === 'string'
      ? images[0]
      : images[0]?.url || ''
  }

  const getPublicProductUrl = (product) => {
    if (!store?.slug || product.status !== 'approved') {
      return ''
    }

    return `/store/${store.slug}/product/${product.slug || product.id}`
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              My Products
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your products, images and approval status.
            </p>
          </div>

          <Link
            to="/seller/products/add"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </div>

        {/* Seller navigation */}
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            to="/seller"
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Dashboard
          </Link>

          <Link
            to="/seller/products"
            className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
          >
            My Products
          </Link>

          <Link
            to="/seller/orders"
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Orders
          </Link>

          {store?.slug && (
            <Link
              to={`/store/${store.slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ExternalLink className="h-4 w-4" />
              My Store
            </Link>
          )}
        </div>

        {/* Search / Filter */}
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-black"
            />
          </div>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Summary */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <SummaryCard
            label="All Products"
            value={products.length}
          />

          <SummaryCard
            label="Pending"
            value={products.filter(
              (item) => item.status === 'pending'
            ).length}
          />

          <SummaryCard
            label="Approved"
            value={products.filter(
              (item) => item.status === 'approved'
            ).length}
          />

          <SummaryCard
            label="Rejected"
            value={products.filter(
              (item) => item.status === 'rejected'
            ).length}
          />
        </div>

        {/* Products */}
        {filtered.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-12 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-400" />

            <h2 className="mt-4 font-bold text-gray-900">
              No products found
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add your first product to start selling.
            </p>

            <Link
              to="/seller/products/add"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full text-sm">

                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-left">
                      Product
                    </th>

                    <th className="px-5 py-4 text-left">
                      Category
                    </th>

                    <th className="px-5 py-4 text-left">
                      Price
                    </th>

                    <th className="px-5 py-4 text-left">
                      Stock
                    </th>

                    <th className="px-5 py-4 text-left">
                      Images
                    </th>

                    <th className="px-5 py-4 text-left">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filtered.map((product) => {
                    const imageUrl = getImageUrl(product)
                    const imageCount = getImages(product).length
                    const publicUrl = getPublicProductUrl(product)

                    return (
                      <tr
                        key={product.id}
                        className="transition hover:bg-gray-50"
                      >
                        {/* Product */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                  <Package className="h-5 w-5 text-gray-400" />
                                </div>
                              )}

                              {imageCount > 0 && (
                                <span className="absolute bottom-1 right-1 rounded-md bg-black/75 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                                  {imageCount}/4
                                </span>
                              )}
                            </div>

                            <div>
                              <p className="font-semibold text-gray-900">
                                {product.name}
                              </p>

                              <p className="text-xs text-gray-500">
                                SKU: {product.sku || '—'}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-5 py-4">
                          <div>
                            <p className="font-medium">
                              {product.category || '—'}
                            </p>

                            {product.subcategory && (
                              <p className="text-xs text-gray-500">
                                {product.subcategory}
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Price */}
                        <td className="px-5 py-4">
                          <p className="font-semibold">
                            €{Number(product.price || 0).toFixed(2)}
                          </p>

                          {Number(product.oldPrice || 0) > 0 && (
                            <p className="text-xs text-gray-400 line-through">
                              €{Number(product.oldPrice).toFixed(2)}
                            </p>
                          )}
                        </td>

                        {/* Stock */}
                        <td className="px-5 py-4">
                          <span
                            className={
                              Number(product.stock || 0) <= 0
                                ? 'font-semibold text-red-600'
                                : 'text-gray-700'
                            }
                          >
                            {product.stock ?? 0}
                          </span>
                        </td>

                        {/* Images */}
                        <td className="px-5 py-4">
                          <div className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700">
                            <ImageIcon className="h-3.5 w-3.5" />
                            {imageCount}/4
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <div>
                            <Status status={product.status} />

                            {product.status === 'rejected' &&
                              product.rejectionReason && (
                                <p className="mt-2 max-w-[180px] text-xs text-red-600">
                                  {product.rejectionReason}
                                </p>
                              )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">

                            {publicUrl && (
                              <Link
                                to={publicUrl}
                                target="_blank"
                                title="View public product"
                                className="rounded-lg border border-green-200 p-2 text-green-700 hover:bg-green-50"
                              >
                                <Eye className="h-4 w-4" />
                              </Link>
                            )}

                            <Link
                              to={`/seller/products/${product.id}/edit`}
                              title="Edit product"
                              className="rounded-lg border border-gray-200 p-2 hover:bg-gray-100"
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>

                            <button
                              type="button"
                              title="Delete product"
                              onClick={() =>
                                handleDelete(product.id)
                              }
                              className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>

                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <p className="text-xs font-medium text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  )
}

function Status({ status }) {
  const styles = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    approved: 'bg-green-50 text-green-700 border-green-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
  }

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[status] || 'bg-gray-100 text-gray-700 border-gray-200'
      }`}
    >
      {status || 'unknown'}
    </span>
  )
}

export default SellerProducts