var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var userRouter = require('./api/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// middleware for authentication
app.use((req, res, next) => {

	if(req.headers.authorization == "API_token") {
		console.log("Accepted")
		next()
	} else {
		console.log("Unauthorized")
		res.status(401).json({
			msg: "Invalid or missing authorization token"
		})
	}

})


// app.use('/', indexRouter);
app.use('/api/users/', userRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(400).json({
		msg: "Invalid route"
	})
});

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   // res.render('error');
// });

module.exports = app;
