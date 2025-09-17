'use client'

import Link from 'next/link'
import { useI18n } from '~/locales/client'

export default function Contact() {
    const t = useI18n()
    const email = 'conrad.tinius.osvik@gmail.com'
    const socials = [{ name: 'GitHub', href: 'https://github.com/example' }]

    return (
        <section id="contact" className="flex flex-col">
            <h2 className="section-title">{t('sections.contact')}</h2>
            <p className="text-muted-foreground mt-3">
                {t('contact.description')}
            </p>
            <div className="mt-3">
                <Link
                    href={`mailto:${email}`}
                    className="underline underline-offset-4 hover:opacity-80"
                >
                    {email}
                </Link>
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
                {socials.map((s) => (
                    <Link
                        key={s.name}
                        href={{ pathname: s.href }}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:opacity-80"
                        aria-label={`Open ${s.name}`}
                    >
                        {s.name}
                    </Link>
                ))}
            </div>
        </section>
    )
}
