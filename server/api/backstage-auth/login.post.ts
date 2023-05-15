
import admin from '@/server/db/admin'
import jwt from 'jsonwebtoken'

const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { recaptchaSecretKey } = runtimeConfig

  // 驗證 recaptcha
  const recaptchaResult = await $fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${body.recaptchaToken}`
  );

  console.log('recaptchaResult', recaptchaResult);
  
  if (!(<any>recaptchaResult).success) throw createError({
    statusCode: 400,
    statusMessage: 'recaptcha not success!'
  })


  const adminData = await admin.login(body.email, body.password)

  if (!adminData || !adminData.loginToken) {
    throw createError({
      statusCode: 400,
      statusMessage: 'not found admin data!'
    })
  }

  const maxAge = runtimeConfig.public.loginCookieMaxAge
  const expires = Math.floor(Date.now() / 1000) + maxAge

  setCookie(event, 'access_token_backstage', adminData.loginToken, {
    httpOnly: process.env.NODE_ENV === 'production',
    maxAge,
    expires: new Date(expires * 1000),
    secure: process.env.NODE_ENV === 'production',
  })

  
  return adminData  
})

