import Commission from '../models/Commission.js';
import Seller from '../models/Seller.js';
import Order from '../models/Order.js';


/*
|--------------------------------------------------------------------------
| CALCULATE COMMISSION
|--------------------------------------------------------------------------
*/

export const calculateCommission = ({
  amount,
  commissionRate,
}) => {
  const orderAmount = Number(amount);

  const rate = Number(commissionRate);

  if (
    Number.isNaN(orderAmount) ||
    orderAmount < 0
  ) {
    throw new Error('Invalid order amount');
  }

  if (
    Number.isNaN(rate) ||
    rate < 0 ||
    rate > 100
  ) {
    throw new Error(
      'Commission rate must be between 0 and 100'
    );
  }

  const commissionAmount =
    (orderAmount * rate) / 100;

  const sellerAmount =
    orderAmount - commissionAmount;

  return {
    orderAmount,

    commissionRate: rate,

    commissionAmount,

    sellerAmount,
  };
};


/*
|--------------------------------------------------------------------------
| CREATE COMMISSION
|--------------------------------------------------------------------------
| One commission record can be created for each seller
| inside a multi-vendor order.
|--------------------------------------------------------------------------
*/

export const createCommissionService = async ({
  sellerId,
  orderId,
  orderNumber,
  orderAmount,
  commissionRate,
}) => {
  if (!sellerId) {
    throw new Error('Seller ID is required');
  }

  if (!orderId) {
    throw new Error('Order ID is required');
  }

  const calculation = calculateCommission({
    amount: orderAmount,
    commissionRate,
  });

  const commission =
    await Commission.create({
      seller: sellerId,

      order: orderId,

      orderNumber,

      orderAmount:
        calculation.orderAmount,

      commissionRate:
        calculation.commissionRate,

      commissionAmount:
        calculation.commissionAmount,

      sellerAmount:
        calculation.sellerAmount,

      status: 'pending',
    });

  return commission;
};


/*
|--------------------------------------------------------------------------
| CREATE COMMISSIONS FOR AN ORDER
|--------------------------------------------------------------------------
| Important for multi-vendor checkout.
|
| Example:
|
| Seller A = €100
| Seller B = €50
|
| The order contains both sellers.
| Each seller gets a separate commission record.
|--------------------------------------------------------------------------
*/

export const createOrderCommissionsService = async ({
  orderId,
  commissionRate,
}) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error('Order not found');
  }

  /*
  |--------------------------------------------------------------------------
  | Group order items by seller
  |--------------------------------------------------------------------------
  */

  const sellerTotals = {};

  for (const item of order.items) {
    const sellerId =
      item.seller?.toString();

    if (!sellerId) {
      continue;
    }

    if (!sellerTotals[sellerId]) {
      sellerTotals[sellerId] = 0;
    }

    sellerTotals[sellerId] +=
      Number(item.subtotal || 0);
  }

  const commissions = [];

  /*
  |--------------------------------------------------------------------------
  | Create commission for every seller
  |--------------------------------------------------------------------------
  */

  for (const sellerId of Object.keys(
    sellerTotals
  )) {
    const sellerAmount =
      sellerTotals[sellerId];

    const commission =
      await createCommissionService({
        sellerId,

        orderId: order._id,

        orderNumber:
          order.orderNumber,

        orderAmount:
          sellerAmount,

        commissionRate,
      });

    commissions.push(commission);
  }

  return commissions;
};


/*
|--------------------------------------------------------------------------
| GET SELLER COMMISSIONS
|--------------------------------------------------------------------------
*/

export const getSellerCommissionsService = async (
  sellerId
) => {
  if (!sellerId) {
    throw new Error('Seller ID is required');
  }

  return await Commission.find({
    seller: sellerId,
  })
    .populate(
      'order',
      'orderNumber total orderStatus paymentStatus'
    )
    .sort({ createdAt: -1 });
};


/*
|--------------------------------------------------------------------------
| GET ALL COMMISSIONS
|--------------------------------------------------------------------------
*/

export const getAllCommissionsService = async () => {
  return await Commission.find()
    .populate(
      'seller',
      'businessName businessEmail'
    )
    .populate(
      'order',
      'orderNumber total orderStatus'
    )
    .sort({ createdAt: -1 });
};


/*
|--------------------------------------------------------------------------
| GET COMMISSION BY ID
|--------------------------------------------------------------------------
*/

export const getCommissionService = async (
  commissionId
) => {
  const commission =
    await Commission.findById(commissionId)
      .populate(
        'seller',
        'businessName businessEmail'
      )
      .populate(
        'order',
        'orderNumber total orderStatus'
      );

  if (!commission) {
    throw new Error('Commission not found');
  }

  return commission;
};


/*
|--------------------------------------------------------------------------
| MARK COMMISSION AS PAID
|--------------------------------------------------------------------------
|
| When admin pays the seller:
|
| Commission:
| pending → paid
|
| Seller:
| availableBalance increases
|--------------------------------------------------------------------------
*/

export const markCommissionAsPaidService = async (
  commissionId
) => {
  const commission =
    await Commission.findById(commissionId);

  if (!commission) {
    throw new Error('Commission not found');
  }

  if (commission.status === 'paid') {
    throw new Error(
      'This commission has already been paid'
    );
  }

  if (commission.status === 'cancelled') {
    throw new Error(
      'Cancelled commission cannot be paid'
    );
  }

  commission.status = 'paid';

  commission.paidAt = new Date();

  await commission.save();

  /*
  |--------------------------------------------------------------------------
  | Update seller balance
  |--------------------------------------------------------------------------
  */

  const seller =
    await Seller.findById(
      commission.seller
    );

  if (!seller) {
    throw new Error(
      'Seller associated with commission was not found'
    );
  }

  seller.availableBalance =
    Number(
      seller.availableBalance || 0
    ) +
    Number(
      commission.sellerAmount || 0
    );

  seller.totalEarnings =
    Number(
      seller.totalEarnings || 0
    ) +
    Number(
      commission.sellerAmount || 0
    );

  seller.totalCommission =
    Number(
      seller.totalCommission || 0
    ) +
    Number(
      commission.commissionAmount || 0
    );

  await seller.save();

  return commission;
};


/*
|--------------------------------------------------------------------------
| CANCEL COMMISSION
|--------------------------------------------------------------------------
*/

export const cancelCommissionService = async (
  commissionId
) => {
  const commission =
    await Commission.findById(commissionId);

  if (!commission) {
    throw new Error('Commission not found');
  }

  if (commission.status === 'paid') {
    throw new Error(
      'Paid commission cannot be cancelled'
    );
  }

  commission.status = 'cancelled';

  await commission.save();

  return commission;
};