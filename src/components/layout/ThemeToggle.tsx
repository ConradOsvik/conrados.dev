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
            document.documentElement.classList.toggle('dark', nextTheme === 'dark')
            localStorage.setItem('theme', nextTheme)
        }

        if (!startViewTransition) {
            apply()
            return
        }

        const transition = startViewTransition(apply)
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
            className={cn(className, 'size-10')}
            variant="ghost"
            size="icon"
        >
            {theme === null ? (
                <span className="inline-block size-6" aria-hidden />
            ) : theme === 'dark' ? (
                <SunIcon className="size-6" />
            ) : (
                <MoonIcon className="size-6" />
            )}
        </Button>
    )
}
