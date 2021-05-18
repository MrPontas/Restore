import express, { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import 'express-async-errors';
import routes from './routes';
import AppError from './errors/AppError';
import cors from 'cors';
import './database';
import http from 'http';
import https from 'https';
import fs from 'fs';

const HTTPPORT = 1158;
const HTTPSPORT = 3333;

const app = express();

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

// Certificate
// const privateKey = fs.readFileSync(
//   '/etc/letsencrypt/live/restorebrecho.com.br/privkey.pem',
//   'utf8',
// );
// const certificate = fs.readFileSync(
//   '/etc/letsencrypt/live/restorebrecho.com.br/cert.pem',
//   'utf8',
// );
// const ca = fs.readFileSync(
//   '/etc/letsencrypt/live/restorebrecho.com.br/chain.pem',
//   'utf8',
// );

// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca,
// };

// https.createServer(credentials, app).listen(HTTPSPORT, () => {
//   console.log(`Server listing HTTPS on port ${HTTPSPORT} 🚀 `);
// });

http.createServer(app).listen(HTTPPORT, () => {
  console.log(`Server listing HTTP on port ${HTTPPORT} 🚀 `);
});
