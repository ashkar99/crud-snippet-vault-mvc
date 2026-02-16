/**
 * Account Routes
 */
import express from 'express'
import { AccountController } from '../controllers/AccountController.js'

export const router = express.Router()

const controller = new AccountController()

// Map the GET request to the controller
router.get('/register', (req, res, next) => controller.register(req, res, next))
router.get('/register', (req, res, next) => controller.register(req, res, next))
router.post('/register', (req, res, next) => controller.registerPost(req, res, next))