import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '@models/User';

//TODO Implement the controller functions

// Allow the user to login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { JWT_SECRET } = process.env;
  try {
    const { username, email, password } = req.body;
    const foundUser = username
      ? await User.findOne({ username })
      : await User.findOne({ email });
    if (!foundUser) {
      res.status(404).json({ message: 'Account not found' });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ message: 'Password is incorrect' });
      return;
    }

    const user = {
      id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
      name: foundUser.name,
    };
    const token = jwt.sign(user, JWT_SECRET, {
      expiresIn: 600,
    });

    req.body.token = token;
    next();
  } catch (error) {
    console.log(`=================================`);
    console.log(`Could not complete login`);
    console.log(`due to error:\n${error}`);
    console.log(`=================================`);
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};

// Allow the user to Sign-up
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Hashing the password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      email,
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      userData: { email, username },
      message: 'Account creation successful',
    });
  } catch (error) {
    console.log(`=================================`);
    console.log(`Could not complete signup process`);
    console.log(`due to error:\n${error}`);
    console.log(`=================================`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Allow the user/annonymous to access project
export const projectAccess = async (
  req: Request,
  res: Response
): Promise<void> => {};

// Allow the user/anonymous to access task
export const taskAccess = async (
  req: Request,
  res: Response
): Promise<void> => {};
