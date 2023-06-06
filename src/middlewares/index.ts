import { NextFunction, Request, Response } from 'express';

import { validateEmail, validatePassword } from '@utils/validation';
import { passwordRegex } from '@regex';
import User from '@models/User';

// TODO Implement the middleware functions
export const verifyJwtToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};

export const verifyProjectAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};

export const verifyTaskAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};

export const verifyCookie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};

export const verifyLoginData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Empty fields not allowed' });
      return;
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      res.status(400).json({ message: 'Only string values allowed' });
      return;
    }

    if (validateEmail(username)) {
      req.body.email = username;
      delete req.body.username;
    }
    next();
  } catch (error) {
    console.log(`=================================`);
    console.log(`Login failed`);
    console.log(`due to error:\n${error}`);
    console.log(`=================================`);
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }
};

export const verifyLogoutData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};

export const verifySignupData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: 'Empty fields not allowed' });
      return;
    }

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof username !== 'string'
    ) {
      res.status(400).json({ message: 'Only string values allowed' });
      return;
    }

    if (!validateEmail(email)) {
      res.status(400).json({ msg: 'Invalid Email' });
      return;
    }

    if (username.length < 3) {
      res
        .status(400)
        .json({ msg: 'Username of less than 3 characters not allowed' });
      return;
    }

    if (username.length > 25) {
      res
        .status(400)
        .json({ msg: 'Username of more than 25 characters not allowed' });
      return;
    }

    if (password.length < 8) {
      res
        .status(400)
        .json({ message: 'Password should have atleast 8 characters' });
      return;
    }

    if (!validatePassword(password)) {
      res
        .status(400)
        .json({ message: 'Password does not match safety criteria' });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Email already registered' });
      return;
    }

    next();
  } catch (error) {
    console.log(`=================================`);
    console.log(`Could not complete signup process`);
    console.log(`due to error:\n${error}`);
    console.log(`=================================`);
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }
};
