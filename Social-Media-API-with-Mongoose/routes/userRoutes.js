import express from 'express';
import { getUserDetails, updateUserDetails } from '../controllers/userController.js'
import auth from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.get('/get-details/:userId', auth, getUserDetails);
router.patch('/update-details', auth, upload.single('avatar'), updateUserDetails);

export default router;
