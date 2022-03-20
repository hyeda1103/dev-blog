import express from 'express'
// controllers
import { profile } from '../controllers/user'
import { authMiddleware, adminMiddleware } from '../middlewares/auth';

const router = express.Router();

router.get('/user', authMiddleware, profile)
router.get('/admin', adminMiddleware, profile)

export default router