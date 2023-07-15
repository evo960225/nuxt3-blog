// import type { inferAsyncReturnType } from '@trpc/server'
// import * as trpc from '@trpc/server'
import { z } from 'zod' 

// export const router = trpc.router()
//   // .query('getUsers', {
//   //   async resolve(req) {
//   //     // use your ORM of choice
//   //     return await UserModel.all()
//   //   },
//   // })
//   // .mutation('createBlog', {
//   //   // validate input with Zod
//   //   input: z.object({ name: z.string().min(5) }),
//   //   async resolve(req) {
//   //     // use your ORM of choice
//   //     return await modelBlog().create()
//   //   },
//   // })