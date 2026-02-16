/**
 * User Mongoose Model
 * Handles identity persistence and cryptography.
 */

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// Define the schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

/**
 * Pre-save hook to hash the password before persistence.
 */
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next()
  }

  try {
    // Generate a salt and hash the password
    this.password = await bcrypt.hash(this.password, 10)
    next()
  } catch (error) {
    next(error)
  }
})

export const User = mongoose.model('User', userSchema)