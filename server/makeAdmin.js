import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

import User from './models/User.js'

dotenv.config()

const ADMIN_EMAIL = 'fegegta@shope.com'
const ADMIN_PASSWORD = 'fegegta@shope2026!'

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

    // Check whether this admin already exists
    const existingAdmin =
      await User.findOne({
        email: ADMIN_EMAIL,
      })

    if (existingAdmin) {
      console.log(
        `User already exists: ${ADMIN_EMAIL}`
      )

      // Make sure the existing user is admin
      const hashedPassword =
        await bcrypt.hash(
          ADMIN_PASSWORD,
          12
        )

      existingAdmin.password =
        hashedPassword

      existingAdmin.role =
        'admin'

      existingAdmin.status =
        'active'

      await existingAdmin.save()

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
        `Email:  ${existingAdmin.email}`
      )
      console.log(
        `Role:   ${existingAdmin.role}`
      )
      console.log(
        `Status: ${existingAdmin.status}`
      )
      console.log(
        '=========================================='
      )

      await mongoose.disconnect()
      process.exit(0)
    }

    // Create hashed password
    const hashedPassword =
      await bcrypt.hash(
        ADMIN_PASSWORD,
        12
      )

    // Create new admin user
    const admin =
      await User.create({
        firstName: 'Fegegta',
        lastName: 'Admin',
        name: 'Fegegta Admin',
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin',
        status: 'active',
        notificationsEnabled: true,
      })

    console.log('')
    console.log(
      '=========================================='
    )
    console.log(
      '       FEGEGTA ADMIN ACCOUNT CREATED'
    )
    console.log(
      '=========================================='
    )
    console.log(
      `Email:  ${admin.email}`
    )
    console.log(
      `Role:   ${admin.role}`
    )
    console.log(
      `Status: ${admin.status}`
    )
    console.log(
      '=========================================='
    )
    console.log(
      'Admin account created successfully.'
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
    console.error(error.message)
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