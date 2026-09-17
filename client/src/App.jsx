import { Routes, Route } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'

// ============================================================
// PUBLIC PAGES
// ============================================================

import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Categories from './pages/Categories'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'

// ============================================================
// AUTH PAGES
// ============================================================

import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'

// ============================================================
// SELLER PAGES
// ============================================================

import SellerDashboard from './pages/seller/SellerDashboard'
import StoreProfile from './pages/seller/StoreProfile'
import SellerStore from './pages/seller/SellerStore'
import SellerProducts from './pages/seller/SellerProducts'
import AddProduct from './pages/seller/AddProduct'
import EditProduct from './pages/seller/EditProduct'
import SellerOrders from './pages/seller/SellerOrders'
import SellerOrderDetails from './pages/seller/SellerOrderDetails'
import SellerSales from './pages/seller/SellerSales'
import SellerEarnings from './pages/seller/SellerEarnings'
import SellerNotifications from './pages/seller/SellerNotifications'
import SellerApplicationStatus from './pages/seller/SellerApplicationStatus'
import SellerApplicant from './pages/seller/SellerApplicant'

// ============================================================
// CUSTOMER ACCOUNT PAGES
// ============================================================

import Account from './pages/account/Account'
import Profile from './pages/account/Profile'
import Orders from './pages/account/Orders'
import OrderDetails from './pages/account/OrderDetails'
import Favorites from './pages/account/Favorites'
import Addresses from './pages/account/Addresses'
import Settings from './pages/account/Settings'

// ============================================================
// ADMIN PAGES
// ============================================================

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminMyProducts from './pages/admin/AdminMyProducts'
import AdminAddProduct from './pages/admin/AdminAddProduct'
import AdminEditProduct from './pages/admin/AdminEditProduct'
import AdminSellers from './pages/admin/AdminSellers'
import AdminSellerDetails from './pages/admin/AdminSellerDetails'
import AdminSellerProducts from './pages/admin/AdminSellerProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminCustomers from './pages/admin/AdminCustomers'
import AdminCommission from './pages/admin/AdminCommission'
import AdminNotifications from './pages/admin/AdminNotifications'
import AdminSettings from './pages/admin/AdminSettings'
import MyOrders from './pages/MyOrders';
// ============================================================
// PROTECTION COMPONENTS
// ============================================================

import ProtectedRoute from './components/ProtectedRoute'
import AdminProtectedRoute from './components/admin/AdminProtectedRoute'


function App() {
  return (
    <MainLayout>
      <Routes>

        {/* ================================================== */}
        {/* PUBLIC ROUTES */}
        {/* ================================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/order-confirmation"
          element={<OrderConfirmation />}
        />

        {/* ================================================== */}
        {/* AUTH ROUTES */}
        {/* ================================================== */}

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* ================================================== */}
        {/* SELLER APPLICATION ROUTES */}
        {/* ================================================== */}

        <Route
          path="/seller/apply"
          element={<SellerApplicant />}
        />

        <Route
          path="/seller/application-status"
          element={<SellerApplicationStatus />}
        />

        {/* ================================================== */}
        {/* PUBLIC SELLER STORE */}
        {/* ================================================== */}

        <Route
          path="/store/:slug"
          element={<SellerStore />}
        />

        {/* ================================================== */}
        {/* CUSTOMER ACCOUNT ROUTES */}
        {/* ================================================== */}

        <Route
          path="/account"
          element={
            <ProtectedRoute
              allowedRoles={['customer', 'seller']}
            >
              <Account />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account/profile"
          element={
            <ProtectedRoute
              allowedRoles={['customer', 'seller']}
            >
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account/orders"
          element={
            <ProtectedRoute
              allowedRoles={['customer', 'seller']}
            >
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account/orders/:id"
          element={
            <ProtectedRoute
              allowedRoles={['customer', 'seller']}
            >
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account/favorites"
          element={
            <ProtectedRoute
              allowedRoles={['customer', 'seller']}
            >
              <Favorites />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account/addresses"
          element={
            <ProtectedRoute
              allowedRoles={['customer', 'seller']}
            >
              <Addresses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account/settings"
          element={
            <ProtectedRoute
              allowedRoles={['customer', 'seller']}
            >
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* ================================================== */}
        {/* SELLER DASHBOARD ROUTES */}
        {/* ================================================== */}

        <Route
          path="/seller"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/store"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <StoreProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/products"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <SellerProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/products/add"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/products/:id/edit"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/orders"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <SellerOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/orders/:id"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <SellerOrderDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/sales"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <SellerSales />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/earnings"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <SellerEarnings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/notifications"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <SellerNotifications />
            </ProtectedRoute>
          }
        />

        {/* ================================================== */}
        {/* ADMIN DASHBOARD ROUTES */}
        {/* ================================================== */}

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        {/* ADMIN'S OWN PRODUCTS */}

        <Route
          path="/admin/products"
          element={
            <AdminProtectedRoute>
              <AdminMyProducts />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/products/add"
          element={
            <AdminProtectedRoute>
              <AdminAddProduct />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/products/:id/edit"
          element={
            <AdminProtectedRoute>
              <AdminEditProduct />
            </AdminProtectedRoute>
          }
        />

        {/* SELLER MANAGEMENT */}

        <Route
          path="/admin/sellers"
          element={
            <AdminProtectedRoute>
              <AdminSellers />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/sellers/:id"
          element={
            <AdminProtectedRoute>
              <AdminSellerDetails />
            </AdminProtectedRoute>
          }
        />

        {/* THIRD-PARTY SELLER PRODUCTS */}

        <Route
          path="/admin/seller-products"
          element={
            <AdminProtectedRoute>
              <AdminSellerProducts />
            </AdminProtectedRoute>
          }
        />

        {/* PLATFORM ORDERS */}

        <Route
          path="/admin/orders"
          element={
            <AdminProtectedRoute>
              <AdminOrders />
            </AdminProtectedRoute>
          }
        />

        {/* CUSTOMERS */}

        <Route
          path="/admin/customers"
          element={
            <AdminProtectedRoute>
              <AdminCustomers />
            </AdminProtectedRoute>
          }
        />

        {/* COMMISSION */}

        <Route
          path="/admin/commission"
          element={
            <AdminProtectedRoute>
              <AdminCommission />
            </AdminProtectedRoute>
          }
        />

        {/* ADMIN NOTIFICATIONS */}

        <Route
          path="/admin/notifications"
          element={
            <AdminProtectedRoute>
              <AdminNotifications />
            </AdminProtectedRoute>
          }
        />

        {/* ADMIN SETTINGS */}

        <Route
          path="/admin/settings"
          element={
            <AdminProtectedRoute>
              <AdminSettings />
            </AdminProtectedRoute>
          }
        />

        {/* ================================================== */}
        {/* FALLBACK ROUTE */}
        {/* ================================================== */}

        <Route
          path="*"
          element={<Home />}
        />
        <Route path="/my-orders" element={<MyOrders />} />

      </Routes>
    </MainLayout>
  )
}

export default App