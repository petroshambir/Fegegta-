
import React, { useEffect, useState } from 'react'
import {
  Save,
  Settings,
  Store,
  PackageCheck,
  ShieldCheck,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'

const API_URL =
  'https://fegegta-server.onrender.com/api'

const DEFAULT_SETTINGS = {
  platformName: 'Fegegta',
  currency: 'EUR',
  commissionRate: 10,
  allowSellerRegistration: true,
  requireProductApproval: true,
  requireSellerVerification: true,
}

function AdminSettings() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const [settings, setSettings] =
    useState(DEFAULT_SETTINGS)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // ============================================================
  // GET SETTINGS
  // ============================================================

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true)
        setError('')
        setMessage('')

        const token =
          localStorage.getItem('token')

        if (!token) {
          setError(
            'Admin authentication token was not found.'
          )
          return
        }

        const response = await fetch(
          `${API_URL}/admin/settings`,
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
              'Failed to load settings.'
          )
        }

        if (data.settings) {
          setSettings({
            platformName:
              data.settings.platformName ??
              DEFAULT_SETTINGS.platformName,

            currency:
              data.settings.currency ??
              DEFAULT_SETTINGS.currency,

            commissionRate:
              data.settings.commissionRate ??
              DEFAULT_SETTINGS.commissionRate,

            allowSellerRegistration:
              data.settings
                .allowSellerRegistration ??
              DEFAULT_SETTINGS.allowSellerRegistration,

            requireProductApproval:
              data.settings
                .requireProductApproval ??
              DEFAULT_SETTINGS.requireProductApproval,

            requireSellerVerification:
              data.settings
                .requireSellerVerification ??
              DEFAULT_SETTINGS.requireSellerVerification,
          })
        }
      } catch (error) {
        console.error(
          'Load settings error:',
          error
        )

        setError(
          error.message ||
            'Failed to load settings.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

  // ============================================================
  // UPDATE LOCAL STATE
  // ============================================================

  const update = (field, value) => {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }))

    setMessage('')
    setError('')
  }

  // ============================================================
  // SAVE SETTINGS
  // ============================================================

  const handleSave = async () => {
    try {
      setSaving(true)
      setMessage('')
      setError('')

      const token =
        localStorage.getItem('token')

      if (!token) {
        setError(
          'Admin authentication token was not found.'
        )
        return
      }

      // --------------------------------------------------------
      // Frontend validation
      // --------------------------------------------------------

      if (!settings.platformName.trim()) {
        setError(
          'Platform name is required.'
        )
        return
      }

      const commissionRate = Number(
        settings.commissionRate
      )

      if (
        Number.isNaN(commissionRate) ||
        commissionRate < 0 ||
        commissionRate > 100
      ) {
        setError(
          'Commission rate must be between 0 and 100.'
        )
        return
      }

      // --------------------------------------------------------
      // API REQUEST
      // --------------------------------------------------------

      const response = await fetch(
        `${API_URL}/admin/settings`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            platformName:
              settings.platformName.trim(),

            currency:
              settings.currency,

            commissionRate:
              commissionRate,

            allowSellerRegistration:
              settings.allowSellerRegistration,

            requireProductApproval:
              settings.requireProductApproval,

            requireSellerVerification:
              settings.requireSellerVerification,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Failed to save settings.'
        )
      }

      // --------------------------------------------------------
      // Update state with backend response
      // --------------------------------------------------------

      if (data.settings) {
        setSettings({
          platformName:
            data.settings.platformName ??
            DEFAULT_SETTINGS.platformName,

          currency:
            data.settings.currency ??
            DEFAULT_SETTINGS.currency,

          commissionRate:
            data.settings.commissionRate ??
            DEFAULT_SETTINGS.commissionRate,

          allowSellerRegistration:
            data.settings
              .allowSellerRegistration ??
            DEFAULT_SETTINGS.allowSellerRegistration,

          requireProductApproval:
            data.settings
              .requireProductApproval ??
            DEFAULT_SETTINGS.requireProductApproval,

          requireSellerVerification:
            data.settings
              .requireSellerVerification ??
            DEFAULT_SETTINGS.requireSellerVerification,
        })
      }

      setMessage(
        data.message ||
          'Settings saved successfully.'
      )

      setTimeout(() => {
        setMessage('')
      }, 3000)
    } catch (error) {
      console.error(
        'Save settings error:',
        error
      )

      setError(
        error.message ||
          'Failed to save settings.'
      )
    } finally {
      setSaving(false)
    }
  }

  // ============================================================
  // LOADING SCREEN
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar
          mobileOpen={mobileOpen}
          onClose={() =>
            setMobileOpen(false)
          }
        />

        <div className="lg:pl-72">
          <AdminHeader
            onMenuClick={() =>
              setMobileOpen(true)
            }
          />

          <main className="flex min-h-[70vh] items-center justify-center p-6">
            <div className="flex flex-col items-center gap-3 text-gray-500">
              <Loader2
                size={30}
                className="animate-spin"
              />

              <p className="text-sm">
                Loading settings...
              </p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  // ============================================================
  // MAIN UI
  // ============================================================

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onClose={() =>
          setMobileOpen(false)
        }
      />

      <div className="lg:pl-72">
        <AdminHeader
          onMenuClick={() =>
            setMobileOpen(true)
          }
        />

        <main className="p-4 sm:p-6 lg:p-8">
          {/* ====================================================
              PAGE HEADER
          ==================================================== */}

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Settings
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Configure the main Fegegta
              marketplace settings.
            </p>
          </div>

          {/* ====================================================
              ERROR MESSAGE
          ==================================================== */}

          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0"
              />

              <p>{error}</p>
            </div>
          )}

          {/* ====================================================
              SUCCESS MESSAGE
          ==================================================== */}

          {message && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0"
              />

              <p>{message}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* ==================================================
                GENERAL SETTINGS
            ================================================== */}

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
                {/* Platform Name */}

                <Field
                  label="Platform Name"
                  value={
                    settings.platformName
                  }
                  onChange={(value) =>
                    update(
                      'platformName',
                      value
                    )
                  }
                />

                {/* Currency */}

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Currency
                  </label>

                  <select
                    value={
                      settings.currency
                    }
                    onChange={(e) =>
                      update(
                        'currency',
                        e.target.value
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                  >
                    <option value="EUR">
                      EUR (€)
                    </option>

                    <option value="USD">
                      USD ($)
                    </option>
                  </select>
                </div>

                {/* Commission */}

                <Field
                  label="Commission Rate (%)"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={
                    settings.commissionRate
                  }
                  onChange={(value) =>
                    update(
                      'commissionRate',
                      value
                    )
                  }
                />
              </div>
            </section>

            {/* ==================================================
                SELLER SETTINGS
            ================================================== */}

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
                    Control how sellers join
                    and operate.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {/* Allow Seller Registration */}

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

                {/* Require Product Approval */}

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

                {/* Require Seller Verification */}

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

            {/* ==================================================
                SAVE BUTTON
            ================================================== */}

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition ${
                  saving
                    ? 'cursor-not-allowed bg-gray-400'
                    : 'bg-gray-900 hover:bg-black'
                }`}
              >
                {saving ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />

                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={17} />

                    Save Settings
                  </>
                )}
              </button>
            </div>
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
  value,
  onChange,
  type = 'text',
  min,
  max,
  step,
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
      />
    </div>
  )
}

// ============================================================
// TOGGLE COMPONENT
// ============================================================

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
        aria-pressed={checked}
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