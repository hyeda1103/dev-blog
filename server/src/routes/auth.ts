import express from 'express'
// controllers
import {
  register,
  registerActivate,
  login,
  forgotPassword,
  resetPassword,
} from '../controllers/auth'

const router = express.Router();

router.post('/register', register)
router.post('/register/activate', registerActivate)
router.post('/login', login)
router.put('/forgot-password', forgotPassword)
router.put('/reset-password', resetPassword)

export default router