import express, { Express } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import session from 'express-session';
import { Redis } from 'ioredis';
import RedisStore from 'connect-redis';
import limiter from 'express-rate-limit';

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
const {
  PORT,
  MONGO_URL,
  SESSION_SECRET,
  SECURE_COOKIE,
  REDIS_PORT,
  REDIS_URL,
  REDIS_PASSWORD,
} = process.env;
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
 * Session setup with Redis store
 */
const redisClient = new Redis({
  port: REDIS_PORT,
  host: REDIS_URL,
  password: REDIS_PASSWORD,
});

const redisStore = new RedisStore({
  client: redisClient,
  ttl: 300,
});

app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: SESSION_SECRET,
    // cookie: {
    //   maxAge: 300,
    //   // secure: SECURE_COOKIE,
    // },
  })
);

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
