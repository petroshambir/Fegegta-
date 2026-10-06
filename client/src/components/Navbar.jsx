
// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// import LanguageSwitcher from './LanguageSwitcher'

// import { useLanguage } from '../context/LanguageContext'
// import { useCart } from '../context/CartContext'
// import { useAuth } from '../context/AuthContext'

// import {
//   UserRound,
//   LogOut,
//   Package,
// } from 'lucide-react'

// function Navbar() {
//   const { t } = useLanguage()
//   const { totalItems } = useCart()

//   const {
//     user,
//     isAuthenticated,
//     isCustomer,
//     isSeller,
//     isAdmin,
//     logout,
//   } = useAuth()

//   const navigate = useNavigate()

//   const [isMenuOpen, setIsMenuOpen] =
//     useState(false)

//   const closeMenu = () => {
//     setIsMenuOpen(false)
//   }

//   // ============================================================
//   // LOGOUT
//   // ============================================================

//   const handleLogout = () => {
//     logout()
//     closeMenu()

//     navigate('/login', {
//       replace: true,
//     })
//   }

//   // ============================================================
//   // USER DISPLAY NAME
//   // ============================================================

//   const userName =
//     user?.firstName ||
//     user?.name ||
//     user?.fullName ||
//     user?.email?.split('@')[0] ||
//     'Account'

//   return (
//     <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//         {/* ======================================================
//             MAIN NAVBAR
//         ====================================================== */}

//         <div className="flex h-16 items-center justify-between">

//           {/* ====================================================
//               LOGO
//           ==================================================== */}

//           <Link
//             to="/"
//             onClick={closeMenu}
//             className="flex items-center gap-2"
//           >
//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
//               F
//             </div>

//             <span className="text-xl font-bold tracking-tight">
//               ፈገግታ
//             </span>
//           </Link>

//           {/* ====================================================
//               DESKTOP NAVIGATION
//           ==================================================== */}

//           <nav className="hidden items-center gap-7 md:flex">

//             <Link
//               to="/"
//               className="text-sm font-medium text-gray-700 transition hover:text-black"
//             >
//               {t('home')}
//             </Link>

//             <Link
//               to="/products"
//               className="text-sm font-medium text-gray-700 transition hover:text-black"
//             >
//               {t('products')}
//             </Link>

//             <Link
//               to="/stores"
//               className="text-sm font-medium text-gray-700 transition hover:text-black"
//             >
//               {t('stores')}
//             </Link>

//             <Link
//               to="/about"
//               className="text-sm font-medium text-gray-700 transition hover:text-black"
//             >
//               {t('about')}
//             </Link>

//             {/* ==================================================
//                 SELL WITH US
//             ================================================== */}

//             {!isSeller && !isAdmin && (
//               <Link
//                 to="/seller/apply"
//                 className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
//               >
//                 {t('sellWithUs') || 'Sell With Us'}
//               </Link>
//             )}

//             {/* ==================================================
//                 LOGGED-IN USER LINKS
//             ================================================== */}

//             {isAuthenticated && (
//               <>
//                 {/* My Orders */}

//                 {isCustomer && (
//                   <Link
//                     to="/account/orders"
//                     className="flex items-center gap-1.5 text-sm font-medium text-gray-700 transition hover:text-black"
//                   >
//                     <Package className="h-4 w-4" />

//                     <span>
//                       My Orders
//                     </span>
//                   </Link>
//                 )}

//                 {/* Seller Dashboard */}

//                 {isSeller && (
//                   <Link
//                     to="/seller"
//                     className="text-sm font-semibold text-gray-700 transition hover:text-black"
//                   >
//                     Seller Dashboard
//                   </Link>
//                 )}

//                 {/* Admin Dashboard */}

//                 {isAdmin && (
//                   <Link
//                     to="/admin"
//                     className="text-sm font-semibold text-gray-700 transition hover:text-black"
//                   >
//                     Admin
//                   </Link>
//                 )}
//               </>
//             )}

//           </nav>

//           {/* ====================================================
//               DESKTOP ACTIONS
//           ==================================================== */}

//           <div className="flex items-center gap-2 sm:gap-3">

//             {/* Language */}

//             <div className="hidden sm:block">
//               <LanguageSwitcher />
//             </div>

//             {/* ==================================================
//                 AUTH AREA
//             ================================================== */}

//             {!isAuthenticated ? (
//               <>
//                 {/* Login */}

//                 <Link
//                   to="/login"
//                   className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black sm:block"
//                 >
//                   {t('login')}
//                 </Link>

//                 {/* Register */}

//                 <Link
//                   to="/register"
//                   className="hidden rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 sm:block"
//                 >
//                   {t('register') || 'Register'}
//                 </Link>
//               </>
//             ) : (
//               <>
//                 {/* ==================================================
//                     ACCOUNT
//                 ================================================== */}

//                 <Link
//                   to="/account"
//                   className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black sm:flex"
//                 >
//                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
//                     <UserRound className="h-4 w-4" />
//                   </div>

//                   <div className="max-w-[120px]">
//                     <p className="truncate text-xs font-semibold text-gray-900">
//                       {userName}
//                     </p>

//                     <p className="text-[10px] text-gray-400">
//                       My Account
//                     </p>
//                   </div>
//                 </Link>

//                 {/* ==================================================
//                     LOGOUT
//                 ================================================== */}

//                 <button
//                   type="button"
//                   onClick={handleLogout}
//                   className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600 sm:flex"
//                 >
//                   <LogOut className="h-4 w-4" />

//                   <span>
//                     Logout
//                   </span>
//                 </button>
//               </>
//             )}

//             {/* ==================================================
//                 CART
//             ================================================== */}

//             <Link
//               to="/cart"
//               className="relative rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 hover:text-black"
//               aria-label={t('cart')}
//             >
//               <span className="relative block text-xl leading-none">
//                 🛒

//                 {totalItems > 0 && (
//                   <span className="absolute -right-3 -top-3 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
//                     {totalItems > 99
//                       ? '99+'
//                       : totalItems}
//                   </span>
//                 )}
//               </span>
//             </Link>

//             {/* ==================================================
//                 MOBILE MENU BUTTON
//             ================================================== */}

//             <button
//               type="button"
//               onClick={() =>
//                 setIsMenuOpen(
//                   !isMenuOpen
//                 )
//               }
//               className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 hover:text-black md:hidden"
//               aria-label={
//                 isMenuOpen
//                   ? 'Close menu'
//                   : 'Open menu'
//               }
//               aria-expanded={
//                 isMenuOpen
//               }
//             >
//               {isMenuOpen
//                 ? '✕'
//                 : '☰'}
//             </button>

//           </div>
//         </div>

//         {/* ======================================================
//             MOBILE NAVIGATION
//         ====================================================== */}

//         {isMenuOpen && (
//           <div className="border-t border-gray-100 py-4 md:hidden">

//             <nav className="flex flex-col">

//               <Link
//                 to="/"
//                 onClick={closeMenu}
//                 className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
//               >
//                 {t('home')}
//               </Link>

//               <Link
//                 to="/products"
//                 onClick={closeMenu}
//                 className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
//               >
//                 {t('products')}
//               </Link>

//               <Link
//                 to="/stores"
//                 onClick={closeMenu}
//                 className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
//               >
//                 {t('stores')}
//               </Link>

//               <Link
//                 to="/about"
//                 onClick={closeMenu}
//                 className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
//               >
//                 {t('about')}
//               </Link>

//               {/* ==================================================
//                   MOBILE ACCOUNT
//               ================================================== */}

//               {isAuthenticated && (
//                 <>
//                   <Link
//                     to="/account"
//                     onClick={closeMenu}
//                     className="mt-2 flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
//                   >
//                     <UserRound className="h-4 w-4" />

//                     <span>
//                       {userName}
//                     </span>
//                   </Link>

//                   {isCustomer && (
//                     <Link
//                       to="/account/orders"
//                       onClick={closeMenu}
//                       className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
//                     >
//                       <Package className="h-4 w-4" />

//                       <span>
//                         My Orders
//                       </span>
//                     </Link>
//                   )}

