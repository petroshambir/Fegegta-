// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import {
//   ArrowLeft,
//   ImagePlus,
//   Plus,
//   X,
//   Star,
// } from 'lucide-react'

// import { useAuth } from '../../context/AuthContext'

// import {
//   getSellerStore,
//   saveSellerProduct,
//   addSellerNotification,
// } from '../../services/sellerStorage'

// function AddProduct() {
//   const navigate = useNavigate()
//   const { user } = useAuth()

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     category: '',
//     subcategory: '',
//     price: '',
//     oldPrice: '',
//     stock: '',
//     sku: '',
//     sizes: '',
//     colors: '',
//     material: '',
//     features: '',
//   })

//   const [images, setImages] = useState([])

//   const [error, setError] = useState('')
//   const [saving, setSaving] = useState(false)

//   // ============================================================
//   // FORM CHANGE
//   // ============================================================

//   const handleChange = (event) => {
//     const { name, value } = event.target

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))

//     setError('')
//   }

//   // ============================================================
//   // FILE -> DATA URL
//   // This makes images survive localStorage reload.
//   // ============================================================

//   const fileToDataUrl = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader()

//       reader.onload = () => {
//         resolve(reader.result)
//       }

//       reader.onerror = reject

//       reader.readAsDataURL(file)
//     })
//   }

//   // ============================================================
//   // ADD IMAGES
//   // MAXIMUM 4
//   // ============================================================

//   const handleImages = async (event) => {
//     const files = Array.from(
//       event.target.files || []
//     )

//     if (!files.length) return

//     const remainingSlots = 4 - images.length

//     if (remainingSlots <= 0) {
//       setError(
//         'You can upload a maximum of 4 product images.'
//       )
//       event.target.value = ''
//       return
//     }

//     const selectedFiles =
//       files.slice(0, remainingSlots)

//     try {
//       const convertedImages =
//         await Promise.all(
//           selectedFiles.map(
//             async (file, index) => ({
//               id: `${Date.now()}-${index}-${Math.random()
//                 .toString(36)
//                 .slice(2, 7)}`,
//               url: await fileToDataUrl(file),
//               name: file.name,
//             })
//           )
//         )

//       setImages((prev) => [
//         ...prev,
//         ...convertedImages,
//       ])

//       setError('')
//     } catch (imageError) {
//       console.error(
//         'Failed to load images:',
//         imageError
//       )

//       setError(
//         'Failed to load one or more images.'
//       )
//     }

//     event.target.value = ''
//   }

//   // ============================================================
//   // REMOVE IMAGE
//   // ============================================================

//   const removeImage = (id) => {
//     setImages((prev) =>
//       prev.filter(
//         (image) =>
//           image.id !== id
//       )
//     )
//   }

//   // ============================================================
//   // MAKE MAIN IMAGE
//   // ============================================================

//   const makeMainImage = (id) => {
//     setImages((prev) => {
//       const selected =
//         prev.find(
//           (image) =>
//             image.id === id
//         )

//       if (!selected) {
//         return prev
//       }

//       return [
//         selected,
//         ...prev.filter(
//           (image) =>
//             image.id !== id
//         ),
//       ]
//     })
//   }

//   // ============================================================
//   // SUBMIT
//   // ============================================================

//   const handleSubmit = (event) => {
//     event.preventDefault()

//     setError('')

//     if (
//       !formData.name.trim() ||
//       !formData.price ||
//       !formData.category
//     ) {
//       setError(
//         'Product name, price and category are required.'
//       )
//       return
//     }

//     if (images.length === 0) {
//       setError(
//         'Please add at least one product image.'
//       )
//       return
//     }

//     if (images.length > 4) {
//       setError(
//         'A product can have a maximum of 4 images.'
//       )
//       return
//     }

//     const store = getSellerStore()

//     if (!store) {
//       setError(
//         'Please complete your seller store first.'
//       )
//       return
//     }

//     const sellerId =
//       user?.sellerId ||
//       user?.id ||
//       user?.userId ||
//       store.sellerId

