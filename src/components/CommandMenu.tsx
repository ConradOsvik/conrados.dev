import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface Post {
    title: string
    description?: string
    slug: string
    tags: string[]
}

interface CommandItem {
    id: string
    title: string
    subtitle?: string
    href: string
    section: string
    keywords: string
}

function navigateTo(href: string) {
    const a = document.createElement('a')
    a.href = href
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    a.remove()
}

export function CommandMenu({ posts }: { posts: Post[] }) {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [activeIndex, setActiveIndex] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map())
    const [highlight, setHighlight] = useState<{
        top: number
        height: number
    } | null>(null)
    const pointerMovedRef = useRef(false)

    const items = useMemo<CommandItem[]>(() => {
        const pages: CommandItem[] = [
            {
                id: 'home',
                title: 'Home',
                href: '/',
                section: 'Pages',
                keywords: 'home index landing'
            },
            {
                id: 'writing',
                title: 'Writing',
                href: '/writing',
                section: 'Pages',
                keywords: 'writing blog posts articles'
            }
        ]
        const postItems: CommandItem[] = posts.map((p) => ({
            id: p.slug,
            title: p.title,
            subtitle: p.description,
            href: `/writing/${p.slug}`,
            section: 'Writing',
            keywords: [p.title, p.description, ...p.tags]
                .filter(Boolean)
                .join(' ')
        }))
        return [...pages, ...postItems]
    }, [posts])

    const filtered = useMemo(() => {
        if (!query.trim()) return items
        const q = query.toLowerCase()
        return items.filter(
            (item) =>
                item.title.toLowerCase().includes(q) ||
                item.keywords.toLowerCase().includes(q)
        )
    }, [query, items])

    const grouped = useMemo(() => {
        const map = new Map<
            string,
            { item: CommandItem; flatIndex: number }[]
        >()
        filtered.forEach((item, i) => {
            if (!map.has(item.section)) map.set(item.section, [])
            map.get(item.section)!.push({ item, flatIndex: i })
        })
        return [...map.entries()]
    }, [filtered])

    // Reset active index when results change
    useEffect(() => {
        setActiveIndex(0)
    }, [filtered])

    // Update highlight position when activeIndex changes
    useEffect(() => {
        if (!open) return
        requestAnimationFrame(() => {
            const el = itemRefs.current.get(activeIndex)
            if (!el) {
                setHighlight(null)
                return
            }
            setHighlight({
                top: el.offsetTop,
                height: el.offsetHeight
            })
        })
    }, [activeIndex, filtered, open])

    // Cmd+K listener
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                setOpen((prev) => !prev)
            }
        }
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [])

    // Focus input on open
    useEffect(() => {
        if (open) {
            setQuery('')
            setActiveIndex(0)
            requestAnimationFrame(() => inputRef.current?.focus())
        }
    }, [open])

    // Lock body scroll
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
            return () => {
                document.body.style.overflow = ''
            }
        }
    }, [open])

    const handleSelect = useCallback(
        (href: string) => {
            setOpen(false)
            navigateTo(href)
        },
        []
    )

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault()
                    pointerMovedRef.current = false
                    setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
                    break
                case 'ArrowUp':
                    e.preventDefault()
                    pointerMovedRef.current = false
                    setActiveIndex((i) => Math.max(i - 1, 0))
                    break
                case 'Enter': {
                    e.preventDefault()
                    const item = filtered[activeIndex]
                    if (item) handleSelect(item.href)
                    break
                }
                case 'Escape':
                    setOpen(false)
                    break
            }
        },
        [filtered, activeIndex, handleSelect]
    )

    // Scroll active item into view, including section label / bottom padding
    useEffect(() => {
        const el = itemRefs.current.get(activeIndex)
        const container = listRef.current
        if (!el || !container) return

        // If first item in section, scroll section label into view
        const sectionHeader = el.previousElementSibling
        if (sectionHeader?.hasAttribute('data-section-label')) {
            sectionHeader.scrollIntoView({ block: 'nearest' })
        } else {
            el.scrollIntoView({ block: 'nearest' })
        }

        // If last item, scroll to absolute bottom so padding is visible
        if (activeIndex === filtered.length - 1) {
            container.scrollTop = container.scrollHeight
        }
    }, [activeIndex, filtered.length])

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    {/* Backdrop */}
                    <div
                        className="bg-background/80 absolute inset-0 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />

                    {/* Panel */}
                    <motion.div
                        className="border-border bg-background relative mx-4 w-full max-w-lg overflow-hidden rounded-xl border shadow-lg"
                        initial={{ opacity: 0, scale: 0.96, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -8 }}
                        transition={{ duration: 0.15 }}
                        onKeyDown={handleKeyDown}
                    >
                        {/* Search */}
                        <div className="flex items-center gap-3 px-4 py-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-muted-foreground shrink-0"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search..."
                                className="text-foreground placeholder:text-muted-foreground flex-1 bg-transparent text-sm shadow-none outline-none"
                            />
                        </div>

                        <div className="bg-border h-px" />

                        {/* Results */}
                        <div
                            ref={listRef}
                            className="relative max-h-72 overflow-y-auto px-2 pb-2"
                            role="listbox"
                            onPointerMove={() => {
                                pointerMovedRef.current = true
                            }}
                        >
                            {highlight && (
                                <motion.div
                                    className="bg-foreground/[0.06] pointer-events-none absolute inset-x-2 rounded-lg"
                                    animate={{
                                        top: highlight.top,
                                        height: highlight.height
                                    }}
                                    transition={{
                                        type: 'tween',
                                        duration: 0.15,
                                        ease: 'easeOut'
                                    }}
                                />
                            )}

                            {filtered.length === 0 ? (
                                <p className="text-muted-foreground py-6 text-center text-sm">
                                    No results found.
                                </p>
                            ) : (
                                grouped.map(([section, entries]) => (
                                    <div key={section}>
                                        <div
                                            data-section-label
                                            className="text-muted-foreground px-2 pt-2 pb-1.5 text-xs font-medium"
                                        >
                                            {section}
                                        </div>
                                        {entries.map(
                                            ({ item, flatIndex }) => (
                                                <div
                                                    key={item.id}
                                                    ref={(el) => {
                                                        if (el)
                                                            itemRefs.current.set(
                                                                flatIndex,
                                                                el
                                                            )
                                                        else
                                                            itemRefs.current.delete(
                                                                flatIndex
                                                            )
                                                    }}
                                                    role="option"
                                                    aria-selected={
                                                        activeIndex ===
                                                        flatIndex
                                                    }
                                                    onMouseEnter={() => {
                                                        if (pointerMovedRef.current)
                                                            setActiveIndex(
                                                                flatIndex
                                                            )
                                                    }}
                                                    onClick={() =>
                                                        handleSelect(item.href)
                                                    }
                                                    className="relative cursor-pointer rounded-lg px-3 py-2.5"
                                                >
                                                    <span className="text-foreground relative z-10 text-sm font-medium">
                                                        {item.title}
                                                    </span>
                                                    {item.subtitle && (
                                                        <p className="text-muted-foreground relative z-10 mt-0.5 line-clamp-1 text-xs">
                                                            {item.subtitle}
                                                        </p>
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="bg-border h-px" />

                        {/* Footer hints */}
                        <div className="text-muted-foreground flex items-center gap-4 px-4 py-2.5 text-xs">
                            <span className="flex items-center gap-1">
                                <kbd className="border-border rounded border px-1 py-0.5 text-[10px]">
                                    &uarr;&darr;
                                </kbd>
                                Navigate
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="border-border rounded border px-1 py-0.5 text-[10px]">
                                    &crarr;
                                </kbd>
                                Open
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="border-border rounded border px-1 py-0.5 text-[10px]">
                                    Esc
                                </kbd>
                                Close
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
