
import { useState } from 'react'

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

const API_URL =
  'https://fegegta-server.onrender.com/api'

/* ============================================================
   PRODUCT TYPE
============================================================ */

function getProductType(item) {
  const rawType =
    item?.productType ||
    item?.type ||
    ''

  const type = String(rawType)
    .toLowerCase()
    .trim()

  if (
    [
      'women',
      'woman',
      'female',
      'women-clothing',
      'women clothing',
      'womens-clothing',
    ].includes(type)
  ) {
    return 'women-clothing'
  }

  if (
    [
      'men',
      'man',
      'male',
      'men-clothing',
      'men clothing',
      'mens-clothing',
    ].includes(type)
  ) {
    return 'men-clothing'
  }

  if (
    [
      'shoe',
      'shoes',
      'footwear',
    ].includes(type)
  ) {
    return 'shoes'
  }

  if (
    [
      'bag',
      'bags',
      'handbag',
      'handbags',
    ].includes(type)
  ) {
    return 'bags'
  }

  const category = String(
    item?.category || '',
  ).toLowerCase()

  const name = String(
    item?.name || '',
  ).toLowerCase()

  const combined = `${category} ${name}`

  if (
    combined.includes('women') ||
    combined.includes('woman') ||
    combined.includes('dress') ||
    combined.includes('skirt') ||
    combined.includes('blouse') ||
    combined.includes('female')
  ) {
    return 'women-clothing'
  }

  if (
    combined.includes('men') ||
    combined.includes('man') ||
    combined.includes('shirt') ||
    combined.includes('trouser') ||
    combined.includes('suit') ||
    combined.includes('male')
  ) {
    return 'men-clothing'
  }

  if (
    combined.includes('shoe') ||
    combined.includes('footwear')
  ) {
    return 'shoes'
  }

  if (
    combined.includes('bag') ||
    combined.includes('handbag')
  ) {
    return 'bags'
  }

  return 'other'
}

/* ============================================================
   ITEM KEY
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
  const type = getProductType(item)

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
   PRODUCT IMAGE
============================================================ */

