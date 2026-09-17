import React, { useEffect, useState } from 'react'
import { ArrowLeft, Upload, X } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import {
  getAdminProductById,
  saveAdminProduct,
} from '../../utils/adminStorage'

function AdminEditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

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

  useEffect(() => {
    const product = getAdminProductById(id)

    if (!product) {
      alert('Product not found.')
      navigate('/admin/my-products')
      return
    }

    setForm({
      name: product.name || '',
      description: product.description || '',
      category: product.category || '',
      subcategory: product.subcategory || '',
      sku: product.sku || '',
      price: product.price ?? '',
      oldPrice: product.oldPrice ?? '',
      stock: product.stock ?? '',
      material: product.material || '',
      sizes: (product.sizes || []).join(', '),
      colors: (product.colors || []).join(', '),
      features: (product.features || []).join(', '),
      images: product.images || [],
    })

    setLoaded(true)
  }, [id, navigate])

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

    saveAdminProduct({
      id,
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

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading product...
        </p>
      </div>
    )
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
          <Link
            to="/admin/my-products"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={17} />
            Back to My Products
          </Link>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Edit Product
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-6"
          >
            <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="text-lg font-bold text-gray-900">
                Product Images
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {form.images.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="relative aspect-square overflow-hidden rounded-xl border"
                  >
                    <img
                      src={image}
                      alt=""
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
                  <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-500">
                    <Upload size={24} />

                    <span className="mt-2 text-xs">
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
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field
                  label="Product Name"
                  value={form.name}
                  onChange={(v) => update('name', v)}
                  required
                />

                <Field
                  label="SKU"
                  value={form.sku}
                  onChange={(v) => update('sku', v)}
                />

                <Field
                  label="Category"
                  value={form.category}
                  onChange={(v) => update('category', v)}
                />

                <Field
                  label="Subcategory"
                  value={form.subcategory}
                  onChange={(v) => update('subcategory', v)}
                />

                <Field
                  label="Price (€)"
                  type="number"
                  value={form.price}
                  onChange={(v) => update('price', v)}
                  required
                />

                <Field
                  label="Old Price (€)"
                  type="number"
                  value={form.oldPrice}
                  onChange={(v) => update('oldPrice', v)}
                />

                <Field
                  label="Stock"
                  type="number"
                  value={form.stock}
                  onChange={(v) => update('stock', v)}
                />

                <Field
                  label="Material / Quality"
                  value={form.material}
                  onChange={(v) => update('material', v)}
                />

                <Field
                  label="Sizes"
                  value={form.sizes}
                  onChange={(v) => update('sizes', v)}
                />

                <Field
                  label="Colors"
                  value={form.colors}
                  onChange={(v) => update('colors', v)}
                />

                <Field
                  label="Features"
                  value={form.features}
                  onChange={(v) => update('features', v)}
                />

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
                  />
                </div>
              </div>
            </section>

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-gray-900 px-7 py-3 text-sm font-semibold text-white hover:bg-black"
              >
                Update Product
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
  required = false,
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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

export default AdminEditProduct