import Notification from '../models/Notification.js';


/*
|--------------------------------------------------------------------------
| CREATE NOTIFICATION
|--------------------------------------------------------------------------
*/

export const createNotificationService = async ({
  recipient,
  type,
  title,
  message,
  order = null,
  product = null,
  store = null,
  link = '',
}) => {
  if (!recipient) {
    throw new Error('Notification recipient is required');
  }

  if (!title) {
    throw new Error('Notification title is required');
  }

  if (!message) {
    throw new Error('Notification message is required');
  }

  const notification = await Notification.create({
    recipient,

    type,

    title,

    message,

    order,

    product,

    store,

    isRead: false,

    link,
  });

  return notification;
};


/*
|--------------------------------------------------------------------------
| CREATE ORDER NOTIFICATION
|--------------------------------------------------------------------------
*/

export const createOrderNotificationService = async ({
  recipient,
  orderId,
  orderNumber,
  title = 'Order Update',
  message,
}) => {
  return await createNotificationService({
    recipient,

    type: 'order',

    title,

    message:
      message ||
      `Your order ${orderNumber || ''} has been updated.`,

    order: orderId,

    link: orderId
      ? `/orders/${orderId}`
      : '/orders',
  });
};


/*
|--------------------------------------------------------------------------
| CREATE PRODUCT NOTIFICATION
|--------------------------------------------------------------------------
*/

export const createProductNotificationService = async ({
  recipient,
  productId,
  productName,
  title,
  message,
}) => {
  return await createNotificationService({
    recipient,

    type: 'product',

    title:
      title ||
      'Product Update',

    message:
      message ||
      `There is an update for your product "${productName || ''}".`,

    product: productId,

    link: productId
      ? `/products/${productId}`
      : '/seller/products',
  });
};


/*
|--------------------------------------------------------------------------
| CREATE STORE NOTIFICATION
|--------------------------------------------------------------------------
*/

export const createStoreNotificationService = async ({
  recipient,
  storeId,
  storeName,
  title,
  message,
}) => {
  return await createNotificationService({
    recipient,

    type: 'store',

    title:
      title ||
      'Store Update',

    message:
      message ||
      `There is an update for your store "${storeName || ''}".`,

    store: storeId,

    link: storeId
      ? `/stores/${storeId}`
      : '/seller/store',
  });
};


/*
|--------------------------------------------------------------------------
| GET USER NOTIFICATIONS
|--------------------------------------------------------------------------
*/

export const getUserNotificationsService = async (
  userId
) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  return await Notification.find({
    recipient: userId,
  })
    .populate('order', 'orderNumber total orderStatus')
    .populate('product', 'name price')
    .populate('store', 'name logo')
    .sort({ createdAt: -1 });
};


/*
|--------------------------------------------------------------------------
| GET UNREAD NOTIFICATIONS
|--------------------------------------------------------------------------
*/

export const getUnreadNotificationsService = async (
  userId
) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  return await Notification.find({
    recipient: userId,

    isRead: false,
  })
    .populate('order', 'orderNumber total orderStatus')
    .populate('product', 'name price')
    .populate('store', 'name logo')
    .sort({ createdAt: -1 });
};


/*
|--------------------------------------------------------------------------
| MARK ONE NOTIFICATION AS READ
|--------------------------------------------------------------------------
*/

export const markNotificationAsReadService = async (
  notificationId,
  userId
) => {
  const notification =
    await Notification.findById(notificationId);

  if (!notification) {
    throw new Error('Notification not found');
  }

  if (
    notification.recipient.toString() !==
    userId.toString()
  ) {
    throw new Error(
      'You are not authorized to update this notification'
    );
  }

  notification.isRead = true;
  notification.readAt = new Date();

  await notification.save();

  return notification;
};


/*
|--------------------------------------------------------------------------
| MARK ALL NOTIFICATIONS AS READ
|--------------------------------------------------------------------------
*/

export const markAllNotificationsAsReadService = async (
  userId
) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  await Notification.updateMany(
    {
      recipient: userId,

      isRead: false,
    },
    {
      $set: {
        isRead: true,

        readAt: new Date(),
      },
    }
  );

  return {
    success: true,

    message: 'All notifications marked as read',
  };
};