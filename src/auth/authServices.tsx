import usersModel from '../models/usersModel.js';
import { decodeToken, encodeToken } from '../utils/index.js';
import type loginDto from './dtos/loginDto.js';
import registerDto from './dtos/registerDto.js';
import bcrypt from 'bcrypt';

//........................register service.................................
export async function register(data: registerDto) {
  try {
    const user = await usersModel.findOne({ email: data.email });
    if (user) throw new Error('user already exists');
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await usersModel.create({
      ...data,
      password: hashedPassword,
    });
    newUser.save();
    return newUser;
  } catch (err: any) {
    console.error(err.message);
  }
  return {};
}
//________________________end register_____________________________________

//........................login service.................................
export async function login(data: loginDto) {
  try {
    const user = await usersModel.findOne({ email: data.email });
    if (!user) throw new Error('user not found');
    const compare = await bcrypt.compare(data.password, `${user.password}`);
    if (!compare) throw new Error('user not found');
    const token = encodeToken({ id: user.id });
    return { token };
  } catch (err: any) {
    console.log(err.message);
  }
  return {};
}
//________________________end login_____________________________________
