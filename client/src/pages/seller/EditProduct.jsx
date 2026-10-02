// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import {
//   ArrowLeft,
//   Save,
//   ImagePlus,
//   X,
// } from 'lucide-react'

// import {
//   getSellerProductById,
//   getSellerStore,
//   saveSellerProduct,
//   addSellerNotification,
// } from '../../services/sellerStorage'

// function EditProduct() {
//   const { id } = useParams()
//   const navigate = useNavigate()

//   const [product, setProduct] = useState(null)
//   const [error, setError] = useState('')
//   const [saving, setSaving] = useState(false)

//   const [images, setImages] = useState([])

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     category: '',
//     subcategory: '',
//     material: '',
//     features: '',
//     price: '',
//     oldPrice: '',
//     stock: '',
//     sku: '',
//     sizes: '',
//     colors: '',
//   })

//   useEffect(() => {
//     const found = getSellerProductById(id)

//     setProduct(found)

//     if (!found) return

//     setFormData({
//       name: found.name || '',
//       description: found.description || '',
//       category: found.category || '',
//       subcategory: found.subcategory || '',
//       material: found.material || '',
//       features: Array.isArray(found.features)
//         ? found.features.join(', ')
//         : found.features || '',
//       price: found.price ?? '',
//       oldPrice: found.oldPrice ?? '',
//       stock: found.stock ?? '',
//       sku: found.sku || '',
//       sizes: Array.isArray(found.sizes)
//         ? found.sizes.join(', ')
//         : found.sizes || '',
//       colors: Array.isArray(found.colors)
//         ? found.colors.join(', ')
//         : found.colors || '',
//     })

//     const existingImages = Array.isArray(found.images)
//       ? found.images
//       : found.image
//         ? [{ id: 'main', url: found.image }]
//         : []

//     setImages(existingImages.slice(0, 4))
//   }, [id])

//   const handleChange = (event) => {
//     const { name, value } = event.target

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))

//     setError('')
//   }

//   const fileToDataUrl = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader()

//       reader.onload = () => resolve(reader.result)
//       reader.onerror = reject

//       reader.readAsDataURL(file)
//     })
//   }

//   const handleImages = async (event) => {
//     const files = Array.from(event.target.files || [])

//     if (!files.length) return

//     const availableSlots = 4 - images.length

//     if (availableSlots <= 0) {
//       setError('A product can have a maximum of 4 images.')
//       return
//     }

//     const selectedFiles = files.slice(0, availableSlots)

//     try {
//       const newImages = await Promise.all(
//         selectedFiles.map(async (file) => ({
//           id: `${Date.now()}-${Math.random()}`,
//           url: await fileToDataUrl(file),
//           name: file.name,
//         }))
//       )

//       setImages((prev) => [
//         ...prev,
//         ...newImages,
//       ])

//       setError('')
//     } catch (imageError) {
//       console.error(imageError)
//       setError('Failed to load product images.')
//     }

//     event.target.value = ''
//   }

//   const removeImage = (imageId) => {
//     setImages((prev) =>
//       prev.filter((image) => image.id !== imageId)
//     )
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault()

//     if (!product) return

//     if (
//       !formData.name.trim() ||
//       !formData.category.trim() ||
//       !formData.price
//     ) {
//       setError(
//         'Product name, category and price are required.'
//       )
//       return
//     }

//     if (images.length === 0) {
//       setError('Please keep at least one product image.')
//       return
//     }

//     setSaving(true)
//     setError('')

//     try {
//       const store = getSellerStore()

//       const wasApproved =
//         product.status === 'approved'

//       const updated = saveSellerProduct({
//         ...product,

//         name: formData.name.trim(),

//         description:
//           formData.description.trim(),

//         category:
//           formData.category.trim(),

//         subcategory:
//           formData.subcategory.trim(),

//         material:
//           formData.material.trim(),

//         features:
//           formData.features
//             .split(',')
//             .map((item) => item.trim())
//             .filter(Boolean),

//         price:
//           Number(formData.price),

//         oldPrice:
//           Number(formData.oldPrice || 0),

//         stock:
//           Number(formData.stock || 0),

//         sku:
//           formData.sku.trim(),

//         sizes:
//           formData.sizes
//             .split(',')
//             .map((item) => item.trim())
//             .filter(Boolean),

//         colors:
//           formData.colors
//             .split(',')
//             .map((item) => item.trim())
//             .filter(Boolean),

//         images: images.slice(0, 4),

//         // Main image
//         image:
//           images[0]?.url ||
//           product.image ||
//           '',

//         storeId:
//           product.storeId ||
//           store?.id ||
//           '',

//         storeSlug:
//           product.storeSlug ||
//           store?.slug ||
//           '',

//         /*
//           ADMIN WORKFLOW

