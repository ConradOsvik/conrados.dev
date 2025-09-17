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

export default function Education() {
    const t = useI18n()

    const schools = [
        {
            degree: t('education.ntnu.degree'),
            school: t('education.ntnu.school'),
            period: t('education.ntnu.period'),
            details: t('education.ntnu.details')
        }
    ]

    return (
        <section id="education" className="flex flex-col">
            <h2 className="section-title">{t('sections.education')}</h2>
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
                                    <div className="text-muted-foreground text-xs">
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
