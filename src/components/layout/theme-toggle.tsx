'use client'

import { useState, useEffect } from 'react'
import { Button } from '~/components/ui/button'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'
import { CubeTransparentIcon } from '@heroicons/react/24/solid'

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <Button
            variant="ghost"
            size="icon"
            className="m-2 size-10 cursor-pointer"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            {mounted ? (
                theme === 'dark' ? (
                    <SunIcon className="size-6" />
                ) : (
                    <MoonIcon className="size-6" />
                )
            ) : (
                <CubeTransparentIcon className="size-6" />
            )}
        </Button>
    )
}
