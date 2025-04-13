import fs from 'node:fs'
import path from 'node:path'
import { format } from 'date-fns'
import type { MDXModule as BaseMDXModule } from 'mdx/types'
import Link from 'next/link'

interface MDXModule extends BaseMDXModule {
    title?: string
    date?: string
}

interface BlogPost {
    slug: string
    title?: string
    date: Date | null
}

async function getBlogPosts(): Promise<BlogPost[]> {
    const dir = path.join(process.cwd(), 'src', 'content', 'blog')
    const files = fs.readdirSync(dir)

    const postsPromises = files
        .filter((file) => file.endsWith('.mdx'))
        .map(async (file) => {
            const slug = file.replace(/\.mdx$/, '')

            const { title, date: dateString } = (await import(
                `~/content/blog/${slug}.mdx`
            )) as MDXModule

            return {
                slug,
                title,
                date: dateString ? new Date(dateString) : null
            }
        })

    const posts = await Promise.all(postsPromises)

    return posts.sort((a, b) => {
        if (!a.date) return 1
        if (!b.date) return -1
        return b.date.getTime() - a.date.getTime()
    })
}

export default async function BlogPage() {
    const blogPosts = await getBlogPosts()

    return (
        <main className="flex w-full max-w-2xl flex-col items-start justify-start">
            {blogPosts.map(({ slug, title, date }) => (
                <Link
                    href={`/blog/${slug}`}
                    key={slug}
                    className="border-border hover:bg-muted mt-2 w-full rounded border p-4"
                >
                    <h1>{title}</h1>
                    {date && (
                        <time dateTime={date.toISOString()}>
                            {format(date, 'EEEE d, MMMM')}
                        </time>
                    )}
                </Link>
            ))}
        </main>
    )
}
