import mongoose from 'mongoose';

/*
|--------------------------------------------------------------------------
| Required Value
|--------------------------------------------------------------------------
*/

export const isRequired = (value) => {
  return (
    value !== undefined &&
    value !== null &&
    String(value).trim() !== ''
  );
};


/*
|--------------------------------------------------------------------------
| Email Validation
|--------------------------------------------------------------------------
*/

export const isValidEmail = (email) => {
  if (!isRequired(email)) {
    return false;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(
    String(email).trim()
  );
};


/*
|--------------------------------------------------------------------------
| Password Validation
|--------------------------------------------------------------------------
|
| Minimum 6 characters
|--------------------------------------------------------------------------
*/

export const isValidPassword = (password) => {
  if (!isRequired(password)) {
    return false;
  }

  return String(password).length >= 6;
};


/*
|--------------------------------------------------------------------------
| Phone Validation
|--------------------------------------------------------------------------
*/

export const isValidPhone = (phone) => {
  if (!isRequired(phone)) {
    return false;
  }

  const phoneRegex =
    /^\+?[0-9\s\-()]{7,20}$/;

  return phoneRegex.test(
    String(phone).trim()
  );
};


/*
|--------------------------------------------------------------------------
| MongoDB ObjectId Validation
|--------------------------------------------------------------------------
*/

export const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};


/*
|--------------------------------------------------------------------------
| Positive Number Validation
|--------------------------------------------------------------------------
*/

export const isPositiveNumber = (value) => {
  const number = Number(value);

  return (
    !Number.isNaN(number) &&
    number > 0
  );
};


/*
|--------------------------------------------------------------------------
| Non-negative Number Validation
|--------------------------------------------------------------------------
*/

export const isNonNegativeNumber = (value) => {
  const number = Number(value);

  return (
    !Number.isNaN(number) &&
    number >= 0
  );
};


/*
|--------------------------------------------------------------------------
| Positive Integer Validation
|--------------------------------------------------------------------------
*/

export const isPositiveInteger = (value) => {
  const number = Number(value);

  return (
    Number.isInteger(number) &&
    number > 0
  );
};


/*
|--------------------------------------------------------------------------
| Commission Rate Validation
|--------------------------------------------------------------------------
|
| Commission must be between 0% and 100%.
|--------------------------------------------------------------------------
*/

export const isValidCommissionRate = (
  rate
) => {
  const number = Number(rate);

  return (
    !Number.isNaN(number) &&
    number >= 0 &&
    number <= 100
  );
};


/*
|--------------------------------------------------------------------------
| Order Status Validation
|--------------------------------------------------------------------------
*/

export const isValidOrderStatus = (
  status
) => {
  const allowedStatuses = [
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
  ];

  return allowedStatuses.includes(status);
};


/*
|--------------------------------------------------------------------------
| Payment Status Validation
|--------------------------------------------------------------------------
*/

export const isValidPaymentStatus = (
 status
) => {
  const allowedStatuses = [
    'pending',
    'paid',
    'failed',
    'refunded',
  ];

  return allowedStatuses.includes(status);
};


/*
|--------------------------------------------------------------------------
| Payment Method Validation
|--------------------------------------------------------------------------
*/

export const isValidPaymentMethod = (
  method
) => {
  const allowedMethods = [
    'cash_on_delivery',
    'stripe',
    'paypal',
    'bank_transfer',
  ];

  return allowedMethods.includes(method);
};


/*
|--------------------------------------------------------------------------
| Seller Status Validation
|--------------------------------------------------------------------------
*/

export const isValidSellerStatus = (
  status
) => {
  const allowedStatuses = [
    'pending',
    'approved',
    'rejected',
    'suspended',
  ];

  return allowedStatuses.includes(status);
};


/*
|--------------------------------------------------------------------------
| Product Approval Status Validation
|--------------------------------------------------------------------------
*/

export const isValidProductApprovalStatus = (
 status
) => {
  const allowedStatuses = [
    'pending',
    'approved',
    'rejected',
  ];

  return allowedStatuses.includes(status);
};


