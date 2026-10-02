import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Store from '../models/Store.js';
import Seller from '../models/Seller.js';
import { generateOrderNumber } from '../utils/generateOrderNumber.js';

/*
|--------------------------------------------------------------------------
| CREATE ORDER
|--------------------------------------------------------------------------
| Creates an order from cart items.
|
| Important:
| Fegegta is a multi-vendor marketplace.
| One customer can purchase products from different sellers
| in the same order.
|--------------------------------------------------------------------------
*/

export const createOrderService = async ({
  userId,
  items,
  shippingAddress,
  paymentMethod = 'cash_on_delivery',
  notes = '',
}) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new Error('Order must contain at least one product');
  }

  if (!shippingAddress) {
    throw new Error('Shipping address is required');
  }

  const orderItems = [];

  let subtotal = 0;

  for (const item of items) {
    if (!item.productId) {
      throw new Error('Product ID is required for every order item');
    }

    const quantity = Number(item.quantity);

    if (!quantity || quantity < 1) {
      throw new Error('Product quantity must be at least 1');
    }

    const product = await Product.findById(item.productId);

    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    /*
    |--------------------------------------------------------------------------
    | Product approval
    |--------------------------------------------------------------------------
    */

    if (product.approvalStatus !== 'approved') {
      throw new Error(
        `Product "${product.name}" is not available for purchase`
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Product active status
    |--------------------------------------------------------------------------
    */

    if (product.isActive === false) {
      throw new Error(
        `Product "${product.name}" is currently unavailable`
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Stock check
    |--------------------------------------------------------------------------
    */

    if (typeof product.stock === 'number' && product.stock < quantity) {
      throw new Error(
        `Not enough stock for "${product.name}". Available stock: ${product.stock}`
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Seller
    |--------------------------------------------------------------------------
    */

    const seller = await Seller.findById(product.seller);

    if (!seller) {
      throw new Error(
        `Seller not found for product "${product.name}"`
      );
    }

    if (seller.status !== 'approved') {
      throw new Error(
        `Seller for "${product.name}" is not currently approved`
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Store
    |--------------------------------------------------------------------------
    */

    const store = await Store.findById(product.store);

    if (!store) {
      throw new Error(
        `Store not found for product "${product.name}"`
      );
    }

    if (
      store.status !== 'active' &&
      store.status !== 'approved'
    ) {
      throw new Error(
        `Store for "${product.name}" is not currently active`
      );
    }

    const price = Number(product.price);

    const itemSubtotal = price * quantity;

    subtotal += itemSubtotal;

    /*
    |--------------------------------------------------------------------------
    | Save a snapshot of product information inside the order
    |--------------------------------------------------------------------------
    | Even if the seller later changes the product name or price,
    | the old order keeps the original information.
    |--------------------------------------------------------------------------
    */

    orderItems.push({
      product: product._id,
      seller: seller._id,
      store: store._id,

      name: product.name,

      image:
        product.images?.length > 0
          ? product.images[0].url
          : '',

      price,

      quantity,

      size: item.size || null,

      color: item.color || null,

      subtotal: itemSubtotal,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Shipping
  |--------------------------------------------------------------------------
  */

  const shippingCost = subtotal >= 100 ? 0 : 10;

  const discount = 0;

  const total = subtotal + shippingCost - discount;

  /*
  |--------------------------------------------------------------------------
  | Create order
  |--------------------------------------------------------------------------
  */

  const order = await Order.create({
    orderNumber: await generateOrderNumber(),

    customer: userId,

    items: orderItems,

    shippingAddress,

    subtotal,

    shippingCost,

    discount,

    total,

    paymentMethod,

    paymentStatus: 'pending',

    orderStatus: 'pending',

    notes,
  });

  /*
  |--------------------------------------------------------------------------
  | Reduce stock
  |--------------------------------------------------------------------------
  */

  for (const item of items) {
    const quantity = Number(item.quantity);

    await Product.findByIdAndUpdate(
      item.productId,
      {
        $inc: {
          stock: -quantity,
        },
      }
    );
  }

  return await Order.findById(order._id)
    .populate('customer', 'firstName lastName email')
    .populate('items.product', 'name price images')
    .populate('items.seller', 'businessName')
    .populate('items.store', 'name logo');
};


/*
|--------------------------------------------------------------------------
| GET USER ORDERS
|--------------------------------------------------------------------------
*/

export const getUserOrdersService = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  return await Order.find({
    customer: userId,
  })
    .populate('items.product', 'name price images')
    .populate('items.seller', 'businessName')
    .populate('items.store', 'name logo')
    .sort({ createdAt: -1 });
};


/*
|--------------------------------------------------------------------------
| GET SINGLE ORDER
|--------------------------------------------------------------------------
*/

export const getOrderService = async (orderId, userId) => {
  const order = await Order.findById(orderId)
    .populate('customer', 'firstName lastName email')
    .populate('items.product', 'name price images')
    .populate('items.seller', 'businessName')
    .populate('items.store', 'name logo');

  if (!order) {
    throw new Error('Order not found');
  }

  /*
  | Customer can only see their own order.
  */

  if (
    userId &&
    order.customer?._id?.toString() !== userId.toString()
  ) {
    throw new Error('You are not authorized to view this order');
  }

  return order;
};


/*
|--------------------------------------------------------------------------
| CANCEL ORDER
|--------------------------------------------------------------------------
*/

export const cancelOrderService = async (orderId, userId) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error('Order not found');
  }

  if (
    order.customer.toString() !== userId.toString()
  ) {
    throw new Error(
      'You are not authorized to cancel this order'
    );
  }

  if (
    ['shipped', 'delivered', 'cancelled'].includes(
      order.orderStatus
    )
  ) {
    throw new Error(
      'This order can no longer be cancelled'
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Restore stock
  |--------------------------------------------------------------------------
  */

  for (const item of order.items) {
    await Product.findByIdAndUpdate(
      item.product,
      {
        $inc: {
          stock: item.quantity,
        },
      }
    );
  }

  order.orderStatus = 'cancelled';
  order.cancelledAt = new Date();

  await order.save();

  return order;
};


/*
|--------------------------------------------------------------------------
| UPDATE ORDER STATUS
|--------------------------------------------------------------------------
*/

export const updateOrderStatusService = async (
  orderId,
  newStatus
) => {
  const allowedStatuses = [
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
  ];

  if (!allowedStatuses.includes(newStatus)) {
    throw new Error('Invalid order status');
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error('Order not found');
  }

  order.orderStatus = newStatus;

  if (newStatus === 'delivered') {
    order.deliveredAt = new Date();
  }

  if (newStatus === 'cancelled') {
    order.cancelledAt = new Date();
  }

  await order.save();

  return await Order.findById(order._id)
    .populate('customer', 'firstName lastName email')
    .populate('items.product', 'name price images')
    .populate('items.seller', 'businessName')
    .populate('items.store', 'name logo');
};