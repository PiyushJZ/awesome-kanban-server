import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  console.log(req.session);

  if (req.session.token) {
    console.log('fsdafdsfadsf');

    res.status(200).json({ message: 'You are already logged in' });
    return;
  }
  res.status(200).json({ message: 'Welcome to the Home Page' });
});

export default router;
