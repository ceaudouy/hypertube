import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { handleError, passport } from 'middlewares';

import { userRouter, movieRouter } from 'routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(passport.initialize());

app.use('/user', userRouter);
app.use('/movie', movieRouter);

app.use(handleError);

app.listen(3300);
