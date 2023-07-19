import fs from 'fs'
import util from 'util';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';
import blogModel from '@/server/db/blog';


export default defineEventHandler(async(event) => {
  const runtimeConfig = useRuntimeConfig()
  const blogDir = runtimeConfig.blogsContentDir
  
  if (blogDir === undefined) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Prarameters are not valid.'
    })
  }
  const blogInfoList = blogModel.getList(blogDir)

  if (!blogInfoList) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not find blog list.'
    })
  }

  const result: IApiPageResult<IBlogInfo> = {
    data: blogInfoList,
    page: 1,
    pageSize: 5,
    totalPage: Math.ceil(blogInfoList.length / 10),
    total: blogInfoList.length,
  }
  return result
})