export default defineEventHandler(async () => {
  const runtimeConfig = useRuntimeConfig()
  const host = runtimeConfig.public.host

  const [blogPage] = await Promise.all([
    $fetch('/api/blog/list'),
  ])

  return [
    { loc: `${host}`, lastmod: '2023-07-14', changefreq: 'weekly',  priority: 1.0},
    ...
    (blogPage.data.map((blog) => {
      return { 
        loc: `${host}/blog/${blog.blogName}`, 
        lastmod: blog.date, 
        changefreq: 'weekly',
        priority: 0.8, 
      }
    }))
  ]

})