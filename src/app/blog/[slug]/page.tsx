import fs from 'node:fs'
import path from 'node:path'
import { format } from 'date-fns'
import type { MDXModule as BaseMDXModule } from 'mdx/types'
import type { Metadata } from 'next'

interface MDXModule extends BaseMDXModule {
    title?: string
    date?: string
}

interface Props {
    params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
    const dir = path.join(process.cwd(), 'src', 'content', 'blog')
    const files = fs.readdirSync(dir)

    return files.map((file) => {
        const slug = file.replace(/\.mdx$/, '')

        return { slug }
    })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const { title } = (await import(`~/content/blog/${slug}.mdx`)) as MDXModule

    return {
        title: title ?? 'Blog Post'
    }
}

export default async function BlogPage({ params }: Props) {
    const { slug } = await params
    const {
        default: Post,
        title,
        date: dateString
    } = (await import(`~/content/blog/${slug}.mdx`)) as MDXModule

    const date = dateString ? new Date(dateString) : null

    return (
        <main>
            <article className="flex flex-col items-start justify-start">
                <Header title={title} date={date} />
                <Post />
            </article>
        </main>
    )
}

function Header({ title, date }: { title?: string; date: Date | null }) {
    return (
        <header className="flex flex-col items-start justify-start">
            <h1>{title}</h1>
            {date && <time>{format(date, 'EEEE d, MMMM')}</time>}
        </header>
    )
}
