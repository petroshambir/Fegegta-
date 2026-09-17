import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  Plus,
  Trash2,
  Edit3,
} from 'lucide-react'

import { useLanguage } from '../../context/LanguageContext'

function Addresses() {
  const { t } = useLanguage()

  const [addresses, setAddresses] = useState([])

  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newAddress = {
      id: Date.now(),
      ...formData,
    }

    setAddresses((previous) => [
      ...previous,
      newAddress,
    ])

    setFormData({
      fullName: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    })

    setShowForm(false)
  }

  const removeAddress = (id) => {
    setAddresses((previous) =>
      previous.filter((address) => address.id !== id)
    )
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        <Link
          to="/account"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={17} />
          {t('backToAccount') || 'Back to Account'}
        </Link>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('addresses') || 'Addresses'}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {t('addressesDescription') ||
                'Manage your delivery addresses.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm((value) => !value)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            <Plus size={17} />
            {t('addAddress') || 'Add Address'}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <h2 className="mb-6 text-xl font-semibold text-gray-900">
              {t('newAddress') || 'New Address'}
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">

              <Input
                label={t('fullName') || 'Full Name'}
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />

              <Input
                label={t('phoneNumber') || 'Phone Number'}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <Input
                label={t('address') || 'Address'}
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />

              <Input
                label={t('city') || 'City'}
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />

              <Input
                label={t('postalCode') || 'Postal Code'}
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />

              <Input
                label={t('country') || 'Country'}
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />

            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {t('cancel') || 'Cancel'}
              </button>

              <button
                type="submit"
                className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
              >
                {t('saveAddress') || 'Save Address'}
              </button>
            </div>
          </form>
        )}

        {addresses.length === 0 && !showForm ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <MapPin size={28} className="text-gray-500" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              {t('noAddresses') || 'No addresses saved'}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {t('noAddressesDescription') ||
                'Add a delivery address to make checkout faster.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                      <MapPin size={19} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {address.fullName}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        {address.address}
                        <br />
                        {address.city} {address.postalCode}
                        <br />
                        {address.country}
                        <br />
                        {address.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <Edit3 size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => removeAddress(address.id)}
                      className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

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
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
      />
    </div>
  )
}

export default Addresses