import 'katex/dist/katex.min.css'
import '~/styles/globals.css'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Doto, Bricolage_Grotesque } from 'next/font/google'
import Providers from './providers'
import { setStaticParamsLocale } from 'next-international/server'
import { getStaticParams } from '~/locales/server'
import Header from '~/components/layout/header'
import Footer from '~/components/layout/footer'
import MobileNav from '~/components/layout/mobile-nav'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
})

const doto = Doto({
    variable: '--font-doto',
    subsets: ['latin']
})

const bricolageGrotesque = Bricolage_Grotesque({
    variable: '--font-bricolage-grotesque',
    subsets: ['latin']
})

export function generateStaticParams() {
    return getStaticParams()
}

export const metadata: Metadata = {
    title: 'Conrad Osvik',
    description: 'Portfolio of Conrad Osvik'
}

export default async function RootLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode
    params: Promise<{ locale: string }>
}>) {
    const { locale } = await params
    setStaticParamsLocale(locale)

    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${doto.variable} ${bricolageGrotesque.variable} flex min-h-screen flex-col items-center justify-start font-sans antialiased`}
            >
                <Providers locale={locale}>
                    <Header />
                    <main className="flex w-full flex-1 justify-center px-6">
                        {children}
                    </main>
                    <MobileNav />
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}
