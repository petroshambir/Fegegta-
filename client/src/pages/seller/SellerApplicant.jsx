// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import {
//   ArrowLeft,
//   Send,
//   Store,
// } from 'lucide-react'

// import { useAuth } from '../../context/AuthContext'
// import {
//   getSellerApplication,
//   saveSellerApplication,
// } from '../../services/sellerStorage'

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

//   useEffect(() => {
//     const application =
//       getSellerApplication()

//     if (application) {
//       setFormData({
//         storeName:
//           application.storeName || '',
//         storeDescription:
//           application.storeDescription || '',
//         productType:
//           application.productType || '',
//         productCategory:
//           application.productCategory || '',
//         productDescription:
//           application.productDescription || '',
//         productQuality:
//           application.productQuality || '',
//         businessName:
//           application.businessName || '',
//         businessEmail:
//           application.businessEmail ||
//           user?.email ||
//           '',
//         businessPhone:
//           application.businessPhone ||
//           user?.phone ||
//           '',
//         address:
//           application.address || '',
//         otherInformation:
//           application.otherInformation || '',
//       })
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         businessEmail:
//           user?.email || '',
//         businessPhone:
//           user?.phone || '',
//       }))
//     }
//   }, [user])

//   const handleChange = (event) => {
//     const { name, value } = event.target

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))

//     setError('')
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault()

//     setError('')

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
//         !String(formData[field]).trim()
//     )

//     if (missing) {
//       setError(
//         'Please complete all required fields.'
//       )
//       return
//     }

//     const emailValid =
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
//         formData.businessEmail
//       )

//     if (!emailValid) {
//       setError(
//         'Please enter a valid business email.'
//       )
//       return
//     }

//     setSaving(true)

//     const existing =
//       getSellerApplication()

//     saveSellerApplication({
//       ...(existing || {}),
//       ...formData,
//       sellerId:
//         user?.sellerId ||
//         user?.id ||
//         user?.userId ||
//         'demo-seller',
//       sellerStatus: 'pending',
//       rejectionReason: '',
//       submittedAt:
//         existing?.submittedAt ||
//         new Date().toISOString(),
//     })

//     setTimeout(() => {
//       navigate(
//         '/seller/application-status'
//       )
//     }, 300)
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
//               <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
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
//                     value={formData.productCategory}
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
//                 value={formData.storeDescription}
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
//                   value={formData.productQuality}
//                   onChange={handleChange}
//                   required
//                   placeholder="Example: Premium / Handmade"
//                 />
//               </div>

//               <Textarea
//                 label="Product Description"
//                 name="productDescription"
//                 value={formData.productDescription}
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
//                   value={formData.businessEmail}
//                   onChange={handleChange}
//                   required
//                 />

//                 <Field
//                   label="Business Phone"
//                   type="tel"
//                   name="businessPhone"
//                   value={formData.businessPhone}
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
//                 value={formData.otherInformation}
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

const API_URL =
  'https://fegegta-server.onrender.com/api'

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
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setError('')
  }

  // ============================================================
  // SUBMIT APPLICATION
  // ============================================================

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')

    // ----------------------------------------------------------
    // REQUIRED FIELDS
    // ----------------------------------------------------------

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

    const missing = requiredFields.find(
      (field) =>
        !String(formData[field] || '').trim()
    )

    if (missing) {
      setError(
        'Please complete all required fields.'
      )
      return
    }

    // ----------------------------------------------------------
    // EMAIL VALIDATION
    // ----------------------------------------------------------

    const emailValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.businessEmail.trim()
      )

    if (!emailValid) {
      setError(
        'Please enter a valid business email.'
      )
      return
    }

    // ----------------------------------------------------------
    // AUTH TOKEN
    // ----------------------------------------------------------

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
      // CURRENT BACKEND SUPPORTS THESE FIELDS:
      //
      // businessName
      // phone
      // email
      // address
      // description
      // documents
      //
      // The current Seller model does not have separate fields
      // for storeName/productType/productCategory/etc.
      //
      // We keep the existing backend untouched and include
      // those details inside description.
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

      const response = await fetch(
        `${API_URL}/seller-applications`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
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

            description:
              combinedDescription,

            documents: {},
          }),
        }
      )

      const data =
        await response.json()

      // ========================================================
      // HANDLE AUTH ERROR
      // ========================================================

      if (response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        setError(
          'Your session has expired. Please login again.'
        )

        return
      }

      // ========================================================
      // HANDLE DUPLICATE APPLICATION
      // ========================================================

      if (response.status === 409) {
        setError(
          data?.message ||
            'You already have a seller application.'
        )

        return
      }

      // ========================================================
      // HANDLE OTHER ERRORS
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

      navigate(
        '/seller/application-status'
      )
    } catch (error) {
      console.error(
        'Seller application error:',
        error
      )

      setError(
        error.message ||
          'Something went wrong while submitting your application.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
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

          <form
            onSubmit={handleSubmit}
            className="space-y-8 p-6 sm:p-10"
          >
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 whitespace-pre-line">
                {error}
              </div>
            )}

            <section>
              <h2 className="text-lg font-bold text-gray-900">
                Store Information
              </h2>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <Field
                  label="Store Name"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  required
                />

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Product Category
                  </label>

                  <select
                    name="productCategory"
                    value={formData.productCategory}
                    onChange={handleChange}
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
                value={formData.storeDescription}
                onChange={handleChange}
                required
              />
            </section>

            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-lg font-bold text-gray-900">
                Product Information
              </h2>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <Field
                  label="What type of products do you want to sell?"
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                  required
                />

                <Field
                  label="Product Quality"
                  name="productQuality"
                  value={formData.productQuality}
                  onChange={handleChange}
                  required
                  placeholder="Example: Premium / Handmade"
                />
              </div>

              <Textarea
                label="Product Description"
                name="productDescription"
                value={formData.productDescription}
                onChange={handleChange}
                required
              />
            </section>

            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-lg font-bold text-gray-900">
                Business Information
              </h2>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <Field
                  label="Business Name"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                />

                <Field
                  label="Business Email"
                  type="email"
                  name="businessEmail"
                  value={formData.businessEmail}
                  onChange={handleChange}
                  required
                />

                <Field
                  label="Business Phone"
                  type="tel"
                  name="businessPhone"
                  value={formData.businessPhone}
                  onChange={handleChange}
                  required
                />

                <Field
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <Textarea
                label="Other Important Information"
                name="otherInformation"
                value={formData.otherInformation}
                onChange={handleChange}
              />
            </section>

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