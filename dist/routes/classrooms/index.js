"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _getUserClassrooms = _interopRequireDefault(require("./getUserClassrooms"));

var _getClassroom = _interopRequireDefault(require("./getClassroom"));

var _getClassroomChat = _interopRequireDefault(require("./getClassroomChat"));

var _postClassroomChat = _interopRequireDefault(require("./postClassroomChat"));

var _createClassroom = _interopRequireDefault(require("./createClassroom"));

var _joinClassroom = _interopRequireDefault(require("./joinClassroom"));

var _getClassroomUser = _interopRequireDefault(require("./getClassroomUser"));

var _getClassroomAnswers = _interopRequireDefault(require("./getClassroomAnswers"));

var _checkClassroom = _interopRequireDefault(require("./checkClassroom"));

var _postClassroomQuestion = _interopRequireDefault(require("./postClassroomQuestion"));

var _postClassroomAnswer = _interopRequireDefault(require("./postClassroomAnswer"));

var _upvoteClassroomAnswer = _interopRequireDefault(require("./upvoteClassroomAnswer"));

var _upvoteClassroomQuestion = _interopRequireDefault(require("./upvoteClassroomQuestion"));

var _uploadFile = _interopRequireDefault(require("./uploadFile"));

var _multer = _interopRequireDefault(require("multer"));

var _getClassroomQuestions = _interopRequireDefault(require("./getClassroomQuestions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

var upload = (0, _multer.default)({
  dest: 'uploads/'
});
router.get('/', _getUserClassrooms.default);
router.post('/', _createClassroom.default);
router.post('/join', _joinClassroom.default);
router.use('/:classroomId', _checkClassroom.default);
router.post('/:classroomId/upload', upload.array('files', 5), _uploadFile.default);
router.get('/:classroomId', _getClassroom.default);
router.get('/:classroomId/chat', _getClassroomChat.default);
router.post('/:classroomId/chat', _postClassroomChat.default);
router.get('/:classroomId/user/:userId', _getClassroomUser.default);
router.get('/:classroomId/question', _getClassroomQuestions.default);
router.post('/:classroomId/question', _postClassroomQuestion.default);
router.post('/:classroomId/question/:questionId/answer', _postClassroomAnswer.default);
router.get('/:classroomId/question/:questionId/answer', _getClassroomAnswers.default);
router.post('/:classroomId/question/:questionId/upvote', _upvoteClassroomQuestion.default);
router.post('/:classroomId/question/:questionId/answer/:answerId/upvote', _upvoteClassroomAnswer.default);
var _default = router;
exports.default = _default;