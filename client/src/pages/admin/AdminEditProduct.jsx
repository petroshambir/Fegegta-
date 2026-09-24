
// import React, { useEffect, useState } from 'react'
// import {
//   ArrowLeft,
//   Upload,
//   X,
//   Loader2,
//   ImagePlus,
// } from 'lucide-react'
// import {
//   Link,
//   useNavigate,
//   useParams,
// } from 'react-router-dom'

// import AdminSidebar from '../../components/admin/AdminSidebar'
// import AdminHeader from '../../components/admin/AdminHeader'

// // ============================================================
// // FEGEGTA BACKEND API
// // ============================================================

// const API_URL =
//   'https://fegegta-server.onrender.com/api'

// // ============================================================
// // ADMIN EDIT PRODUCT
// // ============================================================

// function AdminEditProduct() {
//   const { id } = useParams()
//   const navigate = useNavigate()

//   // ==========================================================
//   // MOBILE SIDEBAR
//   // ==========================================================

//   const [mobileOpen, setMobileOpen] = useState(false)

//   // ==========================================================
//   // LOADING / SAVING
//   // ==========================================================

//   const [loading, setLoading] = useState(true)
//   const [saving, setSaving] = useState(false)

//   // ==========================================================
//   // ERROR
//   // ==========================================================

//   const [error, setError] = useState('')

//   // ==========================================================
//   // FORM
//   // ==========================================================

//   const [form, setForm] = useState({
//     name: '',
//     description: '',
//     category: '',
//     subcategory: '',
//     sku: '',
//     price: '',
//     oldPrice: '',
//     stock: '',
//     material: '',
//     sizes: '',
//     colors: '',
//     features: '',
//     images: [],
//   })

//   // ==========================================================
//   // GET TOKEN
//   // ==========================================================

//   const getToken = () => {
//     return localStorage.getItem('token')
//   }

//   // ==========================================================
//   // LOAD PRODUCT
//   // ==========================================================

//   useEffect(() => {
//     let cancelled = false

//     const loadProduct = async () => {
//       try {
//         setLoading(true)
//         setError('')

//         const token = getToken()

//         if (!token) {
//           throw new Error(
//             'Authentication token not found. Please login again.'
//           )
//         }

//         // ------------------------------------------------------
//         // GET ADMIN PRODUCTS
//         // ------------------------------------------------------

//         const response = await fetch(
//           `${API_URL}/admin/products`,
//           {
//             method: 'GET',
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           }
//         )

//         let data = {}

//         try {
//           data = await response.json()
//         } catch {
//           data = {}
//         }

//         if (!response.ok) {
//           throw new Error(
//             data?.message ||
//               'Failed to load product.'
//           )
//         }

//         if (!data?.success) {
//           throw new Error(
//             data?.message ||
//               'Failed to load product.'
//           )
//         }

//         // ------------------------------------------------------
//         // SUPPORT BACKEND RESPONSE
//         // ------------------------------------------------------

//         const products =
//           Array.isArray(data?.products)
//             ? data.products
//             : Array.isArray(data?.data)
//               ? data.data
//               : Array.isArray(data?.products?.products)
//                 ? data.products.products
//                 : []

//         // ------------------------------------------------------
//         // FIND PRODUCT
//         // ------------------------------------------------------

//         const product = products.find(
//           (item) =>
//             String(item?._id || item?.id) ===
//             String(id)
//         )

//         if (!product) {
//           throw new Error(
//             'Product not found.'
//           )
//         }

//         // ------------------------------------------------------
//         // EXISTING IMAGES
//         // ------------------------------------------------------

//         const existingImages =
//           Array.isArray(product.images)
//             ? product.images
//                 .map((image) => {
//                   if (
//                     typeof image ===
//                     'string'
//                   ) {
//                     return image
//                   }

//                   return image?.url || ''
//                 })
//                 .filter(Boolean)
//                 .slice(0, 4)
//             : []

//         // ------------------------------------------------------
//         // PRODUCT DATA
//         // ------------------------------------------------------

//         const nextForm = {
//           name: product.name || '',

//           description:
//             product.description || '',

//           category:
//             product.category || '',

//           subcategory:
//             product.subcategory || '',

//           sku:
//             product.sku || '',

//           price:
//             product.price ?? '',

//           oldPrice:
//             product.compareAtPrice ??
//             product.oldPrice ??
//             '',

//           stock:
//             product.stock ?? '',

//           material:
//             product.material || '',

//           sizes:
//             Array.isArray(product.sizes)
//               ? product.sizes.join(', ')
//               : product.sizes || '',

//           colors:
//             Array.isArray(product.colors)
//               ? product.colors.join(', ')
//               : product.colors || '',

//           features:
//             Array.isArray(product.features)
//               ? product.features.join(', ')
//               : product.features || '',

//           images: existingImages,
//         }

//         if (!cancelled) {
//           setForm(nextForm)
//         }
//       } catch (error) {
//         console.error(
//           'Load product error:',
//           error
//         )

//         if (!cancelled) {
//           setError(
//             error?.message ||
//               'Failed to load product.'
//           )
//         }
//       } finally {
//         if (!cancelled) {
//           setLoading(false)
//         }
//       }
//     }

//     if (id) {
//       loadProduct()
//     } else {
//       setError('Product ID is missing.')
//       setLoading(false)
//     }

//     return () => {
//       cancelled = true
//     }
//   }, [id])

//   // ==========================================================
//   // UPDATE FIELD
//   // ==========================================================

//   const update = (field, value) => {
//     setForm((current) => ({
//       ...current,
//       [field]: value,
//     }))
//   }

//   // ==========================================================
//   // ADD NEW IMAGES
//   // ==========================================================

