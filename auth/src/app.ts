import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
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
  secure: process.env.NODE_ENV !== 'test' //only from https
}))

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", () => { throw new NotFoundError()});

export { app };