//                   {isSeller && (
//                     <Link
//                       to="/seller"
//                       onClick={closeMenu}
//                       className="rounded-lg px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-black"
//                     >
//                       Seller Dashboard
//                     </Link>
//                   )}

//                   {isAdmin && (
//                     <Link
//                       to="/admin"
//                       onClick={closeMenu}
//                       className="rounded-lg px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-black"
//                     >
//                       Admin Dashboard
//                     </Link>
//                   )}

//                   <button
//                     type="button"
//                     onClick={handleLogout}
//                     className="mt-2 flex items-center gap-3 rounded-lg bg-red-50 px-3 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-100"
//                   >
//                     <LogOut className="h-4 w-4" />

//                     <span>
//                       Logout
//                     </span>
//                   </button>
//                 </>
//               )}

//               {/* ==================================================
//                   MOBILE SELL WITH US
//               ================================================== */}

//               {!isSeller && !isAdmin && (
//                 <Link
//                   to="/seller/apply"
//                   onClick={closeMenu}
//                   className="mt-2 rounded-lg bg-black px-3 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
//                 >
//                   {t('sellWithUs') ||
//                     'Sell With Us'}
//                 </Link>
//               )}

//               {/* ==================================================
//                   MOBILE LOGIN / REGISTER
//               ================================================== */}

//               {!isAuthenticated && (
//                 <>
//                   <Link
//                     to="/login"
//                     onClick={closeMenu}
//                     className="mt-2 rounded-lg bg-gray-100 px-3 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-200"
//                   >
//                     {t('login')}
//                   </Link>

//                   <Link
//                     to="/register"
//                     onClick={closeMenu}
//                     className="mt-2 rounded-lg bg-black px-3 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
//                   >
//                     {t('register') ||
//                       'Register'}
//                   </Link>
//                 </>
//               )}

//               {/* ==================================================
//                   MOBILE LANGUAGE
//               ================================================== */}

//               <div className="mt-3 border-t border-gray-100 pt-3">
//                 <LanguageSwitcher />
//               </div>

//             </nav>
//           </div>
//         )}

//       </div>
//     </header>
//   )
// }

// export default Navbar


// import { useEffect, useRef, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// import LanguageSwitcher from './LanguageSwitcher'

// import { useLanguage } from '../context/LanguageContext'
// import { useCart } from '../context/CartContext'
// import { useAuth } from '../context/AuthContext'

// import {
//   UserRound,
//   LogOut,
//   Package,
//   ChevronDown,
//   Loader2,
// } from 'lucide-react'

// const API_URL =
//   'https://fegegta-server.onrender.com/api'

// function Navbar() {
//   const { t } = useLanguage()
//   const { totalItems } = useCart()

//   const {
//     user,
//     isAuthenticated,
//     isCustomer,
//     isSeller,
//     isAdmin,
//     logout,
//   } = useAuth()

//   const navigate = useNavigate()

//   const [isMenuOpen, setIsMenuOpen] =
//     useState(false)

//   // ============================================================
//   // CATEGORIES
//   // ============================================================

//   const [categories, setCategories] =
//     useState([])

//   const [isCategoriesOpen, setIsCategoriesOpen] =
//     useState(false)

//   const [isCategoriesLoading, setIsCategoriesLoading] =
//     useState(false)

//   const categoriesRef = useRef(null)

//   // ============================================================
//   // CLOSE MENU
//   // ============================================================

//   const closeMenu = () => {
//     setIsMenuOpen(false)
//   }

//   // ============================================================
//   // LOAD PRODUCT CATEGORIES
//   // ============================================================

//   useEffect(() => {
//     let isMounted = true

//     const loadCategories = async () => {
//       try {
//         setIsCategoriesLoading(true)

//         const response = await fetch(
//           `${API_URL}/products`
//         )

//         if (!response.ok) {
//           throw new Error(
//             'Failed to load products'
//           )
//         }

//         const data = await response.json()

//         const products =
//           Array.isArray(data)
//             ? data
//             : Array.isArray(data?.products)
//               ? data.products
//               : Array.isArray(data?.data)
//                 ? data.data
//                 : []

//         const uniqueCategories = [
//           ...new Set(
//             products
//               .map((product) =>
//                 String(
//                   product?.category || ''
//                 ).trim()
//               )
//               .filter(Boolean)
//           ),
//         ].sort((a, b) =>
//           a.localeCompare(b)
//         )

//         if (isMounted) {
//           setCategories(
//             uniqueCategories
//           )
//         }
//       } catch (error) {
//         console.error(
//           'Failed to load categories:',
//           error
//         )

//         if (isMounted) {
//           setCategories([])
//         }
//       } finally {
//         if (isMounted) {
//           setIsCategoriesLoading(false)
//         }
//       }
//     }

//     loadCategories()

//     return () => {
//       isMounted = false
//     }
//   }, [])

//   // ============================================================
//   // CLOSE CATEGORY DROPDOWN WHEN CLICKING OUTSIDE
//   // ============================================================

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         categoriesRef.current &&
//         !categoriesRef.current.contains(
//           event.target
//         )
//       ) {
//         setIsCategoriesOpen(false)
//       }
//     }

//     document.addEventListener(
//       'mousedown',
//       handleClickOutside
//     )

//     return () => {
//       document.removeEventListener(
//         'mousedown',
//         handleClickOutside
//       )
//     }
//   }, [])

//   // ============================================================
//   // CATEGORY NAVIGATION
//   // ============================================================

//   const handleCategoryClick = (
//     category
//   ) => {
//     setIsCategoriesOpen(false)
//     closeMenu()

//     navigate(
//       `/products?category=${encodeURIComponent(
//         category
//       )}`
//     )
//   }

//   // ============================================================
//   // VIEW ALL PRODUCTS
//   // ============================================================

//   const handleViewAllProducts = () => {
//     setIsCategoriesOpen(false)
//     closeMenu()

//     navigate('/products')
//   }

//   // ============================================================
//   // LOGOUT
//   // ============================================================

//   const handleLogout = () => {
//     logout()
//     closeMenu()

//     navigate('/login', {
//       replace: true,
//     })
//   }

//   // ============================================================
//   // USER DISPLAY NAME
//   // ============================================================

//   const userName =
//     user?.firstName ||
//     user?.name ||
//     user?.fullName ||
//     user?.email?.split('@')[0] ||
//     'Account'

//   return (
//     <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//         {/* ======================================================
//             MAIN NAVBAR
//         ====================================================== */}

//         <div className="flex h-16 items-center justify-between">

//           {/* ====================================================
//               LOGO
//           ==================================================== */}

//           <Link
//             to="/"
//             onClick={closeMenu}
//             className="flex items-center gap-2"
//           >
//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
//               F
//             </div>

//             <span className="text-xl font-bold tracking-tight">
//               ፈገግታ
//             </span>
//           </Link>

//           {/* ====================================================
//               DESKTOP NAVIGATION
//           ==================================================== */}

//           <nav className="hidden items-center gap-7 md:flex">

//             <Link
//               to="/"
//               className="text-sm font-medium text-gray-700 transition hover:text-black"
//             >
//               {t('home')}
//             </Link>

//             <Link
//               to="/products"
//               className="text-sm font-medium text-gray-700 transition hover:text-black"
//             >
//               {t('products')}
//             </Link>

//             {/* ==================================================
//                 CATEGORIES DROPDOWN
//             ================================================== */}

//             <div
//               ref={categoriesRef}
//               className="relative"
//             >
//               <button
//                 type="button"
//                 onClick={() =>
//                   setIsCategoriesOpen(
//                     !isCategoriesOpen
//                   )
//                 }
//                 className="flex items-center gap-1.5 text-sm font-medium text-gray-700 transition hover:text-black"
//                 aria-expanded={
//                   isCategoriesOpen
//                 }
//               >
//                 <span>
//                   Categories
//                 </span>

//                 <ChevronDown
//                   className={`h-4 w-4 transition-transform ${
//                     isCategoriesOpen
//                       ? 'rotate-180'
//                       : ''
//                   }`}
//                 />
//               </button>

//               {isCategoriesOpen && (
//                 <div className="absolute left-1/2 top-full z-50 mt-3 w-64 -translate-x-1/2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">