//   const handleImages = (event) => {
//     const files = Array.from(
//       event.target.files || []
//     )

//     // Reset file input
//     event.target.value = ''

//     if (!files.length) {
//       return
//     }

//     // --------------------------------------------------------
//     // FILTER VALID FILES
//     // --------------------------------------------------------

//     const allowedTypes = [
//       'image/jpeg',
//       'image/jpg',
//       'image/png',
//       'image/webp',
//     ]

//     const validFiles = files.filter(
//       (file) =>
//         allowedTypes.includes(file.type)
//     )

//     if (validFiles.length !== files.length) {
//       alert(
//         'Only JPG, JPEG, PNG, and WEBP images are allowed.'
//       )
//     }

//     if (!validFiles.length) {
//       return
//     }

//     // --------------------------------------------------------
//     // MAX 4 IMAGES
//     // --------------------------------------------------------

//     const availableSlots =
//       4 - form.images.length

//     if (availableSlots <= 0) {
//       alert(
//         'A product can have a maximum of 4 images.'
//       )
//       return
//     }

//     const filesToAdd =
//       validFiles.slice(0, availableSlots)

//     if (
//       validFiles.length >
//       availableSlots
//     ) {
//       alert(
//         `Only ${availableSlots} more image(s) can be added. Maximum is 4 images.`
//       )
//     }

//     // --------------------------------------------------------
//     // CREATE PREVIEWS
//     // --------------------------------------------------------

//     const imageFiles =
//       filesToAdd.map((file) => ({
//         file,
//         preview:
//           URL.createObjectURL(file),
//       }))

//     setForm((current) => ({
//       ...current,
//       images: [
//         ...current.images,
//         ...imageFiles,
//       ].slice(0, 4),
//     }))
//   }

//   // ==========================================================
//   // REMOVE IMAGE
//   // ==========================================================

//   const removeImage = (index) => {
//     setForm((current) => {
//       const imageToRemove =
//         current.images[index]

//       // ------------------------------------------------------
//       // CLEAN OBJECT URL FOR NEW IMAGE
//       // ------------------------------------------------------

//       if (
//         imageToRemove &&
//         typeof imageToRemove ===
//           'object' &&
//         imageToRemove.preview
//       ) {
//         URL.revokeObjectURL(
//           imageToRemove.preview
//         )
//       }

//       return {
//         ...current,
//         images: current.images.filter(
//           (_, imageIndex) =>
//             imageIndex !== index
//         ),
//       }
//     })
//   }

//   // ==========================================================
//   // SUBMIT
//   // ==========================================================

//   const handleSubmit = async (event) => {
//     event.preventDefault()

//     if (saving) {
//       return
//     }

//     try {
//       setSaving(true)
//       setError('')

//       const token = getToken()

//       if (!token) {
//         throw new Error(
//           'Authentication token not found. Please login again.'
//         )
//       }

//       // ======================================================
//       // BASIC VALIDATION
//       // ======================================================

//       if (!form.name.trim()) {
//         throw new Error(
//           'Product name is required.'
//         )
//       }

//       if (!form.category.trim()) {
//         throw new Error(
//           'Product category is required.'
//         )
//       }

//       if (
//         form.price === '' ||
//         !Number.isFinite(
//           Number(form.price)
//         ) ||
//         Number(form.price) < 0
//       ) {
//         throw new Error(
//           'Please enter a valid product price.'
//         )
//       }

//       if (
//         form.oldPrice !== '' &&
//         (
//           !Number.isFinite(
//             Number(form.oldPrice)
//           ) ||
//           Number(form.oldPrice) < 0
//         )
//       ) {
//         throw new Error(
//           'Please enter a valid old price.'
//         )
//       }

//       if (
//         form.stock !== '' &&
//         (
//           !Number.isFinite(
//             Number(form.stock)
//           ) ||
//           Number(form.stock) < 0
//         )
//       ) {
//         throw new Error(
//           'Stock cannot be negative.'
//         )
//       }

//       if (form.images.length === 0) {
//         throw new Error(
//           'Please add at least one product image.'
//         )
//       }

//       if (form.images.length > 4) {
//         throw new Error(
//           'A product can have a maximum of 4 images.'
//         )
//       }

//       // ======================================================
//       // FORM DATA
//       // ======================================================

//       const formData =
//         new FormData()

//       // ------------------------------------------------------
//       // BASIC PRODUCT INFORMATION
//       // ------------------------------------------------------

//       formData.append(
//         'name',
//         form.name.trim()
//       )

//       formData.append(
//         'description',
//         form.description.trim()
//       )

//       formData.append(
//         'category',
//         form.category.trim()
//       )

//       formData.append(
//         'subcategory',
//         form.subcategory.trim()
//       )

//       formData.append(
//         'sku',
//         form.sku.trim()
//       )

//       formData.append(
//         'price',
//         String(
//           Number(form.price)
//         )
//       )

//       // ------------------------------------------------------
//       // COMPARE AT / OLD PRICE
//       // ------------------------------------------------------

//       formData.append(
//         'oldPrice',
//         form.oldPrice === ''
//           ? '0'
//           : String(
//               Number(form.oldPrice)
//             )
//       )

//       // ------------------------------------------------------
//       // STOCK
//       // ------------------------------------------------------

//       formData.append(
//         'stock',
//         form.stock === ''
//           ? '0'
//           : String(
//               Number(form.stock)
//             )
//       )

//       // ------------------------------------------------------
//       // MATERIAL
//       // ------------------------------------------------------

//       formData.append(
//         'material',
//         form.material.trim()
//       )

//       // ======================================================
//       // ARRAY FIELDS
//       // ======================================================

