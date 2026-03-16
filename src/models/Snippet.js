/**
 * Snippet Mongoose Model
 * Represents a code snippet in the database.
 */

import mongoose from 'mongoose'

// Define the schema
const snippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required.'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters.']
  },
  content: {
    type: String,
    required: [true, 'Content is required.'],
    minlength: [1, 'Snippet cannot be empty.']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Snippet must have an author.']
  }
}, {
  timestamps: true,
  versionKey: false
})

export const Snippet = mongoose.model('Snippet', snippetSchema)