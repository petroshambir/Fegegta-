import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const {
    user,
    isLoading,
    isAuthenticated,
  } = useAuth()

  const location = useLocation()

  // Check authentication state first
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white px-4">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

          <p className="mt-4 text-sm text-gray-500">
            Checking your account...
          </p>
        </div>
      </div>
    )
  }

  // User is not logged in
  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    )
  }

  // Check user role
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />
    }

    if (user.role === 'seller') {
      return <Navigate to="/seller" replace />
    }

    if (user.role === 'customer') {
      return <Navigate to="/account" replace />
    }

    return <Navigate to="/" replace />
  }

  // Access granted
  return children
}

export default ProtectedRoute