"use strict";

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _cors = _interopRequireDefault(require("cors"));

var _classrooms = _interopRequireDefault(require("./routes/classrooms"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _rooms = _interopRequireDefault(require("./routes/rooms"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)(); // view engine setup

app.set('views', _path.default.join(__dirname, 'views'));
app.use((0, _cors.default)());
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
app.use(_express.default.static(_path.default.join(__dirname, 'public')));
app.use((0, _expressJwt.default)({
  secret: process.env.APP_SECRET,
  algorithms: ['HS256']
}).unless({
  path: [/^\/auth/, /^\/$/]
}));
app.use(_express.default.static('public')); // Classrooms relating to the current user

app.get('/', (req, res) => res.json({
  success: true
}));
app.use('/auth', _auth.default);
app.use('/classrooms', _classrooms.default);
app.use('/rooms', _rooms.default); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next((0, _httpErrors.default)(404));
}); // error handler

app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;