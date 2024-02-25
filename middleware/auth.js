import { BadRequestError, UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/token.js";

export const authenticateUser = (req, res, next) => {
  console.log('Inside authenticateUser');
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError('authentication invalid');
  }

  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === '6598c8cef5b98f4dca8b4a46';
    req.user = { userId, role, testUser }
    next();
  } catch (err) {
    throw new UnauthenticatedError('authentication invalid');
  }
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError('Demo User. Read Only!!!');
  };
  next();
};

