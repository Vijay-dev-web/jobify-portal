import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import jobRouter from './routes/jobRouter.js';
import mongoose from 'mongoose';
import cloudinary from 'cloudinary';
import errorHandler from './middleware/errorHandler.js';
import { body, validationResult } from 'express-validator';
import { validateTest } from './middleware/validations.js';
import authRouter from './routes/authRouter.js';
import { authenticateUser } from './middleware/auth.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js';
//public
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, './public')));



app.get('/api/v1/dum', (req, res) => {
  res.json({
    msg: 'Hello'
  });
});

app.post('/api/v1/test', validateTest, (req, res) => {
  res.json({
    message: 'test'
  })
})

//routers
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);

app.use('*', (req, res) => {
  res.sendFile('index.html', path.resolve(__dirname, './public'));
})

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'not found'
  })
})

app.use(errorHandler);

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port  ${process.env.PORT}`);
  })
} catch (err) {
  console.log(err);
  process.exit(1);
}

