
// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import {
//   ArrowLeft,
//   Send,
//   Store,
// } from 'lucide-react'

// import { useAuth } from '../../context/AuthContext'

// const API_URL =
//   'https://fegegta-server.onrender.com/api'

// const initialForm = {
//   storeName: '',
//   storeDescription: '',
//   productType: '',
//   productCategory: '',
//   productDescription: '',
//   productQuality: '',
//   businessName: '',
//   businessEmail: '',
//   businessPhone: '',
//   address: '',
//   otherInformation: '',
// }

// function SellerApplicant() {
//   const navigate = useNavigate()
//   const { user } = useAuth()

//   const [formData, setFormData] =
//     useState(initialForm)

//   const [error, setError] = useState('')
//   const [saving, setSaving] = useState(false)

//   // ============================================================
//   // LOAD USER INFORMATION
//   // ============================================================

//   useEffect(() => {
//     setFormData((prev) => ({
//       ...prev,
//       businessEmail:
//         prev.businessEmail ||
//         user?.email ||
//         '',
//       businessPhone:
//         prev.businessPhone ||
//         user?.phone ||
//         '',
//     }))
//   }, [user])

//   // ============================================================
//   // HANDLE INPUT
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
//   // SUBMIT APPLICATION
//   // ============================================================

//   const handleSubmit = async (event) => {
//     event.preventDefault()

//     setError('')

//     // ----------------------------------------------------------
//     // REQUIRED FIELDS
//     // ----------------------------------------------------------

//     const requiredFields = [
//       'storeName',
//       'storeDescription',
//       'productType',
//       'productCategory',
//       'productDescription',
//       'productQuality',
//       'businessName',
//       'businessEmail',
//       'businessPhone',
//       'address',
//     ]

//     const missing = requiredFields.find(
//       (field) =>
//         !String(formData[field] || '').trim()
//     )

//     if (missing) {
//       setError(
//         'Please complete all required fields.'
//       )
//       return
//     }

//     // ----------------------------------------------------------
//     // EMAIL VALIDATION
//     // ----------------------------------------------------------

//     const emailValid =
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
//         formData.businessEmail.trim()
//       )

//     if (!emailValid) {
//       setError(
//         'Please enter a valid business email.'
//       )
//       return
//     }

//     // ----------------------------------------------------------
//     // AUTH TOKEN
//     // ----------------------------------------------------------

//     const token =
//       localStorage.getItem('token')

//     if (!token) {
//       setError(
//         'Your session has expired. Please login again.'
//       )
//       return
//     }

//     try {
//       setSaving(true)

//       // ========================================================
//       // COMBINED DESCRIPTION
//       // ========================================================

//       const combinedDescription = [
//         `Store Name: ${formData.storeName.trim()}`,
//         `Store Description: ${formData.storeDescription.trim()}`,
//         `Product Type: ${formData.productType.trim()}`,
//         `Product Category: ${formData.productCategory.trim()}`,
//         `Product Description: ${formData.productDescription.trim()}`,
//         `Product Quality: ${formData.productQuality.trim()}`,
//         formData.otherInformation.trim()
//           ? `Other Information: ${formData.otherInformation.trim()}`
//           : '',
//       ]
//         .filter(Boolean)
//         .join('\n\n')

//       // ========================================================
//       // SUBMIT TO BACKEND
//       // ========================================================

//       const response = await fetch(
//         `${API_URL}/seller-applications`,
//         {
//           method: 'POST',

//           headers: {
//             'Content-Type':
//               'application/json',

//             Authorization: `Bearer ${token}`,
//           },

//           body: JSON.stringify({
//             // BUSINESS INFORMATION
//             businessName:
//               formData.businessName.trim(),

//             phone:
//               formData.businessPhone.trim(),

//             email:
//               formData.businessEmail
//                 .trim()
//                 .toLowerCase(),

//             address:
//               formData.address.trim(),

//             // STORE INFORMATION
//             storeName:
//               formData.storeName.trim(),

