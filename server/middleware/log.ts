export default defineEventHandler((event) => {
  event.node.req.url = decodeURIComponent(event.node.req.url || '')
  console.log('[LOG] Nuxt New request: ' + event.node.req.url)
})