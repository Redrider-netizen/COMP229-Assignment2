const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const cors = require('cors');
const app = express();

let indexRouter = require('../app/routers/index');
let projectsRouter = require('../app/routers/projects');

app.use(logger('dev'));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define paths for the routers
app.use('/', indexRouter);
app.use('/api/projects', projectsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error json
  res.status(err.status || 500);
  res.json(
    {
      success: false,
      message: err.message
    }
  );
});

module.exports = app;