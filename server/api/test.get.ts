


export default defineEventHandler(async (event) => {
  
  const logger = useLogger()
  
  logger.info('Hello world');
  logger.warn('Warning message');
  logger.error('Error info');
  return { result: 0 };


})