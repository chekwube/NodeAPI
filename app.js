import express from 'express';
import 'dotenv/config';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import indexRoute from './src/routes/index.js'
let app = express();
let router = express.Router();
let indexRouter = (indexRoute)(router);
let dir = path.join(__dirname, 'thumbnails');

app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(dir));
app.use(cors());

app.use('/api', indexRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send an error response
  res.status(err.status || 500);
  res.json({error: err});
});

module.exports = app;
