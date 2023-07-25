import fs from 'fs'
import moment from 'moment'

export default defineEventHandler(async(event) => {

  if (!event.context.authBackstage) {
    throw createError({
      statusCode: 401,
      message: 'You don\'t have the rights to access this resource',
    })
  }
  
  
  const blog = modelBlog().create()
  if (!blog) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not create blog.'
    })
  }

  return blog
})