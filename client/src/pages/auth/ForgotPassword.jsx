import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  Mail,
  Send,
} from 'lucide-react'

import { useLanguage } from '../../context/LanguageContext'

function ForgotPassword() {
  const { t } = useLanguage()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)

  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setIsSent(false)

    const cleanEmail = email.trim().toLowerCase()

    if (!cleanEmail) {
      setError(t('requiredField'))
      return
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      setError(t('invalidEmail'))
      return
    }

    setIsSubmitting(true)

    try {
      /*
        Backend password-reset endpoint will be connected later.

        Example future request:

        POST /api/auth/forgot-password

        {
          email: cleanEmail
        }
      */

      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      )

      setIsSent(true)
    } catch (error) {
      console.error(
        'Forgot password error:',
        error
      )

      setError(t('somethingWentWrong'))
    } finally {
      setIsSubmitting(false)
    }
  }

  // ============================================================
  // SUCCESS STATE
  // ============================================================

  if (isSent) {
    return (
      <section className="min-h-[calc(100vh-160px)] bg-gray-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-lg">
          <div className="rounded-3xl border border-gray-200 bg-white p-7 text-center shadow-sm sm:p-10">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
              {t('resetEmailSent')}
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              {t('resetEmailSentDescription')}
            </p>

            <div className="mt-6 rounded-2xl bg-gray-50 p-4">
              <p className="break-all text-sm font-semibold text-gray-900">
                {email}
              </p>
            </div>

            <p className="mt-5 text-xs leading-5 text-gray-400">
              {t('resetEmailCheckSpam')}
            </p>

            <Link
              to="/login"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('backToLogin')}
            </Link>

            <button
              type="button"
              onClick={() => {
                setIsSent(false)
                setEmail('')
              }}
              className="mt-4 text-sm font-semibold text-gray-700 hover:text-black hover:underline"
            >
              {t('tryAnotherEmail')}
            </button>
          </div>
        </div>
      </section>
    )
  }

  // ============================================================
  // FORM
  // ============================================================

  return (
    <section className="min-h-[calc(100vh-160px)] bg-gray-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-lg">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

          {/* HEADER */}

          <div className="bg-black px-6 py-10 text-center text-white sm:px-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black">
              <KeyRound className="h-6 w-6" />
            </div>

            <h1 className="mt-5 text-2xl font-bold sm:text-3xl">
              {t('forgotPassword')}
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-300">
              {t('forgotPasswordDescription')}
            </p>
          </div>

          {/* FORM */}

          <div className="p-6 sm:p-10">

            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="reset-email"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  {t('email')}
                </label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    id="reset-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value)
                      setError('')
                    }}
                    placeholder="name@example.com"
                    autoComplete="email"
                    disabled={isSubmitting}
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    {t('processing')}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />

                    {t('sendResetLink')}
                  </>
                )}
              </button>
            </form>

            <div className="mt-7 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-black hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                {t('backToLogin')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword