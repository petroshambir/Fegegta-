import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Bell,
  Globe,
  Lock,
  Save,
} from 'lucide-react'

import { useLanguage } from '../../context/LanguageContext'

function Settings() {
  const { language, setLanguage, t } = useLanguage()

  const [notifications, setNotifications] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = (event) => {
    event.preventDefault()
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2500)
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
            {t('accountSettings') || 'Account Settings'}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {t('accountSettingsDescription') ||
              'Manage your account preferences.'}
          </p>
        </div>

        <form
          onSubmit={handleSave}
          className="space-y-6"
        >

          {/* Language */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                <Globe size={20} />
              </div>

              <div className="flex-1">
                <h2 className="font-semibold text-gray-900">
                  {t('language') || 'Language'}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {t('chooseLanguage') ||
                    'Choose your preferred language.'}
                </p>

                <select
                  value={language}
                  onChange={(event) =>
                    setLanguage(event.target.value)
                  }
                  className="mt-4 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900 sm:max-w-sm"
                >
                  <option value="en">English</option>
                  <option value="ti">ትግርኛ</option>
                  <option value="am">አማርኛ</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                <Bell size={20} />
              </div>

              <div className="flex-1">
                <h2 className="font-semibold text-gray-900">
                  {t('notifications') || 'Notifications'}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {t('notificationDescription') ||
                    'Receive important updates about your orders and account.'}
                </p>

                <label className="mt-5 flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(event) =>
                      setNotifications(event.target.checked)
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    {t('enableNotifications') ||
                      'Enable notifications'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                <Lock size={20} />
              </div>

              <div className="flex-1">
                <h2 className="font-semibold text-gray-900">
                  {t('security') || 'Security'}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {t('securityDescription') ||
                    'Manage your password and account security.'}
                </p>

                <Link
                  to="/forgot-password"
                  className="mt-4 inline-flex rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  {t('changePassword') ||
                    'Change Password'}
                </Link>
              </div>
            </div>
          </div>

          {saved && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {t('settingsSaved') ||
                'Your settings have been saved.'}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
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

export default Settings
