import 'katex/dist/katex.min.css'
import '~/styles/globals.css'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Doto, Bricolage_Grotesque } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

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

export const metadata: Metadata = {
    title: 'Conrad Osvik',
    description: 'Portfolio of Conrad Osvik'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${doto.variable} ${bricolageGrotesque.variable} flex min-h-screen flex-col items-center justify-start font-sans antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
