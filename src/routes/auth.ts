import express from 'express';
import { login, signup, projectAccess, taskAccess } from '@controllers/auth';

const router = express.Router();

router.get('/login', login);
router.get('/signup', signup);
router.get('/projectAccess', projectAccess);
router.get('/taskAccess', taskAccess);

export default router;