//     if (!sellerId) {
//       setError(
//         'Seller account information could not be found.'
//       )
//       return
//     }

//     setSaving(true)

//     const product =
//       saveSellerProduct({
//         name:
//           formData.name.trim(),

//         description:
//           formData.description.trim(),

//         category:
//           formData.category.trim(),

//         subcategory:
//           formData.subcategory.trim(),

//         price:
//           Number(formData.price),

//         oldPrice:
//           formData.oldPrice
//             ? Number(
//                 formData.oldPrice
//               )
//             : 0,

//         stock:
//           Number(
//             formData.stock || 0
//           ),

//         sku:
//           formData.sku.trim(),

//         sizes:
//           formData.sizes
//             .split(',')
//             .map((item) =>
//               item.trim()
//             )
//             .filter(Boolean),

//         colors:
//           formData.colors
//             .split(',')
//             .map((item) =>
//               item.trim()
//             )
//             .filter(Boolean),

//         material:
//           formData.material.trim(),

//         features:
//           formData.features
//             .split(',')
//             .map((item) =>
//               item.trim()
//             )
//             .filter(Boolean),

//         images,

//         image:
//           images[0]?.url || '',

//         sellerId,

//         storeId:
//           store.id,

//         storeSlug:
//           store.slug,

//         status:
//           'pending',

//         rejectionReason:
//           '',
//       })

//     if (!product) {
//       setSaving(false)

//       setError(
//         'Product could not be saved.'
//       )

//       return
//     }

//     addSellerNotification({
//       sellerId:
//         product.sellerId,

//       type:
//         'product-submitted',

//       title:
//         'Product submitted',

//       message:
//         `${product.name} was submitted for admin approval.`,

//       productId:
//         product.id,
//     })

//     setTimeout(() => {
//       navigate(
//         '/seller/products'
//       )
//     }, 400)
//   }

//   // ============================================================
//   // UI
//   // ============================================================

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-5xl">

//         <Link
//           to="/seller/products"
//           className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-black"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to Products
//         </Link>

//         <form
//           onSubmit={handleSubmit}
//           className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
//         >
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">
//               Add Product
//             </h1>

//             <p className="mt-1 text-sm text-gray-500">
//               Add your product information and up to 4 product images.
//             </p>
//           </div>

//           {error && (
//             <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//               {error}
//             </div>
//           )}

//           {/* ====================================================
//               BASIC INFORMATION
//           ==================================================== */}

//           <div className="mt-8 grid gap-6 md:grid-cols-2">

//             <Input
//               label="Product Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Example: Traditional Habesha Dress"
//               required
//             />

//             <Input
//               label="Category"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               placeholder="Example: Clothing"
//               required
//             />

//             <Input
//               label="Subcategory"
//               name="subcategory"
//               value={formData.subcategory}
//               onChange={handleChange}
//               placeholder="Example: Women's Dresses"
//             />

//             <Input
//               label="SKU"
//               name="sku"
//               value={formData.sku}
//               onChange={handleChange}
//               placeholder="Example: HAB-001"
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
//               label="Material / Quality"
//               name="material"
//               value={formData.material}
//               onChange={handleChange}
//               placeholder="Example: Cotton, handmade embroidery"
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

//           </div>

//           {/* ====================================================
//               DESCRIPTION
//           ==================================================== */}

//           <Textarea
//             label="Description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Describe the product..."
//           />

//           {/* ====================================================
//               FEATURES
//           ==================================================== */}

//           <div className="mt-6">
//             <Textarea
//               label="Features"
//               name="features"
//               value={formData.features}
//               onChange={handleChange}
//               placeholder="Handmade, Comfortable, High quality, Traditional design"
//             />

//             <p className="mt-2 text-xs text-gray-500">
//               Separate features with commas.
//             </p>
//           </div>

//           {/* ====================================================
//               IMAGES
//           ==================================================== */}

//           <div className="mt-8">

//             <div className="flex items-center justify-between">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-900">
//                   Product Images
//                 </label>

//                 <p className="mt-1 text-xs text-gray-500">
//                   Upload up to 4 images showing different sides or angles.
//                 </p>
//               </div>

