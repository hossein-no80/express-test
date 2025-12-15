import { Router, type Request, type Response } from 'express';
import { AuthMiddleware } from '../middlewares/index.js';
import { getAllUsers, getOneUser } from './usersServices.js';
const router = Router();

// router.use(AuthMiddleware) #برای روت هایی ک میخایم همه روتا از میدلویر رد بشه

//این هم برای روت هایی ک میخاهیم از میدلویر ها رد بشن
//router.get('/:id',AuthMiddleware , (req: Request, res: Response) => {
//  res.send('get {id}');
//});

router.use(AuthMiddleware);

//...........GET.............
router.get('/', (req: Request, res: Response) => {
    try {
      res.send(getAllUsers(req, res));
    } catch (err: any) {
      res.status(500).send({
        message: err.message,
      });
    }
});
// __________________________

//...........GET/{id}.............
router.get('/:id', (req: Request, res: Response) => {
  // try {
  //   res.send(getOneUser(2));
  // } catch (err: any) {
  //   res.status(500).send({
  //     message: err.message,
  //   });
  // }
});
// __________________________

//...........POST.............
router.post('/', (req: Request, res: Response) => {
  res.send('Post');
});
// __________________________

//...........PUT.............
router.put('/:id', (req: Request, res: Response) => {
  res.send('put');
});
// __________________________

//...........DELETE.............
router.delete('/:id', (req: Request, res: Response) => {
  res.send('delete');
});
// __________________________

export default router;
