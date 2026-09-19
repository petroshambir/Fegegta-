import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

import User from './models/User.js'

dotenv.config()

const ADMIN_EMAIL ='fegegta@shope.com'
const ADMIN_PASSWORD ='fegegta@shope2026!'

const makeAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error(
        'MONGO_URI is not configured in .env'
      )
    }

    await mongoose.connect(
      process.env.MONGO_URI
    )

    console.log(
      'MongoDB connected successfully.'
    )

    const user =
      await User.findOne({
        email: ADMIN_EMAIL,
      }).select('+password')

    if (!user) {
      console.error(
        `User not found: ${ADMIN_EMAIL}`
      )

      await mongoose.disconnect()
      process.exit(1)
    }

    const hashedPassword =
      await bcrypt.hash(
        ADMIN_PASSWORD,
        12
      )

    user.password =
      hashedPassword

    user.role =
      'admin'

    user.status =
      'active'

    await user.save()

    console.log('')
    console.log(
      '=========================================='
    )
    console.log(
      '       FEGEGTA ADMIN ACCOUNT READY'
    )
    console.log(
      '=========================================='
    )
    console.log(
      `Email:    ${user.email}`
    )
    console.log(
      `Role:     ${user.role}`
    )
    console.log(
      `Status:   ${user.status}`
    )
    console.log(
      '=========================================='
    )
    console.log(
      'Admin account updated successfully.'
    )

    await mongoose.disconnect()

    process.exit(0)
  } catch (error) {
    console.error('')
    console.error(
      '=========================================='
    )
    console.error(
      '       MAKE ADMIN FAILED'
    )
    console.error(
      '=========================================='
    )
    console.error(
      error.message
    )
    console.error(
      '=========================================='
    )

    try {
      await mongoose.disconnect()
    } catch {
      // Ignore disconnect errors
    }

    process.exit(1)
  }
}

makeAdmin()
//save email and password