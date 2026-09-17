import React, { useEffect, useState } from 'react'
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Package,
  Eye,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import {
  getAdminProducts,
  deleteAdminProduct,
} from '../../utils/adminStorage'

function AdminMyProducts() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')

  const loadProducts = () => {
    setProducts(getAdminProducts())
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category} ${product.sku}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    )

    if (!confirmed) return

    deleteAdminProduct(id)
    loadProducts()
  }

  return (
    <AdminLayout
      mobileOpen={mobileOpen}
      setMobileOpen={setMobileOpen}
      title="My Products"
      subtitle="Manage products owned by the Fegegta platform."
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-gray-400"
          />
        </div>

        <Link
          to="/admin/my-products/add"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-black"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {filteredProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[850px] w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                    Product
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                    Category
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                    Price
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                    Stock
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                    Images
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <ProductImage product={product} />

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

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {product.category || '—'}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                      €{Number(product.price || 0).toFixed(2)}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {product.stock ?? 0}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {product.images?.length || 0}/4
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/products/${product.id}`}
                          className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
                          title="View"
                        >
                          <Eye size={17} />
                        </Link>

                        <Link
                          to={`/admin/my-products/edit/${product.id}`}
                          className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
                          title="Edit"
                        >
                          <Pencil size={17} />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          className="rounded-lg border border-red-100 p-2 text-red-600 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

function ProductImage({ product }) {
  const image = product.images?.[0]

  if (!image) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
        <Package size={20} className="text-gray-400" />
      </div>
    )
  }

  return (
    <img
      src={image}
      alt={product.name}
      className="h-12 w-12 rounded-xl object-cover"
    />
  )
}

function EmptyState() {
  return (
    <div className="p-12 text-center">
      <Package className="mx-auto text-gray-300" size={40} />

      <h3 className="mt-4 font-semibold text-gray-900">
        No products found
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        Add your first product to the platform.
      </p>
    </div>
  )
}

function AdminLayout({
  children,
  mobileOpen,
  setMobileOpen,
  title,
  subtitle,
}) {
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
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {title}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {subtitle}
            </p>
          </div>

          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminMyProducts