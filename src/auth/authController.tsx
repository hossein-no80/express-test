import { Router, type Request, type Response } from 'express';
import { login, register } from './authServices.js';
import registerDto from './dtos/registerDto.js';
import ValidateMiddleware from '../middlewares/validaMiddleware.js';
import loginDto from './dtos/loginDto.js';

const router = Router();

//...........POST LOGIN................
router.post(
  '/register',
  ValidateMiddleware(registerDto),
  async (req: Request, res: Response) => {
    try {
      const body: registerDto = req.body;
      res.send(register(body));
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  },
);
// __________________________

//...........POST REGISTER.............
router.post(
  '/login',
  ValidateMiddleware(loginDto),
  async (req: Request, res: Response) => {
    try {
      const body: loginDto = req.body;

      const result = await login(body);
      //   console.log(result);
      res.send(result);
      return register;
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  },
);
// __________________________
export default router;
