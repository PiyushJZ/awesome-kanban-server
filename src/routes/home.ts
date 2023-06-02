import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  try {
    console.log('MY LOG', req.app.get('/auth'));
    res.status(200).json({ message: 'Welcome to the Home Page' });
  } catch (error) {
    res.status(401).redirect('/unauthorized');
  }
});

export default router;
