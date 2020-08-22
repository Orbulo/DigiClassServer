import express from 'express';
import createRoom from './createRoom';
import getRoom from './getRoom';

const router = express.Router();

router.post('/create', createRoom);
router.get('/:roomId', getRoom);

export default router;