//       formData.append(
//         'sizes',
//         JSON.stringify(
//           splitValues(form.sizes)
//         )
//       )

//       formData.append(
//         'colors',
//         JSON.stringify(
//           splitValues(form.colors)
//         )
//       )

//       formData.append(
//         'features',
//         JSON.stringify(
//           splitValues(form.features)
//         )
//       )

//       // ======================================================
//       // EXISTING IMAGES
//       // ======================================================
//       //
//       // Existing Cloudinary images are strings in the frontend.
//       //
//       // We send their URLs to the backend.
//       //
//       // Backend uses these URLs to decide which old images
//       // should remain.
//       //
//       // ======================================================

//       const existingImages =
//         form.images
//           .filter(
//             (image) =>
//               typeof image ===
//               'string' &&
//               image.trim()
//           )

//       formData.append(
//         'existingImages',
//         JSON.stringify(
//           existingImages
//         )
//       )

//       // ======================================================
//       // NEW IMAGE FILES
//       // ======================================================
//       //
//       // Only actual File objects are uploaded.
//       //
//       // Cloudinary upload happens on the backend.
//       //
//       // ======================================================

//       form.images
//         .filter(
//           (image) =>
//             image &&
//             typeof image ===
//               'object' &&
//             image.file
//         )
//         .forEach((image) => {
//           formData.append(
//             'images',
//             image.file
//           )
//         })

//       // ======================================================
//       // SEND UPDATE REQUEST
//       // ======================================================

//       const response =
//         await fetch(
//           `${API_URL}/admin/products/${id}`,
//           {
//             method: 'PUT',

//             headers: {
//               Authorization:
//                 `Bearer ${token}`,
//             },

//             // IMPORTANT:
//             // Do NOT add Content-Type here.
//             //
//             // Browser automatically creates:
//             // multipart/form-data boundary
//             //
//             body: formData,
//           }
//         )

//       let data = {}

//       try {
//         data =
//           await response.json()
//       } catch {
//         data = {}
//       }

//       // ======================================================
//       // RESPONSE ERROR
//       // ======================================================

//       if (!response.ok) {
//         throw new Error(
//           data?.message ||
//             'Failed to update product.'
//         )
//       }

//       if (!data?.success) {
//         throw new Error(
//           data?.message ||
//             'Failed to update product.'
//         )
//       }

//       // ======================================================
//       // SUCCESS
//       // ======================================================

//       alert(
//         'Product updated successfully.'
//       )

//       navigate(
//         '/admin/my-products'
//       )
//     } catch (error) {
//       console.error(
//         'Update product error:',
//         error
//       )

//       setError(
//         error?.message ||
//           'Something went wrong while updating the product.'
//       )

//       // Scroll to top so user can see error
//       window.scrollTo({
//         top: 0,
//         behavior: 'smooth',
//       })
//     } finally {
//       setSaving(false)
//     }
//   }

//   // ==========================================================
//   // LOADING SCREEN
//   // ==========================================================

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <Loader2
//             size={34}
//             className="mx-auto animate-spin text-gray-700"
//           />

//           <p className="mt-3 text-sm text-gray-500">
//             Loading product...
//           </p>
//         </div>
//       </div>
//     )
//   }

//   // ==========================================================
//   // MAIN UI
//   // ==========================================================

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* ======================================================
//           SIDEBAR
//       ====================================================== */}

//       <AdminSidebar
//         mobileOpen={mobileOpen}
//         onClose={() =>
//           setMobileOpen(false)
//         }
//       />

//       {/* ======================================================
//           MAIN AREA
//       ====================================================== */}

//       <div className="lg:pl-72">

//         {/* ====================================================
//             HEADER
//         ==================================================== */}

//         <AdminHeader
//           onMenuClick={() =>
//             setMobileOpen(true)
//           }
//         />

//         <main className="p-4 sm:p-6 lg:p-8">

//           {/* ==================================================
//               BACK
//           ================================================== */}

//           <Link
//             to="/admin/my-products"
//             className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
//           >
//             <ArrowLeft size={17} />

//             Back to My Products
//           </Link>

//           {/* ==================================================
//               TITLE
//           ================================================== */}

//           <div className="mt-4">

//             <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
//               Edit Product
//             </h1>

//             <p className="mt-1 text-sm text-gray-500">
//               Update your product information and images.
//             </p>

//           </div>

//           {/* ==================================================
//               ERROR
//           ================================================== */}

//           {error && (
//             <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4">

//               <div className="mt-0.5 shrink-0">
//                 <X
//                   size={18}
//                   className="text-red-600"
//                 />
//               </div>

//               <div>
//                 <p className="text-sm font-semibold text-red-800">
//                   Unable to update product
//                 </p>

//                 <p className="mt-1 text-sm text-red-700">
//                   {error}
//                 </p>
//               </div>

//             </div>
//           )}

//           {/* ==================================================
//               FORM
//           ================================================== */}

//           <form
//             onSubmit={handleSubmit}
//             className="mt-6 space-y-6"
//           >

//             {/* =================================================
//                 PRODUCT IMAGES
//             ================================================= */}

//             <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

//               <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//                 <div>
//                   <h2 className="text-lg font-bold text-gray-900">
//                     Product Images
//                   </h2>

//                   <p className="mt-1 text-sm text-gray-500">
//                     Upload up to 4 product images.
//                   </p>
//                 </div>

//                 <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
//                   {form.images.length}/4
//                 </span>

//               </div>

//               {/* =================================================
//                   IMAGE GRID
//               ================================================= */}

//               <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">

//                 {form.images.map(
//                   (image, index) => {

//                     const imageUrl =
//                       typeof image ===
//                       'string'
//                         ? image
//                         : image?.preview

