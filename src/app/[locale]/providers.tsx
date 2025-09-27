import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'

export default async function Providers({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <NextIntlClientProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </NextIntlClientProvider>
    )
}
