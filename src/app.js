import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import jwt from 'express-jwt';
import cors from 'cors';
import appRoot from 'app-root-path';
import fs from 'fs';

import classroomsRouter from '~/routes/classrooms';
import authRouter from '~/routes/auth';
import roomsRouter from '~/routes/rooms';

const app = express();

fs.mkdirSync(path.join(appRoot.path, 'public', 'uploads'), { recursive: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(jwt({
  secret: process.env.APP_SECRET,
  algorithms: ['HS256'],
}).unless({ path: [/^\/auth/, /^\/$/, /^\/uploads/ ] }));

app.use(express.static('public'));

// Classrooms relating to the current user
app.get('/', (req, res) => res.json({ success: true }));
app.use('/auth', authRouter);
app.use('/classrooms', classroomsRouter);
app.use('/rooms', roomsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
