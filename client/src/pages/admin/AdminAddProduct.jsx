

// import React, { useEffect, useMemo, useState } from 'react'
// import { ArrowLeft, Upload, X } from 'lucide-react'
// import { Link, useNavigate } from 'react-router-dom'

// import AdminSidebar from '../../components/admin/AdminSidebar'
// import AdminHeader from '../../components/admin/AdminHeader'

// const API_URL =
//   'https://fegegta-server.onrender.com/api'

// function AdminAddProduct() {
//   const navigate = useNavigate()

//   const [mobileOpen, setMobileOpen] =
//     useState(false)

//   const [sellers, setSellers] =
//     useState([])

//   const [loadingSellers, setLoadingSellers] =
//     useState(true)

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

//     sellerId: '',
//     storeId: '',

//     images: [],
//   })

//   const [saving, setSaving] =
//     useState(false)

//   const [error, setError] =
//     useState('')

//   // ============================================================
//   // GET ADMIN TOKEN
//   // ============================================================

//   const getToken = () => {
//     return localStorage.getItem(
//       'fegegta_auth_token'
//     )
//   }

//   // ============================================================
//   // FETCH SELLERS
//   // ============================================================

//   useEffect(() => {
//     const fetchSellers = async () => {
//       try {
//         setLoadingSellers(true)
//         setError('')

//         const token = getToken()

//         if (!token) {
//           throw new Error(
//             'Authentication token not found. Please login again.'
//           )
//         }

//         const response =
//           await fetch(
//             `${API_URL}/admin/sellers`,
//             {
//               method: 'GET',
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           )

//         const data =
//           await response.json()

//         if (!response.ok) {
//           throw new Error(
//             data.message ||
//               'Failed to load sellers.'
//           )
//         }

//         const approvedSellers =
//           (data.sellers || []).filter(
//             (seller) =>
//               seller.status ===
//                 'approved' &&
//               seller.store &&
//               ['approved', 'active'].includes(
//                 seller.store.status
//               )
//           )

//         setSellers(
//           approvedSellers
//         )
//       } catch (error) {
//         setError(
//           error.message ||
//             'Failed to load sellers.'
//         )
//       } finally {
//         setLoadingSellers(false)
//       }
//     }

//     fetchSellers()
//   }, [])

//   // ============================================================
//   // UPDATE FORM
//   // ============================================================

//   const update = (
//     field,
//     value
//   ) => {
//     setForm((current) => ({
//       ...current,
//       [field]: value,
//     }))
//   }

//   // ============================================================
//   // SELECTED SELLER
//   // ============================================================

//   const selectedSeller =
//     useMemo(() => {
//       return sellers.find(
//         (seller) =>
//           String(seller._id) ===
//           String(form.sellerId)
//       )
//     }, [
//       sellers,
//       form.sellerId,
//     ])

//   // ============================================================
//   // SELECTED STORE
//   // ============================================================

//   const selectedStore =
//     selectedSeller?.store || null

//   // ============================================================
//   // SELLER CHANGE
//   // ============================================================

//   const handleSellerChange = (
//     event
//   ) => {
//     const sellerId =
//       event.target.value

//     const seller =
//       sellers.find(
//         (item) =>
//           String(item._id) ===
//           String(sellerId)
//       )

//     update(
//       'sellerId',
//       sellerId
//     )

//     update(
//       'storeId',
//       seller?.store?._id || ''
//     )
//   }

//   // ============================================================
//   // IMAGE UPLOAD
//   // ============================================================

//   const handleImages = (
//     event
//   ) => {
//     const files = Array.from(
//       event.target.files || []
//     )

//     if (!files.length) {
//       return
//     }

//     if (
//       form.images.length +
//         files.length >
//       4
//     ) {
//       alert(
//         'A product can have a maximum of 4 images.'
//       )

//       event.target.value = ''
//       return
//     }

//     const invalidFile =
//       files.find(
//         (file) =>
//           ![
//             'image/jpeg',
//             'image/jpg',
//             'image/png',
//             'image/webp',
//           ].includes(
//             file.type
//           )
//       )

//     if (invalidFile) {
//       alert(
//         'Only JPG, JPEG, PNG, and WEBP images are allowed.'
//       )

//       event.target.value = ''
//       return
//     }

//     const tooLarge =
//       files.find(
//         (file) =>
//           file.size >
//           5 * 1024 * 1024
//       )

//     if (tooLarge) {
//       alert(
//         'Each image must be smaller than 5MB.'
//       )

//       event.target.value = ''
//       return
//     }

//     const newImages =
//       files.map((file) => ({
//         file,
//         preview:
//           URL.createObjectURL(
//             file
//           ),
//       }))

//     setForm((current) => ({
//       ...current,

//       images: [
//         ...current.images,
//         ...newImages,
//       ].slice(0, 4),
//     }))

//     event.target.value = ''
//   }

//   // ============================================================
//   // REMOVE IMAGE
//   // ============================================================

//   const removeImage = (
//     index
//   ) => {
//     setForm((current) => {
//       const image =
//         current.images[index]

//       if (
//         image?.preview
//       ) {
//         URL.revokeObjectURL(
//           image.preview
//         )
//       }

//       return {
//         ...current,

//         images:
//           current.images.filter(
//             (_, imageIndex) =>
//               imageIndex !==
//               index
//           ),
//       }
//     })
//   }

//   // ============================================================
//   // SUBMIT
//   // ============================================================

//   const handleSubmit = async (
//     event
//   ) => {
//     event.preventDefault()

//     setError('')

//     // ----------------------------------------------------------
//     // VALIDATION
//     // ----------------------------------------------------------

//     if (!form.name.trim()) {
//       alert(
//         'Product name is required.'
//       )
//       return
//     }

//     if (!form.description.trim()) {
//       alert(
//         'Product description is required.'
//       )
//       return
//     }

//     if (!form.category.trim()) {
//       alert(
//         'Product category is required.'
//       )
//       return
//     }

//     if (
//       !form.price ||
//       Number(form.price) < 0
//     ) {
//       alert(
//         'Product price is required.'
//       )
//       return
//     }

//     if (!form.sellerId) {
//       alert(
//         'Please select a seller.'
//       )
//       return
//     }

//     if (!form.storeId) {
//       alert(
//         'Please select a store.'
//       )
//       return
//     }

//     if (
//       form.images.length ===
//       0
//     ) {
//       alert(
//         'Please upload at least one product image.'
//       )
//       return
//     }

//     if (
//       form.images.length >
//       4
//     ) {
//       alert(
//         'A product can have a maximum of 4 images.'
//       )
//       return
//     }

//     // ----------------------------------------------------------
//     // TOKEN
//     // ----------------------------------------------------------

//     const token = getToken()

//     if (!token) {
//       alert(
//         'Your session has expired. Please login again.'
//       )
//       return
//     }

//     try {
//       setSaving(true)

