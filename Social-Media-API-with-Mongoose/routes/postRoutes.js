import express from 'express';
import { createPost, getPosts, getUserPosts, updatePost, deletePost } from '../controllers/postController.js';
import auth from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/', auth, upload.single('imageUrl'), createPost);
router.get('/', getPosts);
router.get('/user', auth, getUserPosts);
router.patch('/:postId', auth, updatePost);
router.delete('/:postId', auth, deletePost);

export default router;
