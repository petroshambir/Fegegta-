import Address from '../models/Address.js'

// ============================================================
// GET ALL ADDRESSES FOR CURRENT USER
// GET /api/addresses
// ============================================================

export const getAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    })

    return res.status(200).json({
      success: true,
      addresses,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// GET SINGLE ADDRESS
// GET /api/addresses/:id
// ============================================================

export const getAddressById = async (req, res, next) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user._id,
    })

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found.',
      })
    }

    return res.status(200).json({
      success: true,
      address,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// CREATE ADDRESS
// POST /api/addresses
// ============================================================

export const createAddress = async (req, res, next) => {
  try {
    const {
      fullName,
      phone,
      address,
      city,
      postalCode,
      country,
    } = req.body

    if (
      !fullName ||
      !phone ||
      !address ||
      !city ||
      !country
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Full name, phone, address, city, and country are required.',
      })
    }

    const newAddress = await Address.create({
      user: req.user._id,
      fullName: fullName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      postalCode: postalCode?.trim() || '',
      country: country.trim(),
    })

    return res.status(201).json({
      success: true,
      message: 'Address added successfully.',
      address: newAddress,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// UPDATE ADDRESS
// PUT /api/addresses/:id
// ============================================================

export const updateAddress = async (req, res, next) => {
  try {
    const {
      fullName,
      phone,
      address,
      city,
      postalCode,
      country,
    } = req.body

    if (
      !fullName ||
      !phone ||
      !address ||
      !city ||
      !country
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Full name, phone, address, city, and country are required.',
      })
    }

    const existingAddress = await Address.findOne({
      _id: req.params.id,
      user: req.user._id,
    })

    if (!existingAddress) {
      return res.status(404).json({
        success: false,
        message: 'Address not found.',
      })
    }

    existingAddress.fullName = fullName.trim()
    existingAddress.phone = phone.trim()
    existingAddress.address = address.trim()
    existingAddress.city = city.trim()
    existingAddress.postalCode =
      postalCode?.trim() || ''
    existingAddress.country = country.trim()

    const updatedAddress =
      await existingAddress.save()

    return res.status(200).json({
      success: true,
      message: 'Address updated successfully.',
      address: updatedAddress,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// DELETE ADDRESS
// DELETE /api/addresses/:id
// ============================================================

export const deleteAddress = async (req, res, next) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user._id,
    })

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found.',
      })
    }

    await Address.deleteOne({
      _id: address._id,
    })

    return res.status(200).json({
      success: true,
      message: 'Address deleted successfully.',
      addressId: address._id,
    })
  } catch (error) {
    next(error)
  }
}