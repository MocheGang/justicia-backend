// routes/userRoutes.js
import express from 'express';
import { createUser, loginUser, logoutUser, getUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/:id', getUser);

export default router;
