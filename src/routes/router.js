/**
 * Main Router
 */
import express from 'express'
import { router as accountRouter } from './accountRouter.js'
import { router as snippetRouter } from './snippetRouter.js'

export const router = express.Router()

router.get('/', (req, res) => res.redirect('/snippets'))

router.use('/', accountRouter)
router.use('/snippets', snippetRouter)
