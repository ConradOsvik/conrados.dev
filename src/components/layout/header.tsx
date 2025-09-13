'use client'

import Link from 'next/link'
import ThemeToggle from './theme-toggle'
import LanguageToggle from './language-toggle'

export default function Header() {
    return (
        <header className="flex w-full items-center">
            <div className="flex-1"></div>
            <div className="w-full max-w-xl">
                <Link href={{ pathname: '/' }}>
                    {/* <Image
                        src="/logo.svg"
                        alt="logo"
                        width={100}
                        height={100}
                    /> */}
                    Conrados
                </Link>
            </div>
            <div className="flex flex-1 justify-end">
                <LanguageToggle />
                <ThemeToggle />
            </div>
        </header>
    )
}
