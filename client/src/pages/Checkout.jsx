
import { useMemo, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import {
  ArrowLeft,
  Check,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  MapPin,
  Package,
  Ruler,
  ShieldCheck,
  Truck,
} from 'lucide-react'

import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

const API_URL = 'https://fegegta-server.onrender.com/api'

/* ============================================================
   CHECKOUT
============================================================ */

function Checkout() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const { user, getToken } = useAuth()

  const {
    cartItems,
    subtotal,
    shipping,
    clearCart,
  } = useCart()

  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  })

  const [shippingMethod, setShippingMethod] =
    useState('standard')

  const [paymentMethod, setPaymentMethod] =
    useState('card')

  const [cardData, setCardData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  })

  const [sizeData, setSizeData] = useState(() => {
    const initialData = {}

    cartItems.forEach((item) => {
      initialData[getItemKey(item)] =
        item.sizeData ||
        createDefaultSizeData(item)
    })

    return initialData
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] =
    useState(false)

  /* ============================================================
     SHIPPING
  ============================================================ */

  const shippingPrice = useMemo(() => {
    if (!cartItems.length) {
      return 0
    }

    if (shippingMethod === 'express') {
      return 25
    }

    return Number(shipping || 0)
  }, [
    cartItems.length,
    shipping,
    shippingMethod,
  ])

  const finalTotal =
    Number(subtotal || 0) +
    Number(shippingPrice || 0)

  /* ============================================================
     FORM HANDLERS
  ============================================================ */

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
      submit: '',
    }))
  }

  const handleCardChange = (event) => {
    const {
      name,
      value,
    } = event.target

    setCardData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setErrors((previous) => ({
      ...previous,
      [name]: '',
      submit: '',
    }))
  }

  const updateSizeData = (
    item,
    updates,
  ) => {
    const key = getItemKey(item)

    setSizeData((previous) => ({
      ...previous,
      [key]: {
        ...(previous[key] ||
          createDefaultSizeData(item)),
        ...updates,
      },
    }))

    setErrors((previous) => ({
      ...previous,
      [`size-${key}`]: '',
    }))
  }

  const updateMeasurement = (
    item,
    field,
    value,
  ) => {
    const key = getItemKey(item)

    setSizeData((previous) => {
      const current =
        previous[key] ||
        createDefaultSizeData(item)

      return {
        ...previous,
        [key]: {
          ...current,
          measurements: {
            ...(current.measurements || {}),
            [field]: value,
          },
        },
      }
    })

    setErrors((previous) => ({
      ...previous,
      [`size-${key}`]: '',
    }))
  }

  /* ============================================================
     STEP 1 VALIDATION
  ============================================================ */

  const validateStepOne = () => {
    const nextErrors = {}

    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'address',
      'city',
      'postalCode',
      'country',
    ]

    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        nextErrors[field] =
          t('requiredField')
      }
    })

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim(),
      )
    ) {
      nextErrors.email =
        t('requiredField')
    }

    setErrors(nextErrors)

    return (
      Object.keys(nextErrors).length === 0
    )
  }

  /* ============================================================
     STEP 2 VALIDATION
  ============================================================ */

  const validateStepTwo = () => {
    const nextErrors = {}

    cartItems.forEach((item) => {
      const key = getItemKey(item)

      const data =
        sizeData[key] ||
        createDefaultSizeData(item)

      const type =
        data.type ||
        getProductType(item)

      let message = ''

      /* --------------------------------------------------------
         WOMEN
      -------------------------------------------------------- */

      if (type === 'women-clothing') {
        if (!data.size) {
          message = t('sizeRequired')
        }

        if (data.customMeasurements) {
          const fields = [
            'bust',
            'waist',
            'hips',
            'shoulder',
            'sleeveLength',
            'dressLength',
          ]

          const missing =
            fields.some(
              (field) =>
                data.measurements?.[field] ===
                  undefined ||
                data.measurements?.[field] ===
                  null ||
                data.measurements?.[field] ===
                  '',
            )

          if (missing) {
            message =
              t('measurementsRequired')
          }
        }
      }

      /* --------------------------------------------------------
         MEN
      -------------------------------------------------------- */

      if (type === 'men-clothing') {
        if (!data.size) {
          message = t('sizeRequired')
        }

        if (data.customMeasurements) {
          const fields = [
            'chest',
            'waist',
            'shoulder',
            'sleeveLength',
            'shirtLength',
            'trouserWaist',
            'inseam',
          ]

          const missing =
            fields.some(
              (field) =>
                data.measurements?.[field] ===
                  undefined ||
                data.measurements?.[field] ===
                  null ||
                data.measurements?.[field] ===
                  '',
            )

          if (missing) {
            message =
              t('measurementsRequired')
          }
        }
      }

      /* --------------------------------------------------------
         SHOES
      -------------------------------------------------------- */

      if (type === 'shoes') {
        if (
          !data.sizeSystem ||
          !data.size
        ) {
          message =
            t('shoeSizeRequired')
        }

        if (
          data.footLength ===
            undefined ||
          data.footLength === null ||
          data.footLength === ''
        ) {
          message =
            t('footLengthRequired')
        }
      }

      /* --------------------------------------------------------
         BAGS
      -------------------------------------------------------- */

      if (type === 'bags') {
        if (!data.bagSize) {
          message =
            t('bagSizeRequired')
        }

        const fields = [
          'width',
          'height',
          'depth',
          'strapLength',
        ]

        const missing =
          fields.some(
            (field) =>
              data.measurements?.[field] ===
                undefined ||
              data.measurements?.[field] ===
                null ||
              data.measurements?.[field] ===
                '',
          )

        if (missing) {
          message =
            t('bagMeasurementsRequired')
        }
      }

      if (message) {
        nextErrors[`size-${key}`] =
          message
      }
    })

    setErrors(nextErrors)

    return (
      Object.keys(nextErrors).length === 0
    )
  }

  /* ============================================================
     STEP 3 VALIDATION
  ============================================================ */

  const validateStepThree = () => {
    const nextErrors = {}

    if (!paymentMethod) {
      nextErrors.paymentMethod =
        t('paymentRequired')
    }

    if (paymentMethod === 'card') {
      if (
        !cardData.cardholderName.trim()
      ) {
        nextErrors.cardholderName =
          t('requiredField')
      }

      if (
        !cardData.cardNumber.trim()
      ) {
        nextErrors.cardNumber =
          t('cardInformationRequired')
      }

      if (
        !cardData.expiryDate.trim()
      ) {
        nextErrors.expiryDate =
          t('requiredField')
      }

      if (!cardData.cvc.trim()) {
        nextErrors.cvc =
          t('requiredField')
      }
    }

    setErrors(nextErrors)

    return (
      Object.keys(nextErrors).length === 0
    )
  }

  /* ============================================================
     STEP NAVIGATION
  ============================================================ */

  const handleNextFromStepOne = () => {
    if (!validateStepOne()) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      return
    }

    setStep(2)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleNextFromStepTwo = () => {
    if (!validateStepTwo()) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      return
    }

    setStep(3)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleBack = () => {
    setStep((previous) =>
      Math.max(1, previous - 1),
    )

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  /* ============================================================
     PLACE ORDER
     
     BACKEND:
     POST /api/orders
  ============================================================ */

  const handlePlaceOrder = async (event) => {
    event.preventDefault()

    if (!validateStepThree()) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      return
    }

    if (!cartItems.length) {
      return
    }

    setIsSubmitting(true)

    setErrors((previous) => ({
      ...previous,
      submit: '',
    }))

    try {
      /* ========================================================
         AUTH TOKEN
      ======================================================== */

      const token = getToken()

      if (!token) {
        setErrors((previous) => ({
          ...previous,
          submit:
            'Please login before placing your order.',
        }))

        setIsSubmitting(false)

        navigate('/login', {
          state: {
            from: '/checkout',
          },
        })

        return
      }

      /* ========================================================
         ORDER ITEMS
         
         IMPORTANT:
         Backend receives:
         - product
         - quantity
         - sizeData
         
         We do NOT send card information.
      ======================================================== */

      const orderItems = cartItems.map(
        (item) => {
          const key = getItemKey(item)

          const currentSizeData =
            sizeData[key] ||
            item.sizeData ||
            createDefaultSizeData(item)

          return {
            product:
              item.product ||
              item.productId ||
              item.id,

            quantity:
              Number(item.quantity) || 1,

            sizeData: {
              ...currentSizeData,

              measurements:
                currentSizeData.measurements
                  ? {
                      ...currentSizeData.measurements,
                    }
                  : undefined,
            },

            /*
             * These are optional frontend
             * snapshot/display values.
             *
             * Backend will use the real
             * Product from MongoDB.
             */
            name: item.name || '',
            image:
              getProductImage(item),
            price:
              Number(item.price) || 0,
          }
        },
      )

      /* ========================================================
         CUSTOMER
      ======================================================== */

      const customer = {
        firstName:
          formData.firstName.trim(),

        lastName:
          formData.lastName.trim(),

        email:
          formData.email.trim().toLowerCase(),

        phone:
          formData.phone.trim(),

        address:
          formData.address.trim(),

        apartment:
          formData.apartment.trim(),

        city:
          formData.city.trim(),

        state:
          formData.state.trim(),

        postalCode:
          formData.postalCode.trim(),

        country:
          formData.country.trim(),
      }

      /* ========================================================
         COMPLETE BACKEND ORDER
      ======================================================== */

      const orderData = {
        customer,

        shippingMethod,

        paymentMethod,

        items: orderItems,

        subtotal:
          Number(subtotal || 0),

        shipping:
          Number(shippingPrice || 0),

        total:
          Number(finalTotal || 0),
      }

      /* ========================================================
         IMPORTANT SECURITY RULE
         
         NEVER send:
         cardNumber
         expiryDate
         cvc
         
         to our backend.
         
         Real card processing should later be handled
         by Stripe/PayPal's secure payment system.
      ======================================================== */

      const response = await fetch(
        `${API_URL}/orders`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify(
            orderData,
          ),
        },
      )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Failed to create order.',
        )
      }

      /* ========================================================
         BACKEND ORDER
      ======================================================== */

      const createdOrder =
        data.order || data

      if (!createdOrder) {
        throw new Error(
          'The server did not return the created order.',
        )
      }

      /* ========================================================
         CLEAR CART
      ======================================================== */

      clearCart()

      /* ========================================================
         ORDER CONFIRMATION
      ======================================================== */

      navigate(
        '/order-confirmation',
        {
          state: {
            order: createdOrder,
          },
        },
      )
    } catch (error) {
      console.error(
        'Checkout order error:',
        error,
      )

      setErrors((previous) => ({
        ...previous,
        submit:
          error.message ||
          'Unable to place your order. Please try again.',
      }))

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ============================================================
     EMPTY CART
  ============================================================ */

  if (!cartItems.length) {
    return (
      <div className="min-h-[70vh] bg-gray-50 px-4 py-16">
        <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <Package className="h-9 w-9 text-gray-500" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            {t('cartEmpty')}
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
            {t('cartEmptyDescription')}
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            {t('continueShopping')}
          </Link>
        </div>
      </div>
    )
  }

  /* ============================================================
     MAIN CHECKOUT
  ============================================================ */

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ========================================================
          HEADER
      ======================================================== */}

      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">

          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('back')}
          </Link>

          <div className="text-center">
            <p className="text-lg font-black tracking-tight text-gray-900">
              ፈገግታ
            </p>

            <p className="text-xs text-gray-500">
              {t('marketplace')}
            </p>
          </div>

          <div className="flex items-center gap-2 text-gray-500">
            <LockKeyhole className="h-4 w-4" />

            <span className="hidden text-xs font-medium sm:inline">
              {t('secureCheckout')}
            </span>
          </div>
        </div>
      </header>

      {/* ========================================================
          MAIN
      ======================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {t('checkoutTitle')}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {t('checkoutProgress')}
          </p>
        </div>

        <CheckoutProgress
          step={step}
          t={t}
        />

        {/* ======================================================
            BACKEND ERROR
        ====================================================== */}

        {errors.submit && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {errors.submit}
          </div>
        )}

        <form
          onSubmit={handlePlaceOrder}
          noValidate
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">

            {/* ==================================================
                LEFT
            ================================================== */}

            <div className="min-w-0 space-y-6">

              {/* =================================================
                  STEP 1
              ================================================= */}

              {step === 1 && (
                <>

                  {/* CUSTOMER INFORMATION */}

                  <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

                    <SectionHeader
                      icon={
                        <CheckCircle2 className="h-5 w-5 text-gray-700" />
                      }
                      title={t(
                        'customerInformation',
                      )}
                      description={t(
                        'customerInformationDescription',
                      )}
                    />

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">

                      <InputField
                        label={t('firstName')}
                        name="firstName"
                        value={
                          formData.firstName
                        }
                        onChange={
                          handleChange
                        }
                        error={
                          errors.firstName
                        }
                        required
                      />

                      <InputField
                        label={t('lastName')}
                        name="lastName"
                        value={
                          formData.lastName
                        }
                        onChange={
                          handleChange
                        }
                        error={
                          errors.lastName
                        }
                        required
                      />

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
                        required
                      />

                      <InputField
                        label={t('phone')}
                        name="phone"
                        type="tel"
                        value={
                          formData.phone
                        }
                        onChange={
                          handleChange
                        }
                        error={
                          errors.phone
                        }
                        required
                      />

                    </div>
                  </section>

                  {/* SHIPPING ADDRESS */}

                  <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

                    <SectionHeader
                      icon={
                        <MapPin className="h-5 w-5 text-gray-700" />
                      }
                      title={t(
                        'shippingAddress',
                      )}
                      description={t(
                        'shippingAddressDescription',
                      )}
                    />

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">

                      <div className="sm:col-span-2">
                        <InputField
                          label={t('address')}
                          name="address"
                          value={
                            formData.address
                          }
                          onChange={
                            handleChange
                          }
                          error={
                            errors.address
                          }
                          required
                        />
                      </div>

                      <InputField
                        label={`${t(
                          'apartment',
                        )} (${t(
                          'optional',
                        )})`}
                        name="apartment"
                        value={
                          formData.apartment
                        }
                        onChange={
                          handleChange
                        }
                      />

                      <InputField
                        label={t('city')}
                        name="city"
                        value={
                          formData.city
                        }
                        onChange={
                          handleChange
                        }
                        error={
                          errors.city
                        }
                        required
                      />

                      <InputField
                        label={t(
                          'stateProvince',
                        )}
                        name="state"
                        value={
                          formData.state
                        }
                        onChange={
                          handleChange
                        }
                      />

                      <InputField
                        label={t(
                          'postalCode',
                        )}
                        name="postalCode"
                        value={
                          formData.postalCode
                        }
                        onChange={
                          handleChange
                        }
                        error={
                          errors.postalCode
                        }
                        required
                      />

                      <InputField
                        label={t('country')}
                        name="country"
                        value={
                          formData.country
                        }
                        onChange={
                          handleChange
                        }
                        error={
                          errors.country
                        }
                        required
                      />

                    </div>
                  </section>

                  {/* SHIPPING */}

                  <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

                    <SectionHeader
                      icon={
                        <Truck className="h-5 w-5 text-gray-700" />
                      }
                      title={t(
                        'shippingMethod',
                      )}
                      description={t(
                        'shippingMethodDescription',
                      )}
                    />

                    <div className="mt-6 space-y-3">

                      <ShippingOption
                        value="standard"
                        selected={
                          shippingMethod ===
                          'standard'
                        }
                        onChange={
                          setShippingMethod
                        }
                        title={t(
                          'standardShipping',
                        )}
                        description={t(
                          'standardShippingDescription',
                        )}
                        price={
                          Number(
                            shipping || 0,
                          ) === 0
                            ? 'Free'
                            : `€${Number(
                                shipping || 0,
                              ).toFixed(2)}`
                        }
                      />

                      <ShippingOption
                        value="express"
                        selected={
                          shippingMethod ===
                          'express'
                        }
                        onChange={
                          setShippingMethod
                        }
                        title={t(
                          'expressShipping',
                        )}
                        description={t(
                          'expressShippingDescription',
                        )}
                        price="€25.00"
                      />

                    </div>
                  </section>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={
                        handleNextFromStepOne
                      }
                      className="inline-flex h-12 items-center justify-center rounded-xl bg-black px-7 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                      {t('continue')}
                    </button>
                  </div>

                </>
              )}

              {/* =================================================
                  STEP 2
              ================================================= */}

              {step === 2 && (
                <>

                  <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

                    <SectionHeader
                      icon={
                        <Ruler className="h-5 w-5 text-gray-700" />
                      }
                      title={t(
                        'sizeAndMeasurements',
                      )}
                      description={t(
                        'sizeAndMeasurementsDescription',
                      )}
                    />

                    <div className="mt-6 space-y-5">

                      {cartItems.map(
                        (item) => {
                          const key =
                            getItemKey(
                              item,
                            )

                          return (
                            <ProductSizeEditor
                              key={key}
                              item={item}
                              sizeData={
                                sizeData[
                                  key
                                ] ||
                                createDefaultSizeData(
                                  item,
                                )
                              }
                              error={
                                errors[
                                  `size-${key}`
                                ]
                              }
                              t={t}
                              onChange={(
                                updates,
                              ) =>
                                updateSizeData(
                                  item,
                                  updates,
                                )
                              }
                              onMeasurementChange={(
                                field,
                                value,
                              ) =>
                                updateMeasurement(
                                  item,
                                  field,
                                  value,
                                )
                              }
                            />
                          )
                        },
                      )}

                    </div>
                  </section>

                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <button
                      type="button"
                      onClick={
                        handleBack
                      }
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      {t('back')}
                    </button>

                    <button
                      type="button"
                      onClick={
                        handleNextFromStepTwo
                      }
                      className="inline-flex h-12 items-center justify-center rounded-xl bg-black px-7 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                      {t('continue')}
                    </button>

                  </div>

                </>
              )}

              {/* =================================================
                  STEP 3
              ================================================= */}

              {step === 3 && (
                <>

                  <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

                    <SectionHeader
                      icon={
                        <CreditCard className="h-5 w-5 text-gray-700" />
                      }
                      title={t(
                        'paymentMethod',
                      )}
                      description={t(
                        'paymentMethodDescription',
                      )}
                    />

                    {errors.paymentMethod && (
                      <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                        {
                          errors.paymentMethod
                        }
                      </p>
                    )}

                    <div className="mt-6 space-y-3">

                      <PaymentOption
                        value="card"
                        selected={
                          paymentMethod ===
                          'card'
                        }
                        onChange={
                          setPaymentMethod
                        }
                        title={t(
                          'creditDebitCard',
                        )}
                        description={t(
                          'creditDebitCardDescription',
                        )}
                      />

                      <PaymentOption
                        value="paypal"
                        selected={
                          paymentMethod ===
                          'paypal'
                        }
                        onChange={
                          setPaymentMethod
                        }
                        title={t('paypal')}
                        description={t(
                          'paypalDescription',
                        )}
                      />

                      <PaymentOption
                        value="bank"
                        selected={
                          paymentMethod ===
                          'bank'
                        }
                        onChange={
                          setPaymentMethod
                        }
                        title={t(
                          'bankTransfer',
                        )}
                        description={t(
                          'bankTransferDescription',
                        )}
                      />

                    </div>
                  </section>

                  {/* CARD */}

                  {paymentMethod ===
                    'card' && (
                    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

                      <SectionHeader
                        icon={
                          <LockKeyhole className="h-5 w-5 text-gray-700" />
                        }
                        title={t(
                          'cardInformation',
                        )}
                        description={t(
                          'cardInformationDescription',
                        )}
                      />

                      <div className="mt-6 grid gap-5 sm:grid-cols-2">

                        <div className="sm:col-span-2">
                          <InputField
                            label={t(
                              'cardholderName',
                            )}
                            name="cardholderName"
                            value={
                              cardData.cardholderName
                            }
                            onChange={
                              handleCardChange
                            }
                            error={
                              errors.cardholderName
                            }
                            required
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <InputField
                            label={t(
                              'cardNumber',
                            )}
                            name="cardNumber"
                            type="text"
                            inputMode="numeric"
                            value={
                              cardData.cardNumber
                            }
                            onChange={
                              handleCardChange
                            }
                            error={
                              errors.cardNumber
                            }
                            placeholder={t(
                              'enterCardNumber',
                            )}
                            required
                          />
                        </div>

                        <InputField
                          label={t(
                            'expiryDate',
                          )}
                          name="expiryDate"
                          value={
                            cardData.expiryDate
                          }
                          onChange={
                            handleCardChange
                          }
                          error={
                            errors.expiryDate
                          }
                          placeholder={t(
                            'enterExpiryDate',
                          )}
                          required
                        />

                        <InputField
                          label={t('cvc')}
                          name="cvc"
                          type="password"
                          inputMode="numeric"
                          value={
                            cardData.cvc
                          }
                          onChange={
                            handleCardChange
                          }
                          error={
                            errors.cvc
                          }
                          placeholder={t(
                            'enterSecurityCode',
                          )}
                          required
                        />

                      </div>

                      <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">

                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                        <div>
                          <p className="text-sm font-semibold text-amber-900">
                            {t(
                              'paymentTestNotice',
                            )}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-amber-800">
                            {t(
                              'secureCardInformation',
                            )}
                          </p>
                        </div>

                      </div>
                    </section>
                  )}

                  {/* PAYPAL */}

                  {paymentMethod ===
                    'paypal' && (
                    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

                      <div className="rounded-xl bg-gray-50 p-5">

                        <p className="text-sm font-semibold text-gray-900">
                          {t('paypal')}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                          {t(
                            'paypalPaymentInformation',
                          )}
                        </p>

                      </div>
                    </section>
                  )}

                  {/* BANK */}

                  {paymentMethod ===
                    'bank' && (
                    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

                      <div className="rounded-xl bg-gray-50 p-5">

                        <p className="text-sm font-semibold text-gray-900">
                          {t(
                            'bankTransfer',
                          )}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                          {t(
                            'bankPaymentInformation',
                          )}
                        </p>

                      </div>
                    </section>
                  )}

                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <button
                      type="button"
                      onClick={
                        handleBack
                      }
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      {t('back')}
                    </button>

                    <button
                      type="submit"
                      disabled={
                        isSubmitting
                      }
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-black px-7 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting
                        ? t(
                            'processingOrder',
                          )
                        : t(
                            'placeOrder',
                          )}
                    </button>

                  </div>

                </>
              )}

            </div>

            {/* ==================================================
                RIGHT ORDER SUMMARY
            ================================================== */}

            <aside className="lg:sticky lg:top-6 lg:self-start">

              <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                shipping={shippingPrice}
                total={finalTotal}
                sizeData={sizeData}
                step={step}
                t={t}
              />

            </aside>

          </div>
        </form>
      </main>
    </div>
  )
}


