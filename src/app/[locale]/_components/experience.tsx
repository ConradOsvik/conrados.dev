'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardAction
} from '~/components/ui/card'
import SectionTitle from './section-title'
import { useTranslations } from 'next-intl'

export default function Experience() {
    const t = useTranslations('experience')

    const roles = [
        {
            role: t('tihlde.role'),
            org: t('tihlde.org'),
            location: t('tihlde.location'),
            period: t('tihlde.period'),
            highlights: [
                t('tihlde.highlight1'),
                t('tihlde.highlight2'),
                t('tihlde.highlight3'),
                t('tihlde.highlight4')
            ]
        }
    ]

    return (
        <section id="experience" className="flex flex-col">
            <SectionTitle id="experience">{t('sectionTitle')}</SectionTitle>
            <div className="mt-4 space-y-4">
                {roles.map((r) => (
                    <Card key={r.role}>
                        <CardHeader>
                            <div className="flex items-baseline justify-between gap-4">
                                <div>
                                    <CardTitle className="text-base">
                                        {r.role}
                                    </CardTitle>
                                    <CardDescription>
                                        {r.org}, {r.location}
                                    </CardDescription>
                                </div>
                                <CardAction>
                                    <div className="text-muted-foreground text-xs">
                                        {r.period}
                                    </div>
                                </CardAction>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                                {r.highlights.map((h) => (
                                    <li key={h}>{h}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
