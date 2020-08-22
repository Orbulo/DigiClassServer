"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../../db"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _camelcaseKeys = _interopRequireDefault(require("camelcase-keys"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      email,
      password
    } = req.body;
    var {
      rows
    } = yield _db.default.query("\n\t\tselect password_hash, user_id from account where email = $1;\n\t", [email]);
    var {
      passwordHash,
      userId
    } = (0, _camelcaseKeys.default)(rows[0]);

    if (yield _bcrypt.default.compare(password, passwordHash)) {
      res.json({
        token: _jsonwebtoken.default.sign({
          id: userId
        }, process.env.APP_SECRET)
      });
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;