/* ============================================================
   PRODUCT TYPE
============================================================ */

function getProductType(item = {}) {
  const explicitType =
    item.productType ||
    item.type

  if (explicitType) {
    const normalized =
      String(explicitType)
        .toLowerCase()
        .trim()

    if (
      normalized.includes('women') ||
      normalized.includes('woman') ||
      normalized.includes('female')
    ) {
      return 'women-clothing'
    }

    if (
      normalized.includes('men') ||
      normalized.includes('man') ||
      normalized.includes('male')
    ) {
      return 'men-clothing'
    }

    if (
      normalized.includes('shoe') ||
      normalized.includes('footwear')
    ) {
      return 'shoes'
    }

    if (
      normalized.includes('bag') ||
      normalized.includes('handbag')
    ) {
      return 'bags'
    }
  }

  const category =
    String(
      item.category || '',
    ).toLowerCase()

  const name =
    String(
      item.name || '',
    ).toLowerCase()

  if (
    category.includes('shoe') ||
    category.includes('footwear') ||
    name.includes('shoe')
  ) {
    return 'shoes'
  }

  if (
    category.includes('bag') ||
    category.includes('handbag') ||
    name.includes('bag')
  ) {
    return 'bags'
  }

  if (
    category.includes('fashion') ||
    category.includes('clothing') ||
    category.includes('dress') ||
    category.includes('men') ||
    category.includes('women')
  ) {
    if (
      category.includes('men') ||
      category.includes('male') ||
      name.includes('men') ||
      name.includes('man') ||
      name.includes('shirt') ||
      name.includes('trouser') ||
      name.includes('suit')
    ) {
      return 'men-clothing'
    }

    return 'women-clothing'
  }

  if (
    name.includes('shirt') ||
    name.includes('trouser') ||
    name.includes('suit') ||
    name.includes('men')
  ) {
    return 'men-clothing'
  }

  return 'other'
}


