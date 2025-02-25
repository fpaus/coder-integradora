import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

const configureLogger = (appName: string) => {
  const transports: winston.transport[] = [
    new winston.transports.File({
      filename: './log/error.log',
      level: 'error',
    }),
    new winston.transports.File({ filename: './log/combined.log' }),
  ];

  if (process.env.NODE_ENV !== 'production') {
    transports.push(
      new winston.transports.Console({
        format: winston.format.combine(
          utilities.format.nestLike(appName, {
            colors: true,
            prettyPrint: true,
          }),
        ),
      }),
    );
  }
  return WinstonModule.createLogger({
    level: 'info',
    transports,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.ms(),
      winston.format.json(),
    ),
  });
};

export default configureLogger;
