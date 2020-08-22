import express from 'express';
import getUserClassrooms from './getUserClassrooms';
import getClassroom from './getClassroom';
import getClassroomChat from './getClassroomChat';
import postClassroomChat from './postClassroomChat';
import createClassroom from './createClassroom';
import joinClassroom from './joinClassroom';
const router = express.Router();

router.get('/', getUserClassrooms);
router.post('/', createClassroom);
router.post('/join', joinClassroom);
router.get('/:classroomId', getClassroom);
router.get('/:classroomId/chat', getClassroomChat);
router.post('/:classroomId/chat', postClassroomChat);

export default router;

