import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

const AuthContext = createContext(null)

const AUTH_STORAGE_KEY = 'fegegta_auth_user'

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // ============================================================
  // LOAD SAVED USER
  // ============================================================

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(
        AUTH_STORAGE_KEY
      )

      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error(
        'Failed to load authentication data:',
        error
      )

      localStorage.removeItem(AUTH_STORAGE_KEY)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // ============================================================
  // SAVE USER
  // ============================================================

  const saveUser = (userData) => {
    setUser(userData)

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(userData)
    )
  }

  // ============================================================
  // LOGIN
  // ============================================================

  const login = async ({ email, password }) => {
    const normalizedEmail = email
      .trim()
      .toLowerCase()

    // ========================================================
    // DEMO ADMIN LOGIN
    // ========================================================

    if (
      normalizedEmail === 'admin@fegegta.com' &&
      password === 'Admin@123'
    ) {
      const adminUser = {
        id: 'admin-owner-001',
        name: 'Fegegta Admin',
        email: 'admin@fegegta.com',
        role: 'admin',
      }

      saveUser(adminUser)

      return {
        success: true,
        user: adminUser,
      }
    }

    // ========================================================
    // DEMO SELLER LOGIN
    // ========================================================

    if (
      normalizedEmail === 'seller@fegegta.com' &&
      password === 'Seller@123'
    ) {
      const sellerUser = {
        id: 'seller-demo-001',
        name: 'Demo Seller',
        email: 'seller@fegegta.com',
        role: 'seller',
        sellerId: 'seller-demo-001',
      }

      saveUser(sellerUser)

      return {
        success: true,
        user: sellerUser,
      }
    }

    // ========================================================
    // DEMO CUSTOMER LOGIN
    // ========================================================

    if (
      normalizedEmail === 'customer@fegegta.com' &&
      password === 'Customer@123'
    ) {
      const customerUser = {
        id: 'customer-demo-001',
        name: 'Demo Customer',
        email: 'customer@fegegta.com',
        role: 'customer',
      }

      saveUser(customerUser)

      return {
        success: true,
        user: customerUser,
      }
    }

    // ========================================================
    // INVALID LOGIN
    // ========================================================

    return {
      success: false,
      message:
        'Email/username ወይ password ትኽክል ኣይኮነን።',
    }
  }

  // ============================================================
  // REGISTER
  // ============================================================

  const register = async (registerData) => {
    console.log('Register request:', registerData)

    return {
      success: false,
      message:
        'Backend registration is not connected yet.',
    }
  }

  // ============================================================
  // LOGOUT
  // ============================================================

  const logout = () => {
    setUser(null)

    localStorage.removeItem(
      AUTH_STORAGE_KEY
    )
  }

  // ============================================================
  // USER ROLE HELPERS
  // ============================================================

  const isAuthenticated = Boolean(user)
  const isCustomer = user?.role === 'customer'
  const isSeller = user?.role === 'seller'
  const isAdmin = user?.role === 'admin'

  // ============================================================
  // CONTEXT VALUE
  // ============================================================

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    isCustomer,
    isSeller,
    isAdmin,
    login,
    register,
    logout,
    saveUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// ============================================================
// USE AUTH HOOK
// ============================================================

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    )
  }

  return context
}

export default AuthProvider