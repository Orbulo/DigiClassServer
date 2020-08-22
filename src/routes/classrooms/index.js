import express from 'express';
import getUserClassrooms from 'routes/classrooms/getUserClassrooms';
import getClassroom from './getClassroom';
import getClassroomChat from 'routes/classrooms/getClassroomChat';
import postClassroomChat from 'routes/classrooms/postClassroomChat';
const router = express.Router();

router.get('/', getUserClassrooms);
router.get('/:classroomId', getClassroom);
router.get('/:classroomId/chat', getClassroomChat);
router.post('/:classroomId/chat', postClassroomChat);

export default router;

