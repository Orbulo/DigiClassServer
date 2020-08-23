import express from 'express';
import getUserClassrooms from './getUserClassrooms';
import getClassroom from './getClassroom';
import getClassroomChat from './getClassroomChat';
import postClassroomChat from './postClassroomChat';
import createClassroom from './createClassroom';
import joinClassroom from './joinClassroom';
import getClassroomUser from './getClassroomUser';
import getClassroomAnswers from './getClassroomAnswers';
import checkClassroom from './checkClassroom';
import postClassroomQuestion from './postClassroomQuestion';
import postClassroomAnswer from './postClassroomAnswer';
import upvoteClassroomAnswer from './upvoteClassroomAnswer';
import upvoteClassroomQuestion from './upvoteClassroomQuestion';
import uploadAssignment from './uploadAssignment';
import uploadQuestionFile from './uploadQuestionFile';
import multer from 'multer';
import getClassroomQuestions from './getClassroomQuestions';
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/', getUserClassrooms);
router.post('/', createClassroom);
router.post('/join', joinClassroom);
router.use('/:classroomId', checkClassroom);
router.post('/:classroomId/upload', upload.array('files', 5), uploadAssignment);
router.get('/:classroomId', getClassroom);
router.get('/:classroomId/chat', getClassroomChat);
router.post('/:classroomId/chat', postClassroomChat);
router.get('/:classroomId/user/:userId', getClassroomUser);
router.get('/:classroomId/questions', getClassroomQuestions);
router.post('/:classroomId/questions', postClassroomQuestion);
router.post('/:classroomId/questions/:questionId/answers', postClassroomAnswer);
router.get('/:classroomId/questions/:questionId/answers', getClassroomAnswers);
router.post('/:classroomId/questions/:questionId/upvote', upvoteClassroomQuestion);
router.post('/:classroomId/questions/:questionId/answers/:answerId/upvote', upvoteClassroomAnswer);

router.post('/:classroomId/question/:questionId/upload', uploadQuestionFile)

export default router;

