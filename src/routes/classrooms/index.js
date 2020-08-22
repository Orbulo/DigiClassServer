import express from 'express';
import getUserClassrooms from './getUserClassrooms';
import getClassroom from './getClassroom';
import getClassroomChat from './getClassroomChat';
import postClassroomChat from './postClassroomChat';
import createClassroom from './createClassroom';
import joinClassroom from './joinClassroom';
import getClassroomUser from './getClassroomUser';
import getClassroomAnswers from './getClassroomAnswers';
import checkClassroom from '~/routes/classrooms/checkClassroom';
import postClassroomQuestion from '~/routes/classrooms/postClassroomQuestion';
import postClassroomAnswer from '~/routes/classrooms/postClassroomAnswer';
import upvoteClassroomAnswer from '~/routes/classrooms/upvoteClassroomAnswer';
import upvoteClassroomQuestion from '~/routes/classrooms/upvoteClassroomQuestion';
import uploadFile from './uploadFile';
import upload from 'multer';
import getClassroomQuestions from '~/routes/classrooms/getClassroomQuestions';
const router = express.Router();

router.get('/', getUserClassrooms);
router.post('/', createClassroom);
router.post('/join', joinClassroom);
router.use('/:classroomId', checkClassroom);
router.post('/:classroomId/upload', upload.array('files', 5), uploadFile);
router.get('/:classroomId', getClassroom);
router.get('/:classroomId/chat', getClassroomChat);
router.post('/:classroomId/chat', postClassroomChat);
router.get('/:classroomId/user/:userId', getClassroomUser);
router.get('/:classroomId/question', getClassroomQuestions);
router.post('/:classroomId/question', postClassroomQuestion);
router.post('/:classroomId/question/:questionId/answer', postClassroomAnswer);
router.get('/:classroomId/question/:questionId/answer', getClassroomAnswers);
router.post('/:classroomId/question/:questionId/upvote', upvoteClassroomQuestion);
router.post('/:classroomId/question/:questionId/answer/:answerId/upvote', upvoteClassroomAnswer);

export default router;

