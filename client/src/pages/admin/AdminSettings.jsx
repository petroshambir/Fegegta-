import React, { useEffect, useState } from 'react'
import {
  Save,
  Settings,
  Store,
  PackageCheck,
  ShieldCheck,
} from 'lucide-react'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import {
  getAdminSettings,
  saveAdminSettings,
} from '../../utils/adminStorage'

function AdminSettings() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [settings, setSettings] = useState({
    platformName: 'Fegegta',
    currency: 'EUR',
    commissionRate: 10,
    allowSellerRegistration: true,
    requireProductApproval: true,
    requireSellerVerification: true,
  })

  const [message, setMessage] = useState('')

  useEffect(() => {
    setSettings(getAdminSettings())
  }, [])

  const update = (field, value) => {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleSave = () => {
    saveAdminSettings(settings)

    setMessage('Settings saved successfully.')

    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="lg:pl-72">
        <AdminHeader
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Settings
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Configure the main Fegegta marketplace settings.
            </p>
          </div>

          <div className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gray-100 p-3">
                  <Settings size={21} />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    General Settings
                  </h2>

                  <p className="text-sm text-gray-500">
                    Basic platform information.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field
                  label="Platform Name"
                  value={settings.platformName}
                  onChange={(value) =>
                    update(
                      'platformName',
                      value
                    )
                  }
                />

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Currency
                  </label>

                  <select
                    value={settings.currency}
                    onChange={(e) =>
                      update(
                        'currency',
                        e.target.value
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none"
                  >
                    <option value="EUR">
                      EUR (€)
                    </option>

                    <option value="USD">
                      USD ($)
                    </option>
                  </select>
                </div>

                <Field
                  label="Commission Rate (%)"
                  type="number"
                  value={settings.commissionRate}
                  onChange={(value) =>
                    update(
                      'commissionRate',
                      Number(value)
                    )
                  }
                />
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gray-100 p-3">
                  <Store size={21} />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Seller Settings
                  </h2>

                  <p className="text-sm text-gray-500">
                    Control how sellers join and operate.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <Toggle
                  icon={Store}
                  title="Allow Seller Registration"
                  description="Allow new sellers to submit applications."
                  checked={
                    settings.allowSellerRegistration
                  }
                  onChange={(value) =>
                    update(
                      'allowSellerRegistration',
                      value
                    )
                  }
                />

                <Toggle
                  icon={PackageCheck}
                  title="Require Product Approval"
                  description="Seller products must be approved before becoming public."
                  checked={
                    settings.requireProductApproval
                  }
                  onChange={(value) =>
                    update(
                      'requireProductApproval',
                      value
                    )
                  }
                />

                <Toggle
                  icon={ShieldCheck}
                  title="Require Seller Verification"
                  description="Seller stores require admin verification."
                  checked={
                    settings.requireSellerVerification
                  }
                  onChange={(value) =>
                    update(
                      'requireSellerVerification',
                      value
                    )
                  }
                />
              </div>
            </section>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-black"
              >
                <Save size={17} />
                Save Settings
              </button>

              {message && (
                <p className="text-sm text-gray-600">
                  {message}
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
      />
    </div>
  )
}

function Toggle({
  icon: Icon,
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-gray-100 p-2">
          <Icon size={18} />
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-900">
            {title}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          checked
            ? 'bg-gray-900'
            : 'bg-gray-300'
        }`}
        aria-label={title}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            checked
              ? 'left-6'
              : 'left-1'
          }`}
        />
      </button>
    </div>
  )
}

export default AdminSettings