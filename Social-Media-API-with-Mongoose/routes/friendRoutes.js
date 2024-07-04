import express from 'express';
import { sendRequest, respondRequest, getFriends, getPendingRequests } from "../controllers/friendController.js";
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/toggle-friendship/:friendId', auth, sendRequest);
router.post('/response-to-request/:friendId', auth, respondRequest);
router.get('/get-friends', auth, getFriends);
router.get('/get-pending-requests', auth, getPendingRequests);

export default router;