//             storeDescription:
//               formData.storeDescription.trim(),

//             // PRODUCT INFORMATION
//             productType:
//               formData.productType.trim(),

//             productCategory:
//               formData.productCategory.trim(),

//             productDescription:
//               formData.productDescription.trim(),

//             productQuality:
//               formData.productQuality.trim(),

//             // ADDITIONAL INFORMATION
//             otherInformation:
//               formData.otherInformation.trim(),

//             // KEEP EXISTING COMPATIBILITY
//             description:
//               combinedDescription,

//             documents: {},
//           }),
//         }
//       )

//       let data = {}

//       try {
//         data = await response.json()
//       } catch {
//         data = {}
//       }

//       // ========================================================
//       // HANDLE AUTH ERROR
//       // ========================================================

//       if (response.status === 401) {
//         localStorage.removeItem('token')
//         localStorage.removeItem('user')

//         setError(
//           'Your session has expired. Please login again.'
//         )

//         return
//       }

//       // ========================================================
//       // HANDLE DUPLICATE APPLICATION
//       // ========================================================

//       if (response.status === 409) {
//         setError(
//           data?.message ||
//             'You already have a seller application.'
//         )

//         return
//       }

//       // ========================================================
//       // HANDLE OTHER ERRORS
//       // ========================================================

//       if (!response.ok) {
//         throw new Error(
//           data?.message ||
//             'Failed to submit seller application.'
//         )
//       }

//       // ========================================================
//       // SUCCESS
//       // ========================================================

//       navigate(
//         '/seller/application-status'
//       )
//     } catch (error) {
//       console.error(
//         'Seller application error:',
//         error
//       )

//       setError(
//         error.message ||
//           'Something went wrong while submitting your application.'
//       )
//     } finally {
//       setSaving(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-4xl">
//         <Link
//           to="/"
//           className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back
//         </Link>

//         <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
//           <div className="bg-black px-6 py-10 text-white sm:px-10">
//             <div className="flex items-center gap-4">
//               <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
//                 <Store className="h-7 w-7" />
//               </div>

//               <div>
//                 <h1 className="text-2xl font-bold sm:text-3xl">
//                   Sell With Us
//                 </h1>

//                 <p className="mt-1 text-sm text-gray-300">
//                   Apply to become a Fegegta seller.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="space-y-8 p-6 sm:p-10"
//           >
//             {error && (
//               <div className="whitespace-pre-line rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//                 {error}
//               </div>
//             )}

//             <section>
//               <h2 className="text-lg font-bold text-gray-900">
//                 Store Information
//               </h2>

//               <div className="mt-5 grid gap-5 md:grid-cols-2">
//                 <Field
//                   label="Store Name"
//                   name="storeName"
//                   value={formData.storeName}
//                   onChange={handleChange}
//                   required
//                 />

//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-gray-700">
//                     Product Category
//                   </label>

//                   <select
//                     name="productCategory"
//                     value={
//                       formData.productCategory
//                     }
//                     onChange={handleChange}
//                     required
//                     className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
//                   >
//                     <option value="">
//                       Select category
//                     </option>

//                     <option value="fashion">
//                       Fashion
//                     </option>

//                     <option value="clothing">
//                       Clothing
//                     </option>

//                     <option value="accessories">
//                       Accessories
//                     </option>

//                     <option value="beauty">
//                       Beauty
//                     </option>

//                     <option value="home">
//                       Home
//                     </option>

//                     <option value="electronics">
//                       Electronics
//                     </option>

//                     <option value="other">
//                       Other
//                     </option>
//                   </select>
//                 </div>
//               </div>

//               <Textarea
//                 label="Store Description"
//                 name="storeDescription"
//                 value={
//                   formData.storeDescription
//                 }
//                 onChange={handleChange}
//                 required
//               />
//             </section>

//             <section className="border-t border-gray-200 pt-8">
//               <h2 className="text-lg font-bold text-gray-900">
//                 Product Information
//               </h2>