//                     return (
//                       <div
//                         key={`${imageUrl}-${index}`}
//                         className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
//                       >

//                         {/* IMAGE */}

//                         {imageUrl ? (
//                           <img
//                             src={imageUrl}
//                             alt={`Product ${index + 1}`}
//                             className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
//                           />
//                         ) : (
//                           <div className="flex h-full items-center justify-center text-gray-400">
//                             <ImagePlus
//                               size={28}
//                             />
//                           </div>
//                         )}

//                         {/* DARK OVERLAY */}

//                         <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />

//                         {/* REMOVE BUTTON */}

//                         <button
//                           type="button"
//                           onClick={() =>
//                             removeImage(
//                               index
//                             )
//                           }
//                           disabled={saving}
//                           aria-label={`Remove image ${index + 1}`}
//                           className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-red-600 shadow-md transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
//                         >
//                           <X size={16} />
//                         </button>

//                         {/* IMAGE TYPE */}

//                         {typeof image ===
//                           'object' && (
//                           <div className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold text-white">
//                             New
//                           </div>
//                         )}

//                         {typeof image ===
//                           'string' && (
//                           <div className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-gray-700">
//                             Current
//                           </div>
//                         )}

//                       </div>
//                     )
//                   }
//                 )}

//                 {/* =================================================
//                     ADD IMAGE
//                 ================================================= */}

//                 {form.images.length < 4 && (
//                   <label
//                     className={`flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-500 transition hover:border-gray-500 hover:bg-gray-50 ${
//                       saving
//                         ? 'pointer-events-none opacity-50'
//                         : ''
//                     }`}
//                   >

//                     <Upload size={26} />

//                     <span className="mt-2 text-xs font-semibold">
//                       Add Image
//                     </span>

//                     <span className="mt-1 text-[10px] text-gray-400">
//                       JPG, PNG, WEBP
//                     </span>

//                     <input
//                       type="file"
//                       accept="image/jpeg,image/jpg,image/png,image/webp"
//                       multiple
//                       onChange={
//                         handleImages
//                       }
//                       disabled={saving}
//                       className="hidden"
//                     />

//                   </label>
//                 )}

//               </div>

//             </section>

//             {/* =================================================
//                 PRODUCT INFORMATION
//             ================================================= */}

//             <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

//               <div className="mb-6">

//                 <h2 className="text-lg font-bold text-gray-900">
//                   Product Information
//                 </h2>

//                 <p className="mt-1 text-sm text-gray-500">
//                   Update the details of your product.
//                 </p>

//               </div>

//               <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

//                 {/* PRODUCT NAME */}

//                 <Field
//                   label="Product Name"
//                   value={form.name}
//                   onChange={(value) =>
//                     update(
//                       'name',
//                       value
//                     )
//                   }
//                   required
//                   disabled={saving}
//                 />

//                 {/* SKU */}

//                 <Field
//                   label="SKU"
//                   value={form.sku}
//                   onChange={(value) =>
//                     update(
//                       'sku',
//                       value
//                     )
//                   }
//                   disabled={saving}
//                 />

//                 {/* CATEGORY */}

//                 <Field
//                   label="Category"
//                   value={form.category}
//                   onChange={(value) =>
//                     update(
//                       'category',
//                       value
//                     )
//                   }
//                   required
//                   disabled={saving}
//                 />

//                 {/* SUBCATEGORY */}

//                 <Field
//                   label="Subcategory"
//                   value={
//                     form.subcategory
//                   }
//                   onChange={(value) =>
//                     update(
//                       'subcategory',
//                       value
//                     )
//                   }
//                   disabled={saving}
//                 />

//                 {/* PRICE */}

//                 <Field
//                   label="Price (€)"
//                   type="number"
//                   min="0"
//                   step="0.01"
//                   value={form.price}
//                   onChange={(value) =>
//                     update(
//                       'price',
//                       value
//                     )
//                   }
//                   required
//                   disabled={saving}
//                 />

//                 {/* OLD PRICE */}

//                 <Field
//                   label="Old Price (€)"
//                   type="number"
//                   min="0"
//                   step="0.01"
//                   value={
//                     form.oldPrice
//                   }
//                   onChange={(value) =>
//                     update(
//                       'oldPrice',
//                       value
//                     )
//                   }
//                   disabled={saving}
//                 />

//                 {/* STOCK */}

//                 <Field
//                   label="Stock"
//                   type="number"
//                   min="0"
//                   step="1"
//                   value={form.stock}
//                   onChange={(value) =>
//                     update(
//                       'stock',
//                       value
//                     )
//                   }
//                   disabled={saving}
//                 />

//                 {/* MATERIAL */}

//                 <Field
//                   label="Material / Quality"
//                   value={
//                     form.material
//                   }
//                   onChange={(value) =>
//                     update(
//                       'material',
//                       value
//                     )
//                   }
//                   disabled={saving}
//                 />

//                 {/* SIZES */}

//                 <Field
//                   label="Sizes"
//                   value={form.sizes}
//                   onChange={(value) =>
//                     update(
//                       'sizes',
//                       value
//                     )
//                   }
//                   placeholder="S, M, L, XL"
//                   disabled={saving}
//                 />

//                 {/* COLORS */}

//                 <Field
//                   label="Colors"
//                   value={form.colors}
//                   onChange={(value) =>
//                     update(
//                       'colors',
//                       value
//                     )
//                   }
//                   placeholder="White, Gold, Black"
//                   disabled={saving}
//                 />

//                 {/* FEATURES */}

//                 <Field
//                   label="Features"
//                   value={
//                     form.features
//                   }
//                   onChange={(value) =>
//                     update(
//                       'features',
//                       value
//                     )
//                   }
//                   placeholder="Handmade, Embroidery, Premium"
//                   disabled={saving}
//                 />

