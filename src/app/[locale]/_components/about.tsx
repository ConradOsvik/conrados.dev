'use client'

import { useI18n } from '~/locales/client'
import ProfileImage from './profile-image'

export default function About() {
    const t = useI18n()

    return (
        <section
            id="hero"
            className="flex flex-col items-start gap-6 md:flex-row md:items-start md:justify-between"
        >
            <div className="flex-1">
                <h1 className="title">Conrad Osvik</h1>
                <p className="text-muted-foreground mt-3 max-w-prose text-base leading-relaxed text-balance">
                    {t('hero.intro')}
                </p>
            </div>
            <div className="flex shrink-0 self-stretch">
                <ProfileImage />
            </div>
        </section>
    )
}