//               <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
//                 {images.length}/4
//               </span>
//             </div>

//             {images.length < 4 && (
//               <label className="mt-4 flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 transition hover:border-black hover:bg-white">

//                 <ImagePlus className="h-9 w-9 text-gray-400" />

//                 <p className="mt-2 text-sm font-semibold text-gray-900">
//                   Add Product Images
//                 </p>

//                 <p className="mt-1 text-xs text-gray-500">
//                   {4 - images.length} image slot
//                   {4 - images.length !== 1
//                     ? 's'
//                     : ''}{' '}
//                   remaining
//                 </p>

//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   className="hidden"
//                   onChange={handleImages}
//                 />
//               </label>
//             )}

//             {/* IMAGE PREVIEW */}

//             {images.length > 0 && (
//               <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">

//                 {images.map(
//                   (image, index) => (
//                     <div
//                       key={image.id}
//                       className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-100"
//                     >
//                       <div className="aspect-square">
//                         <img
//                           src={image.url}
//                           alt={
//                             image.name ||
//                             `Product image ${
//                               index + 1
//                             }`
//                           }
//                           className="h-full w-full object-cover"
//                         />
//                       </div>

//                       {index === 0 && (
//                         <div className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-lg bg-black px-2 py-1 text-xs font-semibold text-white">
//                           <Star className="h-3 w-3 fill-current" />
//                           Main
//                         </div>
//                       )}

//                       <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-2 pt-8">

//                         {index !== 0 ? (
//                           <button
//                             type="button"
//                             onClick={() =>
//                               makeMainImage(
//                                 image.id
//                               )
//                             }
//                             className="text-xs font-semibold text-white hover:underline"
//                           >
//                             Make main
//                           </button>
//                         ) : (
//                           <span className="text-xs text-white">
//                             Main image
//                           </span>
//                         )}

//                         <button
//                           type="button"
//                           onClick={() =>
//                             removeImage(
//                               image.id
//                             )
//                           }
//                           className="rounded-lg bg-white/90 p-1.5 text-red-600 transition hover:bg-white"
//                           aria-label="Remove image"
//                         >
//                           <X className="h-4 w-4" />
//                         </button>

//                       </div>
//                     </div>
//                   )
//                 )}

//               </div>
//             )}

//           </div>

//           {/* ====================================================
//               STORE INFORMATION
//           ==================================================== */}

//           <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-4">
//             <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
//               Product will be added to
//             </p>

//             <p className="mt-1 font-semibold text-gray-900">
//               {getSellerStore()?.storeName ||
//                 'Your Store'}
//             </p>

//             {getSellerStore()?.slug && (
//               <p className="mt-1 text-xs text-gray-500">
//                 /store/{getSellerStore().slug}
//               </p>
//             )}
//           </div>

//           {/* ====================================================
//               SUBMIT
//           ==================================================== */}

//           <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

//             <Link
//               to="/seller/products"
//               className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
//             >
//               Cancel
//             </Link>

//             <button
//               type="submit"
//               disabled={saving}
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               <Plus className="h-4 w-4" />

//               {saving
//                 ? 'Submitting...'
//                 : 'Submit Product'}
//             </button>

//           </div>

//         </form>
//       </div>
//     </div>
//   )
// }

// // ============================================================
// // INPUT
// // ============================================================

// function Input({
//   label,
//   ...props
// }) {
//   return (
//     <div>
//       <label className="mb-2 block text-sm font-medium text-gray-900">
//         {label}
//       </label>

//       <input
//         {...props}
//         className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
//       />
//     </div>
//   )
// }

// // ============================================================
// // TEXTAREA
// // ============================================================

// function Textarea({
//   label,
//   ...props
// }) {
//   return (
//     <div className="mt-6">
//       <label className="mb-2 block text-sm font-medium text-gray-900">
//         {label}
//       </label>

//       <textarea
//         {...props}
//         rows={5}
//         className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
//       />
//     </div>
//   )
// }

// export default AddProduct

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ImagePlus,
  Plus,
  X,
  Star,
  Loader2,
} from 'lucide-react'