/*
|--------------------------------------------------------------------------
| Store Status Validation
|--------------------------------------------------------------------------
*/

export const isValidStoreStatus = (
  status
) => {
  const allowedStatuses = [
    'pending',
    'active',
    'suspended',
    'closed',
  ];

  return allowedStatuses.includes(status);
};


/*
|--------------------------------------------------------------------------
| User Role Validation
|--------------------------------------------------------------------------
*/

export const isValidUserRole = (
  role
) => {
  const allowedRoles = [
    'customer',
    'seller',
    'admin',
  ];

  return allowedRoles.includes(role);
};


/*
|--------------------------------------------------------------------------
| Trim String
|--------------------------------------------------------------------------
*/

export const cleanString = (
 value
) => {
  if (value === undefined || value === null) {
    return '';
  }

  return String(value).trim();
};


/*
|--------------------------------------------------------------------------
| Validate Registration Data
|--------------------------------------------------------------------------
*/

export const validateRegistration = ({
  firstName,
  lastName,
  email,
  password,
}) => {
  const errors = {};

  if (!isRequired(firstName)) {
    errors.firstName =
      'First name is required';
  }

  if (!isRequired(lastName)) {
    errors.lastName =
      'Last name is required';
  }

  if (!isValidEmail(email)) {
    errors.email =
      'A valid email is required';
  }

  if (!isValidPassword(password)) {
    errors.password =
      'Password must be at least 6 characters';
  }

  return {
    isValid:
      Object.keys(errors).length === 0,

    errors,
  };
};


/*
|--------------------------------------------------------------------------
| Validate Login Data
|--------------------------------------------------------------------------
*/

export const validateLogin = ({
  email,
  password,
}) => {
  const errors = {};

  if (!isValidEmail(email)) {
    errors.email =
      'A valid email is required';
  }

  if (!isRequired(password)) {
    errors.password =
      'Password is required';
  }

  return {
    isValid:
      Object.keys(errors).length === 0,

    errors,
  };
};


/*
|--------------------------------------------------------------------------
| Validate Product Data
|--------------------------------------------------------------------------
*/

export const validateProduct = ({
  name,
  description,
  price,
  stock,
}) => {
  const errors = {};

  if (!isRequired(name)) {
    errors.name =
      'Product name is required';
  }

  if (!isRequired(description)) {
    errors.description =
      'Product description is required';
  }

  if (
    !isNonNegativeNumber(price)
  ) {
    errors.price =
      'A valid product price is required';
  }

  if (
    !Number.isInteger(Number(stock)) ||
    Number(stock) < 0
  ) {
    errors.stock =
      'Stock must be a non-negative integer';
  }

  return {
    isValid:
      Object.keys(errors).length === 0,

    errors,
  };
};


/*
|--------------------------------------------------------------------------
| Validate Store Data
|--------------------------------------------------------------------------
*/

export const validateStore = ({
  name,
  description,
}) => {
  const errors = {};

  if (!isRequired(name)) {
    errors.name =
      'Store name is required';
  }

  if (!isRequired(description)) {
    errors.description =
      'Store description is required';
  }

  return {
    isValid:
      Object.keys(errors).length === 0,

    errors,
  };
};


/*
|--------------------------------------------------------------------------
| Validate Shipping Address
|--------------------------------------------------------------------------
*/

export const validateShippingAddress = (
  address
) => {
  const errors = {};

  if (!address || typeof address !== 'object') {
    return {
      isValid: false,

      errors: {
        shippingAddress:
          'Shipping address is required',
      },
    };
  }

  if (!isRequired(address.fullName)) {
    errors.fullName =
      'Full name is required';
  }

  if (!isRequired(address.phone)) {
    errors.phone =
      'Phone number is required';
  }

  if (!isRequired(address.address)) {
    errors.address =
      'Address is required';
  }

  if (!isRequired(address.city)) {
    errors.city =
      'City is required';
  }

  if (!isRequired(address.country)) {
    errors.country =
      'Country is required';
  }

  return {
    isValid:
      Object.keys(errors).length === 0,

    errors,
  };
};