//               <div className="mt-5 grid gap-5 md:grid-cols-2">
//                 <Field
//                   label="What type of products do you want to sell?"
//                   name="productType"
//                   value={formData.productType}
//                   onChange={handleChange}
//                   required
//                 />

//                 <Field
//                   label="Product Quality"
//                   name="productQuality"
//                   value={
//                     formData.productQuality
//                   }
//                   onChange={handleChange}
//                   required
//                   placeholder="Example: Premium / Handmade"
//                 />
//               </div>

//               <Textarea
//                 label="Product Description"
//                 name="productDescription"
//                 value={
//                   formData.productDescription
//                 }
//                 onChange={handleChange}
//                 required
//               />
//             </section>

//             <section className="border-t border-gray-200 pt-8">
//               <h2 className="text-lg font-bold text-gray-900">
//                 Business Information
//               </h2>

//               <div className="mt-5 grid gap-5 md:grid-cols-2">
//                 <Field
//                   label="Business Name"
//                   name="businessName"
//                   value={formData.businessName}
//                   onChange={handleChange}
//                   required
//                 />

//                 <Field
//                   label="Business Email"
//                   type="email"
//                   name="businessEmail"
//                   value={
//                     formData.businessEmail
//                   }
//                   onChange={handleChange}
//                   required
//                 />

//                 <Field
//                   label="Business Phone"
//                   type="tel"
//                   name="businessPhone"
//                   value={
//                     formData.businessPhone
//                   }
//                   onChange={handleChange}
//                   required
//                 />

//                 <Field
//                   label="Address"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <Textarea
//                 label="Other Important Information"
//                 name="otherInformation"
//                 value={
//                   formData.otherInformation
//                 }
//                 onChange={handleChange}
//               />
//             </section>

//             <div className="flex justify-end border-t border-gray-200 pt-6">
//               <button
//                 type="submit"
//                 disabled={saving}
//                 className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 <Send className="h-4 w-4" />

//                 {saving
//                   ? 'Submitting...'
//                   : 'Submit Application'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// function Field({
//   label,
//   name,
//   value,
//   onChange,
//   type = 'text',
//   required = false,
//   placeholder = '',
// }) {
//   return (
//     <div>
//       <label className="mb-2 block text-sm font-medium text-gray-700">
//         {label}
//       </label>

//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         required={required}
//         placeholder={placeholder}
//         className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
//       />
//     </div>
//   )
// }

// function Textarea({
//   label,
//   name,
//   value,
//   onChange,
//   required = false,
// }) {
//   return (
//     <div className="mt-5">
//       <label className="mb-2 block text-sm font-medium text-gray-700">
//         {label}
//       </label>

//       <textarea
//         name={name}
//         value={value}
//         onChange={onChange}
//         rows={4}
//         required={required}
//         className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
//       />
//     </div>
//   )
// }

// export default SellerApplicant

// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import {
//   ArrowLeft,
//   Send,
//   Store,
// } from 'lucide-react'

// import { useAuth } from '../../context/AuthContext'

// const API_URL =
//   'https://fegegta-server.onrender.com/api'

// const initialForm = {
//   storeName: '',
//   storeDescription: '',
//   productType: '',
//   productCategory: '',
//   productDescription: '',
//   productQuality: '',
//   businessName: '',
//   businessEmail: '',
//   businessPhone: '',
//   address: '',
//   otherInformation: '',
// }

// function SellerApplicant() {
//   const navigate = useNavigate()
//   const { user } = useAuth()

//   const [formData, setFormData] =
//     useState(initialForm)

//   const [error, setError] = useState('')
//   const [saving, setSaving] = useState(false)

//   // ============================================================
//   // LOAD USER INFORMATION
//   // ============================================================

//   useEffect(() => {
//     setFormData((prev) => ({
//       ...prev,
//       businessEmail:
//         prev.businessEmail ||
//         user?.email ||
//         '',
//       businessPhone:
//         prev.businessPhone ||
//         user?.phone ||
//         '',
//     }))
//   }, [user])

