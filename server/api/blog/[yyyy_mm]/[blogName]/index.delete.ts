import fs from 'fs'

export default defineEventHandler(async (event) => {
  if (!event.context.params) return
  const {yyyy_mm, blogName} = event.context.params
  const runtimeConfig = useRuntimeConfig()
  const logger = useLogger()

  // delete md file
  const encodedId = decodeURIComponent(blogName as string);
  const blogPath = getBlogsContentFullDir(yyyy_mm, `${encodedId}.md`)

  if (!fs.existsSync(blogPath)) {
    logger.http('Could not find blog.' + blogPath)
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not find blog.'
    })
  }

  try {
    fs.unlinkSync(blogPath)
  } catch (err) {
    logger.error(err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not delete blog.'
    })
    return;
  }
  logger.info('Markdown file deleted successfully.');

  
  // delete images
  const firebaseAdmin = useFirebaseAdmin()
  const bucket = firebaseAdmin.storage().bucket();

  const files = (await bucket.getFiles({
    prefix: getFirebaseBlogDest(yyyy_mm, blogName),
  }))[0]

  if (files.length === 0) {
    return { success: true }
  }

  try {
    await bucket.deleteFiles({
      prefix: getFirebaseBlogDest(yyyy_mm, blogName),
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