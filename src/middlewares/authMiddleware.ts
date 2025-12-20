import type { NextFunction, Request, Response } from 'express';
import { decodeToken } from '../utils/index.js';
import usersModel from '../models/usersModel.js';

// export default function AuthMiddleware(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   let token = req.headers['authorization'];
//   if (!token) return res.status(401).send({ message: 'Unauthorized' });
//   token = token.split(' ')[1];
//   const data = decodeToken(token)
//   console.log(token);
//   next();
// }

export default async function AuthMiddleware(
  req: any,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Malformed token' });
  }

  try {
    const data = decodeToken(token);
    req['user'] = data.id;
    next();
  } catch (err: any) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   if (req.body.token) {
//     if (req.body.token === '1234') {
//       next();
//     } else {
//       res.status(404).send('token is unvalid');
//     }
//   } else {
//     res.status(401).send('Unauthoriz');
//   }
// };

// export default AuthMiddleware;
