import { NextFunction, Request, Response } from 'express';

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
