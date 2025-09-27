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

export default function Education() {
    const t = useTranslations('education')

    const schools = [
        {
            degree: t('ntnu.degree'),
            school: t('ntnu.school'),
            period: t('ntnu.period'),
            details: t('ntnu.details')
        }
    ]

    return (
        <section id="education" className="flex flex-col">
            <SectionTitle id="education">{t('sectionTitle')}</SectionTitle>
            <div className="mt-4 space-y-4">
                {schools.map((s) => (
                    <Card key={s.degree}>
                        <CardHeader>
                            <div className="flex items-baseline justify-between gap-4">
                                <div>
                                    <CardTitle className="text-base">
                                        {s.degree}
                                    </CardTitle>
                                    <CardDescription>
                                        {s.school}
                                    </CardDescription>
                                </div>
                                <CardAction>
                                    <div className="text-muted-foreground text-xs whitespace-nowrap">
                                        {s.period}
                                    </div>
                                </CardAction>
                            </div>
                        </CardHeader>
                        {s.details && (
                            <CardContent>
                                <p className="text-muted-foreground text-sm">
                                    {s.details}
                                </p>
                            </CardContent>
                        )}
                    </Card>
                ))}
            </div>
        </section>
    )
}