/* ============================================================
   CART ITEM KEY
============================================================ */

function getItemKey(item) {
  return (
    item.cartItemId ||
    String(item.id)
  )
}


/* ============================================================
   DEFAULT SIZE DATA
============================================================ */

function createDefaultSizeData(item) {
  const type =
    getProductType(item)

  if (type === 'women-clothing') {
    return {
      type,
      size: '',
      unit: 'cm',
      customMeasurements: false,
      measurements: {
        bust: '',
        waist: '',
        hips: '',
        shoulder: '',
        sleeveLength: '',
        dressLength: '',
      },
    }
  }

  if (type === 'men-clothing') {
    return {
      type,
      size: '',
      unit: 'cm',
      customMeasurements: false,
      measurements: {
        chest: '',
        waist: '',
        shoulder: '',
        sleeveLength: '',
        shirtLength: '',
        trouserWaist: '',
        inseam: '',
      },
    }
  }

  if (type === 'shoes') {
    return {
      type,
      sizeSystem: 'EU',
      size: '',
      unit: 'cm',
      footLength: '',
    }
  }

  if (type === 'bags') {
    return {
      type,
      bagSize: '',
      unit: 'cm',
      measurements: {
        width: '',
        height: '',
        depth: '',
        strapLength: '',
      },
    }
  }

  return {
    type: 'other',
  }
}


