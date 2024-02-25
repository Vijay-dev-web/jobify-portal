import { StatusCodes } from 'http-status-codes';
import User from '../models/user.js';
import { hashedPassword, isValidPassword } from '../utils/password.js';
import { UnauthenticatedError, UnauthorizedError } from '../errors/customErrors.js';
import { createJWT } from '../utils/token.js';

export const register = async (req, res) => {
  const isFirstAccount = await User.countDocuments() === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';
  req.body.password = await hashedPassword(req.body.password);
  const user = await User.create(req.body);
  res.status(StatusCodes.OK).json({
    message: 'User created'
  })
}

export const login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email
  });

  const isValidUser = user && await isValidPassword(req.body.password, user.password);
  if (!isValidUser) {
    throw new UnauthenticatedError('invalid credentials');
  }
  const token = createJWT({ userId: user._id, role: user.role })
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expiresIn: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production'
  })
  res.status(StatusCodes.OK).json({
    message: 'Logged In successfully'
  });
};

export const logout = (req, res) => {
  res.cookie('token', 'logout, can be anything', {
    httpOnly: true,
    expires: new Date(Date.now())
  })
  res.status(StatusCodes.OK).json({
    message: 'logged out successfully!'
  })
}

export const auhtorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('cannot access this page')
    }
    next();
  }
};
