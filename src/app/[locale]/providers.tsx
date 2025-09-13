import { ThemeProvider } from 'next-themes'
import { I18nProviderClient } from '~/locales/client'

export default async function Providers({
    children,
    locale
}: {
    children: React.ReactNode
    locale: string
}) {
    return (
        <I18nProviderClient locale={locale}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </I18nProviderClient>
    )
}
