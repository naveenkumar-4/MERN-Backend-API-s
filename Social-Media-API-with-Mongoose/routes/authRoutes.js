import express from 'express';
import { signup, login, logout, logoutAll } from '../controllers/authController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', login);
router.post('/logout', auth, logout);
router.post('/logout-all-devices', auth, logoutAll);

export default router;
