'use client'

import { useI18n } from '~/locales/client'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardAction
} from '~/components/ui/card'
import SectionTitle from './section-title'

export default function Experience() {
    const t = useI18n()

    const roles = [
        {
            role: t('experience.tihlde.role'),
            org: t('experience.tihlde.org'),
            location: t('experience.tihlde.location'),
            period: t('experience.tihlde.period'),
            highlights: [
                t('experience.tihlde.highlight1'),
                t('experience.tihlde.highlight2'),
                t('experience.tihlde.highlight3'),
                t('experience.tihlde.highlight4')
            ]
        }
    ]

    return (
        <section id="experience" className="flex flex-col">
            <SectionTitle id="experience">
                {t('sections.experience')}
            </SectionTitle>
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