//   // ============================================================
//   // HANDLE INPUT
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
//   // SUBMIT APPLICATION
//   // ============================================================

//   const handleSubmit = async (event) => {
//     event.preventDefault()

//     setError('')

//     // ----------------------------------------------------------
//     // REQUIRED FIELDS
//     // ----------------------------------------------------------

//     const requiredFields = [
//       'storeName',
//       'storeDescription',
//       'productType',
//       'productCategory',
//       'productDescription',
//       'productQuality',
//       'businessName',
//       'businessEmail',
//       'businessPhone',
//       'address',
//     ]

//     const missing = requiredFields.find(
//       (field) =>
//         !String(formData[field] || '').trim()
//     )

//     if (missing) {
//       setError(
//         'Please complete all required fields.'
//       )
//       return
//     }

//     // ----------------------------------------------------------
//     // EMAIL VALIDATION
//     // ----------------------------------------------------------

//     const emailValid =
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
//         formData.businessEmail.trim()
//       )

//     if (!emailValid) {
//       setError(
//         'Please enter a valid business email.'
//       )
//       return
//     }

//     // ----------------------------------------------------------
//     // AUTH TOKEN
//     // ----------------------------------------------------------

//     const token =
//       localStorage.getItem('token')

//     if (!token) {
//       setError(
//         'Your session has expired. Please login again.'
//       )
//       return
//     }

//     try {
//       setSaving(true)

//       // ========================================================
//       // COMBINED DESCRIPTION
//       // ========================================================

//       const combinedDescription = [
//         `Store Name: ${formData.storeName.trim()}`,
//         `Store Description: ${formData.storeDescription.trim()}`,
//         `Product Type: ${formData.productType.trim()}`,
//         `Product Category: ${formData.productCategory.trim()}`,
//         `Product Description: ${formData.productDescription.trim()}`,
//         `Product Quality: ${formData.productQuality.trim()}`,
//         formData.otherInformation.trim()
//           ? `Other Information: ${formData.otherInformation.trim()}`
//           : '',
//       ]
//         .filter(Boolean)
//         .join('\n\n')

//       // ========================================================
//       // SUBMIT TO BACKEND
//       // ========================================================

//       const response = await fetch(
//         `${API_URL}/seller-applications`,
//         {
//           method: 'POST',

//           headers: {
//             'Content-Type':
//               'application/json',

//             Authorization: `Bearer ${token}`,
//           },

//           body: JSON.stringify({
//             // BUSINESS INFORMATION
//             businessName:
//               formData.businessName.trim(),

//             phone:
//               formData.businessPhone.trim(),

//             email:
//               formData.businessEmail
//                 .trim()
//                 .toLowerCase(),

//             address:
//               formData.address.trim(),

//             // STORE INFORMATION
//             storeName:
//               formData.storeName.trim(),

//             storeDescription:
//               formData.storeDescription.trim(),

//             // PRODUCT INFORMATION
//             productType:
//               formData.productType.trim(),

//             productCategory:
//               formData.productCategory.trim(),

//             productDescription:
//               formData.productDescription.trim(),

//             productQuality:
//               formData.productQuality.trim(),

//             // ADDITIONAL INFORMATION
//             otherInformation:
//               formData.otherInformation.trim(),

//             // KEEP EXISTING COMPATIBILITY
//             description:
//               combinedDescription,

//             documents: {},
//           }),
//         }
//       )

//       let data = {}

//       try {
//         data = await response.json()
//       } catch {
//         data = {}
//       }

//       // ========================================================
//       // HANDLE AUTH ERROR
//       // ========================================================

//       if (response.status === 401) {
//         localStorage.removeItem('token')
//         localStorage.removeItem('user')

//         setError(
//           'Your session has expired. Please login again.'
//         )

//         return
//       }

//       // ========================================================
//       // HANDLE DUPLICATE APPLICATION
//       // ========================================================

//       if (response.status === 409) {
//         setError(
//           data?.message ||
//             'You already have a seller application.'
//         )

