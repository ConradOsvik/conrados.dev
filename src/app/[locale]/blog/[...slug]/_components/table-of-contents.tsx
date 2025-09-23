'use client'

import type { Toc } from '@stefanprobst/rehype-extract-toc'
import { cn } from '~/lib/utils'
import { useEffect, useMemo, useState } from 'react'

function useActiveItem(itemIds: string[]) {
    const [activeId, setActiveId] = useState<string | null>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                }
            },
            { rootMargin: '0% 0% -80% 0%' }
        )

        for (const id of itemIds ?? []) {
            const element = document.getElementById(id)
            if (element) {
                observer.observe(element)
            }
        }

        return () => {
            for (const id of itemIds ?? []) {
                const element = document.getElementById(id)
                if (element) {
                    observer.unobserve(element)
                }
            }
        }
    }, [itemIds])

    return activeId
}

export function TableOfContents({ toc }: { toc: Toc }) {
    const elementIds = useMemo(() => {
        return toc
            .map((item) => item.id)
            .filter((id): id is string => id !== undefined)
    }, [toc])

    const activeHeading = useActiveItem(elementIds)

    const baseDepth = useMemo(() => {
        if (!toc?.length) return 1
        return Math.min(...toc.map((item) => item.depth))
    }, [toc])

    return (
        <nav className="sticky top-20 p-8">
            <h2 className="typo-title-lg pb-2">In this post</h2>
            <ul>
                {toc.map((item) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            className={cn(
                                'typo-label-md transition-colors duration-200',
                                activeHeading === item.id
                                    ? 'text-foreground font-medium'
                                    : 'text-muted-foreground hover:text-foreground'
                            )}
                            data-depth={item.depth}
                            style={{
                                paddingLeft: `${(item.depth - baseDepth) * 0.5}em`
                            }}
                        >
                            {item.value}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
