'use client'

import Link from 'next/link'
import { useI18n } from '~/locales/client'

export default function Footer() {
    const t = useI18n()
    const year = new Date().getFullYear()

    return (
        <footer className="w-full py-6">
            <div className="mx-auto w-full max-w-xl px-6 md:px-0">
                <div className="text-muted-foreground flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-center sm:text-left">
                        {t('footer.copyright', { year })}
                    </p>
                    <div className="flex items-center justify-center gap-6 sm:justify-end">
                        <Link
                            href="#projects"
                            className="hover:text-foreground transition-colors hover:underline"
                        >
                            {t('footer.projects')}
                        </Link>
                        <Link
                            href="#contact"
                            className="hover:text-foreground transition-colors hover:underline"
                        >
                            {t('footer.contact')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
