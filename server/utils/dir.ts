import path from 'path'


export function getBlogsContentFullDir() { 
  const { blogsContentDir } = useRuntimeConfig()
  return path.join(process.cwd(), blogsContentDir)
}

export function getStorageFullDir() { 
  const { storageDir } = useRuntimeConfig()
  return path.join(process.cwd(), storageDir)
}

export function getLogsFullDir() { 
  const { logsDir } = useRuntimeConfig()
  return path.join(process.cwd(), logsDir)
}
