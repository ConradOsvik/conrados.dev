import {
    HoverHighlightRoot,
    HoverHighlightItem
} from '~/components/ui/HoverHighlight'

interface Post {
    title: string
    description?: string
    date: string
    dateISO: string
    href: string
    slug: string
}

export function BlogPostList({ posts }: { posts: Post[] }) {
    return (
        <HoverHighlightRoot className="-mx-3 flex flex-col">
            {posts.map((post) => (
                <HoverHighlightItem key={post.slug}>
                    <a href={post.href} className="block px-3 py-2.5">
                        <div className="flex items-baseline justify-between gap-4">
                            <h2
                                className="text-foreground text-sm font-medium"
                                style={{
                                    viewTransitionName: `post-title-${post.slug}`
                                }}
                            >
                                {post.title}
                            </h2>
                            <time
                                className="text-muted-foreground shrink-0 text-xs"
                                dateTime={post.dateISO}
                                style={{
                                    viewTransitionName: `post-date-${post.slug}`
                                }}
                            >
                                {post.date}
                            </time>
                        </div>
                        {post.description && (
                            <p
                                className="text-muted-foreground mt-1 text-sm"
                                style={{
                                    viewTransitionName: `post-desc-${post.slug}`
                                }}
                            >
                                {post.description}
                            </p>
                        )}
                    </a>
                </HoverHighlightItem>
            ))}
        </HoverHighlightRoot>
    )
}
