import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
    const posts = await getCollection('blog')
    return rss({
        title: 'Conrad Osvik',
        description: 'Writing about software, engineering, and things I find interesting.',
        site: context.site!,
        items: posts
            .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
            .map((post) => ({
                title: post.data.title,
                description: post.data.description,
                pubDate: post.data.date,
                link: `/writing/${post.slug}/`
            })),
        customData: '<language>en</language>'
    })
}
