import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import usersControllers from './users/usersControllers.js';
import productsControllers from './products/productsControllers.js';
import authController from './auth/authController.js';
import logger from './helper/logger.js';
import ErrorHandelingMid from './middlewares/ErrorHandelingMid.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
// app.use(cors());
app.use(express.json());

// Routes-group
app.use('/users', usersControllers);
app.use('/products', productsControllers);
app.use('/auth', authController);

app.use(ErrorHandelingMid);

// Connect to MongoDB and start server
const startServer = async () => {
   try {
      await connectDB(); // این خودش mongoose.connect رو انجام میده
      app.listen(port, () => {
         logger.info(`Server running on port ${port}`);
      });
   } catch (err) {
      logger.error('Failed to connect to MongoDB', err);
      process.exit(1);
   }
};

startServer();
