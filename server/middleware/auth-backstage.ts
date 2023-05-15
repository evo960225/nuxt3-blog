import jwt from 'jsonwebtoken'
import admin from '@/server/db/admin'
const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async(event) => {

  const jwtToken = getCookie(event, 'access_token_backstage')
  if (!jwtToken) { return }

  try {
    const decoded = jwt.verify(jwtToken, runtimeConfig.jwtSignSecretbackstage)

    const adminInfo = (<any>decoded).data
    
    if (adminInfo?.id) {
      if (await admin.verifyToken(adminInfo?.id, jwtToken)) {
        event.context.authBackstage = {
          admin: {
            id: adminInfo.id,
            loginToken: jwtToken
          }
        }
      }
    }
  } catch (e) {}
})