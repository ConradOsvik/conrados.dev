'use client'

import Image from 'next/image'
import { useI18n } from '~/locales/client'

export default function Hero() {
    const t = useI18n()
    return (
        <div className="flex items-start justify-between">
            <div className="flex flex-col">
                <h1 className="title">Conrad Osvik</h1>
                <p className="mt-4 mr-8 text-lg leading-tight font-medium text-gray-600 dark:text-gray-400">
                    {t('hero.intro', {
                        conrad: (
                            <span className="text-black dark:text-white">
                                {t('hero.highlight.conrad')}
                            </span>
                        ),
                        enjoy: (
                            <span className="text-black dark:text-white">
                                {t('hero.highlight.enjoy')}
                            </span>
                        ),
                        bsc: (
                            <span className="text-black dark:text-white">
                                {t('hero.highlight.bsc')}
                            </span>
                        ),
                        ntnu: (
                            <span className="text-black dark:text-white">
                                {t('hero.highlight.ntnu')}
                            </span>
                        )
                    })}
                </p>
            </div>
            <Image
                src="/profile.jpg"
                alt="Conrad Osvik"
                width={200}
                height={100}
                className="rounded-md"
            />
        </div>
    )
}