//                 {/* =================================================
//                     DESCRIPTION
//                 ================================================= */}

//                 <div className="md:col-span-2">

//                   <label className="block text-sm font-semibold text-gray-700">
//                     Description
//                   </label>

//                   <textarea
//                     value={
//                       form.description
//                     }
//                     onChange={(event) =>
//                       update(
//                         'description',
//                         event.target.value
//                       )
//                     }
//                     rows={6}
//                     disabled={saving}
//                     placeholder="Describe your product..."
//                     className="mt-2 w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50"
//                   />

//                 </div>

//               </div>

//             </section>

//             {/* =================================================
//                 BUTTONS
//             ================================================= */}

//             <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

//               {/* CANCEL */}

//               <Link
//                 to="/admin/my-products"
//                 className={`inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-7 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 ${
//                   saving
//                     ? 'pointer-events-none opacity-50'
//                     : ''
//                 }`}
//               >
//                 Cancel
//               </Link>

//               {/* UPDATE */}

//               <button
//                 type="submit"
//                 disabled={
//                   saving ||
//                   loading
//                 }
//                 className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
//               >

//                 {saving ? (
//                   <>
//                     <Loader2
//                       size={17}
//                       className="animate-spin"
//                     />

//                     Updating...
//                   </>
//                 ) : (
//                   'Update Product'
//                 )}

//               </button>

//             </div>

//           </form>
//         </main>
//       </div>
//     </div>
//   )
// }

// // ============================================================
// // FIELD COMPONENT
// // ============================================================

// function Field({
//   label,
//   value,
//   onChange,
//   type = 'text',
//   required = false,
//   min,
//   step,
//   placeholder,
//   disabled = false,
// }) {
//   return (
//     <div>

//       <label className="block text-sm font-semibold text-gray-700">
//         {label}
//       </label>

//       <input
//         type={type}
//         value={value}
//         onChange={(event) =>
//           onChange(
//             event.target.value
//           )
//         }
//         required={required}
//         min={min}
//         step={step}
//         placeholder={placeholder}
//         disabled={disabled}
//         className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50"
//       />

//     </div>
//   )
// }

// // ============================================================
// // SPLIT COMMA VALUES
// // ============================================================

// function splitValues(value) {
//   return String(value || '')
//     .split(',')
//     .map((item) =>
//       item.trim()
//     )
//     .filter(Boolean)
// }

// // ============================================================
// // EXPORT
// // ============================================================

// export default AdminEditProduct


import React, { useEffect, useState } from 'react'

import {
  ArrowLeft,
  Upload,
  X,
  Loader2,
  ImagePlus,
} from 'lucide-react'

import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'

// ============================================================
// FEGEGTA BACKEND API
// ============================================================

const API_URL =
  'https://fegegta-server.onrender.com/api'

// ============================================================
// ADMIN EDIT PRODUCT
// ============================================================

