import express from 'express'
// controllers
import { register } from '../controllers/auth'

const router = express.Router();

router.post('/register', register)

export default router