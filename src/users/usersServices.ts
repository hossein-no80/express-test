import type { Request, Response } from 'express';
import type User from './dtos/userDto.js';
import usersModel from '../models/usersModel.js';
import { resolve } from 'node:dns';
import { rejects } from 'node:assert';

export const getAllUsers = async () => {
  return usersModel.find(); // خودش Promise برمی‌گردونه
};

export const getOneUser = async (id: string) => {
  const user = await usersModel.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const createNewUser = async (user: User) => {
  try {
    const newUser = await usersModel.create(user);
    return newUser;
  } catch (err) {
    console.log(err);
    throw err; // خطا رو دوباره پرتاب کن تا ریپانس مناسب بفرستیم
  }
};

export const deleteOneUser = async (id: string) => {
  const user = await usersModel.findByIdAndDelete(id);

  if (!user) {
    throw new Error('User not found');
  }

  return user; // می‌تونی برگردونی document حذف شده
};

export const updateOneUser = async (
  id: string,
  updateData: Partial<{
    name: string;
    email: string;
    password: string;
    age: number;
  }>,
) => {
  const updatedUser = await usersModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!updatedUser) {
    throw new Error('User not found');
  }

  return updatedUser;
};
