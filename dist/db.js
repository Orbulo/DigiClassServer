"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = _interopRequireDefault(require("pg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = new _pg.default.Client(process.env.POSTGRES_URL);
client.connect();
client.query("\n\tcreate table if not exists account (\n\t  id int primary key generated always as identity,\n\t  user_id text unique not null,\n\t  email text unique not null,\n\t \tpassword_hash text \n\t);\n");
var _default = client;
exports.default = _default;