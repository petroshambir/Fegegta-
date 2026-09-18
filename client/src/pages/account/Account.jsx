
// import React from 'react'
// import { Link } from 'react-router-dom'
// import {
//   User,
//   Package,
//   Heart,
//   MapPin,
//   Settings,
//   ChevronRight,
//   ShoppingBag,
//   Clock3,
//   CheckCircle2,
//   Store,
//   Clock,
//   XCircle,
// } from 'lucide-react'

// import { useAuth } from '../../context/AuthContext'
// import { useLanguage } from '../../context/LanguageContext'

// function Account() {
//   const { user } = useAuth()
//   const { t } = useLanguage()

//   const firstName =
//     user?.firstName ||
//     user?.name ||
//     user?.fullName?.split(' ')[0] ||
//     'Customer'

//   /*
//     Seller status:

//     none     → Sell With Us
//     pending  → Application Pending
//     rejected → Apply Again
//     approved → My Store
//   */
//   const sellerStatus = user?.sellerStatus || 'none'

//   const accountCards = [
//     {
//       title: t('profile') || 'Profile',
//       description:
//         t('profileDescription') ||
//         'Manage your personal information',
//       icon: User,
//       href: '/account/profile',
//     },
//     {
//       title: t('myOrders') || 'My Orders',
//       description:
//         t('myOrdersDescription') ||
//         'View and track your orders',
//       icon: Package,
//       href: '/account/orders',
//     },
//     {
//       title: t('favorites') || 'Favorites',
//       description:
//         t('favoritesDescription') ||
//         'Products you saved for later',
//       icon: Heart,
//       href: '/account/favorites',
//     },
//     {
//       title: t('addresses') || 'Addresses',
//       description:
//         t('addressesDescription') ||
//         'Manage your delivery addresses',
//       icon: MapPin,
//       href: '/account/addresses',
//     },
//     {
//       title: t('accountSettings') || 'Account Settings',
//       description:
//         t('accountSettingsDescription') ||
//         'Manage your account preferences',
//       icon: Settings,
//       href: '/account/settings',
//     },
//   ]

//   const getSellerSection = () => {
//     if (sellerStatus === 'approved') {
//       return {
//         title: t('myStore') || 'My Store',
//         description:
//           t('myStoreDescription') ||
//           'Manage your store, products, orders, and sales.',
//         button:
//           t('openMyStore') || 'Open My Store',
//         href: '/seller',
//         icon: Store,
//         iconBg: 'bg-gray-900',
//         iconColor: 'text-white',
//         badge:
//           t('sellerApproved') || 'Seller Approved',
//         badgeClass: 'bg-green-50 text-green-700 border-green-200',
//       }
//     }

//     if (sellerStatus === 'pending') {
//       return {
//         title:
//           t('applicationPending') ||
//           'Application Pending',
//         description:
//           t('applicationPendingDescription') ||
//           'Your seller application is waiting for admin review.',
//         button:
//           t('viewApplication') ||
//           'View Application',
//         href: '/seller/application',
//         icon: Clock,
//         iconBg: 'bg-amber-100',
//         iconColor: 'text-amber-700',
//         badge:
//           t('pendingReview') ||
//           'Pending Review',
//         badgeClass:
//           'bg-amber-50 text-amber-700 border-amber-200',
//       }
//     }

//     if (sellerStatus === 'rejected') {
//       return {
//         title:
//           t('applicationRejected') ||
//           'Application Rejected',
//         description:
//           t('applicationRejectedDescription') ||
//           'Your seller application was not approved. You can apply again.',
//         button:
//           t('applyAgain') ||
//           'Apply Again',
//         href: '/seller/apply',
//         icon: XCircle,
//         iconBg: 'bg-red-100',
//         iconColor: 'text-red-700',
//         badge:
//           t('rejected') ||
//           'Rejected',
//         badgeClass:
//           'bg-red-50 text-red-700 border-red-200',
//       }
//     }

