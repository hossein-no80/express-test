import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import usersControllers from './users/usersControllers.js';
import productsControllers from './products/productsControllers.js';
import authController from './auth/authController.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/users', usersControllers);
app.use('/products', productsControllers);
app.use('/auth', authController);

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDB(); // این خودش mongoose.connect رو انجام میده
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};

startServer();
