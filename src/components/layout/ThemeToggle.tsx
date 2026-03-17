import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { cn } from '~/lib/utils'
import { Button } from '~/components/ui/button'

type Props = {
    className?: string
}

export function ThemeToggle({ className }: Props) {
    const [theme, setTheme] = useState<'light' | 'dark' | null>(null)
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const iconRef = useRef<HTMLSpanElement | null>(null)

    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark')
        setTheme(isDark ? 'dark' : 'light')
    }, [])

    const changeTheme = async () => {
        if (!buttonRef.current) return

        const nextTheme = theme === 'dark' ? 'light' : 'dark'
        const startViewTransition = document.startViewTransition?.bind(document)

        const apply = () => {
            flushSync(() => setTheme(nextTheme))
            const el = iconRef.current
            if (el) {
                el.classList.remove('animate-theme-icon')
                void el.offsetWidth
                el.classList.add('animate-theme-icon')
                el.addEventListener(
                    'animationend',
                    () => el.classList.remove('animate-theme-icon'),
                    { once: true }
                )
            }
            document.documentElement.classList.toggle(
                'dark',
                nextTheme === 'dark'
            )
            localStorage.setItem('theme', nextTheme)
        }

        if (!startViewTransition) {
            apply()
            return
        }

        // Suppress named view-transition groups so elements with
        // transition:name don't animate independently of the root clip-path.
        document.documentElement.dataset.themeTransition = ''

        const transition = startViewTransition(apply)
        transition.finished.finally(() => {
            delete document.documentElement.dataset.themeTransition
        })
        await transition.ready

        const { top, left, width, height } =
            buttonRef.current.getBoundingClientRect()
        const y = top + height / 2
        const x = left + width / 2
        const right = window.innerWidth - left
        const bottom = window.innerHeight - top
        const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom))

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${maxRad}px at ${x}px ${y}px)`
                ]
            },
            {
                duration: 700,
                easing: 'ease-in-out',
                pseudoElement: '::view-transition-new(root)'
            }
        )
    }

    return (
        <Button
            ref={buttonRef}
            onClick={changeTheme}
            aria-label="Toggle theme"
            className={cn(
                className,
                'hover:bg-foreground/5 dark:hover:bg-foreground/10 size-10'
            )}
            variant="ghost"
            size="icon"
        >
            <span
                ref={iconRef}
                className="inline-flex items-center justify-center"
            >
                {theme === null ? (
                    <span className="inline-block size-5" aria-hidden />
                ) : theme === 'dark' ? (
                    <SunIcon className="size-5" />
                ) : (
                    <MoonIcon className="size-5" />
                )}
            </span>
        </Button>
    )
}
