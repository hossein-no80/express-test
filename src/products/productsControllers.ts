import {
   Router,
   type Request,
   type Response,
   type NextFunction,
} from 'express';
import { AuthMiddleware } from '../middlewares/index.js';
import {
   createNewProducts,
   deleteProducts,
   getAllProducts,
   updateProducts,
   getOneProducts,
} from './productsServices.js';
import type CreateProductsDto from './dtos/productsCreateDto.js';
import type { RequestWithUser } from '../types/requestWithUsr.js';
import logger from '../helper/logger.js';
import GetAllProductsDto from './dtos/GetAllProductsDto.js';
const router = Router();

//...........GET.............
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
   try {
      const filters: GetAllProductsDto = req.query;
      const result = await getAllProducts(filters);
      res.status(200).send(result);
   } catch (error: any) {
      next(error);
   }
});
// __________________________

//...........GET/{id}.............
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'ID is required' });
      const result = await getOneProducts(id);
      res.status(200).json(result);
   } catch (err: any) {
      next(err);
   }
});
// __________________________

//...........POST.............
router.post('/', AuthMiddleware, async (req: Request, res, next) => {
   try {
      const reqWithUser = req as RequestWithUser; // cast امن
      if (!reqWithUser.user)
         return res.status(401).json({ message: 'Unauthorized' });

      const data = req.body;
      const result = await createNewProducts({
         ...data,
         user: reqWithUser.user,
      });
      res.status(200).json(result);
   } catch (error) {
      next(error);
   }
});
// __________________________

//...........PUT.............
router.put(
   '/:id',
   AuthMiddleware,
   async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { id } = req.params;
         if (!id) return res.status(400).json({ message: 'ID is required' });
         const reqWithUser = req as RequestWithUser; // cast امن
         if (!reqWithUser.user)
            return res.status(401).json({ message: 'Unauthorized' });
         const data: CreateProductsDto = req.body;

         const result = await updateProducts(id, {
            ...data,
            user: reqWithUser.user,
         });

         res.status(200).json(result);
      } catch (error) {
         next(error);
      }
   },
);
// __________________________

//...........DELETE.............
router.delete(
   '/:id',
   AuthMiddleware,
   async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { id } = req.params;
         if (!id) return res.status(400).json({ message: 'ID is required' });
         const reqWithUser = req as RequestWithUser; // cast امن
         if (!reqWithUser.user)
            return res.status(401).json({ message: 'Unauthorized' });
         const data: CreateProductsDto = req.body;

         const result = await deleteProducts(id, reqWithUser.user);

         res.status(200).json(result);
      } catch (error) {
         next(error);
      }
   },
);
// __________________________

export default router;
