import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Save, User } from 'lucide-react'

import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'

function Profile() {
  const { user, saveUser } = useAuth()
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    email: user?.email || '',
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setSaved(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    saveUser({
      ...user,
      ...formData,
      fullName: `${formData.firstName} ${formData.lastName}`.trim(),
    })

    setSaved(true)
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        <Link
          to="/account"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={17} />
          {t('backToAccount') || 'Back to Account'}
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('profile') || 'Profile'}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {t('profileDescription') ||
              'Manage your personal information.'}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-white">
              <User size={24} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                {t('personalInformation') ||
                  'Personal Information'}
              </h2>

              <p className="text-sm text-gray-500">
                {t('updateYourInformation') ||
                  'Update your account information below.'}
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            <Input
              label={t('firstName') || 'First Name'}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <Input
              label={t('lastName') || 'Last Name'}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />

            <Input
              label={t('phoneNumber') || 'Phone Number'}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <Input
              label={t('email') || 'Email'}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          {saved && (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {t('profileUpdated') ||
                'Your profile has been updated successfully.'}
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <Save size={17} />
              {t('saveChanges') || 'Save Changes'}
            </button>
          </div>
        </form>

      </div>
    </section>
  )
}

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