//                   <div className="border-b border-gray-100 px-4 py-3">
//                     <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
//                       Categories
//                     </p>
//                   </div>

//                   <div className="max-h-80 overflow-y-auto p-2">

//                     {isCategoriesLoading ? (
//                       <div className="flex items-center justify-center gap-2 px-4 py-6 text-sm text-gray-500">
//                         <Loader2 className="h-4 w-4 animate-spin" />

//                         <span>
//                           Loading categories...
//                         </span>
//                       </div>
//                     ) : categories.length ===
//                       0 ? (
//                       <div className="px-4 py-6 text-center text-sm text-gray-500">
//                         No categories available.
//                       </div>
//                     ) : (
//                       categories.map(
//                         (category) => (
//                           <button
//                             key={category}
//                             type="button"
//                             onClick={() =>
//                               handleCategoryClick(
//                                 category
//                               )
//                             }
//                             className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
//                           >
//                             {category}
//                           </button>
//                         )
//                       )
//                     )}

//                   </div>

//                   {categories.length > 0 && (
//                     <div className="border-t border-gray-100 p-2">
//                       <button
//                         type="button"
//                         onClick={
//                           handleViewAllProducts
//                         }
//                         className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
//                       >
//                         View All Products
//                       </button>
//                     </div>
//                   )}

//                 </div>
//               )}
//             </div>

//             {/* ==================================================
//                 SELL WITH US
//             ================================================== */}

//             {!isSeller && !isAdmin && (
//               <Link
//                 to="/seller/apply"
//                 className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
//               >
//                 {t('sellWithUs') ||
//                   'Sell With Us'}
//               </Link>
//             )}

//             {/* ==================================================
//                 LOGGED-IN USER LINKS
//             ================================================== */}

//             {isAuthenticated && (
//               <>
//                 {/* My Orders */}

//                 {isCustomer && (
//                   <Link
//                     to="/account/orders"
//                     className="flex items-center gap-1.5 text-sm font-medium text-gray-700 transition hover:text-black"
//                   >
//                     <Package className="h-4 w-4" />

//                     <span>
//                       My Orders
//                     </span>
//                   </Link>
//                 )}

//                 {/* Seller Dashboard */}

//                 {isSeller && (
//                   <Link
//                     to="/seller"
//                     className="text-sm font-semibold text-gray-700 transition hover:text-black"
//                   >
//                     Seller Dashboard
//                   </Link>
//                 )}

//                 {/* Admin Dashboard */}

//                 {isAdmin && (
//                   <Link
//                     to="/admin"
//                     className="text-sm font-semibold text-gray-700 transition hover:text-black"
//                   >
//                     Admin
//                   </Link>
//                 )}
//               </>
//             )}

//           </nav>

//           {/* ====================================================
//               DESKTOP ACTIONS
//           ==================================================== */}

//           <div className="flex items-center gap-2 sm:gap-3">

//             {/* Language */}

//             <div className="hidden sm:block">
//               <LanguageSwitcher />
//             </div>

//             {/* ==================================================
//                 AUTH AREA
//             ================================================== */}

//             {!isAuthenticated ? (
//               <>
//                 {/* Login */}

//                 <Link
//                   to="/login"
//                   className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black sm:block"
//                 >
//                   {t('login')}
//                 </Link>

//                 {/* Register */}

//                 <Link
//                   to="/register"
//                   className="hidden rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 sm:block"
//                 >
//                   {t('register') ||
//                     'Register'}
//                 </Link>
//               </>
//             ) : (
//               <>
//                 {/* ==================================================
//                     ACCOUNT
//                 ================================================== */}

//                 <Link
//                   to="/account"
//                   className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black sm:flex"
//                 >
//                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
//                     <UserRound className="h-4 w-4" />
//                   </div>

//                   <div className="max-w-[120px]">
//                     <p className="truncate text-xs font-semibold text-gray-900">
//                       {userName}
//                     </p>

//                     <p className="text-[10px] text-gray-400">
//                       My Account
//                     </p>
//                   </div>
//                 </Link>

//                 {/* ==================================================
//                     LOGOUT
//                 ================================================== */}

//                 <button
//                   type="button"
//                   onClick={handleLogout}
//                   className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600 sm:flex"
//                 >
//                   <LogOut className="h-4 w-4" />

//                   <span>
//                     Logout
//                   </span>
//                 </button>
//               </>
//             )}

//             {/* ==================================================
//                 CART
//             ================================================== */}

//             <Link
//               to="/cart"
//               className="relative rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 hover:text-black"
//               aria-label={t('cart')}
//             >
//               <span className="relative block text-xl leading-none">
//                 🛒

//                 {totalItems > 0 && (
//                   <span className="absolute -right-3 -top-3 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
//                     {totalItems > 99
//                       ? '99+'
//                       : totalItems}
//                   </span>
//                 )}
//               </span>
//             </Link>

//             {/* ==================================================
//                 MOBILE MENU BUTTON
//             ================================================== */}

//             <button
//               type="button"
//               onClick={() =>
//                 setIsMenuOpen(
//                   !isMenuOpen
//                 )
//               }
//               className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 hover:text-black md:hidden"
//               aria-label={
//                 isMenuOpen
//                   ? 'Close menu'
//                   : 'Open menu'
//               }
//               aria-expanded={
//                 isMenuOpen
//               }
//             >
//               {isMenuOpen
//                 ? '✕'
//                 : '☰'}
//             </button>

//           </div>
//         </div>

//         {/* ======================================================
//             MOBILE NAVIGATION
//         ====================================================== */}

//         {isMenuOpen && (
//           <div className="border-t border-gray-100 py-4 md:hidden">

//             <nav className="flex flex-col">

//               <Link
//                 to="/"
//                 onClick={closeMenu}
//                 className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
//               >
//                 {t('home')}
//               </Link>

//               <Link
//                 to="/products"
//                 onClick={closeMenu}
//                 className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
//               >
//                 {t('products')}
//               </Link>

//               {/* ==================================================
//                   MOBILE CATEGORIES
//               ================================================== */}

