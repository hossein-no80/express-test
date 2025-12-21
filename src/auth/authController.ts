import {
   Router,
   type NextFunction,
   type Request,
   type Response,
} from 'express';
import { login, register } from './authServices.js';
import registerDto from './dtos/registerDto.js';
import ValidateMiddleware from '../middlewares/validaMiddleware.js';
import loginDto from './dtos/loginDto.js';

const router = Router();

//...........POST LOGIN................
router.post(
   '/register',
   ValidateMiddleware(registerDto),
   async (req: Request, res: Response, next: NextFunction) => {
      try {
         const body: registerDto = req.body;
         const result = await register(body);
         res.send(result);
      } catch (err: any) {
         next(err);
      }
   },
);
// __________________________

//...........POST REGISTER.............
router.post(
   '/login',
   ValidateMiddleware(loginDto),
   async (req: Request, res: Response, next: NextFunction) => {
      try {
         const body: loginDto = req.body;
         const result = await login(body);
         res.send(result);
      } catch (err: any) {
         next(err);
      }
   },
);
// __________________________
export default router;
