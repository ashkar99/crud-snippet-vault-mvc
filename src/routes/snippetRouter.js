/**
 * Snippet Routes
 */
import express from 'express'
import { authorizeLoggedOn } from '../middlewares/auth.js'
import { SnippetController } from '../controllers/SnippetController.js'

export const router = express.Router()
const controller = new SnippetController()

router.get('/', (req, res, next) => controller.index(req, res, next))

router.get('/create', authorizeLoggedOn, (req, res) => res.send('Create Snippet Form'))
router.post('/create', authorizeLoggedOn, (req, res) => res.send('Snippet Created'))

router.get('/:id', (req, res, next) => controller.show(req, res, next))