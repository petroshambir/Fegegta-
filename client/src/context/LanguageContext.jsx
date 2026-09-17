
import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext(null)

const translations = {
  // =========================================================
  // ENGLISH
  // =========================================================
  en: {
    // =======================================================
    // Navbar
    // =======================================================
    home: 'Home',
    products: 'Products',
    stores: 'Stores',
    about: 'About Us',
    login: 'Login',
    register: 'Register',
    cart: 'Cart',
    search: 'Search',
    categories: 'Categories',
    sellWithUs: 'Sell With Us',
    createStore: 'Create Your Store',
    sellerDashboard: 'Seller Dashboard',
    myOrders: 'My Orders',

    // =======================================================
    // Footer
    // =======================================================
    footerDescription:
      'A trusted marketplace where people can discover, buy, and sell products.',
    shop: 'Shop',
    account: 'Account',
    sellerSupport: 'Seller Support',
    copyright: '© 2026 ፈገግታ. All rights reserved.',

    // =======================================================
    // Cart
    // =======================================================
    emptyCart: 'Your cart is empty',
    emptyCartDescription:
      'You have not added any products to your cart yet.',
    continueShopping: 'Continue Shopping',
    itemsInCart: 'Items in Cart',
    soldBy: 'Sold by',
    remove: 'Remove',
    decreaseQuantity: 'Decrease quantity',
    increaseQuantity: 'Increase quantity',
    orderSummary: 'Order Summary',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'Free',
    total: 'Total',
    checkout: 'Checkout',
    secureCheckout:
      'Secure checkout. Your payment information is protected.',

    // =======================================================
    // Product Details
    // =======================================================
    productNotFound: 'Product Not Found',
    productNotFoundDescription:
      'The product you are looking for does not exist or is no longer available.',
    backToProducts: 'Back to Products',
    addToFavorites: 'Add to Favorites',
    reviews: 'Reviews',
    sellerRating: 'Seller Rating',
    inStock: 'In Stock',
    available: 'Available',
    outOfStock: 'Out of Stock',
    description: 'Description',
    quantity: 'Quantity',
    addToCart: 'Add to Cart',
    addedToCart: 'Added to Cart',
    buyNow: 'Buy Now',
    shippingInformation: 'Shipping Information',
    shippingInformationDescription:
      'Shipping options and estimated delivery time will be shown at checkout.',
    returnInformation: 'Returns & Refunds',
    returnInformationDescription:
      'Return and refund options are available according to marketplace policy.',
    securePurchase: 'Secure Purchase',
    securePurchaseDescription:
      'Your order and payment information are handled securely.',

    // =======================================================
    // Categories
    // =======================================================
    categoriesTitle: 'Categories',
    categoriesDescription:
      'Browse products by category and discover a wide range of products from trusted sellers.',
    exploreCategory: 'Explore Category',
    allCategories: 'All Categories',
    fashion: 'Fashion',
    shoes: 'Shoes',
    accessories: 'Accessories',
    bags: 'Bags',
    beauty: 'Beauty',
    homeLiving: 'Home & Living',
    electronics: 'Electronics',
    travel: 'Travel',

    // =======================================================
    // Products
    // =======================================================
    marketplace: 'Marketplace',
    featured: 'Featured',
    discoverProducts:
      'Discover quality products from trusted sellers.',
    filters: 'Filters',
    sortBy: 'Sort By',
    newest: 'Newest',
    topRated: 'Top Rated',
    priceLowHigh: 'Price: Low to High',
    priceHighLow: 'Price: High to Low',
    clearFilters: 'Clear Filters',
    productsFound: 'Products',
    allProducts: 'All Products',
    tryChangingSearch:
      'Try changing your search or filters.',
    searchProducts: 'Search Products',
    category: 'Category',
    allCategoriesFilter: 'All Categories',

    // =======================================================
    // Home
    // =======================================================
    featuredProducts: 'Featured Products',
    shopNow: 'Shop Now',
    discoverMore: 'Discover More',
    trustedSellers: 'Trusted Sellers',
    qualityProducts: 'Quality Products',
    easyShopping: 'Easy Shopping',

    // =======================================================
    // Checkout
    // =======================================================
    checkoutTitle: 'Checkout',
    checkoutProgress: 'Checkout',
    checkoutInformation: 'Information',
    checkoutAddress: 'Address',
    checkoutSize: 'Size & Measurements',
    checkoutPayment: 'Payment',

    customerInformation: 'Customer Information',
    customerInformationDescription:
      'Enter your contact information needed for this order.',

    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone Number',

    shippingAddress: 'Shipping Address',
    shippingAddressDescription:
      'Enter the address where you want your order to be delivered.',

    address: 'Address',
    apartment: 'Apartment, suite, etc. (optional)',
    city: 'City',
    stateProvince: 'State / Province',
    postalCode: 'Postal Code',
    country: 'Country',

    shippingMethod: 'Shipping Method',
    shippingMethodDescription:
      'Choose how you want your order to be delivered.',

    standardShipping: 'Standard Shipping',
    standardShippingDescription:
      'Delivered within 5–10 business days.',
    expressShipping: 'Express Shipping',
    expressShippingDescription:
      'Delivered quickly within 2–5 business days.',

    // =======================================================
    // Size & Measurements
    // =======================================================
    sizeAndMeasurements: 'Size & Measurements',
    sizeAndMeasurementsDescription:
      'Select the correct size and enter measurements if required for the product.',
    productSize: 'Product Size',
    selectSize: 'Select Size',
    measurementUnit: 'Measurement Unit',
    centimeters: 'Centimeters (cm)',
    inches: 'Inches (in)',

    womenClothing: 'Women’s Clothing',
    menClothing: 'Men’s Clothing',

    womenSize: 'Women’s Size',
    menSize: 'Men’s Size',

    bust: 'Bust',
    waist: 'Waist',
    hips: 'Hips',
    shoulder: 'Shoulder',
    sleeveLength: 'Sleeve Length',
    dressLength: 'Dress Length',

    chest: 'Chest',
    shirtLength: 'Shirt Length',
    trouserWaist: 'Trouser Waist',
    inseam: 'Inseam',

    footLength: 'Foot Length',
    footLengthDescription:
      'Enter your foot length to select the correct shoe size.',
    shoeSizeSystem: 'Shoe Size System',
    shoeSizeSystemDescription:
      'Select the shoe size system you use.',
    shoeSize: 'Shoe Size',
    shoeSizeDescription:
      'Select your shoe size according to the selected size system.',

    eu: 'EU',
    us: 'US',
    uk: 'UK',

    shoes: 'Shoes',

    bagSize: 'Bag Size',
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    width: 'Width',
    height: 'Height',
    depth: 'Depth',
    strapLength: 'Strap Length',

    customMeasurements: 'Use Custom Measurements',
    customMeasurementsDescription:
      'Enter your exact measurements for a better fit.',
    optional: 'Optional',
    required: 'Required',

    sizeRequired: 'Please select a size.',
    measurementsRequired:
      'Please complete the required measurements.',
    shoeSizeRequired: 'Please select a shoe size.',
    footLengthRequired: 'Please enter your foot length.',
    bagSizeRequired: 'Please select a bag size.',
    bagMeasurementsRequired:
      'Please complete the required bag measurements.',
    noSizeRequired:
      'This product does not require size or measurement information.',

    // =======================================================
    // Payment
    // =======================================================
    paymentMethod: 'Payment Method',
    paymentMethodDescription:
      'Choose how you would like to pay for your order.',

    creditDebitCard: 'Credit / Debit Card',
    creditDebitCardDescription:
      'Pay securely with your credit or debit card.',

    paypal: 'PayPal',
    paypalDescription:
      'Pay securely using your PayPal account.',

    bankTransfer: 'Bank Transfer',
    bankTransferDescription:
      'Pay by transferring the money directly to the provided bank account.',

    cardInformation: 'Card Information',
    cardInformationDescription:
      'Enter your card information to continue with payment.',

    cardholderName: 'Cardholder Name',
    cardNumber: 'Card Number',
    expiryDate: 'Expiry Date',
    securityCode: 'Security Code',
    cvc: 'CVC',
    enterCardNumber: 'Enter card number',
    enterExpiryDate: 'MM / YY',
    enterSecurityCode: 'CVV',

    secureCardInformation:
      'Your card information is handled securely and is not stored with your order.',

    paypalPaymentInformation:
      'You will be redirected to PayPal to securely complete your payment.',

    bankPaymentInformation:
      'Bank transfer payment instructions will be provided after you place your order.',

    paymentTestNotice:
      'Payment is currently in test mode. Real payment processing will be connected later.',

    paymentRequired:
      'Please select a payment method.',
    cardInformationRequired:
      'Please complete your card information.',

    placeOrder: 'Place Order',
    processingOrder: 'Processing Order...',
    orderPlaced: 'Your order has been placed successfully',

    orderReview: 'Review Your Order',
    orderItems: 'Order Items',
    selectedSize: 'Selected Size',
    selectedMeasurements: 'Measurements',

    // =======================================================
    // Authentication
    // =======================================================
    createYourAccount: 'Create Your Account',
    createAccountDescription:
      'Create an account to shop, manage your orders, and access additional marketplace services.',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",

    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    forgotPasswordDescription:
      'Enter the email associated with your account and we will send you instructions to reset your password.',
    sendResetLink: 'Send Reset Link',
    resetEmailSent: 'Reset Link Sent',
    resetEmailSentDescription:
      'If an account exists with this email, password reset instructions have been sent.',
    resetEmailCheckSpam:
      'Check your inbox and spam folder. The link may take a few minutes to arrive.',
    backToLogin: 'Back to Login',
    tryAnotherEmail: 'Try Another Email',

    welcomeBack: 'Welcome Back',
    loginDescription:
      'Log in to your account to continue shopping and manage your orders.',
    sellerLoginNote:
      'After approval, sellers can use the same login to access the seller dashboard.',
    sellerRegistrationNote:
      'Want to sell on ፈገግታ? Create a customer account first, then apply to become a seller.',
    orderTracking:
      'Track your orders, manage your profile, and enjoy a better shopping experience.',

    invalidEmail: 'Please enter a valid email address.',
    passwordMinLength:
      'Password must be at least 8 characters.',
    passwordsDoNotMatch: 'Passwords do not match.',
    invalidLogin:
      'The email or password you entered is incorrect.',
    registrationNotAvailable:
      'Registration is currently unavailable.',
    somethingWentWrong:
      'Something went wrong. Please try again.',
    processing: 'Processing...',

    // =======================================================
    // Reset Password
    // =======================================================
    invalidResetLink:
      'This password reset link is invalid or has expired.',
    passwordResetSuccess: 'Password Reset Successful',
    passwordResetSuccessDescription:
      'Your password has been successfully changed. You can now log in with your new password.',
    resetPasswordTitle: 'Reset Your Password',
    resetPasswordDescription:
      'Create a new password for your account.',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
    resetPassword: 'Reset Password',
    resetPasswordProcessing: 'Resetting Password...',

    // =======================================================
    // Order Confirmation
    // =======================================================
    paymentSuccessful: 'Payment Successful',
    thankYou: 'Thank You for Your Order',
    orderNumber: 'Order Number',
    confirmationEmailSent: 'Confirmation Email Sent',
    confirmationEmailDescription:
      'A confirmation email containing your order details will be sent to your email address.',
    emailConfirmation: 'Email Confirmation',
    orderCompleted: 'Your order has been completed successfully.',
    backToShopping: 'Back to Shopping',
    viewOrder: 'View Order',

    orderInformationUnavailable:
      'Order Information Unavailable',
    orderInformationUnavailableDescription:
      'We could not retrieve the order information for this page. Please return to shopping.',

    size: 'Size',

    // =======================================================
    // Account / Authentication
    // =======================================================
    checkingAccount: 'Checking your account...',
    logout: 'Logout',
    profile: 'Profile',

    // =======================================================
    // Seller
    // =======================================================
    becomeSeller: 'Become a Seller',
    seller: 'Seller',
    store: 'Store',
    storeName: 'Store Name',
    storeDescription: 'Store Description',
    applyToBecomeSeller: 'Apply to Become a Seller',

    // =======================================================
    // Seller Application
    // =======================================================
    becomeSellerTitle: 'Become a Seller on ፈገግታ',
    becomeSellerDescription:
      'Apply to open your store and start selling your products on our marketplace.',
    sellerApplication: 'Seller Application',
    sellerApplicationDescription:
      'Complete the information below. Your application will be reviewed by our administration team.',
    storeInformation: 'Store Information',
    storeInformationDescription:
      'Tell us about the store you want to create.',
    storeCategory: 'Store Category',
    selectCategory: 'Select Category',

    businessInformation: 'Business Information',
    businessInformationDescription:
      'Provide your contact and business information.',
    businessName: 'Business Name',
    businessEmail: 'Business Email',
    businessPhone: 'Business Phone',
    sellerAddress: 'Seller Address',

    sellerApplicationReviewNote:
      'Your application will be reviewed by an administrator. You will not become a seller automatically after submitting the application.',
    submitApplication: 'Submit Application',
    applicationSubmitted: 'Application Submitted',
    applicationPending: 'Your application is pending admin review.',
    adminReview: 'Admin Review',

    // =======================================================
    // Common
    // =======================================================
    loading: 'Loading...',
    clear: 'Clear',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    viewMore: 'View More',
    viewAll: 'View All',
    noResults: 'No results found',
    yes: 'Yes',
    no: 'No',
    confirm: 'Confirm',
    submit: 'Submit',
    apply: 'Apply',
    reset: 'Reset',
    continue: 'Continue',
    requiredField: 'This field is required.',
  },

  // =========================================================
  // TIGRINYA
  // =========================================================
  ti: {
    // =======================================================
    // Navbar
    // =======================================================
    home: 'መበገሲ',
    products: 'ፍርያት',
    stores: 'ድኳናት',
    about: 'ብዛዕባና',
    login: 'እቶ',
    register: 'ተመዝገብ',
    cart: 'ዓረብያ',
    search: 'ድለ',
    categories: 'ምድባት',
    sellWithUs: 'ምሳና ሸይጥ',
    createStore: 'ድኳንካ ፍጠር',
    sellerDashboard: 'ዳሽቦርድ ሻጣይ',
    myOrders: 'ትእዛዛተይ',

    // =======================================================
    // Footer
    // =======================================================
    footerDescription:
      'ሰባት ፍርያት ዝደልዩ፣ ዝዕድጉን ዝሸጡን ዝኽእሉሉ እሙን ዕዳጋ።',
    shop: 'ዕዳጋ',
    account: 'ኣካውንት',
    sellerSupport: 'ሓገዝ ሻጣይ',
    copyright: '© 2026 ፈገግታ. ኩሉ መሰል ተሓሊዩ።',

    // =======================================================
    // Cart
    // =======================================================
    emptyCart: 'ዓረብያኻ ባዶ እዩ',
    emptyCartDescription:
      'ክሳብ ሕጂ ኣብ ዓረብያኻ ዝኾነ ፍርያት ኣይወሰኽካን።',
    continueShopping: 'ዕዳጋ ቀጽል',
    itemsInCart: 'ፍርያት ኣብ ዓረብያ',
    soldBy: 'ዝሸጦ',
    remove: 'ኣውጽእ',
    decreaseQuantity: 'ብዝሒ ኣንክስ',
    increaseQuantity: 'ብዝሒ ወስኽ',
    orderSummary: 'ጽማቝ ትእዛዝ',
    subtotal: 'ድምር ቅድሚ ምልኣኽ',
    shipping: 'መላእኽ',
    free: 'ነጻ',
    total: 'ጠቕላላ',
    checkout: 'ክፍሊት ፈጽም',
    secureCheckout:
      'ውሑስ ክፍሊት። ሓበሬታ ክፍሊትካ ውሑስ እዩ።',

    // =======================================================
    // Product Details
    // =======================================================
    productNotFound: 'ፍርያት ኣይተረኽበን',
    productNotFoundDescription:
      'እቲ ትደልዮ ፍርያት የለን ወይ ካብ ሽያጭ ወጺኡ እዩ።',
    backToProducts: 'ናብ ፍርያት ተመለስ',
    addToFavorites: 'ናብ ዝፈትዎም ወስኽ',
    reviews: 'ግምገማታት',
    sellerRating: 'ደረጃ ሻጣይ',
    inStock: 'ኣብ ክምችት ኣሎ',
    available: 'ዝርከብ',
    outOfStock: 'ካብ ክምችት ወጺኡ',
    description: 'መግለጺ',
    quantity: 'ብዝሒ',
    addToCart: 'ናብ ዓረብያ ወስኽ',
    addedToCart: 'ናብ ዓረብያ ተወሲኹ',
    buyNow: 'ሕጂ ዓድግ',
    shippingInformation: 'ሓበሬታ መላእኽ',
    shippingInformationDescription:
      'ኣማራጺታት መላእኽን ግዜ ምብጻሕን ኣብ እዋን ክፍሊት ክርአ እዩ።',
    returnInformation: 'ምምላስን ገንዘብ ምምላስን',
    returnInformationDescription:
      'ኣማራጺታት ምምላስን ገንዘብ ምምላስን ብመሰረት ሕጊ ዕዳጋ ክህልዉ እዮም።',
    securePurchase: 'ውሑስ ዕድጊ',
    securePurchaseDescription:
      'ትእዛዝካን ሓበሬታ ክፍሊትካን ብውሑስ መንገዲ ይሓዙ።',

    // =======================================================
    // Categories
    // =======================================================
    categoriesTitle: 'ምድባት',
    categoriesDescription:
      'ብምድብ ፍርያት ድለዩ፣ ካብ እሙናት ሻጣያት ድማ ዝተፈላለዩ ፍርያት ርኸቡ።',
    exploreCategory: 'ነዚ ምድብ ድለ',
    allCategories: 'ኩሎም ምድባት',
    fashion: 'ፋሽን',
    shoes: 'ኣሳእን',
    accessories: 'መሳርሒታት',
    bags: 'ቦርሳታት',
    beauty: 'ጽባቐ',
    homeLiving: 'ናይ ገዛን ናብራን',
    electronics: 'ኤሌክትሮኒክስ',
    travel: 'ጉዕዞ',

    // =======================================================
    // Products
    // =======================================================
    marketplace: 'ዕዳጋ',
    featured: 'ዝተመረጹ',
    discoverProducts:
      'ጽሬት ዘለዎም ፍርያት ካብ እሙናት ሻጣያት ድለዩ።',
    filters: 'ማጣሪያታት',
    sortBy: 'ኣደራርባ',
    newest: 'ሓደሽቲ',
    topRated: 'ዝለዓለ ደረጃ ዘለዎም',
    priceLowHigh: 'ዋጋ፡ ካብ ዝነኣሰ ናብ ዝዓበየ',
    priceHighLow: 'ዋጋ፡ ካብ ዝዓበየ ናብ ዝነኣሰ',
    clearFilters: 'ማጣሪያታት ኣጽርይ',
    productsFound: 'ፍርያት',
    allProducts: 'ኩሎም ፍርያት',
    tryChangingSearch:
      'ምድላይካ ወይ ማጣሪያታትካ ክትቕይር ፈትን።',
    searchProducts: 'ፍርያት ድለ',
    category: 'ምድብ',
    allCategoriesFilter: 'ኩሎም ምድባት',

    // =======================================================
    // Home
    // =======================================================
    featuredProducts: 'ዝተመረጹ ፍርያት',
    shopNow: 'ሕጂ ዕደግ',
    discoverMore: 'ተወሳኺ ድለ',
    trustedSellers: 'እሙናት ሻጣያት',
    qualityProducts: 'ጽሬት ዘለዎም ፍርያት',
    easyShopping: 'ቀሊል ዕዳጋ',

    // =======================================================
    // Checkout
    // =======================================================
    checkoutTitle: 'ክፍሊት ፈጽም',
    checkoutProgress: 'ክፍሊት',
    checkoutInformation: 'ሓበሬታ',
    checkoutAddress: 'ኣድራሻ',
    checkoutSize: 'መጠንን መለክዒታትን',
    checkoutPayment: 'ክፍሊት',

    customerInformation: 'ሓበሬታ ዓዳጊ',
    customerInformationDescription:
      'ንዚ ትእዛዝ ዘድሊ ሓበሬታ መራኸቢኻ ኣእቱ።',

    firstName: 'ስም',
    lastName: 'ናይ ኣቦ ስም / ናይ መወዳእታ ስም',
    email: 'ኢመይል',
    phone: 'ቁጽሪ ተሌፎን',

    shippingAddress: 'ኣድራሻ መላእኽ',
    shippingAddressDescription:
      'ትእዛዝካ ክበጽሓሉ ደሊኻ ኣድራሻ ኣእቱ።',

    address: 'ኣድራሻ',
    apartment: 'ኣፓርትመንት፣ ስዊት ወዘተ (ኣማራጺ)',
    city: 'ከተማ',
    stateProvince: 'ክልል / ግዝኣት',
    postalCode: 'ፖስታ ኮድ',
    country: 'ሃገር',

    shippingMethod: 'መንገዲ መላእኽ',
    shippingMethodDescription:
      'ትእዛዝካ ከመይ ክመጽእ ከም እትደሊ ምረጽ።',

    standardShipping: 'መደበኛ መላእኽ',
    standardShippingDescription:
      'ኣብ 5–10 ናይ ስራሕ መዓልታት ይበጽሕ።',
    expressShipping: 'ቅልጡፍ መላእኽ',
    expressShippingDescription:
      'ኣብ 2–5 ናይ ስራሕ መዓልታት ብቕልጡፍ ይበጽሕ።',

    // =======================================================
    // Size & Measurements
    // =======================================================
    sizeAndMeasurements: 'መጠንን መለክዒታትን',
    sizeAndMeasurementsDescription:
      'ትኽክለኛ መጠን ምረጽ፣ እቲ ፍርያት እንተ ደሊዩ ድማ መለክዒታት ኣእቱ።',
    productSize: 'መጠን ፍርያት',
    selectSize: 'መጠን ምረጽ',
    measurementUnit: 'ክፍሊ መለክዒ',
    centimeters: 'ሳንቲሜተር (cm)',
    inches: 'ኢንች (in)',

    womenClothing: 'ናይ ደቂ ኣንስትዮ ክዳውንቲ',
    menClothing: 'ናይ ደቂ ተባዕትዮ ክዳውንቲ',

    womenSize: 'መጠን ደቂ ኣንስትዮ',
    menSize: 'መጠን ደቂ ተባዕትዮ',

    bust: 'ዙርያ ጡብ',
    waist: 'ዙርያ ሕቖ',
    hips: 'ዙርያ ዳሌ',
    shoulder: 'መስመር መንኵብ',
    sleeveLength: 'ንውሓት እጅ',
    dressLength: 'ንውሓት ክዳን',

    chest: 'ዙርያ ደረት',
    shirtLength: 'ንውሓት ሓጺር',
    trouserWaist: 'ዙርያ ሕቖ ሱሪ',
    inseam: 'ንውሓት ውሽጢ ሱሪ',

    footLength: 'ንውሓት እግሪ',
    footLengthDescription:
      'ትኽክለኛ መጠን ጫማ ንምምራጽ ንውሓት እግርኻ ኣእቱ።',

    shoeSizeSystem: 'ስርዓት መጠን',
    shoeSizeSystemDescription:
      'እቲ እትጥቀመሉ ስርዓት መጠን ጫማ ምረጽ።',

    shoeSize: 'መጠን ጫማ',
    shoeSizeDescription:
      'ብመሰረት እቲ ዝመረጽካዮ ስርዓት መጠን ጫማ ምረጽ።',

    eu: 'EU',
    us: 'US',
    uk: 'UK',

    shoes: 'ኣሳእን',

    bagSize: 'መጠን ቦርሳ',
    small: 'ንእሽቶ',
    medium: 'ማእከላይ',
    large: 'ዓቢ',
    width: 'ስፍሓት',
    height: 'ቁመት',
    depth: 'ዕምቀት',
    strapLength: 'ንውሓት መያዣ',

    customMeasurements: 'ፍሉይ መለክዒታት ተጠቐም',
    customMeasurementsDescription:
      'ንዝበለጸ ምቹእነት ትኽክለኛ መለክዒታትካ ኣእቱ.',
    optional: 'ኣማራጺ',
    required: 'ግዴታ',

    sizeRequired: 'በጃኻ መጠን ምረጽ።',
    measurementsRequired:
      'በጃኻ ዘድልዩ መለክዒታት ምልእ።',
    shoeSizeRequired: 'በጃኻ መጠን ጫማ ምረጽ።',
    footLengthRequired: 'በጃኻ ንውሓት እግሪ ኣእቱ።',
    bagSizeRequired: 'በጃኻ መጠን ቦርሳ ምረጽ።',
    bagMeasurementsRequired:
      'በጃኻ ዘድልዩ መለክዒታት ቦርሳ ምልእ።',
    noSizeRequired:
      'እዚ ፍርያት መጠን ወይ መለክዒታት ኣየድልዮን።',

    // =======================================================
    // Payment
    // =======================================================
    paymentMethod: 'ኣገባብ ክፍሊት',
    paymentMethodDescription:
      'ንትእዛዝካ ከመይ ክትከፍል ከም እትደሊ ምረጽ።',

    creditDebitCard: 'ክሬዲት / ዴቢት ካርድ',
    creditDebitCardDescription:
      'ብክሬዲት ወይ ዴቢት ካርድካ ብውሑስ መንገዲ ክፈል።',

    paypal: 'PayPal',
    paypalDescription:
      'ብናይ PayPal ኣካውንትካ ብውሑስ መንገዲ ክፈል።',

    bankTransfer: 'ብባንክ ምልኣኽ',
    bankTransferDescription:
      'ገንዘብ ብቐጥታ ናብ ዝተዋህበ ናይ ባንክ ኣካውንት ብምልኣኽ ክፈል።',

    cardInformation: 'ሓበሬታ ካርድ',
    cardInformationDescription:
      'ንክፍሊትካ ንምቕጻል ሓበሬታ ካርድካ ኣእቱ።',

    cardholderName: 'ስም ኣብ ካርድ',
    cardNumber: 'ቁጽሪ ካርድ',
    expiryDate: 'ዕለተ ምውዳእ',
    securityCode: 'ኮድ ድሕነት',
    cvc: 'CVC',
    enterCardNumber: 'ቁጽሪ ካርድ ኣእቱ',
    enterExpiryDate: 'MM / YY',
    enterSecurityCode: 'CVV',

    secureCardInformation:
      'ሓበሬታ ካርድካ ብውሑስ መንገዲ ይሓዝ፣ ምስ ትእዛዝካ ኣይዕቀብን።',

    paypalPaymentInformation:
      'ንክፍሊትካ ብውሑስ መንገዲ ንምፍጻም ናብ PayPal ክትመሓላለፍ ኢኻ።',

    bankPaymentInformation:
      'ትእዛዝካ ምስ ኣቕረብካ መምርሒ ክፍሊት ባንክ ክወሃበካ እዩ።',

    paymentTestNotice:
      'ክፍሊት ንግዜኡ ኣብ test mode እዩ። ናይ ሓቂ ክፍሊት ድሕሪ እዚ ክንውስኽ ኢና።',

    paymentRequired:
      'በጃኻ ኣገባብ ክፍሊት ምረጽ።',
    cardInformationRequired:
      'በጃኻ ሓበሬታ ካርድ ምልእ።',

    placeOrder: 'ትእዛዝ ኣረጋግጽ',
    processingOrder: 'ትእዛዝ ይስራሕ ኣሎ...',
    orderPlaced: 'ትእዛዝካ ብዓወት ተመዝጊቡ',

    orderReview: 'ትእዛዝካ ገምግም',
    orderItems: 'ፍርያት ትእዛዝ',
    selectedSize: 'ዝተመረጸ መጠን',
    selectedMeasurements: 'መለክዒታት',

    // =======================================================
    // Authentication
    // =======================================================
    createYourAccount: 'ኣካውንትካ ፍጠር',
    createAccountDescription:
      'ንምዕዳግ፣ ትእዛዛትካ ንምምሕዳርን ተወሰኽቲ ኣገልግሎታት ዕዳጋ ንምጥቃምን ኣካውንት ፍጠር።',
    createAccount: 'ኣካውንት ፍጠር',
    alreadyHaveAccount: 'ድሮ ኣካውንት ኣለካ?',
    dontHaveAccount: 'ኣካውንት የብልካን?',

    password: 'መሕለፊ ቃል',
    confirmPassword: 'መሕለፊ ቃል ኣረጋግጽ',
    forgotPassword: 'መሕለፊ ቃል ረሲዕካዮ?',
    forgotPasswordDescription:
      'ምስ ኣካውንትካ ዝተኣሳሰረ ኢመይል ኣእቱ፣ ንመሕለፊ ቃልካ ንምቕያር መምርሒ ክንሰደልካ ኢና።',
    sendResetLink: 'ሊንክ ምቕያር ስደድ',
    resetEmailSent: 'ሊንክ ምቕያር ተላኢኹ',
    resetEmailSentDescription:
      'ኣብዚ ኢመይል ኣካውንት እንተሃልዩ፣ መምርሒ መሕለፊ ቃል ክትቅይር ተላኢኹ ኣሎ።',
    resetEmailCheckSpam:
      'እቲ inboxን spam folderን ተመልከት። እቲ ሊንክ ንምብጻሕ ገለ ደቓይቕ ክወስድ ይኽእል።',
    backToLogin: 'ናብ እቶ ተመለስ',
    tryAnotherEmail: 'ካልእ ኢመይል ፈትን',

    welcomeBack: 'እንደገና እንቋዕ ብደሓን መጻእካ',
    loginDescription:
      'ንምዕዳግን ትእዛዛትካ ንምምሕዳርን ናብ ኣካውንትካ እቶ።',
    sellerLoginNote:
      'ሻጣያት ድሕሪ ምጽዳቕ እቲ ተመሳሳሊ እቶ ብምጥቃም ናብ seller dashboard ክኣትዉ ይኽእሉ።',
    sellerRegistrationNote:
      'ኣብ ፈገግታ ክትሸይጥ ደሊኻ? መጀመርታ ናይ ዓዳጊ ኣካውንት ፍጠር፣ ድሕሪኡ ሻጣይ ንምዃን ኣመልክት።',
    orderTracking:
      'ትእዛዛትካ ተኸታተል፣ ፕሮፋይልካ ኣመሓድር፣ ከምኡውን ዝሓሸ ተመኩሮ ዕዳጋ ርኸብ።',

    invalidEmail: 'በጃኻ ትኽክለኛ ኢመይል ኣእቱ።',
    passwordMinLength:
      'መሕለፊ ቃል ብውሑዱ 8 ፊደላት ክህልዎ ኣለዎ።',
    passwordsDoNotMatch:
      'እቶም መሕለፊ ቃላት ኣይመሳሰሉን።',
    invalidLogin:
      'እቲ ዘእተኻዮ ኢመይል ወይ መሕለፊ ቃል ትኽክል ኣይኮነን።',
    registrationNotAvailable:
      'ምዝገባ ኣብዚ ግዜ ኣይርከብን።',
    somethingWentWrong:
      'ጌጋ ተፈጢሩ። በጃኻ እንደገና ፈትን።',
    processing: 'ይስራሕ ኣሎ...',

    // =======================================================
    // Reset Password
    // =======================================================
    invalidResetLink:
      'እዚ ናይ መሕለፊ ቃል መቐየሪ ሊንክ ትኽክል ኣይኮነን ወይ ግዜኡ ሓሊፉ።',
    passwordResetSuccess:
      'መሕለፊ ቃል ብዓወት ተቐይሩ',
    passwordResetSuccessDescription:
      'መሕለፊ ቃልካ ብዓወት ተቐይሩ። ሕጂ ብሓድሽ መሕለፊ ቃልካ ክትኣቱ ትኽእል።',
    resetPasswordTitle: 'መሕለፊ ቃልካ ቀይር',
    resetPasswordDescription:
      'ንኣካውንትካ ሓድሽ መሕለፊ ቃል ፍጠር።',
    newPassword: 'ሓድሽ መሕለፊ ቃል',
    confirmNewPassword: 'ሓድሽ መሕለፊ ቃል ኣረጋግጽ',
    resetPassword: 'መሕለፊ ቃል ቀይር',
    resetPasswordProcessing: 'መሕለፊ ቃል ይቕየር ኣሎ...',

    // =======================================================
    // Order Confirmation
    // =======================================================
    paymentSuccessful: 'ክፍሊት ብዓወት ተፈጺሙ',
    thankYou: 'ንትእዛዝካ የቐንየልና',
    orderNumber: 'ቁጽሪ ትእዛዝ',
    confirmationEmailSent: 'መረጋገጺ ኢመይል ተላኢኹ',
    confirmationEmailDescription:
      'ምስ ዝርዝር ትእዛዝካ ዝተሓዋወሰ መረጋገጺ ናብ ኢመይልካ ክስደድ እዩ።',
    emailConfirmation: 'መረጋገጺ ኢመይል',
    orderCompleted: 'ትእዛዝካ ብዓወት ተዛዚሙ።',
    backToShopping: 'ናብ ዕዳጋ ተመለስ',
    viewOrder: 'ትእዛዝ ርአ',

    orderInformationUnavailable:
      'ሓበሬታ ትእዛዝ ኣይርከብን',
    orderInformationUnavailableDescription:
      'ናይዚ ገጽ ሓበሬታ ትእዛዝ ክንረኽቦ ኣይከኣልናን። በጃኻ ናብ ዕዳጋ ተመለስ።',

    size: 'መጠን',

    // =======================================================
    // Account / Authentication
    // =======================================================
    checkingAccount: 'ኣካውንትካ ይምርመር ኣሎ...',
    logout: 'ውጻእ',
    profile: 'ፕሮፋይል',

    // =======================================================
    // Seller
    // =======================================================
    becomeSeller: 'ሻጣይ ኩን',
    seller: 'ሻጣይ',
    store: 'ድኳን',
    storeName: 'ስም ድኳን',
    storeDescription: 'መግለጺ ድኳን',
    applyToBecomeSeller: 'ሻጣይ ንምዃን ኣመልክት',

    // =======================================================
    // Seller Application
    // =======================================================
    becomeSellerTitle: 'ኣብ ፈገግታ ሻጣይ ኩን',
    becomeSellerDescription:
      'ድኳንካ ንምኽፋትን ፍርያትካ ኣብ ዕዳጋና ንምሻጥን ኣመልክት።',
    sellerApplication: 'መመልከቲ ሻጣይ',
    sellerApplicationDescription:
      'እዚ ሓበሬታ ምልእ። መመልከቲኻ ብኣስተዳደር ክግምገም እዩ።',
    storeInformation: 'ሓበሬታ ድኳን',
    storeInformationDescription:
      'ብዛዕባ እቲ ክትፈጥሮ እትደሊ ድኳን ንገረና።',
    storeCategory: 'ምድብ ድኳን',
    selectCategory: 'ምድብ ምረጽ',

    businessInformation: 'ሓበሬታ ንግዲ',
    businessInformationDescription:
      'ሓበሬታ መራኸቢን ንግድን ኣቕርብ።',
    businessName: 'ስም ንግዲ',
    businessEmail: 'ኢመይል ንግዲ',
    businessPhone: 'ቁጽሪ ተሌፎን ንግዲ',
    sellerAddress: 'ኣድራሻ ሻጣይ',

    sellerApplicationReviewNote:
      'መመልከቲኻ ብኣስተዳደር ክግምገም እዩ። መመልከቲ ምስ ላእኽካ ብቐጥታ ሻጣይ ኣይትኸውንን።',
    submitApplication: 'መመልከቲ ስደድ',
    applicationSubmitted: 'መመልከቲ ተላኢኹ',
    applicationPending: 'መመልከቲኻ ኣብ ጽበት ግምገማ ኣስተዳደር ኣሎ።',
    adminReview: 'ግምገማ ኣስተዳደር',

    // =======================================================
    // Common
    // =======================================================
    loading: 'ይጽዓን ኣሎ...',
    clear: 'ኣጽርይ',
    cancel: 'ሰርዝ',
    save: 'ዓቅብ',
    delete: 'ደምስስ',
    edit: 'ኣስተኻኽል',
    close: 'ዕጸው',
    back: 'ተመለስ',
    next: 'ቀጻሊ',
    previous: 'ዝሓለፈ',
    viewMore: 'ተወሳኺ ርአ',
    viewAll: 'ኩሉ ርአ',
    noResults: 'ዝኾነ ውጽኢት ኣይተረኽበን',
    yes: 'እወ',
    no: 'ኣይፋል',
    confirm: 'ኣረጋግጽ',
    submit: 'ላእኽ',
    apply: 'ተግብር',
    reset: 'እንደገና ኣዳልው',
    continue: 'ቀጽል',
    requiredField: 'እዚ ቦታ ግዴታ እዩ።',
  },

  // =========================================================
  // AMHARIC
  // =========================================================
  am: {
    // =======================================================
    // Navbar
    // =======================================================
    home: 'መነሻ',
    products: 'ምርቶች',
    stores: 'መደብሮች',
    about: 'ስለ እኛ',
    login: 'ግባ',
    register: 'ተመዝገብ',
    cart: 'ጋሪ',
    search: 'ፈልግ',
    categories: 'ምድቦች',
    sellWithUs: 'ከእኛ ጋር ይሽጡ',
    createStore: 'መደብርዎን ይፍጠሩ',
    sellerDashboard: 'የሻጭ ዳሽቦርድ',
    myOrders: 'ትዕዛዞቼ',

    // =======================================================
    // Footer
    // =======================================================
    footerDescription:
      'ሰዎች ምርቶችን ማግኘት፣ መግዛት እና መሸጥ የሚችሉበት እምነት የሚጣልበት የገበያ መድረክ።',
    shop: 'ግዢ',
    account: 'መለያ',
    sellerSupport: 'የሻጭ ድጋፍ',
    copyright: '© 2026 ፈገግታ. መብቱ በሙሉ የተጠበቀ ነው።',

    // =======================================================
    // Cart
    // =======================================================
    emptyCart: 'ጋሪዎ ባዶ ነው',
    emptyCartDescription:
      'እስካሁን ምንም ምርት ወደ ጋሪዎ አልጨመሩም።',
    continueShopping: 'ግዢዎን ይቀጥሉ',
    itemsInCart: 'ምርቶች በጋሪ ውስጥ',
    soldBy: 'ሻጭ',
    remove: 'አስወግድ',
    decreaseQuantity: 'ብዛት ቀንስ',
    increaseQuantity: 'ብዛት ጨምር',
    orderSummary: 'የትዕዛዝ ማጠቃለያ',
    subtotal: 'ንዑስ ድምር',
    shipping: 'መላኪያ',
    free: 'ነፃ',
    total: 'ጠቅላላ',
    checkout: 'ክፍያ ይፈጽሙ',
    secureCheckout:
      'ደህንነቱ የተጠበቀ ክፍያ። የክፍያ መረጃዎ የተጠበቀ ነው።',

    // =======================================================
    // Product Details
    // =======================================================
    productNotFound: 'ምርቱ አልተገኘም',
    productNotFoundDescription:
      'የሚፈልጉት ምርት የለም ወይም ከሽያጭ ወጥቷል።',
    backToProducts: 'ወደ ምርቶች ተመለስ',
    addToFavorites: 'ወደ ተወዳጆች ጨምር',
    reviews: 'ግምገማዎች',
    sellerRating: 'የሻጭ ደረጃ',
    inStock: 'በክምችት አለ',
    available: 'ይገኛል',
    outOfStock: 'ከክምችት ውጭ',
    description: 'መግለጫ',
    quantity: 'ብዛት',
    addToCart: 'ወደ ጋሪ ጨምር',
    addedToCart: 'ወደ ጋሪ ተጨምሯል',
    buyNow: 'አሁን ይግዙ',
    shippingInformation: 'የመላኪያ መረጃ',
    shippingInformationDescription:
      'የመላኪያ አማራጮችና የመድረሻ ጊዜ በክፍያ ጊዜ ይታያል።',
    returnInformation: 'መመለስ እና ገንዘብ መመለስ',
    returnInformationDescription:
      'የመመለስና የገንዘብ መመለስ አማራጮች በገበያ መድረኩ ፖሊሲ መሰረት ይኖራሉ።',
    securePurchase: 'ደህንነቱ የተጠበቀ ግዢ',
    securePurchaseDescription:
      'የትዕዛዝዎ እና የክፍያ መረጃዎ በደህንነት ይያዛል።',

    // =======================================================
    // Categories
    // =======================================================
    categoriesTitle: 'ምድቦች',
    categoriesDescription:
      'በምድብ ምርቶችን ይፈልጉ እና ከታማኝ ሻጮች የተለያዩ ምርቶችን ያግኙ።',
    exploreCategory: 'ምድቡን ይመልከቱ',
    allCategories: 'ሁሉም ምድቦች',
    fashion: 'ፋሽን',
    shoes: 'ጫማዎች',
    accessories: 'መለዋወጫዎች',
    bags: 'ቦርሳዎች',
    beauty: 'ውበት',
    homeLiving: 'ቤት እና አኗኗር',
    electronics: 'ኤሌክትሮኒክስ',
    travel: 'ጉዞ',

    // =======================================================
    // Products Page
    // =======================================================
    marketplace: 'የገበያ መድረክ',
    featured: 'ተለይተው የቀረቡ',
    discoverProducts:
      'ከታማኝ ሻጮች ጥራት ያላቸውን ምርቶች ያግኙ።',
    filters: 'ማጣሪያዎች',
    sortBy: 'ደረጃ አሰጣጥ',
    newest: 'አዳዲስ',
    topRated: 'ከፍተኛ ደረጃ ያላቸው',
    priceLowHigh: 'ዋጋ፡ ከዝቅተኛ ወደ ከፍተኛ',
    priceHighLow: 'ዋጋ፡ ከከፍተኛ ወደ ዝቅተኛ',
    clearFilters: 'ማጣሪያዎችን አጽዳ',
    productsFound: 'ምርቶች',
    allProducts: 'ሁሉም ምርቶች',
    tryChangingSearch:
      'ፍለጋዎን ወይም ማጣሪያዎችዎን ለመቀየር ይሞክሩ።',
    searchProducts: 'ምርቶችን ይፈልጉ',
    category: 'ምድብ',
    allCategoriesFilter: 'ሁሉም ምድቦች',

    // =======================================================
    // Home
    // =======================================================
    featuredProducts: 'ተለይተው የቀረቡ ምርቶች',
    shopNow: 'አሁን ይግዙ',
    discoverMore: 'ተጨማሪ ያግኙ',
    trustedSellers: 'ታማኝ ሻጮች',
    qualityProducts: 'ጥራት ያላቸው ምርቶች',
    easyShopping: 'ቀላል ግዢ',

    // =======================================================
    // Checkout
    // =======================================================
    checkoutTitle: 'ክፍያ ይፈጽሙ',
    checkoutProgress: 'ክፍያ',
    checkoutInformation: 'መረጃ',
    checkoutAddress: 'አድራሻ',
    checkoutSize: 'መጠን እና መለኪያዎች',
    checkoutPayment: 'ክፍያ',

    customerInformation: 'የደንበኛ መረጃ',
    customerInformationDescription:
      'ለዚህ ትዕዛዝ የሚያስፈልገውን የመገናኛ መረጃ ያስገቡ።',

    firstName: 'ስም',
    lastName: 'የአባት ስም / የአያት ስም',
    email: 'ኢሜይል',
    phone: 'ስልክ ቁጥር',

    shippingAddress: 'የመላኪያ አድራሻ',
    shippingAddressDescription:
      'ትዕዛዝዎ እንዲደርስበት የሚፈልጉትን አድራሻ ያስገቡ።',

    address: 'አድራሻ',
    apartment: 'አፓርትመንት፣ ስዊት ወዘተ (አማራጭ)',
    city: 'ከተማ',
    stateProvince: 'ክልል / ግዛት',
    postalCode: 'ፖስታ ኮድ',
    country: 'ሀገር',

    shippingMethod: 'የመላኪያ ዘዴ',
    shippingMethodDescription:
      'ትዕዛዝዎ እንዴት እንዲደርስ እንደሚፈልጉ ይምረጡ።',

    standardShipping: 'መደበኛ መላኪያ',
    standardShippingDescription:
      'በ5–10 የስራ ቀናት ውስጥ ይደርሳል።',
    expressShipping: 'ፈጣን መላኪያ',
    expressShippingDescription:
      'በ2–5 የስራ ቀናት ውስጥ በፍጥነት ይደርሳል።',

    // =======================================================
    // Size & Measurements
    // =======================================================
    sizeAndMeasurements: 'መጠን እና መለኪያዎች',
    sizeAndMeasurementsDescription:
      'ትክክለኛውን መጠን ይምረጡ እና ለምርቱ አስፈላጊ ከሆነ መለኪያዎችን ያስገቡ።',
    productSize: 'የምርት መጠን',
    selectSize: 'መጠን ይምረጡ',
    measurementUnit: 'የመለኪያ ክፍል',
    centimeters: 'ሴንቲሜትር (cm)',
    inches: 'ኢንች (in)',

    womenClothing: 'የሴቶች ልብስ',
    menClothing: 'የወንዶች ልብስ',

    womenSize: 'የሴቶች መጠን',
    menSize: 'የወንዶች መጠን',

    bust: 'የደረት ዙሪያ',
    waist: 'የወገብ ዙሪያ',
    hips: 'የዳሌ ዙሪያ',
    shoulder: 'የትከሻ ስፋት',
    sleeveLength: 'የእጅጌ ርዝመት',
    dressLength: 'የቀሚስ / ልብስ ርዝመት',

    chest: 'የደረት ዙሪያ',
    shirtLength: 'የሸሚዝ ርዝመት',
    trouserWaist: 'የሱሪ ወገብ',
    inseam: 'የሱሪ ውስጣዊ ርዝመት',

    footLength: 'የእግር ርዝመት',
    footLengthDescription:
      'ትክክለኛውን የጫማ መጠን ለመምረጥ የእግርዎን ርዝመት ያስገቡ።',

    shoeSizeSystem: 'የመጠን ስርዓት',
    shoeSizeSystemDescription:
      'የሚጠቀሙበትን የጫማ መጠን ስርዓት ይምረጡ።',

    shoeSize: 'የጫማ መጠን',
    shoeSizeDescription:
      'በመረጡት የመጠን ስርዓት የጫማ መጠንዎን ይምረጡ።',

    eu: 'EU',
    us: 'US',
    uk: 'UK',

    shoes: 'ጫማዎች',

    bagSize: 'የቦርሳ መጠን',
    small: 'ትንሽ',
    medium: 'መካከለኛ',
    large: 'ትልቅ',
    width: 'ስፋት',
    height: 'ቁመት',
    depth: 'ጥልቀት',
    strapLength: 'የመያዣ ርዝመት',

    customMeasurements: 'የግል መለኪያዎችን ተጠቀም',
    customMeasurementsDescription:
      'የተሻለ ተስማሚነት ለማግኘት ትክክለኛ መለኪያዎችዎን ያስገቡ።',
    optional: 'አማራጭ',
    required: 'አስፈላጊ',

    sizeRequired: 'እባክዎ መጠን ይምረጡ።',
    measurementsRequired:
      'እባክዎ አስፈላጊ መለኪያዎችን ይሙሉ።',
    shoeSizeRequired:
      'እባክዎ የጫማ መጠን ይምረጡ።',
    footLengthRequired:
      'እባክዎ የእግርዎን ርዝመት ያስገቡ።',
    bagSizeRequired:
      'እባክዎ የቦርሳ መጠን ይምረጡ።',
    bagMeasurementsRequired:
      'እባክዎ አስፈላጊ የቦርሳ መለኪያዎችን ይሙሉ።',

    noSizeRequired:
      'ይህ ምርት የመጠን ወይም የመለኪያ መረጃ አያስፈልገውም።',

    // =======================================================
    // Payment
    // =======================================================
    paymentMethod: 'የክፍያ ዘዴ',
    paymentMethodDescription:
      'ለትዕዛዝዎ እንዴት መክፈል እንደሚፈልጉ ይምረጡ።',

    creditDebitCard: 'ክሬዲት / ዴቢት ካርድ',
    creditDebitCardDescription:
      'በክሬዲት ወይም በዴቢት ካርድዎ በደህንነት ይክፈሉ።',

    paypal: 'PayPal',
    paypalDescription:
      'የPayPal መለያዎን በመጠቀም በደህንነት ይክፈሉ።',

    bankTransfer: 'በባንክ ማስተላለፍ',
    bankTransferDescription:
      'ገንዘቡን በቀጥታ ወደተሰጠው የባንክ ሂሳብ በማስተላለፍ ይክፈሉ።',

    cardInformation: 'የካርድ መረጃ',
    cardInformationDescription:
      'ክፍያዎን ለመቀጠል የካርድዎን መረጃ ያስገቡ።',

    cardholderName: 'በካርዱ ላይ ያለ ስም',
    cardNumber: 'የካርድ ቁጥር',
    expiryDate: 'የማብቂያ ቀን',
    securityCode: 'የደህንነት ኮድ',
    cvc: 'CVC',
    enterCardNumber: 'የካርድ ቁጥር ያስገቡ',
    enterExpiryDate: 'MM / YY',
    enterSecurityCode: 'CVV',

    secureCardInformation:
      'የካርድዎ መረጃ በደህንነት ይያዛል እና ከትዕዛዝዎ ጋር አይቀመጥም።',

    paypalPaymentInformation:
      'ክፍያዎን በደህንነት ለመፈጸም ወደ PayPal ይመራሉ።',

    bankPaymentInformation:
      'ትዕዛዝዎን ካስገቡ በኋላ የባንክ ማስተላለፊያ መመሪያዎች ይሰጥዎታል።',

    paymentTestNotice:
      'ክፍያው ለጊዜው በሙከራ ሁኔታ ላይ ነው። እውነተኛ የክፍያ ስርዓት በኋላ ይገናኛል።',

    paymentRequired:
      'እባክዎ የክፍያ ዘዴ ይምረጡ።',
    cardInformationRequired:
      'እባክዎ የካርድ መረጃውን ይሙሉ።',

    placeOrder: 'ትዕዛዝ ያስገቡ',
    processingOrder: 'ትዕዛዙ በማስኬድ ላይ...',
    orderPlaced:
      'ትዕዛዝዎ በተሳካ ሁኔታ ተመዝግቧል',

    orderReview: 'ትዕዛዝዎን ይገምግሙ',
    orderItems: 'የትዕዛዝ ምርቶች',
    selectedSize: 'የተመረጠ መጠን',
    selectedMeasurements: 'መለኪያዎች',

    // =======================================================
    // Authentication
    // =======================================================
    createYourAccount: 'መለያዎን ይፍጠሩ',
    createAccountDescription:
      'ለመግዛት፣ ትዕዛዞችዎን ለማስተዳደር እና ተጨማሪ የገበያ መድረክ አገልግሎቶችን ለመጠቀም መለያ ይፍጠሩ።',
    createAccount: 'መለያ ይፍጠሩ',
    alreadyHaveAccount: 'አስቀድመው መለያ አለዎት?',
    dontHaveAccount: 'መለያ የለዎትም?',

    password: 'የይለፍ ቃል',
    confirmPassword: 'የይለፍ ቃል ያረጋግጡ',
    forgotPassword: 'የይለፍ ቃል ረሱ?',
    forgotPasswordDescription:
      'ከመለያዎ ጋር የተያያዘውን ኢሜይል ያስገቡ፤ የይለፍ ቃልዎን ለመቀየር መመሪያ እንልክልዎታለን።',
    sendResetLink: 'የመቀየሪያ ሊንክ ይላኩ',
    resetEmailSent: 'የመቀየሪያ ሊንክ ተልኳል',
    resetEmailSentDescription:
      'በዚህ ኢሜይል መለያ ካለ፣ የይለፍ ቃል መቀየሪያ መመሪያ ተልኳል።',
    resetEmailCheckSpam:
      'እባክዎ የInbox እና Spam አቃፊዎን ይመልከቱ። ሊንኩ ለመድረስ ጥቂት ደቂቃዎች ሊወስድ ይችላል።',
    backToLogin: 'ወደ መግቢያ ተመለስ',
    tryAnotherEmail: 'ሌላ ኢሜይል ይሞክሩ',

    welcomeBack: 'እንኳን ደህና መጡ',
    loginDescription:
      'ግዢዎን ለመቀጠል እና ትዕዛዞችዎን ለማስተዳደር ወደ መለያዎ ይግቡ።',
    sellerLoginNote:
      'ሻጮች ከተፈቀደላቸው በኋላ የሻጭ ዳሽቦርድ ለመጠቀም ተመሳሳዩን መግቢያ መጠቀም ይችላሉ።',
    sellerRegistrationNote:
      'በፈገግታ መሸጥ ይፈልጋሉ? መጀመሪያ የደንበኛ መለያ ይፍጠሩ፣ ከዚያም ሻጭ ለመሆን ያመልክቱ።',
    orderTracking:
      'ትዕዛዞችዎን ይከታተሉ፣ መገለጫዎን ያስተዳድሩ እና የተሻለ የግዢ ልምድ ያግኙ።',

    invalidEmail:
      'እባክዎ ትክክለኛ የኢሜይል አድራሻ ያስገቡ።',
    passwordMinLength:
      'የይለፍ ቃል ቢያንስ 8 ቁምፊዎች ሊኖሩት ይገባል።',
    passwordsDoNotMatch:
      'የይለፍ ቃሎቹ አይዛመዱም።',
    invalidLogin:
      'ያስገቡት ኢሜይል ወይም የይለፍ ቃል ትክክል አይደለም።',
    registrationNotAvailable:
      'ምዝገባ በአሁኑ ጊዜ አይገኝም።',
    somethingWentWrong:
      'አንድ ችግር ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።',
    processing: 'በማስኬድ ላይ...',

    // =======================================================
    // Reset Password
    // =======================================================
    invalidResetLink:
      'ይህ የይለፍ ቃል መቀየሪያ ሊንክ ልክ አይደለም ወይም ጊዜው አልፎበታል።',
    passwordResetSuccess:
      'የይለፍ ቃል በተሳካ ሁኔታ ተቀይሯል',
    passwordResetSuccessDescription:
      'የይለፍ ቃልዎ በተሳካ ሁኔታ ተቀይሯል። አሁን በአዲሱ የይለፍ ቃልዎ መግባት ይችላሉ።',
    resetPasswordTitle: 'የይለፍ ቃልዎን ይቀይሩ',
    resetPasswordDescription:
      'ለመለያዎ አዲስ የይለፍ ቃል ይፍጠሩ።',
    newPassword: 'አዲስ የይለፍ ቃል',
    confirmNewPassword: 'አዲሱን የይለፍ ቃል ያረጋግጡ',
    resetPassword: 'የይለፍ ቃል ይቀይሩ',
    resetPasswordProcessing:
      'የይለፍ ቃል በመቀየር ላይ...',

    // =======================================================
    // Order Confirmation
    // =======================================================
    paymentSuccessful:
      'ክፍያ በተሳካ ሁኔታ ተፈጽሟል',
    thankYou: 'ለትዕዛዝዎ እናመሰግናለን',
    orderNumber: 'የትዕዛዝ ቁጥር',
    confirmationEmailSent:
      'የማረጋገጫ ኢሜይል ተልኳል',
    confirmationEmailDescription:
      'የትዕዛዝዎ ዝርዝር ያለው የማረጋገጫ መልዕክት ወደ ኢሜይልዎ ይላካል።',
    emailConfirmation: 'የኢሜይል ማረጋገጫ',
    orderCompleted:
      'ትዕዛዝዎ በተሳካ ሁኔታ ተጠናቋል።',
    backToShopping: 'ወደ ግዢ ተመለስ',
    viewOrder: 'ትዕዛዝ ይመልከቱ',

    orderInformationUnavailable:
      'የትዕዛዝ መረጃ አይገኝም',
    orderInformationUnavailableDescription:
      'ለዚህ ገጽ የትዕዛዝ መረጃን ማግኘት አልቻልንም። እባክዎ ወደ ግዢ ይመለሱ እና እንደገና ይሞክሩ።',

    size: 'መጠን',

    // =======================================================
    // Account / Authentication
    // =======================================================
    checkingAccount: 'መለያዎን በመመርመር ላይ...',
    logout: 'ውጣ',
    profile: 'መገለጫ',

    
    // =======================================================
    // Seller
    // =======================================================
    becomeSeller: 'ሻጭ ይሁኑ',
    seller: 'ሻጭ',
    store: 'መደብር',
    storeName: 'የመደብር ስም',
    storeDescription: 'የመደብር መግለጫ',
    applyToBecomeSeller: 'ሻጭ ለመሆን ያመልክቱ',

    // =======================================================
    // Seller Application
    // =======================================================
    becomeSellerTitle: 'በፈገግታ ላይ ሻጭ ይሁኑ',
    becomeSellerDescription:
      'መደብርዎን ለመክፈት እና ምርቶችዎን በገበያ መድረካችን ላይ ለመሸጥ ያመልክቱ።',
    sellerApplication: 'የሻጭ ማመልከቻ',
    sellerApplicationDescription:
      'ከታች ያለውን መረጃ ይሙሉ። ማመልከቻዎ በአስተዳደር ቡድናችን ይገመገማል።',
    storeInformation: 'የመደብር መረጃ',
    storeInformationDescription:
      'ሊፈጥሩት ስለሚፈልጉት መደብር ይንገሩን።',
    storeCategory: 'የመደብር ምድብ',
    selectCategory: 'ምድብ ይምረጡ',

    businessInformation: 'የንግድ መረጃ',
    businessInformationDescription:
      'የመገናኛ እና የንግድ መረጃዎን ያቅርቡ።',
    businessName: 'የንግድ ስም',
    businessEmail: 'የንግድ ኢሜይል',
    businessPhone: 'የንግድ ስልክ',
    sellerAddress: 'የሻጭ አድራሻ',

    sellerApplicationReviewNote:
      'ማመልከቻዎ በአስተዳዳሪ ይገመገማል። ማመልከቻውን ካስገቡ በኋላ በራስ-ሰር ሻጭ አይሆኑም።',
    submitApplication: 'ማመልከቻ ያስገቡ',
    applicationSubmitted: 'ማመልከቻ ተልኳል',
    applicationPending:
      'ማመልከቻዎ የአስተዳደር ግምገማን እየጠበቀ ነው።',
    adminReview: 'የአስተዳደር ግምገማ',

    // =======================================================
    // Common
    // =======================================================
    loading: 'በመጫን ላይ...',
    clear: 'አጽዳ',
    cancel: 'ሰርዝ',
    save: 'አስቀምጥ',
    delete: 'ሰርዝ',
    edit: 'አስተካክል',
    close: 'ዝጋ',
    back: 'ተመለስ',
    next: 'ቀጣይ',
    previous: 'ቀዳሚ',
    viewMore: 'ተጨማሪ ይመልከቱ',
    viewAll: 'ሁሉንም ይመልከቱ',
    noResults: 'ምንም ውጤት አልተገኘም',
    yes: 'አዎ',
    no: 'አይ',
    confirm: 'አረጋግጥ',
    submit: 'አስገባ',
    apply: 'ተግብር',
    reset: 'ዳግም አስጀምር',
    continue: 'ቀጥል',
    requiredField: 'ይህ መስክ አስፈላጊ ነው።',

    becomeSellerTitle: 'ሻጭ ይሁኑ',
becomeSellerDescription: 'ስለ ሱቅዎ እና ለመሸጥ ስለሚፈልጓቸው ምርቶች ይንገሩን። ማመልከቻዎ ሱቅዎ ከመፈቀዱ በፊት በአስተዳደራችን ይገመገማል።',

storeInformation: 'የሱቅ መረጃ',
storeInformationDescription: 'ስለ ሱቅዎ ለደንበኞች ይንገሩ።',

storeName: 'የሱቅ ስም',
storeNamePlaceholder: 'የሱቅዎን ስም ያስገቡ',

storeDescription: 'የሱቅ መግለጫ',
storeDescriptionPlaceholder: 'ስለ ሱቅዎ እና ልዩ የሚያደርገውን ነገር ይግለጹ...',

productInformation: 'የምርት መረጃ',
productInformationDescription: 'ለመሸጥ የሚፈልጓቸውን የምርት ዓይነቶች ይንገሩን።',

productType: 'ምን መሸጥ ይፈልጋሉ?',
productTypePlaceholder: 'ለምሳሌ፦ የሐበሻ ልብስ፣ ኤሌክትሮኒክስ፣ ጫማ...',

productCategory: 'የምርት ምድብ',
selectCategory: 'ምድብ ይምረጡ',

productQuality: 'የምርት ጥራት',
productQualityPlaceholder: 'ለምሳሌ፦ ፕሪሚየም፣ በእጅ የተሰራ፣ ኦሪጅናል...',

productDescription: 'የምርት መግለጫ',
productDescriptionPlaceholder: 'ለመሸጥ ስለሚያቅዷቸው ምርቶች ይግለጹ...',

businessInformation: 'የንግድ መረጃ',
businessInformationDescription: 'የንግድዎን የመገናኛ መረጃ ያቅርቡ።',

businessName: 'የንግድ ስም',
businessNamePlaceholder: 'የንግድዎን ስም ያስገቡ',

businessEmail: 'የንግድ ኢሜይል',
businessEmailPlaceholder: 'you@example.com',

businessPhone: 'የንግድ ስልክ',
businessPhonePlaceholder: '+31 00 000 0000',

address: 'አድራሻ',
addressPlaceholder: 'የንግድዎን አድራሻ ያስገቡ',

applicationReviewNote: 'ማመልከቻዎ የሻጭ መለያዎ ከመፈቀዱ በፊት በአስተዳደራችን ይገመገማል።',

submitApplication: 'ማመልከቻ ያስገቡ',
submitting: 'በማስገባት ላይ...',
applicationSubmitted: 'ማመልከቻዎ በተሳካ ሁኔታ ተልኳል።',
applicationPending: 'ማመልከቻዎ በግምገማ ላይ ነው።',
adminReview: 'የአስተዳደር ግምገማ',

// Validation messages
storeNameRequired: 'የሱቅ ስም ያስፈልጋል።',
storeDescriptionRequired: 'የሱቅ መግለጫ ያስፈልጋል።',
productTypeRequired: 'ምን መሸጥ እንደሚፈልጉ ይግለጹ።',
productCategoryRequired: 'እባክዎ የምርት ምድብ ይምረጡ።',
productDescriptionRequired: 'የምርት መግለጫ ያስፈልጋል።',
productQualityRequired: 'እባክዎ የምርትዎን ጥራት ይግለጹ።',
businessNameRequired: 'የንግድ ስም ያስፈልጋል።',
businessEmailRequired: 'የንግድ ኢሜይል ያስፈልጋል።',
invalidEmail: 'እባክዎ ትክክለኛ ኢሜይል ያስገቡ።',
businessPhoneRequired: 'የንግድ ስልክ ያስፈልጋል።',
addressRequired: 'አድራሻ ያስፈልጋል።',

// Product categories
clothingFashion: 'ልብስ እና ፋሽን',
electronics: 'ኤሌክትሮኒክስ',
beautyPersonalCare: 'ውበት እና የግል እንክብካቤ',
shoesAccessories: 'ጫማ እና መለዋወጫዎች',
homeLiving: 'ቤት እና ኑሮ',
foodGrocery: 'ምግብ እና ግሮሰሪ',
jewelry: 'ጌጣጌጥ',
handmadeCrafts: 'በእጅ የተሰሩ እቃዎች',
other: 'ሌላ',

previous: 'ቀዳሚ',
viewMore: 'ተጨማሪ ይመልከቱ',
viewAll: 'ሁሉንም ይመልከቱ',
noResults: 'ምንም ውጤት አልተገኘም',
yes: 'አዎ',
no: 'አይ',
confirm: 'አረጋግጥ',
submit: 'አስገባ',
apply: 'ተግብር',
reset: 'ዳግም አስጀምር',
continue: 'ቀጥል',
requiredField: 'ይህ መስክ አስፈላጊ ነው።',
    
  },
}

// =========================================================
// LANGUAGE PROVIDER
// =========================================================

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('fegegta-language') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('fegegta-language', language)
  }, [language])

  const t = (key) => {
    return (
      translations[language]?.[key] ||
      translations.en?.[key] ||
      key
    )
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error(
      'useLanguage must be used inside LanguageProvider'
    )
  }

  return context
}

export default LanguageContext
