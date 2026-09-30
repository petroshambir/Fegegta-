// import React, {
//   useEffect,
//   useState,
// } from 'react'
// import { Link } from 'react-router-dom'
// import {
//   Store,
//   Save,
//   ArrowLeft,
//   Image as ImageIcon,
//   Copy,
//   Share2,
//   CheckCircle2,
//   ShieldCheck,
// } from 'lucide-react'

// import { useAuth } from '../../context/AuthContext'

// import {
//   getSellerStore,
//   saveSellerStore,
//   createUniqueStoreSlug,
// } from '../../services/sellerStorage'

// function StoreProfile() {
//   const { user } = useAuth()

//   const [store, setStore] = useState(null)

//   const [formData, setFormData] =
//     useState({
//       storeName: '',
//       storeDescription: '',
//       storeCategory: '',
//       businessName: '',
//       businessEmail: '',
//       businessPhone: '',
//       sellerAddress: '',
//       logo: '',
//       coverImage: '',
//     })

//   const [saved, setSaved] = useState(false)
//   const [copied, setCopied] = useState(false)

//   useEffect(() => {
//     const savedStore =
//       getSellerStore()

//     setStore(savedStore)

//     setFormData({
//       storeName:
//         savedStore?.storeName ||
//         user?.storeName ||
//         '',

//       storeDescription:
//         savedStore?.storeDescription ||
//         user?.storeDescription ||
//         '',

//       storeCategory:
//         savedStore?.storeCategory ||
//         user?.storeCategory ||
//         '',

//       businessName:
//         savedStore?.businessName ||
//         user?.businessName ||
//         '',

//       businessEmail:
//         savedStore?.businessEmail ||
//         user?.businessEmail ||
//         user?.email ||
//         '',

//       businessPhone:
//         savedStore?.businessPhone ||
//         user?.businessPhone ||
//         user?.phone ||
//         '',

//       sellerAddress:
//         savedStore?.sellerAddress ||
//         user?.sellerAddress ||
//         '',

//       logo:
//         savedStore?.logo || '',

//       coverImage:
//         savedStore?.coverImage || '',
//     })
//   }, [user])

//   const slug =
//     store?.slug ||
//     createUniqueStoreSlug(
//       formData.storeName || 'my-store',
//       '',
//       store?.id || ''
//     )

//   const publicUrl =
//     `${window.location.origin}/store/${slug}`

//   const handleChange = (event) => {
//     const { name, value } =
//       event.target

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))

//     setSaved(false)
//   }

//   const handleImage = (
//     event,
//     field
//   ) => {
//     const file =
//       event.target.files?.[0]

//     if (!file) return

//     const imageUrl =
//       URL.createObjectURL(file)

//     setFormData((prev) => ({
//       ...prev,
//       [field]: imageUrl,
//     }))

//     setSaved(false)
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault()

//     const existingStore =
//       getSellerStore()

//     const storeId =
//       existingStore?.id ||
//       `store-${Date.now()}`

//     const persistentSlug =
//       existingStore?.slug ||
//       createUniqueStoreSlug(
//         formData.storeName,
//         '',
//         storeId
//       )

//     const updatedStore = {
//       ...existingStore,

//       ...formData,

//       id: storeId,

//       sellerId:
//         existingStore?.sellerId ||
//         user?.sellerId ||
//         user?.id ||
//         user?.userId ||
//         'demo-seller',

//       slug: persistentSlug,

//       // Seller cannot make himself verified.
//       verified:
//         existingStore?.verified === true,

//       verificationStatus:
//         existingStore?.verificationStatus ||
//         'pending',

//       status:
//         existingStore?.status ||
//         'approved',
//     }

//     const savedStore =
//       saveSellerStore(updatedStore)

