import { useState, useMemo, useCallback, useEffect } from 'react'
import { motion } from 'motion/react'
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
    tags: string[]
    year: number
}

function tagsFromUrl(allTags: string[]): Set<string> {
    if (typeof window === 'undefined') return new Set()
    const params = new URLSearchParams(window.location.search)
    const tags = params.get('tags')
    return tags
        ? new Set(tags.split(',').filter((t) => allTags.includes(t)))
        : new Set()
}

export function WritingList({
    posts,
    allTags
}: {
    posts: Post[]
    allTags: string[]
}) {
    const [selectedTags, setSelectedTags] = useState<Set<string>>(() =>
        tagsFromUrl(allTags)
    )

    const pushUrl = useCallback((tags: Set<string>) => {
        const url = new URL(window.location.href)
        if (tags.size === 0) {
            url.searchParams.delete('tags')
        } else {
            url.searchParams.set('tags', [...tags].sort().join(','))
        }
        window.history.pushState({}, '', url)
    }, [])

    // Sync state from URL on back/forward
    useEffect(() => {
        const onPopState = () => setSelectedTags(tagsFromUrl(allTags))
        window.addEventListener('popstate', onPopState)
        return () => window.removeEventListener('popstate', onPopState)
    }, [allTags])

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) => {
            const next = new Set(prev)
            if (next.has(tag)) next.delete(tag)
            else next.add(tag)
            pushUrl(next)
            return next
        })
    }

    const clearTags = () => {
        setSelectedTags(new Set())
        pushUrl(new Set())
    }

    const filteredByYear = useMemo(() => {
        const filtered =
            selectedTags.size === 0
                ? posts
                : posts.filter((p) => p.tags.some((t) => selectedTags.has(t)))

        const byYear = new Map<number, Post[]>()
        for (const post of filtered) {
            if (!byYear.has(post.year)) byYear.set(post.year, [])
            byYear.get(post.year)!.push(post)
        }
        return [...byYear.entries()].sort(([a], [b]) => b - a)
    }, [posts, selectedTags])

    return (
        <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="flex flex-wrap gap-1.5">
                {allTags.map((tag) => {
                    const active = selectedTags.has(tag)
                    return (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`cursor-pointer rounded-full border px-2.5 py-0.5 text-xs transition-[color,background-color] ${
                                active
                                    ? 'border-foreground/20 bg-foreground/10 text-foreground'
                                    : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/20'
                            }`}
                        >
                            {tag}
                        </button>
                    )
                })}
                {selectedTags.size > 0 && (
                    <button
                        onClick={clearTags}
                        className="rounded-full px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Clear
                    </button>
                )}
            </div>

            {filteredByYear.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                    No posts match the selected tags.
                </p>
            ) : (
                filteredByYear.map(([year, yearPosts]) => (
                    <section key={year} className="flex flex-col gap-6">
                        <h2 className="section-title">{year}</h2>
                        <HoverHighlightRoot className="-mx-3 flex flex-col">
                            {yearPosts.map((post) => (
                                <HoverHighlightItem key={post.slug}>
                                    <a
                                        href={post.href}
                                        className="block px-3 py-2.5"
                                    >
                                        <div className="flex items-baseline justify-between gap-4">
                                            <h3
                                                className="text-foreground text-sm font-medium"
                                                style={{
                                                    viewTransitionName: `post-title-${post.slug}`
                                                }}
                                            >
                                                {post.title}
                                            </h3>
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
                    </section>
                ))
            )}
        </motion.div>
    )
}
