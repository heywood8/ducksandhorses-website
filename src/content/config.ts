import { defineCollection, z } from 'astro:content';

// Blog collection schema
// heroImage is optional for now; tags normalized to lowercase at runtime if needed.
const blog = defineCollection({
  schema: z.object({
    title: z.string().min(5),
    description: z.string().min(10).max(300),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string().min(1)).default([]),
    heroImage: z.string().optional(),
    canonical: z.string().url().optional()
  })
});

export const collections = { blog };
