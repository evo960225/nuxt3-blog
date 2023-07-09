
import winston from 'winston';
import winstonDailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, json } = winston.format;

const logsDir = getLogsFullDir()


const errorTransport = new winstonDailyRotateFile({
  level: 'error',
  dirname: './logs',
  filename: `${logsDir}/error-%DATE%.log`,
  datePattern: 'YYYY-MM',
  maxSize: '20m',
  maxFiles: '12',
  zippedArchive: true
});

const combinedTransport = new winstonDailyRotateFile({
  dirname: './logs',
  filename: `${logsDir}/combined-%DATE%.log`,
  datePattern: 'YYYY-MM',
  maxSize: '20m',
  maxFiles: '12',
  zippedArchive: true
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    json(),
    winston.format.printf(info => {
      return `[${info.timestamp}][${info.level}]${' '.padStart(7-info.level.length)}${JSON.stringify(info)}`
    })
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    errorTransport,
    combinedTransport,
  ],
});


export function useLogger() { 
  return logger
}


