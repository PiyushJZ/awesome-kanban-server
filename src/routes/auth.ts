import express from 'express';

import {
  login,
  logout,
  signup,
  projectAccess,
  taskAccess,
} from '@controllers/auth';
import {
  verifyLoginData,
  verifyLogoutData,
  verifySignupData,
} from '@middlewares';
import { createSession, destroySession } from '@interceptors/auth';

const router = express.Router();

router.post('/login', verifyLoginData, login, createSession);
router.post('/logout', verifyLogoutData, logout, destroySession);
router.post('/signup', verifySignupData, signup);
router.post('/projectAccess', projectAccess);
router.post('/taskAccess', taskAccess);

export default router;
