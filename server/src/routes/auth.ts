import express from 'express'
// controllers
import {
  register,
  registerActivate,
} from '../controllers/auth'

const router = express.Router();

router.post('/register', register)
router.post('/register/activate', registerActivate)

export default router