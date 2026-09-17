import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
} from 'lucide-react'

import { useLanguage } from '../../context/LanguageContext'

function ResetPassword() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const { token } = useParams()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')

    const cleanPassword = password.trim()
    const cleanConfirmPassword = confirmPassword.trim()

    if (!token) {
      setError(t('invalidResetLink'))
      return
    }

    if (!cleanPassword) {
      setError(t('requiredField'))
      return
    }

    if (cleanPassword.length < 8) {
      setError(t('passwordMinLength'))
      return
    }

    if (!cleanConfirmPassword) {
      setError(t('requiredField'))
      return
    }

    if (cleanPassword !== cleanConfirmPassword) {
      setError(t('passwordsDoNotMatch'))
      return
    }

    setIsSubmitting(true)

    try {
      /*
        Backend password reset endpoint will be connected later.

        Example future request:

        POST /api/auth/reset-password/:token

        {
          password: cleanPassword
        }
      */

      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      )

      setIsSuccess(true)
    } catch (error) {
      console.error(
        'Reset password error:',
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

  if (isSuccess) {
    return (
      <section className="min-h-[calc(100vh-160px)] bg-gray-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-lg">
          <div className="rounded-3xl border border-gray-200 bg-white p-7 text-center shadow-sm sm:p-10">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
              {t('passwordResetSuccess')}
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              {t('passwordResetSuccessDescription')}
            </p>

            <Link
              to="/login"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('backToLogin')}
            </Link>
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
              {t('resetPasswordTitle')}
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-300">
              {t('resetPasswordDescription')}
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

              {/* NEW PASSWORD */}

              <div>
                <label
                  htmlFor="reset-password"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  {t('newPassword')}
                </label>

                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    id="reset-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value)
                      setError('')
                    }}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    disabled={isSubmitting}
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    disabled={isSubmitting}
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-900 disabled:cursor-not-allowed"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  {t('passwordMinLength')}
                </p>
              </div>

              {/* CONFIRM PASSWORD */}

              <div>
                <label
                  htmlFor="confirm-reset-password"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  {t('confirmNewPassword')}
                </label>

                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    id="confirm-reset-password"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? 'text'
                        : 'password'
                    }
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value)
                      setError('')
                    }}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    disabled={isSubmitting}
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) => !previous
                      )
                    }
                    disabled={isSubmitting}
                    aria-label={
                      showConfirmPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-900 disabled:cursor-not-allowed"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    {t('resetPasswordProcessing')}
                  </>
                ) : (
                  <>
                    <KeyRound className="h-4 w-4" />

                    {t('resetPassword')}
                  </>
                )}
              </button>
            </form>

            {/* BACK TO LOGIN */}

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

export default ResetPassword