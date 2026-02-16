/**
 * User Mongoose Model
 * Handles identity persistence.
 */

import mongoose from 'mongoose'

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

export const User = mongoose.model('User', userSchema)