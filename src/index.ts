// import 'reflect-metadata';
// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import usersControllers from './users/usersControllers.js';
// import productsControllers from './products/productsControllers.js';
// import authController from './auth/authController.js';
// import logger from './helper/logger.js';
// import ErrorHandelingMid from './middlewares/ErrorHandelingMid.js';
// import cors from 'cors';
import { disconnect } from 'cluster';
import Request from 'express';
import Response from 'express';

// // Load environment variables
// dotenv.config();

// const app = express();
// app.use(cors());

// const port = process.env.PORT || 3000;

// // Middleware
// // app.use(cors());
// app.use(express.json());

// // Routes-group
// app.use('/users', usersControllers);
// app.use('/products', productsControllers);
// app.use('/auth', authController);

// app.use(ErrorHandelingMid);

// // Connect to MongoDB and start server
// const startServer = async () => {
//    try {
//       await connectDB(); // این خودش mongoose.connect رو انجام میده
//       app.listen(port, () => {
//          logger.info(`Server running on port ${port}`);
//       });
//    } catch (err) {
//       logger.error('Failed to connect to MongoDB', err);
//       process.exit(1);
//    }
// };

// startServer();

import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
   cors: {
      origin: '*',
   },
});

io.on('connection', (socket: Socket) => {
   console.log(socket.id);
   socket.on('sendMessage', (data: any) => {
      const { message, user, room } = data;
      io.to(room).emit('message', { message, user });
   });

   socket.on('join', (data) => {
      const { room } = data;
      console.log(room);
      socket.join(room);
   });

   socket.on('leave', (data) => {
      const { room } = data;
      socket.leave(room);
   });

   socket.on('disconnect', () => {
      console.log('user disconnected');
   });
});

const PORT = 3000;
server.listen(PORT, () => {
   console.log('server is reunning on port wit socket ', PORT);
});
