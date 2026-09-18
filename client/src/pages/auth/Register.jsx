// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import {
//   Eye,
//   EyeOff,
//   Lock,
//   Mail,
//   Phone,
//   User,
//   UserPlus,
// } from 'lucide-react'

// import { useLanguage } from '../../context/LanguageContext'
// import { useAuth } from '../../context/AuthContext'

// function Register() {
//   const { t } = useLanguage()
//   const { register } = useAuth()

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//   })

//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] =
//     useState(false)

//   const [errors, setErrors] = useState({})
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [serverMessage, setServerMessage] = useState('')

//   // ============================================================
//   // HANDLE INPUT
//   // ============================================================

//   const handleChange = (event) => {
//     const { name, value } = event.target

//     setFormData((previous) => ({
//       ...previous,
//       [name]: value,
//     }))

//     setErrors((previous) => ({
//       ...previous,
//       [name]: '',
//     }))

//     setServerMessage('')
//   }

//   // ============================================================
//   // VALIDATION
//   // ============================================================

//   const validateForm = () => {
//     const newErrors = {}

//     if (!formData.firstName.trim()) {
//       newErrors.firstName = t('requiredField')
//     }

//     if (!formData.lastName.trim()) {
//       newErrors.lastName = t('requiredField')
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = t('requiredField')
//     } else if (
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
//         formData.email.trim()
//       )
//     ) {
//       newErrors.email = t('invalidEmail')
//     }

//     if (!formData.phone.trim()) {
//       newErrors.phone = t('requiredField')
//     }

//     if (!formData.password) {
//       newErrors.password = t('requiredField')
//     } else if (formData.password.length < 8) {
//       newErrors.password = t('passwordMinLength')
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = t('requiredField')
//     } else if (
//       formData.password !== formData.confirmPassword
//     ) {
//       newErrors.confirmPassword =
//         t('passwordsDoNotMatch')
//     }

//     setErrors(newErrors)

//     return Object.keys(newErrors).length === 0
//   }

//   // ============================================================
//   // SUBMIT
//   // ============================================================

//   const handleSubmit = async (event) => {
//     event.preventDefault()

//     setServerMessage('')

//     if (!validateForm()) {
//       return
//     }

//     setIsSubmitting(true)

//     try {
//       const result = await register({
//         firstName: formData.firstName.trim(),
//         lastName: formData.lastName.trim(),
//         email: formData.email.trim().toLowerCase(),
//         phone: formData.phone.trim(),
//         password: formData.password,
//       })

//       if (!result?.success) {
//         setServerMessage(
//           result?.message ||
//             t('registrationNotAvailable')
//         )
//       }
//     } catch (error) {
//       console.error('Registration error:', error)

//       setServerMessage(
//         t('somethingWentWrong')
//       )
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <section className="min-h-[calc(100vh-160px)] bg-gray-50 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
//       <div className="mx-auto max-w-6xl">
//         <div className="grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:grid-cols-2">

//           {/* ==================================================
//               LEFT SIDE
//           ================================================== */}

//           <div className="hidden bg-black p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
//             <div>
//               <div className="flex items-center gap-3">
//                 <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black">
//                   <UserPlus className="h-5 w-5" />
//                 </div>

//                 <span className="text-xl font-bold">
//                   ፈገግታ
//                 </span>
//               </div>

//               <h1 className="mt-16 max-w-md text-4xl font-bold leading-tight xl:text-5xl">
//                 {t('createYourAccount')}
//               </h1>

//               <p className="mt-5 max-w-md text-sm leading-7 text-gray-300">
//                 {t('createAccountDescription')}
//               </p>
//             </div>

//             <div className="space-y-4 text-sm text-gray-300">
//               <Benefit text={t('securePurchase')} />
//               <Benefit text={t('marketplace')} />
//               <Benefit text={t('orderTracking')} />
//             </div>
//           </div>

//           {/* ==================================================
//               RIGHT SIDE
//           ================================================== */}

//           <div className="p-6 sm:p-10 lg:p-12 xl:p-14">
//             <div className="mx-auto max-w-md">

//               <div className="lg:hidden">
//                 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
//                   <UserPlus className="h-5 w-5" />
//                 </div>
//               </div>

//               <div className="mt-4 text-center lg:mt-0 lg:text-left">
//                 <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
//                   {t('register')}
//                 </h2>

//                 <p className="mt-2 text-sm text-gray-500">
//                   {t('createAccountDescription')}
//                 </p>
//               </div>

//               {serverMessage && (
//                 <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//                   {serverMessage}
//                 </div>
//               )}

