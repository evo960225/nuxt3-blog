export default defineEventHandler((event) => {
  console.log('[LOG] Nuxt New request: ' + event.node.req.url)
})