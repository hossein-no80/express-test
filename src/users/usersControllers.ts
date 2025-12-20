import { Router, type Request, type Response } from 'express';
import { AuthMiddleware } from '../middlewares/index.js';
import {
  createNewUser,
  getAllUsers,
  getOneUser,
  deleteOneUser,
  updateOneUser,
} from './usersServices.js';
import CreateUserDto from './dtos/usersCreateDto.js';
import type User from './dtos/userDto.js';
const router = Router();

// router.use(AuthMiddleware) #برای روت هایی ک میخایم همه روتا از میدلویر رد بشه

//این هم برای روت هایی ک میخاهیم از میدلویر ها رد بشن
//router.get('/:id',AuthMiddleware , (req: Request, res: Response) => {
//  res.send('get {id}');
//});

//...........GET.............
router.get('/', AuthMiddleware, async (req: any, res: Response) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});
// __________________________

//...........GET/{id}.............
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  try {
    const user = await getOneUser(id);
    res.json(user);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});
// __________________________

//...........POST.............
router.post(
  '/',

  async (req: Request, res: Response) => {
    const body: User = req.body;
    try {
      const user = await createNewUser(body);
      res.status(201).json(user); // داده ایجاد شده را برگردان
    } catch (err) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  },
);

// __________________________

//...........PUT.............
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const updatedUser = await updateOneUser(id, updateData);
    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});
// __________________________

//...........DELETE.............
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const deletedUser = await deleteOneUser(id);
    res.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});
// __________________________

export default router;
