import admin from '@/server/db/admin'

export default defineEventHandler(async (event) => {

  const administrator = await admin.logout(event.context?.authBackstage?.admin.id)
  const token = getCookie(event, 'access_token_backstage')
  deleteCookie(event, 'access_token_backstage')
  return {
    token: token,
  } 
})