//     return {
//       title:
//         t('sellWithUs') ||
//         'Sell With Us',
//       description:
//         t('sellWithUsDescription') ||
//         'Start selling your products on ፈገግታ and grow your business.',
//       button:
//         t('startSelling') ||
//         'Start Selling',
//       href: '/seller/apply',
//       icon: Store,
//       iconBg: 'bg-gray-100',
//       iconColor: 'text-gray-700',
//       badge:
//         t('becomeSeller') ||
//         'Become a Seller',
//       badgeClass:
//         'bg-gray-100 text-gray-700 border-gray-200',
//     }
//   }

//   const sellerSection = getSellerSection()
//   const SellerIcon = sellerSection.icon

//   return (
//     <section className="min-h-screen bg-gray-50">
//       <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

//         {/* Page Header */}
//         <div className="mb-8">
//           <p className="mb-2 text-sm font-medium text-gray-500">
//             {t('myAccount') || 'My Account'}
//           </p>

//           <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//             {t('welcomeBack') || 'Welcome back'}, {firstName}
//           </h1>

//           <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
//             {t('accountDashboardDescription') ||
//               'Manage your profile, orders, favorites, addresses, and account settings.'}
//           </p>
//         </div>

//         {/* Account Overview */}
//         <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
//           <div className="p-6 sm:p-8">
//             <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

//               <div className="flex items-center gap-4">
//                 <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xl font-semibold text-white">
//                   {firstName.charAt(0).toUpperCase()}
//                 </div>

//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-900">
//                     {user?.fullName ||
//                       user?.name ||
//                       firstName}
//                   </h2>

//                   {user?.email && (
//                     <p className="mt-1 text-sm text-gray-500">
//                       {user.email}
//                     </p>
//                   )}

//                   <div className="mt-2 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
//                     {t('customer') || 'Customer'}
//                   </div>
//                 </div>
//               </div>

//               <Link
//                 to="/account/profile"
//                 className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
//               >
//                 <User size={17} />
//                 {t('editProfile') || 'Edit Profile'}
//               </Link>

//             </div>
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">

//           <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
//             <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
//               <ShoppingBag size={20} className="text-gray-700" />
//             </div>

//             <p className="text-sm text-gray-500">
//               {t('totalOrders') || 'Total Orders'}
//             </p>

//             <p className="mt-1 text-2xl font-bold text-gray-900">
//               0
//             </p>
//           </div>

//           <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
//             <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
//               <Clock3 size={20} className="text-gray-700" />
//             </div>

//             <p className="text-sm text-gray-500">
//               {t('pendingOrders') || 'Pending Orders'}
//             </p>

//             <p className="mt-1 text-2xl font-bold text-gray-900">
//               0
//             </p>
//           </div>

//           <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
//             <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
//               <CheckCircle2 size={20} className="text-gray-700" />
//             </div>

//             <p className="text-sm text-gray-500">
//               {t('completedOrders') || 'Completed'}
//             </p>

//             <p className="mt-1 text-2xl font-bold text-gray-900">
//               0
//             </p>
//           </div>

//           <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
//             <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
//               <Heart size={20} className="text-gray-700" />
//             </div>

//             <p className="text-sm text-gray-500">
//               {t('favoriteItems') || 'Favorites'}
//             </p>

//             <p className="mt-1 text-2xl font-bold text-gray-900">
//               0
//             </p>
//           </div>

//         </div>

//         {/* Seller Section */}
//         <div className="mb-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
//           <div className="p-6 sm:p-8">

//             <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

//               <div className="flex items-start gap-4">

//                 <div
//                   className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${sellerSection.iconBg}`}
//                 >
//                   <SellerIcon
//                     size={25}
//                     className={sellerSection.iconColor}
//                   />
//                 </div>

//                 <div>
//                   <div className="flex flex-wrap items-center gap-3">

//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {sellerSection.title}
//                     </h2>

