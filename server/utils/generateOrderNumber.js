import crypto from 'crypto';

/*
|--------------------------------------------------------------------------
| Generate Order Number
|--------------------------------------------------------------------------
|
| Example:
| FEG-20260916-A8K92P
|
|--------------------------------------------------------------------------
*/

export const generateOrderNumber = async () => {
  const date = new Date();

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, '0');

  const day = String(
    date.getDate()
  ).padStart(2, '0');

  const randomPart = crypto
    .randomBytes(4)
    .toString('hex')
    .toUpperCase()
    .slice(0, 6);

  return `FEG-${year}${month}${day}-${randomPart}`;
};

export default generateOrderNumber;