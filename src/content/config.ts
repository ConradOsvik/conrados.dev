import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
    type: 'content',
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            date: z.coerce.date(),
            cover: image().optional(),
            tags: z.array(z.string()).optional()
        })
})

export const collections = { blog }
