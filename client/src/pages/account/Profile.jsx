// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { ArrowLeft, Save, User } from 'lucide-react'

// import { useAuth } from '../../context/AuthContext'
// import { useLanguage } from '../../context/LanguageContext'

// function Profile() {
//   const { user, saveUser } = useAuth()
//   const { t } = useLanguage()

//   const [formData, setFormData] = useState({
//     firstName: user?.firstName || '',
//     lastName: user?.lastName || '',
//     phone: user?.phone || '',
//     email: user?.email || '',
//   })

//   const [saved, setSaved] = useState(false)

//   const handleChange = (event) => {
//     const { name, value } = event.target

//     setFormData((previous) => ({
//       ...previous,
//       [name]: value,
//     }))

//     setSaved(false)
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault()

//     saveUser({
//       ...user,
//       ...formData,
//       fullName: `${formData.firstName} ${formData.lastName}`.trim(),
//     })

//     setSaved(true)
//   }

//   return (
//     <section className="min-h-screen bg-gray-50">
//       <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

//         <Link
//           to="/account"
//           className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
//         >
//           <ArrowLeft size={17} />
//           {t('backToAccount') || 'Back to Account'}
//         </Link>

//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">
//             {t('profile') || 'Profile'}
//           </h1>

//           <p className="mt-2 text-sm text-gray-500">
//             {t('profileDescription') ||
//               'Manage your personal information.'}
//           </p>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
//         >
//           <div className="mb-8 flex items-center gap-4">
//             <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-white">
//               <User size={24} />
//             </div>

//             <div>
//               <h2 className="font-semibold text-gray-900">
//                 {t('personalInformation') ||
//                   'Personal Information'}
//               </h2>

//               <p className="text-sm text-gray-500">
//                 {t('updateYourInformation') ||
//                   'Update your account information below.'}
//               </p>
//             </div>
//           </div>

//           <div className="grid gap-5 sm:grid-cols-2">

//             <Input
//               label={t('firstName') || 'First Name'}
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               required
//             />

//             <Input
//               label={t('lastName') || 'Last Name'}
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               required
//             />

//             <Input
//               label={t('phoneNumber') || 'Phone Number'}
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//             />

//             <Input
//               label={t('email') || 'Email'}
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />

//           </div>

//           {saved && (
//             <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
//               {t('profileUpdated') ||
//                 'Your profile has been updated successfully.'}
//             </div>
//           )}

//           <div className="mt-8 flex justify-end">
//             <button
//               type="submit"
//               className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
//             >
//               <Save size={17} />
//               {t('saveChanges') || 'Save Changes'}
//             </button>
//           </div>
//         </form>

//       </div>
//     </section>
//   )
// }

// function Input({
//   label,
//   name,
//   type = 'text',
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
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         required={required}
//         className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
//       />
//     </div>
//   )
// }

// export default Profile

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Save,
  User,
  Loader2,
  AlertCircle,
} from 'lucide-react'

import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'

const API_URL =
  'https://fegegta-server.onrender.com/api'

