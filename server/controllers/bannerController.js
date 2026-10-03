import Banner from '../models/Banner.js'

// ============================================================
// GET ACTIVE BANNER
// PUBLIC
// ============================================================

export const getActiveBanners = async (
  req,
  res,
  next
) => {
  try {
    const banner = await Banner.findOne({
      isActive: true,
    }).sort({
      order: 1,
      createdAt: -1,
    })

    return res.status(200).json({
      success: true,
      banner: banner || null,
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

    const shouldBeActive =
      isActive === undefined
        ? true
        : String(isActive) === 'true'

    // ----------------------------------------------------------
    // GET IMAGE
    // ----------------------------------------------------------

    let image = ''

    if (req.file) {
      image =
        req.file.path ||
        req.file.secure_url ||
        req.file.url ||
        ''
    }

    // ----------------------------------------------------------
    // ONLY ONE ACTIVE BANNER
    // ----------------------------------------------------------

    if (shouldBeActive) {
      await Banner.updateMany(
        {
          isActive: true,
        },
        {
          $set: {
            isActive: false,
          },
        }
      )
    }

    // ----------------------------------------------------------
    // CREATE BANNER
    // ----------------------------------------------------------

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

      isActive: shouldBeActive,

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

    // ----------------------------------------------------------
    // UPDATE TEXT FIELDS
    // ----------------------------------------------------------

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

    // ----------------------------------------------------------
    // UPDATE TYPE
    // ----------------------------------------------------------

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

    // ----------------------------------------------------------
    // UPDATE ACTIVE STATUS
    // ----------------------------------------------------------

    if (isActive !== undefined) {
      const nextIsActive =
        String(isActive) === 'true'

      // If this banner is being activated,
      // deactivate all other banners.
      if (nextIsActive) {
        await Banner.updateMany(
          {
            _id: {
              $ne: banner._id,
            },
            isActive: true,
          },
          {
            $set: {
              isActive: false,
            },
          }
        )
      }

      banner.isActive =
        nextIsActive
    }

    // ----------------------------------------------------------
    // UPDATE ORDER
    // ----------------------------------------------------------

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

    // ----------------------------------------------------------
    // UPDATE IMAGE
    // ----------------------------------------------------------

    if (req.file) {
      banner.image =
        req.file.path ||
        req.file.secure_url ||
        req.file.url ||
        banner.image
    }

    // ----------------------------------------------------------
    // SAVE
    // ----------------------------------------------------------

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
      await Banner.findById(
        req.params.id
      )

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found.',
      })
    }

    // ----------------------------------------------------------
    // DELETE FROM DATABASE
    // ----------------------------------------------------------

    await Banner.findByIdAndDelete(
      req.params.id
    )

    return res.status(200).json({
      success: true,
      message:
        'Banner deleted successfully.',
      bannerId: req.params.id,
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

    // ----------------------------------------------------------
    // ACTIVATE
    // ----------------------------------------------------------

    if (!banner.isActive) {
      // Deactivate all other active banners
      await Banner.updateMany(
        {
          _id: {
            $ne: banner._id,
          },
          isActive: true,
        },
        {
          $set: {
            isActive: false,
          },
        }
      )

      banner.isActive = true
    }

    // ----------------------------------------------------------
    // DEACTIVATE
    // ----------------------------------------------------------

    else {
      banner.isActive = false
    }

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