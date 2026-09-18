
// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from 'react'

// const AuthContext = createContext(null)

// // ============================================================
// // FEGEGTA BACKEND
// // ============================================================

// const API_URL = 'https://fegegta-server.onrender.com/api'

// // ============================================================
// // LOCAL STORAGE
// // ============================================================

// const AUTH_STORAGE_KEY = 'fegegta_auth_user'
// const AUTH_TOKEN_KEY = 'fegegta_auth_token'

// // ============================================================
// // AUTH PROVIDER
// // ============================================================

// function AuthProvider({ children }) {
//   const [user, setUser] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)

//   // ==========================================================
//   // SAVE USER
//   // ==========================================================

//   const saveUser = (userData) => {
//     setUser(userData)

//     if (userData) {
//       localStorage.setItem(
//         AUTH_STORAGE_KEY,
//         JSON.stringify(userData)
//       )
//     } else {
//       localStorage.removeItem(AUTH_STORAGE_KEY)
//     }
//   }

//   // ==========================================================
//   // SAVE TOKEN
//   // ==========================================================

//   const saveToken = (token) => {
//     if (token) {
//       localStorage.setItem(
//         AUTH_TOKEN_KEY,
//         token
//       )
//     } else {
//       localStorage.removeItem(AUTH_TOKEN_KEY)
//     }
//   }

//   // ==========================================================
//   // GET TOKEN
//   // ==========================================================

//   const getToken = () => {
//     return localStorage.getItem(
//       AUTH_TOKEN_KEY
//     )
//   }

//   // ==========================================================
//   // LOAD CURRENT USER
//   // ==========================================================

//   useEffect(() => {
//     const loadCurrentUser = async () => {
//       const token = localStorage.getItem(
//         AUTH_TOKEN_KEY
//       )

//       // No token means the user is not logged in.
//       if (!token) {
//         setUser(null)
//         setIsLoading(false)
//         return
//       }

//       try {
//         const response = await fetch(
//           `${API_URL}/auth/me`,
//           {
//             method: 'GET',
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         )

//         const data = await response.json()

//         if (!response.ok) {
//           throw new Error(
//             data.message ||
//               'Authentication session expired.'
//           )
//         }

//         // Backend may return:
//         // { success: true, user: {...} }

//         if (data.user) {
//           saveUser(data.user)
//         } else {
//           throw new Error(
//             'User information was not returned by the server.'
//           )
//         }
//       } catch (error) {
//         console.error(
//           'Failed to restore authentication:',
//           error
//         )

//         // Token is invalid/expired.
//         saveToken(null)
//         saveUser(null)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     loadCurrentUser()
//   }, [])

//   // ==========================================================
//   // LOGIN
//   // ==========================================================

//   const login = async ({
//     email,
//     password,
//   }) => {
//     try {
//       const normalizedEmail = email
//         ?.trim()
//         .toLowerCase()

//       if (!normalizedEmail || !password) {
//         return {
//           success: false,
//           message:
//             'Email/username ወይ password ኣእቱ።',
//         }
//       }

//       const response = await fetch(
//         `${API_URL}/auth/login`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             email: normalizedEmail,
//             password,
//           }),
//         }
//       )

//       const data = await response.json()

//       if (!response.ok) {
//         return {
//           success: false,
//           message:
//             data.message ||
//             'Login failed. Please check your credentials.',
//         }
//       }

//       // Backend expected response:
//       // {
//       //   success: true,
//       //   user: {...},
//       //   token: "..."
//       // }

//       const token = data.token
//       const loggedInUser = data.user

//       if (!token || !loggedInUser) {
//         return {
//           success: false,
//           message:
//             'Invalid response received from the server.',
//         }
//       }

//       saveToken(token)
//       saveUser(loggedInUser)

//       return {
//         success: true,
//         user: loggedInUser,
//         token,
//       }
//     } catch (error) {
//       console.error(
//         'Login error:',
//         error
//       )

