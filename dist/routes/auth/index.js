"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _login = _interopRequireDefault(require("./login"));

var _register = _interopRequireDefault(require("./register"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/login', _login.default);
router.post('/register', _register.default);
var _default = router;
exports.default = _default;