function AdminEditProduct() {
  const { id } =
    useParams()

  const navigate =
    useNavigate()

  // ==========================================================
  // MOBILE SIDEBAR
  // ==========================================================

  const [mobileOpen, setMobileOpen] =
    useState(false)

  // ==========================================================
  // LOADING / SAVING
  // ==========================================================

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  // ==========================================================
  // ERROR
  // ==========================================================

  const [error, setError] =
    useState('')

  // ==========================================================
  // FORM
  // ==========================================================

  const [form, setForm] =
    useState({
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

  // ==========================================================
  // GET TOKEN
  // ==========================================================

  const getToken = () => {
    return localStorage.getItem('token')
  }

  // ==========================================================
  // LOAD PRODUCT
  // ==========================================================

  useEffect(() => {
    let cancelled = false

    const loadProduct =
      async () => {
        try {
          setLoading(true)
          setError('')

          const token =
            getToken()

          if (!token) {
            throw new Error(
              'Authentication token not found. Please login again.'
            )
          }

          // --------------------------------------------------
          // GET ADMIN PRODUCTS
          // --------------------------------------------------

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

          let data = {}

          try {
            data =
              await response.json()
          } catch {
            data = {}
          }

          if (!response.ok) {
            throw new Error(
              data?.message ||
                'Failed to load product.'
            )
          }

          if (!data?.success) {
            throw new Error(
              data?.message ||
                'Failed to load product.'
            )
          }

          // --------------------------------------------------
          // SUPPORT BACKEND RESPONSE
          // --------------------------------------------------

          const products =
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

          // --------------------------------------------------
          // FIND PRODUCT
          // --------------------------------------------------

          const product =
            products.find(
              (item) =>
                String(
                  item?._id ||
                    item?.id
                ) ===
                String(id)
            )

          if (!product) {
            throw new Error(
              'Product not found.'
            )
          }

          // --------------------------------------------------
          // EXISTING IMAGES
          // --------------------------------------------------

          const existingImages =
            Array.isArray(
              product.images
            )
              ? product.images
                  .map(
                    (image) => {
                      if (
                        typeof image ===
                        'string'
                      ) {
                        return image
                      }

                      return (
                        image?.url ||
                        ''
                      )
                    }
                  )
                  .filter(Boolean)
                  .slice(0, 4)
              : []

          // --------------------------------------------------
          // PRODUCT DATA
          // --------------------------------------------------

          const nextForm = {
            name:
              product.name ||
              '',

            description:
              product.description ||
              '',

            category:
              product.category ||
              '',

            subcategory:
              product.subcategory ||
              '',

            sku:
              product.sku ||
              '',

            price:
              product.price ??
              '',

            oldPrice:
              product.compareAtPrice ??
              product.oldPrice ??
              '',

            stock:
              product.stock ??
              '',

            material:
              product.material ||
              '',

            sizes:
              Array.isArray(
                product.sizes
              )
                ? product.sizes.join(
                    ', '
                  )
                : product.sizes ||
                  '',

            colors:
              Array.isArray(
                product.colors
              )
                ? product.colors.join(
                    ', '
                  )
                : product.colors ||
                  '',

            features:
              Array.isArray(
                product.features
              )
                ? product.features.join(
                    ', '
                  )
                : product.features ||
                  '',

            images:
              existingImages,
          }

          if (!cancelled) {
            setForm(
              nextForm
            )
          }

        } catch (error) {
          console.error(
            'Load product error:',
            error
          )

          if (!cancelled) {
            setError(
              error?.message ||
                'Failed to load product.'
            )
          }

        } finally {
          if (!cancelled) {
            setLoading(false)
          }
        }
      }

    if (id) {
      loadProduct()
    } else {
      setError(
        'Product ID is missing.'
      )

      setLoading(false)
    }

    return () => {
      cancelled = true
    }
  }, [id])

  // ==========================================================
  // UPDATE FIELD
  // ==========================================================

  const update = (
    field,
    value
  ) => {
    setForm(
      (current) => ({
        ...current,
        [field]: value,
      })
    )
  }

  // ==========================================================
  // ADD NEW IMAGES
  // ==========================================================

  const handleImages = (
    event
  ) => {
    const files =
      Array.from(
        event.target.files ||
          []
      )

    // Reset file input
    event.target.value = ''

    if (!files.length) {
      return
    }

    // --------------------------------------------------------
    // FILTER VALID FILES
    // --------------------------------------------------------

    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
    ]

    const validFiles =
      files.filter(
        (file) =>
          allowedTypes.includes(
            file.type
          )
      )

    if (
      validFiles.length !==
      files.length
    ) {
      alert(
        'Only JPG, JPEG, PNG, and WEBP images are allowed.'
      )
    }

    if (!validFiles.length) {
      return
    }

    // --------------------------------------------------------
    // MAX 4 IMAGES
    // --------------------------------------------------------

    const availableSlots =
      4 - form.images.length

    if (availableSlots <= 0) {
      alert(
        'A product can have a maximum of 4 images.'
      )

      return
    }

    const filesToAdd =
      validFiles.slice(
        0,
        availableSlots
      )

    if (
      validFiles.length >
      availableSlots
    ) {
      alert(
        `Only ${availableSlots} more image(s) can be added. Maximum is 4 images.`
      )
    }

    // --------------------------------------------------------
    // CREATE PREVIEWS
    // --------------------------------------------------------

    const imageFiles =
      filesToAdd.map(
        (file) => ({
          file,
          preview:
            URL.createObjectURL(
              file
            ),
        })
      )

    setForm(
      (current) => ({
        ...current,
        images: [
          ...current.images,
          ...imageFiles,
        ].slice(0, 4),
      })
    )
  }

  // ==========================================================
  // REMOVE IMAGE
  // ==========================================================

  const removeImage = (
    index
  ) => {
    setForm(
      (current) => {
        const imageToRemove =
          current.images[
            index
          ]

        // ----------------------------------------------------
        // CLEAN OBJECT URL FOR NEW IMAGE
        // ----------------------------------------------------

        if (
          imageToRemove &&
          typeof imageToRemove ===
            'object' &&
          imageToRemove.preview
        ) {
          URL.revokeObjectURL(
            imageToRemove.preview
          )
        }

        return {
          ...current,
          images:
            current.images.filter(
              (
                _,
                imageIndex
              ) =>
                imageIndex !==
                index
            ),
        }
      }
    )
  }

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit =
    async (event) => {
      event.preventDefault()

      if (saving) {
        return
      }

      try {
        setSaving(true)
        setError('')

        const token =
          getToken()

        if (!token) {
          throw new Error(
            'Authentication token not found. Please login again.'
          )
        }

        // ====================================================
        // BASIC VALIDATION
        // ====================================================

        if (
          !form.name.trim()
        ) {
          throw new Error(
            'Product name is required.'
          )
        }

        if (
          !form.category.trim()
        ) {
          throw new Error(
            'Product category is required.'
          )
        }

        if (
          form.price === '' ||
          !Number.isFinite(
            Number(
              form.price
            )
          ) ||
          Number(
            form.price
          ) < 0
        ) {
          throw new Error(
            'Please enter a valid product price.'
          )
        }

        if (
          form.oldPrice !== '' &&
          (
            !Number.isFinite(
              Number(
                form.oldPrice
              )
            ) ||
            Number(
              form.oldPrice
            ) < 0
          )
        ) {
          throw new Error(
            'Please enter a valid old price.'
          )
        }

        if (
          form.stock !== '' &&
          (
            !Number.isFinite(
              Number(
                form.stock
              )
            ) ||
            Number(
              form.stock
            ) < 0
          )
        ) {
          throw new Error(
            'Stock cannot be negative.'
          )
        }

        if (
          form.images.length ===
          0
        ) {
          throw new Error(
            'Please add at least one product image.'
          )
        }

        if (
          form.images.length >
          4
        ) {
          throw new Error(
            'A product can have a maximum of 4 images.'
          )
        }

        // ====================================================
        // FORM DATA
        // ====================================================

        const formData =
          new FormData()

        // ----------------------------------------------------
        // BASIC PRODUCT INFORMATION
        // ----------------------------------------------------

        formData.append(
          'name',
          form.name.trim()
        )

        formData.append(
          'description',
          form.description.trim()
        )

        formData.append(
          'category',
          form.category.trim()
        )

        formData.append(
          'subcategory',
          form.subcategory.trim()
        )

        formData.append(
          'sku',
          form.sku.trim()
        )

        formData.append(
          'price',
          String(
            Number(
              form.price
            )
          )
        )

        // ----------------------------------------------------
        // COMPARE AT / OLD PRICE
        // ----------------------------------------------------

        formData.append(
          'oldPrice',
          form.oldPrice === ''
            ? '0'
            : String(
                Number(
                  form.oldPrice
                )
              )
        )

        // ----------------------------------------------------
        // STOCK
        // ----------------------------------------------------

        formData.append(
          'stock',
          form.stock === ''
            ? '0'
            : String(
                Number(
                  form.stock
                )
              )
        )

        // ----------------------------------------------------
        // MATERIAL
        // ----------------------------------------------------

        formData.append(
          'material',
          form.material.trim()
        )

        // ====================================================
        // ARRAY FIELDS
        // ====================================================

        formData.append(
          'sizes',
          JSON.stringify(
            splitValues(
              form.sizes
            )
          )
        )

        formData.append(
          'colors',
          JSON.stringify(
            splitValues(
              form.colors
            )
          )
        )

        formData.append(
          'features',
          JSON.stringify(
            splitValues(
              form.features
            )
          )
        )

        // ====================================================
        // EXISTING IMAGES
        // ====================================================

        const existingImages =
          form.images.filter(
            (image) =>
              typeof image ===
                'string' &&
              image.trim()
          )

        formData.append(
          'existingImages',
          JSON.stringify(
            existingImages
          )
        )

        // ====================================================
        // NEW IMAGE FILES
        // ====================================================

        form.images
          .filter(
            (image) =>
              image &&
              typeof image ===
                'object' &&
              image.file
          )
          .forEach(
            (image) => {
              formData.append(
                'images',
                image.file
              )
            }
          )

        // ====================================================
        // SEND UPDATE REQUEST
        // ====================================================

        const response =
          await fetch(
            `${API_URL}/admin/products/${id}`,
            {
              method: 'PUT',

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },

              // IMPORTANT:
              // Do NOT add Content-Type here.
              //
              // Browser automatically creates:
              // multipart/form-data boundary

              body: formData,
            }
          )

        let data = {}

        try {
          data =
            await response.json()
        } catch {
          data = {}
        }

        // ====================================================
        // RESPONSE ERROR
        // ====================================================

        if (!response.ok) {
          throw new Error(
            data?.message ||
              'Failed to update product.'
          )
        }

        if (!data?.success) {
          throw new Error(
            data?.message ||
              'Failed to update product.'
          )
        }

        // ====================================================
        // SUCCESS
        // ====================================================

        alert(
          'Product updated successfully.'
        )

        navigate(
          '/admin/my-products'
        )

      } catch (error) {
        console.error(
          'Update product error:',
          error
        )

        setError(
          error?.message ||
            'Something went wrong while updating the product.'
        )

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })

      } finally {
        setSaving(false)
      }
    }

  // ==========================================================
  // LOADING SCREEN
  // ==========================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">

        <div className="text-center">

          <Loader2
            size={34}
            className="mx-auto animate-spin text-gray-700"
          />

          <p className="mt-3 text-sm text-gray-500">
            Loading product...
          </p>

        </div>
      </div>
    )
  }

  // ==========================================================
  // MAIN UI
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

        <main className="p-4 sm:p-6 lg:p-8">

          {/* ==================================================
              BACK
          ================================================== */}

          <Link
            to="/admin/my-products"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            <ArrowLeft size={17} />
            Back to My Products
          </Link>

          {/* ==================================================
              TITLE
          ================================================== */}

          <div className="mt-4">

            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Edit Product
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Update your product information and images.
            </p>

          </div>

          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4">

              <div className="mt-0.5 shrink-0">

                <X
                  size={18}
                  className="text-red-600"
                />

              </div>

              <div>

                <p className="text-sm font-semibold text-red-800">
                  Unable to update product
                </p>

                <p className="mt-1 text-sm text-red-700">
                  {error}
                </p>

              </div>
            </div>
          )}

          {/* ==================================================
              FORM
          ================================================== */}

          <form
            onSubmit={
              handleSubmit
            }
            className="mt-6 space-y-6"
          >

            {/* =================================================
                PRODUCT IMAGES
            ================================================= */}

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <h2 className="text-lg font-bold text-gray-900">
                    Product Images
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Upload up to 4 product images.
                  </p>

                </div>

                <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                  {form.images.length}/4
                </span>

              </div>

              {/* IMAGE GRID */}

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">

                {form.images.map(
                  (
                    image,
                    index
                  ) => {

                    const imageUrl =
                      typeof image ===
                      'string'
                        ? image
                        : image?.preview

                    return (
                      <div
                        key={`${imageUrl}-${index}`}
                        className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
                      >

                        {/* IMAGE */}

                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={`Product ${index + 1}`}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-gray-400">
                            <ImagePlus
                              size={28}
                            />
                          </div>
                        )}

                        {/* DARK OVERLAY */}

                        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />

                        {/* REMOVE BUTTON */}

                        <button
                          type="button"
                          onClick={() =>
                            removeImage(
                              index
                            )
                          }
                          disabled={
                            saving
                          }
                          aria-label={`Remove image ${index + 1}`}
                          className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-red-600 shadow-md transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <X size={16} />
                        </button>

                        {/* IMAGE TYPE */}

                        {typeof image ===
                          'object' && (
                          <div className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold text-white">
                            New
                          </div>
                        )}

                        {typeof image ===
                          'string' && (
                          <div className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-gray-700">
                            Current
                          </div>
                        )}

                      </div>
                    )
                  }
                )}

                {/* ADD IMAGE */}

                {form.images.length <
                  4 && (
                  <label
                    className={`flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-500 transition hover:border-gray-500 hover:bg-gray-50 ${
                      saving
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }`}
                  >

                    <Upload
                      size={26}
                    />

                    <span className="mt-2 text-xs font-semibold">
                      Add Image
                    </span>

                    <span className="mt-1 text-[10px] text-gray-400">
                      JPG, PNG, WEBP
                    </span>

                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      multiple
                      onChange={
                        handleImages
                      }
                      disabled={
                        saving
                      }
                      className="hidden"
                    />

                  </label>
                )}

              </div>
            </section>

            {/* =================================================
                PRODUCT INFORMATION
            ================================================= */}

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

              <div className="mb-6">

                <h2 className="text-lg font-bold text-gray-900">
                  Product Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update the details of your product.
                </p>

              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* PRODUCT NAME */}

                <Field
                  label="Product Name"
                  value={
                    form.name
                  }
                  onChange={(
                    value
                  ) =>
                    update(
                      'name',
                      value
                    )
                  }
                  required
                  disabled={
                    saving
                  }
                />

                {/* SKU */}

                <Field
                  label="SKU"
                  value={
                    form.sku
                  }
                  onChange={(
                    value
                  ) =>
                    update(
                      'sku',
                      value
                    )
                  }
                  disabled={
                    saving
                  }
                />

                {/* CATEGORY */}

                <Field
                  label="Category"
                  value={
                    form.category
                  }
                  onChange={(
                    value
                  ) =>
                    update(
                      'category',
                      value
                    )
                  }
                  required
                  disabled={
                    saving
                  }
                />

                {/* SUBCATEGORY */}

                <Field
                  label="Subcategory"
                  value={
                    form.subcategory
                  }
                  onChange={(
                    value
                  ) =>
                    update(
                      'subcategory',
                      value
                    )
                  }
                  disabled={
                    saving
                  }
                />

                {/* PRICE */}

                <Field
                  label="Price (€)"
                  type="number"
                  min="0"
                  step="0.01"
                  value={
                    form.price
                  }
                  onChange={(
                    value
                  ) =>
                    update(
                      'price',
                      value
                    )
                  }
                  required
                  disabled={
                    saving
                  }
                />

                {/* OLD PRICE */}

                <Field
                  label="Old Price (€)"
                  type="number"
                  min="0"
                  step="0.01"
                  value={
                    form.oldPrice
                  }
                  onChange={(
                    value
                  ) =>
                    update(
                      'oldPrice',
                      value
                    )
                  }
                  disabled={
                    saving
                  }
                />

                {/* STOCK */}

                <Field
                  label="Stock"
                  type="number"
                  min="0"
                  step="1"
                  value={
                    form.stock
                  }
                  onChange={(
                    value
                  ) =>
                    update(
                      'stock',
                      value
                    )
                  }
                  disabled={
                    saving
                  }
                />

                {/* MATERIAL */}

                <Field
                  label="Material / Quality"
                  value={
                    form.material
                  }
                  onChange={(
                    value
                  ) =>
                    update(
                      'material',
                      value
                    )
                  }
                  disabled={
                    saving
                  }
                />

                {/* SIZES */}

                <Field
                  label="Sizes"
                  value={
                    form.sizes
                  }
                  onChange={(
                    value
                  ) =>
                    update(
                      'sizes',
                      value
                    )
                  }
                  placeholder="S, M, L, XL"
                  disabled={
                    saving
                  }
                />

                {/* COLORS */}

                <Field
                  label="Colors"
                  value={
                    form.colors
                  }
                  onChange={(
                    value
                  ) =>
                    update(
                      'colors',
                      value
                    )
                  }
                  placeholder="White, Gold, Black"
                  disabled={
                    saving
                  }
                />

                {/* FEATURES */}

                <Field
                  label="Features"
                  value={
                    form.features
                  }
                  onChange={(
                    value
                  ) =>
                    update(
                      'features',
                      value
                    )
                  }
                  placeholder="Handmade, Embroidery, Premium"
                  disabled={
                    saving
                  }
                />

                {/* DESCRIPTION */}

                <div className="md:col-span-2">

                  <label className="block text-sm font-semibold text-gray-700">
                    Description
                  </label>

                  <textarea
                    value={
                      form.description
                    }
                    onChange={(
                      event
                    ) =>
                      update(
                        'description',
                        event.target
                          .value
                      )
                    }
                    rows={6}
                    disabled={
                      saving
                    }
                    placeholder="Describe your product..."
                    className="mt-2 w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                  />

                </div>

              </div>
            </section>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              {/* CANCEL */}

              <Link
                to="/admin/my-products"
                className={`inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-7 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 ${
                  saving
                    ? 'pointer-events-none opacity-50'
                    : ''
                }`}
              >
                Cancel
              </Link>

              {/* UPDATE */}

              <button
                type="submit"
                disabled={
                  saving ||
                  loading
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >

                {saving ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />

                    Updating...
                  </>
                ) : (
                  'Update Product'
                )}

              </button>

            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

// ============================================================
// FIELD COMPONENT
// ============================================================

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  min,
  step,
  placeholder,
  disabled = false,
}) {
  return (
    <div>

      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        required={
          required
        }
        min={min}
        step={step}
        placeholder={
          placeholder
        }
        disabled={
          disabled
        }
        className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50"
      />

    </div>
  )
}

// ============================================================
// SPLIT COMMA VALUES
// ============================================================

function splitValues(
  value
) {
  return String(
    value || ''
  )
    .split(',')
    .map(
      (item) =>
        item.trim()
    )
    .filter(Boolean)
}

// ============================================================
// EXPORT
// ============================================================

export default AdminEditProduct