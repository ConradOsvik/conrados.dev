import Providers from './providers'
import { setStaticParamsLocale } from 'next-international/server'
import { getStaticParams } from '~/locales/server'
import Header from '~/components/layout/header'
import Footer from '~/components/layout/footer'
import MobileNav from '~/components/layout/mobile-nav'

export function generateStaticParams() {
    return getStaticParams()
}

export default async function Layout({
    children,
    params
}: Readonly<{
    children: React.ReactNode
    params: Promise<{ locale: string }>
}>) {
    const { locale } = await params
    setStaticParamsLocale(locale)

    return (
        <Providers locale={locale}>
            <Header />
            <main className="flex w-full flex-1 justify-center px-6">
                {children}
            </main>
            <MobileNav />
            <Footer />
        </Providers>
    )
}
