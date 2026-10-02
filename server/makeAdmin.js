import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

import User from './models/User.js'

dotenv.config()

const ADMIN_EMAIL = 'Fegegta@shope.com'
const ADMIN_PASSWORD = 'fegegta@shope2026!'

const makeAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not configured')
    }

    console.log('Connecting to production MongoDB...')

    await mongoose.connect(process.env.MONGO_URI)

    console.log('MongoDB connected successfully.')

    // -------------------------------------------------------
    // Check existing user
    // -------------------------------------------------------

    const existingUser = await User.findOne({
      email: ADMIN_EMAIL.toLowerCase(),
    })

    // -------------------------------------------------------
    // If user already exists
    // -------------------------------------------------------

    if (existingUser) {
      console.log(`User already exists: ${ADMIN_EMAIL}`)

      const hashedPassword = await bcrypt.hash(
        ADMIN_PASSWORD,
        12
      )

      existingUser.password = hashedPassword
      existingUser.role = 'admin'
      existingUser.status = 'active'

      await existingUser.save()

      console.log('')
      console.log('==========================================')
      console.log('       FEGEGTA ADMIN ACCOUNT READY')
      console.log('==========================================')
      console.log(`Email:  ${existingUser.email}`)
      console.log(`Role:   ${existingUser.role}`)
      console.log(`Status: ${existingUser.status}`)
      console.log('==========================================')

      await mongoose.disconnect()
      process.exit(0)
    }

    // -------------------------------------------------------
    // Create hashed password
    // -------------------------------------------------------

    const hashedPassword = await bcrypt.hash(
      ADMIN_PASSWORD,
      12
    )

    // -------------------------------------------------------
    // Create admin
    // -------------------------------------------------------

    const admin = await User.create({
      firstName: 'Fegegta',
      lastName: 'Admin',
      name: 'Fegegta Admin',
      email: ADMIN_EMAIL.toLowerCase(),
      password: hashedPassword,
      role: 'admin',
      status: 'active',
      notificationsEnabled: true,
    })

    console.log('')
    console.log('==========================================')
    console.log('       FEGEGTA ADMIN ACCOUNT CREATED')
    console.log('==========================================')
    console.log(`Email:  ${admin.email}`)
    console.log(`Role:   ${admin.role}`)
    console.log(`Status: ${admin.status}`)
    console.log('==========================================')
    console.log('Admin account created successfully.')

    await mongoose.disconnect()
    process.exit(0)

  } catch (error) {
    console.error('')
    console.error('==========================================')
    console.error('       MAKE ADMIN FAILED')
    console.error('==========================================')
    console.error(error.message)
    console.error('==========================================')

    try {
      await mongoose.disconnect()
    } catch {}

    process.exit(1)
  }
}

makeAdmin()