//       // --------------------------------------------------------
//       // FORM DATA
//       // --------------------------------------------------------

//       const formData =
//         new FormData()

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

//       formData.append(
//         'oldPrice',
//         String(
//           Number(
//             form.oldPrice || 0
//           )
//         )
//       )

//       formData.append(
//         'stock',
//         String(
//           Number(
//             form.stock || 0
//           )
//         )
//       )

//       formData.append(
//         'material',
//         form.material.trim()
//       )

//       formData.append(
//         'sizes',
//         form.sizes
//       )

//       formData.append(
//         'colors',
//         form.colors
//       )

//       formData.append(
//         'features',
//         form.features
//       )

//       formData.append(
//         'sellerId',
//         form.sellerId
//       )

//       formData.append(
//         'storeId',
//         form.storeId
//       )

//       // --------------------------------------------------------
//       // ADD REAL IMAGE FILES
//       // --------------------------------------------------------

//       form.images.forEach(
//         (image) => {
//           formData.append(
//             'images',
//             image.file
//           )
//         }
//       )

//       // --------------------------------------------------------
//       // SEND TO BACKEND
//       // --------------------------------------------------------

//       const response =
//         await fetch(
//           `${API_URL}/admin/products`,
//           {
//             method: 'POST',

//             headers: {
//               Authorization: `Bearer ${token}`,
//             },

//             body: formData,
//           }
//         )

//       const data =
//         await response.json()

//       if (!response.ok) {
//         throw new Error(
//           data.message ||
//             'Failed to create product.'
//         )
//       }

//       // --------------------------------------------------------
//       // SUCCESS
//       // --------------------------------------------------------

//       alert(
//         'Product created successfully.'
//       )

//       navigate(
//         '/admin/my-products'
//       )
//     } catch (error) {
//       console.error(
//         'Admin product creation error:',
//         error
//       )

//       setError(
//         error.message ||
//           'Something went wrong while creating the product.'
//       )
//     } finally {
//       setSaving(false)
//     }
//   }

//   // ============================================================
//   // CLEANUP IMAGE OBJECT URLS
//   // ============================================================

//   useEffect(() => {
//     return () => {
//       form.images.forEach(
//         (image) => {
//           if (image?.preview) {
//             URL.revokeObjectURL(
//               image.preview
//             )
//           }
//         }
//       )
//     }
//   }, [])

//   // ============================================================
//   // RENDER
//   // ============================================================

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <AdminSidebar
//         mobileOpen={mobileOpen}
//         onClose={() =>
//           setMobileOpen(false)
//         }
//       />

//       <div className="lg:pl-72">
//         <AdminHeader
//           onMenuClick={() =>
//             setMobileOpen(true)
//           }
//         />

//         <main className="p-4 sm:p-6 lg:p-8">
//           {/* ==================================================
//               PAGE HEADER
//           ================================================== */}

//           <div className="mb-6">
//             <Link
//               to="/admin/my-products"
//               className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
//             >
//               <ArrowLeft
//                 size={17}
//               />

//               Back to My Products
//             </Link>

//             <h1 className="mt-4 text-2xl font-bold text-gray-900">
//               Add Product
//             </h1>

//             <p className="mt-1 text-sm text-gray-500">
//               Add a product directly to your Fegegta store.
//             </p>
//           </div>

//           {/* ==================================================
//               ERROR
//           ================================================== */}

//           {error && (
//             <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//               {error}
//             </div>
//           )}

//           <form
//             onSubmit={
//               handleSubmit
//             }
//             className="space-y-6"
//           >
//             {/* ==================================================
//                 SELLER / STORE
//             ================================================== */}

//             <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
//               <h2 className="text-lg font-bold text-gray-900">
//                 Seller & Store
//               </h2>

//               <p className="mt-1 text-sm text-gray-500">
//                 Select the approved seller and their approved store for this product.
//               </p>

//               <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
//                 {/* SELLER */}

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700">
//                     Seller
//                     <span className="ml-1 text-red-500">
//                       *
//                     </span>
//                   </label>

//                   <select
//                     value={
//                       form.sellerId
//                     }
//                     onChange={
//                       handleSellerChange
//                     }
//                     disabled={
//                       loadingSellers ||
//                       saving
//                     }
//                     required
//                     className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100"
//                   >
//                     <option value="">
//                       {loadingSellers
//                         ? 'Loading sellers...'
//                         : 'Select seller'}
//                     </option>

//                     {sellers.map(
//                       (seller) => (
//                         <option
//                           key={
//                             seller._id
//                           }
//                           value={
//                             seller._id
//                           }
//                         >
//                           {seller.businessName ||
//                             seller.user?.name ||
//                             seller.user?.email ||
//                             'Seller'}
//                         </option>
//                       )
//                     )}
//                   </select>

//                   {!loadingSellers &&
//                     sellers.length ===
//                       0 && (
//                       <p className="mt-2 text-xs text-amber-600">
//                         No approved sellers with approved stores were found.
//                       </p>
//                     )}
//                 </div>

//                 {/* STORE */}

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700">
//                     Store
//                     <span className="ml-1 text-red-500">
//                       *
//                     </span>
//                   </label>

//                   <select
//                     value={
//                       form.storeId
//                     }
//                     disabled={
//                       !selectedSeller ||
//                       saving
//                     }
//                     required
//                     className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100"
//                   >
//                     <option value="">
//                       {selectedSeller
//                         ? 'Select store'
//                         : 'Select seller first'}
//                     </option>

//                     {selectedStore && (
//                       <option
//                         value={
//                           selectedStore._id
//                         }
//                       >
//                         {
//                           selectedStore.name
//                         }
//                       </option>
//                     )}
//                   </select>

//                   {selectedStore && (
//                     <p className="mt-2 text-xs text-gray-500">
//                       Store:
//                       {' '}
//                       {
//                         selectedStore.name
//                       }
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </section>

//             {/* ==================================================
//                 PRODUCT IMAGES
//             ================================================== */}

//             <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
//               <h2 className="text-lg font-bold text-gray-900">
//                 Product Images
//               </h2>

//               <p className="mt-1 text-sm text-gray-500">
//                 Upload up to 4 images showing different sides of the product.
//               </p>

//               <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
//                 {form.images.map(
//                   (image, index) => (
//                     <div
//                       key={`${image.preview}-${index}`}
//                       className="relative aspect-square overflow-hidden rounded-xl border border-gray-200"
//                     >
//                       <img
//                         src={
//                           image.preview
//                         }
//                         alt={`Product ${
//                           index + 1
//                         }`}
//                         className="h-full w-full object-cover"
//                       />

//                       <button
//                         type="button"
//                         onClick={() =>
//                           removeImage(
//                             index
//                           )
//                         }
//                         disabled={
//                           saving
//                         }
//                         className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-red-600 shadow hover:bg-red-50 disabled:opacity-50"
//                       >
//                         <X
//                           size={16}
//                         />
//                       </button>
//                     </div>
//                   )
//                 )}