import { useAuth } from '../../context/AuthContext'

// ============================================================
// API
// ============================================================

const API_URL =
  'https://fegegta-server.onrender.com/api'

// ============================================================
// ADD PRODUCT
// ============================================================

function AddProduct() {
  const navigate = useNavigate()
  const { user } = useAuth()

  // ============================================================
  // STORE
  // ============================================================

  const [store, setStore] = useState(null)
  const [loadingStore, setLoadingStore] = useState(true)

  // ============================================================
  // FORM
  // ============================================================

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    price: '',
    oldPrice: '',
    stock: '',
    sku: '',
    sizes: '',
    colors: '',
    material: '',
    features: '',
  })

  const [images, setImages] = useState([])

  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  // ============================================================
  // GET TOKEN
  // ============================================================

  const getToken = () => {
    return localStorage.getItem('token')
  }

  // ============================================================
  // LOAD SELLER STORE FROM BACKEND
  // ============================================================

  useEffect(() => {
    const loadStore = async () => {
      try {
        setLoadingStore(true)
        setError('')

        const token = getToken()

        if (!token) {
          setError(
            'Please log in to your seller account.'
          )
          return
        }

        const response = await fetch(
          `${API_URL}/seller/store`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data?.message ||
              'Unable to load your seller store.'
          )
        }

        /*
          Backend may return:

          {
            success: true,
            store: {...}
          }

          OR:

          {
            success: true,
            data: {...}
          }

          OR directly:

          {
            success: true,
            store: {
              ...
            }
          }
        */

        const loadedStore =
          data?.store ||
          data?.data?.store ||
          data?.data ||
          null

        if (!loadedStore) {
          setStore(null)

          setError(
            'Your seller store could not be found. Please contact the administrator.'
          )

          return
        }

        setStore(loadedStore)
      } catch (storeError) {
        console.error(
          'Load seller store error:',
          storeError
        )

        setStore(null)

        setError(
          storeError?.message ||
            'Unable to load your seller store.'
        )
      } finally {
        setLoadingStore(false)
      }
    }

    loadStore()
  }, [])

  // ============================================================
  // FORM CHANGE
  // ============================================================

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setError('')
  }

  // ============================================================
  // ADD IMAGES
  // ============================================================

  const handleImages = (event) => {
    const files = Array.from(
      event.target.files || []
    )

    if (!files.length) return

    const remainingSlots =
      4 - images.length

    if (remainingSlots <= 0) {
      setError(
        'You can upload a maximum of 4 product images.'
      )

      event.target.value = ''

      return
    }

    const selectedFiles =
      files.slice(0, remainingSlots)

    const newImages =
      selectedFiles.map((file, index) => ({
        id: `${Date.now()}-${index}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,

        file,

        url: URL.createObjectURL(file),

        name: file.name,
      }))

    setImages((prev) => [
      ...prev,
      ...newImages,
    ])

    setError('')

    event.target.value = ''
  }

  // ============================================================
  // REMOVE IMAGE
  // ============================================================

  const removeImage = (id) => {
    setImages((prev) => {
      const imageToRemove =
        prev.find(
          (image) => image.id === id
        )

      if (imageToRemove?.url) {
        URL.revokeObjectURL(
          imageToRemove.url
        )
      }

      return prev.filter(
        (image) =>
          image.id !== id
      )
    })
  }

  // ============================================================
  // MAKE MAIN IMAGE
  // ============================================================

  const makeMainImage = (id) => {
    setImages((prev) => {
      const selected =
        prev.find(
          (image) =>
            image.id === id
        )

      if (!selected) {
        return prev
      }

      return [
        selected,
        ...prev.filter(
          (image) =>
            image.id !== id
        ),
      ]
    })
  }

  // ============================================================
  // SUBMIT PRODUCT
  // ============================================================

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')

    // ----------------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------------

    if (
      !formData.name.trim() ||
      !formData.price ||
      !formData.category.trim()
    ) {
      setError(
        'Product name, price and category are required.'
      )

      return
    }

    if (Number(formData.price) < 0) {
      setError(
        'Product price cannot be negative.'
      )

      return
    }

    if (
      formData.oldPrice &&
      Number(formData.oldPrice) < 0
    ) {
      setError(
        'Old price cannot be negative.'
      )

      return
    }

    if (
      formData.stock &&
      Number(formData.stock) < 0
    ) {
      setError(
        'Stock cannot be negative.'
      )

      return
    }

    if (images.length === 0) {
      setError(
        'Please add at least one product image.'
      )

      return
    }

    if (images.length > 4) {
      setError(
        'A product can have a maximum of 4 images.'
      )

      return
    }

    // ----------------------------------------------------------
    // STORE VALIDATION
    // ----------------------------------------------------------

    if (!store?._id && !store?.id) {
      setError(
        'Your seller store could not be found. Please complete your seller store first.'
      )

      return
    }

    const token = getToken()

    if (!token) {
      setError(
        'Your login session has expired. Please log in again.'
      )

      return
    }

    setSaving(true)

    try {
      // ========================================================
      // FORM DATA
      // ========================================================

      const data = new FormData()

      data.append(
        'name',
        formData.name.trim()
      )

      data.append(
        'description',
        formData.description.trim()
      )

      data.append(
        'category',
        formData.category.trim()
      )

      data.append(
        'subcategory',
        formData.subcategory.trim()
      )

      data.append(
        'price',
        String(
          Number(formData.price)
        )
      )

      data.append(
        'oldPrice',
        String(
          formData.oldPrice
            ? Number(formData.oldPrice)
            : 0
        )
      )

      data.append(
        'stock',
        String(
          formData.stock
            ? Number(formData.stock)
            : 0
        )
      )

      data.append(
        'sku',
        formData.sku.trim()
      )

      data.append(
        'sizes',
        JSON.stringify(
          formData.sizes
            .split(',')
            .map((item) =>
              item.trim()
            )
            .filter(Boolean)
        )
      )

      data.append(
        'colors',
        JSON.stringify(
          formData.colors
            .split(',')
            .map((item) =>
              item.trim()
            )
            .filter(Boolean)
        )
      )

      data.append(
        'material',
        formData.material.trim()
      )

      data.append(
        'features',
        JSON.stringify(
          formData.features
            .split(',')
            .map((item) =>
              item.trim()
            )
            .filter(Boolean)
        )
      )

      // --------------------------------------------------------
      // STORE
      // --------------------------------------------------------

      data.append(
        'storeId',
        store?._id ||
          store?.id ||
          ''
      )

      data.append(
        'storeSlug',
        store?.slug || ''
      )

      // --------------------------------------------------------
      // IMAGES
      // --------------------------------------------------------

      images.forEach((image) => {
        if (image.file) {
          data.append(
            'images',
            image.file
          )
        }
      })

      // ========================================================
      // SEND TO BACKEND
      // ========================================================

      const response = await fetch(
        `${API_URL}/products/seller`,
        {
          method: 'POST',

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: data,
        }
      )

      const result =
        await response.json()

      if (!response.ok) {
        throw new Error(
          result?.message ||
            'Product could not be submitted.'
        )
      }

      // ========================================================
      // SUCCESS
      // ========================================================

      navigate(
        '/seller/products',
        {
          replace: true,
          state: {
            successMessage:
              'Product submitted successfully and is waiting for admin approval.',
          },
        }
      )
    } catch (submitError) {
      console.error(
        'Add product error:',
        submitError
      )

      setError(
        submitError?.message ||
          'Product could not be submitted.'
      )
    } finally {
      setSaving(false)
    }
  }

  // ============================================================
  // LOADING STORE
  // ============================================================

  if (loadingStore) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
          <Loader2 className="h-5 w-5 animate-spin text-gray-700" />

          <span className="text-sm font-medium text-gray-700">
            Loading your store...
          </span>
        </div>
      </div>
    )
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        <Link
          to="/seller/products"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >

          {/* ====================================================
              HEADER
          ==================================================== */}

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Add Product
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Add your product information and up to 4 product images.
            </p>
          </div>

          {/* ====================================================
              ERROR
          ==================================================== */}

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* ====================================================
              BASIC INFORMATION
          ==================================================== */}

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <Input
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Example: Traditional Habesha Dress"
              required
            />

            <Input
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Example: Clothing"
              required
            />

            <Input
              label="Subcategory"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              placeholder="Example: Women's Dresses"
            />

            <Input
              label="SKU"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="Example: HAB-001"
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
              label="Material / Quality"
              name="material"
              value={formData.material}
              onChange={handleChange}
              placeholder="Example: Cotton, handmade embroidery"
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

          </div>

          {/* ====================================================
              DESCRIPTION
          ==================================================== */}

          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the product..."
          />

          {/* ====================================================
              FEATURES
          ==================================================== */}

          <div className="mt-6">

            <Textarea
              label="Features"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="Handmade, Comfortable, High quality, Traditional design"
            />

            <p className="mt-2 text-xs text-gray-500">
              Separate features with commas.
            </p>

          </div>

          {/* ====================================================
              IMAGES
          ==================================================== */}

          <div className="mt-8">

            <div className="flex items-center justify-between">

              <div>
                <label className="block text-sm font-semibold text-gray-900">
                  Product Images
                </label>

                <p className="mt-1 text-xs text-gray-500">
                  Upload up to 4 images showing different sides or angles.
                </p>
              </div>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                {images.length}/4
              </span>

            </div>

            {images.length < 4 && (
              <label className="mt-4 flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 transition hover:border-black hover:bg-white">

                <ImagePlus className="h-9 w-9 text-gray-400" />

                <p className="mt-2 text-sm font-semibold text-gray-900">
                  Add Product Images
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {4 - images.length} image slot
                  {4 - images.length !== 1
                    ? 's'
                    : ''}{' '}
                  remaining
                </p>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImages}
                />

              </label>
            )}

            {/* IMAGE PREVIEW */}

            {images.length > 0 && (
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">

                {images.map(
                  (image, index) => (
                    <div
                      key={image.id}
                      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-100"
                    >

                      <div className="aspect-square">
                        <img
                          src={image.url}
                          alt={
                            image.name ||
                            `Product image ${index + 1}`
                          }
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {index === 0 && (
                        <div className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-lg bg-black px-2 py-1 text-xs font-semibold text-white">
                          <Star className="h-3 w-3 fill-current" />
                          Main
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-2 pt-8">

                        {index !== 0 ? (
                          <button
                            type="button"
                            onClick={() =>
                              makeMainImage(
                                image.id
                              )
                            }
                            className="text-xs font-semibold text-white hover:underline"
                          >
                            Make main
                          </button>
                        ) : (
                          <span className="text-xs text-white">
                            Main image
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            removeImage(
                              image.id
                            )
                          }
                          className="rounded-lg bg-white/90 p-1.5 text-red-600 transition hover:bg-white"
                          aria-label="Remove image"
                        >
                          <X className="h-4 w-4" />
                        </button>

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

          </div>

          {/* ====================================================
              STORE INFORMATION
          ==================================================== */}

          <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-4">

            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Product will be added to
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {store?.name ||
                store?.storeName ||
                'Your Store'}
            </p>

            {store?.slug && (
              <p className="mt-1 text-xs text-gray-500">
                /store/{store.slug}
              </p>
            )}

          </div>

          {/* ====================================================
              SUBMIT
          ==================================================== */}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              to="/seller/products"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={
                saving ||
                !store
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Submit Product
                </>
              )}
            </button>

          </div>

        </form>
      </div>
    </div>
  )
}

// ============================================================
// INPUT
// ============================================================

function Input({
  label,
  ...props
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-900">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
      />
    </div>
  )
}

// ============================================================
// TEXTAREA
// ============================================================

function Textarea({
  label,
  ...props
}) {
  return (
    <div className="mt-6">

      <label className="mb-2 block text-sm font-medium text-gray-900">
        {label}
      </label>

      <textarea
        {...props}
        rows={5}
        className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
      />

    </div>
  )
}

export default AddProduct