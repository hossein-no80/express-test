import ServerError from '../errors/serverError.js';
import usersModel from '../models/usersModel.js';
import { encodeToken } from '../utils/index.js';
import type loginDto from './dtos/loginDto.js';
import registerDto from './dtos/registerDto.js';
import bcrypt from 'bcrypt';

//........................register service.................................
export async function register(data: registerDto) {
   const user = await usersModel.findOne({ email: data.email });
   if (user) throw new ServerError(409, 'user already exists');
   const hashedPassword = await bcrypt.hash(data.password, 10);
   const newUser = await usersModel.create({
      ...data,
      password: hashedPassword,
   });
   newUser.save();
   return newUser;
}
//________________________end register_____________________________________

//........................login service.................................
export async function login(data: loginDto) {
   const user = await usersModel.findOne({ email: data.email });
   if (!user) throw new ServerError(404, 'user not found');
   const compare = await bcrypt.compare(data.password, `${user.password}`);
   if (!compare) throw new ServerError(400, 'Invalid credentials');
   const token = encodeToken({ id: user.id });
   return { token };
}
//________________________end login_____________________________________