function Profile() {
  const {
    user,
    saveUser,
    getToken,
    isAuthenticated,
  } = useAuth()

  const { t } = useLanguage()

  const [formData, setFormData] =
    useState({
      firstName:
        user?.firstName || '',
      lastName:
        user?.lastName || '',
      phone:
        user?.phone || '',
      email:
        user?.email || '',
    })

  const [isSaving, setIsSaving] =
    useState(false)

  const [saved, setSaved] =
    useState(false)

  const [error, setError] =
    useState('')

  // ============================================================
  // KEEP FORM IN SYNC WITH AUTH USER
  // ============================================================

  useEffect(() => {
    if (!user) return

    setFormData({
      firstName:
        user.firstName || '',
      lastName:
        user.lastName || '',
      phone:
        user.phone || '',
      email:
        user.email || '',
    })
  }, [user])

  // ============================================================
  // INPUT CHANGE
  // ============================================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    )

    setSaved(false)
    setError('')
  }

  // ============================================================
  // SAVE PROFILE
  // ============================================================

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault()

    setSaved(false)
    setError('')
    setIsSaving(true)

    try {
      const token =
        getToken?.()

      if (!token) {
        throw new Error(
          t('loginRequired') ||
            'Please login to update your profile.'
        )
      }

      const firstName =
        formData.firstName.trim()

      const lastName =
        formData.lastName.trim()

      const email =
        formData.email
          .trim()
          .toLowerCase()

      const phone =
        formData.phone.trim()

      if (
        !firstName ||
        !lastName ||
        !email
      ) {
        throw new Error(
          t('requiredFields') ||
            'First name, last name, and email are required.'
        )
      }

      const response =
        await fetch(
          `${API_URL}/auth/profile`,
          {
            method: 'PUT',
            headers: {
              'Content-Type':
                'application/json',
              Authorization:
                `Bearer ${token}`,
            },
            body: JSON.stringify({
              firstName,
              lastName,
              email,
              phone,
            }),
          }
        )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Failed to update profile.'
        )
      }

      if (!data.user) {
        throw new Error(
          'Updated user information was not returned by the server.'
        )
      }

      // Update AuthContext + localStorage
      saveUser(data.user)

      // Update form using server response
      setFormData({
        firstName:
          data.user.firstName ||
          '',
        lastName:
          data.user.lastName ||
          '',
        phone:
          data.user.phone ||
          '',
        email:
          data.user.email ||
          '',
      })

      setSaved(true)
    } catch (error) {
      console.error(
        'Profile update error:',
        error
      )

      setError(
        error.message ||
          'Unable to update your profile.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  // ============================================================
  // LOGIN REQUIRED
  // ============================================================

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

          <Link
            to="/account"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={17} />

            {t('backToAccount') ||
              'Back to Account'}
          </Link>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">

            <AlertCircle
              size={42}
              className="mx-auto text-gray-400"
            />

            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              {t('loginRequired') ||
                'Login Required'}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {t('loginToEditProfile') ||
                'Please login to manage your profile.'}
            </p>

            <Link
              to="/login"
              className="mt-6 inline-flex items-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              {t('login') ||
                'Login'}
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
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* ======================================================
            BACK
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

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('profile') ||
              'Profile'}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {t('profileDescription') ||
              'Manage your personal information.'}
          </p>
        </div>

        {/* ======================================================
            FORM
        ====================================================== */}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >

          {/* ====================================================
              PROFILE HEADER
          ==================================================== */}

          <div className="mb-8 flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-white">
              <User size={24} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                {t(
                  'personalInformation'
                ) ||
                  'Personal Information'}
              </h2>

              <p className="text-sm text-gray-500">
                {t(
                  'updateYourInformation'
                ) ||
                  'Update your account information below.'}
              </p>
            </div>

          </div>

          {/* ====================================================
              FORM FIELDS
          ==================================================== */}

          <div className="grid gap-5 sm:grid-cols-2">

            <Input
              label={
                t('firstName') ||
                'First Name'
              }
              name="firstName"
              value={
                formData.firstName
              }
              onChange={
                handleChange
              }
              required
            />

            <Input
              label={
                t('lastName') ||
                'Last Name'
              }
              name="lastName"
              value={
                formData.lastName
              }
              onChange={
                handleChange
              }
              required
            />

            <Input
              label={
                t('phoneNumber') ||
                'Phone Number'
              }
              name="phone"
              value={
                formData.phone
              }
              onChange={
                handleChange
              }
            />

            <Input
              label={
                t('email') ||
                'Email'
              }
              name="email"
              type="email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          {/* ====================================================
              ERROR
          ==================================================== */}

          {error && (
            <div className="mt-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0"
              />

              <span>
                {error}
              </span>

            </div>
          )}

          {/* ====================================================
              SUCCESS
          ==================================================== */}

          {saved && (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {t(
                'profileUpdated'
              ) ||
                'Your profile has been updated successfully.'}
            </div>
          )}

          {/* ====================================================
              SAVE BUTTON
          ==================================================== */}

          <div className="mt-8 flex justify-end">

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {isSaving ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />

                  {t('saving') ||
                    'Saving...'}
                </>
              ) : (
                <>
                  <Save size={17} />

                  {t('saveChanges') ||
                    'Save Changes'}
                </>
              )}

            </button>

          </div>

        </form>

      </div>
    </section>
  )
}

// ============================================================
// INPUT
// ============================================================

function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
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
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
      />
    </div>
  )
}

export default Profile