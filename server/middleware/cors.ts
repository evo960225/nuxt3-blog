import { defineEventHandler, setResponseHeaders } from 'h3'

export default defineEventHandler((event) => {
  const host = useRuntimeConfig().public.host
  setResponseHeaders(event, {
    // "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    // "Access-Control-Allow-Origin": host,
    // 'Access-Control-Allow-Credentials': 'true',
    // "Access-Control-Allow-Headers": '*',
    // "Access-Control-Expose-Headers": '*',
    // "X-Frame-Options": "SAMEORIGIN"
  })
})