//       return {
//         success: false,
//         message:
//           'Unable to connect to the server. Please try again.',
//       }
//     }
//   }

//   // ==========================================================
//   // REGISTER
//   // ==========================================================

//   const register = async (
//     registerData
//   ) => {
//     try {
//       const response = await fetch(
//         `${API_URL}/auth/register`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(
//             registerData
//           ),
//         }
//       )

//       const data = await response.json()

//       if (!response.ok) {
//         return {
//           success: false,
//           message:
//             data.message ||
//             'Registration failed. Please try again.',
//         }
//       }

//       // Some backends return the token
//       // immediately after registration.
//       if (data.token) {
//         saveToken(data.token)
//       }

//       if (data.user) {
//         saveUser(data.user)
//       }

//       return {
//         success: true,
//         user: data.user || null,
//         token: data.token || null,
//         message:
//           data.message ||
//           'Registration successful.',
//       }
//     } catch (error) {
//       console.error(
//         'Registration error:',
//         error
//       )

//       return {
//         success: false,
//         message:
//           'Unable to connect to the server. Please try again.',
//       }
//     }
//   }

//   // ==========================================================
//   // LOGOUT
//   // ==========================================================

//   const logout = () => {
//     setUser(null)

//     localStorage.removeItem(
//       AUTH_STORAGE_KEY
//     )

//     localStorage.removeItem(
//       AUTH_TOKEN_KEY
//     )
//   }

//   // ==========================================================
//   // USER ROLE HELPERS
//   // ==========================================================

//   const isAuthenticated =
//     Boolean(user)

//   const isCustomer =
//     user?.role === 'customer'

//   const isSeller =
//     user?.role === 'seller'

//   const isAdmin =
//     user?.role === 'admin'

//   // ==========================================================
//   // CONTEXT VALUE
//   // ==========================================================

//   const value = {
//     user,
//     setUser,

//     isLoading,
//     isAuthenticated,

//     isCustomer,
//     isSeller,
//     isAdmin,

//     login,
//     register,
//     logout,

//     saveUser,
//     saveToken,
//     getToken,
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// // ============================================================
// // USE AUTH HOOK
// // ============================================================

// export function useAuth() {
//   const context =
//     useContext(AuthContext)

//   if (!context) {
//     throw new Error(
//       'useAuth must be used inside AuthProvider'
//     )
//   }

//   return context
// }

// export default AuthProvider

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

const AuthContext = createContext(null)

// ============================================================
// FEGEGTA BACKEND
// ============================================================

const API_URL =
  'https://fegegta-server.onrender.com/api'

// ============================================================
// LOCAL STORAGE
// ============================================================

const AUTH_STORAGE_KEY =
  'fegegta_auth_user'

const AUTH_TOKEN_KEY =
  'token'

