// @ts-check
import { defineConfig } from 'astro/config'
import expressiveCode from 'astro-expressive-code'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import rehypeSlug from 'rehype-slug'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

const site =
    process.env.VERCEL_ENV === 'production'
        ? 'https://conrados.dev'
        : process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : 'https://conrados.dev'

export default defineConfig({
    site,
    markdown: {
        // rehypeSlug and rehypeKatex go here so they're included in the MDX
        // pipeline's defaults, alongside the rehype-expressive-code plugin that
        // astro-expressive-code injects into markdown.rehypePlugins.
        // (Specifying rehypePlugins directly in mdx() would override defaults via ??,
        // which would drop expressive-code from the MDX pipeline.)
        rehypePlugins: [rehypeSlug, rehypeKatex]
    },
    integrations: [
        expressiveCode({
            // Light theme first = default at :root; dark theme scoped to .dark
            themes: ['github-light', 'github-dark-dimmed'],
            useDarkModeMediaQuery: false,
            themeCssSelector: (theme) =>
                theme.type === 'dark' ? '.dark' : ':root',
            styleOverrides: {
                borderRadius: '0.5rem',
                borderWidth: '1px',
                codeFontFamily:
                    "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
                codeBackground: ({ theme }) =>
                    theme.type === 'dark'
                        ? 'oklch(0.15 0.004 60)'
                        : 'oklch(0.985 0.002 75)',
                borderColor: ({ theme }) =>
                    theme.type === 'dark'
                        ? 'oklch(1 0 0 / 10%)'
                        : 'oklch(0.90 0.004 70)',
                frames: {
                    frameBoxShadowCssValue: 'none',
                    editorBackground: ({ theme }) =>
                        theme.type === 'dark'
                            ? 'oklch(0.15 0.004 60)'
                            : 'oklch(0.985 0.002 75)',
                    editorTabBarBackground: ({ theme }) =>
                        theme.type === 'dark'
                            ? 'oklch(0.12 0.004 60)'
                            : 'oklch(0.95 0.003 70)',
                    editorActiveTabBackground: ({ theme }) =>
                        theme.type === 'dark'
                            ? 'oklch(0.15 0.004 60)'
                            : 'oklch(0.985 0.002 75)',
                    editorTabBarBorderColor: ({ theme }) =>
                        theme.type === 'dark'
                            ? 'oklch(1 0 0 / 10%)'
                            : 'oklch(0.90 0.004 70)',
                    editorTabBarBorderBottomColor: ({ theme }) =>
                        theme.type === 'dark'
                            ? 'oklch(1 0 0 / 10%)'
                            : 'oklch(0.90 0.004 70)',
                    editorActiveTabBorderColor: 'transparent'
                }
            }
        }),
        react(),
        mdx({
            syntaxHighlight: false,
            remarkPlugins: [remarkGfm, remarkMath]
        }),
        sitemap()
    ],
    vite: {
        plugins: [tailwindcss()]
    }
})
