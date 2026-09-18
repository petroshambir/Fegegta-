import Favorite from '../models/Favorite.js'
import Product from '../models/Product.js'

// ============================================================
// GET CURRENT USER FAVORITES
// ============================================================

export const getFavorites = async (
  req,
  res,
  next
) => {
  try {
    const favorites = await Favorite.find({
      user: req.user._id,
    })
      .populate({
        path: 'product',
        populate: [
          {
            path: 'seller',
            select:
              'businessName phone email logo status',
          },
          {
            path: 'store',
            select:
              'name slug logo coverImage status',
          },
        ],
      })
      .sort({
        createdAt: -1,
      })

    const products = favorites
      .filter((favorite) => favorite.product)
      .map((favorite) => ({
        favoriteId: favorite._id,
        addedAt: favorite.createdAt,
        product: favorite.product,
      }))

    return res.status(200).json({
      success: true,
      favorites: products,
    })
  } catch (error) {
    next(error)
  }
}


// ============================================================
// CHECK IF PRODUCT IS FAVORITE
// ============================================================

export const checkFavorite = async (
  req,
  res,
  next
) => {
  try {
    const { productId } = req.params

    const favorite = await Favorite.findOne({
      user: req.user._id,
      product: productId,
    })

    return res.status(200).json({
      success: true,
      isFavorite: Boolean(favorite),
      favoriteId: favorite?._id || null,
    })
  } catch (error) {
    next(error)
  }
}


// ============================================================
// ADD PRODUCT TO FAVORITES
// ============================================================

export const addFavorite = async (
  req,
  res,
  next
) => {
  try {
    const { productId } = req.params

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required.',
      })
    }

    const product = await Product.findById(
      productId
    )

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      })
    }

    const existingFavorite =
      await Favorite.findOne({
        user: req.user._id,
        product: productId,
      })

    if (existingFavorite) {
      return res.status(200).json({
        success: true,
        message:
          'Product is already in your favorites.',
        favorite: existingFavorite,
        isFavorite: true,
      })
    }

    const favorite =
      await Favorite.create({
        user: req.user._id,
        product: productId,
      })

    return res.status(201).json({
      success: true,
      message:
        'Product added to favorites.',
      favorite,
      isFavorite: true,
    })
  } catch (error) {
    next(error)
  }
}


// ============================================================
// REMOVE PRODUCT FROM FAVORITES
// ============================================================

export const removeFavorite = async (
  req,
  res,
  next
) => {
  try {
    const { productId } = req.params

    const favorite =
      await Favorite.findOne({
        user: req.user._id,
        product: productId,
      })

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message:
          'Product is not in your favorites.',
      })
    }

    await Favorite.deleteOne({
      _id: favorite._id,
    })

    return res.status(200).json({
      success: true,
      message:
        'Product removed from favorites.',
      productId,
      isFavorite: false,
    })
  } catch (error) {
    next(error)
  }
}


// ============================================================
// TOGGLE FAVORITE
// ============================================================

export const toggleFavorite = async (
  req,
  res,
  next
) => {
  try {
    const { productId } = req.params

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required.',
      })
    }

    const product = await Product.findById(
      productId
    )

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      })
    }

    const existingFavorite =
      await Favorite.findOne({
        user: req.user._id,
        product: productId,
      })

    if (existingFavorite) {
      await Favorite.deleteOne({
        _id: existingFavorite._id,
      })

      return res.status(200).json({
        success: true,
        message:
          'Product removed from favorites.',
        isFavorite: false,
        productId,
      })
    }

    const favorite =
      await Favorite.create({
        user: req.user._id,
        product: productId,
      })

    return res.status(201).json({
      success: true,
      message:
        'Product added to favorites.',
      isFavorite: true,
      productId,
      favorite,
    })
  } catch (error) {
    next(error)
  }
}


// ============================================================
// REMOVE ALL FAVORITES
// ============================================================

export const clearFavorites = async (
  req,
  res,
  next
) => {
  try {
    await Favorite.deleteMany({
      user: req.user._id,
    })

    return res.status(200).json({
      success: true,
      message:
        'All favorites have been removed.',
    })
  } catch (error) {
    next(error)
  }
}