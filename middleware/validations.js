import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/job.js';
import User from '../models/user.js';

const withValidationErrors = (validateValues) => {
  return [validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        if (errorMessages[0].startsWith('job')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError('not authorized to access this route');
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    }
  ]
}

export const validateTest = withValidationErrors([
  body('name')
    .notEmpty()
    .withMessage('Name is Required')
    .isLength({ min: 5 })
    .withMessage('Length min 5')
]);

export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('company is required'),
  body('position').notEmpty().withMessage('position is required'),
  body('jobLocation').notEmpty().withMessage('Job Location is required'),
  body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('Invalid Job status'),
  body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('Invalid Job Type')
])

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) {
      throw new BadRequestError('Invalid Id');
    }
    const job = await Job.findById(value);
    if (!job) {
      throw new NotFoundError(`job ${value} not found`);
    }
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === job.createdBy.toString();

    if (!isAdmin || !isOwner) {
      throw new UnauthorizedError('not authorized to access this route');
    }
  })
])

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email').notEmpty().withMessage('email is required')
    .isEmail().withMessage('invalid Email format')
    .custom(async (email) => {
      const user = await User.findOne({ email })
      if (user) {
        throw new BadRequestError('Email already exists');
      }
    }),
  body('password').notEmpty().withMessage('password is required')
    .isLength({ min: 5 }).withMessage('password must be atleast 5 characters'),
  body('lastName').notEmpty().withMessage('lastname is required')
]);

export const validateLogin = withValidationErrors([
  body('email').notEmpty().withMessage('email is required')
    .isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('password is required')
]);

export const validateUpdateUserInput = withValidationErrors([
  body('password').isEmpty().withMessage('password cannot be updated here'),
  body('email').custom((async (email, { req }) => {
    if (Object.keys(req.body).length === 0) {
      throw new BadRequestError('No details changed');
    }
    const user = await User.findOne({ email });
    if (user && user._id.toString() !== req.user.userId) {
      throw new BadRequestError('email already exists');
    }
  }))
]);
