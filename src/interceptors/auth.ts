import { Request, Response } from 'express';

export const createSession = (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    req.session.regenerate(err => {
      if (err) {
        res.status(500).json({ message: 'Problem creating session' });
        return;
      }
      console.log(req.session);
      req.session.token = token;
      console.log(req.session);

      req.session.save(err => {
        if (err) {
          res.status(500).json({ message: 'Problem creating session' });
        }
        res
          .status(200)
          .json({ message: 'Sessions created, Login successful!!', token });
      });
    });
  } catch (error) {
    console.log(`=================================`);
    console.log(`Could not create session`);
    console.log(`due to error:\n${error}`);
    console.log(`=================================`);
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }
};

export const destroySession = () => {};
