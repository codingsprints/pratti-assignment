import express, { Request, Response } from 'express';
import { globalErrorHandler } from './common/middleware/globalMiddleware';
import { configENV } from './common/config/config';
import authRouter from './auth/authRouter';
import contentRouter from './contents/contentRouter';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);

app.use(express.static('public'));
// app.use(cookieParser(configENV.cookieSecret));
app.use(cookieParser());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(`${configENV.baseUrl}/auth`, authRouter);
app.use(`${configENV.baseUrl}/contents`, contentRouter);

app.use(globalErrorHandler);

export default app;
