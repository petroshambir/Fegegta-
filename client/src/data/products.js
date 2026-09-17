const products = [
  {
    id: 'product-1',
    name: 'Premium Classic Watch',
    description:
      'A refined everyday watch with a clean design, quality finishing and a timeless look.',
    price: 89.99,
    seller: 'Fegegta Store',
    sellerRating: 4.8,
    rating: 4.8,
    reviewCount: 124,
    available: true,
    stock: 12,
    category: 'Accessories',

    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',

    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1400&q=90',
    ],
  },

  {
    id: 'product-2',
    name: 'Premium Leather Sneakers',
    description:
      'Modern sneakers designed for everyday comfort with a clean premium finish.',
    price: 119.99,
    seller: 'Urban Collection',
    sellerRating: 4.7,
    rating: 4.7,
    reviewCount: 86,
    available: true,
    stock: 8,
    category: 'Shoes',

    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',

    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1400&q=90',
    ],
  },

  {
    id: 'product-3',
    name: 'Premium Cotton Shirt',
    description:
      'A comfortable premium cotton shirt with a versatile design for everyday wear.',
    price: 54.99,
    seller: 'Modern Wear',
    sellerRating: 4.9,
    rating: 4.9,
    reviewCount: 213,
    available: true,
    stock: 24,
    category: 'Fashion',

    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85',

    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1400&q=90',
    ],
  },

  {
    id: 'product-4',
    name: 'Minimal Travel Backpack',
    description:
      'A practical modern backpack with a clean appearance and enough space for daily essentials.',
    price: 74.99,
    seller: 'Travel House',
    sellerRating: 4.6,
    rating: 4.6,
    reviewCount: 67,
    available: true,
    stock: 15,
    category: 'Bags',

    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85',

    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1400&q=90',
    ],
  },

  {
    id: 'product-5',
    name: 'Elegant Sunglasses',
    description:
      'A modern pair of sunglasses combining a sophisticated frame with a comfortable fit.',
    price: 39.99,
    seller: 'Style Market',
    sellerRating: 4.5,
    rating: 4.5,
    reviewCount: 91,
    available: true,
    stock: 30,
    category: 'Accessories',

    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85',

    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1400&q=90',
    ],
  },

  {
    id: 'product-6',
    name: 'Modern Leather Bag',
    description:
      'A refined leather bag designed for daily use with a premium and practical finish.',
    price: 129.99,
    seller: 'Classic Leather',
    sellerRating: 4.8,
    rating: 4.8,
    reviewCount: 142,
    available: true,
    stock: 10,
    category: 'Bags',

    image:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85',

    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1400&q=90',
    ],
  },
]

export default products