/**
 * Snippet Routes
 */
import express from 'express'
import { authorizeLoggedOn, authorizeOwnership } from '../middlewares/auth.js'
import { SnippetController } from '../controllers/SnippetController.js'

export const router = express.Router()
const controller = new SnippetController()

router.get('/', (req, res, next) => controller.index(req, res, next))

router.get('/create', authorizeLoggedOn, (req, res, next) => controller.create(req, res, next))
router.post('/create', authorizeLoggedOn, (req, res, next) => controller.createPost(req, res, next))

router.get('/:id', (req, res, next) => controller.show(req, res, next))
router.get('/:id/update', authorizeLoggedOn, authorizeOwnership, (req, res, next) => controller.update(req, res, next))
router.post('/:id/update', authorizeLoggedOn, authorizeOwnership, (req, res, next) => controller.updatePost(req, res, next))

router.get('/:id/delete', authorizeLoggedOn, authorizeOwnership, (req, res, next) => controller.delete(req, res, next))
router.post('/:id/delete', authorizeLoggedOn, authorizeOwnership, (req, res, next) => controller.deletePost(req, res, next))