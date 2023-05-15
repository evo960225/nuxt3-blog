
import admin from '@/server/db/admin'
import jwt from 'jsonwebtoken'

const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { nickname, email, password } = body
  const adminData = await admin.create(nickname, email, password)
  if (!adminData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'not found admin data!'
    })
  }

  return adminData  
})

