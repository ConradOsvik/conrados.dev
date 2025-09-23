'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '~/lib/utils'
import { useI18n } from '~/locales/client'

export default function MobileNav() {
    const t = useI18n()

    return (
        <nav className="bg-foreground/95 dark:supports-[backdrop-filter]:bg-foreground/10 supports-[backdrop-filter]:bg-foreground/10 fixed bottom-4 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2 rounded-full p-2 backdrop-blur md:hidden">
            <NavLink href="/">{t('nav.home')}</NavLink>
            <NavLink href="/blog">{t('nav.blog')}</NavLink>
        </nav>
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

    console.log('Pathname:', pathname, href)

    return (
        <Link
            href={{ pathname: href }}
            className={cn(
                pathname === href
                    ? 'bg-foreground/10'
                    : 'bg-foreground/0 text-muted-foreground',
                'hover:text-foreground rounded-full px-4 py-2 font-medium transition-colors'
            )}
        >
            {children}
        </Link>
    )
}
