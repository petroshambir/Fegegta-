
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'

 export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  )
}

// ============================================================
// REGISTER
// ============================================================

export const registerUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      name,
      email,
      phone,
      password,
      role,
    } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const existingUser = await User.findOne({
      email: normalizedEmail,
    })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      firstName,
      lastName,
      name:
        name ||
        `${firstName || ''} ${lastName || ''}`.trim(),
      email: normalizedEmail,
      phone,
      password: hashedPassword,
      role: role === 'seller' ? 'customer' : role || 'customer',
    })

    const token = generateToken(user)

    return res.status(201).json({
      success: true,
      message: 'Registration successful.',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// LOGIN
// ============================================================

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const user = await User.findOne({
      email: normalizedEmail,
    }).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    const token = generateToken(user)

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// CURRENT USER
// ============================================================

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      })
    }

    return res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    next(error)
  }
}

