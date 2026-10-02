// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import {
//   ArrowLeft,
//   MapPin,
//   Plus,
//   Trash2,
//   Edit3,
// } from 'lucide-react'

// import { useLanguage } from '../../context/LanguageContext'

// function Addresses() {
//   const { t } = useLanguage()

//   const [addresses, setAddresses] = useState([])

//   const [showForm, setShowForm] = useState(false)

//   const [formData, setFormData] = useState({
//     fullName: '',
//     phone: '',
//     address: '',
//     city: '',
//     postalCode: '',
//     country: '',
//   })

//   const handleChange = (event) => {
//     const { name, value } = event.target

//     setFormData((previous) => ({
//       ...previous,
//       [name]: value,
//     }))
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault()

//     const newAddress = {
//       id: Date.now(),
//       ...formData,
//     }

//     setAddresses((previous) => [
//       ...previous,
//       newAddress,
//     ])

//     setFormData({
//       fullName: '',
//       phone: '',
//       address: '',
//       city: '',
//       postalCode: '',
//       country: '',
//     })

//     setShowForm(false)
//   }

//   const removeAddress = (id) => {
//     setAddresses((previous) =>
//       previous.filter((address) => address.id !== id)
//     )
//   }

//   return (
//     <section className="min-h-screen bg-gray-50">
//       <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

//         <Link
//           to="/account"
//           className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
//         >
//           <ArrowLeft size={17} />
//           {t('backToAccount') || 'Back to Account'}
//         </Link>

//         <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">
//               {t('addresses') || 'Addresses'}
//             </h1>

//             <p className="mt-2 text-sm text-gray-500">
//               {t('addressesDescription') ||
//                 'Manage your delivery addresses.'}
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={() => setShowForm((value) => !value)}
//             className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
//           >
//             <Plus size={17} />
//             {t('addAddress') || 'Add Address'}
//           </button>
//         </div>

//         {showForm && (
//           <form
//             onSubmit={handleSubmit}
//             className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
//           >
//             <h2 className="mb-6 text-xl font-semibold text-gray-900">
//               {t('newAddress') || 'New Address'}
//             </h2>

//             <div className="grid gap-5 sm:grid-cols-2">

//               <Input
//                 label={t('fullName') || 'Full Name'}
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 required
//               />

//               <Input
//                 label={t('phoneNumber') || 'Phone Number'}
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//               />

//               <Input
//                 label={t('address') || 'Address'}
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//               />

//               <Input
//                 label={t('city') || 'City'}
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 required
//               />

//               <Input
//                 label={t('postalCode') || 'Postal Code'}
//                 name="postalCode"
//                 value={formData.postalCode}
//                 onChange={handleChange}
//               />

//               <Input
//                 label={t('country') || 'Country'}
//                 name="country"
//                 value={formData.country}
//                 onChange={handleChange}
//                 required
//               />

//             </div>

//             <div className="mt-6 flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => setShowForm(false)}
//                 className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 {t('cancel') || 'Cancel'}
//               </button>

//               <button
//                 type="submit"
//                 className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
//               >
//                 {t('saveAddress') || 'Save Address'}
//               </button>
//             </div>
//           </form>
//         )}

//         {addresses.length === 0 && !showForm ? (
//           <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
//             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
//               <MapPin size={28} className="text-gray-500" />
//             </div>

//             <h2 className="mt-5 text-xl font-semibold text-gray-900">
//               {t('noAddresses') || 'No addresses saved'}
//             </h2>

//             <p className="mt-2 text-sm text-gray-500">
//               {t('noAddressesDescription') ||
//                 'Add a delivery address to make checkout faster.'}
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-5 md:grid-cols-2">
//             {addresses.map((address) => (
//               <div
//                 key={address.id}
//                 className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
//               >
//                 <div className="flex items-start justify-between gap-4">
//                   <div className="flex items-start gap-3">
//                     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
//                       <MapPin size={19} />
//                     </div>

//                     <div>
//                       <h3 className="font-semibold text-gray-900">
//                         {address.fullName}
//                       </h3>

