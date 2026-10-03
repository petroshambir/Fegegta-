import Banner from '../models/Banner.js'

// ============================================================
// GET ACTIVE BANNERS
// PUBLIC
// ============================================================

export const getActiveBanners = async (
  req,
  res,
  next
) => {
  try {
    const banners = await Banner.find({
      isActive: true,
    }).sort({
      order: 1,
      createdAt: -1,
    })

    return res.status(200).json({
      success: true,
      banners,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// GET ALL BANNERS
// ADMIN
// ============================================================

export const getAllBanners = async (
  req,
  res,
  next
) => {
  try {
    const banners = await Banner.find()
      .sort({
        order: 1,
        createdAt: -1,
      })

    return res.status(200).json({
      success: true,
      banners,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// CREATE BANNER
// ADMIN
// ============================================================

export const createBanner = async (
  req,
  res,
  next
) => {
  try {
    const {
      title,
      subtitle,
      description,
      buttonText,
      buttonLink,
      type,
      isActive,
      order,
    } = req.body

    let image = ''

    if (req.file) {
      image =
        req.file.path ||
        req.file.secure_url ||
        req.file.url ||
        ''
    }

    const banner = await Banner.create({
      title:
        typeof title === 'string'
          ? title.trim()
          : '',

      subtitle:
        typeof subtitle === 'string'
          ? subtitle.trim()
          : '',

      description:
        typeof description === 'string'
          ? description.trim()
          : '',

      buttonText:
        typeof buttonText === 'string'
          ? buttonText.trim()
          : '',

      buttonLink:
        typeof buttonLink === 'string'
          ? buttonLink.trim()
          : '',

      image,

      type:
        [
          'image-text',
          'image-only',
          'text-only',
        ].includes(type)
          ? type
          : 'image-text',

      isActive:
        isActive === undefined
          ? true
          : String(isActive) === 'true',

      order:
        Number.isFinite(Number(order))
          ? Number(order)
          : 0,
    })

    return res.status(201).json({
      success: true,
      message:
        'Banner created successfully.',
      banner,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// UPDATE BANNER
// ADMIN
// ============================================================

export const updateBanner = async (
  req,
  res,
  next
) => {
  try {
    const banner =
      await Banner.findById(
        req.params.id
      )

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found.',
      })
    }

    const {
      title,
      subtitle,
      description,
      buttonText,
      buttonLink,
      type,
      isActive,
      order,
    } = req.body

    if (title !== undefined) {
      banner.title =
        String(title).trim()
    }

    if (subtitle !== undefined) {
      banner.subtitle =
        String(subtitle).trim()
    }

    if (description !== undefined) {
      banner.description =
        String(description).trim()
    }

    if (buttonText !== undefined) {
      banner.buttonText =
        String(buttonText).trim()
    }

    if (buttonLink !== undefined) {
      banner.buttonLink =
        String(buttonLink).trim()
    }

    if (
      type !== undefined &&
      [
        'image-text',
        'image-only',
        'text-only',
      ].includes(type)
    ) {
      banner.type = type
    }

    if (isActive !== undefined) {
      banner.isActive =
        String(isActive) === 'true'
    }

    if (order !== undefined) {
      const numericOrder =
        Number(order)

      if (
        Number.isFinite(
          numericOrder
        )
      ) {
        banner.order =
          numericOrder
      }
    }

    if (req.file) {
      banner.image =
        req.file.path ||
        req.file.secure_url ||
        req.file.url ||
        banner.image
    }

    await banner.save()

    return res.status(200).json({
      success: true,
      message:
        'Banner updated successfully.',
      banner,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// DELETE BANNER
// ADMIN
// ============================================================

export const deleteBanner = async (
  req,
  res,
  next
) => {
  try {
    const banner =
      await Banner.findByIdAndDelete(
        req.params.id
      )

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found.',
      })
    }

    return res.status(200).json({
      success: true,
      message:
        'Banner deleted successfully.',
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// TOGGLE ACTIVE STATUS
// ADMIN
// ============================================================

export const toggleBanner = async (
  req,
  res,
  next
) => {
  try {
    const banner =
      await Banner.findById(
        req.params.id
      )

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found.',
      })
    }

    banner.isActive =
      !banner.isActive

    await banner.save()

    return res.status(200).json({
      success: true,
      message:
        banner.isActive
          ? 'Banner activated.'
          : 'Banner deactivated.',
      banner,
    })
  } catch (error) {
    next(error)
  }
}