//                     <span
//                       className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${sellerSection.badgeClass}`}
//                     >
//                       {sellerSection.badge}
//                     </span>

//                   </div>

//                   <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
//                     {sellerSection.description}
//                   </p>
//                 </div>

//               </div>

//               <Link
//                 to={sellerSection.href}
//                 className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
//               >
//                 {sellerSection.button}
//                 <ChevronRight size={18} />
//               </Link>

//             </div>

//           </div>
//         </div>

//         {/* Account Sections */}
//         <div>
//           <div className="mb-5">
//             <h2 className="text-xl font-semibold text-gray-900">
//               {t('accountOverview') || 'Account Overview'}
//             </h2>

//             <p className="mt-1 text-sm text-gray-500">
//               {t('manageYourAccount') ||
//                 'Quick access to your account information and activity.'}
//             </p>
//           </div>

//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

//             {accountCards.map((card) => {
//               const Icon = card.icon

//               return (
//                 <Link
//                   key={card.title}
//                   to={card.href}
//                   className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
//                 >
//                   <div className="flex items-start justify-between gap-4">

//                     <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 transition group-hover:bg-gray-900">
//                       <Icon
//                         size={20}
//                         className="text-gray-700 transition group-hover:text-white"
//                       />
//                     </div>

//                     <ChevronRight
//                       size={19}
//                       className="mt-1 text-gray-400 transition group-hover:translate-x-1 group-hover:text-gray-900"
//                     />

//                   </div>

//                   <h3 className="mt-5 text-base font-semibold text-gray-900">
//                     {card.title}
//                   </h3>

//                   <p className="mt-2 text-sm leading-6 text-gray-500">
//                     {card.description}
//                   </p>
//                 </Link>
//               )
//             })}

//           </div>
//         </div>

//       </div>
//     </section>
//   )
// }

// export default Account
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  ChevronRight,
  ShoppingBag,
  Clock3,
  CheckCircle2,
  Store,
  Clock,
  XCircle,
} from 'lucide-react'

import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'

const API_URL = 'https://fegegta-server.onrender.com/api'