//           Approved product edited by seller
//           must return to pending review.
//         */
//         status: wasApproved
//           ? 'pending'
//           : product.status,

//         rejectionReason: '',
//       })

//       if (!updated) {
//         throw new Error(
//           'Product could not be updated.'
//         )
//       }

//       if (wasApproved) {
//         addSellerNotification({
//           sellerId: updated.sellerId,
//           type: 'product-resubmitted',
//           title: 'Product sent for re-approval',
//           message:
//             `${updated.name} was edited and is waiting for admin review.`,
//           productId: updated.id,
//         })
//       }

//       if (product.status === 'rejected') {
//         addSellerNotification({
//           sellerId: updated.sellerId,
//           type: 'product-resubmitted',
//           title: 'Rejected product resubmitted',
//           message:
//             `${updated.name} was updated and sent back to admin for review.`,
//           productId: updated.id,
//         })
//       }

//       navigate('/seller/products')
//     } catch (submitError) {
//       console.error(submitError)

//       setError(
//         submitError.message ||
//           'Failed to update product.'
//       )
//     } finally {
//       setSaving(false)
//     }
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-10 text-center">
//         <h1 className="text-2xl font-bold">
//           Product Not Found
//         </h1>

//         <Link
//           to="/seller/products"
//           className="mt-5 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
//         >
//           Back to Products
//         </Link>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-5xl">

//         <Link
//           to="/seller/products"
//           className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to Products
//         </Link>

//         <form
//           onSubmit={handleSubmit}
//           className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
//         >
//           <div>
//             <h1 className="text-2xl font-bold">
//               Edit Product
//             </h1>

//             <p className="mt-1 text-sm text-gray-500">
//               Update your product information and images.
//             </p>
//           </div>

//           {product.status === 'approved' && (
//             <div className="mt-5 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
//               Editing this approved product will send it back to pending review by the admin.
//             </div>
//           )}

//           {product.status === 'rejected' &&
//             product.rejectionReason && (
//               <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//                 <strong>Rejection reason:</strong>{' '}
//                 {product.rejectionReason}
//               </div>
//             )}

//           {error && (
//             <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//               {error}
//             </div>
//           )}

//           {/* Images */}
//           <section className="mt-8">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="font-semibold">
//                   Product Images
//                 </h2>

//                 <p className="mt-1 text-xs text-gray-500">
//                   Maximum 4 images. Show different sides or angles.
//                 </p>
//               </div>

//               <span className="text-sm font-medium text-gray-500">
//                 {images.length}/4
//               </span>
//             </div>

//             <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
//               {images.map((image, index) => (
//                 <div
//                   key={image.id || index}
//                   className="relative aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-gray-100"
//                 >
//                   <img
//                     src={
//                       typeof image === 'string'
//                         ? image
//                         : image.url
//                     }
//                     alt={`Product ${index + 1}`}
//                     className="h-full w-full object-cover"
//                   />

//                   {index === 0 && (
//                     <span className="absolute left-2 top-2 rounded-full bg-black px-2 py-1 text-[10px] font-semibold text-white">
//                       Main
//                     </span>
//                   )}

//                   <button
//                     type="button"
//                     onClick={() =>
//                       removeImage(image.id)
//                     }
//                     className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-red-600 shadow hover:bg-red-50"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               ))}

//               {images.length < 4 && (
//                 <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 transition hover:border-black hover:bg-white">
//                   <ImagePlus className="h-7 w-7" />

//                   <span className="mt-2 text-xs font-semibold">
//                     Add Image
//                   </span>

//                   <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={handleImages}
//                     className="hidden"
//                   />
//                 </label>
//               )}
//             </div>
//           </section>

//           {/* Basic information */}
//           <div className="mt-8 grid gap-6 md:grid-cols-2">

//             <Input
//               label="Product Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />

//             <Input
//               label="Category"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               required
//             />

//             <Input
//               label="Subcategory"
//               name="subcategory"
//               value={formData.subcategory}
//               onChange={handleChange}
//             />

//             <Input
//               label="Material / Quality"
//               name="material"
//               value={formData.material}
//               onChange={handleChange}
//             />

//             <Input
//               label="Price"
//               name="price"
//               type="number"
//               min="0"
//               step="0.01"
//               value={formData.price}
//               onChange={handleChange}
//               required
//             />

//             <Input
//               label="Old Price"
//               name="oldPrice"
//               type="number"
//               min="0"
//               step="0.01"
//               value={formData.oldPrice}
//               onChange={handleChange}
//             />

//             <Input
//               label="Stock"
//               name="stock"
//               type="number"
//               min="0"
//               value={formData.stock}
//               onChange={handleChange}
//             />

//             <Input
//               label="SKU"
//               name="sku"
//               value={formData.sku}
//               onChange={handleChange}
//             />

