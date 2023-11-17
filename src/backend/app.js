var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const modelRoutes = require('./routes/modelRoutes')
const userRoutes = require('./routes/userRoutes')
const runRoutes = require('./routes/runRouter')
const aircraftsRoutes = require('./routes/aircraftsRoutes')
const predictionRoutes = require('./routes/predictionRoutes')

var app = express();

app.use(cors({
  origin: '*'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/model', modelRoutes);
app.use('/user', userRoutes);
app.use('/run', runRoutes);
app.use('/aircraft', aircraftsRoutes);
app.use('/prediction', predictionRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
