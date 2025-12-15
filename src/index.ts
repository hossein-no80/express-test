import express from 'express';
import type { Request, Response } from 'express';

//constrollers
import usersControllers from './users/usersControllers.js';
import productsControllers from './products/productsControllers.js';
import AuthMiddleware from './middlewares/authMiddleware.js';
//port
const port = 3000;
//express app
const app = express();

//middleware
app.use(express.json());

//......for root project......
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!');
// });
//____________________________

//routes group
app.use('/users', usersControllers);
app.use('/products', productsControllers);

//server start
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