//               <form
//                 onSubmit={handleSubmit}
//                 className="mt-8 space-y-5"
//               >

//                 {/* FIRST / LAST NAME */}

//                 <div className="grid gap-5 sm:grid-cols-2">
//                   <InputField
//                     label={t('firstName')}
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     error={errors.firstName}
//                     icon={User}
//                     placeholder={t('firstName')}
//                     disabled={isSubmitting}
//                   />

//                   <InputField
//                     label={t('lastName')}
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     error={errors.lastName}
//                     icon={User}
//                     placeholder={t('lastName')}
//                     disabled={isSubmitting}
//                   />
//                 </div>

//                 {/* EMAIL */}

//                 <InputField
//                   label={t('email')}
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   error={errors.email}
//                   icon={Mail}
//                   placeholder="name@example.com"
//                   disabled={isSubmitting}
//                   autoComplete="email"
//                 />

//                 {/* PHONE */}

//                 <InputField
//                   label={t('phone')}
//                   name="phone"
//                   type="tel"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   error={errors.phone}
//                   icon={Phone}
//                   placeholder="+31 6 12345678"
//                   disabled={isSubmitting}
//                   autoComplete="tel"
//                 />

//                 {/* PASSWORD */}

//                 <PasswordField
//                   label={t('password')}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   error={errors.password}
//                   visible={showPassword}
//                   onToggle={() =>
//                     setShowPassword(
//                       (previous) => !previous
//                     )
//                   }
//                   disabled={isSubmitting}
//                   autoComplete="new-password"
//                 />

//                 {/* CONFIRM PASSWORD */}

//                 <PasswordField
//                   label={t('confirmPassword')}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   error={errors.confirmPassword}
//                   visible={showConfirmPassword}
//                   onToggle={() =>
//                     setShowConfirmPassword(
//                       (previous) => !previous
//                     )
//                   }
//                   disabled={isSubmitting}
//                   autoComplete="new-password"
//                 />

//                 {/* SUBMIT */}

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
//                       {t('processing')}
//                     </>
//                   ) : (
//                     <>
//                       <UserPlus className="h-4 w-4" />
//                       {t('createAccount')}
//                     </>
//                   )}
//                 </button>
//               </form>

//               {/* LOGIN LINK */}

//               <div className="mt-7 text-center text-sm text-gray-500">
//                 {t('alreadyHaveAccount')}{' '}
//                 <Link
//                   to="/login"
//                   className="font-semibold text-gray-900 hover:underline"
//                 >
//                   {t('login')}
//                 </Link>
//               </div>

//               {/* SELLER NOTE */}

//               <div className="mt-7 rounded-2xl border border-gray-200 bg-gray-50 p-4">
//                 <p className="text-xs leading-5 text-gray-500">
//                   {t('sellerRegistrationNote')}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// // ============================================================
// // INPUT FIELD
// // ============================================================

// function InputField({
//   label,
//   name,
//   type = 'text',
//   value,
//   onChange,
//   error,
//   icon: Icon,
//   placeholder,
//   disabled,
//   autoComplete,
// }) {
//   return (
//     <div>
//       <label
//         htmlFor={name}
//         className="mb-2 block text-sm font-medium text-gray-800"
//       >
//         {label}
//       </label>

//       <div className="relative">
//         <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

//         <input
//           id={name}
//           name={name}
//           type={type}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           disabled={disabled}
//           autoComplete={autoComplete}
//           className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
//             error
//               ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
//               : 'border-gray-200 focus:border-gray-900 focus:ring-gray-100'
//           } disabled:cursor-not-allowed disabled:bg-gray-50`}
//         />
//       </div>

//       {error && (
//         <p className="mt-1.5 text-xs text-red-600">
//           {error}
//         </p>
//       )}
//     </div>
//   )
// }

// // ============================================================
// // PASSWORD FIELD
// // ============================================================

// function PasswordField({
//   label,
//   name,
//   value,
//   onChange,
//   error,
//   visible,
//   onToggle,
//   disabled,
//   autoComplete,
// }) {
//   return (
//     <div>
//       <label
//         htmlFor={name}
//         className="mb-2 block text-sm font-medium text-gray-800"
//       >
//         {label}
//       </label>

//       <div className="relative">
//         <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

//         <input
//           id={name}
//           name={name}
//           type={visible ? 'text' : 'password'}
//           value={value}
//           onChange={onChange}
//           disabled={disabled}
//           autoComplete={autoComplete}
//           className={`w-full rounded-xl border bg-white py-3 pl-10 pr-11 text-sm text-gray-900 outline-none transition ${
//             error
//               ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
//               : 'border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-100'
//           } disabled:cursor-not-allowed disabled:bg-gray-50`}
//         />

