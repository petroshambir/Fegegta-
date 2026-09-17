import React, { useState } from 'react'
import { ArrowLeft, Upload, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import { saveAdminProduct } from '../../utils/adminStorage'

function AdminAddProduct() {
  const navigate = useNavigate()

  const [mobileOpen, setMobileOpen] = useState(false)

  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    sku: '',
    price: '',
    oldPrice: '',
    stock: '',
    material: '',
    sizes: '',
    colors: '',
    features: '',
    images: [],
  })

  const [saving, setSaving] = useState(false)

  const update = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleImages = (event) => {
    const files = Array.from(event.target.files || [])

    if (form.images.length + files.length > 4) {
      alert('A product can have a maximum of 4 images.')
      return
    }

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        setForm((current) => ({
          ...current,
          images: [...current.images, reader.result].slice(0, 4),
        }))
      }

      reader.readAsDataURL(file)
    })

    event.target.value = ''
  }

  const removeImage = (index) => {
    setForm((current) => ({
      ...current,
      images: current.images.filter(
        (_, imageIndex) => imageIndex !== index
      ),
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.name.trim()) {
      alert('Product name is required.')
      return
    }

    if (!form.price) {
      alert('Product price is required.')
      return
    }

    setSaving(true)

    saveAdminProduct({
      name: form.name.trim(),
      description: form.description.trim(),

      category: form.category.trim(),
      subcategory: form.subcategory.trim(),

      sku: form.sku.trim(),

      price: Number(form.price),
      oldPrice: Number(form.oldPrice || 0),
      stock: Number(form.stock || 0),

      material: form.material.trim(),

      sizes: splitValues(form.sizes),
      colors: splitValues(form.colors),
      features: splitValues(form.features),

      images: form.images,

      status: 'approved',
    })

    navigate('/admin/my-products')
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
            <Link
              to="/admin/my-products"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={17} />
              Back to My Products
            </Link>

            <h1 className="mt-4 text-2xl font-bold text-gray-900">
              Add Product
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Add a product directly to your Fegegta store.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="text-lg font-bold text-gray-900">
                Product Images
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Upload up to 4 images showing different sides of the product.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {form.images.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="relative aspect-square overflow-hidden rounded-xl border border-gray-200"
                  >
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-red-600 shadow"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}

                {form.images.length < 4 && (
                  <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 hover:border-gray-500">
                    <Upload size={24} />

                    <span className="mt-2 text-xs font-semibold">
                      Add Image
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImages}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="text-lg font-bold text-gray-900">
                Product Information
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field
                  label="Product Name"
                  value={form.name}
                  onChange={(value) => update('name', value)}
                  required
                />

                <Field
                  label="SKU"
                  value={form.sku}
                  onChange={(value) => update('sku', value)}
                />

                <Field
                  label="Category"
                  value={form.category}
                  onChange={(value) => update('category', value)}
                />

                <Field
                  label="Subcategory"
                  value={form.subcategory}
                  onChange={(value) => update('subcategory', value)}
                />

                <Field
                  label="Price (€)"
                  type="number"
                  value={form.price}
                  onChange={(value) => update('price', value)}
                  required
                />

                <Field
                  label="Old Price (€)"
                  type="number"
                  value={form.oldPrice}
                  onChange={(value) => update('oldPrice', value)}
                />

                <Field
                  label="Stock"
                  type="number"
                  value={form.stock}
                  onChange={(value) => update('stock', value)}
                />

                <Field
                  label="Material / Quality"
                  value={form.material}
                  onChange={(value) => update('material', value)}
                />

                <Field
                  label="Sizes"
                  value={form.sizes}
                  onChange={(value) => update('sizes', value)}
                  placeholder="S, M, L, XL"
                />

                <Field
                  label="Colors"
                  value={form.colors}
                  onChange={(value) => update('colors', value)}
                  placeholder="Black, White, Red"
                />

                <div className="md:col-span-2">
                  <Field
                    label="Features"
                    value={form.features}
                    onChange={(value) => update('features', value)}
                    placeholder="Premium quality, Handmade, Comfortable"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Description
                  </label>

                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      update('description', e.target.value)
                    }
                    rows={6}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
                    placeholder="Describe the product..."
                  />
                </div>
              </div>
            </section>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link
                to="/admin/my-products"
                className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
      />
    </div>
  )
}

function splitValues(value) {
  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export default AdminAddProduct