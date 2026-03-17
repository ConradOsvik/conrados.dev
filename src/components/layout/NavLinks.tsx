import { useEffect, useState } from 'react'
import { cn } from '~/lib/utils'
import {
    HoverHighlightRoot,
    HoverHighlightItem
} from '~/components/ui/HoverHighlight'

const links = [
    { label: 'Home', href: '/' },
    { label: 'Writing', href: '/writing' }
]

export function NavLinks({ pathname: initial }: { pathname: string }) {
    const [pathname, setPathname] = useState(initial)

    useEffect(() => {
        const onNav = () => setPathname(window.location.pathname)
        document.addEventListener('astro:after-swap', onNav)
        return () => document.removeEventListener('astro:after-swap', onNav)
    }, [])

    function isActive(href: string) {
        if (href === '/') return pathname === '/'
        return pathname === href || pathname.startsWith(href + '/')
    }

    return (
        <HoverHighlightRoot className="flex items-center">
            {links.map((link) => (
                <HoverHighlightItem key={link.href}>
                    <a
                        href={link.href}
                        className={cn(
                            'focus-visible:ring-ring/50 relative z-10 block rounded-md px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2',
                            isActive(link.href)
                                ? 'text-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                        )}
                    >
                        {link.label}
                    </a>
                </HoverHighlightItem>
            ))}
        </HoverHighlightRoot>
    )
}
