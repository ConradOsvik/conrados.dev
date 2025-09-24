import { getAllPosts } from '~/lib/posts'
import type { PostData } from '~/lib/posts'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
    title: 'Blogs - Conrad Osvik',
    description: 'Blogs by Conrad Osvik'
}

export default async function BlogsPage() {
    const posts = await getAllPosts()

    return (
        <div className="flex w-full max-w-xl flex-col items-center justify-start">
            <h1 className="typo-headline-lg">Blogs</h1>

            <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                {posts.map((post: PostData) => (
                    <Link
                        key={post.slug}
                        href={{ pathname: `/blog/${post.slug}` }}
                        className="group block"
                    >
                        <article className="hover:bg-muted/50 rounded-xl p-2 transition-colors">
                            <div className="relative aspect-video overflow-hidden rounded-lg">
                                <Image
                                    src={post.metadata.image}
                                    alt={post.metadata.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="space-y-1 p-2">
                                <h2 className="typo-title-lg line-clamp-2">
                                    {post.metadata.title}
                                </h2>

                                <p className="typo-body-sm line-clamp-3">
                                    {post.metadata.description}
                                </p>

                                <div className="typo-label-sm flex items-center justify-between">
                                    <time dateTime={post.metadata.date}>
                                        {new Date(
                                            post.metadata.date
                                        ).toLocaleDateString()}
                                    </time>

                                    {post.metadata.tags && (
                                        <div className="flex gap-1">
                                            {post.metadata.tags
                                                .slice(0, 2)
                                                .map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="bg-muted rounded px-2 py-1 text-xs"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            {post.metadata.tags.length > 2 && (
                                                <span className="text-muted-foreground text-xs">
                                                    +
                                                    {post.metadata.tags.length -
                                                        2}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>

            {posts.length === 0 && (
                <p className="typo-body-md mt-8">No blog posts found.</p>
            )}
        </div>
    )
}
