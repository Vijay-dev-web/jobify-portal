import express from 'express';
const router = express.Router();
import { login, logout, register } from '../controller/authController.js';
import { validateRegisterInput, validateLogin } from '../middleware/validations.js';
import { authenticateUser } from '../middleware/auth.js';

router.post('/login', validateLogin, login);
router.post('/register', validateRegisterInput, register);
router.get('/logout', authenticateUser, logout);

export default router;