'use client'

import Link from 'next/link'
import { useI18n } from '~/locales/client'
import { LanguageToggle } from './language-toggle'
import { ThemeToggle } from './theme-toggle'
import Logo from '../ui/logo'

export default function Header() {
    const t = useI18n()

    return (
        <header className="w-full">
            <div className="mx-auto flex w-full max-w-xl items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href={{ pathname: '/' }}>
                        <Logo
                            size={32}
                            className="transition-colors duration-200"
                        />
                    </Link>
                    <nav className="flex items-center gap-6">
                        <Link href={{ pathname: '/' }}>{t('nav.home')}</Link>
                    </nav>
                </div>
                <div className="flex items-center">
                    <LanguageToggle />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}
