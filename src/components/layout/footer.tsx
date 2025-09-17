'use client'

import Link from 'next/link'
import { useI18n } from '~/locales/client'

export default function Footer() {
    const t = useI18n()
    const year = new Date().getFullYear()

    return (
        <footer className="w-full py-8">
            <div className="text-muted-foreground mx-auto w-full max-w-xl text-sm">
                <div className="flex items-center justify-between">
                    <p>{t('footer.copyright', { year })}</p>
                    <div className="flex items-center gap-4">
                        <Link href="#projects" className="hover:underline">
                            {t('nav.projects')}
                        </Link>
                        <Link href="#contact" className="hover:underline">
                            {t('nav.contact')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