//     setStore(savedStore)
//     setSaved(true)
//   }

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(
//         publicUrl
//       )

//       setCopied(true)

//       setTimeout(
//         () => setCopied(false),
//         2000
//       )
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: formData.storeName,
//           text: `Visit ${formData.storeName} on Fegegta`,
//           url: publicUrl,
//         })
//       } catch {
//         // cancelled
//       }
//     } else {
//       handleCopy()
//     }
//   }

//   const verified =
//     store?.verified === true

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-5xl">
//         <Link
//           to="/seller"
//           className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to Seller Dashboard
//         </Link>

//         <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
//           <div className="relative h-48 bg-gray-900 sm:h-64">
//             {formData.coverImage ? (
//               <img
//                 src={formData.coverImage}
//                 alt="Store cover"
//                 className="h-full w-full object-cover"
//               />
//             ) : (
//               <div className="flex h-full items-center justify-center text-gray-400">
//                 <ImageIcon className="h-12 w-12" />
//               </div>
//             )}
//           </div>

//           <div className="p-6 sm:p-8">
//             <div className="flex flex-col gap-5 border-b border-gray-200 pb-6 sm:flex-row sm:items-center">
//               <div className="-mt-16 flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-gray-100 shadow-sm">
//                 {formData.logo ? (
//                   <img
//                     src={formData.logo}
//                     alt="Store logo"
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <Store className="h-10 w-10 text-gray-400" />
//                 )}
//               </div>

//               <div className="flex-1">
//                 <div className="flex flex-wrap items-center gap-2">
//                   <h1 className="text-2xl font-bold text-gray-900">
//                     {formData.storeName ||
//                       'Your Store'}
//                   </h1>

//                   {verified && (
//                     <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
//                       <CheckCircle2 className="h-3.5 w-3.5" />
//                       Verified
//                     </span>
//                   )}
//                 </div>

//                 <p className="mt-1 text-sm text-gray-500">
//                   Manage your public store information.
//                 </p>
//               </div>
//             </div>

//             {saved && (
//               <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
//                 Store information saved successfully.
//               </div>
//             )}

//             <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">
//               <div className="flex items-start gap-3">
//                 <ShieldCheck className="mt-0.5 h-5 w-5 text-gray-700" />

//                 <div className="flex-1">
//                   <p className="font-semibold">
//                     Store Verification
//                   </p>

//                   <p className="mt-1 text-sm text-gray-500">
//                     {verified
//                       ? 'Your store is verified.'
//                       : 'Your store is waiting for admin verification.'}
//                   </p>
//                 </div>

//                 <span
//                   className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                     verified
//                       ? 'bg-green-100 text-green-700'
//                       : 'bg-yellow-100 text-yellow-700'
//                   }`}
//                 >
//                   {verified
//                     ? 'Verified'
//                     : 'Pending'}
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6 rounded-2xl border border-gray-200 p-5">
//               <p className="text-sm font-semibold">
//                 Public Store Link
//               </p>

//               <p className="mt-1 break-all text-sm text-gray-500">
//                 {publicUrl}
//               </p>

//               <div className="mt-4 flex flex-wrap gap-3">
//                 <button
//                   type="button"
//                   onClick={handleCopy}
//                   className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
//                 >
//                   <Copy className="h-4 w-4" />

//                   {copied
//                     ? 'Copied'
//                     : 'Copy Link'}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleShare}
//                   className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
//                 >
//                   <Share2 className="h-4 w-4" />
//                   Share Store
//                 </button>

//                 <Link
//                   to={`/store/${slug}`}
//                   className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
//                 >
//                   View Store
//                 </Link>
//               </div>
//             </div>

//             <form
//               onSubmit={handleSubmit}
//               className="mt-8 space-y-6"
//             >
//               <div>
//                 <label className="mb-2 block text-sm font-medium">
//                   Store Logo
//                 </label>

//                 <div className="flex flex-wrap items-center gap-4">
//                   <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border bg-gray-50">
//                     {formData.logo ? (
//                       <img
//                         src={formData.logo}
//                         alt="Logo"
//                         className="h-full w-full object-cover"
//                       />
//                     ) : (
//                       <ImageIcon className="h-7 w-7 text-gray-400" />
//                     )}
//                   </div>

//                   <label className="cursor-pointer rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
//                     Upload Logo

//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={(event) =>
//                         handleImage(
//                           event,
//                           'logo'
//                         )
//                       }
//                     />
//                   </label>
//                 </div>
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium">
//                   Store Cover
//                 </label>

//                 <label className="flex h-40 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed bg-gray-50">
//                   {formData.coverImage ? (
//                     <img
//                       src={formData.coverImage}
//                       alt="Cover"
//                       className="h-full w-full object-cover"
//                     />
//                   ) : (
//                     <div className="text-center">
//                       <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
//                       <p className="mt-2 text-sm text-gray-500">
//                         Upload Cover Image
//                       </p>
//                     </div>
//                   )}

//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={(event) =>
//                       handleImage(
//                         event,
//                         'coverImage'
//                       )
//                     }
//                   />
//                 </label>
//               </div>

//               <div className="grid gap-6 md:grid-cols-2">
//                 <Input
//                   label="Store Name"
//                   name="storeName"
//                   value={formData.storeName}
//                   onChange={handleChange}
//                   required
//                 />

//                 <div>
//                   <label className="mb-2 block text-sm font-medium">
//                     Store Category
//                   </label>

//                   <select
//                     name="storeCategory"
//                     value={formData.storeCategory}
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
//               />

//               <div className="border-t border-gray-200 pt-6">
//                 <h2 className="text-lg font-bold">
//                   Business Information
//                 </h2>

//                 <div className="mt-5 grid gap-6 md:grid-cols-2">
//                   <Input
//                     label="Business Name"
//                     name="businessName"
//                     value={formData.businessName}
//                     onChange={handleChange}
//                   />

//                   <Input
//                     label="Business Email"
//                     type="email"
//                     name="businessEmail"
//                     value={formData.businessEmail}
//                     onChange={handleChange}
//                   />

//                   <Input
//                     label="Business Phone"
//                     type="tel"
//                     name="businessPhone"
//                     value={formData.businessPhone}
//                     onChange={handleChange}
//                   />

//                   <Input
//                     label="Address"
//                     name="sellerAddress"
//                     value={formData.sellerAddress}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-end border-t border-gray-200 pt-6">
//                 <button
//                   type="submit"
//                   className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
//                 >
//                   <Save className="h-4 w-4" />
//                   Save Store
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
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
//       <label className="mb-2 block text-sm font-medium">
//         {label}
//       </label>

//       <input
//         {...props}
//         className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
//       />
//     </div>
//   )
// }

// function Textarea({
//   label,
//   ...props
// }) {
//   return (
//     <div>
//       <label className="mb-2 block text-sm font-medium">
//         {label}
//       </label>

//       <textarea
//         {...props}
//         rows={5}
//         className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
//       />
//     </div>
//   )
// }

// export default StoreProfile

import React, {
  useEffect,
  useState,
} from 'react'
import { Link } from 'react-router-dom'
import {
  Store,
  Save,
  ArrowLeft,
  Image as ImageIcon,
  Copy,
  Share2,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react'

import { useAuth } from '../../context/AuthContext'

import {
  getSellerStore,
  saveSellerStore,
  createUniqueStoreSlug,
} from '../../services/sellerStorage'

const API_URL = 'https://fegegta-server.onrender.com/api'

function StoreProfile() {
  const { user } = useAuth()

  const [store, setStore] = useState(null)

  const [formData, setFormData] =
    useState({
      storeName: '',
      storeDescription: '',
      storeCategory: '',
      businessName: '',
      businessEmail: '',
      businessPhone: '',
      sellerAddress: '',
      logo: '',
      coverImage: '',
    })

  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [imageFiles, setImageFiles] = useState({
    logo: null,
    coverImage: null,
  })

  useEffect(() => {
    let cancelled = false

    const loadStore = async () => {
      const localStore = getSellerStore()
      const token = localStorage.getItem('token')
      let backendStore = null

      if (token) {
        try {
          const response = await fetch(`${API_URL}/seller/store`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          })
          const data = await response.json()
          if (response.ok) {
            backendStore =
              data?.store || data?.data?.store || data?.data || data
          }
        } catch (loadError) {
          console.error('Could not load seller store from server:', loadError)
        }
      }

      if (cancelled) return

      const loadedStore = backendStore || localStore
      setStore(loadedStore)
      setFormData({
        storeName:
          loadedStore?.name || loadedStore?.storeName || localStore?.storeName || user?.storeName || '',
        storeDescription:
          loadedStore?.description || loadedStore?.storeDescription || localStore?.storeDescription || user?.storeDescription || '',
        storeCategory:
          loadedStore?.category || loadedStore?.storeCategory || localStore?.storeCategory || user?.storeCategory || '',
        businessName:
          localStore?.businessName || user?.businessName || '',
        businessEmail:
          localStore?.businessEmail || user?.businessEmail || user?.email || '',
        businessPhone:
          localStore?.businessPhone || user?.businessPhone || user?.phone || '',
        sellerAddress:
          localStore?.sellerAddress || user?.sellerAddress || '',
        logo:
          loadedStore?.logo || localStore?.logo || '',
        coverImage:
          loadedStore?.banner || loadedStore?.coverImage || localStore?.coverImage || '',
      })
    }

    loadStore()
    return () => {
      cancelled = true
    }
  }, [user])

  const slug =
    store?.slug ||
    createUniqueStoreSlug(
      formData.storeName || 'my-store',
      '',
      store?.id || ''
    )

  const publicUrl =
    `${window.location.origin}/store/${slug}`

  const handleChange = (event) => {
    const { name, value } =
      event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setSaved(false)
  }

  const handleImage = (
    event,
    field
  ) => {
    const file =
      event.target.files?.[0]

    if (!file) return

    const imageUrl =
      URL.createObjectURL(file)

    setImageFiles((previous) => ({
      ...previous,
      [field]: file,
    }))

    setFormData((prev) => ({
      ...prev,
      [field]: imageUrl,
    }))

    setSaved(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setSaving(true)
    setSaveError('')

    const existingStore =
      getSellerStore()

    const storeId =
      existingStore?.id ||
      `store-${Date.now()}`

    const persistentSlug =
      existingStore?.slug ||
      createUniqueStoreSlug(
        formData.storeName,
        '',
        storeId
      )

    const updatedStore = {
      ...existingStore,

      ...formData,

      id: store?.id || store?._id || storeId,

      sellerId:
        existingStore?.sellerId ||
        user?.sellerId ||
        user?.id ||
        user?.userId ||
        'demo-seller',

      slug: store?.slug || persistentSlug,

      // Seller cannot make himself verified.
      verified:
        existingStore?.verified === true,

      verificationStatus:
        existingStore?.verificationStatus ||
        'pending',

      status:
        existingStore?.status ||
        'approved',
    }

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Please sign in again before saving store settings.')
      }

      const payload = new FormData()
      payload.append('storeName', formData.storeName.trim())
      payload.append('storeDescription', formData.storeDescription || '')
      if (imageFiles.logo) payload.append('logo', imageFiles.logo)
      if (imageFiles.coverImage) payload.append('coverImage', imageFiles.coverImage)

      const response = await fetch(`${API_URL}/seller/store`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || 'Could not save store settings.')
      }

      const serverStore = data?.store || data?.data?.store || data?.data || data
      const savedStore = {
        ...updatedStore,
        ...serverStore,
        id: serverStore?._id || serverStore?.id || updatedStore.id,
        storeName: serverStore?.name || serverStore?.storeName || formData.storeName,
        storeDescription: serverStore?.description || serverStore?.storeDescription || formData.storeDescription,
        logo: serverStore?.logo || formData.logo,
        coverImage: serverStore?.banner || serverStore?.coverImage || formData.coverImage,
        slug: serverStore?.slug || updatedStore.slug,
      }

      saveSellerStore(savedStore)
      setStore(serverStore || savedStore)
      setFormData((previous) => ({
        ...previous,
        storeName: savedStore.storeName,
        storeDescription: savedStore.storeDescription,
        logo: savedStore.logo,
        coverImage: savedStore.coverImage,
      }))
      setImageFiles({ logo: null, coverImage: null })
      setSaved(true)
    } catch (saveError) {
      console.error('Store settings save failed:', saveError)
      setSaveError(saveError?.message || 'Could not save store settings.')
      setSaved(false)
    } finally {
      setSaving(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        publicUrl
      )

      setCopied(true)

      setTimeout(
        () => setCopied(false),
        2000
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: formData.storeName,
          text: `Visit ${formData.storeName} on Fegegta`,
          url: publicUrl,
        })
      } catch {
        // cancelled
      }
    } else {
      handleCopy()
    }
  }

  const verified =
    store?.verified === true

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/seller"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Seller Dashboard
        </Link>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="relative h-48 bg-gray-900 sm:h-64">
            {formData.coverImage ? (
              <img
                src={formData.coverImage}
                alt="Store cover"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                <ImageIcon className="h-12 w-12" />
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-5 border-b border-gray-200 pb-6 sm:flex-row sm:items-center">
              <div className="-mt-16 flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-gray-100 shadow-sm">
                {formData.logo ? (
                  <img
                    src={formData.logo}
                    alt="Store logo"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Store className="h-10 w-10 text-gray-400" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {formData.storeName ||
                      'Your Store'}
                  </h1>

                  {verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  Manage your public store information.
                </p>
              </div>
            </div>

            {saved && (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                Store information saved successfully.
              </div>
            )}

            {saveError && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {saveError}
              </div>
            )}

            <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-gray-700" />

                <div className="flex-1">
                  <p className="font-semibold">
                    Store Verification
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {verified
                      ? 'Your store is verified.'
                      : 'Your store is waiting for admin verification.'}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    verified
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {verified
                    ? 'Verified'
                    : 'Pending'}
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-gray-200 p-5">
              <p className="text-sm font-semibold">
                Public Store Link
              </p>

              <p className="mt-1 break-all text-sm text-gray-500">
                {publicUrl}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
                >
                  <Copy className="h-4 w-4" />

                  {copied
                    ? 'Copied'
                    : 'Copy Link'}
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  <Share2 className="h-4 w-4" />
                  Share Store
                </button>

                <Link
                  to={`/store/${slug}`}
                  className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
                >
                  View Store
                </Link>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Store Logo
                </label>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border bg-gray-50">
                    {formData.logo ? (
                      <img
                        src={formData.logo}
                        alt="Logo"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-7 w-7 text-gray-400" />
                    )}
                  </div>

                  <label className="cursor-pointer rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
                    Upload Logo

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) =>
                        handleImage(
                          event,
                          'logo'
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Store Cover
                </label>

                <label className="flex h-40 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed bg-gray-50">
                  {formData.coverImage ? (
                    <img
                      src={formData.coverImage}
                      alt="Cover"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Upload Cover Image
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) =>
                      handleImage(
                        event,
                        'coverImage'
                      )
                    }
                  />
                </label>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Input
                  label="Store Name"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  required
                />

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Store Category
                  </label>

                  <select
                    name="storeCategory"
                    value={formData.storeCategory}
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
              />

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-bold">
                  Business Information
                </h2>

                <div className="mt-5 grid gap-6 md:grid-cols-2">
                  <Input
                    label="Business Name"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                  />

                  <Input
                    label="Business Email"
                    type="email"
                    name="businessEmail"
                    value={formData.businessEmail}
                    onChange={handleChange}
                  />

                  <Input
                    label="Business Phone"
                    type="tel"
                    name="businessPhone"
                    value={formData.businessPhone}
                    onChange={handleChange}
                  />

                  <Input
                    label="Address"
                    name="sellerAddress"
                    value={formData.sellerAddress}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex justify-end border-t border-gray-200 pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'Saving...' : 'Save Store'}
                </button>
              </div>
            </form>
          </div>
        </div>
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
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
      />
    </div>
  )
}

function Textarea({
  label,
  ...props
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <textarea
        {...props}
        rows={5}
        className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
      />
    </div>
  )
}

export default StoreProfile
