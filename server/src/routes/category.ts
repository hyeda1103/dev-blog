import express from 'express'
// controllers
import {
  createCategory,
  listCategory,
  readCategory,
  deleteCategory,
} from '../controllers/category'
import { authMiddleware, adminMiddleware } from '../middlewares/auth';


const router = express.Router();

router.post('/category', adminMiddleware, createCategory)
router.get('/categories', listCategory)
router.post('/category/:slug', readCategory)
router.put('/category/:slug', adminMiddleware, createCategory)
router.delete('/category/:slug', adminMiddleware, deleteCategory)

export default router