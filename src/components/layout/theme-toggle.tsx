'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { cn } from '~/lib/utils'
import { useTheme } from 'next-themes'
import { Button } from '../ui/button'

type props = {
    className?: string
}

export const ThemeToggle = ({ className }: props) => {
    const { resolvedTheme, setTheme } = useTheme()
    const [isMounted, setIsMounted] = useState(false)
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const changeTheme = async () => {
        if (!buttonRef.current) return

        const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
        const startViewTransition = document.startViewTransition?.bind(document)

        if (!startViewTransition) {
            setTheme(nextTheme)
            return
        }

        await startViewTransition(() => {
            flushSync(() => {
                setTheme(nextTheme)
            })
        }).ready

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
            className={cn(className, 'm-2 size-10')}
            variant="ghost"
            size="icon"
        >
            {!isMounted ? (
                <span className="inline-block size-6" aria-hidden />
            ) : resolvedTheme === 'dark' ? (
                <SunIcon className="size-6" />
            ) : (
                <MoonIcon className="size-6" />
            )}
        </Button>
    )
}
