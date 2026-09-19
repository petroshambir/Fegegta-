


import { useState } from 'react'

import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import {
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
} from 'lucide-react'

import { useLanguage } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'

function Login() {
  const { t } = useLanguage()
  const { login } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] =
    useState({
      email: '',
      password: '',
    })

  const [showPassword, setShowPassword] =
    useState(false)

  const [errors, setErrors] =
    useState({})

  const [serverMessage, setServerMessage] =
    useState('')

  const [isSubmitting, setIsSubmitting] =
    useState(false)

  // ============================================================
  // HANDLE INPUT
  // ============================================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }))

    setServerMessage('')
  }

  // ============================================================
  // VALIDATION
  // ============================================================

  const validateForm = () => {
    const newErrors = {}

    // ==========================================================
    // EMAIL
    // ==========================================================

    if (!formData.email.trim()) {
      newErrors.email =
        t('requiredField')
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email =
        t('invalidEmail')
    }

    // ==========================================================
    // PASSWORD
    // ==========================================================

    if (!formData.password) {
      newErrors.password =
        t('requiredField')
    }

    setErrors(newErrors)

    return (
      Object.keys(newErrors).length ===
      0
    )
  }

  // ============================================================
  // LOGIN
  // ============================================================

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault()

    setServerMessage('')

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const result =
        await login({
          email:
            formData.email
              .trim()
              .toLowerCase(),

          password:
            formData.password,
        })

      // ========================================================
      // LOGIN FAILED
      // ========================================================

      if (!result?.success) {
        setServerMessage(
          result?.message ||
            t('invalidLogin')
        )

        return
      }

      // ========================================================
      // LOGIN SUCCESS
      // ========================================================

      const user =
        result.user

      // ========================================================
      // ADMIN
      // ========================================================

      if (
        user?.role === 'admin'
      ) {
        navigate('/admin', {
          replace: true,
        })

        return
      }

      // ========================================================
      // SELLER
      // ========================================================

      if (
        user?.role === 'seller'
      ) {
        navigate('/seller', {
          replace: true,
        })

        return
      }

      // ========================================================
      // CUSTOMER
      // ========================================================

      if (
        user?.role === 'customer'
      ) {
        const from =
          location.state?.from ||
          '/account'

        navigate(from, {
          replace: true,
        })

        return
      }

      // ========================================================
      // FALLBACK
      // ========================================================

      navigate('/', {
        replace: true,
      })
    } catch (error) {
      console.error(
        'Login error:',
        error
      )

      setServerMessage(
        t('somethingWentWrong')
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="min-h-[calc(100vh-160px)] bg-gray-50 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:grid-cols-2">

          {/* ==================================================
              LEFT SIDE
          ================================================== */}

          <div className="hidden bg-black p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black">
                  <LogIn className="h-5 w-5" />
                </div>

                <span className="text-xl font-bold">
                  ፈገግታ
                </span>
              </div>

              <h1 className="mt-16 max-w-md text-4xl font-bold leading-tight xl:text-5xl">
                {t('welcomeBack')}
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-gray-300">
                {t('loginDescription')}
              </p>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-300">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-white" />

              <p className="leading-6">
                {t('securePurchase')}
              </p>
            </div>
          </div>

          {/* ==================================================
              RIGHT SIDE
          ================================================== */}

          <div className="p-6 sm:p-10 lg:p-12 xl:p-14">
            <div className="mx-auto max-w-md">

              {/* MOBILE ICON */}

              <div className="lg:hidden">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                  <LogIn className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4 text-center lg:mt-0 lg:text-left">
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {t('login')}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {t('loginDescription')}
                </p>
              </div>

              {/* SERVER ERROR */}

              {serverMessage && (
                <div
                  role="alert"
                  className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
                >
                  {serverMessage}
                </div>
              )}

              {/* LOGIN FORM */}

              <form
                onSubmit={
                  handleSubmit
                }
                className="mt-8 space-y-5"
              >

                {/* EMAIL */}

                <InputField
                  label={t('email')}
                  name="email"
                  type="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  error={
                    errors.email
                  }
                  icon={Mail}
                  placeholder="name@example.com"
                  disabled={
                    isSubmitting
                  }
                  autoComplete="email"
                />

                {/* PASSWORD */}

                <div>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-800"
                    >
                      {t('password')}
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-xs font-semibold text-gray-700 hover:text-black hover:underline"
                    >
                      {t('forgotPassword')}
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? 'text'
                          : 'password'
                      }
                      value={
                        formData.password
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        isSubmitting
                      }
                      autoComplete="current-password"
                      className={`w-full rounded-xl border bg-white py-3 pl-10 pr-11 text-sm text-gray-900 outline-none transition ${
                        errors.password
                          ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                          : 'border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-100'
                      } disabled:cursor-not-allowed disabled:bg-gray-50`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (previous) =>
                            !previous
                        )
                      }
                      disabled={
                        isSubmitting
                      }
                      aria-label={
                        showPassword
                          ? 'Hide password'
                          : 'Show password'
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {
                        errors.password
                      }
                    </p>
                  )}
                </div>

                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  disabled={
                    isSubmitting
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      {t('processing')}
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" />

                      {t('login')}
                    </>
                  )}
                </button>
              </form>

              {/* REGISTER */}

              <div className="mt-7 text-center text-sm text-gray-500">
                {t('dontHaveAccount')}{' '}

                <Link
                  to="/register"
                  className="font-semibold text-gray-900 hover:underline"
                >
                  {t('createAccount')}
                </Link>
              </div>

              {/* SELLER INFORMATION */}

              <div className="mt-7 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs leading-5 text-gray-500">
                  {t('sellerLoginNote')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// INPUT FIELD
// ============================================================

function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  icon: Icon,
  placeholder,
  disabled,
  autoComplete,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-800"
      >
        {label}
      </label>

      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={
            autoComplete
          }
          className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 ${
            error
              ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
              : 'border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-100'
          } disabled:cursor-not-allowed disabled:bg-gray-50`}
        />
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default Login