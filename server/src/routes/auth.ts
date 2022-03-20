import express from 'express'
// controllers
import {
  register,
  registerActivate,
  login,
} from '../controllers/auth'

const router = express.Router();

router.post('/register', register)
router.post('/register/activate', registerActivate)
router.post('/login', login)

export default router