import express, { Application, Response, Request, NextFunction, ErrorRequestHandler } from 'express';
import cors from 'cors';
import userRouter from './routes/user-router';
import PageNotFoundError from './exceptions/PageNotFoundError';
import ServerError from './exceptions/ServerError';
import ExceptionBase from './exceptions/ExceptionBase';
import connectDb from './models/connection';


const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  return res.json({
    title: "It's Node JS app, written in Typescript, uses Mongo and Docker",
    description: "Go to /user - to see list of users. And you can make POST request to /user with username to store new user."
  });
})
app.use('/user', userRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new PageNotFoundError);
});

// error handler
app.use(function (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
  let errorInstance = null;

  // If error is of my defined errors, like: NotFound, Unauthorized, ....
  // then use message of that error
  if (err instanceof ExceptionBase) {
    errorInstance = err;
  }
  // Otherwise, create ServerError (500)
  else {
    errorInstance = new ServerError(err);
  }


  return res
    .status(errorInstance.getStatus())
    .json(errorInstance.getMessage());
});



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
  connectDb();
});
