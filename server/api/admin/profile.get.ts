import admin from '@/server/db/admin'

export default defineEventHandler(async (event) => {

  console.log('authBackstage', event.context?.authBackstage);
  
  const adminProfile = event.context?.authBackstage?.admin
  
  if (!adminProfile?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const adminData = await admin.findById({
    id: adminProfile.id
  })

  if (!adminData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not find manager.'
    })
  }

  const resultAdminProfile: IAdminProfile = {
    id: adminData.id,
    nickname: adminData.nickname,
    email: adminData.email,
    loginToken: adminData.loginToken
  }
  return resultAdminProfile

})