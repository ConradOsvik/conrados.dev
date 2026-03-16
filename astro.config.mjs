// @ts-check
import { defineConfig } from 'astro/config'
import expressiveCode from 'astro-expressive-code'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
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

/** @param {{ type: string }} theme */
const isDark = ({ type }) => type === 'dark'

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
            plugins: [pluginLineNumbers()],
            // Light theme first = default at :root; dark theme scoped to .dark
            themes: ['github-light', 'github-dark-dimmed'],
            useDarkModeMediaQuery: false,
            themeCssSelector: (theme) =>
                isDark(theme) ? '.dark' : ':root',
            defaultProps: {
                showLineNumbers: false
            },
            styleOverrides: {
                borderRadius: '0.5rem',
                borderWidth: '1px',
                codeFontFamily:
                    "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
                codeFontSize: '0.8125rem',
                codeBackground: ({ theme }) =>
                    isDark(theme)
                        ? 'oklch(0.15 0.004 60)'
                        : 'oklch(0.985 0.002 75)',
                borderColor: ({ theme }) =>
                    isDark(theme)
                        ? 'oklch(0.21 0.004 60)'
                        : 'oklch(0.88 0.004 70)',
                frames: {
                    frameBoxShadowCssValue: 'none',
                    editorBackground: ({ theme }) =>
                        isDark(theme)
                            ? 'oklch(0.15 0.004 60)'
                            : 'oklch(0.985 0.002 75)',
                    editorTabBarBackground: ({ theme }) =>
                        isDark(theme)
                            ? 'oklch(0.12 0.004 60)'
                            : 'oklch(0.95 0.003 70)',
                    editorActiveTabBackground: ({ theme }) =>
                        isDark(theme)
                            ? 'oklch(0.15 0.004 60)'
                            : 'oklch(0.985 0.002 75)',
                    editorTabBarBorderColor: ({ theme }) =>
                        isDark(theme)
                            ? 'oklch(0.21 0.004 60)'
                            : 'oklch(0.88 0.004 70)',
                    editorTabBarBorderBottomColor: ({ theme }) =>
                        isDark(theme)
                            ? 'oklch(0.21 0.004 60)'
                            : 'oklch(0.88 0.004 70)',
                    editorActiveTabBorderColor: 'transparent',
                    editorActiveTabIndicatorTopColor: 'transparent',
                    editorActiveTabIndicatorBottomColor: 'transparent',
                    inlineButtonForeground: ({ theme }) =>
                        isDark(theme)
                            ? 'oklch(0.55 0.003 70)'
                            : 'oklch(0.45 0.004 60)',
                    inlineButtonBorderOpacity: '0',
                    inlineButtonBackgroundIdleOpacity: '0',
                    inlineButtonBackgroundHoverOrFocusOpacity: '0.08',
                    tooltipSuccessBackground: ({ theme }) =>
                        isDark(theme)
                            ? 'oklch(0.19 0.005 60)'
                            : 'oklch(0.14 0.004 60)',
                    tooltipSuccessForeground: ({ theme }) =>
                        isDark(theme)
                            ? 'oklch(0.7 0.003 70)'
                            : 'oklch(0.92 0.003 70)'
                },
                textMarkers: {
                    backgroundOpacity: '25%',
                    borderOpacity: '50%',
                    defaultChroma: '30',
                    lineMarkerAccentWidth: '2px'
                },
                lineNumbers: {
                    foreground: ({ theme }) =>
                        isDark(theme)
                            ? 'oklch(0.32 0.004 60)'
                            : 'oklch(0.68 0.003 70)',
                    highlightForeground: ({ theme }) =>
                        isDark(theme)
                            ? 'oklch(0.45 0.004 60)'
                            : 'oklch(0.45 0.004 60)'
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