//             <Input
//               label="Sizes"
//               name="sizes"
//               value={formData.sizes}
//               onChange={handleChange}
//               placeholder="S, M, L, XL"
//             />

//             <Input
//               label="Colors"
//               name="colors"
//               value={formData.colors}
//               onChange={handleChange}
//               placeholder="Black, White, Red"
//             />

//             <div className="md:col-span-2">
//               <Input
//                 label="Features"
//                 name="features"
//                 value={formData.features}
//                 onChange={handleChange}
//                 placeholder="Handmade, Cotton, Embroidery"
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div className="mt-6">
//             <label className="mb-2 block text-sm font-medium">
//               Description
//             </label>

//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows={7}
//               placeholder="Describe the product..."
//               className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
//             />
//           </div>

//           {/* Save */}
//           <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
//             <Link
//               to="/seller/products"
//               className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </Link>

//             <button
//               type="submit"
//               disabled={saving}
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               <Save className="h-4 w-4" />

//               {saving
//                 ? 'Saving...'
//                 : 'Save Changes'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// function Input({
//   label,
//   ...props
// }) {
//   return (
//     <div>
//       <label className="mb-2 block text-sm font-medium text-gray-800">
//         {label}
//       </label>

//       <input
//         {...props}
//         className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
//       />
//     </div>
//   )
// }

// export default EditProduct


import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Save,
  ImagePlus,
  X,
} from 'lucide-react'

import {
  addSellerNotification,
} from '../../services/sellerStorage'

const API_URL = 'https://fegegta-server.onrender.com/api'

