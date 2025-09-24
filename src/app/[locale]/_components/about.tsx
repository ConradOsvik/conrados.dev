// Updated about.tsx
'use client'

import { useI18n } from '~/locales/client'
import ProfileImage from './profile-image'

export default function About() {
    const t = useI18n()

    return (
        <section
            id="hero"
            className="flex flex-col items-center gap-6 pt-4 sm:flex-row sm:items-start sm:justify-between"
        >
            {/* Mobile: Image at top, smaller and centered */}
            <div className="order-first flex justify-center sm:hidden">
                <div className="h-32 w-24">
                    {' '}
                    {/* Fixed small size for mobile */}
                    <ProfileImage />
                </div>
            </div>

            {/* Text content */}
            <div className="flex-1 text-center sm:text-left">
                <h1 className="typo-display-sm">Conrad Osvik</h1>
                <p className="typo-body-md mt-3 max-w-prose text-balance">
                    {t('hero.intro')}
                </p>
            </div>

            {/* Desktop: Image on the right, controlled size */}
            <div className="hidden sm:flex sm:shrink-0">
                <div className="w-44">
                    {' '}
                    {/* Controlled width */}
                    <ProfileImage />
                </div>
            </div>
        </section>
    )
}