/* ============================================================
   GET PRODUCT IMAGE
============================================================ */

function getProductImage(item = {}) {
  if (typeof item.image === 'string') {
    return item.image
  }

  if (
    item.image &&
    typeof item.image === 'object' &&
    item.image.url
  ) {
    return item.image.url
  }

  if (
    Array.isArray(item.images) &&
    item.images.length > 0
  ) {
    const firstImage =
      item.images[0]

    if (typeof firstImage === 'string') {
      return firstImage
    }

    if (
      firstImage &&
      typeof firstImage === 'object'
    ) {
      return firstImage.url || ''
    }
  }

  if (
    typeof item.thumbnail === 'string'
  ) {
    return item.thumbnail
  }

  return ''
}


/* ============================================================
   PRODUCT SIZE EDITOR
============================================================ */

function ProductSizeEditor({
  item,
  sizeData,
  error,
  t,
  onChange,
  onMeasurementChange,
}) {
  const type =
    sizeData?.type ||
    getProductType(item)

  if (type === 'other') {
    return (
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center gap-4">

          <ProductImage
            item={item}
          />

          <div className="min-w-0">

            <h3 className="truncate text-sm font-semibold text-gray-900">
              {item.name}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              {t('noSizeRequired')}
            </p>

          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white">

      <div className="flex items-center gap-4 border-b border-gray-100 p-4">

        <ProductImage
          item={item}
        />

        <div className="min-w-0 flex-1">

          <h3 className="truncate text-sm font-semibold text-gray-900">
            {item.name}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            {getTypeLabel(type, t)}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {t('quantity')}: {item.quantity}
          </p>

        </div>
      </div>

      <div className="p-4 sm:p-5">

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {type === 'women-clothing' && (
          <WomenSizeForm
            sizeData={sizeData}
            t={t}
            onChange={onChange}
            onMeasurementChange={
              onMeasurementChange
            }
          />
        )}

        {type === 'men-clothing' && (
          <MenSizeForm
            sizeData={sizeData}
            t={t}
            onChange={onChange}
            onMeasurementChange={
              onMeasurementChange
            }
          />
        )}

        {type === 'shoes' && (
          <ShoesSizeForm
            sizeData={sizeData}
            t={t}
            onChange={onChange}
          />
        )}

        {type === 'bags' && (
          <BagSizeForm
            sizeData={sizeData}
            t={t}
            onChange={onChange}
            onMeasurementChange={
              onMeasurementChange
            }
          />
        )}

      </div>
    </div>
  )
}


/* ============================================================
   PRODUCT IMAGE
============================================================ */

function ProductImage({ item }) {
  const image =
    getProductImage(item)

  if (!image) {
    return (
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
        <Package className="h-6 w-6 text-gray-400" />
      </div>
    )
  }

  return (
    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">

      <img
        src={image}
        alt={
          item.name ||
          'Product'
        }
        className="h-full w-full object-cover"
        onError={(event) => {
          event.currentTarget.style.display =
            'none'
        }}
      />

    </div>
  )
}


/* ============================================================
   WOMEN SIZE
============================================================ */

function WomenSizeForm({
  sizeData,
  t,
  onChange,
  onMeasurementChange,
}) {
  const sizes = [
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL',
  ]

  return (
    <div className="space-y-6">

      <div>
        <p className="mb-3 text-sm font-semibold text-gray-900">
          {t('womenSize')}
        </p>

        <div className="flex flex-wrap gap-2">

          {sizes.map((size) => (
            <SizeButton
              key={size}
              value={size}
              selected={
                sizeData.size === size
              }
              onClick={() =>
                onChange({
                  size,
                })
              }
            />
          ))}

        </div>
      </div>

      <UnitSelector
        unit={sizeData.unit}
        onChange={(unit) =>
          onChange({ unit })
        }
        t={t}
      />

      <div>

        <p className="mb-3 text-sm font-semibold text-gray-900">
          {t('customMeasurements')}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">

          <MeasurementInput
            label={t('bust')}
            value={
              sizeData.measurements?.bust
            }
            onChange={(value) =>
              onMeasurementChange(
                'bust',
                value,
              )
            }
          />

          <MeasurementInput
            label={t('waist')}
            value={
              sizeData.measurements?.waist
            }
            onChange={(value) =>
              onMeasurementChange(
                'waist',
                value,
              )
            }
          />

          <MeasurementInput
            label={t('hips')}
            value={
              sizeData.measurements?.hips
            }
            onChange={(value) =>
              onMeasurementChange(
                'hips',
                value,
              )
            }
          />

          <MeasurementInput
            label={t('shoulder')}
            value={
              sizeData.measurements?.shoulder
            }
            onChange={(value) =>
              onMeasurementChange(
                'shoulder',
                value,
              )
            }
          />

          <MeasurementInput
            label={t('sleeveLength')}
            value={
              sizeData.measurements
                ?.sleeveLength
            }
            onChange={(value) =>
              onMeasurementChange(
                'sleeveLength',
                value,
              )
            }
          />

          <MeasurementInput
            label={t('dressLength')}
            value={
              sizeData.measurements
                ?.dressLength
            }
            onChange={(value) =>
              onMeasurementChange(
                'dressLength',
                value,
              )
            }
          />

        </div>
      </div>

      <CustomMeasurementToggle
        checked={
          !!sizeData.customMeasurements
        }
        onChange={(checked) =>
          onChange({
            customMeasurements:
              checked,
          })
        }
        t={t}
      />

    </div>
  )
}


/* ============================================================
   MEN SIZE
============================================================ */

function MenSizeForm({
  sizeData,
  t,
  onChange,
  onMeasurementChange,
}) {
  const sizes = [
    'S',
    'M',
    'L',
    'XL',
    'XXL',
  ]

  return (
    <div className="space-y-6">

      <div>

        <p className="mb-3 text-sm font-semibold text-gray-900">
          {t('menSize')}
        </p>

        <div className="flex flex-wrap gap-2">

          {sizes.map((size) => (
            <SizeButton
              key={size}
              value={size}
              selected={
                sizeData.size === size
              }
              onClick={() =>
                onChange({
                  size,
                })
              }
            />
          ))}

        </div>
      </div>

      <UnitSelector
        unit={sizeData.unit}
        onChange={(unit) =>
          onChange({ unit })
        }
        t={t}
      />

      <div>

        <p className="mb-3 text-sm font-semibold text-gray-900">
          {t('customMeasurements')}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">

          <MeasurementInput
            label={t('chest')}
            value={
              sizeData.measurements?.chest
            }
            onChange={(value) =>
              onMeasurementChange(
                'chest',
                value,
              )
            }
          />

          <MeasurementInput
            label={t('waist')}
            value={
              sizeData.measurements?.waist
            }
            onChange={(value) =>
              onMeasurementChange(
                'waist',
                value,
              )
            }
          />

          <MeasurementInput
            label={t('shoulder')}
            value={
              sizeData.measurements
                ?.shoulder
            }
            onChange={(value) =>
              onMeasurementChange(
                'shoulder',
                value,
              )
            }
          />

          <MeasurementInput
            label={t('sleeveLength')}
            value={
              sizeData.measurements
                ?.sleeveLength
            }
            onChange={(value) =>
              onMeasurementChange(
                'sleeveLength',
                value,
              )
            }
          />

          <MeasurementInput
            label={t('shirtLength')}
            value={
              sizeData.measurements
                ?.shirtLength
            }
            onChange={(value) =>
              onMeasurementChange(
                'shirtLength',
                value,
              )
            }
          />

          <MeasurementInput
            label={t('trouserWaist')}
            value={
              sizeData.measurements
                ?.trouserWaist
            }
            onChange={(value) =>
              onMeasurementChange(
                'trouserWaist',
                value,
              )
            }
          />

          <MeasurementInput
            label={t('inseam')}
            value={
              sizeData.measurements
                ?.inseam
            }
            onChange={(value) =>
              onMeasurementChange(
                'inseam',
                value,
              )
            }
          />

        </div>
      </div>

      <CustomMeasurementToggle
        checked={
          !!sizeData.customMeasurements
        }
        onChange={(checked) =>
          onChange({
            customMeasurements:
              checked,
          })
        }
        t={t}
      />

    </div>
  )
}


/* ============================================================
   SHOES
============================================================ */

function ShoesSizeForm({
  sizeData,
  t,
  onChange,
}) {
  const systems = [
    'EU',
    'US',
    'UK',
  ]

  const shoeSizes = {
    EU: [
      '35',
      '36',
      '37',
      '38',
      '39',
      '40',
      '41',
      '42',
      '43',
      '44',
      '45',
      '46',
      '47',
    ],

    US: [
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
    ],

    UK: [
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
    ],
  }

  const currentSizes =
    shoeSizes[
      sizeData.sizeSystem || 'EU'
    ] || []

  return (
    <div className="space-y-6">

      <div>

        <p className="mb-3 text-sm font-semibold text-gray-900">
          {t('shoeSizeSystem')}
        </p>

        <div className="flex flex-wrap gap-2">

          {systems.map((system) => (
            <SizeButton
              key={system}
              value={system}
              selected={
                sizeData.sizeSystem ===
                system
              }
              onClick={() =>
                onChange({
                  sizeSystem: system,
                  size: '',
                })
              }
            />
          ))}

        </div>
      </div>

      <div>

        <p className="mb-3 text-sm font-semibold text-gray-900">
          {t('shoeSize')}
        </p>

        <div className="flex flex-wrap gap-2">

          {currentSizes.map((size) => (
            <SizeButton
              key={size}
              value={size}
              selected={
                sizeData.size === size
              }
              onClick={() =>
                onChange({
                  size,
                })
              }
            />
          ))}

        </div>
      </div>

      <div>

        <div className="mb-3">

          <p className="text-sm font-semibold text-gray-900">
            {t('footLength')}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {t(
              'footLengthDescription',
            )}
          </p>

        </div>

        <div className="flex gap-3">

          <input
            type="number"
            min="0"
            step="0.1"
            value={
              sizeData.footLength || ''
            }
            onChange={(event) =>
              onChange({
                footLength:
                  event.target.value,
              })
            }
            className="h-12 min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            placeholder="0.0"
          />

          <UnitSelector
            unit={sizeData.unit}
            onChange={(unit) =>
              onChange({ unit })
            }
            t={t}
          />

        </div>
      </div>

      {(sizeData.size ||
        sizeData.footLength) && (
        <div className="rounded-xl bg-gray-50 p-4">

          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {t('selectedSize')}
          </p>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-gray-700">

            {sizeData.size && (
              <span>
                {t('shoeSize')}:{' '}
                {sizeData.size}
              </span>
            )}

            {sizeData.sizeSystem && (
              <span>
                {t(
                  'shoeSizeSystem',
                )}
                : {sizeData.sizeSystem}
              </span>
            )}

            {sizeData.footLength && (
              <span>
                {t('footLength')}:{' '}
                {sizeData.footLength}{' '}
                {sizeData.unit || 'cm'}
              </span>
            )}

          </div>
        </div>
      )}

    </div>
  )
}


/* ============================================================
   BAG SIZE
============================================================ */

function BagSizeForm({
  sizeData,
  t,
  onChange,
  onMeasurementChange,
}) {
  const sizes = [
    'small',
    'medium',
    'large',
  ]

  return (
    <div className="space-y-6">

      <div>

        <p className="mb-3 text-sm font-semibold text-gray-900">
          {t('bagSize')}
        </p>

        <div className="flex flex-wrap gap-2">

          {sizes.map((size) => (
            <SizeButton
              key={size}
              value={t(size)}
              selected={
                sizeData.bagSize?.toLowerCase() ===
                size
              }
              onClick={() =>
                onChange({
                  bagSize:
                    size
                      .charAt(0)
                      .toUpperCase() +
                    size.slice(1),
                })
              }
            />
          ))}

        </div>
      </div>

      <UnitSelector
        unit={sizeData.unit}
        onChange={(unit) =>
          onChange({ unit })
        }
        t={t}
      />

      <div className="grid gap-4 sm:grid-cols-2">

        <MeasurementInput
          label={t('width')}
          value={
            sizeData.measurements?.width
          }
          onChange={(value) =>
            onMeasurementChange(
              'width',
              value,
            )
          }
        />

        <MeasurementInput
          label={t('height')}
          value={
            sizeData.measurements?.height
          }
          onChange={(value) =>
            onMeasurementChange(
              'height',
              value,
            )
          }
        />

        <MeasurementInput
          label={t('depth')}
          value={
            sizeData.measurements?.depth
          }
          onChange={(value) =>
            onMeasurementChange(
              'depth',
              value,
            )
          }
        />

        <MeasurementInput
          label={t('strapLength')}
          value={
            sizeData.measurements
              ?.strapLength
          }
          onChange={(value) =>
            onMeasurementChange(
              'strapLength',
              value,
            )
          }
        />

      </div>
    </div>
  )
}


/* ============================================================
   UNIT SELECTOR
============================================================ */

function UnitSelector({
  unit,
  onChange,
  t,
}) {
  return (
    <div>

      <p className="mb-3 text-sm font-semibold text-gray-900">
        {t('measurementUnit')}
      </p>

      <div className="inline-flex rounded-xl border border-gray-200 bg-gray-50 p-1">

        <button
          type="button"
          onClick={() =>
            onChange('cm')
          }
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            unit === 'cm'
              ? 'bg-black text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {t('centimeters')}
        </button>

        <button
          type="button"
          onClick={() =>
            onChange('in')
          }
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            unit === 'in'
              ? 'bg-black text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {t('inches')}
        </button>

      </div>
    </div>
  )
}


/* ============================================================
   SIZE BUTTON
============================================================ */

function SizeButton({
  value,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-11 min-w-11 items-center justify-center gap-1 rounded-xl border px-4 text-sm font-semibold transition ${
        selected
          ? 'border-black bg-black text-white'
          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
      }`}
    >
      {selected && (
        <Check className="h-3.5 w-3.5" />
      )}

      {value}
    </button>
  )
}


/* ============================================================
   MEASUREMENT INPUT
============================================================ */

function MeasurementInput({
  label,
  value,
  onChange,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-gray-800">
        {label}
      </label>

      <input
        type="number"
        min="0"
        step="0.1"
        value={value ?? ''}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
        placeholder="0.0"
      />

    </div>
  )
}


/* ============================================================
   CUSTOM MEASUREMENT TOGGLE
============================================================ */

function CustomMeasurementToggle({
  checked,
  onChange,
  t,
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">

      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        className="mt-1 h-4 w-4 rounded border-gray-300"
      />

      <span>

        <span className="block text-sm font-semibold text-gray-900">
          {t('customMeasurements')}
        </span>

        <span className="mt-1 block text-xs leading-5 text-gray-500">
          {t(
            'customMeasurementsDescription',
          )}
        </span>

      </span>
    </label>
  )
}


/* ============================================================
   TYPE LABEL
============================================================ */

function getTypeLabel(type, t) {
  if (type === 'women-clothing') {
    return t('womenClothing')
  }

  if (type === 'men-clothing') {
    return t('menClothing')
  }

  if (type === 'shoes') {
    return t('shoes')
  }

  if (type === 'bags') {
    return t('bags')
  }

  return ''
}


/* ============================================================
   ORDER SIZE SUMMARY
============================================================ */

function OrderSizeSummary({
  item,
  sizeData,
  t,
}) {
  const type =
    sizeData?.type ||
    getProductType(item)

  if (type === 'other') {
    return null
  }

  const values = []

  if (sizeData?.size) {
    values.push(
      `${t('size')}: ${sizeData.size}`,
    )
  }

  if (sizeData?.sizeSystem) {
    values.push(
      `${t('shoeSizeSystem')}: ${sizeData.sizeSystem}`,
    )
  }

  if (sizeData?.footLength) {
    values.push(
      `${t('footLength')}: ${sizeData.footLength} ${
        sizeData.unit || 'cm'
      }`,
    )
  }

  if (sizeData?.bagSize) {
    values.push(
      `${t('bagSize')}: ${t(
        sizeData.bagSize.toLowerCase(),
      )}`,
    )
  }

  const measurements =
    sizeData?.measurements || {}

  const measurementLabels = {
    bust: 'bust',
    waist: 'waist',
    hips: 'hips',
    shoulder: 'shoulder',
    sleeveLength: 'sleeveLength',
    dressLength: 'dressLength',
    chest: 'chest',
    shirtLength: 'shirtLength',
    trouserWaist: 'trouserWaist',
    inseam: 'inseam',
    width: 'width',
    height: 'height',
    depth: 'depth',
    strapLength: 'strapLength',
  }

  Object.entries(
    measurementLabels,
  ).forEach(
    ([field, translationKey]) => {
      const value =
        measurements[field]

      if (
        value !== undefined &&
        value !== null &&
        value !== ''
      ) {
        values.push(
          `${t(translationKey)}: ${value} ${
            sizeData.unit || 'cm'
          }`,
        )
      }
    },
  )

  if (!values.length) {
    return null
  }

  return (
    <div className="mt-3 rounded-xl bg-gray-50 px-3 py-2.5">

      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
        {t('selectedSize')}
      </p>

      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">

        {values.map((value) => (
          <span
            key={value}
            className="text-xs font-medium text-gray-700"
          >
            {value}
          </span>
        ))}

      </div>
    </div>
  )
}


/* ============================================================
   CHECKOUT PROGRESS
============================================================ */

function CheckoutProgress({
  step,
  t,
}) {
  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

      <div className="flex items-center">

        <ProgressStep
          number="1"
          label={t(
            'checkoutInformation',
          )}
          active={step === 1}
          completed={step > 1}
        />

        <div
          className={`mx-2 h-px flex-1 sm:mx-4 ${
            step > 1
              ? 'bg-black'
              : 'bg-gray-200'
          }`}
        />

        <ProgressStep
          number="2"
          label={t(
            'sizeAndMeasurements',
          )}
          active={step === 2}
          completed={step > 2}
        />

        <div
          className={`mx-2 h-px flex-1 sm:mx-4 ${
            step > 2
              ? 'bg-black'
              : 'bg-gray-200'
          }`}
        />

        <ProgressStep
          number="3"
          label={t('paymentMethod')}
          active={step === 3}
        />

      </div>
    </div>
  )
}


/* ============================================================
   PROGRESS STEP
============================================================ */

function ProgressStep({
  number,
  label,
  active = false,
  completed = false,
}) {
  return (
    <div
      className={`flex shrink-0 items-center gap-2 ${
        active || completed
          ? 'text-gray-900'
          : 'text-gray-400'
      }`}
    >

      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
          completed
            ? 'bg-black text-white'
            : active
              ? 'bg-black text-white'
              : 'border border-gray-200 bg-white'
        }`}
      >
        {completed ? (
          <Check className="h-4 w-4" />
        ) : (
          number
        )}
      </div>

      <span className="hidden text-sm font-medium sm:inline">
        {label}
      </span>

    </div>
  )
}