function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    material: '',
    features: '',
    price: '',
    oldPrice: '',
    stock: '',
    sku: '',
    sizes: '',
    colors: '',
  })

  useEffect(() => {
    let cancelled = false

    const loadProduct = async () => {
      setLoading(true)
      setError('')

      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('Please log in again.')

        const response = await fetch(
          `${API_URL}/products/seller/my-products`,
          { headers: { Authorization: `Bearer ${token}` } },
        )
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data?.message || 'Failed to load product.')
        }

        const products = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
            ? data.products
            : Array.isArray(data?.data)
              ? data.data
              : Array.isArray(data?.data?.products)
                ? data.data.products
                : []
        const found = products.find(
          (item) => String(item._id || item.id) === String(id),
        )

        if (!found) throw new Error('Product not found.')
        if (cancelled) return

        const productImages = Array.isArray(found.images)
          ? found.images
          : found.image
            ? [found.image]
            : []

        setProduct({ ...found, id: found._id || found.id })
        setFormData({
          name: found.name || '',
          description: found.description || '',
          category: found.category || '',
          subcategory: found.subcategory || '',
          material: found.material || '',
          features: Array.isArray(found.features)
            ? found.features.join(', ')
            : found.features || '',
          price: found.price ?? '',
          oldPrice: found.oldPrice ?? found.compareAtPrice ?? '',
          stock: found.stock ?? '',
          sku: found.sku || '',
          sizes: Array.isArray(found.sizes)
            ? found.sizes.join(', ')
            : found.sizes || '',
          colors: Array.isArray(found.colors)
            ? found.colors.join(', ')
            : found.colors || '',
        })
        setImages(productImages.slice(0, 4).map((image, index) => ({
          id: `existing-${index}`,
          url: typeof image === 'string'
            ? image
            : image?.url || image?.secure_url || '',
          existing: true,
        })).filter((image) => image.url))
      } catch (loadError) {
        if (!cancelled) setError(loadError.message || 'Failed to load product.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadProduct()
    return () => { cancelled = true }
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setError('')
  }

  const handleImages = async (event) => {
    const files = Array.from(event.target.files || [])

    if (!files.length) return

    const availableSlots = 4 - images.length

    if (availableSlots <= 0) {
      setError('A product can have a maximum of 4 images.')
      return
    }

    const selectedFiles = files.slice(0, availableSlots)

    try {
      const newImages = selectedFiles.map((file) => ({
          id: `${Date.now()}-${Math.random()}`,
          url: URL.createObjectURL(file),
          name: file.name,
          file,
          existing: false,
        }))

      setImages((prev) => [
        ...prev,
        ...newImages,
      ])

      setError('')
    } catch (imageError) {
      console.error(imageError)
      setError('Failed to load product images.')
    }

    event.target.value = ''
  }

  const removeImage = (imageId) => {
    setImages((prev) => {
      const removed = prev.find((image) => image.id === imageId)
      if (removed && !removed.existing && removed.url) URL.revokeObjectURL(removed.url)
      return prev.filter((image) => image.id !== imageId)
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!product) return

    if (
      !formData.name.trim() ||
      !formData.category.trim() ||
      !formData.price
    ) {
      setError(
        'Product name, category and price are required.'
      )
      return
    }

    if (images.length === 0) {
      setError('Please keep at least one product image.')
      return
    }

    setSaving(true)
    setError('')

    try {
      const wasApproved =
        product.status === 'approved'

      const token = localStorage.getItem('token')
      if (!token) throw new Error('Please log in again.')

      const payload = new FormData()
      const updatedFields = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
        subcategory: formData.subcategory.trim(),
        material: formData.material.trim(),
        features: formData.features.split(',').map((item) => item.trim()).filter(Boolean),
        price: Number(formData.price),
        compareAtPrice: Number(formData.oldPrice || 0),
        stock: Number(formData.stock || 0),
        sku: formData.sku.trim(),
        sizes: formData.sizes.split(',').map((item) => item.trim()).filter(Boolean),
        colors: formData.colors.split(',').map((item) => item.trim()).filter(Boolean),
        status: wasApproved || product.status === 'rejected' ? 'pending' : product.status,
        rejectionReason: '',
      }

      Object.entries(updatedFields).forEach(([key, value]) => {
        payload.append(key, Array.isArray(value) ? JSON.stringify(value) : String(value ?? ''))
      })
      payload.append(
        'existingImages',
        JSON.stringify(images.filter((image) => image.existing).map((image) => image.url)),
      )
      images.filter((image) => !image.existing && image.file).forEach((image) => {
        payload.append('images', image.file)
      })

      const response = await fetch(`${API_URL}/products/seller/${product.id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result?.message || 'Product could not be updated.')
      }

      const updated = result?.product || result?.data?.product || result?.data || result
      if (wasApproved || product.status === 'rejected') {
        addSellerNotification({
          sellerId: updated.sellerId || product.sellerId,
          type: 'product-resubmitted',
          title: wasApproved
            ? 'Product sent for re-approval'
            : 'Rejected product resubmitted',
          message: `${updated.name || formData.name} was updated and sent back to admin for review.`,
          productId: updated._id || updated.id || product.id,
        })
      }

      navigate('/seller/products')
    } catch (submitError) {
      console.error(submitError)

      setError(
        submitError.message ||
          'Failed to update product.'
      )
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-10 text-center text-gray-600">
        Loading product...
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 p-10 text-center">
        <h1 className="text-2xl font-bold">
          Product Not Found
        </h1>

        <Link
          to="/seller/products"
          className="mt-5 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
        >
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        <Link
          to="/seller/products"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <h1 className="text-2xl font-bold">
              Edit Product
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Update your product information and images.
            </p>
          </div>

          {product.status === 'approved' && (
            <div className="mt-5 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
              Editing this approved product will send it back to pending review by the admin.
            </div>
          )}

          {product.status === 'rejected' &&
            product.rejectionReason && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <strong>Rejection reason:</strong>{' '}
                {product.rejectionReason}
              </div>
            )}

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Images */}
          <section className="mt-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">
                  Product Images
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Maximum 4 images. Show different sides or angles.
                </p>
              </div>

              <span className="text-sm font-medium text-gray-500">
                {images.length}/4
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {images.map((image, index) => (
                <div
                  key={image.id || index}
                  className="relative aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-gray-100"
                >
                  <img
                    src={
                      image.url
                    }
                    alt={`Product ${index + 1}`}
                    className="h-full w-full object-cover"
                  />

                  {index === 0 && (
                    <span className="absolute left-2 top-2 rounded-full bg-black px-2 py-1 text-[10px] font-semibold text-white">
                      Main
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      removeImage(image.id)
                    }
                    className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-red-600 shadow hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {images.length < 4 && (
                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 transition hover:border-black hover:bg-white">
                  <ImagePlus className="h-7 w-7" />

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

          {/* Basic information */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <Input
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />

            <Input
              label="Subcategory"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
            />

            <Input
              label="Material / Quality"
              name="material"
              value={formData.material}
              onChange={handleChange}
            />

            <Input
              label="Price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <Input
              label="Old Price"
              name="oldPrice"
              type="number"
              min="0"
              step="0.01"
              value={formData.oldPrice}
              onChange={handleChange}
            />

            <Input
              label="Stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
            />

            <Input
              label="SKU"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
            />

            <Input
              label="Sizes"
              name="sizes"
              value={formData.sizes}
              onChange={handleChange}
              placeholder="S, M, L, XL"
            />

            <Input
              label="Colors"
              name="colors"
              value={formData.colors}
              onChange={handleChange}
              placeholder="Black, White, Red"
            />

            <div className="md:col-span-2">
              <Input
                label="Features"
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="Handmade, Cotton, Embroidery"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={7}
              placeholder="Describe the product..."
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            />
          </div>

          {/* Save */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
            <Link
              to="/seller/products"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" />

              {saving
                ? 'Saving...'
                : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Input({
  label,
  ...props
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-800">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
      />
    </div>
  )
}

export default EditProduct
