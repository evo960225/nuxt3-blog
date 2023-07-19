
import algoliasearch from 'algoliasearch'
import blogModel from '../db/blog'
export default defineEventHandler(async (event) => {
  
  const runtimeConfig = useRuntimeConfig()
  const algoliaId = runtimeConfig.public.algoliaId
  const algoliaSearchKey = runtimeConfig.public.algoliaSearchKey
  const algoliaSecertKey = runtimeConfig.algoliaSecertKey

  // Connect and authenticate with your Algolia app
  const client = algoliasearch(algoliaId, algoliaSecertKey)
  

  // Create a new index and add a record
  const index = client.initIndex('dev_blog')

  const blogDir = runtimeConfig.blogsContentDir
  const blogList = blogModel.getList(blogDir)
  const blogSearchContent = blogList.map((blog) => {
    return {
      objectID: blog.id,
      ...blog
    }
  })


  // const record = { objectID: 1, name: 'test_record' }
  index.saveObjects(blogSearchContent).wait()

  // Search the index and print the results
  index
    .search('test_record')
    .then(({ hits }) => console.log(hits[0]))
  return 0




})