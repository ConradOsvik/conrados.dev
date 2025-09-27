'use client'

import Link from 'next/link'
import SectionTitle from './section-title'
import { useTranslations } from 'next-intl'

export default function Contact() {
    const t = useTranslations('contact')
    const email = 'conrad.tinius.osvik@gmail.com'
    const socials = [{ name: 'GitHub', href: 'https://github.com/ConradOsvik' }]

    return (
        <section id="contact" className="flex flex-col">
            <SectionTitle id="contact">{t('sectionTitle')}</SectionTitle>
            <p className="text-muted-foreground mt-3">{t('description')}</p>
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
