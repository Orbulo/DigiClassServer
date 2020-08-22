"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redis = _interopRequireDefault(require("../../redis"));

var _nanoid = require("nanoid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      classroomId
    } = req.params;
    var userId = req.user.id;
    var {
      message
    } = req.body;
    var messageId = (0, _nanoid.nanoid)();
    yield _redis.default.hmset("classroom:".concat(classroomId, ":chat-message:").concat(messageId), {
      userId,
      message
    });
    yield _redis.default.rpush("classroom:".concat(classroomId, ":chat-messages"), messageId);
    yield _redis.default.publish("classroom:".concat(classroomId, ":chat-message-posted"), {
      userId,
      message
    });
    res.sendStatus(200);
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;