import { info } from 'node:console';
import winston from 'winston';
export default winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD  HH:mm:ss' }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level} : ${info.message}`,
    ),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD  HH:mm:ss' }),
        winston.format.printf(
          (info) =>
            ` ${info.level} : ${info.message}   date-time=${info.timestamp}`,
        ),
      ),
    }),
    new winston.transports.File({
      filename: './logs/errors/error.log',
      level: 'error',
      maxsize: 100 * 1024,
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: './logs/info/info.log',
      level: 'info',
      maxsize: 100 * 1024,
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: './logs/warning/warn.log',
      level: 'warn',
      maxsize: 100 * 1024,
      maxFiles: 5,
    }),
  ],
});