// ============================================================
// AUTH PROVIDER
// ============================================================

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] =
    useState(true)

  // ==========================================================
  // SAVE USER
  // ==========================================================

  const saveUser = (userData) => {
    setUser(userData)

    if (userData) {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(userData)
      )
    } else {
      localStorage.removeItem(
        AUTH_STORAGE_KEY
      )
    }
  }

  // ==========================================================
  // SAVE TOKEN
  // ==========================================================

  const saveToken = (token) => {
    if (token) {
      localStorage.setItem(
        AUTH_TOKEN_KEY,
        token
      )
    } else {
      localStorage.removeItem(
        AUTH_TOKEN_KEY
      )
    }
  }

  // ==========================================================
  // GET TOKEN
  // ==========================================================

  const getToken = () => {
    return localStorage.getItem(
      AUTH_TOKEN_KEY
    )
  }

  // ==========================================================
  // LOAD CURRENT USER
  // ==========================================================

  useEffect(() => {
    const loadCurrentUser =
      async () => {
        const token =
          localStorage.getItem(
            AUTH_TOKEN_KEY
          )

        // No token
        if (!token) {
          setUser(null)
          setIsLoading(false)
          return
        }

        try {
          const response =
            await fetch(
              `${API_URL}/auth/me`,
              {
                method: 'GET',
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            )

          const data =
            await response.json()

          if (!response.ok) {
            throw new Error(
              data.message ||
                'Authentication session expired.'
            )
          }

          if (data.user) {
            saveUser(data.user)
          } else {
            throw new Error(
              'User information was not returned by the server.'
            )
          }
        } catch (error) {
          console.error(
            'Failed to restore authentication:',
            error
          )

          saveToken(null)
          saveUser(null)
        } finally {
          setIsLoading(false)
        }
      }

    loadCurrentUser()
  }, [])

  // ==========================================================
  // LOGIN
  // ==========================================================

  const login = async ({
    email,
    password,
  }) => {
    try {
      const normalizedEmail =
        email
          ?.trim()
          .toLowerCase()

      if (
        !normalizedEmail ||
        !password
      ) {
        return {
          success: false,
          message:
            'Email ወይ password ኣእቱ።',
        }
      }

      const response =
        await fetch(
          `${API_URL}/auth/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify({
              email:
                normalizedEmail,
              password,
            }),
          }
        )

      const data =
        await response.json()

      if (!response.ok) {
        return {
          success: false,
          message:
            data.message ||
            'Login failed. Please check your credentials.',
        }
      }

      // ------------------------------------------------------
      // BACKEND RESPONSE
      // ------------------------------------------------------
      // {
      //   success: true,
      //   token: "...",
      //   user: {...}
      // }

      const token =
        data.token

      const loggedInUser =
        data.user

      if (
        !token ||
        !loggedInUser
      ) {
        return {
          success: false,
          message:
            'Invalid response received from the server.',
        }
      }

      // Save authentication
      saveToken(token)
      saveUser(loggedInUser)

      return {
        success: true,
        user:
          loggedInUser,
        token,
        message:
          data.message ||
          'Login successful.',
      }
    } catch (error) {
      console.error(
        'Login error:',
        error
      )

      return {
        success: false,
        message:
          'Unable to connect to the server. Please try again.',
      }
    }
  }

  // ==========================================================
  // REGISTER
  // ==========================================================

  const register = async (
    registerData
  ) => {
    try {
      const response =
        await fetch(
          `${API_URL}/auth/register`,
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify(
              registerData
            ),
          }
        )

      const data =
        await response.json()

      if (!response.ok) {
        return {
          success: false,
          message:
            data.message ||
            'Registration failed. Please try again.',
        }
      }

      // ------------------------------------------------------
      // SAVE TOKEN
      // ------------------------------------------------------

      if (data.token) {
        saveToken(data.token)
      }

      // ------------------------------------------------------
      // SAVE USER
      // ------------------------------------------------------

      if (data.user) {
        saveUser(data.user)
      }

      return {
        success: true,
        user:
          data.user || null,
        token:
          data.token || null,
        message:
          data.message ||
          'Registration successful.',
      }
    } catch (error) {
      console.error(
        'Registration error:',
        error
      )

      return {
        success: false,
        message:
          'Unable to connect to the server. Please try again.',
      }
    }
  }

  // ==========================================================
  // LOGOUT
  // ==========================================================

  const logout = () => {
    setUser(null)

    localStorage.removeItem(
      AUTH_STORAGE_KEY
    )

    localStorage.removeItem(
      AUTH_TOKEN_KEY
    )
  }

  // ==========================================================
  // USER ROLE HELPERS
  // ==========================================================

  const isAuthenticated =
    Boolean(user)

  const isCustomer =
    user?.role === 'customer'

  const isSeller =
    user?.role === 'seller'

  const isAdmin =
    user?.role === 'admin'

  // ==========================================================
  // CONTEXT VALUE
  // ==========================================================

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
    saveToken,
    getToken,
  }

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ============================================================
// USE AUTH HOOK
// ============================================================

export function useAuth() {
  const context =
    useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    )
  }

  return context
}

export default AuthProvider