//         <button
//           type="button"
//           onClick={onToggle}
//           disabled={disabled}
//           aria-label={
//             visible
//               ? 'Hide password'
//               : 'Show password'
//           }
//           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
//         >
//           {visible ? (
//             <EyeOff className="h-4 w-4" />
//           ) : (
//             <Eye className="h-4 w-4" />
//           )}
//         </button>
//       </div>

//       {error && (
//         <p className="mt-1.5 text-xs text-red-600">
//           {error}
//         </p>
//       )}

//       {name === 'password' && !error && (
//         <p className="mt-1.5 text-xs text-gray-400">
//           {tPasswordHint()}
//         </p>
//       )}
//     </div>
//   )
// }

// // ============================================================
// // BENEFIT
// // ============================================================

// function Benefit({ text }) {
//   return (
//     <div className="flex items-center gap-3">
//       <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
//         <span className="h-2 w-2 rounded-full bg-white" />
//       </div>

//       <span>{text}</span>
//     </div>
//   )
// }

// // ============================================================
// // TEMP PASSWORD HINT
// // ============================================================

// function tPasswordHint() {
//   return 'Use at least 8 characters.'
// }

// export default Register

import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
  UserPlus,
} from 'lucide-react'

import { useLanguage } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'

function Register() {
  const { t } = useLanguage()
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] =
    useState(false)

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [errors, setErrors] = useState({})

  const [isSubmitting, setIsSubmitting] =
    useState(false)

  const [serverMessage, setServerMessage] =
    useState('')

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

    // ----------------------------------------------------------
    // FIRST NAME
    // ----------------------------------------------------------

    if (!formData.firstName.trim()) {
      newErrors.firstName =
        t('requiredField')
    }

    // ----------------------------------------------------------
    // LAST NAME
    // ----------------------------------------------------------

    if (!formData.lastName.trim()) {
      newErrors.lastName =
        t('requiredField')
    }

    // ----------------------------------------------------------
    // EMAIL
    // ----------------------------------------------------------

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

    // ----------------------------------------------------------
    // PHONE
    // ----------------------------------------------------------

    if (!formData.phone.trim()) {
      newErrors.phone =
        t('requiredField')
    }

    // ----------------------------------------------------------
    // PASSWORD
    // ----------------------------------------------------------

    if (!formData.password) {
      newErrors.password =
        t('requiredField')
    } else if (
      formData.password.length < 8
    ) {
      newErrors.password =
        t('passwordMinLength')
    }

    // ----------------------------------------------------------
    // CONFIRM PASSWORD
    // ----------------------------------------------------------

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        t('requiredField')
    } else if (
      formData.password !==
      formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        t('passwordsDoNotMatch')
    }

    setErrors(newErrors)

    return (
      Object.keys(newErrors).length === 0
    )
  }

  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async (event) => {
    event.preventDefault()

    setServerMessage('')

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const result =
        await register({
          firstName:
            formData.firstName.trim(),

          lastName:
            formData.lastName.trim(),

          email:
            formData.email
              .trim()
              .toLowerCase(),

          phone:
            formData.phone.trim(),

          password:
            formData.password,
        })

      // --------------------------------------------------------
      // REGISTRATION FAILED
      // --------------------------------------------------------

      if (!result?.success) {
        setServerMessage(
          result?.message ||
            t('registrationNotAvailable')
        )

        return
      }

      // --------------------------------------------------------
      // REGISTRATION SUCCESSFUL
      // --------------------------------------------------------

      /*
        AuthContext already saves:
        - token
        - user

        So the user is already authenticated.
      */

      if (result.user) {
        navigate('/')
      }
    } catch (error) {
      console.error(
        'Registration error:',
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
                  <UserPlus className="h-5 w-5" />
                </div>

                <span className="text-xl font-bold">
                  ፈገግታ
                </span>
              </div>

              <h1 className="mt-16 max-w-md text-4xl font-bold leading-tight xl:text-5xl">
                {t('createYourAccount')}
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-gray-300">
                {t('createAccountDescription')}
              </p>
            </div>

            <div className="space-y-4 text-sm text-gray-300">
              <Benefit
                text={t('securePurchase')}
              />

              <Benefit
                text={t('marketplace')}
              />

              <Benefit
                text={t('orderTracking')}
              />
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
                  <UserPlus className="h-5 w-5" />
                </div>
              </div>

              {/* HEADER */}

              <div className="mt-4 text-center lg:mt-0 lg:text-left">
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {t('register')}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {t('createAccountDescription')}
                </p>
              </div>

              {/* SERVER ERROR */}

              {serverMessage && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {serverMessage}
                </div>
              )}

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {/* FIRST / LAST NAME */}

                <div className="grid gap-5 sm:grid-cols-2">

                  <InputField
                    label={t('firstName')}
                    name="firstName"
                    value={
                      formData.firstName
                    }
                    onChange={handleChange}
                    error={
                      errors.firstName
                    }
                    icon={User}
                    placeholder={
                      t('firstName')
                    }
                    disabled={
                      isSubmitting
                    }
                    autoComplete="given-name"
                  />

                  <InputField
                    label={t('lastName')}
                    name="lastName"
                    value={
                      formData.lastName
                    }
                    onChange={handleChange}
                    error={
                      errors.lastName
                    }
                    icon={User}
                    placeholder={
                      t('lastName')
                    }
                    disabled={
                      isSubmitting
                    }
                    autoComplete="family-name"
                  />

                </div>

                {/* EMAIL */}

                <InputField
                  label={t('email')}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  icon={Mail}
                  placeholder="name@example.com"
                  disabled={isSubmitting}
                  autoComplete="email"
                />

                {/* PHONE */}

                <InputField
                  label={t('phone')}
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  icon={Phone}
                  placeholder="+31 6 12345678"
                  disabled={isSubmitting}
                  autoComplete="tel"
                />

                {/* PASSWORD */}

                <PasswordField
                  label={t('password')}
                  name="password"
                  value={
                    formData.password
                  }
                  onChange={handleChange}
                  error={
                    errors.password
                  }
                  visible={
                    showPassword
                  }
                  onToggle={() =>
                    setShowPassword(
                      (previous) =>
                        !previous
                    )
                  }
                  disabled={
                    isSubmitting
                  }
                  autoComplete="new-password"
                  hint={t(
                    'passwordMinLength'
                  )}
                />

                {/* CONFIRM PASSWORD */}

                <PasswordField
                  label={t(
                    'confirmPassword'
                  )}
                  name="confirmPassword"
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                  error={
                    errors.confirmPassword
                  }
                  visible={
                    showConfirmPassword
                  }
                  onToggle={() =>
                    setShowConfirmPassword(
                      (previous) =>
                        !previous
                    )
                  }
                  disabled={
                    isSubmitting
                  }
                  autoComplete="new-password"
                />

                {/* SUBMIT */}

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
                      <UserPlus className="h-4 w-4" />

                      {t('createAccount')}
                    </>
                  )}
                </button>

              </form>

              {/* LOGIN LINK */}

              <div className="mt-7 text-center text-sm text-gray-500">
                {t('alreadyHaveAccount')}{' '}

                <Link
                  to="/login"
                  className="font-semibold text-gray-900 hover:underline"
                >
                  {t('login')}
                </Link>
              </div>

              {/* SELLER NOTE */}

              <div className="mt-7 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs leading-5 text-gray-500">
                  {t(
                    'sellerRegistrationNote'
                  )}
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
          autoComplete={autoComplete}
          className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
            error
              ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
              : 'border-gray-200 focus:border-gray-900 focus:ring-gray-100'
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

// ============================================================
// PASSWORD FIELD
// ============================================================

function PasswordField({
  label,
  name,
  value,
  onChange,
  error,
  visible,
  onToggle,
  disabled,
  autoComplete,
  hint,
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

        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        <input
          id={name}
          name={name}
          type={
            visible
              ? 'text'
              : 'password'
          }
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`w-full rounded-xl border bg-white py-3 pl-10 pr-11 text-sm text-gray-900 outline-none transition ${
            error
              ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
              : 'border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-100'
          } disabled:cursor-not-allowed disabled:bg-gray-50`}
        />

        <button
          type="button"
          onClick={onToggle}
          disabled={disabled}
          aria-label={
            visible
              ? 'Hide password'
              : 'Show password'
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>

      </div>

      {error && (
        <p className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}

      {name === 'password' &&
        !error &&
        hint && (
          <p className="mt-1.5 text-xs text-gray-400">
            {hint}
          </p>
        )}

    </div>
  )
}

// ============================================================
// BENEFIT
// ============================================================

function Benefit({ text }) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
        <span className="h-2 w-2 rounded-full bg-white" />
      </div>

      <span>{text}</span>

    </div>
  )
}

export default Register