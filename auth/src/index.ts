import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import  { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy',true);  //tells express that req from ingress is secure
app.use(json());

//intializing cookie session
app.use(cookieSession({
  signed: false, //no encryption
  secure: true //only from https
}))

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", () => { throw new NotFoundError()});

const start = async () => {
  if(!process.env.JWT_KEY){
    throw new Error("JWT_KEY not defined");
  }
  try{
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth',{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("Connected to MongoDB");
  } catch(err){
    console.error(err);
  }

  app.listen(3000, async () => {
    console.log('Listening on port 3000!');
  });
  
}

start();


