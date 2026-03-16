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
    required: [true, 'Username is required.'],
    unique: true,
    trim: true,
    minlength: [3, 'The username must be at least 3 characters.'],
    maxlength: [256, 'The username must be at most 256 characters.']
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [10, 'The password must be at least 10 characters.'],
    maxlength: [256, 'The password must be at most 256 characters.']
  }
}, {
  timestamps: true,
  versionKey: false
})

/**
 * Pre-save hook to hash the password before persistence.
 */
userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})

/**
 * Static method to authenticate a user.
 * Compares a candidate password with the stored hash.
 * @param username
 * @param password
 */
userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid login attempt.')
  }

  return user
}

export const User = mongoose.model('User', userSchema)
