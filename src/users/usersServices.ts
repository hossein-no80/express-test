import type { Request, Response } from 'express';

export const getAllUsers = (req: Request, res: Response) => {
  // if (true) {
  //   throw new Error(
  //     'no users find yet becuse there is not database connection',
  //   );
  // } else {
  //   return res.send('welcome to get all users');
  // }
  return res.send('welcome to get all users');
};

export const getOneUser = (req: Request, res: Response) => {
  // if (true) {
  //   throw new Error(
  //     'no users find yet becuse there is not database connection',
  //   );
  // } else {
  //   return res.send('welcome to get One users {id}');
  // }
  return res.send('welcome to get One users {id}');
};
