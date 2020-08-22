"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onConnection;

var _ioredis = _interopRequireDefault(require("ioredis"));

var _camelcase = _interopRequireDefault(require("camelcase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function onConnection(socket) {
  var currentClassroomId;
  var classroomSub = new _ioredis.default(process.env.REDIS_URL);
  socket.on('disconnect', () => {
    console.log('User disconnected.');
  });
  socket.on('connectToClassroom', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (classroomId) {
      yield classroomSub.punsubcribe("classroom:".concat(currentClassroomId, ":*"));
      currentClassroomId = classroomId;
      classroomSub.psubscribe("classroom:".concat(classroomId, ":*"));
      classroomSub.on('pmessage', (pattern, channel, msg) => {
        console.log(pattern, channel, msg);
        var topic = channel.split(':').pop();
        socket.to(classroomId).broadcast.emit((0, _camelcase.default)(topic, {
          pascalCase: true
        }), JSON.parse(msg));
      });
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  socket.on('joinRoom', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit('userConnected', userId);
    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('userDisconnected', userId);
    });
  });
}