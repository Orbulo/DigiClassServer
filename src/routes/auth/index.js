import login from './login';
import register from './register';

import express from 'express';
const router = express.Router();

router.post('/login', login);
router.post('/register', register);

export default router;
