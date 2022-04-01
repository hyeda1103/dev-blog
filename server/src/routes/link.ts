import express from 'express'
// controllers
import {
  createLink,
  listLink,
  readLink,
  deleteLink,
} from '../controllers/link'
import { authMiddleware, adminMiddleware } from '../middlewares/auth';


const router = express.Router();

router.post('/link', authMiddleware, createLink)
router.get('/links', listLink)
router.get('/link/:slug', readLink)
router.put('/link/:slug', authMiddleware, createLink)
router.delete('/link/:slug', authMiddleware, deleteLink)

export default router