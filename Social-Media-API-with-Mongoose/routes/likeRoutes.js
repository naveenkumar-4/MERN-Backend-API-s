import express from 'express';
import { toggleLike, getLikes } from '../controllers/likeController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/toggle/:id', auth, toggleLike);
router.get('/:id', getLikes);

export default router;