//         return
//       }

//       // ========================================================
//       // HANDLE OTHER ERRORS
//       // ========================================================

//       if (!response.ok) {
//         throw new Error(
//           data?.message ||
//             'Failed to submit seller application.'
//         )
//       }

//       // ========================================================
//       // SUCCESS
//       // ========================================================

//       navigate(
//         '/seller/application-status'
//       )
//     } catch (error) {
//       console.error(
//         'Seller application error:',
//         error
//       )

//       setError(
//         error.message ||
//           'Something went wrong while submitting your application.'
//       )
//     } finally {
//       setSaving(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-4xl">
//         <Link
//           to="/"
//           className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back
//         </Link>

//         <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
//           <div className="bg-black px-6 py-10 text-white sm:px-10">
//             <div className="flex items-center gap-4">
//               <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
//                 <Store className="h-7 w-7" />
//               </div>

//               <div>
//                 <h1 className="text-2xl font-bold sm:text-3xl">
//                   Sell With Us
//                 </h1>

//                 <p className="mt-1 text-sm text-gray-300">
//                   Apply to become a Fegegta seller.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="space-y-8 p-6 sm:p-10"
//           >
//             {error && (
//               <div className="whitespace-pre-line rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//                 {error}
//               </div>
//             )}

//             <section>
//               <h2 className="text-lg font-bold text-gray-900">
//                 Store Information
//               </h2>

//               <div className="mt-5 grid gap-5 md:grid-cols-2">
//                 <Field
//                   label="Store Name"
//                   name="storeName"
//                   value={formData.storeName}
//                   onChange={handleChange}
//                   required
//                 />

//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-gray-700">
//                     Product Category
//                   </label>

//                   <select
//                     name="productCategory"
//                     value={
//                       formData.productCategory
//                     }
//                     onChange={handleChange}
//                     required
//                     className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
//                   >
//                     <option value="">
//                       Select category
//                     </option>

//                     <option value="fashion">
//                       Fashion
//                     </option>

//                     <option value="clothing">
//                       Clothing
//                     </option>

//                     <option value="accessories">
//                       Accessories
//                     </option>

//                     <option value="beauty">
//                       Beauty
//                     </option>

//                     <option value="home">
//                       Home
//                     </option>

//                     <option value="electronics">
//                       Electronics
//                     </option>

//                     <option value="other">
//                       Other
//                     </option>
//                   </select>
//                 </div>
//               </div>

//               <Textarea
//                 label="Store Description"
//                 name="storeDescription"
//                 value={
//                   formData.storeDescription
//                 }
//                 onChange={handleChange}
//                 required
//               />
//             </section>

//             <section className="border-t border-gray-200 pt-8">
//               <h2 className="text-lg font-bold text-gray-900">
//                 Product Information
//               </h2>

//               <div className="mt-5 grid gap-5 md:grid-cols-2">
//                 <Field
//                   label="What type of products do you want to sell?"
//                   name="productType"
//                   value={formData.productType}
//                   onChange={handleChange}
//                   required
//                 />

//                 <Field
//                   label="Product Quality"
//                   name="productQuality"
//                   value={
//                     formData.productQuality
//                   }
//                   onChange={handleChange}
//                   required
//                   placeholder="Example: Premium / Handmade"
//                 />
//               </div>

//               <Textarea
//                 label="Product Description"
//                 name="productDescription"
//                 value={
//                   formData.productDescription
//                 }
//                 onChange={handleChange}
//                 required
//               />
//             </section>

//             <section className="border-t border-gray-200 pt-8">
//               <h2 className="text-lg font-bold text-gray-900">
//                 Business Information
//               </h2>

//               <div className="mt-5 grid gap-5 md:grid-cols-2">
//                 <Field
//                   label="Business Name"
//                   name="businessName"
//                   value={formData.businessName}
//                   onChange={handleChange}
//                   required
//                 />

