import express from 'express';
import createRoom from './createRoom';

const router = express.Router();

router.post('/room/create', createRoom);

export default router;
