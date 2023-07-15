import * as z from 'zod';

export const BlogInfoSchema = z.object({
  id: z.string(),
  title: z.string(),
  blogName: z.string().optional(),
  date: z.string(),
  category: z.string(),
  ogImage: z.string().optional(),
  description: z.string().optional(),
});


export const BlogSchema = BlogInfoSchema.extend({
  content: z.string(),
})

export type IBlogSchema = z.infer<typeof BlogSchema>;

export const BlogHtmlSchema = BlogInfoSchema.extend({
  contentHtml: z.string(),
})