//                 <Field
//                   label="Business Email"
//                   type="email"
//                   name="businessEmail"
//                   value={
//                     formData.businessEmail
//                   }
//                   onChange={handleChange}
//                   required
//                 />

//                 <Field
//                   label="Business Phone"
//                   type="tel"
//                   name="businessPhone"
//                   value={
//                     formData.businessPhone
//                   }
//                   onChange={handleChange}
//                   required
//                 />

//                 <Field
//                   label="Address"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <Textarea
//                 label="Other Important Information"
//                 name="otherInformation"
//                 value={
//                   formData.otherInformation
//                 }
//                 onChange={handleChange}
//               />
//             </section>

//             <div className="flex justify-end border-t border-gray-200 pt-6">
//               <button
//                 type="submit"
//                 disabled={saving}
//                 className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 <Send className="h-4 w-4" />

//                 {saving
//                   ? 'Submitting...'
//                   : 'Submit Application'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// function Field({
//   label,
//   name,
//   value,
//   onChange,
//   type = 'text',
//   required = false,
//   placeholder = '',
// }) {
//   return (
//     <div>
//       <label className="mb-2 block text-sm font-medium text-gray-700">
//         {label}
//       </label>

//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         required={required}
//         placeholder={placeholder}
//         className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
//       />
//     </div>
//   )
// }

// function Textarea({
//   label,
//   name,
//   value,
//   onChange,
//   required = false,
// }) {
//   return (
//     <div className="mt-5">
//       <label className="mb-2 block text-sm font-medium text-gray-700">
//         {label}
//       </label>

//       <textarea
//         name={name}
//         value={value}
//         onChange={onChange}
//         rows={4}
//         required={required}
//         className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
//       />
//     </div>
//   )
// }

// export default SellerApplicant

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Send,
  Store,
} from 'lucide-react'

import { useAuth } from '../../context/AuthContext'

// ============================================================
// API
// ============================================================

const API_URL =
  'https://fegegta-server.onrender.com/api'

// ============================================================
// INITIAL FORM
// ============================================================

const initialForm = {
  storeName: '',
  storeDescription: '',
  productType: '',
  productCategory: '',
  productDescription: '',
  productQuality: '',
  businessName: '',
  businessEmail: '',
  businessPhone: '',
  address: '',
  otherInformation: '',
}

// ============================================================
// COMPONENT
// ============================================================

