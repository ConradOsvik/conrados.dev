import {
    createContext,
    useContext,
    useRef,
    useState,
    useCallback,
    type ReactNode
} from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface HighlightState {
    key: number
    left: number
    top: number
    width: number
    height: number
}

interface HoverHighlightContextValue {
    containerRef: React.RefObject<HTMLDivElement | null>
    onItemEnter: (el: HTMLElement) => void
}

const HoverHighlightContext = createContext<HoverHighlightContextValue | null>(
    null
)

let nextKey = 0

export function HoverHighlightRoot({
    children,
    className
}: {
    children: ReactNode
    className?: string
}) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [highlight, setHighlight] = useState<HighlightState | null>(null)
    const isInsideRef = useRef(false)

    const onItemEnter = useCallback((el: HTMLElement) => {
        const container = containerRef.current
        if (!container) return

        const containerRect = container.getBoundingClientRect()
        const elRect = el.getBoundingClientRect()
        const left = elRect.left - containerRect.left
        const top = elRect.top - containerRect.top
        const width = elRect.width
        const height = elRect.height

        if (isInsideRef.current) {
            // Already hovering — slide existing highlight (keep same key)
            setHighlight((prev) =>
                prev
                    ? { ...prev, left, top, width, height }
                    : { key: nextKey++, left, top, width, height }
            )
        } else {
            // Entering from outside — new highlight (new key triggers AnimatePresence enter)
            isInsideRef.current = true
            setHighlight({ key: nextKey++, left, top, width, height })
        }
    }, [])

    const onContainerLeave = useCallback(() => {
        isInsideRef.current = false
        setHighlight(null)
    }, [])

    return (
        <HoverHighlightContext.Provider value={{ containerRef, onItemEnter }}>
            <div
                ref={containerRef}
                onMouseLeave={onContainerLeave}
                className={className}
                style={{ position: 'relative' }}
            >
                <AnimatePresence>
                    {highlight && (
                        <motion.span
                            key={highlight.key}
                            initial={{
                                opacity: 0,
                                left: highlight.left,
                                top: highlight.top,
                                width: highlight.width,
                                height: highlight.height
                            }}
                            animate={{
                                opacity: 1,
                                left: highlight.left,
                                top: highlight.top,
                                width: highlight.width,
                                height: highlight.height
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                                left: {
                                    type: 'spring',
                                    stiffness: 500,
                                    damping: 30
                                },
                                top: {
                                    type: 'spring',
                                    stiffness: 500,
                                    damping: 30
                                },
                                width: {
                                    type: 'spring',
                                    stiffness: 500,
                                    damping: 30
                                },
                                height: {
                                    type: 'spring',
                                    stiffness: 500,
                                    damping: 30
                                },
                                opacity: {
                                    duration: 0.15,
                                    ease: 'easeOut'
                                }
                            }}
                            className="bg-foreground/[0.06] pointer-events-none absolute rounded-md"
                        />
                    )}
                </AnimatePresence>
                {children}
            </div>
        </HoverHighlightContext.Provider>
    )
}

export function HoverHighlightItem({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    const ctx = useContext(HoverHighlightContext)
    const ref = useRef<HTMLDivElement>(null)

    return (
        <div
            ref={ref}
            onMouseEnter={() => {
                if (ref.current && ctx) {
                    ctx.onItemEnter(ref.current)
                }
            }}
            className={className}
            {...props}
        >
            {children}
        </div>
    )
}
