
export default defineEventHandler(async (event) => {
  
  if (!event.context.authBackstage) {
    return createError({
      statusCode: 401,
      message: 'You don\'t have the rights to access this resource',
    })
  }

  // check params
  if (!event.context.params) return
  const {yyyy_mm, blogName} = event.context.params
  const decodedBlogName = decodeURIComponent(blogName as string);
  const body = await readBody(event)
  const fileName = body?.fileName || ''
  const blogModel = modelBlog()
  const blogMd = await blogModel.get(yyyy_mm, decodedBlogName)
  if (!blogMd) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not find blog.'
    })
  }
  const blogId = blogMd?.id

  
  const runtimeConfig = useRuntimeConfig()
  const logger = useLogger()

  // delete images
  const firebaseAdmin = useFirebaseAdmin()
  const bucket = firebaseAdmin.storage().bucket();
  const filePath = `${getFirebaseBlogDest(yyyy_mm, blogId)}/${fileName}`
  logger.info('filePath: ' + filePath)
  const files = (await bucket.getFiles({
    prefix: filePath,
  }))[0]

  if (files.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not find images.'
    })
  }

  try {
    await bucket.deleteFiles({
      prefix: filePath,
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