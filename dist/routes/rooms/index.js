"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _createRoom = _interopRequireDefault(require("./createRoom"));

var _getRoom = _interopRequireDefault(require("./getRoom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/create', _createRoom.default);
router.get('/:roomId', _getRoom.default);
var _default = router;
exports.default = _default;