function Account() {
  const { user, getToken } = useAuth()
  const { t } = useLanguage()

  const [orders, setOrders] = useState([])
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const [statsError, setStatsError] = useState('')

  const firstName =
    user?.firstName ||
    user?.name ||
    user?.fullName?.split(' ')[0] ||
    'Customer'

  /*
    Seller status:

    none     → Sell With Us
    pending  → Application Pending
    rejected → Apply Again
    approved → My Store
  */
  const sellerStatus = user?.sellerStatus || 'none'

  // ============================================================
  // LOAD CUSTOMER ORDERS
  // ============================================================

  useEffect(() => {
    let isMounted = true

    const loadAccountOrders = async () => {
      const token = getToken?.()

      if (!token) {
        if (isMounted) {
          setOrders([])
          setIsLoadingStats(false)
        }
        return
      }

      try {
        setIsLoadingStats(true)
        setStatsError('')

        const response = await fetch(
          `${API_URL}/orders/my-orders`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data?.message ||
              'Failed to load account order statistics.'
          )
        }

        const receivedOrders = Array.isArray(data)
          ? data
          : Array.isArray(data?.orders)
            ? data.orders
            : Array.isArray(data?.data)
              ? data.data
              : []

        if (isMounted) {
          setOrders(receivedOrders)
        }
      } catch (error) {
        console.error(
          'Failed to load account orders:',
          error
        )

        if (isMounted) {
          setOrders([])
          setStatsError(
            error?.message ||
              'Unable to load your order statistics.'
          )
        }
      } finally {
        if (isMounted) {
          setIsLoadingStats(false)
        }
      }
    }

    loadAccountOrders()

    return () => {
      isMounted = false
    }
  }, [getToken])

  // ============================================================
  // ORDER STATUS HELPERS
  // ============================================================

  const getOrderStatus = (order) => {
    return String(
      order?.status ||
      order?.orderStatus ||
      order?.fulfillmentStatus ||
      ''
    ).toLowerCase()
  }

  const isCompletedOrder = (order) => {
    const status = getOrderStatus(order)

    return [
      'completed',
      'delivered',
      'fulfilled',
      'complete',
    ].includes(status)
  }

  const isPendingOrder = (order) => {
    const status = getOrderStatus(order)

    return [
      'pending',
      'processing',
      'confirmed',
      'paid',
      'shipped',
      'out_for_delivery',
      'out-for-delivery',
      'ready',
    ].includes(status)
  }

  // ============================================================
  // ACCOUNT STATISTICS
  // ============================================================

  const totalOrders = orders.length

  const pendingOrders = orders.filter(
    (order) => isPendingOrder(order) && !isCompletedOrder(order)
  ).length

  const completedOrders = orders.filter(
    (order) => isCompletedOrder(order)
  ).length

  /*
    Favorites API has not been connected yet because we do not
    have a confirmed backend favorites endpoint in the current
    backend contract.

    Keep this at 0 instead of inventing an API route.
  */
  const favoriteItems = 0

  const accountCards = [
    {
      title: t('profile') || 'Profile',
      description:
        t('profileDescription') ||
        'Manage your personal information',
      icon: User,
      href: '/account/profile',
    },
    {
      title: t('myOrders') || 'My Orders',
      description:
        t('myOrdersDescription') ||
        'View and track your orders',
      icon: Package,
      href: '/account/orders',
    },
    {
      title: t('favorites') || 'Favorites',
      description:
        t('favoritesDescription') ||
        'Products you saved for later',
      icon: Heart,
      href: '/account/favorites',
    },
    {
      title: t('addresses') || 'Addresses',
      description:
        t('addressesDescription') ||
        'Manage your delivery addresses',
      icon: MapPin,
      href: '/account/addresses',
    },
    {
      title: t('accountSettings') || 'Account Settings',
      description:
        t('accountSettingsDescription') ||
        'Manage your account preferences',
      icon: Settings,
      href: '/account/settings',
    },
  ]

  const getSellerSection = () => {
    if (sellerStatus === 'approved') {
      return {
        title: t('myStore') || 'My Store',
        description:
          t('myStoreDescription') ||
          'Manage your store, products, orders, and sales.',
        button:
          t('openMyStore') || 'Open My Store',
        href: '/seller',
        icon: Store,
        iconBg: 'bg-gray-900',
        iconColor: 'text-white',
        badge:
          t('sellerApproved') || 'Seller Approved',
        badgeClass:
          'bg-green-50 text-green-700 border-green-200',
      }
    }

    if (sellerStatus === 'pending') {
      return {
        title:
          t('applicationPending') ||
          'Application Pending',
        description:
          t('applicationPendingDescription') ||
          'Your seller application is waiting for admin review.',
        button:
          t('viewApplication') ||
          'View Application',
        href: '/seller/application',
        icon: Clock,
        iconBg: 'bg-amber-100',
        iconColor: 'text-amber-700',
        badge:
          t('pendingReview') ||
          'Pending Review',
        badgeClass:
          'bg-amber-50 text-amber-700 border-amber-200',
      }
    }

    if (sellerStatus === 'rejected') {
      return {
        title:
          t('applicationRejected') ||
          'Application Rejected',
        description:
          t('applicationRejectedDescription') ||
          'Your seller application was not approved. You can apply again.',
        button:
          t('applyAgain') ||
          'Apply Again',
        href: '/seller/apply',
        icon: XCircle,
        iconBg: 'bg-red-100',
        iconColor: 'text-red-700',
        badge:
          t('rejected') ||
          'Rejected',
        badgeClass:
          'bg-red-50 text-red-700 border-red-200',
      }
    }

    return {
      title:
        t('sellWithUs') ||
        'Sell With Us',
      description:
        t('sellWithUsDescription') ||
        'Start selling your products on ፈገግታ and grow your business.',
      button:
        t('startSelling') ||
        'Start Selling',
      href: '/seller/apply',
      icon: Store,
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-700',
      badge:
        t('becomeSeller') ||
        'Become a Seller',
      badgeClass:
        'bg-gray-100 text-gray-700 border-gray-200',
    }
  }

  const sellerSection = getSellerSection()
  const SellerIcon = sellerSection.icon

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* Page Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-gray-500">
            {t('myAccount') || 'My Account'}
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('welcomeBack') || 'Welcome back'}, {firstName}
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            {t('accountDashboardDescription') ||
              'Manage your profile, orders, favorites, addresses, and account settings.'}
          </p>
        </div>

        {/* Account Overview */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xl font-semibold text-white">
                  {firstName.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {user?.fullName ||
                      user?.name ||
                      firstName}
                  </h2>

                  {user?.email && (
                    <p className="mt-1 text-sm text-gray-500">
                      {user.email}
                    </p>
                  )}

                  <div className="mt-2 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    {t('customer') || 'Customer'}
                  </div>
                </div>
              </div>

              <Link
                to="/account/profile"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
              >
                <User size={17} />
                {t('editProfile') || 'Edit Profile'}
              </Link>

            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">

          {/* Total Orders */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <ShoppingBag size={20} className="text-gray-700" />
            </div>

            <p className="text-sm text-gray-500">
              {t('totalOrders') || 'Total Orders'}
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {isLoadingStats ? '—' : totalOrders}
            </p>
          </div>

          {/* Pending Orders */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <Clock3 size={20} className="text-gray-700" />
            </div>

            <p className="text-sm text-gray-500">
              {t('pendingOrders') || 'Pending Orders'}
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {isLoadingStats ? '—' : pendingOrders}
            </p>
          </div>

          {/* Completed Orders */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <CheckCircle2 size={20} className="text-gray-700" />
            </div>

            <p className="text-sm text-gray-500">
              {t('completedOrders') || 'Completed'}
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {isLoadingStats ? '—' : completedOrders}
            </p>
          </div>

          {/* Favorites */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <Heart size={20} className="text-gray-700" />
            </div>

            <p className="text-sm text-gray-500">
              {t('favoriteItems') || 'Favorites'}
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {favoriteItems}
            </p>
          </div>

        </div>

        {/* Optional Stats Error */}
        {statsError && (
          <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {statsError}
          </div>
        )}

        {/* Seller Section */}
        <div className="mb-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="p-6 sm:p-8">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-start gap-4">

                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${sellerSection.iconBg}`}
                >
                  <SellerIcon
                    size={25}
                    className={sellerSection.iconColor}
                  />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">

                    <h2 className="text-xl font-semibold text-gray-900">
                      {sellerSection.title}
                    </h2>

                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${sellerSection.badgeClass}`}
                    >
                      {sellerSection.badge}
                    </span>

                  </div>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                    {sellerSection.description}
                  </p>
                </div>

              </div>

              <Link
                to={sellerSection.href}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                {sellerSection.button}
                <ChevronRight size={18} />
              </Link>

            </div>

          </div>
        </div>

        {/* Account Sections */}
        <div>
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-gray-900">
              {t('accountOverview') || 'Account Overview'}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {t('manageYourAccount') ||
                'Quick access to your account information and activity.'}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {accountCards.map((card) => {
              const Icon = card.icon

              return (
                <Link
                  key={card.title}
                  to={card.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 transition group-hover:bg-gray-900">
                      <Icon
                        size={20}
                        className="text-gray-700 transition group-hover:text-white"
                      />
                    </div>

                    <ChevronRight
                      size={19}
                      className="mt-1 text-gray-400 transition group-hover:translate-x-1 group-hover:text-gray-900"
                    />

                  </div>

                  <h3 className="mt-5 text-base font-semibold text-gray-900">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {card.description}
                  </p>
                </Link>
              )
            })}

          </div>
        </div>

      </div>
    </section>
  )
}

export default Account