//               <div className="mt-1">

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setIsCategoriesOpen(
//                       !isCategoriesOpen
//                     )
//                   }
//                   className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
//                 >
//                   <span>
//                     Categories
//                   </span>

//                   <ChevronDown
//                     className={`h-4 w-4 transition-transform ${
//                       isCategoriesOpen
//                         ? 'rotate-180'
//                         : ''
//                     }`}
//                   />
//                 </button>

//                 {isCategoriesOpen && (
//                   <div className="mt-1 rounded-xl bg-gray-50 p-2">

//                     {isCategoriesLoading ? (
//                       <div className="flex items-center justify-center gap-2 px-3 py-4 text-sm text-gray-500">
//                         <Loader2 className="h-4 w-4 animate-spin" />

//                         <span>
//                           Loading categories...
//                         </span>
//                       </div>
//                     ) : categories.length ===
//                       0 ? (
//                       <div className="px-3 py-4 text-center text-sm text-gray-500">
//                         No categories available.
//                       </div>
//                     ) : (
//                       <>
//                         {categories.map(
//                           (category) => (
//                             <button
//                               key={category}
//                               type="button"
//                               onClick={() =>
//                                 handleCategoryClick(
//                                   category
//                                 )
//                               }
//                               className="flex w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition hover:bg-white hover:text-black"
//                             >
//                               {category}
//                             </button>
//                           )
//                         )}

//                         <button
//                           type="button"
//                           onClick={
//                             handleViewAllProducts
//                           }
//                           className="mt-1 flex w-full rounded-lg border-t border-gray-200 px-3 py-2.5 pt-3 text-left text-sm font-semibold text-gray-900 transition hover:text-black"
//                         >
//                           View All Products
//                         </button>
//                       </>
//                     )}

//                   </div>
//                 )}

//               </div>

//               {/* ==================================================
//                   MOBILE ACCOUNT
//               ================================================== */}

//               {isAuthenticated && (
//                 <>
//                   <Link
//                     to="/account"
//                     onClick={closeMenu}
//                     className="mt-2 flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
//                   >
//                     <UserRound className="h-4 w-4" />

//                     <span>
//                       {userName}
//                     </span>
//                   </Link>

//                   {isCustomer && (
//                     <Link
//                       to="/account/orders"
//                       onClick={closeMenu}
//                       className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
//                     >
//                       <Package className="h-4 w-4" />

//                       <span>
//                         My Orders
//                       </span>
//                     </Link>
//                   )}

//                   {isSeller && (
//                     <Link
//                       to="/seller"
//                       onClick={closeMenu}
//                       className="rounded-lg px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-black"
//                     >
//                       Seller Dashboard
//                     </Link>
//                   )}

//                   {isAdmin && (
//                     <Link
//                       to="/admin"
//                       onClick={closeMenu}
//                       className="rounded-lg px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-black"
//                     >
//                       Admin Dashboard
//                     </Link>
//                   )}

//                   <button
//                     type="button"
//                     onClick={handleLogout}
//                     className="mt-2 flex items-center gap-3 rounded-lg bg-red-50 px-3 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-100"
//                   >
//                     <LogOut className="h-4 w-4" />

//                     <span>
//                       Logout
//                     </span>
//                   </button>
//                 </>
//               )}

//               {/* ==================================================
//                   MOBILE SELL WITH US
//               ================================================== */}

//               {!isSeller && !isAdmin && (
//                 <Link
//                   to="/seller/apply"
//                   onClick={closeMenu}
//                   className="mt-2 rounded-lg bg-black px-3 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
//                 >
//                   {t('sellWithUs') ||
//                     'Sell With Us'}
//                 </Link>
//               )}

//               {/* ==================================================
//                   MOBILE LOGIN / REGISTER
//               ================================================== */}

//               {!isAuthenticated && (
//                 <>
//                   <Link
//                     to="/login"
//                     onClick={closeMenu}
//                     className="mt-2 rounded-lg bg-gray-100 px-3 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-200"
//                   >
//                     {t('login')}
//                   </Link>

//                   <Link
//                     to="/register"
//                     onClick={closeMenu}
//                     className="mt-2 rounded-lg bg-black px-3 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
//                   >
//                     {t('register') ||
//                       'Register'}
//                   </Link>
//                 </>
//               )}

//               {/* ==================================================
//                   MOBILE LANGUAGE
//               ================================================== */}

//               <div className="mt-3 border-t border-gray-100 pt-3">
//                 <LanguageSwitcher />
//               </div>

//             </nav>
//           </div>
//         )}

//       </div>
//     </header>
//   )
// }

// export default Navbar


// import { useEffect, useRef, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// import LanguageSwitcher from './LanguageSwitcher'

// import { useLanguage } from '../context/LanguageContext'
// import { useCart } from '../context/CartContext'
// import { useAuth } from '../context/AuthContext'

// import {
//   UserRound,
//   LogOut,
//   Package,
//   ChevronDown,
//   Loader2,
// } from 'lucide-react'

// const API_URL =
//   'https://fegegta-server.onrender.com/api'

// function Navbar() {
//   const { t } = useLanguage()
//   const { totalItems } = useCart()

//   const {
//     user,
//     isAuthenticated,
//     isCustomer,
//     isSeller,
//     isAdmin,
//     logout,
//   } = useAuth()

//   const navigate = useNavigate()

//   const [isMenuOpen, setIsMenuOpen] =
//     useState(false)

//   // ============================================================
//   // CATEGORIES
//   // ============================================================

//   const [categories, setCategories] =
//     useState([])

//   const [isCategoriesOpen, setIsCategoriesOpen] =
//     useState(false)

//   const [isCategoriesLoading, setIsCategoriesLoading] =
//     useState(false)

//   const categoriesRef = useRef(null)

//   // ============================================================
//   // CLOSE MENU
//   // ============================================================

//   const closeMenu = () => {
//     setIsMenuOpen(false)
//   }

//   // ============================================================
//   // LOAD PRODUCT CATEGORIES
//   // ============================================================

//   useEffect(() => {
//     let isMounted = true

//     const loadCategories = async () => {
//       try {
//         setIsCategoriesLoading(true)

//         const response = await fetch(
//           `${API_URL}/products`
//         )

//         if (!response.ok) {
//           throw new Error(
//             'Failed to load products'
//           )
//         }

//         const data = await response.json()

//         const products =
//           Array.isArray(data)
//             ? data
//             : Array.isArray(data?.products)
//               ? data.products
//               : Array.isArray(data?.data)
//                 ? data.data
//                 : []

//         const uniqueCategories = [
//           ...new Set(
//             products
//               .map((product) =>
//                 String(
//                   product?.category || ''
//                 ).trim()
//               )
//               .filter(Boolean)
//           ),
//         ].sort((a, b) =>
//           a.localeCompare(b)
//         )

//         if (isMounted) {
//           setCategories(
//             uniqueCategories
//           )
//         }
//       } catch (error) {
//         console.error(
//           'Failed to load categories:',
//           error
//         )

//         if (isMounted) {
//           setCategories([])
//         }
//       } finally {
//         if (isMounted) {
//           setIsCategoriesLoading(false)
//         }
//       }
//     }

//     loadCategories()

//     return () => {
//       isMounted = false
//     }
//   }, [])

//   // ============================================================
//   // CLOSE CATEGORY DROPDOWN WHEN CLICKING OUTSIDE
//   // ============================================================

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         categoriesRef.current &&
//         !categoriesRef.current.contains(
//           event.target
//         )
//       ) {
//         setIsCategoriesOpen(false)
//       }
//     }

//     document.addEventListener(
//       'mousedown',
//       handleClickOutside
//     )

//     return () => {
//       document.removeEventListener(
//         'mousedown',
//         handleClickOutside
//       )
//     }
//   }, [])

//   // ============================================================
//   // CATEGORY NAVIGATION
//   // ============================================================

//   const handleCategoryClick = (
//     category
//   ) => {
//     setIsCategoriesOpen(false)
//     closeMenu()

//     navigate(
//       `/products?category=${encodeURIComponent(
//         category
//       )}`
//     )
//   }

//   // ============================================================
//   // VIEW ALL PRODUCTS
//   // ============================================================

//   const handleViewAllProducts = () => {
//     setIsCategoriesOpen(false)
//     closeMenu()

//     navigate('/products')
//   }

//   // ============================================================
//   // LOGOUT
//   // ============================================================

//   const handleLogout = () => {
//     logout()
//     closeMenu()

//     navigate('/login', {
//       replace: true,
//     })
//   }

//   // ============================================================
//   // USER DISPLAY NAME
//   // ============================================================

//   const userName =
//     user?.firstName ||
//     user?.name ||
//     user?.fullName ||
//     user?.email?.split('@')[0] ||
//     'Account'

//   return (
//     <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//         {/* ======================================================
//             MAIN NAVBAR
//         ====================================================== */}

//         <div className="flex h-16 items-center justify-between">

//           {/* ====================================================
//               LOGO
//           ==================================================== */}

//           <Link
//             to="/"
//             onClick={closeMenu}
//             className="flex items-center gap-2"
//           >
//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
//               F
//             </div>

//             <span className="text-xl font-bold tracking-tight">
//               ፈገግታ
//             </span>
//           </Link>

//           {/* ====================================================
//               DESKTOP NAVIGATION
//           ==================================================== */}

//           <nav className="hidden items-center gap-7 md:flex">

//             <Link
//               to="/"
//               className="text-sm font-medium text-gray-700 transition hover:text-black"
//             >
//               {t('home')}
//             </Link>

//             <Link
//               to="/products"
//               className="text-sm font-medium text-gray-700 transition hover:text-black"
//             >
//               {t('products')}
//             </Link>

//             {/* ==================================================
//                 CATEGORIES DROPDOWN
//             ================================================== */}

//             <div
//               ref={categoriesRef}
//               className="relative"
//             >
//               <button
//                 type="button"
//                 onClick={() =>
//                   setIsCategoriesOpen(
//                     !isCategoriesOpen
//                   )
//                 }
//                 className="flex items-center gap-1.5 text-sm font-medium text-gray-700 transition hover:text-black"
//                 aria-expanded={
//                   isCategoriesOpen
//                 }
//               >
//                 <span>
//                   Categories
//                 </span>

//                 <ChevronDown
//                   className={`h-4 w-4 transition-transform ${
//                     isCategoriesOpen
//                       ? 'rotate-180'
//                       : ''
//                   }`}
//                 />
//               </button>

//               {isCategoriesOpen && (
//                 <div className="absolute left-1/2 top-full z-50 mt-3 w-64 -translate-x-1/2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">

//                   <div className="border-b border-gray-100 px-4 py-3">
//                     <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
//                       Categories
//                     </p>
//                   </div>

//                   <div className="max-h-80 overflow-y-auto p-2">

//                     {isCategoriesLoading ? (
//                       <div className="flex items-center justify-center gap-2 px-4 py-6 text-sm text-gray-500">
//                         <Loader2 className="h-4 w-4 animate-spin" />

//                         <span>
//                           Loading categories...
//                         </span>
//                       </div>
//                     ) : categories.length ===
//                       0 ? (
//                       <div className="px-4 py-6 text-center text-sm text-gray-500">
//                         No categories available.
//                       </div>
//                     ) : (
//                       categories.map(
//                         (category) => (
//                           <button
//                             key={category}
//                             type="button"
//                             onClick={() =>
//                               handleCategoryClick(
//                                 category
//                               )
//                             }
//                             className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
//                           >
//                             {category}
//                           </button>
//                         )
//                       )
//                     )}

//                   </div>

//                   {categories.length > 0 && (
//                     <div className="border-t border-gray-100 p-2">
//                       <button
//                         type="button"
//                         onClick={
//                           handleViewAllProducts
//                         }
//                         className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
//                       >
//                         View All Products
//                       </button>
//                     </div>
//                   )}

//                 </div>
//               )}
//             </div>

//             {/* ==================================================
//                 CONTACT US
//             ================================================== */}

//             {!isSeller && !isAdmin && (
//               <Link
//                 to="/contact"
//                 className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
//               >
//                 Contact Us
//               </Link>
//             )}

//             {/* ==================================================
//                 LOGGED-IN USER LINKS
//             ================================================== */}

//             {isAuthenticated && (
//               <>
//                 {/* My Orders */}

//                 {isCustomer && (
//                   <Link
//                     to="/account/orders"
//                     className="flex items-center gap-1.5 text-sm font-medium text-gray-700 transition hover:text-black"
//                   >
//                     <Package className="h-4 w-4" />

//                     <span>
//                       My Orders
//                     </span>
//                   </Link>
//                 )}

//                 {/* Seller Dashboard */}

//                 {isSeller && (
//                   <Link
//                     to="/seller"
//                     className="text-sm font-semibold text-gray-700 transition hover:text-black"
//                   >
//                     Seller Dashboard
//                   </Link>
//                 )}

//                 {/* Admin Dashboard */}

//                 {isAdmin && (
//                   <Link
//                     to="/admin"
//                     className="text-sm font-semibold text-gray-700 transition hover:text-black"
//                   >
//                     Admin
//                   </Link>
//                 )}
//               </>
//             )}

//           </nav>

//           {/* ====================================================
//               DESKTOP ACTIONS
//           ==================================================== */}

//           <div className="flex items-center gap-2 sm:gap-3">

//             {/* Language */}

//             <div className="hidden sm:block">
//               <LanguageSwitcher />
//             </div>

//             {/* ==================================================
//                 AUTH AREA
//             ================================================== */}

//             {!isAuthenticated ? (
//               <>
//                 {/* Login */}

//                 <Link
//                   to="/login"
//                   className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black sm:block"
//                 >
//                   {t('login')}
//                 </Link>

//                 {/* Register */}

//                 <Link
//                   to="/register"
//                   className="hidden rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 sm:block"
//                 >
//                   {t('register') ||
//                     'Register'}
//                 </Link>
//               </>
//             ) : (
//               <>
//                 {/* ==================================================
//                     ACCOUNT
//                 ================================================== */}

//                 <Link
//                   to="/account"
//                   className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black sm:flex"
//                 >
//                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
//                     <UserRound className="h-4 w-4" />
//                   </div>

//                   <div className="max-w-[120px]">
//                     <p className="truncate text-xs font-semibold text-gray-900">
//                       {userName}
//                     </p>

//                     <p className="text-[10px] text-gray-400">
//                       My Account
//                     </p>
//                   </div>
//                 </Link>

//                 {/* ==================================================
//                     LOGOUT
//                 ================================================== */}

//                 <button
//                   type="button"
//                   onClick={handleLogout}
//                   className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600 sm:flex"
//                 >
//                   <LogOut className="h-4 w-4" />

//                   <span>
//                     Logout
//                   </span>
//                 </button>
//               </>
//             )}

//             {/* ==================================================
//                 CART
//             ================================================== */}

//             <Link
//               to="/cart"
//               className="relative rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 hover:text-black"
//               aria-label={t('cart')}
//             >
//               <span className="relative block text-xl leading-none">
//                 🛒

//                 {totalItems > 0 && (
//                   <span className="absolute -right-3 -top-3 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
//                     {totalItems > 99
//                       ? '99+'
//                       : totalItems}
//                   </span>
//                 )}
//               </span>
//             </Link>

//             {/* ==================================================
//                 MOBILE MENU BUTTON
//             ================================================== */}

//             <button
//               type="button"
//               onClick={() =>
//                 setIsMenuOpen(
//                   !isMenuOpen
//                 )
//               }
//               className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 hover:text-black md:hidden"
//               aria-label={
//                 isMenuOpen
//                   ? 'Close menu'
//                   : 'Open menu'
//               }
//               aria-expanded={
//                 isMenuOpen
//               }
//             >
//               {isMenuOpen
//                 ? '✕'
//                 : '☰'}
//             </button>

//           </div>
//         </div>

//         {/* ======================================================
//             MOBILE NAVIGATION
//         ====================================================== */}

//         {isMenuOpen && (
//           <div className="border-t border-gray-100 py-4 md:hidden">

//             <nav className="flex flex-col">

//               <Link
//                 to="/"
//                 onClick={closeMenu}
//                 className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
//               >
//                 {t('home')}
//               </Link>

//               <Link
//                 to="/products"
//                 onClick={closeMenu}
//                 className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
//               >
//                 {t('products')}
//               </Link>

//               {/* ==================================================
//                   MOBILE CATEGORIES
//               ================================================== */}

//               <div className="mt-1">

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setIsCategoriesOpen(
//                       !isCategoriesOpen
//                     )
//                   }
//                   className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
//                 >
//                   <span>
//                     Categories
//                   </span>

//                   <ChevronDown
//                     className={`h-4 w-4 transition-transform ${
//                       isCategoriesOpen
//                         ? 'rotate-180'
//                         : ''
//                     }`}
//                   />
//                 </button>

//                 {isCategoriesOpen && (
//                   <div className="mt-1 rounded-xl bg-gray-50 p-2">

//                     {isCategoriesLoading ? (
//                       <div className="flex items-center justify-center gap-2 px-3 py-4 text-sm text-gray-500">
//                         <Loader2 className="h-4 w-4 animate-spin" />

//                         <span>
//                           Loading categories...
//                         </span>
//                       </div>
//                     ) : categories.length ===
//                       0 ? (
//                       <div className="px-3 py-4 text-center text-sm text-gray-500">
//                         No categories available.
//                       </div>
//                     ) : (
//                       <>
//                         {categories.map(
//                           (category) => (
//                             <button
//                               key={category}
//                               type="button"
//                               onClick={() =>
//                                 handleCategoryClick(
//                                   category
//                                 )
//                               }
//                               className="flex w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition hover:bg-white hover:text-black"
//                             >
//                               {category}
//                             </button>
//                           )
//                         )}

//                         <button
//                           type="button"
//                           onClick={
//                             handleViewAllProducts
//                           }
//                           className="mt-1 flex w-full rounded-lg border-t border-gray-200 px-3 py-2.5 pt-3 text-left text-sm font-semibold text-gray-900 transition hover:text-black"
//                         >
//                           View All Products
//                         </button>
//                       </>
//                     )}

//                   </div>
//                 )}

//               </div>

//               {/* ==================================================
//                   MOBILE ACCOUNT
//               ================================================== */}

//               {isAuthenticated && (
//                 <>
//                   <Link
//                     to="/account"
//                     onClick={closeMenu}
//                     className="mt-2 flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
//                   >
//                     <UserRound className="h-4 w-4" />

//                     <span>
//                       {userName}
//                     </span>
//                   </Link>

//                   {isCustomer && (
//                     <Link
//                       to="/account/orders"
//                       onClick={closeMenu}
//                       className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
//                     >
//                       <Package className="h-4 w-4" />

//                       <span>
//                         My Orders
//                       </span>
//                     </Link>
//                   )}

//                   {isSeller && (
//                     <Link
//                       to="/seller"
//                       onClick={closeMenu}
//                       className="rounded-lg px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-black"
//                     >
//                       Seller Dashboard
//                     </Link>
//                   )}

//                   {isAdmin && (
//                     <Link
//                       to="/admin"
//                       onClick={closeMenu}
//                       className="rounded-lg px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-black"
//                     >
//                       Admin Dashboard
//                     </Link>
//                   )}

//                   <button
//                     type="button"
//                     onClick={handleLogout}
//                     className="mt-2 flex items-center gap-3 rounded-lg bg-red-50 px-3 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-100"
//                   >
//                     <LogOut className="h-4 w-4" />

//                     <span>
//                       Logout
//                     </span>
//                   </button>
//                 </>
//               )}

//               {/* ==================================================
//                   MOBILE CONTACT US
//               ================================================== */}

//               {!isSeller && !isAdmin && (
//                 <Link
//                   to="/contact"
//                   onClick={closeMenu}
//                   className="mt-2 rounded-lg bg-black px-3 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
//                 >
//                   Contact Us
//                 </Link>
//               )}

//               {/* ==================================================
//                   MOBILE LOGIN / REGISTER
//               ================================================== */}

//               {!isAuthenticated && (
//                 <>
//                   <Link
//                     to="/login"
//                     onClick={closeMenu}
//                     className="mt-2 rounded-lg bg-gray-100 px-3 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-200"
//                   >
//                     {t('login')}
//                   </Link>

//                   <Link
//                     to="/register"
//                     onClick={closeMenu}
//                     className="mt-2 rounded-lg bg-black px-3 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
//                   >
//                     {t('register') ||
//                       'Register'}
//                   </Link>
//                 </>
//               )}

//               {/* ==================================================
//                   MOBILE LANGUAGE
//               ================================================== */}

//               <div className="mt-3 border-t border-gray-100 pt-3">
//                 <LanguageSwitcher />
//               </div>

//             </nav>
//           </div>
//         )}

//       </div>
//     </header>
//   )
// }

// export default Navbar


// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import {
//   UserRound,
//   LogOut,
//   Package,
//   ChevronDown,
//   Loader2,
//   ShoppingCart,
// } from 'lucide-react'

// import LanguageSwitcher from './LanguageSwitcher'
// import { useLanguage } from '../context/LanguageContext'
// import { useCart } from '../context/CartContext'
// import { useAuth } from '../context/AuthContext'

// const API_URL =
//   'https://fegegta-server.onrender.com/api'

// const Navbar = () => {
//   const { t } = useLanguage()
//   const { totalItems } = useCart()
//   const { user, logout } = useAuth()

//   const navigate = useNavigate()

//   const [categories, setCategories] = useState([])
//   const [loadingCategories, setLoadingCategories] = useState(false)
//   const [categoryOpen, setCategoryOpen] = useState(false)
//   const [accountOpen, setAccountOpen] = useState(false)

//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         setLoadingCategories(true)

//         const response = await fetch(`${API_URL}/products`)

//         if (!response.ok) {
//           throw new Error('Failed to load categories')
//         }

//         const data = await response.json()

//         const products = Array.isArray(data)
//           ? data
//           : Array.isArray(data.products)
//             ? data.products
//             : []

//         const uniqueCategories = [
//           ...new Set(
//             products
//               .map((product) => product.category)
//               .filter(Boolean)
//           ),
//         ]

//         setCategories(uniqueCategories)
//       } catch (error) {
//         console.error('Failed to load categories:', error)
//         setCategories([])
//       } finally {
//         setLoadingCategories(false)
//       }
//     }

//     loadCategories()
//   }, [])

//   const handleLogout = () => {
//     logout()
//     setAccountOpen(false)
//     navigate('/')
//   }

//   return (
//     <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">

//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

//         {/* =====================================================
//             LOGO
//         ====================================================== */}

//         <Link
//           to="/"
//           className="flex items-center gap-2"
//         >
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-xl font-bold text-white">
//             F
//           </div>

//           <div className="hidden sm:block">
//             <div className="text-lg font-bold leading-none text-gray-900">
//               ፈገግታ
//             </div>

//             <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">
//               Fegegta
//             </div>
//           </div>
//         </Link>


//         {/* =====================================================
//             DESKTOP NAVIGATION
//         ====================================================== */}

//         <nav className="hidden items-center gap-6 lg:flex">

//           <Link
//             to="/"
//             className="text-sm font-medium text-gray-700 transition hover:text-black"
//           >
//             {t('home')}
//           </Link>

//           <Link
//             to="/products"
//             className="text-sm font-medium text-gray-700 transition hover:text-black"
//           >
//             {t('products')}
//           </Link>


//           {/* ===================================================
//               CATEGORIES
//           ==================================================== */}

//           <div
//             className="relative"
//             onMouseEnter={() => setCategoryOpen(true)}
//             onMouseLeave={() => setCategoryOpen(false)}
//           >

//             <button
//               type="button"
//               className="flex items-center gap-1 text-sm font-medium text-gray-700 transition hover:text-black"
//             >
//               Categories
//               <ChevronDown
//                 size={15}
//                 className={`transition-transform ${
//                   categoryOpen ? 'rotate-180' : ''
//                 }`}
//               />
//             </button>


//             {categoryOpen && (
//               <div className="absolute left-0 top-full pt-3">

//                 <div className="w-56 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">

//                   {loadingCategories ? (
//                     <div className="flex items-center justify-center px-4 py-6">
//                       <Loader2
//                         size={20}
//                         className="animate-spin text-gray-500"
//                       />
//                     </div>
//                   ) : categories.length > 0 ? (
//                     categories.map((category) => (
//                       <Link
//                         key={category}
//                         to={`/products?category=${encodeURIComponent(category)}`}
//                         onClick={() => setCategoryOpen(false)}
//                         className="block rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100 hover:text-black"
//                       >
//                         {category}
//                       </Link>
//                     ))
//                   ) : (
//                     <div className="px-4 py-3 text-sm text-gray-500">
//                       No categories
//                     </div>
//                   )}

//                 </div>

//               </div>
//             )}

//           </div>


//           {/* ===================================================
//               CONTACT US
//           ==================================================== */}

//           <Link
//             to="/contact"
//             className="text-sm font-medium text-gray-700 transition hover:text-black"
//           >
//             Contact Us
//           </Link>


//           {/* ===================================================
//               ABOUT — ADDED AFTER CONTACT US
//           ==================================================== */}

//           <Link
//             to="/about"
//             className="text-sm font-medium text-gray-700 transition hover:text-black"
//           >
//             About
//           </Link>

//         </nav>


//         {/* =====================================================
//             RIGHT SIDE
//         ====================================================== */}

//         <div className="flex items-center gap-2 sm:gap-3">

//           <LanguageSwitcher />


//           {/* ===================================================
//               CART
//           ==================================================== */}

//           <Link
//             to="/cart"
//             className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 transition hover:bg-gray-100 hover:text-black"
//             aria-label="Shopping cart"
//           >
//             <ShoppingCart size={20} />

//             {totalItems > 0 && (
//               <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
//                 {totalItems > 99 ? '99+' : totalItems}
//               </span>
//             )}
//           </Link>


//           {/* ===================================================
//               ACCOUNT
//           ==================================================== */}

//           {user ? (
//             <div
//               className="relative"
//               onMouseEnter={() => setAccountOpen(true)}
//               onMouseLeave={() => setAccountOpen(false)}
//             >

//               <button
//                 type="button"
//                 className="flex h-10 items-center gap-2 rounded-xl px-3 text-gray-700 transition hover:bg-gray-100 hover:text-black"
//               >
//                 <UserRound size={19} />

//                 <span className="hidden max-w-[100px] truncate text-sm font-medium xl:block">
//                   {user.name || user.email || 'Account'}
//                 </span>

//                 <ChevronDown
//                   size={15}
//                   className={`hidden transition-transform xl:block ${
//                     accountOpen ? 'rotate-180' : ''
//                   }`}
//                 />
//               </button>


//               {accountOpen && (
//                 <div className="absolute right-0 top-full pt-3">

//                   <div className="w-60 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">

//                     <Link
//                       to="/account"
//                       onClick={() => setAccountOpen(false)}
//                       className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100"
//                     >
//                       <UserRound size={17} />
//                       Account
//                     </Link>

//                     <Link
//                       to="/account/orders"
//                       onClick={() => setAccountOpen(false)}
//                       className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100"
//                     >
//                       <Package size={17} />
//                       Orders
//                     </Link>


//                     {user.role === 'seller' && (
//                       <Link
//                         to="/seller"
//                         onClick={() => setAccountOpen(false)}
//                         className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100"
//                       >
//                         <Package size={17} />
//                         Seller Dashboard
//                       </Link>
//                     )}


//                     {user.role === 'admin' && (
//                       <Link
//                         to="/admin"
//                         onClick={() => setAccountOpen(false)}
//                         className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100"
//                       >
//                         <Package size={17} />
//                         Admin Dashboard
//                       </Link>
//                     )}


//                     <Link
//                       to="/seller/apply"
//                       onClick={() => setAccountOpen(false)}
//                       className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100"
//                     >
//                       <Package size={17} />
//                       {t('sellWithUs')}
//                     </Link>


//                     <div className="my-2 h-px bg-gray-100" />


//                     <button
//                       type="button"
//                       onClick={handleLogout}
//                       className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-600 transition hover:bg-red-50"
//                     >
//                       <LogOut size={17} />
//                       Logout
//                     </button>

//                   </div>

//                 </div>
//               )}

//             </div>
//           ) : (
//             <div className="hidden items-center gap-2 sm:flex">

//               <Link
//                 to="/login"
//                 className="rounded-xl px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
//               >
//                 Login
//               </Link>

//               <Link
//                 to="/register"
//                 className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
//               >
//                 Register
//               </Link>

//             </div>
//           )}

//         </div>

//       </div>


//       {/* =====================================================
//           MOBILE NAVIGATION
//       ====================================================== */}

//       <div className="border-t border-gray-100 lg:hidden">

//         <div className="flex items-center gap-5 overflow-x-auto px-4 py-3 scrollbar-hide">

//           <Link
//             to="/"
//             className="whitespace-nowrap text-sm font-medium text-gray-700"
//           >
//             {t('home')}
//           </Link>

//           <Link
//             to="/products"
//             className="whitespace-nowrap text-sm font-medium text-gray-700"
//           >
//             {t('products')}
//           </Link>

//           <Link
//             to="/contact"
//             className="whitespace-nowrap text-sm font-medium text-gray-700"
//           >
//             Contact Us
//           </Link>

//           <Link
//             to="/about"
//             className="whitespace-nowrap text-sm font-medium text-gray-700"
//           >
//             About
//           </Link>

//         </div>

//       </div>

//     </header>
//   )
// }

// export default Navbar

import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import LanguageSwitcher from './LanguageSwitcher'

import { useLanguage } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

import {
  UserRound,
  LogOut,
  Package,
  ChevronDown,
  Loader2,
} from 'lucide-react'

const API_URL =
  'https://fegegta-server.onrender.com/api'

function Navbar() {
  const { t } = useLanguage()
  const { totalItems } = useCart()

  const {
    user,
    isAuthenticated,
    isCustomer,
    isSeller,
    isAdmin,
    logout,
  } = useAuth()

  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] =
    useState(false)

  // ============================================================
  // CATEGORIES
  // ============================================================

  const [categories, setCategories] =
    useState([])

  const [isCategoriesOpen, setIsCategoriesOpen] =
    useState(false)

  const [isCategoriesLoading, setIsCategoriesLoading] =
    useState(false)

  const categoriesRef = useRef(null)

  // ============================================================
  // CLOSE MENU
  // ============================================================

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // ============================================================
  // LOAD PRODUCT CATEGORIES
  // ============================================================

  useEffect(() => {
    let isMounted = true

    const loadCategories = async () => {
      try {
        setIsCategoriesLoading(true)

        const response = await fetch(
          `${API_URL}/products`
        )

        if (!response.ok) {
          throw new Error(
            'Failed to load products'
          )
        }

        const data = await response.json()

        const products =
          Array.isArray(data)
            ? data
            : Array.isArray(data?.products)
              ? data.products
              : Array.isArray(data?.data)
                ? data.data
                : []

        const uniqueCategories = [
          ...new Set(
            products
              .map((product) =>
                String(
                  product?.category || ''
                ).trim()
              )
              .filter(Boolean)
          ),
        ].sort((a, b) =>
          a.localeCompare(b)
        )

        if (isMounted) {
          setCategories(
            uniqueCategories
          )
        }
      } catch (error) {
        console.error(
          'Failed to load categories:',
          error
        )

        if (isMounted) {
          setCategories([])
        }
      } finally {
        if (isMounted) {
          setIsCategoriesLoading(false)
        }
      }
    }

    loadCategories()

    return () => {
      isMounted = false
    }
  }, [])

  // ============================================================
  // CLOSE CATEGORY DROPDOWN WHEN CLICKING OUTSIDE
  // ============================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(
          event.target
        )
      ) {
        setIsCategoriesOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
    }
  }, [])

  // ============================================================
  // CATEGORY NAVIGATION
  // ============================================================

  const handleCategoryClick = (
    category
  ) => {
    setIsCategoriesOpen(false)
    closeMenu()

    navigate(
      `/products?category=${encodeURIComponent(
        category
      )}`
    )
  }

  // ============================================================
  // VIEW ALL PRODUCTS
  // ============================================================

  const handleViewAllProducts = () => {
    setIsCategoriesOpen(false)
    closeMenu()

    navigate('/products')
  }

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = () => {
    logout()
    closeMenu()

    navigate('/login', {
      replace: true,
    })
  }

  // ============================================================
  // USER DISPLAY NAME
  // ============================================================

  const userName =
    user?.firstName ||
    user?.name ||
    user?.fullName ||
    user?.email?.split('@')[0] ||
    'Account'

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ======================================================
            MAIN NAVBAR
        ====================================================== */}

        <div className="flex h-16 items-center justify-between">

          {/* ====================================================
              LOGO
          ==================================================== */}

          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
              F
            </div>

            <span className="text-xl font-bold tracking-tight">
              ፈገግታ
            </span>
          </Link>

          {/* ====================================================
              DESKTOP NAVIGATION
          ==================================================== */}

          <nav className="hidden items-center gap-7 md:flex">

            <Link
              to="/"
              className="text-sm font-medium text-gray-700 transition hover:text-black"
            >
              {t('home')}
            </Link>

            <Link
              to="/products"
              className="text-sm font-medium text-gray-700 transition hover:text-black"
            >
              {t('products')}
            </Link>

            {/* ==================================================
                CATEGORIES DROPDOWN
            ================================================== */}

            <div
              ref={categoriesRef}
              className="relative"
            >
              <button
                type="button"
                onClick={() =>
                  setIsCategoriesOpen(
                    !isCategoriesOpen
                  )
                }
                className="flex items-center gap-1.5 text-sm font-medium text-gray-700 transition hover:text-black"
                aria-expanded={
                  isCategoriesOpen
                }
              >
                <span>
                  Categories
                </span>

                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isCategoriesOpen
                      ? 'rotate-180'
                      : ''
                  }`}
                />
              </button>

              {isCategoriesOpen && (
                <div className="absolute left-1/2 top-full z-50 mt-3 w-64 -translate-x-1/2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">

                  <div className="border-b border-gray-100 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Categories
                    </p>
                  </div>

                  <div className="max-h-80 overflow-y-auto p-2">

                    {isCategoriesLoading ? (
                      <div className="flex items-center justify-center gap-2 px-4 py-6 text-sm text-gray-500">
                        <Loader2 className="h-4 w-4 animate-spin" />

                        <span>
                          Loading categories...
                        </span>
                      </div>
                    ) : categories.length ===
                      0 ? (
                      <div className="px-4 py-6 text-center text-sm text-gray-500">
                        No categories available.
                      </div>
                    ) : (
                      categories.map(
                        (category) => (
                          <button
                            key={category}
                            type="button"
                            onClick={() =>
                              handleCategoryClick(
                                category
                              )
                            }
                            className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
                          >
                            {category}
                          </button>
                        )
                      )
                    )}

                  </div>

                  {categories.length > 0 && (
                    <div className="border-t border-gray-100 p-2">
                      <button
                        type="button"
                        onClick={
                          handleViewAllProducts
                        }
                        className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
                      >
                        View All Products
                      </button>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* ==================================================
                CONTACT US
            ================================================== */}

            {!isSeller && !isAdmin && (
              <Link
                to="/contact"
                className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Contact Us
              </Link>
            )}

            {/* ==================================================
                ABOUT
            ================================================== */}

            <Link
              to="/about"
              className="text-sm font-medium text-gray-700 transition hover:text-black"
            >
              About
            </Link>

            {/* ==================================================
                LOGGED-IN USER LINKS
            ================================================== */}

            {isAuthenticated && (
              <>
                {/* My Orders */}

                {isCustomer && (
                  <Link
                    to="/account/orders"
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-700 transition hover:text-black"
                  >
                    <Package className="h-4 w-4" />

                    <span>
                      My Orders
                    </span>
                  </Link>
                )}

                {/* Seller Dashboard */}

                {isSeller && (
                  <Link
                    to="/seller"
                    className="text-sm font-semibold text-gray-700 transition hover:text-black"
                  >
                    Seller Dashboard
                  </Link>
                )}

                {/* Admin Dashboard */}

                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-sm font-semibold text-gray-700 transition hover:text-black"
                  >
                    Admin
                  </Link>
                )}
              </>
            )}

          </nav>

          {/* ====================================================
              DESKTOP ACTIONS
          ==================================================== */}

          <div className="flex items-center gap-2 sm:gap-3">

            {/* Language */}

            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* ==================================================
                AUTH AREA
            ================================================== */}

            {!isAuthenticated ? (
              <>
                {/* Login */}

                <Link
                  to="/login"
                  className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black sm:block"
                >
                  {t('login')}
                </Link>

                {/* Register */}

                <Link
                  to="/register"
                  className="hidden rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 sm:block"
                >
                  {t('register') ||
                    'Register'}
                </Link>
              </>
            ) : (
              <>
                {/* ==================================================
                    ACCOUNT
                ================================================== */}

                <Link
                  to="/account"
                  className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black sm:flex"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                    <UserRound className="h-4 w-4" />
                  </div>

                  <div className="max-w-[120px]">
                    <p className="truncate text-xs font-semibold text-gray-900">
                      {userName}
                    </p>

                    <p className="text-[10px] text-gray-400">
                      My Account
                    </p>
                  </div>
                </Link>

                {/* ==================================================
                    LOGOUT
                ================================================== */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600 sm:flex"
                >
                  <LogOut className="h-4 w-4" />

                  <span>
                    Logout
                  </span>
                </button>
              </>
            )}

            {/* ==================================================
                CART
            ================================================== */}

            <Link
              to="/cart"
              className="relative rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 hover:text-black"
              aria-label={t('cart')}
            >
              <span className="relative block text-xl leading-none">
                🛒

                {totalItems > 0 && (
                  <span className="absolute -right-3 -top-3 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
                    {totalItems > 99
                      ? '99+'
                      : totalItems}
                  </span>
                )}
              </span>
            </Link>

            {/* ==================================================
                MOBILE MENU BUTTON
            ================================================== */}

            <button
              type="button"
              onClick={() =>
                setIsMenuOpen(
                  !isMenuOpen
                )
              }
              className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 hover:text-black md:hidden"
              aria-label={
                isMenuOpen
                  ? 'Close menu'
                  : 'Open menu'
              }
              aria-expanded={
                isMenuOpen
              }
            >
              {isMenuOpen
                ? '✕'
                : '☰'}
            </button>

          </div>
        </div>

        {/* ======================================================
            MOBILE NAVIGATION
        ====================================================== */}

        {isMenuOpen && (
          <div className="border-t border-gray-100 py-4 md:hidden">

            <nav className="flex flex-col">

              <Link
                to="/"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
              >
                {t('home')}
              </Link>

              <Link
                to="/products"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
              >
                {t('products')}
              </Link>

              {/* ==================================================
                  MOBILE CATEGORIES
              ================================================== */}

              <div className="mt-1">

                <button
                  type="button"
                  onClick={() =>
                    setIsCategoriesOpen(
                      !isCategoriesOpen
                    )
                  }
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
                >
                  <span>
                    Categories
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isCategoriesOpen
                        ? 'rotate-180'
                        : ''
                    }`}
                  />
                </button>

                {isCategoriesOpen && (
                  <div className="mt-1 rounded-xl bg-gray-50 p-2">

                    {isCategoriesLoading ? (
                      <div className="flex items-center justify-center gap-2 px-3 py-4 text-sm text-gray-500">
                        <Loader2 className="h-4 w-4 animate-spin" />

                        <span>
                          Loading categories...
                        </span>
                      </div>
                    ) : categories.length ===
                      0 ? (
                      <div className="px-3 py-4 text-center text-sm text-gray-500">
                        No categories available.
                      </div>
                    ) : (
                      <>
                        {categories.map(
                          (category) => (
                            <button
                              key={category}
                              type="button"
                              onClick={() =>
                                handleCategoryClick(
                                  category
                                )
                              }
                              className="flex w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition hover:bg-white hover:text-black"
                            >
                              {category}
                            </button>
                          )
                        )}

                        <button
                          type="button"
                          onClick={
                            handleViewAllProducts
                          }
                          className="mt-1 flex w-full rounded-lg border-t border-gray-200 px-3 py-2.5 pt-3 text-left text-sm font-semibold text-gray-900 transition hover:text-black"
                        >
                          View All Products
                        </button>
                      </>
                    )}

                  </div>
                )}

              </div>

              {/* ==================================================
                  MOBILE ACCOUNT
              ================================================== */}

              {isAuthenticated && (
                <>
                  <Link
                    to="/account"
                    onClick={closeMenu}
                    className="mt-2 flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
                  >
                    <UserRound className="h-4 w-4" />

                    <span>
                      {userName}
                    </span>
                  </Link>

                  {isCustomer && (
                    <Link
                      to="/account/orders"
                      onClick={closeMenu}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
                    >
                      <Package className="h-4 w-4" />

                      <span>
                        My Orders
                      </span>
                    </Link>
                  )}

                  {isSeller && (
                    <Link
                      to="/seller"
                      onClick={closeMenu}
                      className="rounded-lg px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-black"
                    >
                      Seller Dashboard
                    </Link>
                  )}

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={closeMenu}
                      className="rounded-lg px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-black"
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 flex items-center gap-3 rounded-lg bg-red-50 px-3 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    <LogOut className="h-4 w-4" />

                    <span>
                      Logout
                    </span>
                  </button>
                </>
              )}

              {/* ==================================================
                  MOBILE CONTACT US
              ================================================== */}

              {!isSeller && !isAdmin && (
                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="mt-2 rounded-lg bg-black px-3 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Contact Us
                </Link>
              )}

              {/* ==================================================
                  MOBILE ABOUT
              ================================================== */}

              <Link
                to="/about"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
              >
                About
              </Link>

              {/* ==================================================
                  MOBILE LOGIN / REGISTER
              ================================================== */}

              {!isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="mt-2 rounded-lg bg-gray-100 px-3 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-200"
                  >
                    {t('login')}
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="mt-2 rounded-lg bg-black px-3 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
                  >
                    {t('register') ||
                      'Register'}
                  </Link>
                </>
              )}

              {/* ==================================================
                  MOBILE LANGUAGE
              ================================================== */}

              <div className="mt-3 border-t border-gray-100 pt-3">
                <LanguageSwitcher />
              </div>

            </nav>
          </div>
        )}

      </div>
    </header>
  )
}

export default Navbar