function SellerApplicant() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [formData, setFormData] =
    useState(initialForm)

  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  // ============================================================
  // LOAD USER INFORMATION
  // ============================================================

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,

      businessEmail:
        prev.businessEmail ||
        user?.email ||
        '',

      businessPhone:
        prev.businessPhone ||
        user?.phone ||
        '',
    }))
  }, [user])

  // ============================================================
  // HANDLE INPUT
  // ============================================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setError('')
  }

  // ============================================================
  // VALIDATE FORM
  // ============================================================

  const validateForm = () => {
    const requiredFields = [
      'storeName',
      'storeDescription',
      'productType',
      'productCategory',
      'productDescription',
      'productQuality',
      'businessName',
      'businessEmail',
      'businessPhone',
      'address',
    ]

    const missingField =
      requiredFields.find(
        (field) =>
          !String(
            formData[field] || ''
          ).trim()
      )

    if (missingField) {
      return 'Please complete all required fields.'
    }

    // ----------------------------------------------------------
    // EMAIL
    // ----------------------------------------------------------

    const emailValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.businessEmail.trim()
      )

    if (!emailValid) {
      return 'Please enter a valid business email.'
    }

    return ''
  }

  // ============================================================
  // SUBMIT APPLICATION
  // ============================================================

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')

    // ==========================================================
    // VALIDATION
    // ==========================================================

    const validationError =
      validateForm()

    if (validationError) {
      setError(validationError)
      return
    }

    // ==========================================================
    // AUTH TOKEN
    // ==========================================================

    const token =
      localStorage.getItem('token')

    if (!token) {
      setError(
        'Your session has expired. Please login again.'
      )
      return
    }

    try {
      setSaving(true)

      // ========================================================
      // COMBINED DESCRIPTION
      //
      // Kept for compatibility with older applications.
      // The backend now also receives all structured fields.
      // ========================================================

      const combinedDescription = [
        `Store Name: ${formData.storeName.trim()}`,

        `Store Description: ${formData.storeDescription.trim()}`,

        `Product Type: ${formData.productType.trim()}`,

        `Product Category: ${formData.productCategory.trim()}`,

        `Product Description: ${formData.productDescription.trim()}`,

        `Product Quality: ${formData.productQuality.trim()}`,

        formData.otherInformation.trim()
          ? `Other Information: ${formData.otherInformation.trim()}`
          : '',
      ]
        .filter(Boolean)
        .join('\n\n')

      // ========================================================
      // REQUEST BODY
      // ========================================================

      const requestBody = {
        // ------------------------------------------------------
        // BUSINESS INFORMATION
        // ------------------------------------------------------

        businessName:
          formData.businessName.trim(),

        phone:
          formData.businessPhone.trim(),

        email:
          formData.businessEmail
            .trim()
            .toLowerCase(),

        address:
          formData.address.trim(),

        // ------------------------------------------------------
        // STORE INFORMATION
        // ------------------------------------------------------

        storeName:
          formData.storeName.trim(),

        storeDescription:
          formData.storeDescription.trim(),

        // ------------------------------------------------------
        // PRODUCT INFORMATION
        // ------------------------------------------------------

        productType:
          formData.productType.trim(),

        productCategory:
          formData.productCategory.trim(),

        productDescription:
          formData.productDescription.trim(),

        productQuality:
          formData.productQuality.trim(),

        // ------------------------------------------------------
        // ADDITIONAL INFORMATION
        // ------------------------------------------------------

        otherInformation:
          formData.otherInformation.trim(),

        // ------------------------------------------------------
        // OLD / COMPATIBILITY FIELD
        // ------------------------------------------------------

        description:
          combinedDescription,

        // ------------------------------------------------------
        // DOCUMENTS
        // ------------------------------------------------------

        documents: {},
      }

      // ========================================================
      // SEND REQUEST
      // ========================================================

      const response = await fetch(
        `${API_URL}/seller-applications`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',

            Authorization:
              `Bearer ${token}`,
          },

          body:
            JSON.stringify(
              requestBody
            ),
        }
      )

      // ========================================================
      // READ RESPONSE
      // ========================================================

      let data = {}

      try {
        data =
          await response.json()
      } catch {
        data = {}
      }

      // ========================================================
      // AUTH ERROR
      // ========================================================

      if (
        response.status === 401
      ) {
        localStorage.removeItem(
          'token'
        )

        localStorage.removeItem(
          'user'
        )

        setError(
          'Your session has expired. Please login again.'
        )

        return
      }

      // ========================================================
      // CONFLICT
      //
      // 409 can mean:
      // - pending application
      // - already approved
      // - approved seller account
      // ========================================================

      if (
        response.status === 409
      ) {
        setError(
          data?.message ||
            'You already have a seller application.'
        )

        return
      }

      // ========================================================
      // OTHER BACKEND ERROR
      // ========================================================

      if (!response.ok) {
        throw new Error(
          data?.message ||
            'Failed to submit seller application.'
        )
      }

      // ========================================================
      // SUCCESS
      // ========================================================

      if (
        data?.success
      ) {
        navigate(
          '/seller/application-status'
        )

        return
      }

      // ========================================================
      // UNEXPECTED SUCCESS RESPONSE
      // ========================================================

      navigate(
        '/seller/application-status'
      )
    } catch (error) {
      console.error(
        'Seller application error:',
        error
      )

      setError(
        error?.message ||
          'Something went wrong while submitting your application.'
      )
    } finally {
      setSaving(false)
    }
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* ====================================================
            BACK
        ==================================================== */}

        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />

          Back
        </Link>

        {/* ====================================================
            CARD
        ==================================================== */}

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="bg-black px-6 py-10 text-white sm:px-10">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <Store className="h-7 w-7" />
              </div>

              <div>
                <h1 className="text-2xl font-bold sm:text-3xl">
                  Sell With Us
                </h1>

                <p className="mt-1 text-sm text-gray-300">
                  Apply to become a Fegegta seller.
                </p>
              </div>

            </div>

          </div>

          {/* ==================================================
              FORM
          ================================================== */}

          <form
            onSubmit={handleSubmit}
            className="space-y-8 p-6 sm:p-10"
          >

            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (
              <div className="whitespace-pre-line rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* ==================================================
                STORE INFORMATION
            ================================================== */}

            <section>

              <h2 className="text-lg font-bold text-gray-900">
                Store Information
              </h2>

              <div className="mt-5 grid gap-5 md:grid-cols-2">

                <Field
                  label="Store Name"
                  name="storeName"
                  value={
                    formData.storeName
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Product Category
                  </label>

                  <select
                    name="productCategory"
                    value={
                      formData.productCategory
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                  >

                    <option value="">
                      Select category
                    </option>

                    <option value="fashion">
                      Fashion
                    </option>

                    <option value="clothing">
                      Clothing
                    </option>

                    <option value="accessories">
                      Accessories
                    </option>

                    <option value="beauty">
                      Beauty
                    </option>

                    <option value="home">
                      Home
                    </option>

                    <option value="electronics">
                      Electronics
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                </div>

              </div>

              <Textarea
                label="Store Description"
                name="storeDescription"
                value={
                  formData.storeDescription
                }
                onChange={
                  handleChange
                }
                required
              />

            </section>

            {/* ==================================================
                PRODUCT INFORMATION
            ================================================== */}

            <section className="border-t border-gray-200 pt-8">

              <h2 className="text-lg font-bold text-gray-900">
                Product Information
              </h2>

              <div className="mt-5 grid gap-5 md:grid-cols-2">

                <Field
                  label="What type of products do you want to sell?"
                  name="productType"
                  value={
                    formData.productType
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

                <Field
                  label="Product Quality"
                  name="productQuality"
                  value={
                    formData.productQuality
                  }
                  onChange={
                    handleChange
                  }
                  required
                  placeholder="Example: Premium / Handmade"
                />

              </div>

              <Textarea
                label="Product Description"
                name="productDescription"
                value={
                  formData.productDescription
                }
                onChange={
                  handleChange
                }
                required
              />

            </section>

            {/* ==================================================
                BUSINESS INFORMATION
            ================================================== */}

            <section className="border-t border-gray-200 pt-8">

              <h2 className="text-lg font-bold text-gray-900">
                Business Information
              </h2>

              <div className="mt-5 grid gap-5 md:grid-cols-2">

                <Field
                  label="Business Name"
                  name="businessName"
                  value={
                    formData.businessName
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

                <Field
                  label="Business Email"
                  type="email"
                  name="businessEmail"
                  value={
                    formData.businessEmail
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

                <Field
                  label="Business Phone"
                  type="tel"
                  name="businessPhone"
                  value={
                    formData.businessPhone
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

                <Field
                  label="Address"
                  name="address"
                  value={
                    formData.address
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              <Textarea
                label="Other Important Information"
                name="otherInformation"
                value={
                  formData.otherInformation
                }
                onChange={
                  handleChange
                }
              />

            </section>

            {/* ==================================================
                SUBMIT
            ================================================== */}

            <div className="flex justify-end border-t border-gray-200 pt-6">

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >

                <Send className="h-4 w-4" />

                {saving
                  ? 'Submitting...'
                  : 'Submit Application'}

              </button>

            </div>

          </form>

        </div>

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
  type = 'text',
  required = false,
  placeholder = '',
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
      />

    </div>
  )
}

// ============================================================
// TEXTAREA COMPONENT
// ============================================================

function Textarea({
  label,
  name,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="mt-5">

      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        required={required}
        className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
      />

    </div>
  )
}

export default SellerApplicant