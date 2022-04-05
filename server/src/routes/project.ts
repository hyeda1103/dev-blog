import express from 'express'
// controllers
import {
  createProject,
  listProject,
  readProject,
  deleteProject,
  clickCount,
} from '../controllers/project'
import { authMiddleware, adminMiddleware } from '../middlewares/auth';


const router = express.Router();

router.post('/project', authMiddleware, createProject)
router.get('/projects', listProject)
router.put('/click-count', clickCount);
router.get('/project/:slug', readProject)
router.put('/project/:slug', authMiddleware, createProject)
router.delete('/project/:slug', authMiddleware, deleteProject)

export default router