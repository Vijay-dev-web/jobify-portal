import { Router } from 'express';
import { getAllJobs, createJob, editJob, getJob, deleteJob, jobStats } from '../controller/jobController.js';
import { validateJobInput, validateIdParam } from '../middleware/validations.js';
import { checkForTestUser } from '../middleware/auth.js';

const router = Router();

// router.get('/', getAllJobs);
// router.post('/', createJob);
// router.get('/:id', getJob);
// router.patch('/:id', editJob);
// router.delete('/:id', deleteJob);

router
  .route('/')
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router
  .route('/stats')
  .get(jobStats);

router
  .route('/:id')
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateIdParam, editJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;

