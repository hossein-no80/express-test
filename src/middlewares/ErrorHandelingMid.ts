import type {
   Request,
   Response,
   NextFunction,
   ErrorRequestHandler,
} from 'express';
import ServerError from '../errors/serverError.js';
import logger from '../helper/logger.js';

export default function ErrorHandelingMiddleware(
   error: ErrorRequestHandler,
   req: Request,
   res: Response,
   next: NextFunction,
) {
   if (error instanceof ServerError) {
      res.status(error.status).send({ message: error.message });
   } else {
      logger.error(error);
      res.status(500).send({
         message: 'Internal Server Error',
      });
   }
}
