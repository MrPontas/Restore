import express, { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import 'express-async-errors';
import routes from './routes';
import AppError from './errors/AppError';
import cors from 'cors';
import './database';

const app = express();
const port = process.env.PORT || 1158;

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  async (
    err: Error,
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
    console.log(err);
    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

// app.listen();
app.listen(port, () => {
  console.log(`Server listing on port ${port}`);
});
