import express from 'express';
import getUserClassrooms from './getUserClassrooms';
import getClassroom from './getClassroom';
const router = express.Router();

router.get('/', getUserClassrooms);
router.get('/:classroomId', getClassroom);

export default router;