//                       <p className="mt-2 text-sm leading-6 text-gray-500">
//                         {address.address}
//                         <br />
//                         {address.city} {address.postalCode}
//                         <br />
//                         {address.country}
//                         <br />
//                         {address.phone}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex gap-2">
//                     <button
//                       type="button"
//                       className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
//                     >
//                       <Edit3 size={17} />
//                     </button>

//                     <button
//                       type="button"
//                       onClick={() => removeAddress(address.id)}
//                       className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
//                     >
//                       <Trash2 size={17} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//       </div>
//     </section>
//   )
// }

// function Input({
//   label,
//   name,
//   value,
//   onChange,
//   required = false,
// }) {
//   return (
//     <div>
//       <label className="mb-2 block text-sm font-medium text-gray-700">
//         {label}
//       </label>

//       <input
//         type="text"
//         name={name}
//         value={value}
//         onChange={onChange}
//         required={required}
//         className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
//       />
//     </div>
//   )
// }

// export default Addresses

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  Plus,
  Trash2,
  Edit3,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

import { useLanguage } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'

const API_URL = 'https://fegegta-server.onrender.com/api'

const EMPTY_FORM = {
  fullName: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
}

function Addresses() {
  const { t } = useLanguage()
  const { getToken, isAuthenticated } = useAuth()

  const [addresses, setAddresses] = useState([])

  const [showForm, setShowForm] = useState(false)

  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState(EMPTY_FORM)

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // ============================================================
  // LOAD ADDRESSES
  // ============================================================

  const loadAddresses = async () => {
    try {
      setIsLoading(true)
      setError('')

      const token = getToken?.()

      if (!token) {
        setAddresses([])
        setError(
          t('loginRequired') ||
            'Please login to manage your addresses.'
        )
        return
      }

      const response = await fetch(
        `${API_URL}/addresses`,
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
          data.message ||
            'Failed to load addresses.'
        )
      }

      setAddresses(
        Array.isArray(data.addresses)
          ? data.addresses
          : []
      )
    } catch (error) {
      console.error(
        'Load addresses error:',
        error
      )

      setError(
        error.message ||
          'Unable to load addresses. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  // ============================================================
  // LOAD ON PAGE OPEN
  // ============================================================

  useEffect(() => {
    if (isAuthenticated) {
      loadAddresses()
    } else {
      setIsLoading(false)
    }
  }, [isAuthenticated])

  // ============================================================
  // FORM CHANGE
  // ============================================================

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setError('')
    setSuccessMessage('')
  }

  // ============================================================
  // OPEN ADD FORM
  // ============================================================

  const openAddForm = () => {
    setEditingId(null)
    setFormData(EMPTY_FORM)
    setShowForm(true)
    setError('')
    setSuccessMessage('')
  }

  // ============================================================
  // OPEN EDIT FORM
  // ============================================================

  const handleEdit = (address) => {
    setEditingId(address._id || address.id)

    setFormData({
      fullName: address.fullName || '',
      phone: address.phone || '',
      address: address.address || '',
      city: address.city || '',
      postalCode: address.postalCode || '',
      country: address.country || '',
    })

    setShowForm(true)

    setError('')
    setSuccessMessage('')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // ============================================================
  // CLOSE FORM
  // ============================================================

  const closeForm = () => {
    if (isSaving) return

    setShowForm(false)
    setEditingId(null)
    setFormData(EMPTY_FORM)

    setError('')
    setSuccessMessage('')
  }

  // ============================================================
  // SUBMIT FORM
  // ============================================================

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setIsSaving(true)
      setError('')
      setSuccessMessage('')

      const token = getToken?.()

      if (!token) {
        setError(
          t('loginRequired') ||
            'Please login to manage your addresses.'
        )
        return
      }

      const cleanedData = {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        postalCode:
          formData.postalCode.trim(),
        country: formData.country.trim(),
      }

      if (
        !cleanedData.fullName ||
        !cleanedData.phone ||
        !cleanedData.address ||
        !cleanedData.city ||
        !cleanedData.country
      ) {
        setError(
          t('requiredFields') ||
            'Please fill in all required fields.'
        )
        return
      }

      const isEditing = Boolean(editingId)

      const url = isEditing
        ? `${API_URL}/addresses/${editingId}`
        : `${API_URL}/addresses`

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(cleanedData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
            (isEditing
              ? 'Failed to update address.'
              : 'Failed to save address.')
        )
      }

      // ========================================================
      // UPDATE LOCAL UI
      // ========================================================

      if (isEditing) {
        const updatedAddress =
          data.address

        setAddresses((previous) =>
          previous.map((address) =>
            (address._id || address.id) ===
            editingId
              ? updatedAddress
              : address
          )
        )

        setSuccessMessage(
          data.message ||
            t('addressUpdated') ||
            'Address updated successfully.'
        )
      } else {
        const newAddress =
          data.address

        setAddresses((previous) => [
          newAddress,
          ...previous,
        ])

        setSuccessMessage(
          data.message ||
            t('addressSaved') ||
            'Address saved successfully.'
        )
      }

      setFormData(EMPTY_FORM)
      setEditingId(null)
      setShowForm(false)
    } catch (error) {
      console.error(
        'Save address error:',
        error
      )

      setError(
        error.message ||
          'Unable to save address. Please try again.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  // ============================================================
  // DELETE ADDRESS
  // ============================================================

  const removeAddress = async (id) => {
    const confirmed = window.confirm(
      t('confirmDeleteAddress') ||
        'Are you sure you want to delete this address?'
    )

    if (!confirmed) return

    try {
      setDeletingId(id)
      setError('')
      setSuccessMessage('')

      const token = getToken?.()

      if (!token) {
        setError(
          t('loginRequired') ||
            'Please login to manage your addresses.'
        )
        return
      }

      const response = await fetch(
        `${API_URL}/addresses/${id}`,
        {
          method: 'DELETE',

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Failed to delete address.'
        )
      }

      setAddresses((previous) =>
        previous.filter(
          (address) =>
            (address._id || address.id) !== id
        )
      )

      setSuccessMessage(
        data.message ||
          t('addressDeleted') ||
          'Address deleted successfully.'
      )
    } catch (error) {
      console.error(
        'Delete address error:',
        error
      )

      setError(
        error.message ||
          'Unable to delete address. Please try again.'
      )
    } finally {
      setDeletingId(null)
    }
  }

  // ============================================================
  // NOT AUTHENTICATED
  // ============================================================

  if (!isAuthenticated && !isLoading) {
    return (
      <section className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

          <Link
            to="/account"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={17} />

            {t('backToAccount') ||
              'Back to Account'}
          </Link>

          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <MapPin
                size={28}
                className="text-gray-500"
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              {t('loginRequired') ||
                'Login Required'}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {t('loginToManageAddresses') ||
                'Please login to manage your delivery addresses.'}
            </p>

            <Link
              to="/login"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              {t('login') || 'Login'}
            </Link>
          </div>
        </div>
      </section>
    )
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* ======================================================
            BACK TO ACCOUNT
        ====================================================== */}

        <Link
          to="/account"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={17} />

          {t('backToAccount') ||
            'Back to Account'}
        </Link>

        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('addresses') ||
                'Addresses'}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {t('addressesDescription') ||
                'Manage your delivery addresses.'}
            </p>
          </div>

          <button
            type="button"
            onClick={
              showForm
                ? closeForm
                : openAddForm
            }
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {showForm ? (
              <X size={17} />
            ) : (
              <Plus size={17} />
            )}

            {showForm
              ? t('close') || 'Close'
              : t('addAddress') ||
                'Add Address'}
          </button>
        </div>

        {/* ======================================================
            SUCCESS MESSAGE
        ====================================================== */}

        {successMessage && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">

            <CheckCircle
              size={19}
              className="mt-0.5 shrink-0"
            />

            <p>{successMessage}</p>
          </div>
        )}

        {/* ======================================================
            ERROR MESSAGE
        ====================================================== */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0"
            />

            <p>{error}</p>
          </div>
        )}

        {/* ======================================================
            ADD / EDIT FORM
        ====================================================== */}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <h2 className="mb-6 text-xl font-semibold text-gray-900">
              {editingId
                ? t('editAddress') ||
                  'Edit Address'
                : t('newAddress') ||
                  'New Address'}
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">

              <Input
                label={
                  t('fullName') ||
                  'Full Name'
                }
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />

              <Input
                label={
                  t('phoneNumber') ||
                  'Phone Number'
                }
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <Input
                label={
                  t('address') ||
                  'Address'
                }
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />

              <Input
                label={
                  t('city') ||
                  'City'
                }
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />

              <Input
                label={
                  t('postalCode') ||
                  'Postal Code'
                }
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />

              <Input
                label={
                  t('country') ||
                  'Country'
                }
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />

            </div>

            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                onClick={closeForm}
                disabled={isSaving}
                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {t('cancel') ||
                  'Cancel'}
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving && (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                )}

                {isSaving
                  ? editingId
                    ? t('updating') ||
                      'Updating...'
                    : t('saving') ||
                      'Saving...'
                  : editingId
                    ? t('updateAddress') ||
                      'Update Address'
                    : t('saveAddress') ||
                      'Save Address'}
              </button>

            </div>
          </form>
        )}

        {/* ======================================================
            LOADING
        ====================================================== */}

        {isLoading ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

            <Loader2
              size={32}
              className="mx-auto animate-spin text-gray-600"
            />

            <p className="mt-4 text-sm text-gray-500">
              {t('loading') ||
                'Loading...'}
            </p>
          </div>
        ) : addresses.length === 0 &&
          !showForm ? (

          /* ====================================================
             EMPTY STATE
          ==================================================== */

          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <MapPin
                size={28}
                className="text-gray-500"
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              {t('noAddresses') ||
                'No addresses saved'}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {t('noAddressesDescription') ||
                'Add a delivery address to make checkout faster.'}
            </p>

            <button
              type="button"
              onClick={openAddForm}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              <Plus size={17} />

              {t('addAddress') ||
                'Add Address'}
            </button>
          </div>

        ) : (

          /* ====================================================
             ADDRESS LIST
          ==================================================== */

          <div className="grid gap-5 md:grid-cols-2">

            {addresses.map((address) => {
              const addressId =
                address._id ||
                address.id

              return (
                <div
                  key={addressId}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                        <MapPin size={19} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {address.fullName}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                          {address.address}
                          <br />

                          {address.city}

                          {address.postalCode && (
                            <>
                              {' '}
                              {address.postalCode}
                            </>
                          )}

                          <br />

                          {address.country}

                          <br />

                          {address.phone}
                        </p>
                      </div>
                    </div>

                    {/* ==========================================
                        ACTIONS
                    ========================================== */}

                    <div className="flex shrink-0 gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(address)
                        }
                        disabled={
                          deletingId ===
                          addressId
                        }
                        aria-label={
                          t('editAddress') ||
                          'Edit Address'
                        }
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Edit3 size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          removeAddress(
                            addressId
                          )
                        }
                        disabled={
                          deletingId ===
                          addressId
                        }
                        aria-label={
                          t('deleteAddress') ||
                          'Delete Address'
                        }
                        className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId ===
                        addressId ? (
                          <Loader2
                            size={17}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2
                            size={17}
                          />
                        )}
                      </button>

                    </div>
                  </div>
                </div>
              )
            })}

          </div>
        )}

      </div>
    </section>
  )
}


// ============================================================
// INPUT COMPONENT
// ============================================================

function Input({
  label,
  name,
  value,
  onChange,
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={
          name === 'fullName'
            ? 'name'
            : name === 'phone'
              ? 'tel'
              : name === 'address'
                ? 'street-address'
                : name === 'city'
                  ? 'address-level2'
                  : name === 'postalCode'
                    ? 'postal-code'
                    : name === 'country'
                      ? 'country-name'
                      : 'off'
        }
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
      />
    </div>
  )
}

export default Addresses