
export default defineNuxtRouteMiddleware(async(to, from)  => {
  if (process.client) { 
    const ls_dir = to.path.split('/')
    if (ls_dir[1] === 'backstage') {
      setPageLayout('backstage')
    }
  }
})