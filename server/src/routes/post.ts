import express from 'express'
// controllers
import {
  createPost,
  listPost,
  readPost,
  deletePost,
  clickCount,
  uploadImageFile,
} from '../controllers/post'
import { authMiddleware, adminMiddleware } from '../middlewares/auth';


const router = express.Router();

router.post('/post/upload-image', uploadImageFile)
router.post('/post', authMiddleware, createPost)
router.get('/posts', listPost)
router.put('/click-count', clickCount);
router.get('/post/:id', readPost)
router.put('/post/:slug', authMiddleware, createPost)
router.delete('/post/:slug', authMiddleware, deletePost)

export default router