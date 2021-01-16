import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError } from '@ticketnext/common';

import { createTicketRouter } from './routes/new';

const app = express();
app.set('trust proxy',true);  //tells express that req from ingress is secure
app.use(json());

//intializing cookie session
app.use(cookieSession({
  signed: false, //no encryption
  secure: process.env.NODE_ENV !== 'test' //only from https (false for test)
}));

app.use(createTicketRouter);

app.all("*", () => { throw new NotFoundError()});

export { app };