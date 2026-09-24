

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from 'react'

// const CartContext = createContext(null)

// const CART_STORAGE_KEY = 'fegegta_cart_items'

// // =========================================================
// // CART PROVIDER
// // =========================================================

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState(() => {
//     try {
//       const savedCart = localStorage.getItem(CART_STORAGE_KEY)

//       if (!savedCart) {
//         return []
//       }

//       const parsedCart = JSON.parse(savedCart)

//       return Array.isArray(parsedCart) ? parsedCart : []
//     } catch (error) {
//       console.error('Failed to load cart:', error)
//       return []
//     }
//   })

//   // =========================================================
//   // SAVE CART TO LOCAL STORAGE
//   // =========================================================

//   useEffect(() => {
//     try {
//       localStorage.setItem(
//         CART_STORAGE_KEY,
//         JSON.stringify(cartItems)
//       )
//     } catch (error) {
//       console.error('Failed to save cart:', error)
//     }
//   }, [cartItems])

//   // =========================================================
//   // ADD TO CART
//   // =========================================================
//   // No size, sizeSystem, unit or sizeData is used.

//   const addToCart = (product, quantity = 1) => {
//     if (!product || !product.id) {
//       console.error('Cannot add invalid product to cart.')
//       return
//     }

//     const safeQuantity = Math.max(1, Number(quantity) || 1)

//     setCartItems((currentItems) => {
//       const existingItem = currentItems.find(
//         (item) => item.id === product.id
//       )

//       // -----------------------------------------------------
//       // PRODUCT ALREADY EXISTS
//       // -----------------------------------------------------

//       if (existingItem) {
//         return currentItems.map((item) =>
//           item.id === product.id
//             ? {
//                 ...item,
//                 quantity: item.quantity + safeQuantity,
//               }
//             : item
//         )
//       }

//       // -----------------------------------------------------
//       // NEW PRODUCT
//       // -----------------------------------------------------

//       return [
//         ...currentItems,
//         {
//           ...product,
//           quantity: safeQuantity,
//         },
//       ]
//     })
//   }

//   // =========================================================
//   // INCREASE QUANTITY
//   // =========================================================

//   const increaseQuantity = (productId) => {
//     setCartItems((currentItems) =>
//       currentItems.map((item) =>
//         item.id === productId
//           ? {
//               ...item,
//               quantity: item.quantity + 1,
//             }
//           : item
//       )
//     )
//   }

//   // =========================================================
//   // DECREASE QUANTITY
//   // =========================================================

//   const decreaseQuantity = (productId) => {
//     setCartItems((currentItems) =>
//       currentItems
//         .map((item) =>
//           item.id === productId
//             ? {
//                 ...item,
//                 quantity: item.quantity - 1,
//               }
//             : item
//         )
//         .filter((item) => item.quantity > 0)
//     )
//   }

//   // =========================================================
//   // REMOVE PRODUCT
//   // =========================================================

//   const removeFromCart = (productId) => {
//     setCartItems((currentItems) =>
//       currentItems.filter((item) => item.id !== productId)
//     )
//   }

//   // =========================================================
//   // CLEAR CART
//   // =========================================================

//   const clearCart = () => {
//     setCartItems([])
//   }

//   // =========================================================
//   // TOTAL ITEMS
//   // =========================================================

//   const totalItems = useMemo(() => {
//     return cartItems.reduce(
//       (total, item) => total + item.quantity,
//       0
//     )
//   }, [cartItems])

//   // =========================================================
//   // SUBTOTAL
//   // =========================================================

//   const subtotal = useMemo(() => {
//     return cartItems.reduce((total, item) => {
//       const price = Number(item.price) || 0
//       const quantity = Number(item.quantity) || 0

//       return total + price * quantity
//     }, 0)
//   }, [cartItems])

//   // =========================================================
//   // SHIPPING
//   // =========================================================
//   // Temporary frontend rule:
//   // Orders of €100 or more have free shipping.

//   const shipping = useMemo(() => {
//     if (cartItems.length === 0) {
//       return 0
//     }

//     if (subtotal >= 100) {
//       return 0
//     }

//     return 10
//   }, [cartItems.length, subtotal])

//   // =========================================================
//   // TOTAL
//   // =========================================================

//   const total = useMemo(() => {
//     return subtotal + shipping
//   }, [subtotal, shipping])

//   // =========================================================
//   // CONTEXT VALUE
//   // =========================================================

//   const value = {
//     cartItems,

//     addToCart,

//     increaseQuantity,
//     decreaseQuantity,
//     removeFromCart,

//     clearCart,

//     totalItems,
//     subtotal,
//     shipping,
//     total,
//   }

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   )
// }

// // =========================================================
// // USE CART
// // =========================================================

// export function useCart() {
//   const context = useContext(CartContext)

//   if (!context) {
//     throw new Error(
//       'useCart must be used inside CartProvider'
//     )
//   }

//   return context
// }

// export default CartContext



import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const CartContext = createContext(null)

const CART_STORAGE_KEY = 'fegegta_cart_items'

// =========================================================
// CART PROVIDER
// =========================================================

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)

      if (!savedCart) {
        return []
      }

      const parsedCart = JSON.parse(savedCart)

      return Array.isArray(parsedCart) ? parsedCart : []
    } catch (error) {
      console.error('Failed to load cart:', error)
      return []
    }
  })

  // =========================================================
  // SAVE CART TO LOCAL STORAGE
  // =========================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      )
    } catch (error) {
      console.error('Failed to save cart:', error)
    }
  }, [cartItems])

  // =========================================================
  // ADD TO CART
  // =========================================================
  // No size, sizeSystem, unit or sizeData is used.

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) {
      console.error('Cannot add invalid product to cart.')
      return
    }

    const safeQuantity = Math.max(
      1,
      Number(quantity) || 1
    )

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      )

      // -----------------------------------------------------
      // PRODUCT ALREADY EXISTS
      // -----------------------------------------------------

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  (Number(item.quantity) || 0) +
                  safeQuantity,
              }
            : item
        )
      }

      // -----------------------------------------------------
      // NEW PRODUCT
      // -----------------------------------------------------

      return [
        ...currentItems,
        {
          ...product,
          quantity: safeQuantity,
        },
      ]
    })
  }

  // =========================================================
  // INCREASE QUANTITY
  // =========================================================

  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity:
                (Number(item.quantity) || 0) + 1,
            }
          : item
      )
    )
  }

  // =========================================================
  // DECREASE QUANTITY
  // =========================================================

  const decreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity:
                  (Number(item.quantity) || 0) - 1,
              }
            : item
        )
        .filter(
          (item) => Number(item.quantity) > 0
        )
    )
  }

  // =========================================================
  // REMOVE PRODUCT
  // =========================================================

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    )
  }

  // =========================================================
  // CLEAR CART
  // =========================================================

  const clearCart = () => {
    setCartItems([])
  }

  // =========================================================
  // TOTAL ITEMS
  // =========================================================

  const totalItems = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + (Number(item.quantity) || 0),
      0
    )
  }, [cartItems])

  // =========================================================
  // SUBTOTAL
  // =========================================================

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price) || 0
      const quantity = Number(item.quantity) || 0

      return total + price * quantity
    }, 0)
  }, [cartItems])

  // =========================================================
  // SHIPPING
  // =========================================================
  // IMPORTANT:
  //
  // CartContext does NOT calculate shipping.
  //
  // There is:
  // - No €10 fixed shipping
  // - No €25 express shipping
  // - No €100 free shipping rule
  //
  // The real shipping price will be calculated at Checkout
  // from DHL or FedEx through the backend.
  //
  // This 0 value only keeps compatibility with existing
  // Cart components that may call shipping.toFixed(2).
  //
  // It is NOT the actual shipping price.

  const shipping = 0

  // =========================================================
  // TOTAL
  // =========================================================
  // Cart total = products only.
  //
  // Real DHL/FedEx shipping is added later in Checkout.

  const total = useMemo(() => {
    return subtotal
  }, [subtotal])

  // =========================================================
  // CONTEXT VALUE
  // =========================================================

  const value = {
    cartItems,

    addToCart,

    increaseQuantity,
    decreaseQuantity,
    removeFromCart,

    clearCart,

    totalItems,
    subtotal,

    // Compatibility fallback only.
    // Real shipping comes from DHL/FedEx at Checkout.
    shipping,

    total,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// =========================================================
// USE CART
// =========================================================

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart must be used inside CartProvider'
    )
  }

  return context
}

export default CartContext
