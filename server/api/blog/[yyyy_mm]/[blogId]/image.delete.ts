
export default defineEventHandler(async (event) => {
  
  if (!event.context.params) return
  const {yyyy_mm, blogId} = event.context.params
  const runtimeConfig = useRuntimeConfig()
  const logger = useLogger()

  // delete images
  const firebaseAdmin = useFirebaseAdmin()
  const bucket = firebaseAdmin.storage().bucket();

  const files = (await bucket.getFiles({
    prefix: getFirebaseBlogDest(yyyy_mm, blogId),
  }))[0]

  if (files.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not find images.'
    })
  }

  try {
    await bucket.deleteFiles({
      prefix: getFirebaseBlogDest(yyyy_mm, blogId),
    })
  } catch (err) {
    logger.error(err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not delete images.'
    })
    return;
  }
  logger.info('Images deleted successfully.');

  return { success: true }
})