/* ============================================================
   SECTION HEADER
============================================================ */

function SectionHeader({
  icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-4">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100">
        {icon}
      </div>

      <div className="min-w-0">

        <h2 className="text-lg font-bold text-gray-900">
          {title}
        </h2>

        <p className="mt-1 text-sm leading-5 text-gray-500">
          {description}
        </p>

      </div>
    </div>
  )
}


/* ============================================================
   INPUT FIELD
============================================================ */

function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder = '',
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-800"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
          error
            ? 'border-red-400 focus:border-red-400 focus:ring-red-50'
            : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100'
        }`}
      />

      {error && (
        <p className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}

    </div>
  )
}


/* ============================================================
   SHIPPING OPTION
============================================================ */

function ShippingOption({
  value,
  selected,
  onChange,
  title,
  description,
  price,
}) {
  return (
    <label
      className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 transition ${
        selected
          ? 'border-black bg-gray-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >

      <div className="flex min-w-0 items-start gap-3">

        <input
          type="radio"
          name="shippingMethod"
          value={value}
          checked={selected}
          onChange={() =>
            onChange(value)
          }
          className="mt-1 h-4 w-4"
        />

        <div>

          <p className="text-sm font-semibold text-gray-900">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            {description}
          </p>

        </div>
      </div>

      <span className="shrink-0 text-sm font-semibold text-gray-900">
        {price}
      </span>

    </label>
  )
}


/* ============================================================
   PAYMENT OPTION
============================================================ */

function PaymentOption({
  value,
  selected,
  onChange,
  title,
  description,
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
        selected
          ? 'border-black bg-gray-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >

      <input
        type="radio"
        name="paymentMethod"
        value={value}
        checked={selected}
        onChange={() =>
          onChange(value)
        }
        className="mt-1 h-4 w-4"
      />

      <div>

        <p className="text-sm font-semibold text-gray-900">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          {description}
        </p>

      </div>
    </label>
  )
}


/* ============================================================
   ORDER SUMMARY
============================================================ */

function OrderSummary({
  cartItems,
  subtotal,
  shipping,
  total,
  sizeData,
  step,
  t,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="border-b border-gray-100 p-5 sm:p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="text-lg font-bold text-gray-900">
              {t('orderReview')}
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {cartItems.length}{' '}
              {t('productsFound')}
            </p>

          </div>

          <Package className="h-5 w-5 text-gray-400" />

        </div>
      </div>

      <div className="max-h-[520px] space-y-4 overflow-y-auto p-5 sm:p-6">

        {cartItems.map((item) => {
          const key =
            getItemKey(item)

          const currentSizeData =
            sizeData[key] ||
            item.sizeData ||
            createDefaultSizeData(
              item,
            )

          const image =
            getProductImage(item)

          const lineTotal =
            Number(item.price || 0) *
            Number(item.quantity || 1)

          return (
            <div
              key={key}
              className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
            >

              <div className="flex gap-3">

                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">

                  {image ? (
                    <img
                      src={image}
                      alt={
                        item.name ||
                        'Product'
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Package className="h-5 w-5 text-gray-400" />
                    </div>
                  )}

                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <h3 className="truncate text-sm font-semibold text-gray-900">
                        {item.name}
                      </h3>

                      {(item.sellerName ||
                        item.seller) && (
                        <p className="mt-1 truncate text-xs text-gray-500">
                          {item.sellerName ||
                            item.seller}
                        </p>
                      )}

                      <p className="mt-1 text-xs text-gray-500">
                        {t('quantity')}:{' '}
                        {item.quantity}
                      </p>

                    </div>

                    <span className="shrink-0 text-sm font-semibold text-gray-900">
                      €{lineTotal.toFixed(2)}
                    </span>

                  </div>

                  <OrderSizeSummary
                    item={item}
                    sizeData={
                      currentSizeData
                    }
                    t={t}
                  />

                </div>
              </div>
            </div>
          )
        })}

      </div>

      <div className="border-t border-gray-100 p-5 sm:p-6">

        <div className="space-y-3 text-sm">

          <div className="flex items-center justify-between gap-4">

            <span className="text-gray-500">
              {t('subtotal')}
            </span>

            <span className="font-medium text-gray-900">
              €{Number(
                subtotal || 0,
              ).toFixed(2)}
            </span>

          </div>

          <div className="flex items-center justify-between gap-4">

            <span className="text-gray-500">
              {t('shipping')}
            </span>

            <span className="font-medium text-gray-900">
              {Number(
                shipping || 0,
              ) === 0
                ? 'Free'
                : `€${Number(
                    shipping || 0,
                  ).toFixed(2)}`}
            </span>

          </div>

        </div>

        <div className="my-5 h-px bg-gray-100" />

        <div className="flex items-end justify-between gap-4">

          <span className="text-base font-bold text-gray-900">
            {t('total')}
          </span>

          <span className="text-2xl font-black tracking-tight text-gray-900">
            €{Number(
              total || 0,
            ).toFixed(2)}
          </span>

        </div>

        <div className="mt-5 rounded-xl bg-gray-50 p-4">

          <div className="flex items-center gap-3">

            <LockKeyhole className="h-5 w-5 shrink-0 text-gray-600" />

            <div>

              <p className="text-xs font-semibold text-gray-900">
                {t('securePurchase')}
              </p>

              <p className="mt-1 text-[11px] leading-4 text-gray-500">
                {t('secureCheckout')}
              </p>

            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">

          <TrustItem
            icon={
              <ShieldCheck className="h-4 w-4" />
            }
            text={t(
              'securePurchase',
            )}
          />

          <TrustItem
            icon={
              <Truck className="h-4 w-4" />
            }
            text={t('shipping')}
          />

          <TrustItem
            icon={
              <CheckCircle2 className="h-4 w-4" />
            }
            text={t(
              'returnInformation',
            )}
          />

        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">

          <span>
            {t('checkoutInformation')}
          </span>

          <span>•</span>

          <span>
            {step}/3
          </span>

        </div>

      </div>
    </div>
  )
}


/* ============================================================
   TRUST ITEM
============================================================ */

function TrustItem({
  icon,
  text,
}) {
  return (
    <div className="flex flex-col items-center gap-1 text-center text-gray-500">

      {icon}

      <span className="text-[10px] leading-4">
        {text}
      </span>

    </div>
  )
}


export default Checkout