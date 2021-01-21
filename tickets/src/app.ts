import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler, currentUser } from '@ticketnext/common';

import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';

const app = express();
app.set('trust proxy',true);  //tells express that req from ingress is secure
app.use(json());

//intializing cookie session
app.use(cookieSession({
  signed: false, //no encryption
  secure: process.env.NODE_ENV !== 'test' //only from https (false for test)
}));

app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);

app.all("*", () => { throw new NotFoundError()});

app.use(errorHandler);

export { app };