/**
 * Snippet Routes
 */
import express from 'express'
import { authorizeLoggedOn } from '../middlewares/auth.js'

export const router = express.Router()

router.get('/create', authorizeLoggedOn, (req, res) => res.send('Create Snippet Form'))
router.post('/create', authorizeLoggedOn, (req, res) => res.send('Snippet Created'))