function getProductImage(item) {
  if (typeof item?.image === 'string') {
    return item.image
  }

  if (
    item?.image &&
    typeof item.image === 'object' &&
    item.image.url
  ) {
    return item.image.url
  }

  if (
    Array.isArray(item?.images) &&
    item.images.length > 0
  ) {
    const firstImage = item.images[0]

    if (typeof firstImage === 'string') {
      return firstImage
    }

    if (
      firstImage &&
      typeof firstImage === 'object' &&
      firstImage.url
    ) {
      return firstImage.url
    }
  }

  if (
    typeof item?.thumbnail === 'string'
  ) {
    return item.thumbnail
  }

  return ''
}

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

  /* ==========================================================
     REAL SHIPPING STATE
  ========================================================== */

  const [shippingMethod, setShippingMethod] =
    useState('')

  const [shippingRates, setShippingRates] =
    useState([])

  const [selectedShippingRate, setSelectedShippingRate] =
    useState(null)

  const [isLoadingShippingRates, setIsLoadingShippingRates] =
    useState(false)

  const [shippingError, setShippingError] =
    useState('')

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

  /* ==========================================================
     SHIPPING PRICE
  ========================================================== */

  const shippingPrice = Number(
    selectedShippingRate?.price || 0,
  )

  const finalTotal =
    Number(subtotal || 0) +
    shippingPrice

  /* ==========================================================
     FORM HANDLERS
  ========================================================== */

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

    if (
      [
        'address',
        'city',
        'state',
        'postalCode',
        'country',
      ].includes(name)
    ) {
      setShippingRates([])
      setSelectedShippingRate(null)
      setShippingError('')
    }
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

  /* ==========================================================
     STEP 1 VALIDATION
  ========================================================== */

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

    if (!shippingMethod) {
      nextErrors.shippingMethod =
        'Please select DHL or FedEx.'
    }

    if (!selectedShippingRate) {
      nextErrors.shippingRate =
        'Please calculate and select a shipping rate.'
    }

    setErrors(nextErrors)

    return (
      Object.keys(nextErrors).length === 0
    )
  }

  /* ==========================================================
     GET REAL SHIPPING RATES
  ========================================================== */

  const getShippingRates = async () => {
    if (!shippingMethod) {
      setShippingError(
        'Please select DHL or FedEx first.',
      )
      return
    }

    if (!formData.country.trim()) {
      setShippingError(
        'Please enter your shipping country first.',
      )
      return
    }

    if (!formData.city.trim()) {
      setShippingError(
        'Please enter your city first.',
      )
      return
    }

    if (!formData.postalCode.trim()) {
      setShippingError(
        'Please enter your postal code first.',
      )
      return
    }

    if (!formData.address.trim()) {
      setShippingError(
        'Please enter your shipping address first.',
      )
      return
    }

    setIsLoadingShippingRates(true)
    setShippingError('')
    setShippingRates([])
    setSelectedShippingRate(null)

    try {
      const token = getToken()

      if (!token) {
        throw new Error(
          'Please login before calculating shipping.',
        )
      }

      const items = cartItems.map(
        (item) => ({
          product:
            item.product ||
            item.productId ||
            item.id,

          quantity:
            Number(item.quantity) || 1,
        }),
      )

      const response = await fetch(
        `${API_URL}/shipping/rates`,
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            carrier:
              shippingMethod,

            destination: {
              firstName:
                formData.firstName.trim(),

              lastName:
                formData.lastName.trim(),

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

              phone:
                formData.phone.trim(),

              email:
                formData.email.trim(),
            },

            items,
          }),
        },
      )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Unable to calculate shipping.',
        )
      }

      const rates =
        Array.isArray(data.rates)
          ? data.rates
          : []

      if (!rates.length) {
        throw new Error(
          'No shipping rates are available for this destination.',
        )
      }

      setShippingRates(rates)

      setSelectedShippingRate(
        rates[0],
      )

      setErrors((previous) => ({
        ...previous,
        shippingMethod: '',
        shippingRate: '',
        submit: '',
      }))
    } catch (error) {
      console.error(
        'Shipping rate error:',
        error,
      )

      setShippingError(
        error.message ||
          'Unable to calculate shipping.',
      )
    } finally {
      setIsLoadingShippingRates(false)
    }
  }

  /* ==========================================================
     STEP 2 VALIDATION
  ========================================================== */

  const validateStepTwo = () => {
    const nextErrors = {}

    cartItems.forEach((item) => {
      const key = getItemKey(item)

      const data =
        sizeData[key] ||
        item.sizeData ||
        createDefaultSizeData(item)

      const type =
        data.type ||
        getProductType(item)

      if (type === 'other') {
        return
      }

      if (
        type === 'women-clothing'
      ) {
        if (!data.size) {
          nextErrors[`size-${key}`] =
            t('requiredField')
          return
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
                !String(
                  data.measurements?.[
                    field
                  ] ?? '',
                ).trim(),
            )

          if (missing) {
            nextErrors[`size-${key}`] =
              t('requiredField')
          }
        }
      }

      if (
        type === 'men-clothing'
      ) {
        if (!data.size) {
          nextErrors[`size-${key}`] =
            t('requiredField')
          return
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
                !String(
                  data.measurements?.[
                    field
                  ] ?? '',
                ).trim(),
            )

          if (missing) {
            nextErrors[`size-${key}`] =
              t('requiredField')
          }
        }
      }

      if (type === 'shoes') {
        if (
          !data.sizeSystem ||
          !data.size ||
          !String(
            data.footLength || '',
          ).trim()
        ) {
          nextErrors[`size-${key}`] =
            t('requiredField')
        }
      }

      if (type === 'bags') {
        if (!data.bagSize) {
          nextErrors[`size-${key}`] =
            t('requiredField')
          return
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
              !String(
                data.measurements?.[
                  field
                ] ?? '',
              ).trim(),
          )

        if (missing) {
          nextErrors[`size-${key}`] =
            t('requiredField')
        }
      }
    })

    setErrors(nextErrors)

    return (
      Object.keys(nextErrors).length === 0
    )
  }

  /* ==========================================================
     STEP 3 VALIDATION
  ========================================================== */

  const validateStepThree = () => {
    const nextErrors = {}

    if (!paymentMethod) {
      nextErrors.paymentMethod =
        t('requiredField')
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
          t('requiredField')
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

  /* ==========================================================
     NAVIGATION
  ========================================================== */

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

  /* ==========================================================
     PLACE ORDER
  ========================================================== */

  const handlePlaceOrder = async () => {
    if (!validateStepThree()) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      return
    }

    if (!selectedShippingRate) {
      setErrors((previous) => ({
        ...previous,
        submit:
          'Please select a shipping option before placing your order.',
      }))

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      return
    }

    setIsSubmitting(true)

    setErrors((previous) => ({
      ...previous,
      submit: '',
    }))

    try {
      const token = getToken()

      if (!token) {
        throw new Error(
          'Your session has expired. Please login again.',
        )
      }

      const orderItems =
        cartItems.map((item) => {
          const key =
            getItemKey(item)

          const currentSizeData =
            sizeData[key] ||
            item.sizeData ||
            createDefaultSizeData(
              item,
            )

          return {
            product:
              item.product ||
              item.productId ||
              item.id,

            quantity:
              Number(item.quantity) ||
              1,

            sizeData: {
              ...currentSizeData,

              measurements:
                currentSizeData.measurements
                  ? {
                      ...currentSizeData.measurements,
                    }
                  : undefined,
            },

            name: item.name || '',

            image:
              getProductImage(item),

            price:
              Number(item.price) || 0,
          }
        })

      const customer = {
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

      const orderData = {
        customer,

        shipping: {
          carrier:
            selectedShippingRate?.carrier ||
            shippingMethod,

          service:
            selectedShippingRate?.serviceName ||
            '',

          rateId:
            selectedShippingRate?.id ||
            '',

          price:
            Number(
              selectedShippingRate?.price ||
                0,
            ),

          currency:
            selectedShippingRate?.currency ||
            'EUR',

          estimatedDelivery:
            selectedShippingRate?.estimatedDelivery ||
            '',
        },

        paymentMethod,

        items: orderItems,

        subtotal:
          Number(subtotal || 0),

        total:
          Number(finalTotal || 0),
      }

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
            'Unable to place order.',
        )
      }

      clearCart()

      navigate(
        `/order-success/${
          data.order?._id ||
          data.order?.id ||
          data._id ||
          ''
        }`,
      )
    } catch (error) {
      console.error(
        'Place order error:',
        error,
      )

      setErrors((previous) => ({
        ...previous,
        submit:
          error.message ||
          'Unable to place your order.',
      }))

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ==========================================================
     EMPTY CART
  ========================================================== */

  if (!cartItems.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-16">
          <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <Package className="mx-auto h-12 w-12 text-gray-300" />

            <h1 className="mt-5 text-2xl font-bold text-gray-900">
              {t('cartEmpty')}
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {t('cartEmptyDescription')}
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              {t('continueShopping')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  /* ==========================================================
     MAIN
  ========================================================== */

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />

            {t('backToCart')}
          </Link>

          <div className="flex items-center gap-2">
            <LockKeyhole className="h-4 w-4 text-gray-500" />

            <span className="text-sm font-semibold text-gray-900">
              {t('secureCheckout')}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
            {t('checkout')}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {t('checkoutInformation')}
          </p>
        </div>

        <CheckoutProgress
          step={step}
          t={t}
        />

        {errors.submit && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
            {errors.submit}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* ==================================================
              LEFT
          ================================================== */}

          <div className="space-y-6">
            {/* ==================================================
                STEP 1
            ================================================== */}

            {step === 1 && (
              <>
                {/* Customer information */}

                <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                  <SectionHeader
                    icon={
                      <MapPin className="h-5 w-5 text-gray-700" />
                    }
                    title={t(
                      'checkoutInformation',
                    )}
                    description={t(
                      'checkoutInformation',
                    )}
                  />

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <InputField
                      label={t(
                        'firstName',
                      )}
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
                      label={t(
                        'lastName',
                      )}
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
                      label={t(
                        'email',
                      )}
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
                      label={t(
                        'phone',
                      )}
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

                {/* Shipping address */}

                <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                  <SectionHeader
                    icon={
                      <MapPin className="h-5 w-5 text-gray-700" />
                    }
                    title={t(
                      'shippingAddress',
                    )}
                    description="Enter the complete address where your order should be delivered."
                  />

                  <div className="mt-6 space-y-4">
                    <InputField
                      label={t(
                        'address',
                      )}
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

                    <InputField
                      label={t(
                        'apartment',
                      )}
                      name="apartment"
                      value={
                        formData.apartment
                      }
                      onChange={
                        handleChange
                      }
                      error={
                        errors.apartment
                      }
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <InputField
                        label={t(
                          'city',
                        )}
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
                          'state',
                        )}
                        name="state"
                        value={
                          formData.state
                        }
                        onChange={
                          handleChange
                        }
                        error={
                          errors.state
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
                        label={t(
                          'country',
                        )}
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
                  </div>
                </section>

                {/* ==================================================
                    REAL SHIPPING
                ================================================== */}

                <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                  <SectionHeader
                    icon={
                      <Truck className="h-5 w-5 text-gray-700" />
                    }
                    title={t(
                      'shippingMethod',
                    )}
                    description="Choose your shipping carrier and calculate the current shipping price."
                  />

                  <div className="mt-6 space-y-3">
                    <ShippingOption
                      value="dhl"
                      selected={
                        shippingMethod ===
                        'dhl'
                      }
                      onChange={(
                        value,
                      ) => {
                        setShippingMethod(
                          value,
                        )

                        setShippingRates(
                          [],
                        )

                        setSelectedShippingRate(
                          null,
                        )

                        setShippingError(
                          '',
                        )

                        setErrors(
                          (previous) => ({
                            ...previous,
                            shippingMethod:
                              '',
                            shippingRate:
                              '',
                            submit: '',
                          }),
                        )
                      }}
                      title="DHL Express"
                      description="Get a live DHL shipping quote based on your products and delivery address."
                      price={
                        shippingMethod ===
                          'dhl' &&
                        selectedShippingRate
                          ? `${selectedShippingRate.currency || 'EUR'} ${Number(
                              selectedShippingRate.price,
                            ).toFixed(2)}`
                          : 'Get quote'
                      }
                    />

                    <ShippingOption
                      value="fedex"
                      selected={
                        shippingMethod ===
                        'fedex'
                      }
                      onChange={(
                        value,
                      ) => {
                        setShippingMethod(
                          value,
                        )

                        setShippingRates(
                          [],
                        )

                        setSelectedShippingRate(
                          null,
                        )

                        setShippingError(
                          '',
                        )

                        setErrors(
                          (previous) => ({
                            ...previous,
                            shippingMethod:
                              '',
                            shippingRate:
                              '',
                            submit: '',
                          }),
                        )
                      }}
                      title="FedEx"
                      description="Get a live FedEx shipping quote based on your products and delivery address."
                      price={
                        shippingMethod ===
                          'fedex' &&
                        selectedShippingRate
                          ? `${selectedShippingRate.currency || 'EUR'} ${Number(
                              selectedShippingRate.price,
                            ).toFixed(2)}`
                          : 'Get quote'
                      }
                    />
                  </div>

                  {shippingMethod && (
                    <button
                      type="button"
                      onClick={
                        getShippingRates
                      }
                      disabled={
                        isLoadingShippingRates
                      }
                      className="mt-4 inline-flex h-12 items-center justify-center rounded-xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isLoadingShippingRates
                        ? 'Calculating shipping...'
                        : 'Calculate Shipping'}
                    </button>
                  )}

                  {errors.shippingMethod && (
                    <p className="mt-3 text-sm text-red-600">
                      {
                        errors.shippingMethod
                      }
                    </p>
                  )}

                  {shippingError && (
                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {shippingError}
                    </div>
                  )}

                  {shippingRates.length >
                    0 && (
                    <div className="mt-4 space-y-3">
                      {shippingRates.map(
                        (rate) => (
                          <label
                            key={
                              rate.id
                            }
                            className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 transition ${
                              selectedShippingRate?.id ===
                              rate.id
                                ? 'border-black bg-gray-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <input
                                type="radio"
                                name="shippingRate"
                                checked={
                                  selectedShippingRate?.id ===
                                  rate.id
                                }
                                onChange={() => {
                                  setSelectedShippingRate(
                                    rate,
                                  )

                                  setErrors(
                                    (
                                      previous,
                                    ) => ({
                                      ...previous,
                                      shippingRate:
                                        '',
                                      submit:
                                        '',
                                    }),
                                  )
                                }}
                                className="mt-1 h-4 w-4"
                              />

                              <div>
                                <p className="text-sm font-semibold text-gray-900">
                                  {rate.carrierName ||
                                    rate.carrier}
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                  {
                                    rate.serviceName
                                  }
                                </p>

                                {rate.estimatedDelivery && (
                                  <p className="mt-1 text-xs text-gray-500">
                                    Estimated delivery:{' '}
                                    {
                                      rate.estimatedDelivery
                                    }
                                  </p>
                                )}
                              </div>
                            </div>

                            <span className="shrink-0 text-sm font-bold text-gray-900">
                              {rate.currency ||
                                'EUR'}{' '}
                              {Number(
                                rate.price ||
                                  0,
                              ).toFixed(
                                2,
                              )}
                            </span>
                          </label>
                        ),
                      )}
                    </div>
                  )}

                  {errors.shippingRate && (
                    <p className="mt-3 text-sm text-red-600">
                      {
                        errors.shippingRate
                      }
                    </p>
                  )}
                </section>

                <button
                  type="button"
                  onClick={
                    handleNextFromStepOne
                  }
                  className="flex h-13 w-full items-center justify-center rounded-xl bg-black px-6 text-sm font-bold text-white transition hover:bg-gray-800"
                >
                  Continue
                </button>
              </>
            )}

            {/* ==================================================
                STEP 2
            ================================================== */}

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
                      'customMeasurementsDescription',
                    )}
                  />

                  <div className="mt-6 space-y-5">
                    {cartItems.map(
                      (item) => {
                        const key =
                          getItemKey(
                            item,
                          )

                        const currentSizeData =
                          sizeData[
                            key
                          ] ||
                          item.sizeData ||
                          createDefaultSizeData(
                            item,
                          )

                        return (
                          <ProductSizeEditor
                            key={key}
                            item={item}
                            sizeData={
                              currentSizeData
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

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={
                      handleBack
                    }
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:text-gray-900"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleNextFromStepTwo
                    }
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-gray-800"
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {/* ==================================================
                STEP 3
            ================================================== */}

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
                      'secureCheckout',
                    )}
                  />

                  <div className="mt-6 space-y-3">
                    <PaymentOption
                      value="card"
                      selected={
                        paymentMethod ===
                        'card'
                      }
                      onChange={(
                        value,
                      ) => {
                        setPaymentMethod(
                          value,
                        )

                        setErrors(
                          (
                            previous,
                          ) => ({
                            ...previous,
                            paymentMethod:
                              '',
                            submit: '',
                          }),
                        )
                      }}
                      title="Credit / Debit Card"
                      description="Pay securely using your credit or debit card."
                    />
                  </div>

                  {errors.paymentMethod && (
                    <p className="mt-3 text-sm text-red-600">
                      {
                        errors.paymentMethod
                      }
                    </p>
                  )}

                  {paymentMethod ===
                    'card' && (
                    <div className="mt-5 grid gap-4">
                      <InputField
                        label="Cardholder name"
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

                      <InputField
                        label="Card number"
                        name="cardNumber"
                        value={
                          cardData.cardNumber
                        }
                        onChange={
                          handleCardChange
                        }
                        error={
                          errors.cardNumber
                        }
                        required
                      />

                      <div className="grid gap-4 sm:grid-cols-2">
                        <InputField
                          label="Expiry date"
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
                          placeholder="MM/YY"
                          required
                        />

                        <InputField
                          label="CVC"
                          name="cvc"
                          value={
                            cardData.cvc
                          }
                          onChange={
                            handleCardChange
                          }
                          error={
                            errors.cvc
                          }
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-6 rounded-xl bg-gray-50 p-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />

                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {t(
                            'securePurchase',
                          )}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          {t(
                            'secureCheckout',
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={
                      handleBack
                    }
                    disabled={
                      isSubmitting
                    }
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={
                      handlePlaceOrder
                    }
                    disabled={
                      isSubmitting
                    }
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-black px-6 text-sm font-bold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting
                      ? 'Processing...'
                      : 'Place Order'}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* ==================================================
              ORDER SUMMARY
          ================================================== */}

          <div className="lg:sticky lg:top-6 lg:self-start">
            <OrderSummary
              cartItems={
                cartItems
              }
              subtotal={
                subtotal
              }
              shipping={
                shippingPrice
              }
              total={
                finalTotal
              }
              sizeData={
                sizeData
              }
              step={step}
              t={t}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

// /* ============================================================
//    PRODUCT SIZE EDITOR
// ============================================================ */

// function ProductSizeEditor({
//   item,
//   sizeData,
//   error,
//   t,
//   onChange,
//   onMeasurementChange,
// }) {
//   const type =
//     sizeData?.type ||
//     getProductType(item)

//   if (type === 'other') {
//     return (
//       <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
//         <div className="flex items-center gap-4">
//           <ProductImage
//             item={item}
//           />

//           <div className="min-w-0">
//             <h3 className="truncate text-sm font-semibold text-gray-900">
//               {item.name}
//             </h3>

//             <p className="mt-1 text-xs text-gray-500">
//               {t(
//                 'noSizeRequired',
//               )}
//             </p>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="rounded-2xl border border-gray-200 bg-white">
//       <div className="flex items-center gap-4 border-b border-gray-100 p-4">
//         <ProductImage
//           item={item}
//         />

//         <div className="min-w-0 flex-1">
//           <h3 className="truncate text-sm font-semibold text-gray-900">
//             {item.name}
//           </h3>

//           <p className="mt-1 text-xs text-gray-500">
//             {getTypeLabel(
//               type,
//               t,
//             )}
//           </p>

//           <p className="mt-1 text-xs text-gray-500">
//             {t('quantity')}:{' '}
//             {item.quantity}
//           </p>
//         </div>
//       </div>

//       <div className="p-4 sm:p-5">
//         {error && (
//           <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
//             {error}
//           </div>
//         )}

//         {type ===
//           'women-clothing' && (
//           <WomenSizeForm
//             sizeData={
//               sizeData
//             }
//             t={t}
//             onChange={
//               onChange
//             }
//             onMeasurementChange={
//               onMeasurementChange
//             }
//           />
//         )}

//         {type ===
//           'men-clothing' && (
//           <MenSizeForm
//             sizeData={
//               sizeData
//             }
//             t={t}
//             onChange={
//               onChange
//             }
//             onMeasurementChange={
//               onMeasurementChange
//             }
//           />
//         )}

//         {type ===
//           'shoes' && (
//           <ShoesSizeForm
//             sizeData={
//               sizeData
//             }
//             t={t}
//             onChange={
//               onChange
//             }
//           />
//         )}

//         {type === 'bags' && (
//           <BagSizeForm
//             sizeData={
//               sizeData
//             }
//             t={t}
//             onChange={
//               onChange
//             }
//             onMeasurementChange={
//               onMeasurementChange
//             }
//           />
//         )}
//       </div>
//     </div>
//   )
// }

// /* ============================================================
//    PRODUCT IMAGE
// ============================================================ */

// function ProductImage({ item }) {
//   const image =
//     getProductImage(item)

//   if (!image) {
//     return (
//       <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
//         <Package className="h-6 w-6 text-gray-400" />
//       </div>
//     )
//   }

//   return (
//     <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
//       <img
//         src={image}
//         alt={
//           item.name ||
//           'Product'
//         }
//         className="h-full w-full object-cover"
//         onError={(event) => {
//           event.currentTarget.style.display =
//             'none'
//         }}
//       />
//     </div>
//   )
// }

// /* ============================================================
//    WOMEN SIZE
// ============================================================ */

// function WomenSizeForm({
//   sizeData,
//   t,
//   onChange,
//   onMeasurementChange,
// }) {
//   const sizes = [
//     'XS',
//     'S',
//     'M',
//     'L',
//     'XL',
//     'XXL',
//   ]

//   return (
//     <div className="space-y-6">
//       <div>
//         <p className="mb-3 text-sm font-semibold text-gray-900">
//           {t('womenSize')}
//         </p>

//         <div className="flex flex-wrap gap-2">
//           {sizes.map((size) => (
//             <SizeButton
//               key={size}
//               value={size}
//               selected={
//                 sizeData.size ===
//                 size
//               }
//               onClick={() =>
//                 onChange({
//                   size,
//                 })
//               }
//             />
//           ))}
//         </div>
//       </div>

//       <UnitSelector
//         unit={sizeData.unit}
//         onChange={(unit) =>
//           onChange({ unit })
//         }
//         t={t}
//       />

//       <div>
//         <p className="mb-3 text-sm font-semibold text-gray-900">
//           {t(
//             'customMeasurements',
//           )}
//         </p>

//         <div className="grid gap-4 sm:grid-cols-2">
//           <MeasurementInput
//             label={t('bust')}
//             value={
//               sizeData.measurements
//                 ?.bust
//             }
//             onChange={(value) =>
//               onMeasurementChange(
//                 'bust',
//                 value,
//               )
//             }
//           />

//           <MeasurementInput
//             label={t('waist')}
//             value={
//               sizeData.measurements
//                 ?.waist
//             }
//             onChange={(value) =>
//               onMeasurementChange(
//                 'waist',
//                 value,
//               )
//             }
//           />

//           <MeasurementInput
//             label={t('hips')}
//             value={
//               sizeData.measurements
//                 ?.hips
//             }
//             onChange={(value) =>
//               onMeasurementChange(
//                 'hips',
//                 value,
//               )
//             }
//           />

//           <MeasurementInput
//             label={t(
//               'shoulder',
//             )}
//             value={
//               sizeData.measurements
//                 ?.shoulder
//             }
//             onChange={(value) =>
//               onMeasurementChange(
//                 'shoulder',
//                 value,
//               )
//             }
//           />

//           <MeasurementInput
//             label={t(
//               'sleeveLength',
//             )}
//             value={
//               sizeData.measurements
//                 ?.sleeveLength
//             }
//             onChange={(value) =>
//               onMeasurementChange(
//                 'sleeveLength',
//                 value,
//               )
//             }
//           />

//           <MeasurementInput
//             label={t(
//               'dressLength',
//             )}
//             value={
//               sizeData.measurements
//                 ?.dressLength
//             }
//             onChange={(value) =>
//               onMeasurementChange(
//                 'dressLength',
//                 value,
//               )
//             }
//           />
//         </div>
//       </div>

//       <CustomMeasurementToggle
//         checked={
//           !!sizeData.customMeasurements
//         }
//         onChange={(checked) =>
//           onChange({
//             customMeasurements:
//               checked,
//           })
//         }
//         t={t}
//       />
//     </div>
//   )
// }

// /* ============================================================
//    MEN SIZE
// ============================================================ */

// function MenSizeForm({
//   sizeData,
//   t,
//   onChange,
//   onMeasurementChange,
// }) {
//   const sizes = [
//     'S',
//     'M',
//     'L',
//     'XL',
//     'XXL',
//   ]

//   return (
//     <div className="space-y-6">
//       <div>
//         <p className="mb-3 text-sm font-semibold text-gray-900">
//           {t('menSize')}
//         </p>

//         <div className="flex flex-wrap gap-2">
//           {sizes.map((size) => (
//             <SizeButton
//               key={size}
//               value={size}
//               selected={
//                 sizeData.size ===
//                 size
//               }
//               onClick={() =>
//                 onChange({
//                   size,
//                 })
//               }
//             />
//           ))}
//         </div>
//       </div>

//       <UnitSelector
//         unit={sizeData.unit}
//         onChange={(unit) =>
//           onChange({ unit })
//         }
//         t={t}
//       />

//       <div>
//         <p className="mb-3 text-sm font-semibold text-gray-900">
//           {t(
//             'customMeasurements',
//           )}
//         </p>

//         <div className="grid gap-4 sm:grid-cols-2">
//           <MeasurementInput
//             label={t('chest')}
//             value={
//               sizeData.measurements
//                 ?.chest
//             }
//             onChange={(value) =>
//               onMeasurementChange(
//                 'chest',
//                 value,
//               )
//             }
//           />

//           <MeasurementInput
//             label={t('waist')}
//             value={
//               sizeData.measurements
//                 ?.waist
//             }
//             onChange={(value) =>
//               onMeasurementChange(
//                 'waist',
//                 value,
//               )
//             }
//           />

//           <MeasurementInput
//             label={t(
//               'shoulder',
//             )}
//             value={
//               sizeData.measurements
//                 ?.shoulder
//             }
//             onChange={(value) =>
//               onMeasurementChange(
//                 'shoulder',
//                 value,
//               )
//             }
//           />

//           <MeasurementInput
//             label={t(
//               'sleeveLength',
//             )}
//             value={
//               sizeData.measurements
//                 ?.sleeveLength
//             }
//             onChange={(value) =>
//               onMeasurementChange(
//                 'sleeveLength',
//                 value,
//               )
//             }
//           />

//           <MeasurementInput
//             label={t(
//               'shirtLength',
//             )}
//             value={
//               sizeData.measurements
//                 ?.shirtLength
//             }
//             onChange={(value) =>
//               onMeasurementChange(
//                 'shirtLength',
//                 value,
//               )
//             }
//           />

//           <MeasurementInput
//             label={t(
//               'trouserWaist',
//             )}
//             value={
//               sizeData.measurements
//                 ?.trouserWaist
//             }
//             onChange={(value) =>
//               onMeasurementChange(
//                 'trouserWaist',
//                 value,
//               )
//             }
//           />

//           <MeasurementInput
//             label={t('inseam')}
//             value={
//               sizeData.measurements
//                 ?.inseam
//             }
//             onChange={(value) =>
//               onMeasurementChange(
//                 'inseam',
//                 value,
//               )
//             }
//           />
//         </div>
//       </div>

//       <CustomMeasurementToggle
//         checked={
//           !!sizeData.customMeasurements
//         }
//         onChange={(checked) =>
//           onChange({
//             customMeasurements:
//               checked,
//           })
//         }
//         t={t}
//       />
//     </div>
//   )
// }

// /* ============================================================
//    SHOES
// ============================================================ */

// function ShoesSizeForm({
//   sizeData,
//   t,
//   onChange,
// }) {
//   const systems = [
//     'EU',
//     'US',
//     'UK',
//   ]

//   const shoeSizes = {
//     EU: [
//       '35',
//       '36',
//       '37',
//       '38',
//       '39',
//       '40',
//       '41',
//       '42',
//       '43',
//       '44',
//       '45',
//       '46',
//       '47',
//     ],

//     US: [
//       '4',
//       '5',
//       '6',
//       '7',
//       '8',
//       '9',
//       '10',
//       '11',
//       '12',
//       '13',
//     ],

//     UK: [
//       '3',
//       '4',
//       '5',
//       '6',
//       '7',
//       '8',
//       '9',
//       '10',
//       '11',
//       '12',
//     ],
//   }

//   const currentSizes =
//     shoeSizes[
//       sizeData.sizeSystem ||
//         'EU'
//     ] || []

//   return (
//     <div className="space-y-6">
//       <div>
//         <p className="mb-3 text-sm font-semibold text-gray-900">
//           {t(
//             'shoeSizeSystem',
//           )}
//         </p>

//         <div className="flex flex-wrap gap-2">
//           {systems.map(
//             (system) => (
//               <SizeButton
//                 key={system}
//                 value={system}
//                 selected={
//                   sizeData.sizeSystem ===
//                   system
//                 }
//                 onClick={() =>
//                   onChange({
//                     sizeSystem:
//                       system,
//                     size: '',
//                   })
//                 }
//               />
//             ),
//           )}
//         </div>
//       </div>

//       <div>
//         <p className="mb-3 text-sm font-semibold text-gray-900">
//           {t('shoeSize')}
//         </p>

//         <div className="flex flex-wrap gap-2">
//           {currentSizes.map(
//             (size) => (
//               <SizeButton
//                 key={size}
//                 value={size}
//                 selected={
//                   sizeData.size ===
//                   size
//                 }
//                 onClick={() =>
//                   onChange({
//                     size,
//                   })
//                 }
//               />
//             ),
//           )}
//         </div>
//       </div>

//       <div>
//         <div className="mb-3">
//           <p className="text-sm font-semibold text-gray-900">
//             {t(
//               'footLength',
//             )}
//           </p>

//           <p className="mt-1 text-xs text-gray-500">
//             {t(
//               'footLengthDescription',
//             )}
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <input
//             type="number"
//             min="0"
//             step="0.1"
//             value={
//               sizeData.footLength ||
//               ''
//             }
//             onChange={(
//               event,
//             ) =>
//               onChange({
//                 footLength:
//                   event.target
//                     .value,
//               })
//             }
//             className="h-12 min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
//             placeholder="0.0"
//           />

//           <UnitSelector
//             unit={
//               sizeData.unit
//             }
//             onChange={(unit) =>
//               onChange({
//                 unit,
//               })
//             }
//             t={t}
//           />
//         </div>
//       </div>

//       {(sizeData.size ||
//         sizeData.footLength) && (
//         <div className="rounded-xl bg-gray-50 p-4">
//           <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
//             {t(
//               'selectedSize',
//             )}
//           </p>

//           <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-gray-700">
//             {sizeData.size && (
//               <span>
//                 {t('shoeSize')}:{' '}
//                 {sizeData.size}
//               </span>
//             )}

//             {sizeData.sizeSystem && (
//               <span>
//                 {t(
//                   'shoeSizeSystem',
//                 )}
//                 :{' '}
//                 {
//                   sizeData.sizeSystem
//                 }
//               </span>
//             )}

//             {sizeData.footLength && (
//               <span>
//                 {t(
//                   'footLength',
//                 )}
//                 :{' '}
//                 {
//                   sizeData.footLength
//                 }{' '}
//                 {sizeData.unit ||
//                   'cm'}
//               </span>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// /* ============================================================
//    BAG SIZE
// ============================================================ */

// function BagSizeForm({
//   sizeData,
//   t,
//   onChange,
//   onMeasurementChange,
// }) {
//   const sizes = [
//     'small',
//     'medium',
//     'large',
//   ]

//   return (
//     <div className="space-y-6">
//       <div>
//         <p className="mb-3 text-sm font-semibold text-gray-900">
//           {t('bagSize')}
//         </p>

//         <div className="flex flex-wrap gap-2">
//           {sizes.map((size) => (
//             <SizeButton
//               key={size}
//               value={t(size)}
//               selected={
//                 sizeData.bagSize?.toLowerCase() ===
//                 size
//               }
//               onClick={() =>
//                 onChange({
//                   bagSize:
//                     size
//                       .charAt(0)
//                       .toUpperCase() +
//                     size.slice(1),
//                 })
//               }
//             />
//           ))}
//         </div>
//       </div>

//       <UnitSelector
//         unit={sizeData.unit}
//         onChange={(unit) =>
//           onChange({ unit })
//         }
//         t={t}
//       />

//       <div className="grid gap-4 sm:grid-cols-2">
//         <MeasurementInput
//           label={t('width')}
//           value={
//             sizeData.measurements
//               ?.width
//           }
//           onChange={(value) =>
//             onMeasurementChange(
//               'width',
//               value,
//             )
//           }
//         />

//         <MeasurementInput
//           label={t('height')}
//           value={
//             sizeData.measurements
//               ?.height
//           }
//           onChange={(value) =>
//             onMeasurementChange(
//               'height',
//               value,
//             )
//           }
//         />

//         <MeasurementInput
//           label={t('depth')}
//           value={
//             sizeData.measurements
//               ?.depth
//           }
//           onChange={(value) =>
//             onMeasurementChange(
//               'depth',
//               value,
//             )
//           }
//         />

//         <MeasurementInput
//           label={t(
//             'strapLength',
//           )}
//           value={
//             sizeData.measurements
//               ?.strapLength
//           }
//           onChange={(value) =>
//             onMeasurementChange(
//               'strapLength',
//               value,
//             )
//           }
//         />
//       </div>
//     </div>
//   )
// }

// /* ============================================================
//    UNIT SELECTOR
// ============================================================ */

// function UnitSelector({
//   unit,
//   onChange,
//   t,
// }) {
//   return (
//     <div>
//       <p className="mb-3 text-sm font-semibold text-gray-900">
//         {t(
//           'measurementUnit',
//         )}
//       </p>

//       <div className="inline-flex rounded-xl border border-gray-200 bg-gray-50 p-1">
//         <button
//           type="button"
//           onClick={() =>
//             onChange('cm')
//           }
//           className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
//             unit === 'cm'
//               ? 'bg-black text-white'
//               : 'text-gray-600 hover:text-gray-900'
//           }`}
//         >
//           {t('centimeters')}
//         </button>

//         <button
//           type="button"
//           onClick={() =>
//             onChange('in')
//           }
//           className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
//             unit === 'in'
//               ? 'bg-black text-white'
//               : 'text-gray-600 hover:text-gray-900'
//           }`}
//         >
//           {t('inches')}
//         </button>
//       </div>
//     </div>
//   )
// }

// /* ============================================================
//    SIZE BUTTON
// ============================================================ */

// function SizeButton({
//   value,
//   selected,
//   onClick,
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`inline-flex h-11 min-w-11 items-center justify-center gap-1 rounded-xl border px-4 text-sm font-semibold transition ${
//         selected
//           ? 'border-black bg-black text-white'
//           : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
//       }`}
//     >
//       {selected && (
//         <Check className="h-3.5 w-3.5" />
//       )}

//       {value}
//     </button>
//   )
// }

// /* ============================================================
//    MEASUREMENT INPUT
// ============================================================ */

// function MeasurementInput({
//   label,
//   value,
//   onChange,
// }) {
//   return (
//     <div>
//       <label className="mb-2 block text-sm font-medium text-gray-800">
//         {label}
//       </label>

//       <input
//         type="number"
//         min="0"
//         step="0.1"
//         value={value ?? ''}
//         onChange={(event) =>
//           onChange(
//             event.target.value,
//           )
//         }
//         className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
//         placeholder="0.0"
//       />
//     </div>
//   )
// }

// /* ============================================================
//    CUSTOM MEASUREMENT TOGGLE
// ============================================================ */

// function CustomMeasurementToggle({
//   checked,
//   onChange,
//   t,
// }) {
//   return (
//     <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
//       <input
//         type="checkbox"
//         checked={checked}
//         onChange={(event) =>
//           onChange(
//             event.target.checked,
//           )
//         }
//         className="mt-1 h-4 w-4 rounded border-gray-300"
//       />

//       <span>
//         <span className="block text-sm font-semibold text-gray-900">
//           {t(
//             'customMeasurements',
//           )}
//         </span>

//         <span className="mt-1 block text-xs leading-5 text-gray-500">
//           {t(
//             'customMeasurementsDescription',
//           )}
//         </span>
//       </span>
//     </label>
//   )
// }

// /* ============================================================
//    TYPE LABEL
// ============================================================ */

// function getTypeLabel(type, t) {
//   if (
//     type ===
//     'women-clothing'
//   ) {
//     return t(
//       'womenClothing',
//     )
//   }

//   if (
//     type ===
//     'men-clothing'
//   ) {
//     return t(
//       'menClothing',
//     )
//   }

//   if (type === 'shoes') {
//     return t('shoes')
//   }

//   if (type === 'bags') {
//     return t('bags')
//   }

//   return ''
// }

// /* ============================================================
//    ORDER SIZE SUMMARY
// ============================================================ */

// function OrderSizeSummary({
//   item,
//   sizeData,
//   t,
// }) {
//   const type =
//     sizeData?.type ||
//     getProductType(item)

//   if (type === 'other') {
//     return null
//   }

//   const values = []

//   if (sizeData?.size) {
//     values.push(
//       `${t('size')}: ${sizeData.size}`,
//     )
//   }

//   if (sizeData?.sizeSystem) {
//     values.push(
//       `${t(
//         'shoeSizeSystem',
//       )}: ${sizeData.sizeSystem}`,
//     )
//   }

//   if (sizeData?.footLength) {
//     values.push(
//       `${t(
//         'footLength',
//       )}: ${sizeData.footLength} ${
//         sizeData.unit || 'cm'
//       }`,
//     )
//   }

//   if (sizeData?.bagSize) {
//     values.push(
//       `${t('bagSize')}: ${t(
//         sizeData.bagSize.toLowerCase(),
//       )}`,
//     )
//   }

//   const measurements =
//     sizeData?.measurements ||
//     {}

//   const measurementLabels = {
//     bust: 'bust',
//     waist: 'waist',
//     hips: 'hips',
//     shoulder: 'shoulder',
//     sleeveLength:
//       'sleeveLength',
//     dressLength:
//       'dressLength',
//     chest: 'chest',
//     shirtLength:
//       'shirtLength',
//     trouserWaist:
//       'trouserWaist',
//     inseam: 'inseam',
//     width: 'width',
//     height: 'height',
//     depth: 'depth',
//     strapLength:
//       'strapLength',
//   }

//   Object.entries(
//     measurementLabels,
//   ).forEach(
//     ([
//       field,
//       translationKey,
//     ]) => {
//       const value =
//         measurements[field]

//       if (
//         value !== undefined &&
//         value !== null &&
//         value !== ''
//       ) {
//         values.push(
//           `${t(
//             translationKey,
//           )}: ${value} ${
//             sizeData.unit ||
//             'cm'
//           }`,
//         )
//       }
//     },
//   )

//   if (!values.length) {
//     return null
//   }

//   return (
//     <div className="mt-3 rounded-xl bg-gray-50 px-3 py-2.5">
//       <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
//         {t(
//           'selectedSize',
//         )}
//       </p>

//       <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
//         {values.map(
//           (value) => (
//             <span
//               key={value}
//               className="text-xs font-medium text-gray-700"
//             >
//               {value}
//             </span>
//           ),
//         )}
//       </div>
//     </div>
//   )
// }

// /* ============================================================
//    CHECKOUT PROGRESS
// ============================================================ */

// function CheckoutProgress({
//   step,
//   t,
// }) {
//   return (
//     <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
//       <div className="flex items-center">
//         <ProgressStep
//           number="1"
//           label={t(
//             'checkoutInformation',
//           )}
//           active={step === 1}
//           completed={step > 1}
//         />

//         <div
//           className={`mx-2 h-px flex-1 sm:mx-4 ${
//             step > 1
//               ? 'bg-black'
//               : 'bg-gray-200'
//           }`}
//         />

//         <ProgressStep
//           number="2"
//           label={t(
//             'sizeAndMeasurements',
//           )}
//           active={step === 2}
//           completed={step > 2}
//         />

//         <div
//           className={`mx-2 h-px flex-1 sm:mx-4 ${
//             step > 2
//               ? 'bg-black'
//               : 'bg-gray-200'
//           }`}
//         />

//         <ProgressStep
//           number="3"
//           label={t(
//             'paymentMethod',
//           )}
//           active={step === 3}
//         />
//       </div>
//     </div>
//   )
// }

// /* ============================================================
//    PROGRESS STEP
// ============================================================ */

// function ProgressStep({
//   number,
//   label,
//   active = false,
//   completed = false,
// }) {
//   return (
//     <div
//       className={`flex shrink-0 items-center gap-2 ${
//         active || completed
//           ? 'text-gray-900'
//           : 'text-gray-400'
//       }`}
//     >
//       <div
//         className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
//           completed
//             ? 'bg-black text-white'
//             : active
//               ? 'bg-black text-white'
//               : 'border border-gray-200 bg-white'
//         }`}
//       >
//         {completed ? (
//           <Check className="h-4 w-4" />
//         ) : (
//           number
//         )}
//       </div>

//       <span className="hidden text-sm font-medium sm:inline">
//         {label}
//       </span>
//     </div>
//   )
// }

// /* ============================================================
//    SECTION HEADER
// ============================================================ */

// function SectionHeader({
//   icon,
//   title,
//   description,
// }) {
//   return (
//     <div className="flex items-start gap-4">
//       <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100">
//         {icon}
//       </div>

//       <div className="min-w-0">
//         <h2 className="text-lg font-bold text-gray-900">
//           {title}
//         </h2>

//         <p className="mt-1 text-sm leading-5 text-gray-500">
//           {description}
//         </p>
//       </div>
//     </div>
//   )
// }

// /* ============================================================
//    INPUT FIELD
// ============================================================ */

// function InputField({
//   label,
//   name,
//   type = 'text',
//   value,
//   onChange,
//   error,
//   required = false,
//   placeholder = '',
// }) {
//   return (
//     <div>
//       <label
//         htmlFor={name}
//         className="mb-2 block text-sm font-medium text-gray-800"
//       >
//         {label}

//         {required && (
//           <span className="ml-1 text-red-500">
//             *
//           </span>
//         )}
//       </label>

//       <input
//         id={name}
//         name={name}
//         type={type}
//         value={value || ''}
//         onChange={onChange}
//         placeholder={placeholder}
//         autoComplete="off"
//         className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
//           error
//             ? 'border-red-400 focus:border-red-400 focus:ring-red-50'
//             : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100'
//         }`}
//       />

//       {error && (
//         <p className="mt-1.5 text-xs text-red-500">
//           {error}
//         </p>
//       )}
//     </div>
//   )
// }

// /* ============================================================
//    SHIPPING OPTION
// ============================================================ */

// function ShippingOption({
//   value,
//   selected,
//   onChange,
//   title,
//   description,
//   price,
// }) {
//   return (
//     <label
//       className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 transition ${
//         selected
//           ? 'border-black bg-gray-50'
//           : 'border-gray-200 hover:border-gray-300'
//       }`}
//     >
//       <div className="flex min-w-0 items-start gap-3">
//         <input
//           type="radio"
//           name="shippingMethod"
//           value={value}
//           checked={selected}
//           onChange={() =>
//             onChange(value)
//           }
//           className="mt-1 h-4 w-4"
//         />

//         <div>
//           <p className="text-sm font-semibold text-gray-900">
//             {title}
//           </p>

//           <p className="mt-1 text-xs leading-5 text-gray-500">
//             {description}
//           </p>
//         </div>
//       </div>

//       <span className="shrink-0 text-sm font-semibold text-gray-900">
//         {price}
//       </span>
//     </label>
//   )
// }

// /* ============================================================
//    PAYMENT OPTION
// ============================================================ */

// function PaymentOption({
//   value,
//   selected,
//   onChange,
//   title,
//   description,
// }) {
//   return (
//     <label
//       className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
//         selected
//           ? 'border-black bg-gray-50'
//           : 'border-gray-200 hover:border-gray-300'
//       }`}
//     >
//       <input
//         type="radio"
//         name="paymentMethod"
//         value={value}
//         checked={selected}
//         onChange={() =>
//           onChange(value)
//         }
//         className="mt-1 h-4 w-4"
//       />

//       <div>
//         <p className="text-sm font-semibold text-gray-900">
//           {title}
//         </p>

//         <p className="mt-1 text-xs leading-5 text-gray-500">
//           {description}
//         </p>
//       </div>
//     </label>
//   )
// }

// /* ============================================================
//    ORDER SUMMARY
// ============================================================ */

// function OrderSummary({
//   cartItems,
//   subtotal,
//   shipping,
//   total,
//   sizeData,
//   step,
//   t,
// }) {
//   return (
//     <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
//       <div className="border-b border-gray-100 p-5 sm:p-6">
//         <div className="flex items-center justify-between gap-4">
//           <div>
//             <h2 className="text-lg font-bold text-gray-900">
//               {t(
//                 'orderReview',
//               )}
//             </h2>

//             <p className="mt-1 text-xs text-gray-500">
//               {cartItems.length}{' '}
//               {t(
//                 'productsFound',
//               )}
//             </p>
//           </div>

//           <Package className="h-5 w-5 text-gray-400" />
//         </div>
//       </div>

//       <div className="max-h-[520px] space-y-4 overflow-y-auto p-5 sm:p-6">
//         {cartItems.map(
//           (item) => {
//             const key =
//               getItemKey(item)

//             const currentSizeData =
//               sizeData[key] ||
//               item.sizeData ||
//               createDefaultSizeData(
//                 item,
//               )

//             const image =
//               getProductImage(item)

//             const lineTotal =
//               Number(
//                 item.price || 0,
//               ) *
//               Number(
//                 item.quantity || 1,
//               )

//             return (
//               <div
//                 key={key}
//                 className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
//               >
//                 <div className="flex gap-3">
//                   <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
//                     {image ? (
//                       <img
//                         src={image}
//                         alt={
//                           item.name ||
//                           'Product'
//                         }
//                         className="h-full w-full object-cover"
//                       />
//                     ) : (
//                       <div className="flex h-full w-full items-center justify-center">
//                         <Package className="h-5 w-5 text-gray-400" />
//                       </div>
//                     )}
//                   </div>

//                   <div className="min-w-0 flex-1">
//                     <div className="flex items-start justify-between gap-3">
//                       <div className="min-w-0">
//                         <h3 className="truncate text-sm font-semibold text-gray-900">
//                           {item.name}
//                         </h3>

//                         {(item.sellerName ||
//                           item.seller) && (
//                           <p className="mt-1 truncate text-xs text-gray-500">
//                             {item.sellerName ||
//                               item.seller}
//                           </p>
//                         )}

//                         <p className="mt-1 text-xs text-gray-500">
//                           {t(
//                             'quantity',
//                           )}
//                           :{' '}
//                           {
//                             item.quantity
//                           }
//                         </p>
//                       </div>

//                       <span className="shrink-0 text-sm font-semibold text-gray-900">
//                         €{lineTotal.toFixed(
//                           2,
//                         )}
//                       </span>
//                     </div>

//                     <OrderSizeSummary
//                       item={item}
//                       sizeData={
//                         currentSizeData
//                       }
//                       t={t}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )
//           },
//         )}
//       </div>

//       <div className="border-t border-gray-100 p-5 sm:p-6">
//         <div className="space-y-3 text-sm">
//           <div className="flex items-center justify-between gap-4">
//             <span className="text-gray-500">
//               {t('subtotal')}
//             </span>

//             <span className="font-medium text-gray-900">
//               €{Number(
//                 subtotal || 0,
//               ).toFixed(2)}
//             </span>
//           </div>

//           <div className="flex items-center justify-between gap-4">
//             <span className="text-gray-500">
//               {t('shipping')}
//             </span>

//             <span className="font-medium text-gray-900">
//               {Number(
//                 shipping || 0,
//               ) === 0
//                 ? 'Free'
//                 : `€${Number(
//                     shipping || 0,
//                   ).toFixed(2)}`}
//             </span>
//           </div>
//         </div>

//         <div className="my-5 h-px bg-gray-100" />

//         <div className="flex items-end justify-between gap-4">
//           <span className="text-base font-bold text-gray-900">
//             {t('total')}
//           </span>

//           <span className="text-2xl font-black tracking-tight text-gray-900">
//             €{Number(
//               total || 0,
//             ).toFixed(2)}
//           </span>
//         </div>

//         <div className="mt-5 rounded-xl bg-gray-50 p-4">
//           <div className="flex items-center gap-3">
//             <LockKeyhole className="h-5 w-5 shrink-0 text-gray-600" />

//             <div>
//               <p className="text-xs font-semibold text-gray-900">
//                 {t(
//                   'securePurchase',
//                 )}
//               </p>

//               <p className="mt-1 text-[11px] leading-4 text-gray-500">
//                 {t(
//                   'secureCheckout',
//                 )}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="mt-5 grid grid-cols-3 gap-3">
//           <TrustItem
//             icon={
//               <ShieldCheck className="h-4 w-4" />
//             }
//             text={t(
//               'securePurchase',
//             )}
//           />

//           <TrustItem
//             icon={
//               <Truck className="h-4 w-4" />
//             }
//             text={t(
//               'shipping',
//             )}
//           />

//           <TrustItem
//             icon={
//               <CheckCircle2 className="h-4 w-4" />
//             }
//             text={t(
//               'returnInformation',
//             )}
//           />
//         </div>

//         <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
//           <span>
//             {t(
//               'checkoutInformation',
//             )}
//           </span>

//           <span>•</span>

//           <span>
//             {step}/3
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }

// /* ============================================================
//    TRUST ITEM
// ============================================================ */

// function TrustItem({
//   icon,
//   text,
// }) {
//   return (
//     <div className="flex flex-col items-center gap-1 text-center text-gray-500">
//       {icon}

//       <span className="text-[10px] leading-4">
//         {text}
//       </span>
//     </div>
//   )
// }

// export default Checkout


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
              {t(
                'noSizeRequired',
              )}
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
            {getTypeLabel(
              type,
              t,
            )}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {t('quantity')}:{' '}
            {item.quantity}
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {type ===
          'women-clothing' && (
          <WomenSizeForm
            sizeData={
              sizeData
            }
            t={t}
            onChange={
              onChange
            }
            onMeasurementChange={
              onMeasurementChange
            }
          />
        )}

        {type ===
          'men-clothing' && (
          <MenSizeForm
            sizeData={
              sizeData
            }
            t={t}
            onChange={
              onChange
            }
            onMeasurementChange={
              onMeasurementChange
            }
          />
        )}

        {type ===
          'shoes' && (
          <ShoesSizeForm
            sizeData={
              sizeData
            }
            t={t}
            onChange={
              onChange
            }
          />
        )}

        {type === 'bags' && (
          <BagSizeForm
            sizeData={
              sizeData
            }
            t={t}
            onChange={
              onChange
            }
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
                sizeData.size ===
                size
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
          {t(
            'customMeasurements',
          )}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <MeasurementInput
            label={t('bust')}
            value={
              sizeData.measurements
                ?.bust
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
              sizeData.measurements
                ?.waist
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
              sizeData.measurements
                ?.hips
            }
            onChange={(value) =>
              onMeasurementChange(
                'hips',
                value,
              )
            }
          />

          <MeasurementInput
            label={t(
              'shoulder',
            )}
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
            label={t(
              'sleeveLength',
            )}
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
            label={t(
              'dressLength',
            )}
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
                sizeData.size ===
                size
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
          {t(
            'customMeasurements',
          )}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <MeasurementInput
            label={t('chest')}
            value={
              sizeData.measurements
                ?.chest
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
              sizeData.measurements
                ?.waist
            }
            onChange={(value) =>
              onMeasurementChange(
                'waist',
                value,
              )
            }
          />

          <MeasurementInput
            label={t(
              'shoulder',
            )}
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
            label={t(
              'sleeveLength',
            )}
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
            label={t(
              'shirtLength',
            )}
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
            label={t(
              'trouserWaist',
            )}
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
      sizeData.sizeSystem ||
        'EU'
    ] || []

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-semibold text-gray-900">
          {t(
            'shoeSizeSystem',
          )}
        </p>

        <div className="flex flex-wrap gap-2">
          {systems.map(
            (system) => (
              <SizeButton
                key={system}
                value={system}
                selected={
                  sizeData.sizeSystem ===
                  system
                }
                onClick={() =>
                  onChange({
                    sizeSystem:
                      system,
                    size: '',
                  })
                }
              />
            ),
          )}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-gray-900">
          {t('shoeSize')}
        </p>

        <div className="flex flex-wrap gap-2">
          {currentSizes.map(
            (size) => (
              <SizeButton
                key={size}
                value={size}
                selected={
                  sizeData.size ===
                  size
                }
                onClick={() =>
                  onChange({
                    size,
                  })
                }
              />
            ),
          )}
        </div>
      </div>

      <div>
        <div className="mb-3">
          <p className="text-sm font-semibold text-gray-900">
            {t(
              'footLength',
            )}
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
              sizeData.footLength ||
              ''
            }
            onChange={(
              event,
            ) =>
              onChange({
                footLength:
                  event.target
                    .value,
              })
            }
            className="h-12 min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            placeholder="0.0"
          />

          <UnitSelector
            unit={
              sizeData.unit
            }
            onChange={(unit) =>
              onChange({
                unit,
              })
            }
            t={t}
          />
        </div>
      </div>

      {(sizeData.size ||
        sizeData.footLength) && (
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {t(
              'selectedSize',
            )}
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
                :{' '}
                {
                  sizeData.sizeSystem
                }
              </span>
            )}

            {sizeData.footLength && (
              <span>
                {t(
                  'footLength',
                )}
                :{' '}
                {
                  sizeData.footLength
                }{' '}
                {sizeData.unit ||
                  'cm'}
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
            sizeData.measurements
              ?.width
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
            sizeData.measurements
              ?.height
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
            sizeData.measurements
              ?.depth
          }
          onChange={(value) =>
            onMeasurementChange(
              'depth',
              value,
            )
          }
        />

        <MeasurementInput
          label={t(
            'strapLength',
          )}
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
        {t(
          'measurementUnit',
        )}
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
          onChange(
            event.target.value,
          )
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
          onChange(
            event.target.checked,
          )
        }
        className="mt-1 h-4 w-4 rounded border-gray-300"
      />

      <span>
        <span className="block text-sm font-semibold text-gray-900">
          {t(
            'customMeasurements',
          )}
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
  if (
    type ===
    'women-clothing'
  ) {
    return t(
      'womenClothing',
    )
  }

  if (
    type ===
    'men-clothing'
  ) {
    return t(
      'menClothing',
    )
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
      `${t(
        'shoeSizeSystem',
      )}: ${sizeData.sizeSystem}`,
    )
  }

  if (sizeData?.footLength) {
    values.push(
      `${t(
        'footLength',
      )}: ${sizeData.footLength} ${
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
    sizeData?.measurements ||
    {}

  const measurementLabels = {
    bust: 'bust',
    waist: 'waist',
    hips: 'hips',
    shoulder: 'shoulder',
    sleeveLength:
      'sleeveLength',
    dressLength:
      'dressLength',
    chest: 'chest',
    shirtLength:
      'shirtLength',
    trouserWaist:
      'trouserWaist',
    inseam: 'inseam',
    width: 'width',
    height: 'height',
    depth: 'depth',
    strapLength:
      'strapLength',
  }

  Object.entries(
    measurementLabels,
  ).forEach(
    ([
      field,
      translationKey,
    ]) => {
      const value =
        measurements[field]

      if (
        value !== undefined &&
        value !== null &&
        value !== ''
      ) {
        values.push(
          `${t(
            translationKey,
          )}: ${value} ${
            sizeData.unit ||
            'cm'
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
        {t(
          'selectedSize',
        )}
      </p>

      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
        {values.map(
          (value) => (
            <span
              key={value}
              className="text-xs font-medium text-gray-700"
            >
              {value}
            </span>
          ),
        )}
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
          label={t(
            'paymentMethod',
          )}
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
              {t(
                'orderReview',
              )}
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {cartItems.length}{' '}
              {t(
                'productsFound',
              )}
            </p>
          </div>

          <Package className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="max-h-[520px] space-y-4 overflow-y-auto p-5 sm:p-6">
        {cartItems.map(
          (item) => {
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
              Number(
                item.price || 0,
              ) *
              Number(
                item.quantity || 1,
              )

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
                          {t(
                            'quantity',
                          )}
                          :{' '}
                          {
                            item.quantity
                          }
                        </p>
                      </div>

                      <span className="shrink-0 text-sm font-semibold text-gray-900">
                        €{lineTotal.toFixed(
                          2,
                        )}
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
          },
        )}
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

          {/* ==================================================
              REAL SHIPPING PRICE
              This value comes from the selected DHL/FedEx
              shipping rate returned by the backend.
          ================================================== */}

          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-500">
              {t('shipping')}
            </span>

            <span className="font-medium text-gray-900">
              {Number(shipping || 0) > 0
                ? `€${Number(
                    shipping,
                  ).toFixed(2)}`
                : 'Calculated at checkout'}
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
                {t(
                  'securePurchase',
                )}
              </p>

              <p className="mt-1 text-[11px] leading-4 text-gray-500">
                {t(
                  'secureCheckout',
                )}
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
            text={t(
              'shipping',
            )}
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
            {t(
              'checkoutInformation',
            )}
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
