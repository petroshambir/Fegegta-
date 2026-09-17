// src/services/sellerStorage.js

// ============================================================
// FEEGTA SELLER STORAGE
// Frontend demo storage.
// Backend / MongoDB can replace these functions later.
// ============================================================

const KEYS = {
  applications: 'fegegta_seller_applications',
  stores: 'fegegta_seller_stores',
  products: 'fegegta_seller_products',
  orders: 'fegegta_seller_orders',
  notifications: 'fegegta_seller_notifications',
  commissionRate: 'fegegta_commission_rate',
}

// ============================================================
// GENERIC HELPERS
// ============================================================

function read(key, fallback = []) {
  try {
    const value = localStorage.getItem(key)

    if (!value) return fallback

    return JSON.parse(value)
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

function generateId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`
}

// ============================================================
// CURRENT USER
// ============================================================

export function getCurrentUser() {
  try {
    const saved = localStorage.getItem('fegegta_auth_user')

    if (!saved) return null

    return JSON.parse(saved)
  } catch {
    return null
  }
}

export function getCurrentSellerId() {
  const user = getCurrentUser()

  return (
    user?.sellerId ||
    user?.id ||
    user?.userId ||
    'demo-seller'
  )
}

// ============================================================
// STORE SLUG
// ============================================================

export function createStoreSlug(name = '') {
  return String(name)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function getAllSellerStores() {
  return read(KEYS.stores, [])
}

export function createUniqueStoreSlug(
  storeName,
  existingSlug = '',
  storeId = ''
) {
  // Keep the existing slug permanently.
  if (existingSlug) {
    return existingSlug
  }

  const base = createStoreSlug(storeName) || 'my-store'

  const stores = getAllSellerStores()

  const conflict = stores.find(
    (store) =>
      store.slug === base &&
      store.id !== storeId
  )

  if (!conflict) {
    return base
  }

  let counter = 2

  while (
    stores.some(
      (store) =>
        store.slug === `${base}-${counter}` &&
        store.id !== storeId
    )
  ) {
    counter += 1
  }

  return `${base}-${counter}`
}

// ============================================================
// SELLER APPLICATIONS
// ============================================================

export function getSellerApplications() {
  return read(KEYS.applications, [])
}

export function getSellerApplication() {
  const sellerId = getCurrentSellerId()

  return (
    getSellerApplications().find(
      (application) =>
        application.sellerId === sellerId
    ) || null
  )
}

export function getSellerApplicationById(id) {
  return (
    getSellerApplications().find(
      (application) =>
        application.id === id
    ) || null
  )
}

export function saveSellerApplication(applicationData) {
  const applications = getSellerApplications()

  const sellerId =
    applicationData.sellerId ||
    getCurrentSellerId()

  const existingIndex =
    applications.findIndex(
      (application) =>
        application.sellerId === sellerId
    )

  const application = {
    ...applicationData,

    id:
      applicationData.id ||
      generateId('application'),

    sellerId,

    sellerStatus:
      applicationData.sellerStatus ||
      'pending',

    submittedAt:
      applicationData.submittedAt ||
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString(),
  }

  if (existingIndex >= 0) {
    applications[existingIndex] = application
  } else {
    applications.push(application)
  }

  write(KEYS.applications, applications)

  return application
}

export function updateSellerApplication(
  applicationId,
  updates
) {
  const applications = getSellerApplications()

  const index = applications.findIndex(
    (application) =>
      application.id === applicationId
  )

  if (index === -1) return null

  applications[index] = {
    ...applications[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  write(KEYS.applications, applications)

  return applications[index]
}

// ============================================================
// APPLICATION APPROVAL / REJECTION
// ============================================================

export function approveSellerApplication(
  applicationId
) {
  const application =
    getSellerApplicationById(applicationId)

  if (!application) return null

  const existingStore =
    getSellerStoreBySellerId(
      application.sellerId
    )

  const storeId =
    existingStore?.id ||
    generateId('store')

  const slug =
    existingStore?.slug ||
    createUniqueStoreSlug(
      application.storeName,
      '',
      storeId
    )

  const store = {
    ...(existingStore || {}),

    id: storeId,

    sellerId:
      application.sellerId,

    storeName:
      application.storeName || '',

    storeDescription:
      application.storeDescription || '',

    storeCategory:
      application.productCategory || '',

    businessName:
      application.businessName || '',

    businessEmail:
      application.businessEmail || '',

    businessPhone:
      application.businessPhone || '',

    sellerAddress:
      application.address || '',

    slug,

    logo:
      existingStore?.logo || '',

    coverImage:
      existingStore?.coverImage || '',

    // IMPORTANT:
    // Seller application approval does NOT
    // automatically verify the store.
    verified:
      existingStore?.verified === true,

    verificationStatus:
      existingStore?.verificationStatus ||
      'pending',

    // Store becomes approved so seller can
    // manage products. Public verification
    // is still controlled separately.
    status: 'approved',

    createdAt:
      existingStore?.createdAt ||
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString(),
  }

  saveSellerStore(store)

  updateSellerApplication(
    applicationId,
    {
      sellerStatus: 'approved',
      storeId,
      storeSlug: slug,
      rejectionReason: '',
      approvedAt:
        new Date().toISOString(),
    }
  )

  addSellerNotification({
    sellerId: application.sellerId,
    type: 'application-approved',
    title: 'Seller application approved',
    message:
      'Your seller application has been approved. You can now manage your store and products.',
  })

  return store
}

export function rejectSellerApplication(
  applicationId,
  reason = 'Application was not approved.'
) {
  const application =
    getSellerApplicationById(applicationId)

  if (!application) return null

  const updated =
    updateSellerApplication(
      applicationId,
      {
        sellerStatus: 'rejected',
        rejectionReason: reason,
        rejectedAt:
          new Date().toISOString(),
      }
    )

  addSellerNotification({
    sellerId: application.sellerId,
    type: 'application-rejected',
    title: 'Seller application rejected',
    message: reason,
  })

  return updated
}

// ============================================================
// STORES
// ============================================================

export function getSellerStore() {
  const sellerId = getCurrentSellerId()

  return getSellerStoreBySellerId(sellerId)
}

export function getSellerStoreBySellerId(
  sellerId
) {
  const stores = getAllSellerStores()

  return (
    stores.find(
      (store) =>
        store.sellerId === sellerId
    ) || null
  )
}

export function getSellerStoreBySlug(slug) {
  const stores = getAllSellerStores()

  return (
    stores.find(
      (store) =>
        store.slug === slug &&
        store.status === 'approved'
    ) || null
  )
}

export function saveSellerStore(storeData) {
  const stores = getAllSellerStores()

  const sellerId =
    storeData.sellerId ||
    getCurrentSellerId()

  const storeId =
    storeData.id ||
    generateId('store')

  const existingIndex =
    stores.findIndex(
      (store) =>
        store.id === storeId ||
        store.sellerId === sellerId
    )

  const existingStore =
    existingIndex >= 0
      ? stores[existingIndex]
      : null

  const slug =
    existingStore?.slug ||
    storeData.slug ||
    createUniqueStoreSlug(
      storeData.storeName,
      '',
      storeId
    )

  const store = {
    ...(existingStore || {}),
    ...storeData,

    id: storeId,

    sellerId,

    slug,

    status:
      existingStore?.status ||
      storeData.status ||
      'pending',

    verified:
      existingStore?.verified === true ||
      storeData.verified === true,

    verificationStatus:
      existingStore?.verificationStatus ||
      storeData.verificationStatus ||
      'pending',

    createdAt:
      existingStore?.createdAt ||
      storeData.createdAt ||
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString(),
  }

  if (existingIndex >= 0) {
    stores[existingIndex] = store
  } else {
    stores.push(store)
  }

  write(KEYS.stores, stores)

  return store
}

// ============================================================
// ADMIN STORE CONTROLS
// ============================================================

export function setStoreStatus(
  storeId,
  status
) {
  const stores = getAllSellerStores()

  const index = stores.findIndex(
    (store) =>
      store.id === storeId
  )

  if (index === -1) return null

  stores[index] = {
    ...stores[index],
    status,
    updatedAt:
      new Date().toISOString(),
  }

  write(KEYS.stores, stores)

  return stores[index]
}

export function setStoreVerification(
  storeId,
  verified
) {
  const stores = getAllSellerStores()

  const index = stores.findIndex(
    (store) =>
      store.id === storeId
  )

  if (index === -1) return null

  stores[index] = {
    ...stores[index],
    verified: Boolean(verified),
    verificationStatus:
      verified
        ? 'verified'
        : 'pending',
    updatedAt:
      new Date().toISOString(),
  }

  write(KEYS.stores, stores)

  return stores[index]
}

// ============================================================
// PRODUCTS
// ============================================================

export function getAllSellerProducts() {
  return read(KEYS.products, [])
}

export function getSellerProducts(
  sellerId = getCurrentSellerId()
) {
  return getAllSellerProducts().filter(
    (product) =>
      product.sellerId === sellerId
  )
}

export function getSellerProductById(id) {
  return (
    getAllSellerProducts().find(
      (product) =>
        product.id === id
    ) || null
  )
}

export function getSellerProductBySlug(
  slug
) {
  return (
    getAllSellerProducts().find(
      (product) =>
        product.slug === slug &&
        product.status === 'approved'
    ) || null
  )
}

// ============================================================
// PRODUCT IMAGE NORMALIZATION
// ============================================================

function normalizeProductImages(
  images = [],
  fallbackImage = ''
) {
  const normalized = Array.isArray(images)
    ? images.filter(Boolean)
    : []

  if (
    normalized.length === 0 &&
    fallbackImage
  ) {
    normalized.push({
      id: generateId('image'),
      url: fallbackImage,
      name: 'Product image',
    })
  }

  return normalized.slice(0, 4)
}

// ============================================================
// SAVE PRODUCT
// ============================================================

export function saveSellerProduct(
  productData
) {
  const products =
    getAllSellerProducts()

  const sellerId =
    productData.sellerId ||
    getCurrentSellerId()

  const store =
    getSellerStoreBySellerId(
      sellerId
    )

  const productId =
    productData.id ||
    generateId('product')

  const existingIndex =
    products.findIndex(
      (product) =>
        product.id === productId
    )

  const existingProduct =
    existingIndex >= 0
      ? products[existingIndex]
      : null

  // SECURITY:
  // A seller cannot edit another seller's product.
  if (
    existingProduct &&
    existingProduct.sellerId !== sellerId
  ) {
    return null
  }

  const images =
    normalizeProductImages(
      productData.images,
      productData.image
    )

  const product = {
    ...(existingProduct || {}),
    ...productData,

    id: productId,

    sellerId,

    storeId:
      productData.storeId ||
      existingProduct?.storeId ||
      store?.id ||
      '',

    storeSlug:
      productData.storeSlug ||
      existingProduct?.storeSlug ||
      store?.slug ||
      '',

    images,

    image:
      productData.image ||
      images[0]?.url ||
      '',

    status:
      productData.status ||
      existingProduct?.status ||
      'pending',

    rejectionReason:
      productData.rejectionReason ??
      existingProduct?.rejectionReason ??
      '',

    submittedAt:
      existingProduct?.submittedAt ||
      productData.submittedAt ||
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString(),
  }

  if (existingIndex >= 0) {
    products[existingIndex] = product
  } else {
    products.push(product)
  }

  write(KEYS.products, products)

  return product
}

// ============================================================
// DELETE PRODUCT
// ============================================================

export function deleteSellerProduct(id) {
  const products =
    getAllSellerProducts()

  const sellerId =
    getCurrentSellerId()

  const product =
    products.find(
      (item) =>
        item.id === id &&
        item.sellerId === sellerId
    )

  if (!product) {
    return false
  }

  const filtered =
    products.filter(
      (item) =>
        item.id !== id
    )

  write(KEYS.products, filtered)

  return true
}

// ============================================================
// ADMIN PRODUCT APPROVAL
// ============================================================

export function approveSellerProduct(
  productId
) {
  const products =
    getAllSellerProducts()

  const index =
    products.findIndex(
      (product) =>
        product.id === productId
    )

  if (index === -1) {
    return null
  }

  const product =
    products[index]

  products[index] = {
    ...product,

    status: 'approved',

    rejectionReason: '',

    approvedAt:
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString(),
  }

  write(
    KEYS.products,
    products
  )

  addSellerNotification({
    sellerId:
      product.sellerId,

    type:
      'product-approved',

    title:
      'Product approved',

    message:
      `${product.name} has been approved and is now visible in your store.`,

    productId:
      product.id,
  })

  return products[index]
}

export function rejectSellerProduct(
  productId,
  reason = 'Product was not approved.'
) {
  const products =
    getAllSellerProducts()

  const index =
    products.findIndex(
      (product) =>
        product.id === productId
    )

  if (index === -1) {
    return null
  }

  const product =
    products[index]

  products[index] = {
    ...product,

    status: 'rejected',

    rejectionReason: reason,

    rejectedAt:
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString(),
  }

  write(
    KEYS.products,
    products
  )

  addSellerNotification({
    sellerId:
      product.sellerId,

    type:
      'product-rejected',

    title:
      'Product rejected',

    message:
      reason,

    productId:
      product.id,
  })

  return products[index]
}

// ============================================================
// PUBLIC STORE PRODUCTS
// ============================================================

export function getApprovedProductsForStore(
  storeId
) {
  return getAllSellerProducts().filter(
    (product) =>
      product.storeId === storeId &&
      product.status === 'approved'
  )
}

export function getSellerProductsByStore(
  storeId
) {
  return getAllSellerProducts().filter(
    (product) =>
      product.storeId === storeId
  )
}

// ============================================================
// COMMISSION
// ============================================================

export function getCommissionRate() {
  const stored =
    localStorage.getItem(
      KEYS.commissionRate
    )

  if (!stored) {
    return 0.10
  }

  const value = Number(stored)

  if (Number.isNaN(value)) {
    return 0.10
  }

  return value
}

export function setCommissionRate(rate) {
  const numericRate =
    Number(rate)

  if (
    Number.isNaN(numericRate) ||
    numericRate < 0 ||
    numericRate > 1
  ) {
    return false
  }

  localStorage.setItem(
    KEYS.commissionRate,
    String(numericRate)
  )

  return true
}

export function calculateCommission(
  amount
) {
  const total =
    Number(amount) || 0

  return Number(
    (
      total *
      getCommissionRate()
    ).toFixed(2)
  )
}

export function calculateSellerEarnings(
  amount
) {
  const total =
    Number(amount) || 0

  return Number(
    (
      total -
      calculateCommission(total)
    ).toFixed(2)
  )
}

// ============================================================
// ORDERS
// ============================================================

export function getAllSellerOrders() {
  return read(
    KEYS.orders,
    []
  )
}

export function getSellerOrders(
  sellerId = getCurrentSellerId()
) {
  return getAllSellerOrders().filter(
    (order) =>
      order.sellerId === sellerId ||
      order.items?.some(
        (item) =>
          item.sellerId === sellerId
      )
  )
}

export function getSellerOrderById(id) {
  const sellerId =
    getCurrentSellerId()

  return (
    getSellerOrders(
      sellerId
    ).find(
      (order) =>
        order.id === id
    ) || null
  )
}

export function saveSellerOrder(
  orderData
) {
  const orders =
    getAllSellerOrders()

  const order = {
    ...orderData,

    id:
      orderData.id ||
      generateId('order'),

    createdAt:
      orderData.createdAt ||
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString(),
  }

  const index =
    orders.findIndex(
      (orderItem) =>
        orderItem.id === order.id
    )

  if (index >= 0) {
    orders[index] = {
      ...orders[index],
      ...order,
    }
  } else {
    orders.push(order)
  }

  write(
    KEYS.orders,
    orders
  )

  return order
}

// ============================================================
// NOTIFICATIONS
// ============================================================

export function getAllSellerNotifications() {
  return read(
    KEYS.notifications,
    []
  )
}

export function getSellerNotifications(
  sellerId = getCurrentSellerId()
) {
  return getAllSellerNotifications()
    .filter(
      (notification) =>
        notification.sellerId ===
        sellerId
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
}

export function addSellerNotification(
  notificationData
) {
  const notifications =
    getAllSellerNotifications()

  const notification = {
    ...notificationData,

    id:
      notificationData.id ||
      generateId('notification'),

    sellerId:
      notificationData.sellerId ||
      getCurrentSellerId(),

    read: false,

    createdAt:
      notificationData.createdAt ||
      new Date().toISOString(),
  }

  notifications.unshift(
    notification
  )

  write(
    KEYS.notifications,
    notifications
  )

  return notification
}

export function markSellerNotificationRead(
  notificationId
) {
  const sellerId =
    getCurrentSellerId()

  const notifications =
    getAllSellerNotifications()

  const index =
    notifications.findIndex(
      (notification) =>
        notification.id ===
          notificationId &&
        notification.sellerId ===
          sellerId
    )

  if (index === -1) {
    return false
  }

  notifications[index] = {
    ...notifications[index],
    read: true,
  }

  write(
    KEYS.notifications,
    notifications
  )

  return true
}

export function markAllSellerNotificationsRead() {
  const sellerId =
    getCurrentSellerId()

  const notifications =
    getAllSellerNotifications()

  const updated =
    notifications.map(
      (notification) => {
        if (
          notification.sellerId ===
          sellerId
        ) {
          return {
            ...notification,
            read: true,
          }
        }

        return notification
      }
    )

  write(
    KEYS.notifications,
    updated
  )

  return true
}