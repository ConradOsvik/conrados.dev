import fs from 'node:fs'
import path from 'node:path'
import type { StaticImageData } from 'next/image'
import { notFound } from 'next/navigation'
import type { Toc } from '@stefanprobst/rehype-extract-toc'

type Metadata = {
    title: string
    description: string
    date: string
    author: string
    image: StaticImageData
    tags?: string[]
}

type Post = {
    metadata: Metadata
    tableOfContents: Toc
    toc: boolean
    default: React.ComponentType
    slug: string
}

export async function getPosts(locale: string): Promise<Post[]> {
    const postsDirectory = path.join(process.cwd(), 'src', 'content', 'posts')

    // Get all post directories
    const postDirectories = await fs.promises.readdir(postsDirectory, {
        withFileTypes: true
    })

    // Filter to only directories
    const postDirs = postDirectories.filter((dirent) => dirent.isDirectory())

    const posts: Post[] = []

    for (const dirent of postDirs) {
        const slug = dirent.name
        const postPath = path.join(postsDirectory, slug, `${locale}.mdx`)

        try {
            // Check if the post file exists
            if (!fs.existsSync(postPath)) {
                continue
            }

            // Dynamically import the post to get metadata
            const post = (await import(
                `~/content/posts/${slug}/${locale}.mdx`
            )) as Omit<Post, 'slug'>

            posts.push({
                ...post,
                slug
            })
        } catch (error) {
            console.error(`Error loading post ${slug}/${locale}:`, error)
            continue
        }
    }

    // Sort posts by date (newest first)
    return posts.sort(
        (a, b) =>
            new Date(b.metadata.date).getTime() -
            new Date(a.metadata.date).getTime()
    )
}

export async function getPost(locale: string, slug: string): Promise<Post> {
    const postsDirectory = path.join(process.cwd(), 'src', 'content', 'posts')
    const postPath = path.join(postsDirectory, slug, `${locale}.mdx`)

    if (!fs.existsSync(postPath)) {
        return notFound()
    }

    const post = (await import(
        `~/content/posts/${slug}/${locale}.mdx`
    )) as Omit<Post, 'slug'>

    return { ...post, slug }
}
