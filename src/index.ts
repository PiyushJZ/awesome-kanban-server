import express, { Express } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import homeRoute from '@routes/home';
import authRoutes from '@routes/auth';
import projectRoutes from '@routes/project';
import taskRoutes from '@routes/task';

/**
 * CONFIGURATIONS
 */
dotenv.config({
  path: process.env.NODE_ENV === 'dev' ? './.env' : './.env.production',
});
const { PORT, MONGO_URL } = process.env;
const app: Express = express();

/**
 * MIDDLEWARE SETUP
 */
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use('/assets', express.static('public/assets'));

/**
 * ROUTES SETUP
 * Two types of routes:
 * - Public routes: Accessible by anyone on the web
 * - Protected/Private: Accessible only by Authenticated and Authorized users
 */
app.use('/', homeRoute);
app.use('/auth', authRoutes);
app.use('/task', taskRoutes);
app.use('/project', projectRoutes);

/**
 * MONGOOSE SETUP
 * SERVER STARTUP
 */
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`=================================`);
      console.log(`Connection to database successful`);
      console.log(`Server running on port: ${PORT}`);
      console.log(`=================================`);
    });
  })
  .catch(error => {
    console.log(`=================================`);
    console.log(`Could not connect to database`);
    console.log(`due to error:\n${error}`);
    console.log(`=================================`);
  });
