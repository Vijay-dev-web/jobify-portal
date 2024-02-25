import { Router } from 'express';
import { getCurrentUser, getApplicationStats, updateUser } from '../controller/userController.js';
import { validateUpdateUserInput } from '../middleware/validations.js';
import { auhtorizePermissions } from '../controller/authController.js';
import multerUpload from '../middleware/multer.js';
import { checkForTestUser } from '../middleware/auth.js';

const router = Router();

router.get('/current-user', getCurrentUser)
router.get('/admin/app-stats', checkForTestUser, auhtorizePermissions('admin'), getApplicationStats)
router.patch('/update-user', checkForTestUser, multerUpload.single('avatar'), validateUpdateUserInput, updateUser);

export default router;
