/**
 * Main Router
 */
import express from 'express'
import { router as accountRouter } from './accountRouter.js'

export const router = express.Router()

router.use('/', accountRouter)