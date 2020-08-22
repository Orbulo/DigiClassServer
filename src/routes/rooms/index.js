import express from 'express';
import createRoom from './createRoom';
import getRoom from './getRoom';

const router = express.Router();

router.post('/room/create', createRoom);
router.get('/room/:id', getRoom);

export default router;
