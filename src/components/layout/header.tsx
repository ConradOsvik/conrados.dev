'use client'

import Link from 'next/link'
import { useI18n } from '~/locales/client'
import { LanguageToggle } from './language-toggle'
import { ThemeToggle } from './theme-toggle'
import Logo from '../ui/logo'
import { usePathname } from 'next/navigation'
import { cn } from '~/lib/utils'

export default function Header() {
    const t = useI18n()

    return (
        <header className="bg-background/95 dark:supports-[backdrop-filter]:bg-background/80 supports-[backdrop-filter]:bg-background/50 sticky top-0 z-50 w-full backdrop-blur">
            <div className="mx-auto flex w-full max-w-xl items-center justify-between px-6 py-4 md:px-0">
                <div className="flex items-center gap-3 sm:gap-4">
                    <Link
                        href={{ pathname: '/' }}
                        className="flex items-center"
                    >
                        <Logo
                            size={32}
                            className="transition-colors duration-200 hover:opacity-80"
                        />
                    </Link>
                    <nav className="hidden items-center gap-6 sm:flex">
                        <NavLink href="/">{t('nav.home')}</NavLink>
                        <NavLink href="/blog">{t('nav.blog')}</NavLink>
                    </nav>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                    <LanguageToggle />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}

function NavLink({
    href,
    children
}: {
    href: string
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <Link
            href={{ pathname: href }}
            className={cn(
                pathname === href ? 'text-foreground' : 'text-muted-foreground',
                'hover:text-foreground font-medium transition-colors'
            )}
        >
            {children}
        </Link>
    )
}
