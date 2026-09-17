// ============================================================
// FEGEGTA - ADMIN STORAGE
// Frontend demo storage
// Backend / MongoDB can replace this later.
// ============================================================

const KEYS = {
  users: 'fegegta_users',
  sellerApplications: 'fegegta_seller_applications',
  sellerStores: 'fegegta_seller_stores',
  sellerProducts: 'fegegta_seller_products',
  orders: 'fegegta_orders',
  notifications: 'fegegta_seller_notifications',
  commissionRate: 'fegegta_commission_rate',

  // Admin-owned products
  adminProducts: 'fegegta_admin_products',

  // Admin notifications
  adminNotifications: 'fegegta_admin_notifications',

  // Admin settings
  adminSettings: 'fegegta_admin_settings',
}

// ============================================================
// BASIC STORAGE HELPERS
// ============================================================

function read(key, fallback = []) {
  try {
    const value = localStorage.getItem(key)

    if (!value) {
      return fallback
    }

    const parsed = JSON.parse(value)

    return parsed
  } catch (error) {
    console.error(`Failed to read ${key}:`, error)
    return fallback
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Failed to write ${key}:`, error)
    return false
  }
}

function generateId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 10)}`
}

function normalizeArray(value) {
  return Array.isArray(value) ? value : []
}

// ============================================================
// ADMIN USER
// ============================================================

export function getAdminUser() {
  try {
    const auth = localStorage.getItem('fegegta_auth_user')

    if (!auth) {
      return null
    }

    const user = JSON.parse(auth)

    if (user?.role !== 'admin') {
      return null
    }

    return user
  } catch (error) {
    console.error('Failed to load admin user:', error)
    return null
  }
}

export function isAdminAuthenticated() {
  return Boolean(getAdminUser())
}

// ============================================================
// SELLER APPLICATIONS
// ============================================================

export function getAllSellerApplications() {
  return read(KEYS.sellerApplications, [])
}

export function getPendingSellerApplications() {
  return getAllSellerApplications().filter(
    (application) => application.status === 'pending'
  )
}

export function getSellerApplicationById(applicationId) {
  return getAllSellerApplications().find(
    (application) => application.id === applicationId
  ) || null
}

export function approveSeller(applicationId) {
  const applications = getAllSellerApplications()

  const updated = applications.map((application) => {
    if (application.id !== applicationId) {
      return application
    }

    return {
      ...application,
      status: 'approved',
      approvedAt: new Date().toISOString(),
      rejectedAt: null,
      rejectionReason: '',
    }
  })

  write(KEYS.sellerApplications, updated)

  return updated.find(
    (application) => application.id === applicationId
  ) || null
}

export function rejectSeller(applicationId, reason = '') {
  const applications = getAllSellerApplications()

  const updated = applications.map((application) => {
    if (application.id !== applicationId) {
      return application
    }

    return {
      ...application,
      status: 'rejected',
      rejectedAt: new Date().toISOString(),
      rejectionReason: reason,
    }
  })

  write(KEYS.sellerApplications, updated)

  return updated.find(
    (application) => application.id === applicationId
  ) || null
}

// ============================================================
// SELLER STORES
// ============================================================

export function getAllSellerStores() {
  return read(KEYS.sellerStores, [])
}

export function getSellerStoreById(storeId) {
  return getAllSellerStores().find(
    (store) => store.id === storeId
  ) || null
}

export function getSellerStoreBySellerId(sellerId) {
  return getAllSellerStores().find(
    (store) => store.sellerId === sellerId
  ) || null
}

// ============================================================
// ADMIN STORE STATUS CONTROL
// ============================================================

export function setSellerStoreStatus(storeId, status) {
  const allowedStatuses = [
    'pending',
    'approved',
    'suspended',
    'rejected',
  ]

  if (!allowedStatuses.includes(status)) {
    return null
  }

  const stores = getAllSellerStores()

  const updated = stores.map((store) => {
    if (store.id !== storeId) {
      return store
    }

    return {
      ...store,
      status,
      statusUpdatedAt: new Date().toISOString(),
    }
  })

  write(KEYS.sellerStores, updated)

  return updated.find(
    (store) => store.id === storeId
  ) || null
}

// ============================================================
// ADMIN SELLER VERIFICATION
// ============================================================

export function setSellerVerification(storeId, verified) {
  const stores = getAllSellerStores()

  const updated = stores.map((store) => {
    if (store.id !== storeId) {
      return store
    }

    return {
      ...store,
      verified: Boolean(verified),
      verificationStatus: verified
        ? 'verified'
        : 'unverified',
      verificationUpdatedAt: new Date().toISOString(),
    }
  })

  write(KEYS.sellerStores, updated)

  return updated.find(
    (store) => store.id === storeId
  ) || null
}

// ============================================================
// SELLER PRODUCTS
// ============================================================

export function getAllSellerProducts() {
  return read(KEYS.sellerProducts, [])
}

export function getPendingSellerProducts() {
  return getAllSellerProducts().filter(
    (product) => product.status === 'pending'
  )
}

export function getSellerProductById(productId) {
  return getAllSellerProducts().find(
    (product) => product.id === productId
  ) || null
}

// ============================================================
// ADMIN PRODUCT APPROVAL
// ============================================================

export function approveSellerProduct(productId) {
  const products = getAllSellerProducts()

  const updated = products.map((product) => {
    if (product.id !== productId) {
      return product
    }

    return {
      ...product,
      status: 'approved',
      approvedAt: new Date().toISOString(),
      rejectedAt: null,
      rejectionReason: '',
    }
  })

  write(KEYS.sellerProducts, updated)

  return updated.find(
    (product) => product.id === productId
  ) || null
}

export function rejectSellerProduct(productId, reason = '') {
  const products = getAllSellerProducts()

  const updated = products.map((product) => {
    if (product.id !== productId) {
      return product
    }

    return {
      ...product,
      status: 'rejected',
      rejectedAt: new Date().toISOString(),
      rejectionReason: reason,
    }
  })

  write(KEYS.sellerProducts, updated)

  return updated.find(
    (product) => product.id === productId
  ) || null
}

// ============================================================
// ADMIN OWN PRODUCTS
// ============================================================

export function getAdminProducts() {
  return read(KEYS.adminProducts, [])
}

export function getAdminProductById(productId) {
  return getAdminProducts().find(
    (product) => product.id === productId
  ) || null
}

export function saveAdminProduct(productData) {
  const products = getAdminProducts()

  const product = {
    id: productData.id || generateId('admin_product'),

    ownerType: 'admin',

    name: productData.name || '',
    description: productData.description || '',

    category: productData.category || '',
    subcategory: productData.subcategory || '',

    sku: productData.sku || '',
    price: Number(productData.price) || 0,
    oldPrice: Number(productData.oldPrice) || 0,
    stock: Number(productData.stock) || 0,

    sizes: normalizeArray(productData.sizes),
    colors: normalizeArray(productData.colors),

    material: productData.material || '',
    features: normalizeArray(productData.features),

    images: normalizeArray(productData.images).slice(0, 4),

    status: productData.status || 'approved',

    createdAt:
      productData.createdAt ||
      new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  }

  const existingIndex = products.findIndex(
    (item) => item.id === product.id
  )

  let updatedProducts

  if (existingIndex >= 0) {
    updatedProducts = [...products]
    updatedProducts[existingIndex] = product
  } else {
    updatedProducts = [...products, product]
  }

  write(KEYS.adminProducts, updatedProducts)

  return product
}

export function deleteAdminProduct(productId) {
  const products = getAdminProducts()

  const updated = products.filter(
    (product) => product.id !== productId
  )

  write(KEYS.adminProducts, updated)

  return true
}

// ============================================================
// ORDERS
// ============================================================

export function getAllOrders() {
  return read(KEYS.orders, [])
}

export function getOrderById(orderId) {
  return getAllOrders().find(
    (order) => order.id === orderId
  ) || null
}

// ============================================================
// CUSTOMERS
// ============================================================

export function getAllCustomers() {
  const users = read(KEYS.users, [])

  return users.filter(
    (user) => user.role === 'customer'
  )
}

// ============================================================
// COMMISSION
// ============================================================

export function getCommissionRate() {
  const saved = localStorage.getItem(
    KEYS.commissionRate
  )

  if (!saved) {
    return 10
  }

  const rate = Number(saved)

  return Number.isFinite(rate) ? rate : 10
}

export function setCommissionRate(rate) {
  const numericRate = Number(rate)

  if (
    !Number.isFinite(numericRate) ||
    numericRate < 0 ||
    numericRate > 100
  ) {
    return false
  }

  localStorage.setItem(
    KEYS.commissionRate,
    String(numericRate)
  )

  return true
}

export function calculateCommission(amount) {
  const rate = getCommissionRate()

  return Number(amount || 0) * (rate / 100)
}

export function calculateSellerEarnings(amount) {
  const total = Number(amount || 0)

  return total - calculateCommission(total)
}

// ============================================================
// ADMIN NOTIFICATIONS
// ============================================================

export function getAdminNotifications() {
  return read(KEYS.adminNotifications, [])
}

export function addAdminNotification(notificationData) {
  const notifications = getAdminNotifications()

  const notification = {
    id: notificationData.id || generateId('admin_notification'),

    type: notificationData.type || 'general',

    title: notificationData.title || '',
    message: notificationData.message || '',

    read: false,

    createdAt:
      notificationData.createdAt ||
      new Date().toISOString(),
  }

  const updated = [
    notification,
    ...notifications,
  ]

  write(KEYS.adminNotifications, updated)

  return notification
}

export function markAdminNotificationAsRead(
  notificationId
) {
  const notifications = getAdminNotifications()

  const updated = notifications.map(
    (notification) => {
      if (notification.id !== notificationId) {
        return notification
      }

      return {
        ...notification,
        read: true,
      }
    }
  )

  write(KEYS.adminNotifications, updated)

  return true
}

export function markAllAdminNotificationsAsRead() {
  const notifications = getAdminNotifications()

  const updated = notifications.map(
    (notification) => ({
      ...notification,
      read: true,
    })
  )

  write(KEYS.adminNotifications, updated)

  return true
}

// ============================================================
// ADMIN SETTINGS
// ============================================================

const DEFAULT_ADMIN_SETTINGS = {
  platformName: 'Fegegta',
  currency: 'EUR',

  commissionRate: 10,

  allowSellerRegistration: true,
  requireProductApproval: true,
  requireSellerVerification: true,
}

export function getAdminSettings() {
  const saved = read(
    KEYS.adminSettings,
    DEFAULT_ADMIN_SETTINGS
  )

  return {
    ...DEFAULT_ADMIN_SETTINGS,
    ...saved,
  }
}

export function saveAdminSettings(settings) {
  const current = getAdminSettings()

  const updated = {
    ...current,
    ...settings,
  }

  write(KEYS.adminSettings, updated)

  if (settings.commissionRate !== undefined) {
    setCommissionRate(settings.commissionRate)
  }

  return updated
}

// ============================================================
// ADMIN STATISTICS
// ============================================================

export function getAdminStatistics() {
  const sellerApplications =
    getAllSellerApplications()

  const stores =
    getAllSellerStores()

  const sellerProducts =
    getAllSellerProducts()

  const adminProducts =
    getAdminProducts()

  const orders =
    getAllOrders()

  const customers =
    getAllCustomers()

  const pendingSellerApplications =
    sellerApplications.filter(
      (item) => item.status === 'pending'
    ).length

  const approvedSellers =
    sellerApplications.filter(
      (item) => item.status === 'approved'
    ).length

  const pendingProducts =
    sellerProducts.filter(
      (item) => item.status === 'pending'
    ).length

  const approvedProducts =
    sellerProducts.filter(
      (item) => item.status === 'approved'
    ).length

  const verifiedStores =
    stores.filter(
      (store) => store.verified === true
    ).length

  let totalSales = 0

  orders.forEach((order) => {
    const status = String(
      order.status || ''
    ).toLowerCase()

    if (
      status === 'delivered' ||
      status === 'completed'
    ) {
      totalSales += Number(
        order.total ||
        order.amount ||
        0
      )
    }
  })

  const commission =
    calculateCommission(totalSales)

  return {
    totalSales,

    totalOrders: orders.length,

    totalCustomers:
      customers.length,

    totalSellers:
      approvedSellers,

    totalStores:
      stores.length,

    verifiedStores,

    totalProducts:
      adminProducts.length +
      sellerProducts.length,

    adminProducts:
      adminProducts.length,

    sellerProducts:
      sellerProducts.length,

    approvedProducts,

    pendingSellerApplications,

    pendingProducts,

    commission,

    sellerEarnings:
      calculateSellerEarnings(totalSales),
  }
}