//                 {form.images.length <
//                   4 && (
//                   <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 hover:border-gray-500">
//                     <Upload
//                       size={24}
//                     />

//                     <span className="mt-2 text-xs font-semibold">
//                       Add Image
//                     </span>

//                     <input
//                       type="file"
//                       accept="image/jpeg,image/jpg,image/png,image/webp"
//                       multiple
//                       onChange={
//                         handleImages
//                       }
//                       disabled={
//                         saving
//                       }
//                       className="hidden"
//                     />
//                   </label>
//                 )}
//               </div>

//               <p className="mt-4 text-xs text-gray-400">
//                 JPG, JPEG, PNG or WEBP · Maximum 5MB per image · Maximum 4 images
//               </p>
//             </section>

//             {/* ==================================================
//                 PRODUCT INFORMATION
//             ================================================== */}

//             <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
//               <h2 className="text-lg font-bold text-gray-900">
//                 Product Information
//               </h2>

//               <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
//                 <Field
//                   label="Product Name"
//                   value={
//                     form.name
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     update(
//                       'name',
//                       value
//                     )
//                   }
//                   required
//                 />

//                 <Field
//                   label="SKU"
//                   value={
//                     form.sku
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     update(
//                       'sku',
//                       value
//                     )
//                   }
//                 />

//                 <Field
//                   label="Category"
//                   value={
//                     form.category
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     update(
//                       'category',
//                       value
//                     )
//                   }
//                   required
//                 />

//                 <Field
//                   label="Subcategory"
//                   value={
//                     form.subcategory
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     update(
//                       'subcategory',
//                       value
//                     )
//                   }
//                 />

//                 <Field
//                   label="Price (€)"
//                   type="number"
//                   value={
//                     form.price
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     update(
//                       'price',
//                       value
//                     )
//                   }
//                   required
//                 />

//                 <Field
//                   label="Old Price (€)"
//                   type="number"
//                   value={
//                     form.oldPrice
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     update(
//                       'oldPrice',
//                       value
//                     )
//                   }
//                 />

//                 <Field
//                   label="Stock"
//                   type="number"
//                   value={
//                     form.stock
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     update(
//                       'stock',
//                       value
//                     )
//                   }
//                 />

//                 <Field
//                   label="Material / Quality"
//                   value={
//                     form.material
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     update(
//                       'material',
//                       value
//                     )
//                   }
//                 />

//                 <Field
//                   label="Sizes"
//                   value={
//                     form.sizes
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     update(
//                       'sizes',
//                       value
//                     )
//                   }
//                   placeholder="S, M, L, XL"
//                 />

//                 <Field
//                   label="Colors"
//                   value={
//                     form.colors
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     update(
//                       'colors',
//                       value
//                     )
//                   }
//                   placeholder="Black, White, Red"
//                 />

//                 <div className="md:col-span-2">
//                   <Field
//                     label="Features"
//                     value={
//                       form.features
//                     }
//                     onChange={(
//                       value
//                     ) =>
//                       update(
//                         'features',
//                         value
//                       )
//                     }
//                     placeholder="Premium quality, Handmade, Comfortable"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-semibold text-gray-700">
//                     Description
//                     <span className="ml-1 text-red-500">
//                       *
//                     </span>
//                   </label>

//                   <textarea
//                     value={
//                       form.description
//                     }
//                     onChange={(e) =>
//                       update(
//                         'description',
//                         e.target.value
//                       )
//                     }
//                     rows={6}
//                     required
//                     className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
//                     placeholder="Describe the product..."
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* ==================================================
//                 ACTIONS
//             ================================================== */}

//             <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
//               <Link
//                 to="/admin/my-products"
//                 className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </Link>

//               <button
//                 type="submit"
//                 disabled={
//                   saving ||
//                   loadingSellers
//                 }
//                 className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {saving
//                   ? 'Saving...'
//                   : 'Save Product'}
//               </button>
//             </div>
//           </form>
//         </main>
//       </div>
//     </div>
//   )
// }

// // ============================================================
// // FIELD
// // ============================================================

// function Field({
//   label,
//   value,
//   onChange,
//   type = 'text',
//   placeholder = '',
//   required = false,
// }) {
//   return (
//     <div>
//       <label className="block text-sm font-semibold text-gray-700">
//         {label}

//         {required && (
//           <span className="ml-1 text-red-500">
//             *
//           </span>
//         )}
//       </label>

//       <input
//         type={type}
//         value={value}
//         onChange={(e) =>
//           onChange(
//             e.target.value
//           )
//         }
//         placeholder={
//           placeholder
//         }
//         required={required}
//         min={
//           type === 'number'
//             ? '0'
//             : undefined
//         }
//         className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
//       />
//     </div>
//   )
// }

// export default AdminAddProduct

// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from 'react'

// import {
//   ArrowLeft,
//   Upload,
//   X,
// } from 'lucide-react'

// import {
//   Link,
//   useNavigate,
// } from 'react-router-dom'

// import AdminSidebar from '../../components/admin/AdminSidebar'
// import AdminHeader from '../../components/admin/AdminHeader'

// // ============================================================
// // API
// // ============================================================

// const API_URL =
//   'https://fegegta-server.onrender.com/api'

// // ============================================================
// // COMPONENT
// // ============================================================

// function AdminAddProduct() {
//   const navigate = useNavigate()

//   // ==========================================================
//   // MOBILE SIDEBAR
//   // ==========================================================

//   const [mobileOpen, setMobileOpen] =
//     useState(false)

//   // ==========================================================
//   // SELLERS
//   // ==========================================================

//   const [sellers, setSellers] =
//     useState([])

//   const [loadingSellers, setLoadingSellers] =
//     useState(true)

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

//     sellerId: '',
//     storeId: '',

//     images: [],
//   })

//   // ==========================================================
//   // STATE
//   // ==========================================================

//   const [saving, setSaving] =
//     useState(false)

//   const [error, setError] =
//     useState('')

//   // ==========================================================
//   // GET ADMIN TOKEN
//   // ==========================================================

//   const getToken = () => {
//     return localStorage.getItem(
//       'fegegta_auth_token'
//     )
//   }

//   // ==========================================================
//   // FETCH APPROVED SELLERS
//   // ==========================================================

//   useEffect(() => {
//     let mounted = true

//     const fetchSellers =
//       async () => {
//         try {
//           setLoadingSellers(true)
//           setError('')

//           const token =
//             getToken()

//           if (!token) {
//             throw new Error(
//               'Authentication token not found. Please login again.'
//             )
//           }

//           const response =
//             await fetch(
//               `${API_URL}/admin/sellers`,
//               {
//                 method: 'GET',

//                 headers: {
//                   Authorization:
//                     `Bearer ${token}`,
//                 },
//               }
//             )

//           let data = {}

//           try {
//             data =
//               await response.json()
//           } catch {
//             data = {}
//           }

//           if (!response.ok) {
//             throw new Error(
//               data.message ||
//                 'Failed to load sellers.'
//             )
//           }

//           const approvedSellers =
//             (
//               data.sellers ||
//               []
//             ).filter(
//               (seller) =>
//                 seller.status ===
//                   'approved' &&
//                 seller.store &&
//                 [
//                   'approved',
//                   'active',
//                 ].includes(
//                   seller.store.status
//                 )
//             )

//           if (mounted) {
//             setSellers(
//               approvedSellers
//             )
//           }
//         } catch (error) {
//           if (mounted) {
//             setError(
//               error.message ||
//                 'Failed to load sellers.'
//             )
//           }
//         } finally {
//           if (mounted) {
//             setLoadingSellers(false)
//           }
//         }
//       }

//     fetchSellers()

//     return () => {
//       mounted = false
//     }
//   }, [])

//   // ==========================================================
//   // UPDATE FORM
//   // ==========================================================

//   const update = (
//     field,
//     value
//   ) => {
//     setForm(
//       (current) => ({
//         ...current,
//         [field]: value,
//       })
//     )
//   }

//   // ==========================================================
//   // SELECTED SELLER
//   // ==========================================================

//   const selectedSeller =
//     useMemo(() => {
//       return sellers.find(
//         (seller) =>
//           String(
//             seller._id
//           ) ===
//           String(
//             form.sellerId
//           )
//       )
//     }, [
//       sellers,
//       form.sellerId,
//     ])

//   // ==========================================================
//   // SELECTED STORE
//   // ==========================================================

//   const selectedStore =
//     selectedSeller?.store ||
//     null

//   // ==========================================================
//   // SELLER CHANGE
//   // ==========================================================

//   const handleSellerChange = (
//     event
//   ) => {
//     const sellerId =
//       event.target.value

//     const seller =
//       sellers.find(
//         (item) =>
//           String(
//             item._id
//           ) ===
//           String(
//             sellerId
//           )
//       )

//     setForm(
//       (current) => ({
//         ...current,

//         sellerId,

//         storeId:
//           seller?.store?._id ||
//           '',
//       })
//     )
//   }

//   // ==========================================================
//   // IMAGE UPLOAD
//   // ==========================================================

//   const handleImages = (
//     event
//   ) => {
//     const files =
//       Array.from(
//         event.target.files ||
//           []
//       )

//     if (!files.length) {
//       return
//     }

//     // --------------------------------------------------------
//     // MAX 4 IMAGES
//     // --------------------------------------------------------

//     if (
//       form.images.length +
//         files.length >
//       4
//     ) {
//       alert(
//         'A product can have a maximum of 4 images.'
//       )

//       event.target.value = ''

//       return
//     }

//     // --------------------------------------------------------
//     // FILE TYPE
//     // --------------------------------------------------------

//     const allowedTypes = [
//       'image/jpeg',
//       'image/jpg',
//       'image/png',
//       'image/webp',
//     ]

//     const invalidFile =
//       files.find(
//         (file) =>
//           !allowedTypes.includes(
//             file.type
//           )
//       )

//     if (invalidFile) {
//       alert(
//         'Only JPG, JPEG, PNG, and WEBP images are allowed.'
//       )

//       event.target.value = ''

//       return
//     }

//     // --------------------------------------------------------
//     // FILE SIZE
//     // --------------------------------------------------------

//     const tooLarge =
//       files.find(
//         (file) =>
//           file.size >
//           5 * 1024 * 1024
//       )

//     if (tooLarge) {
//       alert(
//         'Each image must be smaller than 5MB.'
//       )

//       event.target.value = ''

//       return
//     }

//     // --------------------------------------------------------
//     // CREATE PREVIEWS
//     // --------------------------------------------------------

//     const newImages =
//       files.map(
//         (file) => ({
//           file,

//           preview:
//             URL.createObjectURL(
//               file
//             ),
//         })
//       )

//     setForm(
//       (current) => ({
//         ...current,

//         images: [
//           ...current.images,
//           ...newImages,
//         ].slice(0, 4),
//       })
//     )

//     event.target.value = ''
//   }

//   // ==========================================================
//   // REMOVE IMAGE
//   // ==========================================================

//   const removeImage = (
//     index
//   ) => {
//     setForm(
//       (current) => {
//         const image =
//           current.images[
//             index
//           ]

//         if (
//           image?.preview
//         ) {
//           URL.revokeObjectURL(
//             image.preview
//           )
//         }

//         return {
//           ...current,

//           images:
//             current.images.filter(
//               (
//                 _,
//                 imageIndex
//               ) =>
//                 imageIndex !==
//                 index
//             ),
//         }
//       }
//     )
//   }

//   // ==========================================================
//   // SUBMIT
//   // ==========================================================

//   const handleSubmit =
//     async (event) => {
//       event.preventDefault()

//       setError('')

//       // ------------------------------------------------------
//       // PRODUCT NAME
//       // ------------------------------------------------------

//       if (
//         !form.name.trim()
//       ) {
//         alert(
//           'Product name is required.'
//         )

//         return
//       }

//       // ------------------------------------------------------
//       // DESCRIPTION
//       // ------------------------------------------------------

//       if (
//         !form.description.trim()
//       ) {
//         alert(
//           'Product description is required.'
//         )

//         return
//       }

//       // ------------------------------------------------------
//       // CATEGORY
//       // ------------------------------------------------------

//       if (
//         !form.category.trim()
//       ) {
//         alert(
//           'Product category is required.'
//         )

//         return
//       }

//       // ------------------------------------------------------
//       // PRICE
//       // ------------------------------------------------------

//       const price =
//         Number(form.price)

//       if (
//         form.price === '' ||
//         Number.isNaN(price) ||
//         price < 0
//       ) {
//         alert(
//           'Please enter a valid product price.'
//         )

//         return
//       }

//       // ------------------------------------------------------
//       // OLD PRICE
//       // ------------------------------------------------------

//       const oldPrice =
//         form.oldPrice === ''
//           ? 0
//           : Number(
//               form.oldPrice
//             )

//       if (
//         Number.isNaN(
//           oldPrice
//         ) ||
//         oldPrice < 0
//       ) {
//         alert(
//           'Please enter a valid old price.'
//         )

//         return
//       }

//       // ------------------------------------------------------
//       // STOCK
//       // ------------------------------------------------------

//       const stock =
//         form.stock === ''
//           ? 0
//           : Number(
//               form.stock
//             )

//       if (
//         Number.isNaN(stock) ||
//         stock < 0
//       ) {
//         alert(
//           'Please enter a valid stock quantity.'
//         )

//         return
//       }

//       // ------------------------------------------------------
//       // SELLER
//       // ------------------------------------------------------

//       if (!form.sellerId) {
//         alert(
//           'Please select a seller.'
//         )

//         return
//       }

//       // ------------------------------------------------------
//       // STORE
//       // ------------------------------------------------------

//       if (!form.storeId) {
//         alert(
//           'Please select a store.'
//         )

//         return
//       }

//       // ------------------------------------------------------
//       // IMAGES
//       // ------------------------------------------------------

//       if (
//         form.images.length ===
//         0
//       ) {
//         alert(
//           'Please upload at least one product image.'
//         )

//         return
//       }

//       if (
//         form.images.length >
//         4
//       ) {
//         alert(
//           'A product can have a maximum of 4 images.'
//         )

//         return
//       }

//       // ------------------------------------------------------
//       // TOKEN
//       // ------------------------------------------------------

//       const token =
//         getToken()

//       if (!token) {
//         alert(
//           'Your session has expired. Please login again.'
//         )

//         return
//       }

//       try {
//         setSaving(true)

//         // ====================================================
//         // FORM DATA
//         // ====================================================

//         const formData =
//           new FormData()

//         // ----------------------------------------------------
//         // BASIC INFORMATION
//         // ----------------------------------------------------

//         formData.append(
//           'name',
//           form.name.trim()
//         )

//         formData.append(
//           'description',
//           form.description.trim()
//         )

//         formData.append(
//           'category',
//           form.category.trim()
//         )

//         formData.append(
//           'subcategory',
//           form.subcategory.trim()
//         )

//         formData.append(
//           'sku',
//           form.sku.trim()
//         )

//         // ----------------------------------------------------
//         // PRICE
//         // ----------------------------------------------------

//         formData.append(
//           'price',
//           String(price)
//         )

//         formData.append(
//           'oldPrice',
//           String(oldPrice)
//         )

//         // ----------------------------------------------------
//         // INVENTORY
//         // ----------------------------------------------------

//         formData.append(
//           'stock',
//           String(stock)
//         )

//         // ----------------------------------------------------
//         // MATERIAL
//         // ----------------------------------------------------

//         formData.append(
//           'material',
//           form.material.trim()
//         )

//         // ----------------------------------------------------
//         // OPTIONS
//         //
//         // Backend converts comma-separated values
//         // into arrays.
//         // ----------------------------------------------------

//         formData.append(
//           'sizes',
//           form.sizes.trim()
//         )

//         formData.append(
//           'colors',
//           form.colors.trim()
//         )

//         // ----------------------------------------------------
//         // FEATURES
//         //
//         // Backend converts this into features[].
//         // ----------------------------------------------------

//         formData.append(
//           'features',
//           form.features.trim()
//         )

//         // ----------------------------------------------------
//         // SELLER
//         // ----------------------------------------------------

//         formData.append(
//           'sellerId',
//           form.sellerId
//         )

//         // ----------------------------------------------------
//         // STORE
//         // ----------------------------------------------------

//         formData.append(
//           'storeId',
//           form.storeId
//         )

//         // ----------------------------------------------------
//         // IMAGES
//         // ----------------------------------------------------

//         form.images.forEach(
//           (image) => {
//             if (
//               image?.file
//             ) {
//               formData.append(
//                 'images',
//                 image.file
//               )
//             }
//           }
//         )

//         // ====================================================
//         // SEND TO BACKEND
//         // ====================================================

//         const response =
//           await fetch(
//             `${API_URL}/admin/products`,
//             {
//               method: 'POST',

//               headers: {
//                 Authorization:
//                   `Bearer ${token}`,
//               },

//               body: formData,
//             }
//           )

//         let data = {}

//         try {
//           data =
//             await response.json()
//         } catch {
//           data = {}
//         }

//         // ====================================================
//         // ERROR RESPONSE
//         // ====================================================

//         if (!response.ok) {
//           throw new Error(
//             data.message ||
//               'Failed to create product.'
//           )
//         }

//         // ====================================================
//         // SUCCESS
//         // ====================================================

//         alert(
//           'Product created successfully.'
//         )

//         // ----------------------------------------------------
//         // CLEAN PREVIEW URLS
//         // ----------------------------------------------------

//         form.images.forEach(
//           (image) => {
//             if (
//               image?.preview
//             ) {
//               URL.revokeObjectURL(
//                 image.preview
//               )
//             }
//           }
//         )

//         navigate(
//           '/admin/my-products'
//         )
//       } catch (error) {
//         console.error(
//           'Admin product creation error:',
//           error
//         )

//         setError(
//           error.message ||
//             'Something went wrong while creating the product.'
//         )
//       } finally {
//         setSaving(false)
//       }
//     }

//   // ==========================================================
//   // CLEANUP OBJECT URLS
//   // ==========================================================

//   useEffect(() => {
//     return () => {
//       form.images.forEach(
//         (image) => {
//           if (
//             image?.preview
//           ) {
//             URL.revokeObjectURL(
//               image.preview
//             )
//           }
//         }
//       )
//     }

//     // This cleanup intentionally runs only when the component
//     // is unmounted.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   // ==========================================================
//   // RENDER
//   // ==========================================================

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* ======================================================
//           SIDEBAR
//       ====================================================== */}

//       <AdminSidebar
//         mobileOpen={
//           mobileOpen
//         }
//         onClose={() =>
//           setMobileOpen(false)
//         }
//       />

//       {/* ======================================================
//           MAIN
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

//         {/* ====================================================
//             CONTENT
//         ==================================================== */}

//         <main className="p-4 sm:p-6 lg:p-8">

//           {/* ==================================================
//               PAGE HEADER
//           ================================================== */}

//           <div className="mb-6">

//             <Link
//               to="/admin/my-products"
//               className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
//             >
//               <ArrowLeft
//                 size={17}
//               />

//               Back to My Products
//             </Link>

//             <h1 className="mt-4 text-2xl font-bold text-gray-900">
//               Add Product
//             </h1>

//             <p className="mt-1 text-sm text-gray-500">
//               Add a product directly to your Fegegta store.
//             </p>

//           </div>

//           {/* ==================================================
//               ERROR
//           ================================================== */}

//           {error && (
//             <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//               {error}
//             </div>
//           )}

//           {/* ==================================================
//               FORM
//           ================================================== */}

//           <form
//             onSubmit={
//               handleSubmit
//             }
//             className="space-y-6"
//           >

//             {/* =================================================
//                 SELLER / STORE
//             ================================================= */}

//             <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">

//               <h2 className="text-lg font-bold text-gray-900">
//                 Seller & Store
//               </h2>

//               <p className="mt-1 text-sm text-gray-500">
//                 Select the approved seller and their approved store for this product.
//               </p>

//               <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

//                 {/* SELLER */}

//                 <div>

//                   <label className="block text-sm font-semibold text-gray-700">
//                     Seller

//                     <span className="ml-1 text-red-500">
//                       *
//                     </span>
//                   </label>

//                   <select
//                     value={
//                       form.sellerId
//                     }
//                     onChange={
//                       handleSellerChange
//                     }
//                     disabled={
//                       loadingSellers ||
//                       saving
//                     }
//                     required
//                     className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100"
//                   >

//                     <option value="">
//                       {loadingSellers
//                         ? 'Loading sellers...'
//                         : 'Select seller'}
//                     </option>

//                     {sellers.map(
//                       (
//                         seller
//                       ) => (
//                         <option
//                           key={
//                             seller._id
//                           }
//                           value={
//                             seller._id
//                           }
//                         >
//                           {seller.businessName ||
//                             seller.user?.name ||
//                             seller.user?.email ||
//                             'Seller'}
//                         </option>
//                       )
//                     )}

//                   </select>

//                   {!loadingSellers &&
//                     sellers.length ===
//                       0 && (
//                       <p className="mt-2 text-xs text-amber-600">
//                         No approved sellers with approved stores were found.
//                       </p>
//                     )}

//                 </div>

//                 {/* STORE */}

//                 <div>

//                   <label className="block text-sm font-semibold text-gray-700">
//                     Store

//                     <span className="ml-1 text-red-500">
//                       *
//                     </span>
//                   </label>

//                   <select
//                     value={
//                       form.storeId
//                     }
//                     disabled={
//                       !selectedSeller ||
//                       saving
//                     }
//                     required
//                     className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100"
//                   >

//                     <option value="">
//                       {selectedSeller
//                         ? 'Select store'
//                         : 'Select seller first'}
//                     </option>

//                     {selectedStore && (
//                       <option
//                         value={
//                           selectedStore._id
//                         }
//                       >
//                         {
//                           selectedStore.name
//                         }
//                       </option>
//                     )}

//                   </select>

//                   {selectedStore && (
//                     <p className="mt-2 text-xs text-gray-500">
//                       Store:{' '}
//                       {
//                         selectedStore.name
//                       }
//                     </p>
//                   )}

//                 </div>

//               </div>

//             </section>

//             {/* =================================================
//                 PRODUCT IMAGES
//             ================================================= */}

//             <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">

//               <h2 className="text-lg font-bold text-gray-900">
//                 Product Images
//               </h2>

//               <p className="mt-1 text-sm text-gray-500">
//                 Upload up to 4 images showing different sides of the product.
//               </p>

//               <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">

//                 {form.images.map(
//                   (
//                     image,
//                     index
//                   ) => (
//                     <div
//                       key={`${image.preview}-${index}`}
//                       className="relative aspect-square overflow-hidden rounded-xl border border-gray-200"
//                     >

//                       <img
//                         src={
//                           image.preview
//                         }
//                         alt={`Product ${
//                           index + 1
//                         }`}
//                         className="h-full w-full object-cover"
//                       />

//                       <button
//                         type="button"
//                         onClick={() =>
//                           removeImage(
//                             index
//                           )
//                         }
//                         disabled={
//                           saving
//                         }
//                         className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-red-600 shadow hover:bg-red-50 disabled:opacity-50"
//                       >
//                         <X
//                           size={16}
//                         />
//                       </button>

//                     </div>
//                   )
//                 )}

//                 {form.images.length <
//                   4 && (
//                   <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 hover:border-gray-500">

//                     <Upload
//                       size={24}
//                     />

//                     <span className="mt-2 text-xs font-semibold">
//                       Add Image
//                     </span>

//                     <input
//                       type="file"
//                       accept="image/jpeg,image/jpg,image/png,image/webp"
//                       multiple
//                       onChange={
//                         handleImages
//                       }
//                       disabled={
//                         saving
//                       }
//                       className="hidden"
//                     />

//                   </label>
//                 )}

//               </div>

//               <p className="mt-4 text-xs text-gray-400">
//                 JPG, JPEG, PNG or WEBP · Maximum 5MB per image · Maximum 4 images
//               </p>

//             </section>

//             {/* =================================================
//                 PRODUCT INFORMATION
//             ================================================= */}

//             <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">

//               <h2 className="text-lg font-bold text-gray-900">
//                 Product Information
//               </h2>

//               <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

//                 {/* PRODUCT NAME */}

//                 <Field
//                   label="Product Name"
//                   value={
//                     form.name
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     update(
//                       'name',
//                       value
//                     )
//                   }
//                   required
//                 />

//                 {/* SKU */}

//                 <Field
//                   label="SKU"
//                   value={
//                     form.sku
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     update(
//                       'sku',
//                       value
//                     )
//                   }
//                 />

//                 {/* CATEGORY */}

//                 <Field
//                   label="Category"
//                   value={
//                     form.category
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     update(
//                       'category',
//                       value
//                     )
//                   }
//                   required
//                 />

//                 {/* SUBCATEGORY */}

//                 <Field
//                   label="Subcategory"
//                   value={
//                     form.subcategory
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     update(
//                       'subcategory',
//                       value
//                     )
//                   }
//                 />

//                 {/* PRICE */}

//                 <Field
//                   label="Price (€)"
//                   type="number"
//                   value={
//                     form.price
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     update(
//                       'price',
//                       value
//                     )
//                   }
//                   required
//                 />

//                 {/* OLD PRICE */}

//                 <Field
//                   label="Old Price (€)"
//                   type="number"
//                   value={
//                     form.oldPrice
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     update(
//                       'oldPrice',
//                       value
//                     )
//                   }
//                 />

//                 {/* STOCK */}

//                 <Field
//                   label="Stock"
//                   type="number"
//                   value={
//                     form.stock
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     update(
//                       'stock',
//                       value
//                     )
//                   }
//                 />

//                 {/* MATERIAL */}

//                 <Field
//                   label="Material / Quality"
//                   value={
//                     form.material
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     update(
//                       'material',
//                       value
//                     )
//                   }
//                   placeholder="Premium Cotton, Silk, Handmade..."
//                 />

//                 {/* SIZES */}

//                 <Field
//                   label="Sizes"
//                   value={
//                     form.sizes
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     update(
//                       'sizes',
//                       value
//                     )
//                   }
//                   placeholder="S, M, L, XL"
//                 />

//                 {/* COLORS */}

//                 <Field
//                   label="Colors"
//                   value={
//                     form.colors
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     update(
//                       'colors',
//                       value
//                     )
//                   }
//                   placeholder="Black, White, Red"
//                 />

//                 {/* FEATURES */}

//                 <div className="md:col-span-2">

//                   <Field
//                     label="Features"
//                     value={
//                       form.features
//                     }
//                     onChange={(
//                       value
//                     ) =>
//                       update(
//                         'features',
//                         value
//                       )
//                     }
//                     placeholder="Premium quality, Handmade, Comfortable"
//                   />

//                   <p className="mt-2 text-xs text-gray-400">
//                     Separate multiple features with commas.
//                   </p>

//                 </div>

//                 {/* DESCRIPTION */}

//                 <div className="md:col-span-2">

//                   <label className="block text-sm font-semibold text-gray-700">
//                     Description

//                     <span className="ml-1 text-red-500">
//                       *
//                     </span>
//                   </label>

//                   <textarea
//                     value={
//                       form.description
//                     }
//                     onChange={(e) =>
//                       update(
//                         'description',
//                         e.target.value
//                       )
//                     }
//                     rows={6}
//                     required
//                     className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
//                     placeholder="Describe the product..."
//                   />

//                 </div>

//               </div>

//             </section>

//             {/* =================================================
//                 ACTIONS
//             ================================================= */}

//             <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

//               <Link
//                 to="/admin/my-products"
//                 className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </Link>

//               <button
//                 type="submit"
//                 disabled={
//                   saving ||
//                   loadingSellers
//                 }
//                 className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {saving
//                   ? 'Saving...'
//                   : 'Save Product'}
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
//   placeholder = '',
//   required = false,
// }) {
//   return (
//     <div>

//       <label className="block text-sm font-semibold text-gray-700">

//         {label}

//         {required && (
//           <span className="ml-1 text-red-500">
//             *
//           </span>
//         )}

//       </label>

//       <input
//         type={type}
//         value={value}
//         onChange={(e) =>
//           onChange(
//             e.target.value
//           )
//         }
//         placeholder={
//           placeholder
//         }
//         required={
//           required
//         }
//         min={
//           type === 'number'
//             ? '0'
//             : undefined
//         }
//         className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
//       />

//     </div>
//   )
// }

// // ============================================================
// // EXPORT
// // ============================================================

// export default AdminAddProduct



import React, { useEffect, useState } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  ImagePlus,
  PackagePlus,
  Trash2,
  Upload,
  X,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'

const API_URL = 'https://fegegta-server.onrender.com/api'

const getToken = () => {
  return localStorage.getItem('fegegta_auth_token')
}

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
    tags: '',
    images: [],
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // ============================================================
  // CLEANUP IMAGE PREVIEWS
  // ============================================================

  useEffect(() => {
    return () => {
      form.images.forEach((image) => {
        if (image?.preview) {
          URL.revokeObjectURL(image.preview)
        }
      })
    }
  }, [])

  // ============================================================
  // FORM CHANGE
  // ============================================================

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (error) {
      setError('')
    }
  }

  // ============================================================
  // IMAGE UPLOAD
  // ============================================================

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files || [])

    if (!selectedFiles.length) {
      return
    }

    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
    ]

    const availableSlots = 4 - form.images.length

    if (availableSlots <= 0) {
      setError('You can upload a maximum of 4 images.')
      e.target.value = ''
      return
    }

    const filesToAdd = selectedFiles.slice(0, availableSlots)

    for (const file of filesToAdd) {
      if (!allowedTypes.includes(file.type)) {
        setError(
          'Only JPG, JPEG, PNG and WEBP images are allowed.'
        )

        e.target.value = ''
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        setError(
          'Each image must be smaller than 5MB.'
        )

        e.target.value = ''
        return
      }
    }

    const newImages = filesToAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))

    setForm((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        ...newImages,
      ],
    }))

    setError('')
    e.target.value = ''
  }

  // ============================================================
  // REMOVE IMAGE
  // ============================================================

  const removeImage = (index) => {
    setForm((prev) => {
      const image = prev.images[index]

      if (image?.preview) {
        URL.revokeObjectURL(image.preview)
      }

      return {
        ...prev,
        images: prev.images.filter(
          (_, imageIndex) => imageIndex !== index
        ),
      }
    })
  }

  // ============================================================
  // VALIDATION
  // ============================================================

  const validateForm = () => {
    if (!form.name.trim()) {
      return 'Product name is required.'
    }

    if (!form.description.trim()) {
      return 'Product description is required.'
    }

    if (!form.category.trim()) {
      return 'Category is required.'
    }

    if (
      form.price === '' ||
      Number.isNaN(Number(form.price)) ||
      Number(form.price) < 0
    ) {
      return 'Please enter a valid product price.'
    }

    if (
      form.oldPrice !== '' &&
      (
        Number.isNaN(Number(form.oldPrice)) ||
        Number(form.oldPrice) < 0
      )
    ) {
      return 'Please enter a valid old price.'
    }

    if (
      form.stock === '' ||
      Number.isNaN(Number(form.stock)) ||
      Number(form.stock) < 0
    ) {
      return 'Please enter a valid stock quantity.'
    }

    if (form.images.length < 1) {
      return 'Please upload at least one product image.'
    }

    if (form.images.length > 4) {
      return 'You can upload a maximum of 4 images.'
    }

    return ''
  }

  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    const validationError = validateForm()

    if (validationError) {
      setError(validationError)

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      return
    }

    const token = getToken()

    if (!token) {
      setError(
        'Your session has expired. Please login again.'
      )

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      return
    }

    try {
      setSaving(true)

      const formData = new FormData()

      // ========================================================
      // PRODUCT OWNERSHIP
      // ========================================================

      formData.append(
        'ownerType',
        'platform'
      )

      // ========================================================
      // BASIC INFORMATION
      // ========================================================

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

      // ========================================================
      // PRICE
      // ========================================================

      formData.append(
        'price',
        form.price
      )

      if (form.oldPrice !== '') {
        formData.append(
          'oldPrice',
          form.oldPrice
        )
      }

      // ========================================================
      // STOCK
      // ========================================================

      formData.append(
        'stock',
        form.stock
      )

      // ========================================================
      // PRODUCT DETAILS
      // ========================================================

      formData.append(
        'material',
        form.material.trim()
      )

      formData.append(
        'sizes',
        form.sizes.trim()
      )

      formData.append(
        'colors',
        form.colors.trim()
      )

      formData.append(
        'features',
        form.features.trim()
      )

      formData.append(
        'tags',
        form.tags.trim()
      )

      // ========================================================
      // IMAGES
      // ========================================================

      form.images.forEach((image) => {
        formData.append(
          'images',
          image.file
        )
      })

      // ========================================================
      // API REQUEST
      // ========================================================

      const response = await fetch(
        `${API_URL}/admin/products`,
        {
          method: 'POST',

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data?.message ||
          'Failed to create the product.'
        )
      }

      // ========================================================
      // SUCCESS
      // ========================================================

      alert(
        'Product created successfully and published.'
      )

      navigate('/admin/my-products')

    } catch (err) {
      setError(
        err.message ||
        'Something went wrong while creating the product.'
      )

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

    } finally {
      setSaving(false)
    }
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ======================================================
          ADMIN SIDEBAR
      ====================================================== */}

      <AdminSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* ======================================================
          MAIN AREA
      ====================================================== */}

      <div className="lg:pl-72">

        <AdminHeader
          onMenuClick={() =>
            setMobileOpen(true)
          }
        />

        <main className="px-4 py-6 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-6xl">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="mb-8">

              <Link
                to="/admin/my-products"
                className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
              >
                <ArrowLeft size={17} />
                Back to Products
              </Link>

              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                <div>

                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                    <PackagePlus size={14} />
                    Admin Product
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Add Product
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Create and publish a product directly
                    as a Fegegta platform product.
                  </p>

                </div>

                {/* ADMIN STATUS */}

                <div className="flex w-fit items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle2
                      size={19}
                      className="text-emerald-600"
                    />
                  </div>

                  <div>

                    <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                      Admin Publishing
                    </p>

                    <p className="text-sm font-semibold text-emerald-900">
                      Approved & Active
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

                <X
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <p>{error}</p>

              </div>
            )}

            {/* ==================================================
                FORM
            ================================================== */}

            <form onSubmit={handleSubmit}>

              <div className="space-y-6">

                {/* =================================================
                    PRODUCT IMAGES
                ================================================= */}

                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                  <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                        <ImagePlus
                          size={20}
                          className="text-slate-700"
                        />
                      </div>

                      <div>

                        <h2 className="font-semibold text-slate-900">
                          Product Images
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                          Upload up to 4 images for this
                          product.
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="p-5 sm:p-6">

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

                      {form.images.map(
                        (image, index) => (
                          <div
                            key={`${image.preview}-${index}`}
                            className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
                          >

                            <img
                              src={image.preview}
                              alt={`Product preview ${index + 1}`}
                              className="h-full w-full object-cover"
                            />

                            {index === 0 && (
                              <div className="absolute left-2 top-2 rounded-lg bg-slate-900 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                                Main Image
                              </div>
                            )}

                            <button
                              type="button"
                              onClick={() =>
                                removeImage(index)
                              }
                              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-sm transition hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={15} />
                            </button>

                          </div>
                        )
                      )}

                      {form.images.length < 4 && (
                        <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-center transition hover:border-slate-500 hover:bg-slate-100">

                          <Upload
                            size={24}
                            className="mb-2 text-slate-500"
                          />

                          <span className="text-sm font-semibold text-slate-700">
                            Upload Image
                          </span>

                          <span className="mt-1 text-xs text-slate-400">
                            JPG, PNG or WEBP
                          </span>

                          <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            multiple
                            onChange={
                              handleImageChange
                            }
                            className="hidden"
                          />

                        </label>
                      )}

                    </div>

                    <p className="mt-4 text-xs text-slate-400">
                      {form.images.length}/4 images selected
                      {' • '}
                      Maximum 5MB per image
                    </p>

                  </div>

                </section>

                {/* =================================================
                    PRODUCT INFORMATION
                ================================================= */}

                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                  <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                        <PackagePlus
                          size={20}
                          className="text-slate-700"
                        />
                      </div>

                      <div>

                        <h2 className="font-semibold text-slate-900">
                          Product Information
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                          Enter the information customers
                          will see.
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">

                    <Field
                      label="Product Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Premium Traditional Dress"
                      required
                    />

                    <Field
                      label="SKU"
                      name="sku"
                      value={form.sku}
                      onChange={handleChange}
                      placeholder="e.g. FEGE-DRS-001"
                    />

                    <Field
                      label="Category"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      placeholder="e.g. Clothing"
                      required
                    />

                    <Field
                      label="Subcategory"
                      name="subcategory"
                      value={form.subcategory}
                      onChange={handleChange}
                      placeholder="e.g. Traditional Dresses"
                    />

                    <Field
                      label="Price (€)"
                      name="price"
                      type="number"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />

                    <Field
                      label="Old Price (€)"
                      name="oldPrice"
                      type="number"
                      value={form.oldPrice}
                      onChange={handleChange}
                      placeholder="Optional"
                      min="0"
                      step="0.01"
                    />

                    <Field
                      label="Stock Quantity"
                      name="stock"
                      type="number"
                      value={form.stock}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      step="1"
                      required
                    />

                    <Field
                      label="Material / Quality"
                      name="material"
                      value={form.material}
                      onChange={handleChange}
                      placeholder="e.g. Premium Cotton"
                    />

                    <Field
                      label="Sizes"
                      name="sizes"
                      value={form.sizes}
                      onChange={handleChange}
                      placeholder="S, M, L, XL"
                    />

                    <Field
                      label="Colors"
                      name="colors"
                      value={form.colors}
                      onChange={handleChange}
                      placeholder="Black, White, Gold"
                    />

                    <Field
                      label="Features"
                      name="features"
                      value={form.features}
                      onChange={handleChange}
                      placeholder="Handmade, Premium fabric"
                    />

                    <Field
                      label="Tags"
                      name="tags"
                      value={form.tags}
                      onChange={handleChange}
                      placeholder="traditional, dress, handmade"
                    />

                    {/* DESCRIPTION */}

                    <div className="sm:col-span-2">

                      <label className="mb-2 block text-sm font-semibold text-slate-700">

                        Product Description

                        <span className="ml-1 text-red-500">
                          *
                        </span>

                      </label>

                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={6}
                        maxLength={5000}
                        placeholder="Write a clear and detailed description of this product..."
                        className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                      />

                      <div className="mt-2 flex justify-end text-xs text-slate-400">
                        {form.description.length}/5000
                      </div>

                    </div>

                  </div>

                </section>

                {/* =================================================
                    PLATFORM OWNERSHIP
                ================================================= */}

                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                  <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900">
                        <CheckCircle2
                          size={20}
                          className="text-white"
                        />
                      </div>

                      <div>

                        <h2 className="font-semibold text-slate-900">
                          Product Ownership
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                          This product is created and owned
                          directly by the Fegegta platform.
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="p-5 sm:p-6">

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Owner
                          </p>

                          <p className="mt-1 text-lg font-bold text-slate-900">
                            Fegegta Platform
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            No seller or seller approval is required.
                          </p>

                        </div>

                        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold text-emerald-700">

                          <CheckCircle2 size={15} />

                          Platform Product

                        </div>

                      </div>

                    </div>

                  </div>

                </section>

                {/* =================================================
                    ADMIN PUBLISH
                ================================================= */}

                <section className="overflow-hidden rounded-2xl border border-slate-900 bg-slate-900 text-white shadow-sm">

                  <div className="p-5 sm:p-6">

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                      <div className="flex items-start gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                          <CheckCircle2 size={22} />
                        </div>

                        <div>

                          <h2 className="font-semibold">
                            Ready to Publish
                          </h2>

                          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-300">
                            Products created by an administrator
                            are published directly as platform
                            products. No seller approval is required.
                          </p>

                        </div>

                      </div>

                      <div className="shrink-0 rounded-xl bg-white/10 px-4 py-3">

                        <p className="text-xs uppercase tracking-wider text-slate-400">
                          After saving
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          Approved • Active • Published
                        </p>

                      </div>

                    </div>

                  </div>

                </section>

                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">

                  <Link
                    to="/admin/my-products"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {saving ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                        Publishing Product...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={18} />

                        Save & Publish Product
                      </>
                    )}

                  </button>

                </div>

              </div>

            </form>

          </div>

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
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  min,
  step,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-700">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        step={step}
        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
      />

    </div>
  )
}

export default AdminAddProduct
