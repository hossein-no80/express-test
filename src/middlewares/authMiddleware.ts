import type { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../utils/index.js';
import type { RequestWithUser } from '../types/requestWithUsr.js';

const AuthMiddleware = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   const authHeader = req.headers.authorization;

   if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

   const token = authHeader.split(' ')[1];
   if (!token) return res.status(401).json({ message: 'Malformed token' });

   try {
      const data = decodeToken(token);
      // اضافه کردن user به req با type assertion
      (req as RequestWithUser).user = data.id;
      next();
   } catch {
      res.status(401).json({ message: 'Invalid token' });
   }
};

export default AuthMiddleware;
