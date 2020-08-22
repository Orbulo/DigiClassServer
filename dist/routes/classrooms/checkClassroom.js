"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redis = _interopRequireDefault(require("../../redis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var {
      classroomId
    } = req.params;

    if (classroomId) {
      if (!(yield _redis.default.exists("classroom:".concat(classroomId)))) {
        throw new Error("Classroom ".concat(classroomId, " does not exist."));
      }

      var userId = req.user.id;

      if (!(yield _redis.default.sismember("user:".concat(userId, ":classroom-ids"), classroomId))) {
        throw new Error("User ".concat(userId, " is not part of classroom ").concat(classroomId));
      }
    }

    next();
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;