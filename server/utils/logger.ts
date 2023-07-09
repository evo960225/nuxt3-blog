
import winston from 'winston';
const { combine, timestamp, label, json } = winston.format;

const logsDir = getLogsFullDir()


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
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
    new winston.transports.File({ filename: `${logsDir}/error.log`, level: 'error' }),
    new winston.transports.File({ filename: `${logsDir}/combined.log` }),
  ],
});


export function useLogger() { 
  return logger
}


